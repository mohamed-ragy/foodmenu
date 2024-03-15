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
        Schema::create('promocodes', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('website_id');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('code');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_delivery');
            $table->boolean('is_pickup');
            $table->boolean('is_guest');
            $table->boolean('is_oneUse');
            $table->boolean('is_expires');
            $table->integer('expires_at')->nullable();
            $table->integer('discount');
            $table->decimal('minimum',10,2);
            $table->decimal('cap',10,2);
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
        Schema::dropIfExists('promocodes');
    }
};
