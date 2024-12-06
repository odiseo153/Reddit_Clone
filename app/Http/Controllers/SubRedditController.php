<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SubRedditService;
use App\Http\Requests\CreateSubRedditRequest;

class SubRedditController extends Controller
{
    private SubRedditService $redditService;

    public function __construct(SubRedditService $redditService)
    {
        $this->redditService = $redditService;
    } 
    /**
     * Mostrar una lista de subreddits.
     */
    public function index()
    {
        $subreddits = $this->redditService->ListReddits();

        return response()->json($subreddits);
    }

    public function indexHome()
    {
        $subreddits = $this->redditService->ListRedditsHome();

        return response()->json($subreddits);
    }

    /**
     * Crear un nuevo subreddit.
     */
    public function store(CreateSubRedditRequest $request)
    {
        $subreddit = $this->redditService->store($request->toArray());

        return response()->json(['message' => 'Subreddit creado exitosamente', 'data' => $subreddit], 201);
    }

    /**
     * Mostrar un subreddit específico.
     */
    public function show($name)
    {
        $subreddit = $this->redditService->show($name);
        
        return response()->json($subreddit);
    }

    public function showAuth($nam)
    {
        $subreddit = $this->redditService->show($nam);
        
        return response()->json($subreddit);
    }

    public function join($id)
    {
        $response = $this->redditService->join($id);
        
        return response()->json($response);
    }

    public function rule($id)
    {
        $response = $this->redditService->join($id);
        
        return response()->json($response);
    }

    public function addToFavorite($id)
    {
        $response = $this->redditService->HandlerFavorite($id);
        
        return response()->json($response);
    }

    /**
     * Actualizar un subreddit.
     */
    public function update(Request $request, $id)
    {
        $subreddit = $this->redditService->update($id, $request->toArray());

        return response()->json(['message' => 'Subreddit actualizado exitosamente', 'data' => $subreddit],201);
    }

    /**
     * Eliminar un subreddit.
     */
    public function destroy($id)
    {
        $this->redditService->destroy($id);

        return response()->json(['message' => 'Subreddit eliminado exitosamente']);
    }
}
