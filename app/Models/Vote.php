<?php

namespace App\Models;

use App\Models\BaseModel;


class Vote extends BaseModel
{
    protected $fillable = [
        'votable_id', 
        'votable_type', 
        'vote_value', 
        'user_id', 
        'type'
    ];

    /**
     * Relación polimórfica para el modelo votable.
     */
    public function votable()
    {
        return $this->morphTo();
    }
}
