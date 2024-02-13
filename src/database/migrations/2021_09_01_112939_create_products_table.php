<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id()->index();

            $table->UnsignedBigInteger('website_id')->index();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');

            $table->UnsignedBigInteger('category_id')->nullable()->index();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->tinyInteger('sort')->nullable();

            $table->UnsignedBigInteger('img_id')->nullable();
            $table->foreign('img_id')->references('id')->on('imgs')->onDelete('set null');
            $table->string('img')->nullable();
            $table->string('thumbnail')->nullable();

            $table->string('name')->index();

            $table->json('names');
            $table->json('descriptions');

            $table->decimal('price',10,2)->default(0.00);
            $table->boolean('availability')->default(true);
            $table->decimal('rating',10,2)->index()->nullable();
            $table->integer('ratings_sum')->default(0);
            $table->integer('ordered_sum')->default(0);
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
        Schema::dropIfExists('products');
    }
}
