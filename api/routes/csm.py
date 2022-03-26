from app import app
from services import CsmServices
from flask import jsonify, request


@app.route('/csm/getCsmSentiment', methods=['GET'])
def getCsmSentiment():
    results = CsmServices.getCsmSentiment()
    return jsonify({ 'results': results })


@app.route('/csm/getCsmByKeyword', methods=['GET'])
def getCsmByKeyword():
    filterKeyword =  '' if not request.args.get("currentPage") else request.args.get("filterKeyword")
    currentPage = 1 if not request.args.get("currentPage") else int(request.args.get("currentPage"))
    results, total = CsmServices.getByKeyword(filterKeyword, currentPage)
    return jsonify({ 'results': results, 'total': total })