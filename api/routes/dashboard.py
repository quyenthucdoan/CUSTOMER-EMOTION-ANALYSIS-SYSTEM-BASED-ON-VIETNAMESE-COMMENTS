from app import app
from services import DashboardServices
from flask import jsonify, request

@app.route('/dashboard/getSourceStats', methods=['GET'])
def getSourceStats():
    results = DashboardServices.getSourceStats()
    return jsonify({ 'results': results })

@app.route('/dashboard/getEmotionStats', methods=['GET'])
def getEmotionStats():
    results = DashboardServices.getEmotionStats()
    return jsonify({ 'results': results })

@app.route('/dashboad/getSentiment', methods=['GET'])
def getSentiment():
    results = DashboardServices.getSentiment2Source()
    return jsonify({ 'results': results })

@app.route('/dashboad/getSentiment2Source', methods=['GET'])
def getSentiment2Source():
    results = DashboardServices.getSentiment2Source()
    return jsonify({ 'results': results })

@app.route('/dashboard/getKeyword', methods=['GET'])
def getKeyword():
    method = request.args.get("method")
    numOfKeyword = request.args.get("numOfKeyword")
    results = DashboardServices.getKeyword(method, numOfKeyword)
    return jsonify({ 'results': results })