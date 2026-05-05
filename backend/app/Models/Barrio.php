<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barrio extends Model
{
    protected $table = 'barrios';

    protected $fillable = [
        'nombre',
        'ciudad_id'
    ];

    public function ciudad() {
        return $this->belongsTo(Ciudad::class);
    }

    public function propiedades() {
        return $this->hasMany(Propiedad::class);
    }
}
