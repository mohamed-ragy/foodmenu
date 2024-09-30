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
        Schema::create('cron_jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('website_id')->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('timeZone')->nullable();
            $table->integer('type');
            //0 => daily statistics
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cron_jobs');
    }
};
