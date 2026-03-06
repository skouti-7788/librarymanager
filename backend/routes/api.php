<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LivresController;
use App\Http\Controllers\Api\AdherentsController;

Route::get('/livres', [LivresController::class, 'index']);
Route::post('/livres', [LivresController::class, 'ajouter']);
Route::put('/livres/{id}', [LivresController::class, 'modify']);
Route::delete('/livres/{id}', [LivresController::class, 'delete']);

Route::get('/adherents', [AdherentsController::class, 'index']);
Route::post('/adherents', [AdherentsController::class, 'ajouter']);
Route::put('/adherents/{id}', [AdherentsController::class, 'modify']);
Route::delete('/adherents/{id}', [AdherentsController::class, 'delete']);