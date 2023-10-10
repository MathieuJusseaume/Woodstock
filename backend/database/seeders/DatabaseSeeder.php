<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Client;
use App\Models\Company;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $companiesSeeders = [
            [
                'name' => 'Entreprise A',
                'phone' => '00 00 00 00 00',
                'address' => 'Adresse entreprise A',
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'name' => 'Entreprise B',
                'phone' => '11 11 11 11 11',
                'address' => 'Adresse entreprise B',
                'created_at' => now(),
                'updated_at' => null,
            ],

        ];

        $roles = [
            [
                'name' => 'Admin',
                'created_at' => now(),
                'updated_at' => null,
            ],
        ];

        

        $deliveryStatuses = [
            [
                'name' => 'Livrée',
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'name' => 'A livrer',
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'name' => 'Problème',
                'created_at' => now(),
                'updated_at' => null,
            ],
        ];

        DB::table('delivery_statuses')->insert($deliveryStatuses);
        DB::table('roles')->insert($roles);
        DB::table('companies')->insert($companiesSeeders);



        $companies = Company::All();

        $companies->each(function ($company) {
            $users = User::factory()->count(1)->create(['company_id' => $company->id]);
            $clients = Client::factory()->count(3)->create(['company_id' => $company->id]);

            foreach($clients as $client) {
                $date = fake()->dateTime();
                $orders = [
                    [
                        'order_number' => rand(1,500),
                        'order_date' => $date,
                        'delivery_date' => $date->modify('+30 day'),
                        'quantity' => rand(1,100),
                        'log_size' => fake()->randomElement([25, 33, 50, 100]),
                        'order_price' => rand(40, 500),
                        'delivery_price' => rand(20, 100),
                        'payment_status' => fake()->boolean(),
                        'delivery_status_id' => rand(1, 3),
                        'client_id' => $client->id,
                        'company_id' => $company->id,
                        'user_id' => $users[0]->id,
                        'created_at' => now()
                    ], 

                    [
                        'order_number' => rand(1,500),
                        'order_date' => $date,
                        'delivery_date' => $date->modify('+30 day'),
                        'quantity' => rand(1,100),
                        'log_size' => fake()->randomElement([25, 33, 50, 100]),
                        'order_price' => rand(40, 500),
                        'delivery_price' => rand(20, 100),
                        'payment_status' => fake()->boolean(),
                        'delivery_status_id' => rand(1, 3),
                        'client_id' => $client->id,
                        'company_id' => $company->id,
                        'user_id' => $users[0]->id, 
                        'created_at' => now()
                    ], 
                ]; 
                DB::table('orders')->insert($orders);
            } 
        });
    }
}

