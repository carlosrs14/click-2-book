<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoPago extends Model
{
    protected $table = 'tipospago';
    
    protected $fillable = [
        'nombre'
    ];

    public function pagos() {
        return $this->hasMany(Pago::class);
    }
}
