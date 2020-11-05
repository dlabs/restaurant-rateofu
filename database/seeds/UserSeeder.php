<?php

use App\Models\RestaurantMeal;
use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seed for users.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                "name"  => "Chef Luigi",
                "type"  => "chef",
                "password" => "chef123",
            ],
            [
                "name"  => "Barman Bar",
                "type"  => "barman",
                "password" => "barman123",
            ],
            [
                "name"  => "Waiter Wait",
                "type"  => "waiter",
                "password" => "waiter123",
            ],
        ];

        foreach ($users as $user) {
            $user = User::create([
                "name" => $user["name"],
                "type" => $user["type"],
                "password" => bcrypt($user["password"]),
                "email" => $user["type"] . "@example.com",
            ]);

            $user->save();
        }
    }
}
