<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCpanelSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cpanel_settings', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('account_id')->index();
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');

            $table->boolean('guideMode')->default(true);
            $table->boolean('helpIcons')->default(true);
            $table->boolean('hotKeys')->default(true);
            $table->boolean('autoHelp')->default(true);
            $table->boolean('guideHints')->default(true);

            $table->boolean('bigSideMenu')->default(false);
            $table->boolean('statusBar')->default(true);
            $table->boolean('darkMode')->default(false);

            $table->boolean('tooltip')->default(true);
            $table->boolean('oneAlert')->default(false);
            $table->boolean('dClickConfirm')->default(true);
            $table->boolean('shareReminder')->default(false);
            $table->boolean('chatPopup')->default(true);


            $table->boolean('NewOrderAlerts')->default(true);
            $table->boolean('DeliveredOrderAlerts')->default(true);
            $table->boolean('NewUserAlerts')->default(true);
            $table->boolean('NewReviewAlerts')->default(true);
            $table->boolean('CanceledOrderAlerts')->default(true);
            $table->boolean('onlineUserAlert')->default(true);
            $table->boolean('onlineGuestAlert')->default(false);

            $table->tinyInteger('normalAlert')->default(11);
            $table->tinyInteger('errorAlert')->default(6);
            $table->tinyInteger('successAlert')->default(15);
            $table->tinyInteger('warningAlert')->default(16);
            $table->tinyInteger('newMsgAlert')->default(12);
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
        Schema::dropIfExists('cpanel_settings');
    }
}
