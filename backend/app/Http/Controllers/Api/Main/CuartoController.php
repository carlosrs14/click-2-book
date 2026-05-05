<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use App\Models\Cuarto;
use App\Models\Propiedad;
use Illuminate\Http\Request;

class CuartoController extends Controller
{
    public function create(Request $request) {
        $cuarto = Cuarto::create([
            'valormensual' => $request->valormensual,
            'capacidad' => $request->capacidad,
            'tieneaire' => $request->tieneaire,
            'descripcion' => $request->descripcion,
            'propiedad_id' => $request->propiedad_id,
        ]);

        return response()->json([$cuarto]);
    }


    public function all() {
        return Cuarto::all();
    }

    public function get($id) {
        $cuarto = Cuarto::find($id);
        if (!$cuarto) {
            return response()->json(['mensaje' => 'Cuarto no encontrado'], 404);
        }
        return response()->json($cuarto);
    }
    
    public function filterByPropiedad($idPropiedad) {
        $propiedad = Propiedad::find($idPropiedad);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'Propiedad no encontrado'], 404);
        }
        return response()->json($propiedad->cuartos()->get());
        
    }

    public function update(Request $request, $id) {
        $cuarto = Cuarto::find($id);
        if (!$cuarto) {
            return response()->json(['mensaje' => 'Cuarto no encontrado'], 404);
        }

        $validated = $request->validate([
            'valormensual' => 'required',
            'capacidad' => 'required',
            'descripcion' => 'required',
            'tieneaire' => 'required'
        ]);
        
        $cuarto->valormensual = $validated['valormensual']?? $cuarto->valormensual;
        $cuarto->capacidad = $validated['capacidad']?? $cuarto->capacidad;
        $cuarto->descripcion = $validated['descripcion']?? $cuarto->descripcion;
        $cuarto->tieneaire = $validated['tieneaire']?? $cuarto->tieneaire;
        $cuarto->save();

        return response()->json($cuarto);
    }

    public function delete($id) {
        $cuarto = Cuarto::find($id);
        if (!$cuarto) {
            return response()->json(['mensaje' => 'Cuarto no encontrado'], 404);
        }
        $cuarto->delete();
        return response()->json(['mensaje' => 'Cuarto borrado con éxito']);
    }
}
