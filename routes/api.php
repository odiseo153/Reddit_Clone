<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController; 
use App\Http\Controllers\SubRedditController; 
use App\Http\Controllers\PostsController; 

// Route for authenticated user information
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

