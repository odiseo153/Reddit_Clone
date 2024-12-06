<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RuleController;

// API routes for users and posts resources


Route::apiResource('/rules', RuleController::class);

Route::middleware('auth:sanctum')->group(function () {
    

    }); 