<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Adherents extends Model
{   protected $table = 'adherents';
    protected $fillable = [
        'nom','email', 'phone', ' datadahestion', 'status', 'livre'
    ];
    public $timestamps = false;
}