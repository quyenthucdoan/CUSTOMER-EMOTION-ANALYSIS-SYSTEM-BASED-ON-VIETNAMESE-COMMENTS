from flask import jsonify
from app import app
from routes import *
from flask_cors import CORS, cross_origin
from flask_user import login_required

@app.route('/')
def hello():
    return jsonify({ "hello": True })

if __name__=='__main__':
    CORS(app)
    app.run(debug=True, host='0.0.0.0', threaded=True, port=3338)