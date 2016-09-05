from utils import *
from app import app
from flask import request, render_template
from db.base import BaseDB


@app.route('/')
def main(name=None):
    return render_template('index.html', name=name)


@app.route('/<section>/<page>')
def render_pages(section, page, name=None):
    return render_template('/%s/%s.html' % (section, page),
                           section=section,
                           page=page,
                           name=name)


def _prepare_query(data):
    f = data['from']
    t = data['to']

    query = {
        'start_w': {
            '$gte': f,
            '$lt': t
        }
    }

    return [{'$match': query}]


def _compute_timeline(data, pipeline):
    start_week_field = 'start_w'
    c = data['c']
    time_group = {
        'date': "$" + start_week_field,
        'brand': "$Brand_SF NAME",
        'pos': "$Touchpoint_Code",
        'investment': "$Investment"
    }
    timeline_dict = {
        '$group': {
            '_id': time_group,
            'count': {'$sum': 1}
        }
    }
    pipeline.append(timeline_dict)
    basedb = BaseDB()
    app.logger.info('Query in %s collection by %s' % (c, pipeline))
    results = basedb.aggregate_q(c, pipeline)

    for entry in results:
        pos_code = entry['_id']['pos']
        found_pos = basedb.find_one_q('pos', {"Customer_Code": pos_code})
        if not found_pos:
            break
        entry['pos_info'] = dict(trade=found_pos['Trade_Category'] or 'N/A',
                                 customer_type=found_pos['Customer_Type'] or 'N/A',
                                 region=found_pos['Region'] or 'N/A')

    return results


def _compute_distrib(data, pipeline):
    start_week_field = 'start_w'
    c = data['c']
    distrib_group = {
        'date': "$" + start_week_field,
        'investment': "$Investment"
    }
    distrib_dict = {
        '$group': {
            '_id': distrib_group,
            'count': {'$sum': 1}
        }
    }
    pipeline.append(distrib_dict)
    basedb = BaseDB()
    app.logger.info('Query in %s collection by %s' % (c, pipeline))
    results = basedb.aggregate_q(c, pipeline)

    return results


@app.route('/statistics', methods=['POST'])
def statistics():
    # Get data within defined time range from defined collection
    data = request.json
    pipeline = _prepare_query(data)

    # Timeline
    timeline_pipeline = pipeline[:]
    timeline_results = _compute_timeline(data, timeline_pipeline)

    # Distrib
    # distrib_pipeline = pipeline[:]
    # distrib_results = _compute_distrib(data, distrib_pipeline)

    if not timeline_results:
        app.logger.warn('No results found')
        return jsonify(ok=False, list=[])

    return jsonify(ok=True, list=timeline_results)


@app.route('/metrics', methods=['POST'])
def metrics():
    pass