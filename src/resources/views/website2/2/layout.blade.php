<!DOCTYPE html>
@if ($lang == 'ar' || $lang == 'eg'  && $website->customLang_rtl)
<html lang="ar" dir="rtl" style="direction: rtl">
@else
<html lang="{{ $lang ?? 'en' }}" dir="ltr">
@endif
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ $websiteIcon }}">
    <meta name="csrf-token" content="{!! csrf_token() !!}">

    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ str_replace('https://','',Request::url() ) }}" />
    <meta property="og:title" content="{{ $title }}" />
    <meta property="og:description" content="{{ $description }}" />
    <meta property="og:image"         content="https://{!! $website->url.$metaImg !!}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="website" />

    <meta name="twitter:title" content="{{ $title }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    <meta name="twitter:image" content="https://{!! $website->url.$metaImg !!}">

    <meta name="description" content="{{ $description }}">
    <title>{{ $title }}</title>

    <link rel="stylesheet" href="/css/website/{{ $website->templateData['view'] }}/style.css">
</head>
@if(!$website->fastLoading)
<div id="websiteLoading" style="z-index: 10000;background-color:white">
    <div class="websiteloading">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div style="text-align:center;font-size: 3em;font-weight:bold;maring:5px 10px;font-family:var(--font2)">{{ $title }}</div>
    <div style="max-width:400px;margin:5px 10px;text-align:center">{{ $description }}</div>
</div>
@endif
<body>
    <img class="addToCartAnimation none" />
    <div class="cart-changeSelection none"></div>
    <div id="liveChat">
        @include('website.'.$website->templateData['view'] .'.liveChat')
    </div>
    <div class="tooltipPopup tooltipPopupHidden"></div>
    <audio id="newChatMsgSound">
        <source id="newChatMsgSoundSource" src="/storage/audio/pop-alert.mp3" type="audio/mpeg" />
    </audio>
    @include('website.'.$website->templateData['view'] .'.popup')
    @include('website.'.$website->templateData['view'] .'.nav')
    <div id="body">
        @include('website.'.$website->templateData['view'] .'.home')
        @include('website.'.$website->templateData['view'] .'.category')
        @include('website.'.$website->templateData['view'] .'.allProducts')
        @include('website.'.$website->templateData['view'] .'.product')
        @include('website.'.$website->templateData['view'] .'.privacypolicy')
        @include('website.'.$website->templateData['view'] .'.aboutus')
        @include('website.'.$website->templateData['view'] .'.profile')
        @include('website.'.$website->templateData['view'] .'.footer')
    </div>
</body>

<script>
    let website = {!! $website !!};let routeName = '{!! request()->route()->getName() !!}';let lang = "{{ $lang }}";let urlLang = "{{ $urlLang }}";let imgs = {!! $imgs !!};let websiteIcon = "{{ $websiteIcon }}";let websiteLogo = "{{ $websiteLogo }}";let texts = [];
    let customersReviews = {!! $customersReviews !!};
    @if (request()->route()->getName()  == 'website.category')
        let pageCategoryId = {!! $pageCategoryId !!}
    @endif
    @if (request()->route()->getName()  == 'website.product')
        let pageProductId = {!! $pageProductId !!}
    @endif
    @if (auth()->guard('user')->check())
        let loginCheck = true;
        let user = {id:"{{ Auth::guard('user')->user()->id ?? '' }}",email:"{{ Auth::guard('user')->user()->email ?? ''}}",name:"{{ Auth::guard('user')->user()->name ?? ''}}",address:`{{ Auth::guard('user')->user()->address ?? ''}}`,phoneNumber:"{{ Auth::guard('user')->user()->phoneNumber ?? ''}}", lat : {{ Auth::guard('user')->user()->lat ?? 0 }},lng: {{ Auth::guard('user')->user()->lng ?? 0}},cart:`{!! Auth::guard('user')->user()->cart !!}`};
    @else
        let loginCheck = false;
        let user = {id:"{{ Auth::guard('guest')->user()->id }}",guest:"{{ Auth::guard('guest')->user()->guest }}",email:"",name:"{{ Auth::guard('user')->user()->id ?? ''}}",address:"" ,phoneNumber:"", lat : 0,lng :0};
    @endif
</script>
<script src="/js/website/{{ $website->templateData['view']  }}/script.js"></script>
</html>
