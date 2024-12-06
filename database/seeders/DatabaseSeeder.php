<?php

namespace Database\Seeders;

use App\Models\{Post, User, Vote, Rule, Comment, Subreddit};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Crear un usuario de prueba con contenido relacionado
        $testUser = User::factory()
            ->has(Comment::factory()->count(5))
            ->has(Vote::factory()->count(10))
            ->has(Post::factory()->count(5))
            ->has(Subreddit::factory()->count(5))
            ->create([
                'username' => "test",
                'email' => "test@gmail.com",
                'photo' => fake()->imageUrl(),
                'password' => Hash::make('password'),
            ]);

        // Crear usuarios adicionales
        $users = User::factory()->count(10)->create();

        // Crear subreddits asociados a usuarios aleatorios
        $subreddits = Subreddit::factory()->count(5)->create([
            'user_id' => $users->random()->id,
        ]);

        // Crear posts asociados a usuarios y subreddits
        $posts = Post::factory()
            ->has(Vote::factory()->count(10))
            ->count(20)
            ->create(fn () => [
                'user_id' => $users->random()->id,
                'subreddit_id' => $subreddits->random()->id,
            ]);

        // Crear comentarios relacionados a posts y usuarios
         Comment::factory()
            ->has(Vote::factory()->count(10))
            ->count(20)
            ->create(fn () => [
                'post_id' => $posts->random()->id,
                'user_id' => $users->random()->id,
            ]);

        // Crear reglas para los subreddits

        /*
        Rule::factory()
            ->count(10)
            ->create(fn () => [
                'subreddit_id' => $subreddits->random()->id,
            ]);
                */

        // Relacionar votos con posts y comentarios evitando duplicados
    }

    /**
     * Genera votos únicos asociados a posts o comentarios.
     *
     * @param \Illuminate\Support\Collection $users
     * @param \Illuminate\Support\Collection $posts
     * @param \Illuminate\Support\Collection $comments
     */
    private function generateUniqueVotes($users, $posts, $comments)
    {
        $usedCombinations = [];

        $users->each(function ($user) use ($posts, $comments, &$usedCombinations) {
            foreach (range(1, 10) as $i) {
                do {
                    $votable = $this->getRandomVotable($posts, $comments);
                    $key = "{$user->id}-{$votable->id}-" . get_class($votable);
                } while (isset($usedCombinations[$key]));

                $usedCombinations[$key] = true;

                Vote::factory()->create([
                    'user_id' => $user->id,
                    'votable_id' => $votable->id,
                    'votable_type' => get_class($votable),
                ]);
            }
        });
    }

    /**
     * Devuelve un modelo aleatorio entre posts y comentarios.
     *
     * @param \Illuminate\Support\Collection $posts
     * @param \Illuminate\Support\Collection $comments
     * @return \Illuminate\Database\Eloquent\Model
     */
    private function getRandomVotable($posts, $comments)
    {
        return rand(0, 1) ? $posts->random() : $comments->random();
    }
}
