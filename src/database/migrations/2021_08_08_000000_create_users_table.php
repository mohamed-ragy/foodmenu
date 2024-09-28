<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->string('resetPassword_token')->nullable();
            $table->integer('resetPassword_token_sent_at')->nullable();
            $table->tinyInteger('resetPassword_token_counter')->default(0);
            $table->rememberToken();
            $table->UnsignedBigInteger('website_id');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('name');
            // $table->string('address')->nullable();
            $table->json('addresses');
            $table->string('phoneNumber')->nullable();
            $table->text('cart');
            $table->integer('cart_lastUpdate')->nullable();
            $table->boolean('isBanned')->default(false);
            $table->integer('lastSeen')->nullable();
            $table->integer('lastChat')->nullable();
            $table->string('lastMsg_id')->nullable();
            $table->string('lat')->default('0');
            $table->string('lng')->default('0');
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
        Schema::dropIfExists('users');
    }
}
