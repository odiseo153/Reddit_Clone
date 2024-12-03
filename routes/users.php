<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController; 

// Route for authenticated user information
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user(); // Return authenticated user information
    });

    Route::apiResource('/users', UsersController::class);
    Route::post('/users/join-Subreddit', [UsersController::class, 'joinSubReddit']);
});




