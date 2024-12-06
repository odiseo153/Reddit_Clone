<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Seleccionar aleatoriamente entre un Post o un Comment existente
        $votableType = $this->faker->randomElement([Post::class, Comment::class]);

        // Obtener un ID existente del modelo seleccionado
        $votableId = $votableType::query()->inRandomOrder()->value('id');

        // Asegurar que haya un votable disponible
        if (!$votableId) {
            throw new \Exception("No hay registros en $votableType para asignar un voto.");
        }

        return [
            'votable_id' => $votableId,
            'votable_type' => $votableType,
            'vote_value' => $this->faker->randomElement([-1, 1]), // -1 para downvote, 1 para upvote
            'user_id' => User::query()->inRandomOrder()->value('id') ?: User::factory()->create()->id,
            'type' => $this->faker->randomElement(['upvote', 'downvote']),
        ];
    }
}
