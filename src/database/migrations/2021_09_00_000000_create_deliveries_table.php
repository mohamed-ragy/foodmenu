<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id()->index();
            $table->UnsignedBigInteger('website_id')->index();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('deliveryName')->unique()->index();
            $table->string('password');
            $table->integer('lastSeen')->nullable();
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
        Schema::dropIfExists('deliveries');
    }
}
