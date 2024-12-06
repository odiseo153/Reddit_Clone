<?php

namespace App\Repositories;


use App\Models\User;
use App\Models\Subreddit;
use Illuminate\Support\Facades\Auth;


class SubRedditRepositoy extends BaseRepository
{
    protected $allowedFilters = [];
    protected $allowedSorts = [];
    protected $with = ['create_by', 'posts'];

    public function __construct(Subreddit $model)
    {
        parent::__construct($model);
    }

    public function find($name)
    {
        // Cargar el subreddit con relaciones y contadores necesarios
        $subreddit = Subreddit::select(['id', 'name', 'description', 'photo', 'user_id'])
            ->with([
                'posts:id,subreddit_id,title,content,user_id',      // Relación con posts
                'posts.author:id,username,photo',                    // Relación con el autor del post
                'rules',                                             // Relación con las reglas
                'create_by:id,username,email'                        // Usuario que creó el subreddit
            ])
            ->withCount([
                'posts',  // Contar posts
                'users'   // Contar usuarios relacionados
            ])
            ->where('name', $name)
            ->firstOrFail();  // Obtener el subreddit o lanzar un error si no existe
    
        // Si el usuario está autenticado, agregamos los campos adicionales
        if (Auth::check()) {
            $user = Auth::user();
            
            // Verificar si el usuario ha unido el subreddit y si lo tiene en favoritos
            $subreddit->is_join = $user->subreddits()->where('subreddit_id', $subreddit->id)->exists();
            $subreddit->is_favorite = $user->favorites()->where('subreddit_id', $subreddit->id)->exists();
        }
    
        return $subreddit;  // Retornar la información del subreddit
    }
    
    
    
    


    public function indexHome()
    {
        $columns = ['id', 'name', 'photo'];
        $data = [];
    
        // Obtenemos todos los subreddits
        $data['reddits'] = Subreddit::orderBy('name')->select($columns)->get();
    
        // Si el usuario está autenticado, cargamos sus subreddits
        if (Auth::check()) {
            $data['redditsJoin'] = Auth::user()->subreddits()->select($columns)->get();
        } else {
            $data['redditsJoin'] = [];
        }
    
        return $data;
    }
    
    

    public function destroy($id){
        $subreddit = Subreddit::findOrFail($id);
        if($subreddit){
            $subreddit->delete();
            return true;
        }
        return false;

    }

    public function update($id,array $data){
        $subreddit = Subreddit::findOrFail($id);
        if($subreddit){
            $subreddit->update($data);
        }
        return $subreddit;
    }

    public function joinSubReddit(string $subredditId)
    {
        $user = User::findOrFail(Auth::id());

        $user->subreddits()->toggle($subredditId);
    
        return ['message' => 'Bienvenido a Bordo'];
    }

    public function toggleFavorite(string $subredditId)
{
    try {
        $user = User::findOrFail(Auth::id());
        $isFavorited = $user->favorites()->toggle($subredditId);
        return $isFavorited ? 'Subreddit added to favorites.' : 'Subreddit removed from favorites.';
    } catch (\Exception $e) {
        \Log::error('Error toggling favorite: ' . $e->getMessage());
        return 'An error occurred while toggling the favorite.';
    }
}
    

} 



