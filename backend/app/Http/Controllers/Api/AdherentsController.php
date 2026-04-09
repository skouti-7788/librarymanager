<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Adherents;
use Illuminate\Http\Request;
class AdherentsController extends Controller
{
    public function index()
    {
        $adherents = Adherents::all();
        return response()->json($adherents);
    }
   public function ajouter(Request $request)
   {

    $verifyEmail = Adherents::where('email', $request->email)->first();
    if($verifyEmail){
        return response()->json([
            'message1' => 'Adherent existe deja',
            'message2' => 'deja emprunter ce livre'
        ]);
    } 
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        // 'email' => 'required|email|unique:adherents,email',
        'email' => 'required|email',
        'phone' => 'nullable|string|max:20',
        'datadahestion' => 'nullable|date',
        'status' => 'nullable|int|in:1,0',
        'livre' => 'required|string|max:200',

    ]);
    $adherents = Adherents::create($validated);
    return response()->json(
        [
            'message1' => 'Adherent ajouté avec succès',
            'message2' => 'Livre emprunter avec succès',
            'data' => $adherents
        ], 201);
    }
   public function modify(Request $request, $id)
   {
    $adherents = Adherents::findOrFail($id);

    // ✅ Validation
    $data = $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|email|unique:adherents,email',
        'phone' => 'nullable|string|max:20',
        'datadahestion' => 'nullable|date',
        'status' => 'nullable|int|in:1,0',
        'livre' => 'required|string|max:200',
    ]);
    
    // ✅ Update
    $adherents->update($data);

    return response()->json($adherents, 200);
   }
    public function delete($id)
    {
        $adherents = Adherents::findOrFail($id);
        $adherents->delete();
        return response()->json(null, 204);
    }
}