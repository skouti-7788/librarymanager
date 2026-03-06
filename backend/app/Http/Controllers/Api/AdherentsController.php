<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Livres;
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
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|email|unique:adherents,email',
        'phone' => 'nullable|string|max:20',
        'datadahestion' => 'nullable|date',
        'status' => 'nullable|string|in:actif,inactif',

    ]);

    $adherents = Adherents::create($validated);
    return response()->json($adherents, 201);
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
        'status' => 'nullable|string|in:actif,inactif',
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