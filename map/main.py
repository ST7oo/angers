from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
from sqlalchemy.sql import text
import json

credentials = {}

with open('credentials.json') as f:
    cred = json.load(f)
    credentials = cred['postgresql']

engine = create_engine('postgresql+psycopg2://{}:{}@{}:{}/opendata'.format(credentials['username'], credentials['password'], credentials['host'], credentials['port']))
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/parking')
def parking():
    s = text('''
    SELECT parking, latitude, longitude, places
    FROM parking_list
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})

@app.route('/borne_incendie')
def borne_incendie():
    s = text('''
    SELECT "COMMUNE", AVG(latitude), AVG(longitude), COUNT("COMMUNE")
    FROM "Borne_Incendie_Angers"
    GROUP BY "COMMUNE"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
