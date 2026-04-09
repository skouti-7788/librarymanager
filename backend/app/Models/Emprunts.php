<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Emprunts extends Model
{
    protected  $table = 'emprunts';
    protected  $fillable =[ 
    'livre' ,'adherent' ,'date_emprunt' ,'date_retour_prevue' ,'date_retour_effective','status','retard'];
    public $timestamps = false;
}