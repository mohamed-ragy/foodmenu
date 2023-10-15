<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('account_id');
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->string('old_phone');
            $table->string('new_phone');
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
        Schema::dropIfExists('phones');
    }
}
