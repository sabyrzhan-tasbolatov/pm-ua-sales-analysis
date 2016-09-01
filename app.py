from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def main(name=None):
    return render_template('index.html', name=name)


@app.route('/query', methods=['POST'])
def query():
    pass


if __name__ == '__main__':
    app.run('127.0.0.1',
            6060)
