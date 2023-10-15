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
        Schema::create('bugs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('website_id')->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('set null');
            $table->text('msg');
            $table->boolean('isSeen')->default(false);
            $table->boolean('isSolved')->default(false);
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
        Schema::dropIfExists('bugs');
    }
};
