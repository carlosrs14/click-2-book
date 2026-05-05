<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class FotoPropiedad extends Model
{
    protected $table = 'fotospropiedad';
    protected $appends = ['full_url'];

    protected $fillable = [
        'url',
        'propiedad_id'
    ];

    public function propiedad() {
        return $this->belongsTo(Propiedad::class);
    }

    public function getFullUrlAttribute() {
        return asset(Storage::url($this->url));    
    }
}
