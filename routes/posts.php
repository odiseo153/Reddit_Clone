<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController; 


// API routes for users and posts resources


Route::apiResource('/posts', PostsController::class);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/posts/vote', [PostsController::class,'addVote']);
    }); 