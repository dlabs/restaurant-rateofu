<?php
defined('BASEPATH') or exit('No direct script access allowed');

$route['default_controller'] = 'home';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['home'] = 'home';
$route['backend/addOrder'] = 'backend/addOrder';
$route['staff'] = 'staff';
$route['staff/logout'] = 'staff/logout';
$route['staff/(:any)'] = 'staff/edit';
$route['staff/(:any)/(:any)'] = 'staff/update_edit';

// $route['users/apartman/add_apartman'] = 'users/dashboard/add_apartman';
// $route['users/apartman/add'] = 'users/dashboard/add';