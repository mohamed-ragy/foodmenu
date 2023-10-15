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

            $table->string('name')->index();
            $table->string('name_en')->nullable();
            $table->string('name_ar')->nullable();
            $table->string('name_eg')->nullable();
            $table->string('name_fr')->nullable();
            $table->string('name_de')->nullable();
            $table->string('name_it')->nullable();
            $table->string('name_es')->nullable();
            $table->string('name_ru')->nullable();
            $table->string('name_ua')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_eg')->nullable();
            $table->text('description_fr')->nullable();
            $table->text('description_de')->nullable();
            $table->text('description_it')->nullable();
            $table->text('description_es')->nullable();
            $table->text('description_ru')->nullable();
            $table->text('description_ua')->nullable();
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
