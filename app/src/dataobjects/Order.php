<?php

namespace DLabs\DataObjects;

use DLabs\DataObjects\OrderItem;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBBoolean;

class Order extends DataObject
{
    private static $table_name = "Order";

    private static $db = [
        "OrderID" => "Varchar(255)",
        "TableID" => "Varchar(255)",
        "Status" => "Varchar(255)",
        "DrinksReady" => DBBoolean::class,
        "DrinksServed" => DBBoolean::class,
        "FoodReady" => DBBoolean::class,
        "FoodServed" => DBBoolean::class,
    ];

    private static $many_many = [
        "Items" => OrderItem::class,
    ];

    private static $many_many_extraFields = [
        "Items" => [
            "Quantity" => "Int"
        ],
    ];

    public function hasDrinks()
    {
        $hasDrinks = $this->Items()->filter(["Type" => "Drink"])->first();
        if ($hasDrinks && $hasDrinks->exists()) {
            return true;
        }

        return false;
    }

    public function hasFood()
    {
        $hasFood = $this->Items()->filter(["Type" => "Food"])->first();
        if ($hasFood && $hasFood->exists()) {
            return true;
        }

        return false;
    }

    public function process($role)
    {
        $roleFormatted = mb_strtoupper(trim($role));
        if ($roleFormatted === "BARMAN") {
            $this->Status = "Processed";
            $this->DrinksReady = true;
            $this->write();
        } else if ($roleFormatted === "CHEF") {
            $this->Status = "Processed";
            $this->FoodReady = true;
            $this->write();
        } else if ($roleFormatted === "WAITER") {
            $hasDrinks = $this->hasDrinks();
            $hasFood = $this->hasFood();
            
            if ($hasDrinks && $this->DrinksReady) {
                $this->DrinksServed = true;
                $this->Status = "Delivered";
            }
            
            if ($hasFood && $this->FoodReady) {
                $this->FoodServed = true;
                $this->Status = "Delivered";
            }

            if (($hasDrinks && $hasFood && $this->DrinksReady && $this->FoodReady) || ($hasDrinks && !$hasFood && $this->DrinksReady) || (!$hasDrinks && $hasFood && $this->FoodReady)) {
                $this->Status = "Completed";
            }

            $this->write();
        }
    }
}
