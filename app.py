#!/usr/bin/env python
from flask import Flask

app = Flask(__name__)


if __name__ == '__main__':
    from view.base import *
    app.run(port=6060)
