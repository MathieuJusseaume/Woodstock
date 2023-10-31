<?php

namespace Tests\Feature\Auth;

use App\Models\User; 
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{

    public function test_new_users_can_register(): void
    {
       $data = [
        'first_name' => 'Harry',
        'last_name' => 'Potter',
        'first_login' => 1,
        'phone' => '0700070007',
        'password' => 'password',
        'email' => 'hello2@email.com',
        'role_id' => 1 , 
        'company_id' => 1
       ];
        $response = $this->postJson('/register', $data);

        $response->assertNoContent();
        User::where('email', 'hello2@email.com')->delete(); 
    }
}
