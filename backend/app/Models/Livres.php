<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Livres extends Model
{   protected $table = 'livres';
    protected $fillable = [
       'titre', 'auteur', 'isbn', 'categorie', 'annee', 'qte', 'disponibilite', 'status'
    ];
    public $timestamps = false;
}