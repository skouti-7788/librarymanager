<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Showlivres;
use App\Models\Livres;
use Illuminate\Http\Request;


class ShowlivresController extends Controller
{
    public function index()
    {
        $showlivres = Showlivres::all();
        return response()->json([
            'showlivres' => $showlivres
        ]);
    }
    public function store(Request $request)
    {
    $verefy = Showlivres::where('user_id',$request->user_id)
                        //   ->where('livre_id', $request->livre_id)
                          ->first();
    if($verefy){
        $livres = Livres::where('id', $request->livre_id)->first();
        if ($livres) {
            $oldShow = Livres::where('id', $request->livre_id)->value('showLiver');
            $showLiver =   $oldShow + 1; 
            $livres->update([
                'showLiver' => $showLiver,
                'message' => 'Added to showlivres'
            ]);
        }
    }
    $request->validate([
        'user_id' => 'required|integer',
        'livre_id' => 'required|integer|unique:showlivres,livre_id',
    ]);

    Showlivres::firstOrCreate([
        'user_id' => $request->user_id,
        'livre_id' => $request->livre_id,
    ]);

    return response()->json(['message' => 'Added to showlivres']);
    }
    public function check(Request $request)
    {   
        
        $exists = Showlivres::where('user_id', $request->user_id)
                        ->where('livre_id', $request->livre_id)
                        ->exists();
        
        return response()->json(['showlivre' => $exists?1:0]);
    }
}