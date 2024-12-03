<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubRedditController; 

// Route for authenticated user information
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API routes for users and posts resources

Route::get('/reddit-home',[SubRedditController::class,'indexHome']);


Route::middleware('auth:sanctum')->group(function (){
    Route::get('/reddit/{name}',[SubRedditController::class,'show']);
    Route::post('/reddit/join/{id}',[SubRedditController::class,'join']);
    Route::post('/reddit/favorite/{id}',[SubRedditController::class,'addToFavorite']);
Route::post('/reddit',[SubRedditController::class,'store']);
Route::put('/reddit/{id}',[SubRedditController::class,'destroy']);
    
});




