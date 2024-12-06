<?php

namespace App\Models;

use App\Models\BaseModel;

class Rule extends BaseModel
{

    protected $fillable = [
        'title',
        'content',
        'subreddit_id',
    ];

    /**
     * Relación: un comentario pertenece a un post.
     */
    public function subreddit()
    {
        return $this->belongsTo(Subreddit::class);
    }

}
