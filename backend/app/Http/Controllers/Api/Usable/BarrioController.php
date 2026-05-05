<?php

namespace App\Http\Controllers\Api\Usable;

use App\Http\Controllers\Controller;
use App\Models\Barrio;
use App\Models\Ciudad;
use Illuminate\Http\Request;

class BarrioController extends Controller
{
    public function filterByCiudad($id) {
        $ciudad = Ciudad::find($id);
        if (!$ciudad) {
            return response()->json(['mensaje' => 'ciudad no encontrada']);
        }
        return response()->json($ciudad->barrios()->get());
    }

    public function all() {
        return response()->json(Barrio::all());
    }
}
