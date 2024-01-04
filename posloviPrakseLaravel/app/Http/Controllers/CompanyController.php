<?php
namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function index()
    {
        return CompanyResource::collection(Company::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:250',
            'contact_info' => 'required|string',
            'website' => 'nullable|url',
            'industry' => 'nullable|string',
            'logo' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $company = Company::create($request->all());

        return response()->json(['message' => 'Company created successfully', 'company' => new CompanyResource($company)], 201);
    }

    public function show($id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        return new CompanyResource($company);
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:250',
            'contact_info' => 'required|string',
            'website' => 'nullable|url',
            'industry' => 'nullable|string',
            'logo' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $company->update($request->all());

        return response()->json(['message' => 'Company updated successfully', 'company' => new CompanyResource($company)]);
    }

    public function destroy($id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        $company->delete();

        return response()->json(['message' => 'Company deleted successfully']);
    }
}
