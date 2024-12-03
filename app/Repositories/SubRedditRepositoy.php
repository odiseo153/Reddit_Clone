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
        $subreddit = Subreddit::select(['id', 'name', 'description', 'photo', 'user_id'])
            ->with([
                'posts:id,subreddit_id,title,content,user_id',       // Incluye subreddit_id para que funcione la relación
                'posts.author:id,username,photo',                 // Relación del autor de cada post
                'posts.subreddit:id,name,photo',                 // Relación del autor de cada post
                'create_by:id,username,email'               // Usuario que creó el subreddit
            ])
            ->withCount([
                'posts',                                    // Cuenta el número de posts
                'users'                                     // Cuenta el número de usuarios relacionados
            ])
            ->where('name', $name)
            ->firstOrFail();
    
        $user = Auth::user();
        
        if ($user) {
            $subreddit->is_join = $user->subreddits()->where('subreddit_id', $subreddit->id)->exists();
            $subreddit->is_favorite = $user->favorites()->where('subreddit_id', $subreddit->id)->exists();
        }
    
        return $subreddit;
    }
    
    
    

    public function indexHome()
    {
        $reddits = Subreddit::orderBy('name')->select(['id','name','photo'])->get();

        return $reddits;
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



