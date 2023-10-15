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
        Schema::create('ticket_msgs', function (Blueprint $table) {
            $table->id();
            $table->integer('author');
            $table->UnsignedBigInteger('website_id')->index()->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->UnsignedBigInteger('admin_id')->nullable();
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('set null');
            $table->UnsignedBigInteger('ticket_id')->index();
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->text('msg');
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
        Schema::dropIfExists('ticket_msgs');
    }
};
