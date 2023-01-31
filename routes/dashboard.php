<?php

use Illuminate\Support\Facades\Route;
use Database\Seeders\Permissions;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'permission:dashboard'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    $routeDashboard = 'App\Http\Controllers\Dashboard';
    $permissions = Permissions::getPermissions();

    Route::resource('/users', "$routeDashboard\UserController")
        ->except('show')
        ->middleware('role:Super Admin');

    Route::resource('/photos', "$routeDashboard\PhotoController")
        ->except('show')
        ->middleware('permission:' . implode('|', $permissions['photos']));

    Route::delete('photos/{photo}/{photoName}', ["$routeDashboard\PhotoController", 'destroyPhoto'])
        ->name('photos.destroyPhoto');
});
