<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use App\Models\TipoPropiedad;
use Illuminate\Http\Request;

class TipoPropiedadController extends Controller
{
    public function all() {
        return response()->json(TipoPropiedad::all());
    }
}
