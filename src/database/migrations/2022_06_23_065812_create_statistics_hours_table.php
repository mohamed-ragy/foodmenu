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
        Schema::connection('mongodb')->drop('statistics_hours');

        Schema::connection('mongodb')->create('statistics_hours', function ($collection) {
            // $collection->index('id');
            // $collection->index('website_id');
            // $collection->index('hour');
            // $collection->index('day');
            // $collection->index('month');
            // $collection->index('year');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statistics_hours');
    }
};
