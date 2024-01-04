<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

 
// Route::get('/jobs',[JobController::class,'index']); 
// Route::get('/jobs/{id}',[JobController::class,'show']);

Route::get('/company',[CompanyController::class,'index']); 
Route::get('/company/{id}',[CompanyController::class,'show']);

Route::get('/application',[ApplicationController::class,'index']); 
Route::get('/application/{id}',[ApplicationController::class,'show']);





// Route::post('/jobs',[JobController::class,'store']); 
// Route::put('/jobs/{id}',[JobController::class,'update']); 
// Route::delete('/jobs/{id}',[JobController::class,'destroy']); 



Route::resource('/jobs',JobController::class);