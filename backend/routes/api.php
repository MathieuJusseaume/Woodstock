<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{LoginController, UserController, OrderController, ClientController};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::apiResources([ 
        'orders' => OrderController::class, 
        'users' => UserController::class, 
        'clients' => ClientController::class, 
    ]);
});



Route::post('/login', [LoginController::class, 'authenticate']);

