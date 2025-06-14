<?php

use Illuminate\Support\Facades\Route;

// Ya no uses view(), solo API
Route::get('/', function () {
    return response()->json(['message' => 'API funcionando']);
});
