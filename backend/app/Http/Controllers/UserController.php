<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 

class UserController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_login' => 'required|integer|boolean',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        // Update the user
        User::Create($validated);

        return response()->json(['message' => 'User created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try{
            $user = User::find($user);
            return $user; 
        } catch(Error $e) {
            return response()->json(['error' => 'failed show user'], 401);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'string|max:255',
                'last_name' => 'string|max:255',
                'first_login' => 'boolean',
                'phone' => 'string|max:255',
                'password' => 'string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            ]);
    
            // Update the user
            $user->update($validated);
    
            return response()->json(['message' => 'User updated successfully', 'user'=> $user], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'failed updating user'], 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
