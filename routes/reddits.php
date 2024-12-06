<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubRedditController;

// Rutas accesibles para todos (autenticados o no)
Route::get('/reddit/{name}', [SubRedditController::class, 'show']);
Route::get('/reddit-home', [SubRedditController::class, 'indexHome']);

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reddit-auth/{nam}', [SubRedditController::class, 'showAuth']);
    Route::get('/reddit-homes', [SubRedditController::class, 'indexHome']);
    Route::post('/reddit/join/{id}', [SubRedditController::class, 'join']);
    Route::post('/reddit/favorite/{id}', [SubRedditController::class, 'addToFavorite']);
    Route::post('/reddit', [SubRedditController::class, 'store']);
    Route::put('/reddit/{id}', [SubRedditController::class, 'destroy']);
});
