<div class="navList" id="menuOrdersList">
    <span class="bold600 fs101 inter mX10 mB10">{{ trans('cpanel/cpanel.public.incompleteOrders') }}</span>
    <div id="noMenuOrders" class="fs085 mX10 mB20 none">{{ trans('cpanel/cpanel.public.noMenuOrders') }}</div>
    <div id="menuOrders-pendingOrders" class="menuOrders-element cpPage" cpPage="incomplete_orders" orderStatus="pending">
        <div class="row alnBL jstfyC">
            <span class="ico-pending mX5 fs1"></span>
            <span class="fs1">{{ trans('cpanel/orders/orders.pending') }}</span>
        </div>
        <div class="pendingOrdersSum fs101 mX3">0</div>
    </div>
    <div id="menuOrders-acceptedOrders" class="menuOrders-element cpPage" cpPage="incomplete_orders" orderStatus="accepted">
        <div class="row alnBL jstfyC">
            <span class="ico-accepted mX5 fs1"></span>
            <span class="fs1">{{ trans('cpanel/orders/orders.accepted') }}</span>
        </div>
        <div class="acceptedOrdersSum fs101 mX3">0</div>
    </div>


    <div id="menuOrders-withDeliveryOrders" class="menuOrders-element  cpPage" cpPage="incomplete_orders" orderStatus="outForDelivery">
        <div class="row alnBL jstfyC">
            <span class="ico-delivery mX5 fs101"></span>
            <span class="fs1">{{ trans('cpanel/orders/orders.withDelivery') }}</span>
        </div>
        <div class="withDeliveryOrdersSum fs101 mX3">0</div>
    </div>
    <div id="menuOrders-readyForPickupOrders" class="menuOrders-element cpPage" cpPage="incomplete_orders" orderStatus="readyForPickup">
        <div class="row alnBL jstfyC">
            <span class="ico-pickup mX5 fs1"></span>
            <span class="fs1">{{ trans('cpanel/orders/orders.readyForPickup')}}</span>
        </div>
        <div class="readyForPickupOrdersSum fs101 mX3">0</div>
    </div>
    <div id="menuOrders-diningInOrders" class="menuOrders-element  cpPage" cpPage="incomplete_orders" orderStatus="diningIn">
        <div class="row alnBL jstfyC">
            <span class="ico-dineIn mX5 fs1"></span>
            <span class="fs1">{{ trans('cpanel/orders/orders.diningIn') }}</span>
        </div>
        <div class="diningInOrdersSum fs101 mX3">0</div>
    </div>
</div>

