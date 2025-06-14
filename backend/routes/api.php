<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminApiController;

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas API para Admin
Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminApiController::class, 'listUsers']);
    Route::get('/pedidos', [AdminApiController::class, 'listPedidos']);
    Route::get('/platos', [AdminApiController::class, 'listPlatos']);
    Route::post('/users', [AdminApiController::class, 'createUser']);
    Route::put('/users/{user}', [AdminApiController::class, 'updateUser']);
    Route::delete('/users/{user}', [AdminApiController::class, 'deleteUser']);
    Route::get('/chefs/{id}', [AdminApiController::class, 'chefDetails']);
    Route::get('/reportes', [AdminApiController::class, 'reportes']);
});
