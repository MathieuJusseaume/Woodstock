<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_login_connection_success(): void
    {

        $data = [
            'email' => 'nathanael06@example.org',
            'password' => 'password'
        ];

        $response = $this->post('api/login', $data);
        $response->assertJsonStructure(['user', 'token']);

        $token = $response->json('token');
        $user = $response->json('user');
        $this->assertNotEmpty($token);
        $this->assertNotEmpty($user);
        $response->assertStatus(200);
    }

    public function test_login_connection_failed(): void
    {

        $data = [
            'email' => 'nathanael06@example.org',
            'password' => 'passord'
        ];

        $response = $this->post('api/login', $data);
        $response->assertJson([
            'user' => '',
            'token' => ''
        ]);
    }
}
