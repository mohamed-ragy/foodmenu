<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mongodb_orders')->drop('orders');

        Schema::connection('mongodb_orders')->create('orders', function ($collection) {
            $collection->index('delivery_id');
            $collection->index('user_id');
            $collection->index('status');

            //status
            //0 => pending(Pending)
            //1 => received(accepted)
            //3 => withDelivery(On the way to you)
            //4 => readyToPickup(Ready for pickup)
            //8 => dineingin(Dining in)

            //5 => delivered(Delivered)
            //6 => pickedUp(Picked Up)
            //7 => dineIn(Dined in)
            //2 => canceled(Canceled)

            // ('type');
            //0 => delivery
            //1 => pickup
            //2 => dineIn

            //placed_by
            //0->account,
            //1->user,

            //delivered by
            //0->account
            //1->delivery man

            //canceledby
            //0->account
            //1->user

            //discountby
            //0->no discount
            //1->account
            //2->scheduled discount
            //3->promocode

            //payment methods
            //"cashOnDelivery"
            //"cardOnDelivery"
            //"cashOnPickup"
            //"cardOnPickup"
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
