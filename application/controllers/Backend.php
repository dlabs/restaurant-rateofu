<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Backend extends CI_Controller
{

  public function index()
  {
    $data = [];
    $this->template->load('home', 'default', 'index', $data);
  }

  public function addOrder()
  {
    $data = $_POST['data'];
    $order_summary = $data['order_summary'];
    $order = array();
    $order['order_list'] = json_encode($order_summary);
    $order['order_status'] = 'order_recieved';
    echo $this->Customer_order_model->add_order($order);
  }

  public function checkorder()
  {
    $id = $_POST['id'];
    $order = $this->Customer_order_model->get_order_id($id);
    $order = $order->order_status;
    echo prettify_customer_status($order);
  }
}

function prettify_customer_status($order)
{
  switch ($order) {
    case 'order_recieved':
      return "Order was recieved.";
    case 'drinks_proccessed':
      return "Barman prepared your drinks.";
    case 'ready_to_serve':
      return "Chef prepared your food.";
    case 'served':
      return "Watch out, waiter is bringing your order.";
    default:
      return "There was an error.";
  }
}