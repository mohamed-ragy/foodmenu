<!DOCTYPE html>

<html lang="{{ request()->FoodMenuLang }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="facebook-domain-verification" content="pre9ub4x7kdutzw9kz2pxrb8w7aded" />
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="/css/home/style.css">
    <script src="/js/home/home.js"></script>
    @yield('head')
<!-- Meta Pixel Code -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1541036089749545');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1541036089749545&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->
<script>
    let route = "{{ \Request::route()->getName() }}";
    let lang = "{{ request()->FoodMenuLang }}";
</script>
    <meta name="description" content="@yield('description')">
    <title>@yield('title')</title>
</head>
<body>
    {{-- <div id="imgPreviewContainer">
        <img id="imgPreview" src="" alt="">
    </div> --}}
    <div id="nav">
        <a class="flexRowNoWrap" href="{{ env('APP_URL') }}">
            <img src="/storage/logo/logo.png" alt="" style="margin:.5em;height:2.5em;">
            <span style="font-size:1.5em;color:var(--fm-bg-1);" >{{ trans('home/home.foodmenu') }}</span>
        </a>
        <div class="show1024 ico-menu" id="mobileNavShow" style="font-size:1.25em;color:var(--fm-bg-1)"></div>
        <div class="flexRowNoWrap hide1024">
            @if (\Auth::guard('account')->check())
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/home">{{ trans('home/home.home') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/examples">{{ trans('home/home.examples') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/pricing">{{ trans('home/home.pricing') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
                <span id="navAccountDropDown" class="navElement flexRowNoWrap">
                    <span style="margin-inline-end:.25em;">{{ \Auth::guard('account')->user()->name }}</span>
                    <span style="font-size:.9em;margin-top:.2em;" class="ico-down"></span>
                </span>
                <div id="navDropDown">
                    <a class="navDropDownElement"  href="{{ env('CPANEL_URL') }}">
                        <div class="ico-dashboard" style="margin-inline-end:.5em;font-size:1.5em;"></div>
                        <div class="">{{ trans('home/home.cpanel') }}</div>
                    </a>
                    <form class="navDropDownElement " action="{{ route('home.logout') }}" method="post">
                        @csrf
                        <div class="ico-logout" style="margin-inline-end:.5em;font-size:1.5em;"></div>

                        <button class="navDropDownElement" style="all:unset;" type="submit" >{{ trans('home/home.logout') }}</button>
                    </form>
                </div>
            @else
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/home" >{{ trans('home/home.home') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/examples">{{ trans('home/home.examples') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/pricing">{{ trans('home/home.pricing') }}</a>
                <a class="navElement" href="{{ env('CPANEL_URL') }}/login">{{ trans('home/home.login') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/get-Started">{{ trans('home/home.getStarted') }}</a>
                <a class="navElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
            @endif

        </div>
    </div>

    <div id="body">
        <span class="ico-lamp bodyAnimatedIcon" style="animation-name: footerAnimatedIcon10"></span>
        <span class="ico-users bodyAnimatedIcon" style="animation-name: footerAnimatedIcon9"></span>
        <span class="ico-money bodyAnimatedIcon" style="animation-name: footerAnimatedIcon8"></span>
        <span class="ico-pickup bodyAnimatedIcon" style="animation-name: footerAnimatedIcon7"></span>
        <span class="ico-products bodyAnimatedIcon" style="animation-name: footerAnimatedIcon6"></span>
        <span class="ico-delivery bodyAnimatedIcon" style="animation-name: footerAnimatedIcon5"></span>
        <span class="ico-dineIn bodyAnimatedIcon" style="animation-name: footerAnimatedIcon4"></span>
        <span class="ico-cart bodyAnimatedIcon" style="animation-name: footerAnimatedIcon3"></span>
        <span class="ico-orders bodyAnimatedIcon" style="animation-name: footerAnimatedIcon2"></span>
        <span class="ico-statistics_and_analytics bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-accepted bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-pending bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-address bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-email_address bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-restaurant_information bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-create_new_user bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-notifications bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-plans bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-phone_number bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-design bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-images bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-share bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-placeNewOrder bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-websiteTexts bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>
        <span class="ico-websiteTexts bodyAnimatedIcon" style="animation-name:footerAnimatedIcon1; "></span>

        <div id="bodyContent">
            @yield('body')
        </div>

        <div id="footer">
            <div id="footerBg1"></div>
            <div id="footerBg2" >
                {{-- <span class="ico-lamp footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon10"></span>
                <span class="ico-users footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon9"></span>
                <span class="ico-money footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon8"></span>
                <span class="ico-pickup footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon7"></span>
                <span class="ico-products footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon6"></span>
                <span class="ico-delivery footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon5"></span>
                <span class="ico-dineIn footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon4"></span>
                <span class="ico-cart footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon3"></span>
                <span class="ico-orders footerAnimatedIcon hide1024" style="animation-name: footerAnimatedIcon2"></span>
                <span class="ico-statistics_and_analytics footerAnimatedIcon hide1024" style="animation-name:footerAnimatedIcon1; "></span> --}}
            </div>
            <div id="footerContent1">
                <div id="footerContent1-1">
                    <div style="font-size:2.5em;font-family:ChelaOne;white-space:nowrap;font-weight:100;text-align:center;margin-bottom:.5em;">{{ trans('home/home.foodmenu') }}</div>
                    <div class="flexRowNoWrap">
                        <span class="ico-facebook footerSocialMedia"></span>
                        <span class="ico-instagram footerSocialMedia"></span>
                        <span class="ico-twitter footerSocialMedia"></span>
                        <span class="ico-youtube footerSocialMedia"></span>
                    </div>
                </div>
                <div id="footerContent1-2">
                    <div class="footerContent1-2-Element">
                        <div style="font-weight:bold;margin-bottom:.25em;white-space:nowrap;">{{ trans('home/home.links') }}</div>
                        <a class="footerElementClickable" href="/{{ request()->FoodMenuLang  }}/home">{{ trans('home/home.home') }}</a>
                        <a class="footerElementClickable" href="/{{ request()->FoodMenuLang  }}/pricing">{{ trans('home/home.pricing') }}</a>
                        @if (\Auth::guard('account')->check())
                        <a class="footerElementClickable" href="{{ env('CPANEL_URL') }}">{{ trans('home/home.cpanel') }}</a>
                        @else
                        <a class="footerElementClickable" href="/{{ request()->FoodMenuLang  }}/get-Started">{{ trans('home/home.getStarted') }}</a>
                        @endif
                    </div>
                    <div class="footerContent1-2-Element">
                        <div style="font-weight:bold;margin-bottom:.25em;white-space:nowrap">{{ trans('home/home.examples') }}</div>
                        <div class="footerElementClickable">{{ trans('home/home.example1') }}</div>
                        <div class="footerElementClickable">{{ trans('home/home.example2') }}</div>
                        <div class="footerElementClickable">{{ trans('home/home.example3') }}</div>
                        <div class="footerElementClickable">{{ trans('home/home.example4') }}</div>
                        <div class="footerElementClickable">{{ trans('home/home.example5') }}</div>
                    </div>
                    <div class="footerContent1-2-Element">
                        <div style="font-weight:bold;margin-bottom:.25em;white-space:nowrap">{{ trans('home/home.support') }}</div>
                        <a class="footerElementClickable" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.helpCenter') }}</a>
                        <a class="footerElementClickable">{{ trans('home/home.serviceStatus') }}</a>
                        <a class="footerElementClickable" href="/{{ request()->FoodMenuLang  }}/help/faq">{{ trans('home/home.faq') }}</a>
                    </div>
                    <div class="footerContent1-2-Element">
                        <div style="font-weight:bold;margin-bottom:.25em;white-space:nowrap">{{ trans('home/home.contact') }}</div>

                        <a class="footerElementClickable"  href="/{{ request()->FoodMenuLang  }}/help/contact-us">{{ trans('home/home.contactUs') }}</a>
                        <a class="footerElementClickable">{{ trans('home/home.shareIdeas') }}</a>
                        <div class="footerElementClickable">{{ trans('home/home.cookieSettings') }}</div>
                    </div>
                </div>
            </div>
            <div id="footerContent2">
                <div style="font-size:.8em;margin-inline-end:1em;margin-top:1em;">© Copyright <span id="footerYear"></span> Food-Menu. All rights reserved.</div>
                <div style="margin-inline-start:1em;font-size:.9em;margin-top:1em;">
                    <a class="footerElementClickable">{{ trans('home/home.terms') }}</a> -
                    <a class="footerElementClickable">{{ trans('home/home.privacyPolicy') }}</a>
                </div>
            </div>

        </div>
    </div>
    <div id="mobileNav">
        @if (\Auth::guard('account')->check())
        <div class="flexRowNoWrap" style="margin:1em;justify-content:space-between;width:calc(100% - 2em);margin-bottom:3em;">
            <div style="font-size:1.2em;">{{ \Auth::guard('account')->user()->name }}</div>
            <div class="ico-close" id="mobileNavHide" style="font-size:1.5em;"></div>
        </div>
        <a class="MobileNavElement flexRowNoWrap" href="{{ env('CPANEL_URL') }}">{{ trans('home/home.cpanel') }}</a>
        <form class="MobileNavElement flexRowNoWrap" action="{{ route('home.logout') }}" method="post">
            @csrf
            <button style="all:unset;" type="submit" >{{ trans('home/home.logout') }}</button>
        </form>
        <div style="width:90%;border-bottom:.1em solid var(--fm-text-light);margin-bottom:1.5em;"></div>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/home">{{ trans('home/home.home') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/examples">{{ trans('home/home.examples') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/pricing">{{ trans('home/home.pricing') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
    @else
        <span class="ico-close" id="mobileNavHide" style="align-self:flex-end;font-size:1.5em;margin:1em;margin-bottom:3em;"></span>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/home">{{ trans('home/home.home') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/examples">{{ trans('home/home.examples') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/pricing">{{ trans('home/home.pricing') }}</a>
        <a class="MobileNavElement" href="{{ env('CPANEL_URL') }}/login">{{ trans('home/home.login') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/get-Started">{{ trans('home/home.getStarted') }}</a>
        <a class="MobileNavElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
    @endif
    </div>

</body>
<div id="tooltipDiv"></div>
</html>
