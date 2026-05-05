<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoEstadoReserva extends Model
{
    protected $table = 'tiposestadoreserva';
    
    protected $fillable = [
        'nombre'
    ];

    public function reservas() {
        return $this->hasMany(EstadoReserva::class);
    }
}
