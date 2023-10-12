<?php

namespace Tests\Feature;

use App\Models\User; 
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_login_connection_success(): void
    {
        $user = User::factory()->create(['company_id' => 1]); 
        $data = [
            'email' => $user->email,
            'password' => "password"
        ];

        $response = $this->post('api/login', $data);
        $this->assertAuthenticated();
        $user->delete(); 
    }

    public function test_login_connection_failed(): void
    {

        $data = [
            'email' => 'nathanael06@example.org',
            'password' => 'passord'
        ];

        $response = $this->post('api/login', $data);
        $this->assertGuest();
    }

    public function test_logout_connection_success(): void
    {
        $user = User::factory()->create(['company_id' => 1]); 
        $data = [
            'email' => $user->email,
            'password' => "password"
        ];

        $response = $this->postJson('api/login', $data);
        $this->assertAuthenticated();

        $response = $this->postJson('api/logout');
        $this->assertEquals($response['message'], 'Logged out successfully'); 
        $response->assertStatus(200);
        $user->delete(); 
    }

    public function test_logout_failed(): void
    {
        $response = $this->postJson('api/logout');
        $response->assertUnauthorized();
        $response->assertStatus(401);

    }

}
