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

@app.route('/parking_full')
def parking_full():
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

@app.route('/decheterie')
def decheterie():
    s = text('''
    SELECT "VILLE", AVG(latitude), AVG(longitude), COUNT("VILLE")
    FROM "Decheterie_Angers"
    GROUP BY "VILLE"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})

@app.route('/bus_tram')
def bus_tram():
    s = text('''
    SELECT "nomarret", latitude, longitude
    FROM "Dessertes_Bus_Tram_Angers"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})

@app.route('/travaux')
def travaux():
    s = text('''
    SELECT "title", latitude, longitude
    FROM "Info_Travaux_Angers"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})

@app.route('/sanitaire')
def sanitaires():
    s = text('''
    SELECT "NOM", latitude, longitude
    FROM "Sanitaires_Publics_Angers"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})

@app.route('/stations_velo')
def stations_velo():
    s = text('''
    SELECT "NOM", latitude, longitude, "ARC_NB"
    FROM "Stations_Velo_Angers"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)