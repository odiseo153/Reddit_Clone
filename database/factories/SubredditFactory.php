<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subreddit>
 */
class SubredditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(2, true), // Genera un nombre único de 3 palabras
            'description' => $this->faker->paragraph,
            'photo' => $this->faker->imageUrl,
            'user_id' => User::factory()->create(),
        ];
    }
}
