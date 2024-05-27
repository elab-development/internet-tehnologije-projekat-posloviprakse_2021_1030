<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
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

 
Route::get('/jobs',[JobController::class,'index']); 
Route::get('/jobs/{id}',[JobController::class,'show']);

Route::get('/company',[CompanyController::class,'index']); 
Route::get('/company/{id}',[CompanyController::class,'show']);

Route::post('/register',[AuthController::class,'register']); 
Route::post('/login',[AuthController::class,'login']); 
 
Route::resource('/application',ApplicationController::class); 
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout',[AuthController::class,'logout']); 
    Route::middleware('checkrole:admin')->group(function () {
        Route::resource('/company',CompanyController::class)->except('index','show');
        Route::get('admin/statistics', [AdminController::class, 'getStatistics']);
        Route::get('admin/company-statistics/{id}', [AdminController::class, 'getCompanyStatistics']);
        Route::get('admin/all-company-statistics', [AdminController::class, 'getAllCompanyStatistics']);
    });

    Route::middleware('checkrole:firma')->group(function () {
        Route::get('applications/job/{job_id}', [ApplicationController::class, 'getByJobId']);
        Route::resource('/jobs',JobController::class)->except('index','show');

    });
    Route::middleware('checkrole:student')->group(function () {
      
    });
  
    
});

