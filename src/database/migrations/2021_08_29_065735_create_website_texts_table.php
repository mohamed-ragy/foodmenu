<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatewebsiteTextsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('website_texts', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('website_id');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->json('text');
            $table->string('lang');
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
        Schema::dropIfExists('website_texts');
    }
}
