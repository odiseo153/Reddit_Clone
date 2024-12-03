<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vote;
use App\Models\Post;
use App\Models\Comment;

class VotesSeeder extends Seeder
{
    public function run()
    {
        // Votos para publicaciones
        Vote::create([
            'user_id' => 1,
            'votable_id' => 1,  // ID del post
            'votable_type' => Post::class,  // Nombre completo del modelo (o 'App\Models\Post')
            'type' => 'upvote',  // Tipo de voto
            'vote_value' => 1,  // Puedes agregar el valor del voto si es necesario
        ]);

        Vote::create([
            'user_id' => 2,
            'votable_id' => 2,  // ID del post
            'votable_type' => Post::class,  // Nombre completo del modelo (o 'App\Models\Post')
            'type' => 'downvote',  // Tipo de voto
            'vote_value' => -1,  // Valor del voto
        ]);

        // Votos para comentarios
        Vote::create([
            'user_id' => 1,
            'votable_id' => 1,  // ID del comentario
            'votable_type' => Comment::class,  // Nombre completo del modelo (o 'App\Models\Comment')
            'type' => 'upvote',  // Tipo de voto
            'vote_value' => 1,  // Valor del voto
        ]);

        Vote::create([
            'user_id' => 2,
            'votable_id' => 2,  // ID del comentario
            'votable_type' => Comment::class,  // Nombre completo del modelo (o 'App\Models\Comment')
            'type' => 'upvote',  // Tipo de voto
            'vote_value' => 1,  // Valor del voto
        ]);
    }
}
