<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    protected $table = 'ciudades';

    protected $fillable = [
        'nombre'
    ];

    public function barrios() {
        return $this->hasMany(Barrio::class);
    }
}
