<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Error;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser = Auth::user();
        try {
            $client = Client::where('company_id', $authUser->company_id)->get();
            return response()->json(['message' => 'Clients recorvery successfully', 'client' => $client], 200);
        } catch (Error $error) {
            return response()->json(['error' => 'failed to get client']);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();

        try {
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
            return response()->json(['message' => 'Client created successfully', 'client' => $client], 200);
        } catch (Error $error) {
            return response()->json(['error' => 'failed to store client']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $authUser = Auth::user();
        $client = Client::with(['orders'])->find($id);

        try {
            return $client->company_id == $authUser->company_id
                ? response()->json(['user' => $client], 200)
                : response()->json(['error' => 'Forbidden'], 403);
        } catch (Error $e) {
            return response()->json(['error' => 'failed show client']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $authUser = Auth::user();
        $client = Client::find($id);

        try {
            $validated = $request->validate([
                'last_name' => 'string|max:50',
                'first_name' => 'string|max:50',
                'delivery_address' => 'string|max:50',
                'delivery_zip_code' => 'numeric|digits:5',
                'delivery_city' => 'string|max:50',
                'billing_address' => 'string|max:50',
                'billing_zip_code' => 'numeric|digits:5',
                'billing_city' => 'string|max:50',
                'email' => 'email:rfc,dns',
                'phone' => 'string|max:10',
            ]);

            if ($client->company_id == $authUser->company_id) {
                // Update the user
                $client->update($validated);
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Client updated successfully', 'client' => $client], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden', 'client' => $client], 403);
            }
        } catch (Error $e) {
            return response()->json(['error' => 'failed updating client']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $authUser = Auth::user();

        try {
            // Check if the company ID of the user to be deleted matches the company ID of the authenticated user
            if ($client->company_id == $authUser->company_id) {
                // Delete the user if it exists
                $client->delete();
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Delete successfully'], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden'], 403);
            }
        } catch (Error $e) {
            // Handle any exceptions that might occur during the deletion process
            return response()->json(['error' => 'Failed deleting client']);
        }
    }
}
