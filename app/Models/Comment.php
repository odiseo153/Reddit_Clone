<?php

namespace App\Models;

use App\Models\BaseModel;

class Comment extends BaseModel
{

    protected $fillable = [
        'content',
        'post_id',
        'user_id',
    ];

    /**
     * Relación: un comentario pertenece a un post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Relación: un comentario pertenece a un usuario (autor).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: un comentario puede tener muchos votos.
     */
    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }
}
