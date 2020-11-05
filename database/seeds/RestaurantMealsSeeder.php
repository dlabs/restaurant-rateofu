<?php

use App\Models\RestaurantMeal;
use Illuminate\Database\Seeder;

class RestaurantMealsSeeder extends Seeder
{
    /**
     * Run the database restaurant meals.
     *
     * @return void
     */
    public function run()
    {
        $meals = [
            [
                "name"  => "Grilled space-whale steak with algae puree",
                "type"  => "food",
                "price" => "66.50",
            ],
            [
                "name"  => "Tea substitute",
                "type"  => "drink",
                "price" => "1.50",
            ],
            [
                "name"  => "Hagro biscuit",
                "type"  => "food",
                "price" => "32.00",
            ],
            [
                "name"  => "Ameglian Major Cow casserole",
                "type"  => "food",
                "price" => "55.75",
            ],
            [
                "name"  => "Pan Galactic Gargle Blaster",
                "type"  => "drink",
                "price" => "5.50",
            ],
            [
                "name"  => "Janx Spirit",
                "type"  => "drink",
                "price" => "7.00",
            ],
            [
                "name"  => "Tzjin-anthony-ks",
                "type"  => "drink",
                "price" => "11.50",
            ]
        ];

        foreach ($meals as $meal) {
            $meal = RestaurantMeal::create([
                'name'  => $meal["name"],
                'type'  => $meal["type"],
                'price' => $meal["price"],
            ]);

            $meal->save();
        }
    }
}
