<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
        $user = JWTAuth::user();
        // se debe hacer la insersion en la tabla de especializacion
        
        return response()->json([
            'mensaje' => 'Login exitoso',
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_email' => $user->email,
            'rol' => $user->rol()->first()->nombre,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
            
        ]);
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'rol_id' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol_id' => $request->rol_id,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'mensaje' => 'Usuario registrado con éxito',
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_email' => $user->email,
            'rol' => $user->rol()->first()->nombre,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }

    public function all() {
        return User::all();
    }

    public function get($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
        return response()->json([$user]);
    }
    
    public function update(Request $request, $id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,',
        ]);

        $user->name = $validated['name'] ?? $user->name;
        $user->email = $validated['email'] ?? $user->email;
        $user->save();
        return response()->json(['mensaje' => 'Usuario actualizado']);
    }

    public function delete($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
        $user->delete();
        return response()->json(['mensaje' => 'Usuario borrado']);
    }
}
