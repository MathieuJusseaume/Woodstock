<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => fake()->unique()->randomNumber(6),
            'order_date' => fake()->date,
            'delivery_date' => fake()->date,
            'quantity' => fake()->numberBetween(1, 100),
            'log_size' => fake()->numberBetween(1, 5),
            'order_price' => fake()->randomFloat(2, 10, 1000),
            'delivery_price' => fake()->randomFloat(2, 1, 100),
            'payment_status' => fake()->boolean,
            'delivery_status_id' => fake()->numberBetween(1, 3), 
        ];
    }
}