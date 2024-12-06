<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostService;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\AddVoteRequest;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostsController extends Controller
{
    private PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    } 

    // Listar todos los posts
    public function index()
    {
        return $this->postService->ListPosts();
    }

    public function addVote(AddVoteRequest $request)
    {
    
       $this->postService->addVote($request->toArray());
    
        return response()->json(['message' => 'Voto registrado exitosamente'], Response::HTTP_OK);
    }
    

    // Mostrar un post específico por su ID
    public function show($id)
    {
        $post = $this->postService->show($id);


        return response()->json($post, Response::HTTP_OK);
    }

    // Crear un nuevo post
    public function store(CreatePostRequest $request)
    {
          
        // Crea el post usando el servicio
        $post = $this->postService->store($request->toArray());
    
        return response()->json($post, Response::HTTP_CREATED);
    }
    

    // Actualizar un post existente
    public function update(UpdatePostRequest $request, $id)
    {

        $post = $this->postService->update($id, $request->toArray());

        return response()->json($post, Response::HTTP_OK);
    }

    // Eliminar un post
    public function destroy($id)
    {
        $post = $this->postService->destroy($id);

        return response()->json($post['message'], Response::HTTP_OK);
    }
}





