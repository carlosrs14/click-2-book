<?php

namespace App\Services;

use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class AuthService
{
    /**
     * Attempt to authenticate a user and return the token.
     */
    public function login(array $credentials)
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return null;
        }

        return $token;
    }

    /**
     * Generate the standardized auth response array.
     */
    public function respondWithToken($token, $user, $message = 'Exito')
    {
        $role = $user->roles()->first();
        
        return [
            'mensaje' => $message,
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_email' => $user->email,
            'rol' => $role ? $role->nombre : null,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ];
    }
}
