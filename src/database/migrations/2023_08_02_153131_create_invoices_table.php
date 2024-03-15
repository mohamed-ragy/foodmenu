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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('website_id')->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('invoice_id')->nullable()->unique();
            $table->string('status');
            $table->string('period_start');
            $table->string('period_end');
            $table->string('currency');
            $table->integer('total');
            $table->integer('amount_due');
            $table->integer('amount_paid');
            $table->integer('amount_remaining');
            $table->integer('amount_refunded')->default(0);
            $table->integer('starting_balance');
            $table->integer('ending_balance');
            $table->integer('paid_at')->nullable();
            $table->integer('created');
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
        Schema::dropIfExists('invoices');
    }
};
