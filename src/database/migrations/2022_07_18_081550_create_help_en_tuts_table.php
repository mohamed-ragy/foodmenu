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
        Schema::create('help_en_tuts', function (Blueprint $table) {
            $table->id();
            $table->string('title_id');
            $table->tinyInteger('sort');
            $table->string('title',100);
            $table->string('description');
            $table->string('icon');
            $table->string('helpCat');
            $table->string('keyWords');
            $table->integer('upRates')->default(0);
            $table->integer('downRates')->default(0);
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
        Schema::dropIfExists('help_en_tuts');
    }
};
