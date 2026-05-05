<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    protected $table = 'valoraciones';

    protected $fillable = [
        'valoracion',
        'cliente_id',
        'propiedad_id'
    ];

    public function cliente() {
        return $this->belongsTo(User::class);
    }

    public function propiedad() {
        return $this->belongsTo(Propiedad::class);
    }
}
