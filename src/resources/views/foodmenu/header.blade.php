<header>
    <nav class="nav_hidden">
        <div class="pX10 w100p-20 row alnC jstfySB nav_head">
            <h2 class="mY10 fs106 c4">{{ trans('foodmenu/home.header.foodmenu') }}</h2>
            <div class="ico-close fs102 pointer hideNav"></div>
        </div>
        <div class="navBody">
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamda</div>
            <div>7arakat gamdaaaaaaaaaaaaaaaaaaaaaa</div>
        </div>

    </nav>
    <div id="headerContainer">
        <div class="row alnBL jstfyC">
            <h2 class="headerFoodmenu"><a class="unset hvr-tdNone" href="{{ env('APP_URL') }}">{{ trans('foodmenu/home.header.foodmenu') }}</a></h2>
            <ul class="unset none-1024">
               <li class="unset"><a class="headerElem" href="">{{ trans('foodmenu/home.header.solutions') }}</a></li>
               <li class="unset"><a class="headerElem" href="">{{ trans('foodmenu/home.header.examples') }}</a></li>
               <li class="unset"><a class="headerElem" href="">{{ trans('foodmenu/home.header.pricing') }}</a></li>
            </ul>
        </div>
        <div class="none-1024 row alnBL jstfyC">
            @if (\Auth::guard('account')->check())
                <a href="{{ env('HELP_CENTER_URL') }}" class="headerElem ">{{ trans('foodmenu/home.header.helpCenter') }}</a>
                <a class="loginBtn" href="{{ env('CPANEL_URL') }}">
                    <span>{{ trans('foodmenu/home.header.controlPanel') }}</span>
                    <span class="ico-right"></span>
                </a>
            @else
            <a href="register" class="headerElem ">{{ trans('foodmenu/home.header.getStarted') }}</a>
            <a class="loginBtn" href="{{ env('CPANEL_URL') }}/login">
                <span>{{ trans('foodmenu/home.header.signin') }}</span>
                <span class="ico-right"></span>
            </a>
            @endif
        </div>
        <div class="none block-1024 row alnBL jstfyC">
            <div class="ico-menu2 fs105 pointer showNav"></div>
        </div>
    </div>

</header>


