<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getStatistics()
{
    $totalCompanies = Company::count();
    $totalStudents = User::where('role', 'student')->count();
    $totalAdmins = User::where('role', 'admin')->count();
    $totalAds = Job::count();
    $totalApplications = Application::count();

    return response()->json([
        'total_companies' => $totalCompanies,
        'total_students' => $totalStudents,
        'total_admins' => $totalAdmins,
        'total_ads' => $totalAds,
        'total_applications' => $totalApplications,
    ]);
}

public function getCompanyStatistics($id)
{
    $company = Company::find($id);

    if (!$company) {
        return response()->json(['error' => 'Company not found'], 404);
    }

    $totalJobs = Job::where('company_id', $id)->count();
    $totalApplications = Application::whereIn('job_id', Job::where('company_id', $id)->pluck('id'))->count();
    $totalUsers = User::where('company_id', $id)->count();

    return response()->json([
        'company' => $company,
        'total_jobs' => $totalJobs,
        'total_applications' => $totalApplications,
        'total_users' => $totalUsers,
    ]);
}


public function getAllCompanyStatistics()
{
    $companies = Company::all();
    $companyStats = [];

    foreach ($companies as $company) {
        $totalJobs = Job::where('company_id', $company->id)->count();
        $totalApplications = Application::whereIn('job_id', Job::where('company_id', $company->id)->pluck('id'))->count();
        $totalUsers = User::where('company_id', $company->id)->count();

        $companyStats[] = [
            'company' => $company,
            'total_jobs' => $totalJobs,
            'total_applications' => $totalApplications,
            'total_users' => $totalUsers,
        ];
    }

    return response()->json(['companies' => $companyStats]);
}

}
