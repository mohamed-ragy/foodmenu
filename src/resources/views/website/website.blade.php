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
    <meta property="og:image"         content="https://{!! $url.$metaImg !!}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="website" />

    <meta name="twitter:title" content="{{ $title }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    <meta name="twitter:image" content="https://{!! $url.$metaImg !!}" />

    <meta name="description" content="{{ $description }}">
    <title>{{ $title }}</title>
    {{-- link css --}}
</head>
<body>

</body>
{{-- link js --}}
</html>
