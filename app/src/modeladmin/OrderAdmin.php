<?php

namespace DLabs\ModelAdmins;

use DLabs\DataObjects\Order;
use DLabs\DataObjects\OrderItem;
use SilverStripe\Admin\ModelAdmin;

class OrderAdmin extends ModelAdmin 
{
    private static $managed_models = [
        OrderItem::class,
        Order::class,
    ];

    private static $url_segment = 'orders';

    private static $menu_title = 'Order Admin';
}