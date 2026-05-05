<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoReserva extends Model
{
    protected $table = 'tiposreserva';
    
    protected $fillable = [
        'nombre'
    ];

    public function reservas() {
        return $this->hasMany(Reserva::class);
    }
}
