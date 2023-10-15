<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="@yield('description')">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    <link rel="stylesheet" href="/css/billing/billing.css">
    <title>@yield('title')</title>
    @yield('head')
</head>
<body>
    @yield('body')
    <div id="tooltip"></div>
    @include('billing.footer')
</body>
<script>
    let lang = "{{ $lang }}";
    let plansTxt = {
        "small":"{!! trans('foodmenu/register.plan-small') !!}",
        "standard":"{!! trans('foodmenu/register.plan-standard') !!}",
        "large":"{!! trans('foodmenu/register.plan-large') !!}",
        "premium":"{!! trans('foodmenu/register.plan-premium') !!}",
        "perMonth":"{!! trans('foodmenu/register.perMonth') !!}",
        "perYear":"{!! trans('foodmenu/register.perYear') !!}",
        "saveMonry":"{!! trans('foodmenu/register.saveMonry') !!}",
        "bestSeller":"{!! trans('foodmenu/register.bestSeller') !!}",
        "products":"{!! trans('foodmenu/register.products') !!}",
        "categories":"{!! trans('foodmenu/register.categories') !!}",
        "productOption":"{!! trans('foodmenu/register.productOption') !!}",
        "productOptions":"{!! trans('foodmenu/register.productOptions') !!}",
        "websiteLang":"{!! trans('foodmenu/register.websiteLang') !!}",
        "websiteLangs":"{!! trans('foodmenu/register.websiteLangs') !!}",
        "promocode":"{!! trans('foodmenu/register.promocode') !!}",
        "promocodes":"{!! trans('foodmenu/register.promocodes') !!}",
        "subAccount":"{!! trans('foodmenu/register.subAccount') !!}",
        "subAccounts":"{!! trans('foodmenu/register.subAccounts') !!}",
        "deliveryAccount":"{!! trans('foodmenu/register.deliveryAccount') !!}",
        "deliveryAccounts":"{!! trans('foodmenu/register.deliveryAccounts') !!}",
        "storage":"{!! trans('foodmenu/register.storage') !!}",
        "subdomain":"{!! trans('foodmenu/register.subdomain') !!}",
        "restaurantDotCom":"{!! trans('foodmenu/register.restaurantDotCom') !!}",
    };
</script>
@yield('footer')
</html>
