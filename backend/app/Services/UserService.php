<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Create a new user with the specified role.
     */
    public function createUser(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (isset($data['rol_id'])) {
            $user->roles()->attach($data['rol_id']);
        }

        return $user;
    }

    /**
     * Update an existing user.
     */
    public function updateUser(User $user, array $data)
    {
        if (isset($data['name'])) {
            $user->name = $data['name'];
        }
        if (isset($data['email'])) {
            $user->email = $data['email'];
        }

        $user->save();

        if (isset($data['rol_id'])) {
            $user->roles()->sync([$data['rol_id']]);
        }

        return $user;
    }

    /**
     * Delete a user.
     */
    public function deleteUser(User $user)
    {
        // Many-to-many relationship rows in role_user will be deleted by cascading if configured,
        // or we can detach here explicitly.
        $user->roles()->detach();
        return $user->delete();
    }
}
