<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ $description }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    <link rel="stylesheet" href="/css/help/help.css">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title }}</title>
</head>


    @include('page_loading')
    @include('help.tools.mobileNav')
    @include('help.tools.header')
    <nav class="nav_hidden">
        @include('help.tools.nav')
    </nav>
    <main class="">
        @include('help.pages.home')
        @include('help.pages.cat')
        @include('help.pages.article')
        <footer class="">
            @include('help.tools.footer')
        </footer>
    </main>
    <div id="tooltip"></div>
    <div class="fullScreenImgcontainer none"></div>
</body>
<script>
    let lang = "{{ $lang }}";
    let articles = {!! $tuts !!};
    let routeName = '{!! request()->route()->getName() !!}';
    let cat = "{{ $cat }}";
    let article = "{{ $article }}";
    let section = "{{ $section }}";
    let texts = {!! $texts !!};
</script>
<script src="/js/help/help.js"></script>
</html>
