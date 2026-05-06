<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;
use App\Services\AuthService;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    protected $userService;
    protected $authService;

    public function __construct(UserService $userService, AuthService $authService)
    {
        $this->userService = $userService;
        $this->authService = $authService;
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        
        $token = $this->authService->login($credentials);
        
        if (!$token) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
        
        return response()->json(
            $this->authService->respondWithToken($token, JWTAuth::user(), 'Login exitoso')
        );
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'rol_id' => 'required',
        ]);

        $user = $this->userService->createUser($request->all());
        $token = JWTAuth::fromUser($user);

        return response()->json(
            $this->authService->respondWithToken($token, $user, 'Usuario registrado con éxito')
        );
    }

    public function all() {
        // We could load roles eagerly
        return User::with('roles')->get();
    }

    public function get($id) {
        $user = User::with('roles')->find($id);
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
            'email' => 'email|unique:users,email,' . $id,
            'rol_id' => 'sometimes|exists:roles,id',
        ]);

        $this->userService->updateUser($user, $validated);

        return response()->json(['mensaje' => 'Usuario actualizado']);
    }

    public function delete($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
        
        $this->userService->deleteUser($user);
        
        return response()->json(['mensaje' => 'Usuario borrado']);
    }
}
