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
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('website_id')->index()->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('paymentMethod_id');
            $table->string('country')->nullable();
            $table->string('fingerprint')->nullable();
            $table->string('brand')->nullable();
            $table->string('exp_month')->nullable();
            $table->string('exp_year')->nullable();
            $table->string('last4')->nullable();
            $table->boolean('is_default')->default(false);
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
        Schema::dropIfExists('payment_methods');
    }
};
