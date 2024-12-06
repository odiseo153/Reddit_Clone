<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{
    // Listar todos los usuarios
    public function index()
    {
        $users = User::all();
        return response()->json($users, Response::HTTP_OK);
    }

    // Mostrar un usuario específico por su ID
    public function show($id)
    {
        $user = User::with([
            'comments:id,content,created_at,user_id',
            'posts',
            'own_subreddits:id,name,photo,created_at,description,user_id'])
        ->where('id', $id)
        ->firstOrFail();
        
        if ($user) {
            return response()->json($user, Response::HTTP_OK);
        }

        return response()->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'photo' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:2'
        ]);

        $user = User::create([
            'username' => $request->input('username'),
            'photo' => $request->input('photo'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        return response()->json($user, Response::HTTP_CREATED);
    }

    // Actualizar un usuario existente
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'username' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'photo' => 'sometimes|string',
            'description' => 'sometimes|string',
            'password' => 'sometimes|string|min:8'
        ]);

        $data = $request->only(['username', 'email', 'photo', 'description']);

        
        // Si se envía una nueva contraseña, encriptarla
        if ($request->has('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }

        $user->update($data);

        return response()->json($user, Response::HTTP_OK);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente'], Response::HTTP_OK);
    }


}
