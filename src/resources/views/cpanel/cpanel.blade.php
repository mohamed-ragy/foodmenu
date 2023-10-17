<!DOCTYPE html>
    <html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="UTF-8">
    <link id="cpanelCSS" rel="stylesheet" href="{{ asset('css/cpanel/cpanel.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('home/home.homeDescription') }}">
    @if($settings->darkMode)
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colorsDark.css') }}">
    @else
    <link rel="stylesheet" href="{{ asset('css/cpanel/colorsDark.css') }}">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    @endif

    <title>{{ trans('cpanel/cpanel.public.cpanel') }} - {{ $website->domainName }}</title>
</head>
@include('cpanel.tools.loadingScreen')

<body>
    <div class="popupContainer none"></div>
    {{-- @include('cpanel.popups') --}}

    <div id="bodyContainer">
        <div id="sideMenu-Container"></div>
        <div id="cp-body">
        @include('cpanel.cpanel.nav')
            <div id="cp-container">
                <div id="bodyPage">
                    <a class="paymentFailAnn paymentFailAnn_red none" href="{{ env('BILLING_CENTER_URL') }}" target="_blank">
                        <span class="ico-warning"></span>
                        <span class="mX5" id="paymentFailAnnTxt">{{ trans('cpanel/settings/generalSettings.siteoffpaymentFail') }}</span>
                    </a>
                    <div id="pageWrapper"></div>
                    {{-- @include('cpanel.pages') --}}
                </div>
                <div id="helpWindow" class="helpWindowNormal">
                    <span id="helpWindowControls">
                        <span class="pointer ico-minimize" id="autoHelp-miniAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.minimizeAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.miniAll') }}</span></div>" ></span>
                        <span class="pointer ico-maximize" id="autoHelp-maxAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.minimizeAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.maxAll') }}</span></div>" ></span>
                        <span class="pointer ico-eraser " id="autoHelp-clearUnpinned" tooltip="<div><span>{{ trans('cpanel/cpanel.public.clearUnpinned') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.clearUnpinned') }}</span></div>" ></span>
                        <span class="pointer ico-delete" id="autoHelp-clearAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.clearAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.clearAll') }}</span></div>" ></span>
                    </span>
                    {{-- @include('cpanel.autoHelp') --}}
                </div>
            </div>
        </div>
    </div>

    {{-- @include('cpanel.cpanel.statusBar') --}}
    <div id="statusBar">{{ $website->domainName }} ({{ trans('cpanel/cpanel.public.cpanel') }})</div>


    <div id="windowsCover_popupPage"></div>
    <div id="windowsCover_autoHelp"></div>
    <div id="popupPage">
        <div id="popupPageHead">
            <span id="popupPageTitle" class=""></span>
            <span id="popupPageClose" class="ico-close" tooltip="<div><span>{{ trans('cpanel/cpanel.public.close') }}</span> <span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.CloseHotKey') }}</span></div>"></span>
        </div>
        <div id="popupPageBody">
            {{-- @include('cpanel.popupPage') --}}
        </div>
    </div>


    <div id="alertsContainer"></div>

    <audio id="alert_normal"><source src="./storage/audio/cpanelAlerts/normal.wav" type="audio/mpeg" /></audio>
    <audio id="alert_error"><source id="notificationErrorSource" src="./storage/audio/cpanelAlerts/error.wav" type="audio/mpeg" /></audio>
    <audio id="alert_success"><source src="./storage/audio/cpanelAlerts/success.wav" type="audio/mpeg" /></audio>
    <audio id="alert_warning"><source src="./storage/audio/cpanelAlerts/warning.wav" type="audio/mpeg" /></audio>
    <audio id="newChatMsgSound"><source id="newChatMsgSoundSource" src="./storage/audio/cpanelAlerts/chat.wav" type="audio/mpeg" /></audio>

    <div id="website_QRcodeDownload"></div>
    <div id="tooltipDiv"></div>
    <div id="statisticsPopupDiv"></div>
    <div id="printDiv"></div>
    <div id="imgs-imgPreview" class="none">
        <div id="imgs-imgPreviewBtns">
            <div class="row alnC jstfyC">
                <span tooltip="" download="" class="ico-info imgs-imgPreviewInfo imgs-imgPreviewBtn"></span>
                <a tooltip="{{ trans('cpanel/cpanel.public.download') }}" download="" class="ico-download imgs-imgPreviewDownload imgs-imgPreviewBtn tdNone hvr-tdNone"></a>
                <span tooltip="{{ trans('cpanel/cpanel.public.copy') }}" class="ico-copy copyImageLink imgs-imgPreviewBtn" imgId=""></span>
                <span tooltip="{{ trans('cpanel/cpanel.public.zoomIn') }}" class="ico-zoomIn imgs-imgPreviewBtn" imgId="" id="imgs-imgPreviewZoomIn"></span>
                <span tooltip="{{ trans('cpanel/cpanel.public.zoomOut') }}" class="ico-zoomOut imgs-imgPreviewBtn" imgId="" id="imgs-imgPreviewZoomOut"></span>
            </div>
            <div class="row alnC jstfyC">
                <span tooltip="{{ trans('cpanel/cpanel.public.close') }}" class="ico-close fs103 imgs-imgPreviewBtn" id="imgs-imgPreviewClose"></span>
            </div>
        </div>
        <div class="ico-left imgPreviewArrow" id="imgs-imgPreviewPrev" ></div>
        <img src="" class="imgs-imgPreviewimg" alt="" zoomLvl="1">
        <div class="ico-right imgPreviewArrow" id="imgs-imgPreviewNext" ></div>
    </div>
    <div id="changeOrderStatus"></div>
    <div id="changeOrderStatusGiveToDelivery"></div>
    <div id="changeOrderType"></div>
    <div id="changeItemSelection"></div>
    <div id="popupId" class="none"></div>
    <div id="liveChatBoxMenu" class="liveChatBoxMenu none"></div>

    <div id="galleryImgOnMove"></div>
    <div id="slideShowImgOnMove"></div>
    <div id="categoryCardOnMove"></div>
    <div id="manageProductCardOnMove"></div>
    <div id="productOptionCardOnMove"></div>
    <div id="selectionCardOnMove"></div>
</body>
<form method="post" id="logoutForm" action="{{ route('account.logout') }}">
    @csrf
</form>
@include('cpanel.cpanel.objects')
<script id="cpanelJS" src="{{ asset('js/cpanel/cpanel.js') }}"></script>
</html>
