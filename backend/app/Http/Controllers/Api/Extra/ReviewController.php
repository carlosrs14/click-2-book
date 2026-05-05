<?php

namespace App\Http\Controllers\Api\Extra;

use App\Http\Controllers\Controller;
use App\Models\Propiedad;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function create(Request $request, $id){
        $request->validate([
            'content'=>'string'
        ]);

        $review = Review::create([
            'cliente_id'=>Auth::id(),
            'propiedad_id'=>$id,
            'contenido'=>$request->contenido
        ]);
        return response()->json($review);
    }

    public function delete($id) {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['mensaje' => 'review no encontrada'], 404);
        }
        $review->delete();

        return response()->json(['mensaje' => 'review eliminadad correctamente']);
    }

    public function filterByPropiedad($id) {
        $propiedad = Propiedad::find($id);
        if (!$propiedad) {
            return response()->json(['mensaje' => 'review no encontrada']);
        }
        return response()->json($propiedad->reviews()->get());
    }
}
