<?php

namespace App\Services;

use App\Repositories\SubRedditRepositoy;

class SubRedditService {
    protected $subRedditRepository;

    public function __construct(SubRedditRepositoy $subRedditRepository)
    {
        $this->subRedditRepository = $subRedditRepository;
    }

    public function ListReddits()
    {
        return $this->subRedditRepository->index();
    }

    public function ListRedditsHome()
    {
        return $this->subRedditRepository->indexHome();
    }

    public function show($name)
    {
        return $this->subRedditRepository->find($name);
    }

    public function join($redditId)
    {
        return $this->subRedditRepository->joinSubReddit($redditId);
    }

    public function HandlerFavorite($redditId)
    {
        return $this->subRedditRepository->toggleFavorite($redditId);
    }


    public function store(array $data)
    {
        return $this->subRedditRepository->create($data);
    }

    public function update($id,array $data)
    {
        return $this->subRedditRepository->update($id,$data);
    }

    public function destroy($id)
    {
        return $this->subRedditRepository->destroy($id);
    }
}
