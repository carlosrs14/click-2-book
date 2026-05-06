<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function usuarios() {
        return $this->belongsToMany(User::class, 'role_user', 'rol_id', 'user_id');
    }
}
