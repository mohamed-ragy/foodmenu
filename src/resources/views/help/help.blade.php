<!DOCTYPE html>
<html lang="{{ $lang }}">
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

    <body>

        @include('help.tools.header')
        <div class="mobileNav mobileNav_hidden"></div>
        <nav class="nav_hidden"></nav>
        <main>
            <div class="homeSearchResultsContainer none">
                <div class="homeSearchResults homeSearchResultsContainer_hidden"></div>
            </div>
            <div class="page"></div>
            @include('help.tools.footer')
        </main>
        <div id="tooltip"></div>
        <div class="fullScreenImgcontainer none"></div>
    </body>

    <script>
        window.page = "{{ $page }}";
        window.lang = "{{ $lang }}";
        @if($page == 'category')
            window.category = "{{ $category }}"
        @elseIf($page == 'article')
            window.article = {!! $article !!};
        @elseIf($page == 'section')
            window.article = {!! $article !!};
            window.section = "{{ $section }}"
        @endif
    </script>
    <script src="/js/help/help.js"></script>

</html>
