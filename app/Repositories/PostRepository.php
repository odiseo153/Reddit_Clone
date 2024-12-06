<?php

namespace App\Repositories;

use App\Models\Post;
use App\Models\Vote;
use App\Repositories\BaseRepository;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class PostRepository extends BaseRepository
{
    protected $allowedFilters = [];
    protected $allowedSorts = [];
    protected $with = ['subreddit','author', 'votes','comments'];

    public function __construct(Post $model)
    {
        parent::__construct($model);

        $this->allowedFilters = [
            AllowedFilter::scope('title'),
            AllowedFilter::scope('content'),
        ];

        $this->allowedSorts = [
            AllowedSort::field('title')
        ];
    }

    public function indexHome()
    {
        $posts = Post::with(['author:id,username', 'subreddit:id,name,photo']) // Carga relaciones necesarias
            ->join('subreddits', 'posts.subreddit_id', '=', 'subreddits.id') // Une con la tabla de subreddits
            ->orderBy('subreddits.name') // Ordena por nombre del subreddit
            ->select([
                'posts.id',       // Selecciona el ID del post
                'posts.image_path',       // Selecciona el ID del post
                'posts.title',    // Selecciona el título del post
                'posts.content',  // Selecciona el contenido del post
                'subreddits.name as subreddit_name', // Agrega el nombre del subreddit
                'subreddits.photo as subreddit_photo' // Agrega la foto del subreddit
            ])
            ->withCount(['votes','comments']) // Cuenta los votos del post
            ->get();
    
        return $posts;
    }
    
    public function find($id)
    {
        // Obtiene el post con las relaciones necesarias
        $post = Post::with([
            'author:id,username,photo', // Incluye el autor con su ID y nombre de usuario
            'subreddit:id,name,description,photo,created_at',
            'subreddit.posts', // Relación para contar los posts del subreddit
            'subreddit.users', // Relación para contar los usuarios del subreddit
            'comments:id,content,created_at,post_id,user_id', // Incluye los comentarios con sus campos específicos
            'comments.user:id,username,photo' // Incluye los usuarios de los comentarios con su ID, nombre y foto
        ])
        ->select([
            'id',         // ID del post
            'title',      // Título del post
            'content',    // Contenido del post
            'image_path',    // Contenido del post
            'user_id',    // ID del usuario
            'subreddit_id' // ID del subreddit
        ])
        ->withCount(['votes','subreddit'])
        
        ->where('id', $id) // Filtra por el ID del post
        ->firstOrFail();   // Lanza una excepción si no se encuentra el post
    
        return $post;
    }

    

 
    
   
    public function updatePost($id, array $data)
    {
        try {
            $post = Post::findOrFail($id);
            $post->update($data);

            return $post;
        } catch (ModelNotFoundException $e) {
            return ['error' => 'Post no encontrado'];
        }
    }


    public function addVote(array $data)
    {
        // Usar updateOrCreate para evitar la verificación manual de "wasRecentlyCreated"
        $vote = Vote::updateOrCreate(
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
            $post = Post::findOrFail($id); 
            $post->delete();

            return ['message' => 'Post eliminado correctamente', 'status' => 200];
        } catch (ModelNotFoundException $e) {
            return ['error' => 'Post no encontrado', 'status' => 400];
        }
    }
}
