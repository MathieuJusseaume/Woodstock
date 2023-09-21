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
        $date = fake()->dateTime();

        return [
            'order_number' => fake()->unique()->randomNumber(10, true),
            'order_date' => $date,
            'delivery_date' => $date->modify('+30 day'),
            'quantity' => fake()->randomDigitNoNull(),
            'log_size' => fake()->randomElements([25, 33, 50, 100]),
            'order_price' => fake()->numberBetween(40, 500),
            'delivery_price' => fake()->numberBetween(20, 100),
            'payment_status' => fake()->boolean(),
            'delivery_status_id' => fake()->numberBetween(1, 3),
        ];
    }

}
