<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Order;

class OrderControllerTest extends TestCase
{

    use WithFaker; 

    public function test_index_order_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Sending a GET request to 'api/orders'.
        $response = $this->get('api/orders');
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Asserting the JSON structure of the response.
        $response->assertJsonStructure([
            'order' => [
                '*' => [
                    'order_number',
                    'order_date',
                    'delivery_date',
                    'quantity',
                    'log_size',
                    'order_price',
                    'delivery_price',
                    'client_id',
                    'delivery_status_id',
                ],
            ],
        ]);
        // Cleaning up by deleting the created user.
        $user->delete();
    }

    public function test_show_order_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Sending a GET request to 'api/orders'.
        $orderShow = Order::factory()->create(['company_id' => 1, 'user_id'=> $user->id, 'client_id' => 2 ]);
        // Sending a PUT request to update an order.
        $orderShow = Order::latest()->first();

        $response = $this->get("api/orders/{$orderShow->id}");
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Asserting the JSON structure of the response.

        // Cleaning up by deleting the created user.
        $user->delete();
        $orderShow->delete();
    }

    public function test_store_order_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Data for creating a new order.
        $orderData = [
            'order_number' => 1000,
            'order_date' => '2034-04-15',
            'delivery_date' => '2034-04-24',
            'quantity' => 15,
            'log_size' => 16,
            'order_price' => 500,
            'delivery_price' => 600,
            'client_id' => 1,
            'user_id' => 1
        ];
        // Sending a POST request to 'api/orders' with order data.
        $response = $this->postJson('api/orders', $orderData);
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Finding and deleting the created order to clean up.
        $orderDelete = Order::where('order_number', 1000);
        $orderDelete->delete();
        // Cleaning up by deleting the created user.
        $user->delete();
    }

    public function test_store_order_failed()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Data for creating a new order with invalid data.
        $orderData = [
            'order_number' => 2,
            'order_date' => '2034-04-15',
            'delivery_date' => '2034-04-24',
            'quantity' => 15,
            'log_size' => 16,
            'order_price' => 500,
            'delivery_price' => 'abc',
            'client_id' => 1,
        ];
        // Sending a POST request to 'api/orders' with invalid order data.
        $response = $this->postJson('api/orders', $orderData);
        // Asserting that the response status is 422 (Unprocessable Entity).
        $response->assertStatus(422);
        // Cleaning up by deleting the created user.
        $user->delete();
    }

    public function test_update_order_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Data for updating an existing order.
        $orderData = [
            'quantity' => 245,
            'order_price' => 5,
        ];
        $orderUpdate = Order::factory()->create(['company_id' => 1, 'user_id'=> 2, 'client_id' => 2 ]);
        // Sending a PUT request to update an order.
        $orderUpdate = Order::latest()->first();
        $response = $this->putJson("api/orders/{$orderUpdate->id}", $orderData);
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Cleaning up by deleting the created user.
        $user->delete();
        Order::latest()->first()->delete();
    }

    public function test_update_order_failed()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        $orderUpdate = Order::factory()->create(['company_id' => 1, 'user_id'=> 2, 'client_id' => 2 ]);
        $orderNotFound = $orderUpdate->id;
        Order::latest()->first()->delete();
        // Data for updating an order that doesn't exist.
        $orderData = [
            'quantity' => 245,
            'order_price' => 5,
        ];
        // Sending a PUT request to update a non-existing order.
        $response = $this->putJson("api/orders/{$orderNotFound}", $orderData);
        // Asserting that the response status is 404 (Not Found).
        $response->assertStatus(404);
        // Cleaning up by deleting the created user.
        $user->delete();
    }

    public function test_update_order_forbidden(): void
    {
        $user = User::factory()->create(['company_id'=> 1]); 
        $this->actingAs($user);

        $data = [
            'order_number' => 5,
        ];
        $orderUpdate = Order::factory()->create(['company_id' => 2, 'user_id'=> 2, 'client_id' => 2 ]);
        $response = $this->putJson("api/orders/{$orderUpdate->id}", $data);
        $response->assertStatus(403);
        $user->delete(); 
        $orderUpdate->delete();
    }

    public function test_destroy_order_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        $orderDelete = Order::factory()->create(['company_id' => 1, 'user_id'=> 2, 'client_id' => 2 ]);
        
        // Sending a DELETE request to delete an order.
        $response = $this->delete("api/orders/{$orderDelete->id}");
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Cleaning up by deleting the created user.
        $user->delete(); 
    }

    public function test_destroy_order_failed()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        $orderUpdate = Order::factory()->create(['company_id' => 1, 'user_id'=> 2, 'client_id' => 2 ]);
        $orderNotFound = $orderUpdate->id;
        Order::latest()->first()->delete();
        // Sending a DELETE request to delete a non-existing order.
        $response = $this->delete("api/orders/{$orderNotFound}");
        // Asserting that the response status is 404 (Not Found).
        $response->assertStatus(404);
        // Cleaning up by deleting the created user.
        $user->delete(); 
    }

    public function test_destroy_order_forbidden()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        $orderUpdate = Order::factory()->create(['company_id' => 2, 'user_id'=> 2, 'client_id' => 2 ]);
        $response = $this->delete("api/orders/{$orderUpdate->id}");
        // Asserting that the response status is 404 (Not Found).
        $response->assertStatus(403);
        // Cleaning up by deleting the created user.
        $user->delete(); 
        Order::latest()->first()->delete();
    }
}