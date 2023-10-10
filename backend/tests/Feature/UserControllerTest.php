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
        $dataUser = $response->json('user');
        $this->assertNotEmpty($dataUser);
        $response->assertStatus(200);

        $user->delete(); 
        
    }

    public function test_update_user_unauthenticated_failed(): void
    {
        $data = [
            'first_name' => "Hélène",
            'first_login' => 0
        ];

        $response = $this->putJson('api/users/1', $data);
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

        $response = $this->putJson('api/users/1', $data);
        $response->assertStatus(422);
        $user->delete(); 
    }
}
