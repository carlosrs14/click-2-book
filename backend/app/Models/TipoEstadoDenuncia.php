<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoEstadoDenuncia extends Model
{
    protected $table = 'tiposestadodenuncia';
    
    protected $fillable = [
        'nombre'
    ];

    public function estadosDenuncia() {
        return $this->hasMany(EstadoDenuncia::class);
    }
}
