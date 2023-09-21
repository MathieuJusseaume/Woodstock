<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $clients = Client::factory()
            ->count(6)
            ->create();
    }
}
