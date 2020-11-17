<?php if(! defined('BASEPATH')) exit ('No direct script access allowed'); //This disables direct access
class Template{
	var $ci;

	function __construct(){
		$this->ci =& get_instance();
	}

	function load($loc, $tpl_name, $view, $data = null){
		if($loc == 'users' && $tpl_name == 'default'){
			$tpl_name = 'users';
		}

		if($loc == 'public' && $tpl_name == 'default'){
			$tpl_name = 'public';
		}

		if($loc == 'home' && $tpl_name == 'default'){
			$tpl_name = 'home';
		}
		if($loc == 'demo' && $tpl_name == 'default'){
			$tpl_name = 'demo';
		}

		if($loc == 'ponudba' && $tpl_name == 'default'){
			$tpl_name = 'ponudba';
		}

		if($loc == 'apartman' && $tpl_name == 'default'){
			$tpl_name = 'apartman';
		}

		if($loc == 'login' && $tpl_name == 'default'){
			$tpl_name = 'login';
		}

		$data['main'] = $loc.'/'.$view;
		$this->ci->load->view('Templates/'.$tpl_name, $data);
	}
}