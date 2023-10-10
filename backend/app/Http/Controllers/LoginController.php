<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\JWTAuth;

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
        'user' => $user,
        'token' => $token 
      ]);
    }
    return null;
  }
}

