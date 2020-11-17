<?php
class Menu_model extends CI_MODEL
{
  function __construct()
  {
    parent::__construct();
    $this->table = 'menu';
  }
  public function get_menu()
  {
    $query = $this->db->get($this->table);
    return $query->result();
  }
}