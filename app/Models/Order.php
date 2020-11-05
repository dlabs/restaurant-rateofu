<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const TYPE_ORDER_DRINK = 'drink';
    const TYPE_ORDER_FOOD = 'food';

    /**
     * Used for caching purposes to avoid multiple database calls
     *
     * @var
     */
    private $meals;

    /**
     * @var array
     */
    protected $appends = [
        "drinksStatus",
        "foodsStatus"
    ];

    /**
     * Returns the meals as array
     *
     * @return mixed
     */
    public function getMealsAttribute()
    {
        if (!empty($this->meals)) {
            return $this->meals;
        }

        $this->meals = json_decode($this->attributes["meals"], true);
        return $this->meals;
    }

    /**
     * Sets the meals as json encoded string
     *
     * @param $value
     */
    public function setMealsAttribute($value)
    {
        $this->attributes["meals"] = json_encode($value);
    }

    /**
     * Returns the food that needs to be prepared. The flag is to tell if we want to check if the product is ready
     *
     * @param bool $checkIfReady
     * @return array
     */
    public function getFoodToPrepare($checkIfReady = true)
    {
        $food = [];
        foreach ($this->getMealsAttribute() as $meal) {
            if (!$checkIfReady && $meal["type"] === self::TYPE_ORDER_FOOD) {
                array_push($food, $meal);
                continue;
            }

            if ($meal["type"] === self::TYPE_ORDER_FOOD && !$meal["isProductReady"]) {
                array_push($food, $meal);
            }
        }

        return $food;
    }

    /**
     * Returns the drinks that need to be prepared. The flag is to tell if we want to check if the product is ready
     *
     * @param bool $checkIfReady
     * @return array
     */
    public function getDrinksToPrepare($checkIfReady = true)
    {
        $drinks = [];
        foreach ($this->getMealsAttribute() as $meal) {
            if (!$checkIfReady && $meal["type"] === self::TYPE_ORDER_DRINK) {
                array_push($drinks, $meal);
                continue;
            }

            if ($meal["type"] === self::TYPE_ORDER_DRINK && !$meal["isProductReady"]) {
                array_push($drinks, $meal);
            }
        }

        return $drinks;
    }

    /**
     * Returns whether the drinks are ready to be served
     *
     * @return bool
     */
    public function getDrinksStatusAttribute()
    {
        foreach ($this->getMealsAttribute() as $meal) {
            if ($meal["type"] === self::TYPE_ORDER_DRINK && !$meal["isProductReady"]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Returns the food status
     */
    public function getFoodsStatusAttribute()
    {
        foreach ($this->getMealsAttribute() as $meal) {
            if ($meal["type"] === self::TYPE_ORDER_FOOD && !$meal["isProductReady"]) {
                return false;
            }
        }

        return true;
    }
}
