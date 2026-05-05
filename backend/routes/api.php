<?php

use App\Http\Controllers\Api\Auth\SocialiteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Extra\FotoPensionController;
use App\Http\Controllers\Api\Extra\FotoUserController;
use App\Http\Controllers\Api\Extra\ReviewController;
use App\Http\Controllers\Api\Extra\ValoracionController;
use App\Http\Controllers\Api\Main\PensionController;
use App\Http\Controllers\Api\Main\ReservaController;
use App\Http\Controllers\Api\Main\TipoPropiedadController;
use App\Http\Controllers\Api\Usable\BarrioController;
use App\Http\Controllers\Api\Usable\CiudadController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Main\CuartoController;
use Illuminate\Support\Facades\Mail;

// solo para probar
Route::get('/users', [UserController::class, 'all']);

Route::post('/login', [UserController::class, 'login'])->name('login');
Route::post('/register', [UserController::class, 'register']);
Route::get('/users/{id}', [UserController::class, 'get']);

Route::middleware('auth:api')->group(function () {
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
});
Route::get('/users/{id}/reservas', [ReservaController::class, 'filterByUser']);

Route::post('/reservas', [ReservaController::class, 'create']);
Route::get('/reservas', [ReservaController::class, 'all']);
Route::get('/reservas/{id}', [ReservaController::class, 'get']);
Route::put('/reservas/{id}', [ReservaController::class, 'update']);
Route::delete('/reservas/{id}', [ReservaController::class, 'delete']);

Route::post('/propiedades', [PensionController::class, 'create']);
Route::get('/propiedades', [PensionController::class, 'all']);
Route::get('/propiedadesfiltro', [PensionController::class, 'filtrar']);
Route::get('/propiedades/{id}', [PensionController::class, 'get']);
Route::get('/propietarios/{idPropietario}/propiedades', [PensionController::class,'filterByOwner']);
Route::put('/propiedades/{id}', [PensionController::class, 'update']);
Route::delete('/propiedades/{id}', [PensionController::class, 'delete']);

Route::post('/cuartos', [CuartoController::class, 'create']);
Route::get('/cuartos', [CuartoController::class, 'all']);
Route::get('/propiedades/{idPropiedad}/cuartos', [CuartoController::class, 'filterByPropiedad']);
Route::get('/cuartos/{id}', [CuartoController::class, 'get']);
Route::put('/cuartos/{id}', [CuartoController::class, 'update']);
Route::delete('/cuartos/{id}', [CuartoController::class, 'delete']);

Route::post('/users/{id}/images', [FotoUserController::class,'subirImagen']);
Route::delete('/users/{id}/images', [FotoUserController::class,'borrarImagen']);

Route::post('/propiedades/{id}/images', [FotoPensionController::class,'subirImagen']);
Route::get('/propiedades/{id}/images', [FotoPensionController::class,'listarImagenes']);
Route::delete('/propiedades/images/{id}', [FotoPensionController::class,'borrarImagen']);

Route::post('/propiedades/{id}/reviews', [ReviewController::class, 'create']);
Route::delete('/propiedades/{id}/reviews', [ReviewController::class, 'delete']);
Route::get('/propiedades/{id}/reviews', [ReviewController::class, 'filterByPropiedad']);

Route::post('/propiedades/{id}/valoraciones', [ValoracionController::class, 'create']);
Route::post('/propiedades/{id}/valoraciones', [ValoracionController::class, 'delete']);
Route::get('/propiedades/{id}/valoraciones', [ReviewController::class, 'filterByPropiedad']);


Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);


Route::get('/ciudades', [CiudadController::class, 'all']);
Route::get('/ciudades/{id}/barrios', [BarrioController::class, 'filterByCiudad']);
Route::get('/barrios', [BarrioController::class, 'all']);


Route::get('/tipos-propiedad', [TipoPropiedadController::class, 'all']);

Route::get('/test-email', function() {
    Mail::raw('Test mail', function($message) {
        $message->to('crincones589@gmail.com')
                ->subject('Test SMTP');
    });

    return 'Email enviado';
});

// Route::get('/auth/google/redirect', [SocialiteController::class, 'redirectToGoogle']);
// Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);
