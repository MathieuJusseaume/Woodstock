<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser = Auth::user();

        $orders = Client::where('company_id', $authUser->company_id)->get();
        return response()->json($orders);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();
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
        ]);
        $validatedData['company_id'] = $authUser->company_id;
        $client = Client::create($validatedData);
        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $authUser = Auth::user();
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        if ($client->company_id !== $authUser->company_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $authUser = Auth::user();
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        if ($client->company_id !== $authUser->company_id) {
            return response()->json(['error' => 'Forbidden'], 403);
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
        ]);

        $validatedData['company_id'] =$authUser->company_id;
        $client->update($validatedData);
        return response()->json($client);    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $authUser = Auth::user();
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        if ($client->company_id !== $authUser->company_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted'], 200);    }
}
