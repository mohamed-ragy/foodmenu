<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateaccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_master');
            $table->tinyInteger('register');
            //0=>step2 (only account created)
            //1=>step3 (only account and website installed )
            //2=> (all set)
            $table->boolean('newsLetter')->default(true);
            $table->string('authorities');
            $table->UnsignedBigInteger('website_id')->index()->nullable();
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->string('name')->nullable();

            $table->string('email')->unique();
            $table->string('email_verification_code')->nullable();
            $table->integer('email_verified_at')->nullable();
            $table->integer('email_verification_code_sent_at')->nullable();

            $table->string('phone')->unique()->nullable();
            $table->string('phone_verification_code')->nullable();
            $table->integer('phone_verified_at')->nullable();
            $table->integer('phone_verification_code_sent_at')->nullable();

            $table->string('password');
            $table->integer('password_fails')->default(0);
            $table->string('account_unblock_code')->nullable();
            $table->integer('password_changed_at')->nullable();
            $table->string('recover_password_code')->nullable();
            $table->integer('recover_password_code_sent_at')->nullable();

            $table->string('language')->default('en');
            $table->boolean('isInvisible')->default(false);
            $table->integer('lastSeen')->nullable();
            $table->json('helpTips')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('accounts');
    }
}
