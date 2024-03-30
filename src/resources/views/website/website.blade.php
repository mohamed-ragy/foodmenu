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
</head>
{{-- <div class="page_loading">
    <img src="{{ $logo }}" alt="">
    <div class="page_loading_title font_t">{{ $title }}</div>
    <div class="page_loading_description dont_p">{{ $description }}</div>
</div> --}}
<body>
    <div id="page">
        
    </div>
        {{-- <section>
            <div class="section">
                <div class="font_t fs2">Test test wa7ed 2tnen talata s s s</div>
                <div class="font_p fs1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

                <form action="" class="form m20">
                    <label class="input_lable">Useless input box</label>
                    <input class="input font_p w350" type="text" placeholder="">
                    <label class="input_lable">Useless input box</label>
                    <textarea class="input font_p w350" name="" id="" rows="5"></textarea>
                    <div class="row alnC jstfyC">
                        <div class="checkbox mie-5"></div>
                        <div>Forget me</div>
                    </div>
                    <button type="button" class="button1 font_p mB20">Logout</button>
                    <button type="button" class="button2 font_p">Logout</button>
                </form>

                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
                <div>7arakat</div>
            </div>

        </section> --}}
</body>
<script>
    window.website_id = "{{ $website_id }}"
    window.lang = "{{ $lang }}"
    window.title = "{{ $title }}"
    window.description = "{{ $description }}"
    window.user = {!! $user !!}
    window.guest = {!! $guest !!}
    window.route = "{{ request()->route()->getName() }}".split('.')[1];
</script>
<script src="/js/website/script.js"></script>
<script src="/storage/websites/{{ $website_id }}/script.js?v={{ $style_version }}"></script>
</html>
