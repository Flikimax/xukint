<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\Web\HomeController::class, 'index'])->name('home');

require __DIR__.'/dashboard.php';
require __DIR__.'/auth.php';

# Esta ruta se agrega al final ya que /nombreRuta puede tener o no un nombre de ruta hacia otra pagina
Route::get('/{photoCategory:slug}', [App\Http\Controllers\Web\PhotosCategoryController::class, 'index'])->name('photos.category');