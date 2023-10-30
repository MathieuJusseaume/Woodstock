<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{LoginController, UserController, OrderController, ClientController, CommentController};
use App\Models\Comment;

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
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::apiResources([ 
        'orders' => OrderController::class, 
        'users' => UserController::class, 
        'clients' => ClientController::class, 
        'comments' => CommentController::class
    ]);
});

Route::post('/login', [LoginController::class, 'authenticate']);


