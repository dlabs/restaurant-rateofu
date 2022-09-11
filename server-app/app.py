from flask import Flask, request, jsonify, request
from flask_cors import CORS
from utils import generate_bearer_token
from menu import MENU

app = Flask(__name__)
CORS(app)

staff = {}


@app.route('/api/menu-items', methods=['GET'])
def get_menu_items():
    response = jsonify(list(MENU.values()))
    return response


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
    user_data = request.get_json()
    unique_username = f"{user_data['username']}_{user_data['role']}"
    if unique_username in staff:
        return jsonify({
            'bearer_token': staff[unique_username]['bearer_token']
        })
    else:
        bearer_token = generate_bearer_token(12)
        staff[unique_username] = {
            'bearer_token': bearer_token,
            'username': user_data['username'],
            'role': user_data['role'],
            'works_on': '',
        }
        return jsonify(
            {'bearer_token': bearer_token}
        )

@app.route('/api/order-items/<order_item_id>', methods=['PUT'])
def update_order(order_item_id):
    return jsonify({})
