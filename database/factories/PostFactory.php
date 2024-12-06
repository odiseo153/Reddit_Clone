<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Subreddit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' => $this->faker->words(3,true),
            'content' => $this->faker->paragraph(),
            'image_path' => $this->faker->imageUrl(),
            'subreddit_id' => Subreddit::factory()->create(),
            'user_id' => User::factory()->create(),
        ];
    }
}
