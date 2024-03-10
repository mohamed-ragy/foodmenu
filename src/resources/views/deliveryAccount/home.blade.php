<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('deliveryAccount/deliveryAccount.homeDescription') }}">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="{{ asset('css/deliveryAccount/style.css?v=1') }}">
    <title>{{ trans('deliveryAccount/deliveryAccount.homeTitle') }}</title>
</head>
<body>

    <div id="header">
        <div id="deliveryName" class="mX10 ellipsis"></div>
        <form action="/logout" method="post">
            @csrf
            <button class="unset">
                <a type="submit" class="mX10">logout</a>
            </button>
        </form>
    </div>
    <div id="body">
            <button id="refresh" class="btn mY20 mX10">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('deliveryAccount/deliveryAccount.refresh') }}</div>
            </button>
            <div class="ordersContainer " id="ordersContainer_loading"></div>
            <div class="ordersContainer none" id="ordersContainer"></div>
    </div>

</body>
<div id="mapContainer">
    <div id="mapClose" class="ico-close"></div>
    <div id="map"></div>
</div>
<script>
    let texts = {
        customer:"{{ trans('deliveryAccount/deliveryAccount.customer') }}",
        phoneNumber:"{{ trans('deliveryAccount/deliveryAccount.phoneNumber') }}",
        address:"{{ trans('deliveryAccount/deliveryAccount.address') }}",
        delivered:"{{ trans('deliveryAccount/deliveryAccount.delivered') }}",
        guest:"{{ trans('deliveryAccount/deliveryAccount.guest') }}",
        paymentMethod:"{{ trans('deliveryAccount/deliveryAccount.paymentMethod') }}",
        cash_on_delivery:"{{ trans('deliveryAccount/deliveryAccount.cash_on_delivery') }}",
        card_on_delivery:"{{ trans('deliveryAccount/deliveryAccount.card_on_delivery') }}",
        cash_at_restaurant:"{{ trans('deliveryAccount/deliveryAccount.cash_at_restaurant') }}",
        card_at_restaurant:"{{ trans('deliveryAccount/deliveryAccount.card_at_restaurant') }}",
        orderTotal:"{!! trans('deliveryAccount/deliveryAccount.orderTotal') !!}",
        noOrders:"{{ trans('deliveryAccount/deliveryAccount.noOrders') }}",
        orderNotice:"{{ trans('deliveryAccount/deliveryAccount.orderNotice') }}",
        refresh:"{{ trans('deliveryAccount/deliveryAccount.refresh') }}",
        confirm:"{{ trans('deliveryAccount/deliveryAccount.confirm') }}",
    }
    let account = {!! Auth::guard('delivery')->user() !!}
    let settings = {!! $settings !!};
</script>
<script src="{{ asset('js/deliveryAccount/script.js?v=1') }}"></script>

</html>
