<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
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

        DB::table('companies')->insert($companies);
    }
}
