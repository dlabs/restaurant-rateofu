<?php
class Customer_order_model extends CI_MODEL
{
  function __construct()
  {
    parent::__construct();
    $this->table = 'customer_order';
  }

  public function get_orders()
  {
    $query = $this->db->get($this->table);
    return $query->result();
  }
  public function get_order_id($table_id)
  {
    $query = $this->db->where('id', $table_id);
    $query = $this->db->get($this->table);
    return $query->row();
  }

  public function add_order($data)
  {
    $this->db->insert($this->table, $data);
    $insert_id = $this->db->insert_id();

    return  $insert_id;
  }

  public function update_order($data, $table_id)
  {
    $this->db->where('id', $table_id);
    $this->db->update($this->table, $data);
    return true;
  }
}