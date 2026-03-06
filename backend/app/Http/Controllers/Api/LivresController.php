<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Livres;
use Illuminate\Http\Request;
class LivresController extends Controller
{
    public function index()
    {
        $livres = Livres::all();
        return response()->json($livres);
    }
   public function ajouter(Request $request)
   {
    $validated = $request->validate([
        'titre' => 'required|string|max:255',
        'auteur' => 'required|string|max:255',
        'isbn' => 'nullable|string|max:50',
        'categorie' => 'required|string|max:100',
        'annee' => 'nullable|integer',
        'qte' => 'required|integer|min:1',
        'disponibilite' => 'required|integer|min:0',
    ]);

    $livre = Livres::create($validated);

    return response()->json($livre, 201);
    }
   public function modify(Request $request, $id)
   {
    $livre = Livres::findOrFail($id);

    // ✅ Validation
    $data = $request->validate([
        'titre' => 'required|string|max:255',
        'auteur' => 'required|string|max:255',
        'isbn' => 'nullable|string|max:50',
        'categorie' => 'required|string|max:100',
        'annee' => 'nullable|integer',
        'qte' => 'required|integer|min:1',
        'disponibilite' => 'required|integer|min:0',
    ]);

    // ✅ Update
    $livre->update($data);

    return response()->json($livre, 200);
   }
    public function delete($id)
    {
        $livre = Livres::findOrFail($id);
        $livre->delete();
        return response()->json(null, 204);
    }
}