<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();

        Order::factory()
            ->recycle($companies)
            ->create();
    }
}
