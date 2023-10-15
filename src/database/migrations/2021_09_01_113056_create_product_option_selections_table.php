<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductOptionSelectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_option_selections', function (Blueprint $table) {
            $table->id()->index();
            $table->UnsignedBigInteger('website_id')->index();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->UnsignedBigInteger('product_option_id')->index();
            $table->foreign('product_option_id')->references('id')->on('product_options')->onDelete('cascade');
            $table->integer('sort');
            $table->decimal('price',10,2)->default(0.00);
            $table->boolean('isDefault')->default(false);
            $table->string('name');
            $table->string('name_en')->nullable();
            $table->string('name_ar')->nullable();
            $table->string('name_eg')->nullable();
            $table->string('name_fr')->nullable();
            $table->string('name_de')->nullable();
            $table->string('name_it')->nullable();
            $table->string('name_es')->nullable();
            $table->string('name_ru')->nullable();
            $table->string('name_ua')->nullable();
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
        Schema::dropIfExists('product_option_selections');
    }
}
