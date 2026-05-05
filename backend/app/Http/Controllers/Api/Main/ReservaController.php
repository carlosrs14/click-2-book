<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use App\Mail\ReservationConfirmed;
use App\Models\Reserva;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservaController extends Controller
{
    public function create(Request $request) {

        $data = $request->input('reserva');

        $reserva = Reserva::create([
            'inicio' => $data['inicio'],
            'fin' => $data['fin'],
            'pago_id' => $data['pago_id'] ?? null,
            'tiporeserva_id' => $data['tiporeserva_id'],
            'user_id' => $data['user_id'],
            'cuarto_id' => $data['cuarto_id'],
            'cantidad_pensionados' => $data['cantidad_pensionados'],
        ]);
        $user = User::find($reserva->user_id);
        if ($user) {
            Mail::to($user->email)->send(new ReservationConfirmed($reserva));
        }
        return response()->json($reserva);
    }

    public function all() {
        return Reserva::all();
    }

    public function get($id) {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['mensaje' => 'Reserva no encontrada'], 404);
        }
        return response()->json($reserva);
    }

    public function filterByUser($iduser) {
        $user = User::find($iduser);
        if (!$user) {
            return response()->json(['mensaje' => 'User no encontrado'], 404);
        }
        return response()->json($user->reservas()->get());
    }

    public function update(Request $request, $id) {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['mensaje' => 'Reserva no encontrada'], 404);
        }

        $validated = $request->validate([
            'inicio' => 'required|date',
            'fin' => 'required|date|after:inicio',
            'cliente_id' => 'required',
            'cuarto_id' => 'required',
            'persona_id' => 'required',
            'cantidad_pensionados' => 'required'
        ]);

        $reserva->inicio = $validated['inicio'] ?? $reserva->inicio;
        $reserva->fin = $validated['fin'] ?? $reserva->fin;
        $reserva->pago_id = $validated['pago_id'] ?? $reserva->pago_id;
        $reserva->cliente_id = $validated['cliente_id'] ?? $reserva->cliente_id;
        $reserva->cuarto_id = $validated['cuarto_id'] ?? $reserva->cuarto_id;
        $reserva->persona_id = $validated['persona_id'] ?? $reserva->persona_id;
        $reserva->cantidad_pensionados = $validated['cantidad_pensionados'] ?? $reserva->cantidad_pensionados;
        $reserva->save();
        return response()->json(['mensaje' => 'Reserva actualizada']);
    
    }
    
    public function delete($id) {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['mensaje' => 'Reserva  no encontrada'], 404);
        }
        $reserva->delete();
        return response()->json(['mensaje' => 'Reserva borrada']);
    }
}
