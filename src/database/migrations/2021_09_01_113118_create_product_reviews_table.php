<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_reviews', function (Blueprint $table) {
            $table->id()->index();
            $table->UnsignedBigInteger('website_id')->index();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->UnsignedBigInteger('product_id')->index();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->string('product_name');
            $table->UnsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->string('userName')->nullable();
            $table->integer('rate')->index();
            $table->text('review');
            $table->integer('posted_at')->index();
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
        Schema::dropIfExists('product_reviews');
    }
}
