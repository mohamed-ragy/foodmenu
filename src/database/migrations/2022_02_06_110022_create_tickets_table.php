<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id()->startingValue(1000);
            $table->UnsignedBigInteger('website_id')->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->integer('code');
            $table->integer('status');
            //0->new -> open
            //1->open -> open
            //2->pending -> Awaiting your reply
            //3->solved -> solved
            //4->closed -> solved
            $table->string('title');
            $table->text('msg');
            $table->text('comments')->nullable();
            $table->text('imgs')->nullable();
            $table->string('language');
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
        Schema::dropIfExists('tickets');
    }
}
