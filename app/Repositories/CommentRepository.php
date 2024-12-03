<?php

namespace App\Repositories;

use App\Models\Comment;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentRepository extends BaseRepository
{
    protected $allowedFilters = [];
    protected $allowedSorts = []; 
    protected $with = ['user'];

    public function __construct(Comment $model)
    {
        parent::__construct($model);

        $this->allowedFilters = [
            AllowedFilter::scope('content'),
        ];

    }

    public function update($id, array $data)
    {
        try {
            $post = Comment::findOrFail($id);
            $post->update($data);

            return $post;
        } catch (ModelNotFoundException $e) {
            return ['error' => 'Post no encontrado'];
        }
    }

   
    public function addVote(array $data)
    {
        // Usar updateOrCreate para evitar la verificación manual de "wasRecentlyCreated"
        $vote = Comment::updateOrCreate(
            [
                'votable_id' => $data['votable_id'],
                'votable_type' => $data['votable_type'],
                'user_id' => $data['user_id']
            ],
            [
                'type' => $data['type'],
                'vote_value' => $data['type'] === 'upvote' ? 1 : -1,
            ]
        );

        return $vote;
    }

    public function destroy($id)
    {
        try {
            $post = Comment::findOrFail($id); 
            $post->delete();

            return ['message' => 'Comentario eliminado correctamente', 'status' => 200];
        } catch (ModelNotFoundException $e) {
            return ['error' => 'Post no encontrado', 'status' => 400];
        }
    }
}
