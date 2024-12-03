<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends BaseModel 
{
    protected $fillable = [
        'subreddit_id', 
        'user_id'
    ];

    
    public function subreddit()
    {
        return $this->belongsTo(Subreddit::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}