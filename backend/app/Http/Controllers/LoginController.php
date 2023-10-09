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

    $user = Auth::attempt($credentials); 

    if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
      // $request->session()->regenerate();
      $token = Auth::user()->createToken('api_token')->plainTextToken;
      $user = Auth::user(); // Récupérez l'utilisateur actuellement authentifié

      return response()->json([
        'user' => $user,
      ]);
    }
    return null;
  }
}

