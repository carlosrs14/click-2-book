<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoReserva extends Model
{
    protected $table = 'estadosreserva';

    protected $fillable = [
        'esactual',
        'reserva_id',
        'tipoestadoreserva_id'
    ];

    public function reserva() {
        return $this->belongsTo(Reserva::class);
    }

    public function tipoEstadoReserva() {
        return $this->belongsTo(TipoEstadoReserva::class);
    }
}
