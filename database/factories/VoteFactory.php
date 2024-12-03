<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Generar aleatoriamente el modelo relacionado (Post o Comment)
        $votableType = $this->faker->randomElement([Post::class, Comment::class]);
        $votable = $votableType::factory()->create();

        return [
            'votable_id' => $votable->id,
            'votable_type' => $votableType,
            'vote_value' => $this->faker->randomElement([-1, 1]), // -1 para downvote, 1 para upvote
            'user_id' =>User::factory()->create(),
            'type' => $this->faker->randomElement(['upvote', 'downvote']),
        ];
    }
}
