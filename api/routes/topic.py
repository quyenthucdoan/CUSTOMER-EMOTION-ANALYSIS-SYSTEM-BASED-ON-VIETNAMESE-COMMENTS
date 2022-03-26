from app import app
from services import TopicServices
from flask import jsonify, request

@app.route('/topic/terms', methods=['GET'])
def getTerms():
    numOfTerms = request.args.get("numOfTerms")
    results = TopicServices.getTerms(numOfTerms)
    return jsonify({ 'results': results })