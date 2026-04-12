<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LivresController;
use App\Http\Controllers\Api\AdherentsController;
use App\Http\Controllers\Api\EmpruntsController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\ShowlivresController;

Route::get('/livres', [LivresController::class, 'index']);
Route::post('/livres', [LivresController::class, 'ajouter']);
Route::put('/livres/{id}', [LivresController::class, 'modify']);
Route::delete('/livres/{id}', [LivresController::class, 'delete']);

Route::get('/adherents', [AdherentsController::class, 'index']);
Route::post('/adherents', [AdherentsController::class, 'ajouter'])->middleware('jwt');;
Route::put('/adherents/{id}', [AdherentsController::class, 'modify']);
Route::delete('/adherents/{id}', [AdherentsController::class, 'delete']);

Route::get('/emprunts',[EmpruntsController::class, 'index']);
Route::post('/emprunts',[EmpruntsController::class, 'ajouter']);
Route::put('/emprunts/{id}',[EmpruntsController::class, 'modify']);
Route::delete('/emprunts/{id}',[EmpruntsController::class, 'delete']);
Route::post('/emprunts/check',[EmpruntsController::class, 'checkdate']);

Route::get('/users', [UsersController::class, 'index']);
Route::post('/register', [UsersController::class, 'register']);
Route::post('/login', [UsersController::class, 'login']);
Route::post('/logout', [UsersController::class, 'logout']);

Route::get('/history', [HistoryController::class, 'index']);
Route::post('/history', [HistoryController::class, 'ajouter']);
Route::post('/history/check', [HistoryController::class, 'check']);

Route::get('/favorite', [FavoriteController::class, 'index']);
Route::post('/favorite', [FavoriteController::class, 'store']);
Route::delete('/favorite', [FavoriteController::class, 'destroy']);
Route::post('/favorite/check', [FavoriteController::class, 'check']);

Route::get('/showlivres', [ShowlivresController::class, 'index']);
Route::post('/showlivres', [ShowlivresController::class, 'store']);
Route::post('/showlivres/check', [ShowlivresController::class, 'check']);