<?php

namespace App\Http\Controllers\Api\Extra;

use App\Http\Controllers\Controller;
use App\Models\FotoUsuario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoUserController extends Controller
{
    public function subirImagen(Request $request, $id) {
        $request->validate([
            'image' => 'required|image|max:2048'
        ]);
        $user = User::find($id);
        if (!$user) {
            return response()->json(['mensaje' => 'usuario no encontrado'], 404);
        }
        $ruta = $request->file('image')->store('users/'.$id, 'public');
        $img = $user->images()->create(['path'=>$ruta]);
        return response()->json($img);
    }

    public function borrarImagen($id) {
        $imagen = FotoUsuario::find($id);

        if (!$imagen) {
            return response()->json(['mensaje' => 'Imagen no encontrada'], 404);
        }

        //if ($image->user_id !== auth()->id()) {
        //    return response()->json(['error' => 'No autorizado'], 403);
        //}
        Storage::disk('public')->delete($imagen->path);

        $imagen->delete();
        
        return response()->json(['mensaje' => 'imagen borrada']);
    }
}
