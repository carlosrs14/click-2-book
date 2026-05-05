<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Telefono extends Model   
{
    protected $table = 'telefonos';

    protected $fillable = [
        'numero',
        'user_id'
    ];

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
