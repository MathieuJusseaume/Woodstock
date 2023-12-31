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
      if ($user->is_admin) {
        $token = Auth::user()->createToken('access_token', ["admin"], now()->addMinutes(15));
      } else {
        $token = Auth::user()->createToken('access_token', ["user"], now()->addMinutes(15));
      }

      // Get the token's plain text representation
      // Récupérez l'utilisateur actuellement authentifié

      return response()->json([
        'user' => $user
      ], 200);
    }
    return response()->json(['error'=>'unauthorized'], 401);
  }

  public function logout(Request $request)
  {
      // Revoke the user's personal access token
      Auth::guard('web')->logout();

      $request->session()->invalidate();

      $request->session()->regenerateToken();

      return response()->json(['message' => 'Logged out successfully'], 200);
  }

  public function refreshToken(Request $request)
  {
    $user = Auth::user();

    $user->tokens->each(function ($token) {
      $token->delete();
    });
    if ($user->is_admin) {
      $token = Auth::user()->createToken('api_token', ["admin"], now()->addMinutes(15));
    } else {
      $token = Auth::user()->createToken('api_token', ["user"], now()->addMinutes(15));
    }
    return response()->json([
      'token' => $token
    ], 200);
  }
}
