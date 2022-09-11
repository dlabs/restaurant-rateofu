from flask import Flask, request, jsonify, request, make_response
from flask_cors import CORS
from utils import generate_bearer_token, generate_id, ORDER_STAGES
from menu import MENU

app = Flask(__name__)
CORS(app)

staff = {}
orders = {}


@app.route('/api/menu-items', methods=['GET'])
def get_menu_items():
    response = jsonify(list(MENU.values()))
    return response


@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order_by_id(order_id):
    if order_id in orders:
        order = orders[order_id]
        return jsonify(order)
    return make_response("Order ID not found", 404)


@app.route('/api/orders', methods=['POST'])
def post_order():
    if request.method == 'POST':
        # create new order
        order = {
            'order_id': generate_id(),
            'table_id': request.json['table_id'],
            'order_total': sum([item['quantity'] * MENU[item['item_id']]['item_price'] for item in request.json['items']]),
            'order_items': [
                {
                    'order_item_id': generate_id(),
                    'item_id': item['item_id'],
                    'status': ORDER_STAGES[0],
                    'quantity': item['quantity'],
                    'type': MENU[item['item_id']]['item_type']
                } for item in request.json['items']
            ],
        }
        # save order
        orders[order['order_id']] = order

        return jsonify(order)

    elif request.method == 'GET':
        return jsonify({})


@app.route('/api/orders/', methods=['GET'])
def get_order():
    has_unfinished_items = request.args.get('has_unfinished_items', default=False, type=bool)
    if (has_unfinished_items):
        return jsonify([
            {
                'order_id': order['order_id'],
                'table_id': order['table_id'],
                'order_items': order['order_items']
            } for order in orders.values()
        ])
    else:
        orders_with_finished_items = []
        for order in orders.values():
            orders_with_finished_items.append({
                'order_id': order['order_id'],
                'table_id': order['table_id'],
                'order_items': [item for item in order['order_items'] if item['status'] == ORDER_STAGES[-1]],
            })
        return jsonify(orders_with_finished_items)


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
    try:
        for order in orders.values():
            for item in order['order_items']:
                if item['order_item_id'] == order_item_id:
                    item['status'] = request.json['status']
        return make_response("Success", 204)
    except Exception:
        return make_response("Order item ID not found", 404)
