<header class="">
<a class="headerTitle openPage" page="home" href="/{{ $lang }}/home">
    <img src="" class="headerTitle_f" alt="">
    <span class="fs1 mT5 bold tnw">{{ trans('help/help.helpCenter') }}</span>
</a>

<div class="grow2 headerSearchContainer">
    <div class="headerSearchLeft">
        <div class="fs102 mie-5 ico-search"></div>
        <div class="searchLoading loading_s vV"></div>
    </div>
    <input type="text" class="headerSearch" placeholder="{{ trans('help/help.searhPlaceHolder') }}">
    <div class="headerSearchRight">
        <div class="headerOpenSearchBtn bold w25 h25">/</div>
    </div>
    <div class="headerSearchResultsContainer headerSearchResultsContainer_hidden">
        <div class="headerSearchResults ">

        </div>
    </div>
</div>

<div class="headerLinksContainer">
    @if (\Auth::guard('account')->check())
    <a class="loginBtn" href="{{ env('CPANEL_URL') }}">
        <span>{{ trans('help/help.controlPanel') }}</span>
        <span class="ico-right"></span>
    </a>
    @else
    <a href="{{ env('APP_URL') }}/{{ $lang }}/register" class="headerElem ">{{ trans('help/help.getStarted') }}</a>
    <a class="loginBtn" href="{{ env('CPANEL_URL') }}">
        <span>{{ trans('help/help.signin')}}</span>
        <span class="ico-right"></span>
    </a>
    @endif
</div>
<div class="headMobileNavIcon ico-menu2">

</div>
</header>
