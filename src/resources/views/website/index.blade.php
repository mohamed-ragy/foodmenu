<!DOCTYPE html>
<html lang="{{ $lang }}" dir={{ $website_direction }}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ $icon }}">
    <meta name="csrf-token" content="{!! csrf_token() !!}">

    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $url }}" />
    <meta property="og:title" content="{{ $title }}" />
    <meta property="og:description" content="{{ $description }}" />
    {{-- <meta property="og:image"         content="https://{!! $url.$metaImg !!}" /> --}}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="website" />

    <meta name="twitter:title" content="{{ $title }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    {{-- <meta name="twitter:image" content="https://{!! $url.$metaImg !!}" /> --}}

    <meta name="description" content="{{ $description }}">
    <title>{{ $title }}</title>
    <link rel="stylesheet" href="/storage/websites/{{ $website_id }}/style.css?v={{ $style_version }}">
    <style></style>
</head>

<body>
    <div class="loading_screen body_color_theme">
        <?php include storage_path().'/app/public/websites/'.$website_id.'/views'.'/'.$lang.'/loading_spinner.html'; ?>
        <h1>{{ $title }}</h1>
        <h3>{{ $description }}</h3>
    </div>
    <div class="website_loading body_color_theme none">
        <?php include storage_path().'/app/public/websites/'.$website_id.'/views'.'/'.$lang.'/loading_spinner.html'; ?>
    </div>
    <?php include storage_path().'/app/public/websites/'.$website_id.'/views'.'/'.$lang.'/popup_window.html'; ?>
    <?php include storage_path().'/app/public/websites/'.$website_id.'/views'.'/'.$lang.'/website_header.html'; ?>
    <div id="page">
        <?php include storage_path().'/app/public/websites/'.$website_id.'/views'.'/'.$lang.'/'.request()->route()->getName().'.html'; ?>
    </div>
</body>
<script>
    window.website_id = "{{ $website_id }}"
    window.lang = "{{ $lang }}"
    window.title = "{{ $title }}"
    window.description = "{{ $description }}"
    window.user = {!! $user !!}
    window.guest = {!! $guest !!}
    window.route = "{{ request()->route()->getName() }}".split('_')[1];
</script>
<script src="/js/website/script.js"></script>
<script src="/storage/websites/{{ $website_id }}/script/script_{{ $lang }}.js?v={{ $style_version }}"></script>
</html>
