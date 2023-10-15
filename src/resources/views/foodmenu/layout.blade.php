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
    <link rel="stylesheet" href="/css/foodmenu/foodmenu.css">
    <title>@yield('title')</title>
    @yield('head')
</head>
<body>

    @include('foodmenu.header')

    {{-- <div id="headerCurve">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" preserveAspectRatio="none" >
            <defs>
                <linearGradient id="myGradient" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#81A4A4" />
                    <stop offset="100%" stop-color="#edf1ee" />
                </linearGradient>
            </defs>
            <path d="M -40 0 V 167 c 86 71 315 103 643 55 c 208 -24 234 -31 467 -16 V 0 Z"  fill="url('#myGradient')"></path>
        </svg>
    </div> --}}

    <main>
        @yield('body')
    </main>
@include('foodmenu.footer')
</body>
<script>
    let lang = "{{ $lang }}"
</script>
<script src="/js/foodmenu/foodmenu.js"></script>
@yield('footer')
</html>
