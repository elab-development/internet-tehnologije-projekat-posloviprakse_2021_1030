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
            'cover_letter' => 'nullable|mimes:pdf,doc,docx|max:2048',
            'resume' => 'nullable|mimes:pdf,doc,docx|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }


        $coverLetterPath = null;
        $resumePath = null;

        if ($request->file('cover_letter')) {
            $coverLetterPath = $request->file('cover_letter')->store('cover_letters');
        }
        
        if ($request->file('resume')) {
            $resumePath = $request->file('resume')->store('resumes');
        }
        $data = $request->all();
        $data['cover_letter'] = $coverLetterPath;
        $data['resume'] = $resumePath;

        $application = Application::create($data);

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
            'cover_letter' => 'nullable|mimes:pdf,doc,docx|max:2048',
            'resume' => 'nullable|mimes:pdf,doc,docx|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $coverLetterPath = $application->cover_letter;
        $resumePath = $application->resume;

        if ($request->file('cover_letter')) {
            $coverLetterPath = $request->file('cover_letter')->store('cover_letters');
        }
        
        if ($request->file('resume')) {
            $resumePath = $request->file('resume')->store('resumes');
        }
        $data = $request->all();
        $data['cover_letter'] = $coverLetterPath;
        $data['resume'] = $resumePath;

     
        $application->update($data);

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



    public function getByJobId($job_id) //metoda dodata za seminnarski rad, vraca na osnovu job_id sve prijave za taj posao kako bismo mogli da ih prikazemo firmamam
    {
        $applications = Application::where('job_id', $job_id)->get();

        if ($applications->isEmpty()) {
            return response()->json(['message' => 'No applications found for this job'], 404);
        }

        return ApplicationResource::collection($applications);
    }


}
