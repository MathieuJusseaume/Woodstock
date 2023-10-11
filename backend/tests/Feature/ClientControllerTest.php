<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Response;
use App\Models\Client; 
use App\Models\User; 




class ClientControllerTest extends TestCase
{

    public function test_can_create_client()

    {
        Client::where('email', 'barbie@gmail.com')->delete();

        $user = User::factory()->create();
        $this->actingAs($user);

        $clientData = [
            'last_name' => 'Doll',
            'first_name' => 'Barbie',
            'delivery_address' => '7 rue avion rose',
            'delivery_zip_code' => 78526,
            'delivery_city' => 'Barbieland',
            'billing_address' => '2 avenue Ken',
            'billing_zip_code' => 89625,
            'billing_city' => 'Kenland',
            'email' => 'barbie@gmail.com',
            'phone' => '0123456987',
            'company_id' => 1
        ];

        $response = $this->postJson('/api/clients', $clientData);

        $response->assertStatus(Response::HTTP_CREATED)
            ->assertJson($clientData);

        Client::where('email', 'barbie@gmail.com')->delete();
        $user->delete();
    }


    public function test_fail_create_client()
    {

        $user = User::factory()->create();
        $this->actingAs($user);

        $clientData = [
            'last_name' => 'Doll',
            'first_name' => 'Barbie',
            'delivery_address' => '7 rue avion rose',
            'delivery_zip_code' => '78526',
            'delivery_city' => 'Barbieland',
            'billing_address' => '2 avenue Ken',
            'billing_zip_code' => '89625',
            'billing_city' => 'Kenland',
            'email' => 'barbie@gmail.com',
            'phone' => '012345698712356546541321246496878951321634896749845132165489498',
            'company_id' => '1'
        ];

        $response = $this->postJson('/api/clients', $clientData);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $user->delete();
    }

    public function test_can_get_client()
    {

        $user = User::factory()->create();
        $this->actingAs($user);


        $client = Client::factory()->create();


        $response = $this->getJson("/api/clients/{$client->id}");


        $response->assertStatus(Response::HTTP_OK)
            ->assertJson($client->toArray());

        $user->delete();
        $client->delete();
    }

    public function test_can_update_client()
    {
        Client::where('email', 'barbie@gmail.com')->delete();


        $user = User::factory()->create();
        $this->actingAs($user);


        $client = Client::factory()->create();
        $updatedData = [
            'last_name' => 'Doll',
            'first_name' => 'Barbie',
            'delivery_address' => '7 rue avion rose',
            'delivery_zip_code' => '78526',
            'delivery_city' => 'Barbieland',
            'billing_address' => '2 avenue Ken',
            'billing_zip_code' => '89625',
            'billing_city' => 'Kenland',
            'email' => 'barbie@gmail.com',
            'phone' => '0123456987',
            'company_id' => '1'
        ];

        $response = $this->putJson("/api/clients/{$client->id}", $updatedData);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson($updatedData);

        $user->delete();
        $client->delete();
    }

    public function test_can_delete_client()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $client = Client::factory()->create();

        $response = $this->deleteJson("/api/clients/{$client->id}");

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson(['message' => 'Client deleted']);
        
        $user->delete();
        $client->delete();
    }


    
}
