<?php

namespace DLabs\DataObjects;

use SilverStripe\ORM\FieldType\DBText;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBMoney;

class OrderItem extends DataObject
{
    private static $table_name = "OrderItem";

    private static $db = [
        "Name" => "Varchar(255)",
        "Type" => "Varchar(255)",
        "Price" => DBMoney::class,
    ];
}
