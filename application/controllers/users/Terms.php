<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Terms extends CI_Controller
{

  public function index()
  {
    $data = [];
    $data['language_switch'] = $this->Translation_model->get_language_status();
    $this->template->load('users', 'default', 'terms', $data);
  }

  public function terms_lang()
  {
    $uri = $this->uri->segment(3);
    $data = [];
    $data['direction'] = $uri;

    $data['company'] = $this->Company_model->get();
    $this->template->load('users', 'default', 'terms_lang', $data);
  }

  public function edit()
  {
    $data = array();
    $language = $this->uri->segment(4);
    $direction = $this->uri->segment(3);
    $data['terms'] = $this->Terms_model->get_terms($direction, $language);
    if (isset($_GET['save'])) {
      if (empty($data['terms'])) {
        print_r("Wronge language selected");
        die;
      }
      $translations = $data['terms'];
      $query = [];
      $query['title'] = $this->input->post('title');
      $query['content'] = $this->input->post('content');
      $save = $this->Terms_model->update($query, $direction, $language);
      if ($save) {
        $this->session->set_flashdata('success', 'Podatki so bili uspešno urejeni.');
        redirect('/users/terms');
      } else {
        $this->session->set_flashdata('alert', 'Prišlo je do napake pri urejanju. Prosimo poskusite ponovno.');
        redirect('/users/terms');
      }
    }

    $this->template->load('users', 'default', 'terms_edit', $data);
  }
}