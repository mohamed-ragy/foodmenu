<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mongodb')->drop('notifications');
        Schema::connection('mongodb')->create('notifications', function ($collection) {
            // $table->id();
            // $table->integer('code');
            // $table->boolean('seen')->default(false)->index();
            // $table->integer('ticket_id')->nullable();
            // $table->UnsignedBigInteger('website_id')->index();
            // $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            // $table->integer('user_id')->nullable();
            // $table->integer('order_id')->nullable();
            // $table->integer('product_review_id')->nullable();
            // $table->integer('delivery_id')->nullable();
            // $table->integer('product_id')->nullable();
            // $table->string('userName')->nullable();
            // $table->string('productName')->nullable();
            // $table->string('deliveryName')->nullable();
            // $table->timestamps();

            // $collection->index('seen');
            $collection->index('website_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
