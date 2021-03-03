<?php

namespace {

    use DLabs\DataObjects\OrderItem;
    use DLabs\DataObjects\Order;
    use SilverStripe\View\ArrayData;
    use SilverStripe\Control\HTTPRequest;
    use SilverStripe\CMS\Controllers\ContentController;

    class GuestController extends ContentController
    {
        private $table_id;

        private static $allowed_actions = [
            "menu_items",
            "orders",
            "submit_order",
        ];

        private function get_table_id()
        {
            return bin2hex(random_bytes(8));
        }

        private function get_order_id()
        {
            $unique_order_id = false;
            while ($unique_order_id === false) {
                $order_id = bin2hex(random_bytes(8));

                $order = Order::get()->filter(["ID" => $order_id])->first();
                if (!$order || $order->exists() === false) {
                    $unique_order_id = true;

                    return $order_id;
                }
            }
        }

        protected function init()
        {
            parent::init();
        }

        public function index(HTTPRequest $request)
        {
            $session = $request->getSession();

            $table_id = $session->get('dsr_table_id');
            if (isset($table_id) && trim($table_id) !== '') {
                $this->table_id = $table_id;
            } else {
                $this->table_id = $this->get_table_id();
                $session->set('dsr_table_id', $this->table_id);
            }

            return $this->customise(new ArrayData([
                "table_id" => $this->table_id,
            ]))->renderWith(['GuestController', 'Page']);
        }

        public function menu_items(HTTPRequest $request)
        {
            $to_return = [];

            $order_items = OrderItem::get()->sort(["Type" => "DESC", "Name" => "ASC"]);
            foreach ($order_items as $order_item) {
                $to_return[] = [
                    "id" => $order_item->ID,
                    "name" => $order_item->Name,
                    "type" => $order_item->Type,
                    "price" => $order_item->dbObject("Price")->getAmount(),
                    "currency" => $order_item->dbObject("Price")->getCurrency(),
                ];
            }

            return json_encode($to_return);
        }

        private function getAllorders($table_id)
        {
            $to_return = [];

            if ($table_id && trim($table_id) !== "") {
                $orders = Order::get()->filter(["TableID" => $table_id]);
                if ($orders && $orders->exists()) {
                    foreach ($orders as $order) {
                        $to_return[$order->ID] = [
                            "id" => $order->OrderID,
                            "items" => json_encode($order->Items()->map("Name", "Quantity")->toArray()),
                            "drinks_ready" => $order->DrinksReady,
                            "food_ready" => $order->FoodReady,
                            "drinks_served" => $order->DrinksServed,
                            "food_served" => $order->FoodServed,
                            "status" => $order->Status,
                        ];
                    }
                }
            }

            return json_encode($to_return);
        }

        private function notFoundResponse()
        {
            return $this->httpError(403, "Resource not found!");
        }

        public function orders(HTTPRequest $request)
        {
            $session = $request->getSession();

            $table_id = $session->get('dsr_table_id');

            switch ($request->httpMethod()) {
                case 'GET':
                    //if ($this->orderId) {
                    //    $response = $this->getOrder($table_id, $this->orderId);
                    //} else {
                        $response = $this->getAllOrders($table_id);
                    //};
                    break;
                case 'POST':
                    $response = $this->postOrder($table_id);
                    break;
                default:
                    $response = $this->notFoundResponse();
                    break;
            }

            echo $response;
        }

        private function get_request_data()
        {
            $body = file_get_contents('php://input');
            if (empty($body)) {
                return [];
            }

            $data = json_decode($body, true);
            if (json_last_error()) {
                trigger_error(json_last_error_msg());
                return [];
            }
        
            return $data;
        }

        private function createOrder($table_id, $order_items)
        {
            if (isset($table_id) && trim($table_id) !== "" && isset($order_items) && is_array($order_items) && count($order_items)) {
                $order = Order::create();
                $order->OrderID = $this->get_order_id();
                $order->TableID = $table_id;
                $order->Status = "Posted";
                $order->write();

                foreach ($order_items as $order_item) {
                    $order->Items()->add($order_item["id"], ["Quantity" => $order_item["qty"]]);
                }

                return [
                    "order_id" => $order->OrderID,
                ];
            }

            return false;
        }

        private function postOrder($table_id)
        {
            $order_items = [];

            $order_items = $this->get_request_data();

            $order_created = $this->createOrder($table_id, $order_items);
            if ($order_created !== false) {
                return json_encode([
                    "success" => true,
                    "order_id" => $order_created["order_id"],
                ]);
            } else {
                return json_encode([
                    "success" => false,
                ]);
            }
        }
    }
}
