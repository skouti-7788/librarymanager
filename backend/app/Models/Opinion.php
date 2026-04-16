<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Opinion extends Model
{
    protected  $table = 'opinions';
    protected  $fillable = ['user_id','livre_id','opinion'];
    public $timestamps = false;
}