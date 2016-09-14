#!/usr/bin/env python
import os
import jinja2
from flask import Flask

static_folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

app = Flask(__name__)
app.jinja_loader = jinja2.FileSystemLoader(static_folder_path)


if __name__ == '__main__':
    from view.base import *
    app.run(port=6060)
