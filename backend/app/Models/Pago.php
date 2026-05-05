<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'pagos';

    protected $fillable = [
        'monto',
        'tipopago_id'
    ];

    public function tipopago() {
        return $this->belongsTo(TipoPago::class);
    }

    public function reserva() {
        return $this->hasOne(Reserva::class);
    }
}
