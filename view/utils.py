import datetime


def jsonify(*args, **kwargs):
    from flask import jsonify

    def prepare_json(d):
        if hasattr(d, 'to_json') and callable(getattr(d, 'to_json')):
            return d.to_json()
        elif isinstance(d, dict):
            result = {}
            for k, v in d.iteritems():
                result[k] = prepare_json(v)
            return result
        elif isinstance(d, (tuple, list, set)):
            return [prepare_json(x) for x in d]
        else:
            return d
    return jsonify(prepare_json(dict(*args, **kwargs)))


def convert_time(time):
    d = datetime.datetime.strptime(time, '%m/%d/%Y')
    return d.strftime('%d/%m/%Y')
