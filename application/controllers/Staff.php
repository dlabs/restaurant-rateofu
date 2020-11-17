<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Staff extends CI_Controller
{

  public function logout()
  {
    $url = base_url() . 'staff/';
    session_destroy();
    header('Location: ' . $url);
  }

  /**
   * Displays order that staff is going to finish.
   */
  public function edit()
  {
    // If staff is not loged in
    if (!isset($_SESSION['staff'])) {
      $url = base_url() . 'staff/';
      header('Location: ' . $url);
    }
    $id = $this->uri->segment(2);
    $data = [];
    $data['order'] = $this->Customer_order_model->get_order_id($id);
    $data['order']->order_list = json_decode($data['order']->order_list, true);
    if ($_SESSION['staff'] == 'waiter') {
      $this->template->load('staff', 'default', 'staff_edit_waiter', $data);
    } else {
      $data['order'] = sort_out_order_items($data['order']);
      $this->template->load('staff', 'default', 'staff_edit', $data);
    }
  }

  /**
   * Updates order for particular staff member.
   */
  public function update_edit()
  {
    // If staff is not loged in
    if (!isset($_SESSION['staff'])) {
      $url = base_url() . 'staff/';
      header('Location: ' . $url);
    }
    $id = $this->uri->segment(3);
    $data = [];
    if ($_SESSION['staff'] == 'barman') {
      $data['order_status'] = 'drinks_proccessed';
    } else if ($_SESSION['staff'] == 'cheff') {
      $data['order_status'] = 'ready_to_serve';
    } else {
      $data['order_status'] = 'served';
    }
    $this->Customer_order_model->update_order($data, $id);
    $url = base_url() . 'staff/';
    header('Location: ' . $url);
  }

  public function index()
  {
    $data = [];
    // Sets staff login.
    if (isset($_GET['staff_login'])) {
      $_SESSION['staff'] = $_GET['staff_login'];
    }

    /**
     * Checks if staff is logged in or not.
     */
    if (isset($_SESSION['staff'])) {
      header("Refresh:2");
      $data['staff'] = $_SESSION['staff'];
      $data['orders'] = $this->Customer_order_model->get_orders();
      $check = check_staff();
      $data['orders'] = check_staff_order($data['orders'], $check);
      $data['orders'] = check_order_status($data['orders'], $check);
      $this->template->load('staff', 'default', 'index', $data);
    } else {
      $this->template->load('staff', 'default', 'staff_login', $data);
    }
  }
}

/**
 * Deletes order from staff if it's not for him.
 */
function check_staff_order($data, $check)
{
  // lists all orders.
  foreach ($data as $key => $order) {
    $is_mine = 0;
    $data_decoded = json_decode($order->order_list, true);
    // Lists all items in order.
    foreach ($data_decoded as $item) {
      // Checks if current staff needs edit in order.
      if ($item['type'] == $check || $_SESSION['staff'] == 'waiter') {
        $is_mine = 1;
      }
    }
    if ($is_mine == 0) {
      unset($data[$key]);
    }
  }
  return $data;
}
/**
 * Checks for order status.
 */
function check_order_status($data)
{
  // lists all orders.
  foreach ($data as $key => $order) {
    $type = check_if_only_one_item_type($order);
    if (($_SESSION['staff'] == 'barman' && $order->order_status == 'order_recieved') || ($_SESSION['staff'] == 'cheff' && $order->order_status == 'drinks_proccessed') || $type && $_SESSION['staff'] != 'waiter') {
      $data[$key]->edit = '<a class="btn btn-success" href="' . $order->id . '">Check order</a>';
    } else if ($order->order_status == 'ready_to_serve') {
      // Cheks if barman is lgged in.
      if (check_order_done($order)) {
        $data[$key]->edit = '<a class="btn btn-success" href="' . $order->id . '">Ready to serve</a>';
      } else {
        $data[$key]->edit = 'Ready to be served';
      }
    } else if ($order->order_status == 'served') {
      $data[$key]->edit = "Order has been served.";
    } else {
      if (check_order_done($order)) {
        $data[$key]->edit = '<a class="btn btn-success" href="' . $order->id . '">Ready to serve</a>';
      } else {
        $data[$key]->edit = "Waiting for other staff.";
      }
    }
  }
  return $data;
}

/**
 * Checks if order has only one item type (eg only food or only drink).
 */
function check_if_only_one_item_type($data)
{
  $type = '';
  $first = 0;
  $one = true;
  $data_decode = json_decode($data->order_list, true);
  foreach ($data_decode as $key => $order) {
    if ($first == 0) {
      $type = $order['type'];
      $first = 1;
    } else if ($type != $order['type']) {
      $one = false;
    }
  }
  // Fixes issue if order has one item and is completed.
  if ($data->order_status == 'served') return false;

  // Fixes issue when order is done and has only one item.
  if ($_SESSION['staff'] == 'barman' && $data->order_status == 'drinks_proccessed') return false;

  if (($_SESSION['staff'] == 'barman' || $_SESSION['staff'] == 'cheff') && $data->order_status == 'ready_to_serve') return false;

  // Cheks if there is only one item in order.
  if ($one) {
    return true;
  } else {
    return false;
  }
}

/**
 * Sorts out items that are not for current staff.
 */
function sort_out_order_items($data)
{
  $staff_item = check_staff();
  foreach ($data->order_list as $key => $item) {
    if ($item['type'] != $staff_item) {
      unset($data->order_list[$key]);
    }
  }
  return $data;
}

/*
* Sets item type depending on staff.
*/
function check_staff()
{
  if ($_SESSION['staff'] == 'cheff') {
    return 'Food';
  } else if ($_SESSION['staff'] == 'barman') {
    return 'Drink';
  }
}

/**
 * Checks if waiter can bring the order to the table.
 */
function check_order_done($data)
{
  if ($_SESSION['staff'] == 'waiter') {
    // If only one item is ordered.
    if (check_if_only_one_item_type($data)) {
      if ($data->order_status == 'ready_to_serve' || $data->order_status == 'drinks_proccessed') {
        return true;
      } else {
        return false;
      }
      // For normal orders.
    } else if ($data->order_status == 'ready_to_serve') {
      return true;
    } else {
      return false;
    }
  }
  return false;
}