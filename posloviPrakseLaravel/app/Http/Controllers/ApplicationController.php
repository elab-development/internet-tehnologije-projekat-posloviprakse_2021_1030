<?php
namespace App\Http\Controllers;

use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function index()
    {
        return ApplicationResource::collection(Application::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'job_id' => 'required|exists:jobs,id',
            'status' => 'required|string',
            'cover_letter' => 'nullable|string',
            'resume' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $application = Application::create($request->all());

        return response()->json(['message' => 'Application created successfully', 'application' => new ApplicationResource($application)], 201);
    }

    public function show($id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['error' => 'Application not found'], 404);
        }

        return new ApplicationResource($application);
    }

    public function update(Request $request, $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['error' => 'Application not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'job_id' => 'required|exists:jobs,id',
            'status' => 'required|string',
            'cover_letter' => 'nullable|string',
            'resume' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $application->update($request->all());

        return response()->json(['message' => 'Application updated successfully', 'application' => new ApplicationResource($application)]);
    }

    public function destroy($id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['error' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }
}
