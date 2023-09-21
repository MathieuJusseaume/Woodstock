<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'first_name' => 'Woody',
                'last_name' => 'Woodpecker',
                'email' => 'wwpecker@gmail.com',
                'phone' => '01 23 45 67 89',
                'password' => "password",
                'role_id' => 1,
                'company_id' => 1,
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'first_name' => 'Robin',
                'last_name' => 'Des Bois',
                'email' => 'rdesbois@gmail.com',
                'phone' => '05 23 55 67 89',
                'password' => "password1",
                'role_id' => 1,
                'company_id' => 2,
                'created_at' => now(),
                'updated_at' => null,
            ],
        ];

        DB::table('users')->insert($users);
    }
}
