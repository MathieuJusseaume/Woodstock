<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'delivery_address' => 'required|string|max:50',
            'delivery_zip_code' => 'required|numeric|digits:5',
            'delivery_city' => 'required|string|max:50',
            'billing_address' => 'required|string|max:50',
            'billing_zip_code' => 'required|numeric|digits:5',
            'billing_city' => 'required|string|max:50',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|string|max:10',
            'company_id' => 'required|numeric'
        ]);

        $client = Client::create($validatedData);

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        return response()->json($client);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        $validatedData = $request->validate([
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'delivery_address' => 'required|string|max:50',
            'delivery_zip_code' => 'required|numeric|digits:5',
            'delivery_city' => 'required|string|max:50',
            'billing_address' => 'required|string|max:50',
            'billing_zip_code' => 'required|numeric|digits:5',
            'billing_city' => 'required|string|max:50',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|string|max:10',
            'company_id' => 'required|numeric'
        ]);

        $client->update($validatedData);

        return response()->json($client);    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted'], 200);    }
}
