<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostsSeeder extends Seeder
{
    public function run()
    {
        Post::create([
            'title' => 'Getting started with Laravel',
            'content' => 'Laravel is a great PHP framework...',
            'subreddit_id' => 1,
            'user_id' => 1,
        ]);

        Post::create([
            'title' => 'React Hooks Overview',
            'content' => 'Hooks are a new addition to React...',
            'subreddit_id' => 2,
            'user_id' => 2,
        ]);
    }
}
