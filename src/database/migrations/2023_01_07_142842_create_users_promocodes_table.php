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
        Schema::create('users_promocodes', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->UnsignedBigInteger('promocode_id')->index();
            $table->foreign('promocode_id')->references('id')->on('promocodes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_promocodes');
    }
};
