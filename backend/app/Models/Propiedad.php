<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propiedad extends Model
{
    
    protected $table = 'propiedades';

    protected $fillable = [
        'esambientefamiliar',
        'escupocompleto',
        'direccion',
        'descripcion',
        'user_id',
        'tipopropiedad_id',
        'barrio_id'
    ];

    public function propietario() {
        return $this->belongsTo(User::class);
    }

    public function tipoPropiedad() {
        return $this->belongsTo(TipoPropiedad::class);
    }

    public function barrio() {
        return $this->belongsTo(Barrio::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function valoraciones() {
        return $this->hasMany(Valoracion::class);
    }

    public function cuartos() {
        return $this->hasMany(Cuarto::class);
    }

    public function imagenes() {
        return $this->hasMany(FotoPropiedad::class);
    }
}
