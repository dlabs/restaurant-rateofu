<?php

namespace DLabs\DataObjects;

use DLabs\DataObjects\OrderItem;
use SilverStripe\ORM\DataObject;

class Order extends DataObject
{
    private static $table_name = "Order";

    private static $db = [
        "OrderID" => "Varchar(255)",
        "TableID" => "Varchar(255)",
        "Status" => "Varchar(255)",
    ];

    private static $many_many = [
        "Items" => OrderItem::class,
    ];

    private static $many_many_extraFields = [
        "Items" => [
            "Quantity" => "Int"
        ],
    ];
}
