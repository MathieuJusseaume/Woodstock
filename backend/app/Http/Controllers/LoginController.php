<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
   /**
     
Handle an authentication attempt.
   */

  public function authenticate(Request $request)
  {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
      // $request->session()->regenerate();
      $user = Auth::user(); 
      if($user->is_admin){
        $token = Auth::user()->createToken('api_token', ["admin"]);
      } else {
        $token = Auth::user()->createToken('api_token', ["user"]);
      }
      
      // Get the token's plain text representation
     // Récupérez l'utilisateur actuellement authentifié

      return response()->json([
        'user' => $user 
      ], 200);
    }
    return response()->json(401);
  }

  public function logout(Request $request)
  {
      $user = Auth::user();
      // Revoke the user's personal access token
      $user->tokens->each(function ($token) {
          $token->delete();
      });
      return response()->json(['message' => 'Logged out successfully'], 200);
  }
}

