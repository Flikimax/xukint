<?php

use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('/dashboard')->name('dashboard.')->group(function () {
    Route::resource('photos', App\Http\Controllers\Dashboard\PhotosController::class)->except([
        'show'
    ]);
    Route::resource('categories', App\Http\Controllers\Dashboard\PhotoCategoriesController::class)->except([
        'show'
    ]);

    Route::resource('medias', App\Http\Controllers\Dashboard\MediasController::class)->only([
        'index', 'destroy'
    ]);
    
}); 
