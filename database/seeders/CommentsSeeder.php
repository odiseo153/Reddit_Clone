<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentsSeeder extends Seeder
{
    public function run()
    {
        Comment::create([
            'content' => 'I love Laravel!',
            'post_id' => 1,
            'user_id' => 2,
        ]);

        Comment::create([
            'content' => 'React hooks changed the way I code!',
            'post_id' => 2,
            'user_id' => 1,
        ]);
    }
}
