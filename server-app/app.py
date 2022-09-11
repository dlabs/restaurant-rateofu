from flask import Flask, request, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/api/menu-items', methods=['GET'])
def get_menu_items():
    return jsonify({})


@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order_by_id(order_id):
    return jsonify({})


@app.route('/api/orders', methods=['POST', 'GET'])
def post_order():
    if request.method == 'POST':
        return jsonify({})
    elif request.method == 'GET':
        return jsonify({})


@app.route('/api/login', methods=['POST'])
def login():
    return jsonify({})


@app.route('/api/order-items/<order_item_id>', methods=['PUT'])
def update_order(order_item_id):
    return jsonify({})
