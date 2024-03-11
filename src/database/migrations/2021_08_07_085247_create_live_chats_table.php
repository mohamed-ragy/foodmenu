<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLiveChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mongodb')->drop('live_chats');

        Schema::connection('mongodb')->create('live_chats', function ($collection) {
            // $table->id()->index();
            // $table->UnsignedBigInteger('website_id')->index();
            // $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            // $table->intger('author');
            //0 => website
            //1 => user
            // $table->tinyText('message');
            // $table->timestamp('sent_at')->index();
            // $table->timestamp('delivered_at')->nullable();
            // $table->timestamp('seen_at')->nullable();
            // $table->boolean('isDeleted')->default(false);
            // $table->timestamps();
            $collection->index('_id');
            $collection->index('website_id');
            $collection->index('user_id');
            $collection->index('guest_id');
            // $collection->index('sent_at');
            // $collection->index('is_delivered');
            // $collection->index('is_seen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // if(Schema::connection('mongodb')->hasTable('live_chats') == false) {
        //     Schema::connection('mongodb')
        //         ->table('live_chats', function (Blueprint $collection) {
        //             $collection->drop();
        //         });
        // }
        // Schema::connection('mongodb')->drop('live_chats');
        // Schema::connection('mongodb')->drop('live_chats');
        // Schema::connection('mongodb')->dropIfExists('live_chats');
        // Schema::dropIfExists('live_chats');
    }
}
