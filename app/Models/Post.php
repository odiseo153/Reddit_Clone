<?php

namespace App\Models;

use App\Models\BaseModel;


class Post extends BaseModel
{

    protected $fillable = [
        'title',
        'content',
        'subreddit_id',
        'user_id',
        'image_path'
    ];

    /**
     * Relación: un post pertenece a un subreddit.
     */
    public function subreddit()
    {
        return $this->belongsTo(Subreddit::class);
    }

    /**
     * Relación: un post pertenece a un usuario (autor).
     */
    public function author()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * Relación: un post puede tener muchos comentarios.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Relación: un post puede tener muchos votos.
     */
       public function votes()
       {
           return $this->morphMany(Vote::class, 'votable');
       }

}
