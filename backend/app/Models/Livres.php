<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Livres extends Model
{   protected $table = 'livres';
    protected $fillable = [
       'title', 'author','image', 'category', 'annee','pages','fileSize','extension',
       'creationDate','book_rank','prix','showLiver', 'qte', 'disponibilite', 'status' ,
    ];
    public $timestamps = false;
}