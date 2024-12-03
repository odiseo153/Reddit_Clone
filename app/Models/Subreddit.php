<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subreddit extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'photo',
        'user_id',
    ];

    /**
     * Relación: un subreddit pertenece a un usuario (creador).
     */
    public function create_by()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'subreddit_user', 'subreddit_id', 'user_id');
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites', 'subreddit_id', 'user_id');
    }

    /**
     * Relación: un subreddit puede tener muchos posts.
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function scopeUserName($query, $search)
    {
        return $query->whereHas('subreddits', function ($query) use ($search) {
            $query->where('name', 'like', "%$search%");
        });
    }
}
