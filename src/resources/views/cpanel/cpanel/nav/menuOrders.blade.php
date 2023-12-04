<div class="navList" id="menuOrdersList">
    <span class="bold600 fs101 inter mX10 mB10">{{ trans('cpanel/cpanel.public.incompleteOrders') }}</span>
    <div id="noMenuOrders" class="fs085 mX10 mB20 none">{{ trans('cpanel/cpanel.public.noMenuOrders') }}</div>
    <div id="menuOrders-pending" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="pending">
        <div class="row alnC jstfyC">
            <span class="ico-pending mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.pending') }}</span>
        </div>
        <div class="pendingOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-accepted" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="accepted">
        <div class="row alnC jstfyC">
            <span class="ico-accepted mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.accepted') }}</span>
        </div>
        <div class="acceptedOrdersSum fs09 mX3">0</div>
    </div>


    <div id="menuOrders-our_for_delivery" class="menuOrders-element  cpPage" cpPage="incomplete_orders" openTab="out_for_delivery">
        <div class="row alnC jstfyC">
            <span class="ico-delivery mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.out_for_delivery') }}</span>
        </div>
        <div class="our_for_deliveryOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-ready_for_pickup" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="ready_for_pickup">
        <div class="row alnC jstfyC">
            <span class="ico-pickup mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.ready_for_pickup')}}</span>
        </div>
        <div class="ready_for_pickupOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-dinginin" class="menuOrders-element  cpPage" cpPage="incomplete_orders" openTab="dining_in">
        <div class="row alnC jstfyC">
            <span class="ico-dineIn mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.diningIn') }}</span>
        </div>
        <div class="dingininOrdersSum fs09 mX3">0</div>
    </div>
</div>

