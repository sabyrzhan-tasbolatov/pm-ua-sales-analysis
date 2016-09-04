from utils import *
from bson import json_util, ObjectId
import json
from app import app
from flask import request, render_template
from db.activities import Activities


@app.route('/')
def main(name=None):
    return render_template('index.html', name=name)


@app.route('/<section>/<page>')
def render_pages(section, page, name=None):
    return render_template('/%s/%s.html' % (section, page),
                           section=section,
                           page=page,
                           name=name)


@app.route('/statistics', methods=['POST'])
def statistics():
    # Get data within defined time range from defined collection
    data = request.json
    c = data['c']

    f = convert_time(data['from'])
    t = convert_time(data['to'])

    query = {
        'Start_Week OR Start_Month': {
            '$gte': f,
            '$lt': t
        }
    }

    act = Activities()
    app.logger.info('Query in %s collection by %s' % (c, query))

    results = act.find_q(c, query)

    if not results:
        app.logger.warn('No results found')
        return jsonify(ok=False, list=[])

    results = list(results)
    return jsonify(ok=True, list=json.loads(json_util.dumps(results)))


@app.route('/metrics', methods=['POST'])
def metrics():
    pass