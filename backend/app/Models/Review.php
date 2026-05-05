<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'contenido',
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
