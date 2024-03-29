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
        Schema::create('help_en_articles', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('sort');
            $table->string('title_id');
            $table->string('title',100);
            $table->string('description');
            $table->string('icon');
            $table->string('category');
            $table->string('keyWords');
            $table->integer('rating')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('help_en_articles');
    }
};
