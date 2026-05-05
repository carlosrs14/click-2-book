<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuarto extends Model
{
    protected $table = 'cuartos';

    protected $fillable = [
        'valormensual',
        'capacidad',
        'descripcion',
        'tieneaire',
        'propiedad_id'
    ];

    public function propiedad() {
        return $this->belongsTo(Propiedad::class);
    }

    public function reservas() {
        return $this->hasMany(Reserva::class);
    }

    public function getValormensualAttribute($value)
    {
        return (float) number_format($value, 0, '.', '');
    }
}
