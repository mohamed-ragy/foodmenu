<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImgsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imgs', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('website_id');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('name')->nullable();
            $table->string('photographer')->nullable();
            $table->string('photographer_url')->nullable();
            $table->string('type');
            $table->string('url');
            $table->string('thumbnail_url');
            $table->string('extension');
            $table->integer('size');
            $table->integer('height');
            $table->integer('width');
            $table->integer('created_at');
            $table->integer('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imgs');
    }
}
