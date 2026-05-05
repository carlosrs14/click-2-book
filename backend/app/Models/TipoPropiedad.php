<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoPropiedad extends Model
{
    protected $table = 'tipospropiedad';

    protected $fillable = [
        'nombre'
    ];

    public function propiedades() {
        return $this->hasMany(Propiedad::class);
    }
}
