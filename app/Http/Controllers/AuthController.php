<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle login request.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // Validar y autenticar al usuario
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials. Please try again.',
            ], 401);
        }

        //$request->session()->regenerate(); // Proteger contra ataques de sesión
        $authenticatedUser = Auth::user();
        $token = $authenticatedUser->createToken('token', ['*'], now()->addHours(15))->plainTextToken;

        return response()->json([
            'data'=>[

                'message' => 'Logged in successfully.',
                'token'=> $token,
                'user' => Auth::user(),
            ]
        ]);
    }

    /**
     * Handle logout request.
     */
    public function logout(Request $request): JsonResponse
    {

        Auth::user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Get the current authenticated user.
     */
    public function me(): JsonResponse
{
    $userId = Auth::id();

    if (!$userId) {
        return response()->json([
            'message' => 'No authenticated user.',
        ], 401);
    }

    $user = User::with([
            'comments:id,content,created_at,user_id',
            'posts:id,title,content,created_at,user_id,subreddit_id',
            'posts.author:id,username,photo',  
            'posts.subreddit:id,name,photo',  
            'own_subreddits:id,name,photo,created_at,description,user_id',
            'favorites:id,name,photo,created_at,description,user_id',
        ])
        ->withCount(['comments', 'posts', 'own_subreddits'])
        ->where('id', $userId)
        ->firstOrFail();

    return response()->json([
        'user' => $user,
    ]);
}

}
