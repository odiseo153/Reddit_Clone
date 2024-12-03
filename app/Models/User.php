<?php

namespace App\Models;

use App\Models\Post;
use App\Models\Subreddit;
use Symfony\Component\Uid\Ulid;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, HasUlids,Notifiable,HasApiTokens;

    protected $fillable = [
        'username',
        'description',
        'banner',
        'photo',
        'email',
        'password',
        'subreddit_id',
    ];

    protected $hidden = [
        'password',
    ];

    /**
     * Relación: un usuario puede tener muchos subreddits.
     */

    public function own_subreddits()
    {
        return $this->hasMany(Subreddit::class);
    }

    public function subreddits()
    {
        return $this->belongsToMany(Subreddit::class, 'subreddit_user', 'user_id', 'subreddit_id');
    }

    public function favorites()
    {
        return $this->belongsToMany(Subreddit::class, 'favorites', 'user_id', 'subreddit_id');
    }

    
    /**
     * Relación: un usuario puede tener muchos posts.
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Relación: un usuario puede hacer muchos comentarios.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Relación: un usuario puede hacer muchos votos.
     */
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    protected $keyType = 'string';

    public $incrementing = true;

    public function newUniqueId(): string
    {
        return (string) Ulid::generate(); 
    }
}
