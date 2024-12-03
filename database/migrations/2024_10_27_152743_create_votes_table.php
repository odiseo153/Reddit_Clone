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
            $table->ulidMorphs('votable');  // Crea 'votable_id' y 'votable_type'
            $table->integer('vote_value');
            $table->ulid('user_id');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('type', ['upvote', 'downvote']);

            $table->unique(['votable_id', 'votable_type', 'user_id'], 'unique_votes');
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
};
