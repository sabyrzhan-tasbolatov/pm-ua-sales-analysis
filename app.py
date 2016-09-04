#!/usr/bin/env python
from flask import Flask, request, render_template

app = Flask(__name__)


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
    pass


@app.route('/query', methods=['POST'])
def query():
    pass


if __name__ == '__main__':
    app.run(debug=True, port=6060)
