<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('foodmenu/home.descriptions.home') }}">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="{{ asset('css/cpanel/login.css?v=1') }}">
    <title>{{ trans('cpanel/login.title') }}</title>
</head>

<body>

    <div class="imgContainer" style="background-image:url('/storage/imgs/cpanel/login/{{ $img }}.webp')">
        <div class="imgCover"></div>
        <div class="imgTxtContaienr">
            <div class="imgTxtTitle">{{ $solution['title'] }}</div>
            <div class="imgTxt">{{ $solution['description'] }}</div>
        </div>
    </div>

    <div class="loginFormsContainerC">
        <div id="loginFormsContainer" class="loginFormsContainer"></div>
    </div>

</body>
<div id="tooltipDiv"></div>
<script>window.texts = {!! collect(trans('cpanel/login.text')) !!}</script>
<script src="{{ asset('js/cpanel/login.js?v=1') }}"></script>
</html>
