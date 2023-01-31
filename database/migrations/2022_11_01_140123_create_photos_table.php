<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('photo_category_id');
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('url', 2048)->nullable();
            $table->string('url_nsfw', 2048)->nullable();
            $table->string('slug')->unique();
            $table->boolean('nsfw')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photos');
    }
};
