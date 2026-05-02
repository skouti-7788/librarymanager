<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Acheter;
use Illuminate\Http\Request;

class AcheterController extends Controller
{
    public function index()
    {
        return response()->json(Acheter::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'adherent_id' => 'nullable|integer|exists:adherents,id',
            'livre_id' => 'nullable|integer|exists:livres,id',
            'prix' => 'required|numeric|min:0',
            'quantite' => 'nullable|integer|min:1',
            'date_achat' => 'required|date',
            'status' => 'nullable|string',
        ]);

        $acheter = Acheter::create($validated);

        return response()->json($acheter, 201);
    }

    public function update(Request $request, $id)
    {
        $acheter = Acheter::findOrFail($id);

        $data = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'adherent_id' => 'nullable|integer|exists:adherents,id',
            'livre_id' => 'nullable|integer|exists:livres,id',
            'prix' => 'nullable|numeric|min:0',
            'quantite' => 'nullable|integer|min:1',
            'date_achat' => 'nullable|date',
            'status' => 'nullable|string',
        ]);

        $acheter->update($data);

        return response()->json($acheter, 200);
    }

    public function destroy($id)
    {
        $acheter = Acheter::findOrFail($id);
        $acheter->delete();

        return response()->json(null, 204);
    }
}
