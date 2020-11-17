<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

  public function index()
  {
    $data = [];
    $data['menu'] = $this->Menu_model->get_menu();
    $this->template->load('home', 'default', 'index', $data);
  }
}