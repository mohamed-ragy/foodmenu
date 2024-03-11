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
        Schema::connection('mongodb')->drop('activity_logs');
        Schema::connection('mongodb')->create('activity_logs', function ($collection) {
            // $table->id();
            // $table->integer('code');
            // $table->UnsignedBigInteger('website_id')->index();
            // $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');

            // $table->integer('user_id')->nullable();
            // $table->integer('account_id')->nullable();
            // $table->integer('product_id')->nullable();
            // $table->integer('category_id')->nullable();
            // $table->integer('delivery_id')->nullable();
            // $table->integer('order_id')->nullable();
            // $table->integer('product_review_id')->nullable();
            // $table->integer('img_id')->nullable();


            // $table->string('user_name')->nullable();
            // $table->string('account_name')->nullable();
            // $table->string('product_name')->nullable();
            // $table->string('category_name')->nullable();
            // $table->string('delivery_name')->nullable();
            // $table->string('component_name')->nullable();
            // $table->string('img_name')->nullable();

            // $table->integer('qty')->nullable();

            // $table->timestamps();
            $collection->index('created_at');
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
        Schema::dropIfExists('activity_logs');
    }
};
