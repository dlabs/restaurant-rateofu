<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RestaurantMeal;
use Illuminate\Http\Request;

class GuestOrderController extends Controller
{
    /**
     * Adds the item to guest's "basket"
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function addItem(Request $request, int $id)
    {
        $restaurantMeal = RestaurantMeal::findOrFail($id);

        $guestOrder = $request->session()->get('guestOrder', null);
        if (is_null($guestOrder) || !array_key_exists($id, $guestOrder)) {
            $guestOrder[$id] = [
                "name"     => $restaurantMeal->name,
                "quantity" => $request->input("quantity"),
                "price"    => $restaurantMeal->price,
            ];
        } else {
            if (array_key_exists($id, $guestOrder)) {
                $newQuantity = $guestOrder[$id]["quantity"] + $request->input("quantity");
                $guestOrder[$id] = [
                    "name"     => $restaurantMeal->name,
                    "quantity" => $newQuantity,
                    "price"    => ($restaurantMeal->price * $newQuantity),
                ];
            }
        }

        $request->session()->put('guestOrder', $guestOrder);

        return view('welcome')
            ->with([
                "restaurantMeals" => RestaurantMeal::get(),
                "guestOrder"      => $guestOrder
            ]);
    }

    /**
     * Removes item from guest's basket
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     */
    public function removeItem(Request $request, int $id)
    {
        // TODO implementiraj če bo čas
    }

    /**
     * Removes the guest's basket entirely
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function removeOrder(Request $request)
    {
        $request->session()->forget("guestOrder");

        return view('welcome')->with([
            "restaurantMeals" => RestaurantMeal::get(),
        ]);
    }

    /**
     * Adds the order and navigate to the order-summary view
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function addOrder(Request $request)
    {
        if (!$request->session()->has("guestOrder")) {
            return view('welcome')->with([
                "restaurantMeals" => RestaurantMeal::get(),
            ]);
        }

        $guestOrderInformation = $request->session()
            ->get("guestOrder");

        foreach ($guestOrderInformation as $key => $information) {
            $guestOrderInformation[$key]["isProductReady"] = false;
            $guestOrderInformation[$key]["type"] = RestaurantMeal::findOrFail($key)->type;
        }

        $order = new Order();
        $order->meals = $guestOrderInformation;
        $order->save();

        $request->session()->forget("guestOrder");

        return redirect("order-status/" . $order->id)->with("order", $order);
    }

    /**
     * Returns the status of the current order
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getOrderStatus(Request $request, int $id)
    {
        return view("order-summary")->with("order", Order::findOrFail($id));
    }
}
