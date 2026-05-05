<?php

namespace App\Http\Controllers\Api\Usable;

use App\Http\Controllers\Controller;
use App\Models\Barrio;
use App\Models\Ciudad;
use Illuminate\Http\Request;

class CiudadController extends Controller
{
    public function all() {
        return response()->json(Ciudad::all());
    }
}
