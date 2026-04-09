<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Emprunts;
use Illuminate\Http\Request;
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
    public function delete($id)
    {
        $emprunts = Emprunts::findOrFail($id);
        $emprunts->delete();
        return response()->json(null, 204);
    }               
}
