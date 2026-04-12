<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Emprunts;
use Illuminate\Http\Request;
use Carbon\Carbon;
class EmpruntsController extends Controller
{
    public function index()
    {
        $emprunts = Emprunts::all();
        return response()->json($emprunts);
    }
   public function ajouter(Request $request)
   {
    $validated = $request->validate([
        'livre' => 'required ',
        'adherent' => 'required ',
        'date_emprunt' => 'required|date',
        'date_retour_prevue' => 'required|date',
        'date_retour_effective' => 'nullable|date',
        'status' => 'nullable|string',
        'retard'=> 'nullable|string'
    ]);
      
    $emprunts =  Emprunts::create($validated);
    return response()->json($emprunts, 201);
    }
   public function modify(Request $request, $id)
   {
    $emprunts = Emprunts::findOrFail($id);

    //  Validation
    $data = $request->validate([
        'livre' => 'required',
        'adherent' => 'required',
        'date_emprunt' => 'required|date',
        'date_retour_prevue' => 'required|date',
        'date_retour_effective' => 'nullable|date',
        'status' => 'nullable|string',
        'retard'=> 'nullable|string'
    ]);
    
    //  Update
    $emprunts->update($data);

    return response()->json($emprunts, 200);
   }
    public function checkdate(Request $request)
    {

    $validated = $request->validate([
        'id' => 'required|exists:emprunts,id',
        'date_retour_prevue' => 'required|date',
         'date_emprunt'=> 'required|date',
         
        // 'retard' => 'required|string'
    ]);
    $emprunts = Emprunts::findOrFail($validated['id']);
    // dd($validated['id'], $emprunts);
    $datePrevue = Carbon::parse($validated['date_retour_prevue']);
    $status = Carbon::now()->greaterThan($datePrevue) ? "retard" : "active";
    $dateEmprunt = Carbon::parse($validated['date_emprunt']);
    $retard =  $datePrevue->diffInDays($dateEmprunt);
    // dd( $datePrevue,$status , $dateEmprunt, $retard );
    $emprunts->update(['status' => $status,
                        'retard'=> $retard,
                      ]);
    return response()->json(['status' => $status,
                              'retard'=> $retard,
                            'message' => 'add status',
    ]);
    }
    public function delete($id)
    {
        $emprunts = Emprunts::findOrFail($id);
        $emprunts->delete();
        return response()->json(null, 204);
    }               
}
