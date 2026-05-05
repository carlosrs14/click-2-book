<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Exception;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, CanResetPassword
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'rol_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function telefonos() {
        return $this->hasMany(Telefono::class);
    }

    public function fotos() {
        return $this->hasMany(FotoUsuario::class);
    }

    public function propiedades() {
        return $this->hasMany(Propiedad::class);
    }

    public function reservas() {
        return $this->hasMany(Reserva::class);
    }
    
    public function denuncias_recibidas() {
        return $this->hasMany(Denuncia::class);
    }

    public function denuncias_hechas() {
        return $this->hasMany(Denuncia::class);
    }

    public function valoraciones() {
        return $this->hasMany(Valoracion::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
    
    public function rol() {
        return $this->belongsTo(Rol::class);
    }
}
