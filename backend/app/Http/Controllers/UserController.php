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
        $users = User::all();
        return response()->json(['message' => 'Users recorvery successfully', 'users'=> $users], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_login' => 'required|boolean',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,',
            'role_id' =>'required|integer', 
            'company_id' => 'required|integer',

        ]);

        // Update the user
        $user= User::Create($validated);

        return response()->json(['message' => 'User created successfully', 'user'=> $user], 200);
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
    public function destroy(User $user)
    {
        try {
            if ($user) {
                // Delete the user if it exists.
                $user->delete(); 
                return response()->json(['message' => 'Delete successfully'], 200);
            } else {
                return response()->json(['message' => 'user not found'], 404);
            }
        } catch (\Exception $e) {
            // Handle the exception here
            return response()->json(['error' => 'Failed deleting user'], 500);
        }
    }
}
