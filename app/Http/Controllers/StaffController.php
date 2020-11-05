<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\User;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * @var \App\User
     */
    private $authenticatedUser;

    /**
     * Create a new controller instance. User must be logged in to have access to it
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $this->authenticatedUser = auth()->user();

        switch ($this->authenticatedUser->type) {
            case User::TYPE_USER_BARMAN:
                $data = $this->formatBarmanData();
                break;
            case User::TYPE_USER_CHEF:
                $data = $this->formatChefData();
                break;
            case User::TYPE_USER_WAITER:
                $data = $this->formatWaiterData();
                break;
            default:
                $data = $this->formatChefData();
        }


        return view('home')->with([
            "data" => $data,
        ]);
    }

    /**
     * Marks an order's meal as ready
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function mealReady(Request $request, int $id)
    {
        $order = Order::findOrFail($id);

        $meals = $order->meals;
        $quantityPrepared = (int)$request->input("quantity");
        foreach ($meals as $key => $meal) {
            if ($meal["name"] !== $request->input("mealName")) {
                continue;
            }

            if (!isset($meals[$key]["alreadyPrepared"])) {
                $meals[$key]["alreadyPrepared"] = 0;
            }

            if ($quantityPrepared < (int)$meal["quantity"]) {
                $mealsPrepared = $quantityPrepared + $meals[$key]["alreadyPrepared"];
                $meals[$key]["alreadyPrepared"] = $mealsPrepared;
                if ($mealsPrepared === (int)$meal["quantity"]) {
                    $meals[$key]["isProductReady"] = true;
                }
                break;
            }

            $mealsPrepared = $quantityPrepared + $meals[$key]["alreadyPrepared"];
            if ($mealsPrepared === (int)$meal["quantity"]) {
                \Log::info("asdasasdasdadad");
                $meals[$key]["isProductReady"] = true;
                break;
            }
        }

        $order->meals = $meals;
        $order->save();

        $order = Order::findOrFail($id);
        if ($order->getFoodToPrepare()) {

        }

        if (count($order->getFoodToPrepare()) === 0 && count($order->getDrinksToPrepare()) === 0) {
            $order->finished = true;
            $order->save();
        }

        return $this->index();
    }

    /**
     * Marks the order as being processed
     *
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function startOrderProcess(int $id)
    {
        $order = Order::findOrFail($id);
        $order->processing = true;
        $order->save();

        return $this->index();
    }

    public function serveDrinks(int $id)
    {
        $order = Order::findOrFail($id);
        $order->drinks_served = true;
        $order->save();

        return $this->index();
    }

    /**
     * Formats the chef's data that is needed to be returned
     *
     * @return array
     */
    private function formatChefData(): array
    {
        $orders = Order::where("finished", false)
            ->orderBy("created_at")
            ->get();

        $chefOrders = [];
        foreach ($orders as $key => $order) {
            $foodToPrepare = $order->getFoodToPrepare();
            if (empty($foodToPrepare)) {
                $orders->forget($key);
                continue;
            }

            $chefOrders[] = [
                "order"         => $order,
                "mealToPrepare" => $foodToPrepare,
            ];
        }

        return [
            "type"   => $this->authenticatedUser->type,
            "name"   => $this->authenticatedUser->name,
            "orders" => $chefOrders,
        ];
    }

    /**
     * Formats the barman's data that is needed to be returned
     *
     * @return array
     */
    private function formatWaiterData(): array
    {
        $orders = Order::where(function ($query) {
            $query->orWhere("food_served", false)
                ->orWhere("drinks_served", false);
        })
            ->orderBy("created_at")
            ->get();

        foreach ($orders as $key => $order) {
            $drinksToServe = $order->getDrinksToPrepare(false);
            $needToServeDrinks = true;
            foreach ($drinksToServe as $drink) {
                if (!$drink["isProductReady"]) {
                    $needToServeDrinks = false;
                    break;
                }
            }

            $options["serveDrinks"] = $needToServeDrinks;

            $foodToServe = $order->getFoodToPrepare(false);
            $needToServeFood = true;
            foreach ($foodToServe as $drink) {
                if (!$drink["isProductReady"]) {
                    $needToServeFood = false;
                    break;
                }
            }

            $options["serveFood"] = $needToServeFood;

            $waiterOrders[] = [
                "order" => $order,
                $options,
            ];
        }

        return [
            "type"   => $this->authenticatedUser->type,
            "name"   => $this->authenticatedUser->name,
            "orders" => $waiterOrders,
        ];
    }

    /**
     * Formats the barman's data that is needed to be returned
     *
     * @return array
     */
    private function formatBarmanData(): array
    {
        $orders = Order::where("finished", false)
            ->orderBy("created_at")
            ->get();

        $chefOrders = [];
        foreach ($orders as $key => $order) {
            $foodToPrepare = $order->getDrinksToPrepare();
            if (empty($foodToPrepare)) {
                $orders->forget($key);
                continue;
            }

            $chefOrders[] = [
                "order"         => $order,
                "mealToPrepare" => $foodToPrepare,
            ];
        }

        return [
            "type"   => $this->authenticatedUser->type,
            "name"   => $this->authenticatedUser->name,
            "orders" => $chefOrders,
        ];
    }
}
