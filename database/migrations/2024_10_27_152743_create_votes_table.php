<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulidMorphs('votable'); // Crea 'votable_id' y 'votable_type'
            $table->integer('vote_value');
            $table->ulid('user_id');
            
            $table->enum('type', ['upvote', 'downvote']); // Enum para el tipo de voto

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

           // $table->unique(['votable_id', 'votable_type', 'user_id'], 'unique_votes'); // Evitar votos duplicados

            // Agregar índices para optimizar consultas frecuentes
            $table->index('user_id');
            $table->index('votable_id');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
};

