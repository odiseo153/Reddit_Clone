<?php

use App\Models\User;
use App\Models\BaseModel;
use App\Models\Subreddit;

class SubredditUser extends BaseModel
{
    protected $fillable = ['subreddit_id', 'user_id'];

    public function subreddit(){
        return $this->belongsTo(Subreddit::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
