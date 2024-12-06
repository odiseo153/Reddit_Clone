<?php

namespace App\Http\Controllers;

use App\Services\RuleService;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\CreateRuleRequest;
use App\Http\Requests\UpdatePostRequest;

class RuleController extends Controller
{
    private RuleService $ruleService;

    public function __construct(RuleService $ruleService)
    {
        $this->ruleService = $ruleService;
    } 

    // Listar todos los posts
    public function index()
    {
        return $this->ruleService->ListRules();
    }

   
    // Mostrar un post específico por su ID
    public function show($id)
    {
        $post = $this->ruleService->find($id);


        return response()->json($post, Response::HTTP_OK);
    } 

    // Crear un nuevo post
    public function store(CreateRuleRequest $request)
    {
        $post =$this->ruleService->create($request->toArray());

        return response()->json($post, Response::HTTP_CREATED);
    }

    // Actualizar un post existente
    public function update(UpdatePostRequest $request, $id)
    {

        $post = $this->ruleService->update($id, $request->toArray());

        return response()->json($post, Response::HTTP_OK);
    }

    // Eliminar un post
    public function destroy($id)
    {
        $post = $this->ruleService->delete($id);

        return response()->json($post['message'], Response::HTTP_OK);
    }

}





