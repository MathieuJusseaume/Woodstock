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

}
