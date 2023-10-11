<?php

namespace Tests\Feature;

use App\Models\User; 
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_update_user_success(): void
    {
        
        $user = User::factory()->create(['company_id'=>1]); 
        Sanctum::actingAs($user);

        $data = [
            'first_name' => "Hélène",
            'first_login' => 0
        ];

        $response = $this->putJson('api/users/'.$user->id.'', $data);
        $response->assertStatus(200);
        $user->delete(); 
        
    }

    public function test_update_user_unauthenticated_failed(): void
    {
        $data = [
            'first_name' => "Hélène",
            'first_login' => 0
        ];

        $response = $this->putJson('api/users/2', $data);
        $response->assertUnauthorized();
        $response->assertStatus(401);
    }

    public function test_update_user_bad_data_type_failed(): void
    {
        
        $user = User::factory()->create(['company_id'=>1]); 
        Sanctum::actingAs($user);

        $data = [
            'first_name' => 1,
            'first_login' => 0
        ];

        $response = $this->putJson('api/users/2', $data);
        $response->assertStatus(422);
        $user->delete(); 
    }

    public function test_store_user_success(): void
    {
        
        $user = User::factory()->create(['company_id'=>1]); 
        Sanctum::actingAs($user);

        $data = [
            'first_name' => 'Harry',
            'last_name' => 'Potter',
            'first_login' => 1,
            'phone' => '0700070007',
            'password' => 'password',
            'email' => 'hello@email.com',
            'role_id' =>1, 
            'company_id' => 1,
        ];


        $response = $this->postJson('api/users', $data);
        $response->assertStatus(200);

        $userDelete = User::where('email', 'hello@email.com')->first();
        $userDelete->delete(); 
        $user->delete(); 
    }

    public function test_store_user_bad_data_type_failed(): void
    {
        
        $user = User::factory()->create(['company_id'=>1]); 
        Sanctum::actingAs($user);

        $data = [
            'first_name' => 'Harry',
            'last_name' => 'Potter',
            'first_login' => 1,
            'phone' => '0700070007',
            'password' => 'password',
            'email' => 'hello',
            'role_id' =>1, 
            'company_id' => 1,
        ];

        $response = $this->postJson('api/users', $data);
        $response->assertStatus(422);
        $user->delete(); 
    }


    public function test_store_user_unauthenticated_failed(): void
    {
        $data = [
            'first_name' => 'Harry',
            'last_name' => 'Potter',
            'first_login' => 1,
            'phone' => '0700070007',
            'password' => 'password',
            'email' => 'hello',
            'role_id' =>1, 
            'company_id' => 1,
        ];

        $response = $this->postJson('api/users', $data);
        $response->assertUnauthorized();
        $response->assertStatus(401);
    }


    public function test_destroy_user_success()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.
        $this->actingAs($user);
        // Sending a DELETE request to delete a non-existing order.
        $response = $this->delete("api/users/{$user->id}");
        // Asserting that the response status is 200 (OK).
        $response->assertStatus(200);
        // Cleaning up by deleting the created user.
        $user->delete(); 
    }

    public function test_destroy_user_failed()
    {
        // Creating a user with a company ID.
        $user = User::factory()->create(['company_id' => 1]);
        // Authenticating as the created user.

        // Sending a DELETE request to delete a non-existing order.
        $response = $this->deleteJson("api/users/{$user->id}");
        // Asserting that the response status is 404 (Not Found).
        $response->assertUnauthorized();
        $response->assertStatus(401);
        // Cleaning up by deleting the created user.
        $user->delete(); 
    }

}
