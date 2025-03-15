<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\CustomerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/Route::options('{any}', function () {
    return response()->json([], 204);
})->where('any', '.*');


Route::middleware([EnsureFrontendRequestsAreStateful::class])->group(function () {
    Route::get('/sanctum/csrf-cookie', function (Request $request) {
        return response()->json(['message' => 'CSRF cookie set']);
    });

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/home', [AuthController::class, 'show']);

    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
    Route::get('/users', action: [UserController::class, 'index']); // Fetch users
    Route::post('/users', [UserController::class, 'store']); // Add user
    Route::put('/users/{id}', [UserController::class, 'update']); // Edit user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user

    Route::put('/editproduct/{id}', [ProductController::class, 'update']);
    Route::get('/editproduct/{id}', [ProductController::class, 'edit']);


    Route::post('/addproduct', [ProductController::class, 'store']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/view_product/{id}', [ProductController::class, 'show']);


    Route::get('/customer/products', [CustomerController::class, 'index']);
});