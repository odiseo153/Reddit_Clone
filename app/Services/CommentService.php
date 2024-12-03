<?php

namespace App\Services;


use App\Repositories\CommentRepository;

class CommentService {
    protected $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function ListComments()
    {
        return $this->commentRepository->index();
    }

    public function addVote(array $data)
    {
        return $this->commentRepository->addVote($data);
    }

    public function show($id)
    {
        return $this->commentRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->commentRepository->create($data);
    }

    public function update(array $data, $id)
    {
       return $this->commentRepository->update( $id,$data);
    }

    public function destroy($id)
    {
        return $this->commentRepository->destroy($id);
    }
}
