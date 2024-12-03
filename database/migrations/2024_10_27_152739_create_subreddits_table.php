<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('subreddits', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name')->unique();
            $table->string('photo');
            $table->ulid('user_id');
            $table->text('description')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subreddits');
    }
};
