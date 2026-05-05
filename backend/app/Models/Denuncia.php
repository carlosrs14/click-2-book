<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    protected $table = 'denuncias';

    protected $fillable = [
        'descripcion',
        'cliente_id',
        'propietario_id'
    ];

    public function cliente() {
        return $this->belongsTo(User::class);
    }

    public function propietario() {
        return $this->belongsTo(User::class);
    }

    public function estadosDenuncia() {
        return $this->hasMany(EstadoDenuncia::class);
    }
}
