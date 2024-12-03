<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;


// API routes for users and posts resources



Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/comments/vote', [CommentController::class,'addVote']);
    Route::apiResource('/comments', CommentController::class);
});
