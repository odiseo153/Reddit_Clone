<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\AddVoteRequest;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Services\CommentService;



class CommentController extends Controller
{
    private CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    } 

    // Listar todos los posts
    public function index()
    {
        return $this->commentService->ListComments();
    }

    public function addVote(AddVoteRequest $request)
    {    
       $this->commentService->addVote($request->toArray());
    
        return response()->json(['message' => 'Voto registrado exitosamente'], Response::HTTP_OK);
    }
    

    // Mostrar un post específico por su ID
    public function show($id)
    {
        $post = $this->commentService->show($id);
        
        if ($post) {
            return response()->json($post, Response::HTTP_OK);
        }

        return response()->json(['error' => 'Post no encontrado'], Response::HTTP_NOT_FOUND);
    }

    // Crear un nuevo post
    public function store(CreateCommentRequest $request)
    {

        $post =$this->commentService->store($request->toArray());

        return response()->json($post, Response::HTTP_CREATED);
    }

    // Actualizar un post existente
    public function update(UpdatePostRequest $request, $id)
    {
        $post = $this->commentService->update($id, $request->toArray());

        if (!$post) {
            return response()->json(['error' => 'Post no encontrado'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($post, Response::HTTP_OK);
    }

    // Eliminar un post
    public function destroy($id)
    {
        $post = $this->commentService->destroy($id);

        if ($post['status']==400) {
            return response()->json($post['message'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($post['message'], Response::HTTP_OK);
    }
}
