<?php

namespace {

    use DLabs\DataObjects\Order;
    use SilverStripe\Forms\Form;
    use SilverStripe\Forms\FieldList;
    use SilverStripe\Forms\TextField;
    use SilverStripe\Forms\FormAction;
    use SilverStripe\Forms\RequiredFields;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Control\HTTPRequest;
    use SilverStripe\Forms\DropdownField;

class StaffController extends ContentController
    {
        private static $allowed_actions = [
            "LoginForm",
            "doLogin",
            "doLogout",
            "orders",
        ];

        protected function init()
        {
            parent::init();
        }

        public function getRole()
        {
            $session = $this->getRequest()->getSession();
            if ($session->get("dsr_staff_role")) {
                return $session->get("dsr_staff_role");
            }

            return false;
        }

        private function getAllOrders()
        {
            $to_return = [];

            $role = $this->getRole();
            if ($role && trim($role) !== "") {
                if (mb_strtoupper(trim($role)) === "WAITER") {
                    $orders = Order::get()->filter(["Status" => "Processed"]);    
                } else if (mb_strtoupper(trim($role)) === "BARMAN") {
                    $orders = Order::get()->filter(["DrinksReady" => 0, "Status" => ["Delivered", "Posted", "Processed"], "Items.Type" => "Drink"]);
                } else if (mb_strtoupper(trim($role)) === "CHEF") {
                    $orders = Order::get()->filter(["FoodReady" => 0, "Status" => ["Delivered", "Posted", "Processed"], "Items.Type" => "Food"]);
                }

                if ($orders && $orders->exists()) {
                    foreach ($orders as $order) {
                        $to_return[$order->ID] = [
                            "id" => $order->OrderID,
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
            switch ($request->httpMethod()) {
                case 'GET':
                    //if ($this->orderId) {
                    //    $response = $this->getOrder($this->orderId);
                    //} else {
                        $response = $this->getAllOrders();
                    //};
                    break;
                case 'PUT':
                    $response = $this->processOrder($request);
                    break;
                default:
                    $response = $this->notFoundResponse();
                    break;
            }

            echo $response;
        }

        public function LoginForm()
        {
            $fields = new FieldList(
                TextField::create("Name")
                    ->setTitle("Name")
                    ->setAttribute("placeholder", "Please enter your name"),
                DropdownField::create("Role")
                    ->setTitle("Role")
                    ->setSource(["Barman", "Chef", "Waiter"])
                    ->setValue(2),
            );
    
            $actions = new FieldList(
                FormAction::create('doLogin')->setTitle('Login')->setFullAction("/doLogin")
            );
    
            $required = new RequiredFields("Name", "Role");
    
            $form = new Form($this, "LoginForm", $fields, $actions, $required);
    
            return $form;
        }

        public function doLogout(HTTPRequest $request, $redirectBack = true)
        {
            $session = $request->getSession();
            $session->clear("dsr_staff_name");
            $session->clear("dsr_staff_role");

            if ($redirectBack) {
                return $this->redirectBack();
            }
        }

        public function doLogin(HTTPRequest $request)
        {
            $this->doLogout($request, false);

            $session = $request->getSession();

            $data = $request->postVars();
            if (trim($data["Name"]) !== "" && trim($data["Role"]) !== "") {
                $session->set("dsr_staff_name", $data["Name"]);
                $session->set("dsr_staff_role", $data["Role"]);
            }

            return $this->redirectBack();
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

        private function processOrder(HTTPRequest $request)
        {
            $session = $request->getSession();

            $postData = $this->get_request_data();

            if (isset($postData["order_id"]) && trim($postData["order_id"]) !== "") {
                $order = Order::get()->filter(["OrderID" => trim($postData["order_id"])])->first();
                if ($order && $order->exists()) {
                    $role = $this->getRole();

                    $order->process($role);

                    return json_encode([
                        "success" => true,
                    ]);

                    return;
                }
            }

            return json_encode([
                "success" => false,
            ]);
        }
    }
}
