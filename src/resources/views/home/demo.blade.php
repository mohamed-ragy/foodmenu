<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('home/home.homeDescription') }}">
    <link rel="stylesheet" href="/css/home/demo.css">
    <title>{{ trans('home/home.homeTitle') }}</title>
</head>
<body>
    <div id="head">
        <div id="headIconsContainer">
            <span class="ico-screen headIconScreen headIcon headIcon_selected"></span>
            <span class="ico-mobile headIconMobile headIcon"></span>
        </div>
    </div>
    <div id="previewContainer">
        <div  id="preview" class="preview_screen">
            <iframe id="iframe" allow="geolocation" src="//{{ $restaurant }}.{{ env('APP_DOMAIN') }}/en/home?t={{ $template }}" frameborder="0"></iframe>
        </div>
    </div>

</body>
<script src="/js/home/demo.js"></script>
</html>
