<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoUsuario extends Model
{
    protected $table = 'fotosuser';

    protected $fillable = [
        'url',
        'user_id'
    ];

    public function usuario() {
        return $this->belongsTo(User::class);
    }
}
