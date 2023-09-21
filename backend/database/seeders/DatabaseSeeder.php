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

        DB::table('companies')->insert($companiesSeeders);
        $companies = Company::All();

        $companies->each(function ($company) {
            $user = User::factory()->count(1)->create(['company_id' => $company->id]);
            $clients = Client::factory()->count(3)->create(['company_id' => $company->id, 'user_id' => $user->id]);
            $clients->each(function ($client) use ($company) {
                $orders = Order::factory()->count(2)->create([
                    'client_id' => $client->id,
                    'company_id' => $company->id,
                    'user_id' => $user->id,
                ]);
            });
        }
        );
    }
}
