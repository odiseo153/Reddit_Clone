<?php

namespace App\Services;

use App\Repositories\PostRepository;

class PostService {
    protected $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function ListPosts()
    {
        return $this->postRepository->index(); 
    }

    public function addVote(array $data)
    {
        return $this->postRepository->addVote($data);
    }

    public function show($id)
    {
        return $this->postRepository->find($id);
    }

    public function store(array $data)
    {
        return $this->postRepository->create($data);
    }

    public function update(array $data, $id)
    {
       return $this->postRepository->updatePost( $id,$data);
    }

    public function destroy($id)
    {
        return $this->postRepository->destroy($id);
    }
}
