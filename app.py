#!/usr/bin/env python
'''
app.py
'''

from flask import Flask, Response, jsonify
import requests

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/get_datasets')
def get_datasets():
    response = requests.get('http://erddap.ooi.rutgers.edu/erddap/info/index.json')
    if response.status_code != 200:
        resp = Response("Failed to get ERDDAP data", status=500, mimetype="text/plain")
        return resp

    return jsonify(**response.json())

@app.route('/get_dataset/<dataset_id>')
def get_dataset(dataset_id):
    response = requests.get('http://erddap.ooi.rutgers.edu/erddap/info/%s/index.json' % dataset_id)
    if response.status_code != 200:
        resp = Response("Failed to get ERDDAP data", status=500, mimetype="text/plain")
        return resp

    return jsonify(**response.json())

@app.route('/get_data/<dataset_id>')
def get_data(dataset_id):
    response = requests.get('http://erddap.ooi.rutgers.edu/erddap/tabledap/CP05MOAS_GL001_00_ENG000000_glider_eng_sci_recovered_unprocessed.json?sci_m_disk_free,time&time>=2014-04-19T00:05:02Z&time<=2014-04-19T22:05:02Z')
    if response.status_code != 200:
        resp = Response("Failed to get ERDDAP data", status=500, mimetype="text/plain")
        return resp
    return jsonify(**response.json())


if __name__ == '__main__':
    app.run(debug=True)

