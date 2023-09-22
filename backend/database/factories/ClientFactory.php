<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->name(),
            'last_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'delivery_address' => fake()->address(),
            'delivery_zip_code' => 123345,
            'delivery_city' => fake()->country(),
            'billing_address' => fake()->address(),
            'billing_zip_code' => 123345,
            'billing_city' => fake()->country(),
            'company_id' => random_int(1, 2),
        ];

    }
}
