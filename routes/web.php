<?php

Route::get('/', function (\Illuminate\Http\Request $request) {
    return view('welcome')->with([
        "restaurantMeals" => App\Models\RestaurantMeal::get(),
        "guestOrder" => $request->session()->get('guestOrder', null)
    ]);
});

Auth::routes();

Route::get('/home', 'StaffController@index')->name('home');

// Guests view
Route::post('/add-item/{id}', 'GuestOrderController@addItem')->name('addItem');
//Route::delete('/remove-item/{id}', 'GuestOrderController@removeItem')->name('addItem');
Route::delete('/remove-order', 'GuestOrderController@removeOrder')->name('removeOrder');
Route::post('/add-order', 'GuestOrderController@addOrder')->name('addOrder');

// Order status
Route::get('order-status/{id}', 'GuestOrderController@getOrderStatus')->name('orderStatus');

// Staff view
Route::post('order-status/{id}/meal-ready', 'StaffController@mealReady')->name('mealReady');
Route::post('order-status/{id}/start', 'StaffController@startOrderProcess')->name('startOrderProcess');
Route::post('order-status/{id}/serve-drinks', 'StaffController@serveDrinks')->name('serveDrinks');

