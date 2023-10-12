<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelIgnition\Recorders\DumpRecorder\Dump;
use Error;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser =  Auth::user();
        $users = User::where('company_id', $authUser->company_id)->get();
        return response()->json(['message' => 'Users recorvery successfully', 'users'=> $users], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $authUser =  Auth::user();
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_login' => 'required|boolean',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,',
            'role_id' =>'required|integer', 
        ]);

        // Set default values for some fields.
        $validated['company_id'] = $authUser->company_id;

        // Update the user
        $user = User::Create($validated);

        return response()->json(['message' => 'User created successfully', 'user'=> $user], 200);
    }

    
    public function show(User $user)
    {
        $authUser = Auth::user();
        try {

            return $user->company_id == $authUser->company_id 
                ? response()->json(['user' => $user],200)
                : response()->json(['error' => 'Forbidden'], 403);
            
        } catch (Error $e) {
            return response()->json(['error' => 'failed show user'], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $authUser = Auth::user();
        try {
            $validated = $request->validate([
                'first_name' => 'string|max:255',
                'last_name' => 'string|max:255',
                'first_login' => 'boolean',
                'phone' => 'string|max:255',
                'password' => 'string|max:255',
                'email' => 'string|email|max:255|unique:email',
            ]);
            if ($user->company_id == $authUser->company_id) {    
                // Update the user
                $user->update($validated);
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'User updated successfully', 'user'=> $user], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden', 'user'=> $user ], 403);
            }
            } catch (ValidationException $e) {
            return response()->json(['error' => 'failed updating user']);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
{
    // Get the currently authenticated user
    $authUser = Auth::user();
    try {
        // Check if the company ID of the user to be deleted matches the company ID of the authenticated user
        if ($user->company_id == $authUser->company_id) {    
            // Delete the user if it exists
            $user->delete();
            // Respond with a JSON message indicating a successful deletion
            return response()->json(['message' => 'Delete successfully'], 200);
        } else {
            // Respond with a JSON error message indicating that access is forbidden
            return response()->json(['error' => 'Forbidden'], 403);
        }
    } catch (\Exception $e) {
        // Handle any exceptions that might occur during the deletion process
        return response()->json(['error' => 'Failed deleting user']);
    }
}

}