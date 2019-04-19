from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
from sqlalchemy.sql import text

engine = create_engine('postgresql+psycopg2://rodney:rodney123@104.199.52.163:5432/opendata')
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
    SELECT "COMMUNE", AVG(CAST(latitude AS DOUBLE PRECISION)), AVG(CAST(longitude AS DOUBLE PRECISION)), COUNT("COMMUNE")
    FROM "Borne_Incendie_Angers"
    GROUP BY "COMMUNE"
    ''')
    conn = engine.connect()
    results = conn.execute(s).fetchall()
    return jsonify({'results': [list(r) for r in results]})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)