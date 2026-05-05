<?php

namespace App\Http\Controllers\Api\Extra;

use App\Http\Controllers\Controller;
use App\Models\Propiedad;
use App\Models\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValoracionController extends Controller
{
    public function create(Request $request, $id){
        $request->validate([
            'valoracion'=>'required|integer|min:1|max:5'
        ]);

        $valoracion = Valoracion::create([
            'cliente_id' => Auth::id(),
            'propiedad_id' => $id,
            'valoracion' => $request->valoracion
        ]);
        return response()->json($valoracion);
    }

    public function delete($id) {
        $valoracion = Valoracion::find($id);
        if (!$valoracion) {
            return response()->json(['mensaje' => 'valoracion no encontrada'], 404);
        }
        $valoracion->delete();

        return response()->json(['mensaje' => 'valoracion eliminada correctamente']);
    }
        public function filterByPropiedad($id) {
        $propiedad = Propiedad::find($id);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'propiedad no encontrada']);
        }
        return response()->json($propiedad->valoraciones()->get());
    }
}
