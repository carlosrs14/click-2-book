<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use App\Models\Propiedad;
use Illuminate\Http\Request;

class PensionController extends Controller
{
    public function create(Request $request) {
        $request->validate([

        ]);

        $propiedad = Propiedad::create([
            'esambientefamiliar' => $request->esambientefamiliar,
            'escupocompleto' => $request->escupocompleto,
            'direccion' => $request->direccion,
            'descripcion' => $request->descripcion,
            'user_id' => $request->user_id,
            'tipopropiedad_id' => $request->tipopropiedad_id,
            'barrio_id' => $request->barrio_id
        ]);

        return response()->json($propiedad);
    }

    public function all() {
        return response()->json(Propiedad::with('imagenes')->get());
    }

    public function get($id) {
        $propiedad = Propiedad::with('imagenes')->get()->find($id);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'Pension no encontrada'], 404);
        }
        return response()->json($propiedad);
    }

    public function filtrar(Request $request) {
        $query = Propiedad::with('cuartos');
        if ($request->tipo != 0 ) {
            $query->where('tipopropiedad_id', $request->tipo);
        }

        if ($request->barrio != 0) {
            $query->where('barrio_id', $request->barrio);
        }

        $query->where('escupocompleto', $request->cupoCompleto);

        $query->where('esambientefamiliar', $request->ambienteFamiliar);

        /*
        if ($request->precioMin != 0 || $request->precioMax != 0 || $request->individual || $request->aire) {
            $query->whereHas('cuartos', function ($q) use ($request) {
                if ($request->precioMin != 0) {
                    $q->where('valormensual', '>=', $request->precioMin);
                }

                if ($request->precioMax != 0) {
                    $q->where('valormensual', '<=', $request->precioMax);
                }

                if ($request->individual == true) {
                    $q->where('capacidad', '=', 1);
                }

                if ($request->aire == true) {
                    $q->where('tieneaire', $request->aire);
                }
            });
        }
        */
        $pensiones = $query->get();
        return response()->json($pensiones);
    }

    public function filterByOwner($idPropietario) {
        return Propiedad::where('user_id', $idPropietario)->get();
    }
    
    public function update(Request $request, $id) {
        $propiedad = Propiedad::find($id);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'Pension no encontrada'], 404);
        }

        $validated = $request->validate([
            'esambientefamiliar' => 'required',
            'escupocompleto' => 'required',
            'descripcion' => 'required'
        ]);

        $propiedad->esambientefamiliar = $validated['esambientefamiliar']?? $propiedad->esambientefamiliar;
        $propiedad->escupocompleto = $validated['escupocompleto']?? $propiedad->escupocompleto;
        $propiedad->descripcion = $validated['descripcion']?? $propiedad->descripcion;
        $propiedad->save();

        return response()->json($propiedad);
    }

    public function delete($id) {
        $propiedad = Propiedad::find($id);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'Pension no encontrada'], 404);
        }
        $propiedad->delete();
        return response()->json(['mensaje' => 'Pension borrada con éxito']);
    }
}
