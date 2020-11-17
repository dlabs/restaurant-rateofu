<?php
class Translation_model extends CI_MODEL{
	function __construct(){
		parent::__construct();
		$this->table = 'translation'; 
	}

	public function add($data){
        $this->db->insert($this->table, $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }
	public function get_translation($language){
        $query = $this->db->where('language', $language);
        $query = $this->db->get($this->table);
		return $query->row();
    }
	public function get_translation_home($language){
        $query = $this->db->where('language', $language);
		$query = $this->db->get($this->table);
		$result = $query->first_row('array');
		return $result;
    }
    
	public function update($data, $language) {
		$this->db->where('language', $language);
		$this->db->update($this->table,$data);
		return true; 
	}

	public function get_language_status_where_l($language) {
		$query = $this->db->where('language', $language);
        $query = $this->db->get('language');
		return $query->row();
	}

	public function get_language_status() {
		$query = $this->db->get('language');
		return $query->result();
	}

	public function update_language($data, $language) {
		$this->db->where('language', $language);
		$this->db->update('language',$data);
		return true; 
	}
}

