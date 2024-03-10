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
    <link rel="stylesheet" href="{{ asset('css/deliveryAccount/login.css?v=1') }}">
    <title>{{ trans('deliveryAccount/deliveryAccount.homeTitle') }}</title>
</head>

<body>

    <div class="loginFormContainerC">
        <div class="loginFormContainer"></div>
    </div>
</body>
<script>
    window.texts = {!! collect(trans('deliveryAccount/deliveryAccount.login')) !!}
</script>
<script src="{{ asset('js/deliveryAccount/login.js?v=1') }}"></script>

</html>
