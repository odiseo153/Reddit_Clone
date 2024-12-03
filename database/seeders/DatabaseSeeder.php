<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Vote;
use App\Models\Comment;
use App\Models\Subreddit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Crear usuarios
        User::factory()->create([
            'username' => "test",
            'email' => "test@gmail.com",
            'photo' => fake()->imageUrl(),
            'password' => Hash::make('password'),
        ]);

        $users = User::factory()->count(10)->create();

        $subReddit = Subreddit::factory()->count(5)->create([
            'user_id' => $users->random()->id
        ]);

        // Crear posts
        $posts = Post::factory()
        ->has(vote::factory()->count(10))
        ->count(20)
        ->create([
            'user_id' => $users->random()->id,
            'subreddit_id' => $subReddit->random()->id,
        ]);

        // Crear comentarios relacionados a posts
        $comments = Comment::factory()->has(vote::factory()->count(10))->count(20)->create([
            'post_id' => $posts->random()->id,
            'user_id' => $users->random()->id,
        ]);

      
    }

    private function getRandomVotable($posts, $comments)
    {
        // Alterna aleatoriamente entre posts y comentarios
        return rand(0, 1) ? $posts->random() : $comments->random();
    }
}
