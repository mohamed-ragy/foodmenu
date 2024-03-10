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
        Schema::create('help_en_sections', function (Blueprint $table) {
            $table->id();
            $table->integer('sort');
            $table->UnsignedBigInteger('article_id');
            $table->foreign('article_id')->references('id')->on('help_en_articles')->onDelete('cascade');
            $table->string('title',100);
            $table->fullText('title')->language('english');
            $table->text('html');
            $table->string('keyWords')->nullable();
            $table->fullText('keyWords')->language('english');
            $table->tinyInteger('priority');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('help_en_sections');
    }
};
