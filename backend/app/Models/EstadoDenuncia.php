<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoDenuncia extends Model
{
    protected $table = 'estadosdenuncia';

    protected $fillable = [
        'esactual',
        'tipoestadodenuncia_id',
        'denuncia_id'
    ];

    public function denuncia() {
        return $this->belongsTo(Denuncia::class);
    }

    public function tipoestadodenuncia() {
        return $this->belongsTo(TipoEstadoDenuncia::class);
    }
}
