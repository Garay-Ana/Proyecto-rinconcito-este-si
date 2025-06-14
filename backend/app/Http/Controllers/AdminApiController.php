<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pedido;
use App\Models\Plato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminApiController extends Controller
{
    public function listUsers(Request $request)
    {
        $tipo = $request->query('tipo');
        if ($tipo) {
            $users = User::where('tipo_usuario', $tipo)->paginate(15);
        } else {
            $users = User::paginate(15);
        }
        return response()->json($users);
    }

    public function listPedidos(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Pedido::query();

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        $pedidos = $query->with('plato', 'cliente')->paginate(15);

        foreach ($pedidos as $pedido) {
            $precio = $pedido->plato->precio ?? 0;
            $cantidad = $pedido->cantidad ?? 1;
            $pedido->totalCalculado = $precio * $cantidad;
        }

        return response()->json($pedidos);
    }

    public function listPlatos()
    {
        $platos = Plato::all();
        return response()->json($platos);
    }

    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'tipo_usuario' => ['required', Rule::in(['cliente', 'chef', 'repartidor', 'admin'])],
            'role' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'tipo_usuario' => $validated['tipo_usuario'],
            'role' => $validated['role'] ?? null,
            'fecha_nacimiento' => $validated['fecha_nacimiento'] ?? null,
        ]);

        return response()->json($user, 201);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required','email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'tipo_usuario' => ['required', Rule::in(['cliente', 'chef', 'repartidor', 'admin'])],
            'role' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->tipo_usuario = $validated['tipo_usuario'];
        $user->role = $validated['role'] ?? null;
        $user->fecha_nacimiento = $validated['fecha_nacimiento'] ?? null;
        $user->save();

        return response()->json($user);
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function chefDetails($id)
    {
        $chef = User::where('tipo_usuario', 'chef')->findOrFail($id);

        $platos = Plato::where('user_id', $chef->id)->get();

        $ventasPorPlato = [];
        foreach ($platos as $plato) {
            $pedidos = Pedido::where('plato_id', $plato->id)->get();
            $cantidadVendida = $pedidos->sum('cantidad');
            $totalVentas = $pedidos->sum(function ($pedido) {
                return ($pedido->precio_con_descuento ?? 0) * $pedido->cantidad;
            });
            $ventasPorPlato[] = [
                'plato' => $plato,
                'cantidad_vendida' => $cantidadVendida,
                'total_ventas' => $totalVentas,
            ];
        }

        return response()->json([
            'chef' => $chef,
            'ventasPorPlato' => $ventasPorPlato,
        ]);
    }

    public function reportes(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Pedido::query();

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        $pedidos = $query->with('plato', 'cliente')->get();

        foreach ($pedidos as $pedido) {
            $precio = $pedido->plato->precio ?? 0;
            $cantidad = $pedido->cantidad ?? 1;
            $pedido->totalCalculado = $precio * $cantidad;
        }

        $platos = Plato::all();

        $totalesPorPlato = $pedidos->groupBy('plato_id')->map(function ($pedidosPorPlato) {
            $cantidadTotal = $pedidosPorPlato->sum('cantidad');
            $totalValor = $pedidosPorPlato->sum(fn($pedido) => $pedido->totalCalculado ?? 0);
            $nombrePlato = $pedidosPorPlato->first()->plato->nombre ?? 'N/A';
            return [
                'nombre' => $nombrePlato,
                'cantidad_total' => $cantidadTotal,
                'total_valor' => $totalValor,
            ];
        });

        return response()->json([
            'pedidos' => $pedidos,
            'platos' => $platos,
            'totalesPorPlato' => $totalesPorPlato,
        ]);
    }
}
