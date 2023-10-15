<!DOCTYPE html>
<html lang="en">
<head>

    <meta name="csrf-token" content="{!! csrf_token() !!}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('deliveryAccount/deliveryAccount.homeDescription') }}">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/deliveryAccount/style.css') }}">
    <script src="{{ asset('js/deliveryAccount/script.js') }}"></script>
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
            <div class="ordersContainer none" id="ordersContainer_loading">
            </div>
            <div class="ordersContainer none" id="ordersContainer">
            </div>
    </div>
    {{-- <div id="deliveryAccount-nav">
        <span>{{ Auth()->guard('delivery')->user()->deliveryName }}</span>
        <div id="logoutAndLang">
            <img id="langFlag" class="langFlag" />
            <div id="langs" >
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/USA.png" lang="en"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/EGY.png" lang="ar"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/ITA.png" lang="it"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/DEU.png" lang="de"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/FRA.png" lang="fr"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/ESP.png" lang="es"/>
            <img class="langFlag langFlagSelect" style="margin:.5em;" src="/storage/imgs/flags/UKR.png" lang="ua"/>

            </div>
            <div style="margin:0 .5em;">|</div>
            <form action="{{ route('delivery.logout') }}" method="post">
                @csrf
                <button id="logoutButton" type="submit">Logout</button>
            </form>
        </div>

    </div>
    <div id="deliveryAccount-body">
        <span id="deliveryAccount-noOrders" style="display:none;">{{ trans('deliveryAccount/deliveryAccount.noOrders') }}</span>
        <button class="btn" id="deliveryAccount-refreshBtn">{{ trans('deliveryAccount/deliveryAccount.refresh') }}</button>
        <x-loading type="dark" size="big" id="deliveryAccount-loading" style="display:none;position: relative;"/>
        <div id="deliveryAccount-ordersContainer"></div>
    </div> --}}


    <div id="alertsContainer"></div>

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
        cashOnDelivery:"{{ trans('deliveryAccount/deliveryAccount.cashOnDelivery') }}",
        cardOnDelivery:"{{ trans('deliveryAccount/deliveryAccount.cardOnDelivery') }}",
        cashOnPickup:"{{ trans('deliveryAccount/deliveryAccount.cashOnPickup') }}",
        cardOnPickup:"{{ trans('deliveryAccount/deliveryAccount.cardOnPickup') }}",
        orderTotal:"{!! trans('deliveryAccount/deliveryAccount.orderTotal') !!}",
        noOrders:"{{ trans('deliveryAccount/deliveryAccount.noOrders') }}",
        orderNotice:"{{ trans('deliveryAccount/deliveryAccount.orderNotice') }}",
        refresh:"{{ trans('deliveryAccount/deliveryAccount.refresh') }}",
        confirm:"{{ trans('deliveryAccount/deliveryAccount.confirm') }}",
    }
    let account = {!! Auth::guard('delivery')->user() !!}
    let settings = {!! $settings !!};
</script>
</html>
