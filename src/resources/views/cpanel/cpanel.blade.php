<!DOCTYPE html>
    <html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="UTF-8">
    <link id="cpanelCSS" rel="stylesheet" href="{{ asset('css/cpanel/cpanel.css?v=1') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('foodmenu/home.descriptions.home') }}">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <title></title>
</head>

<div class="bgc-c1 fixed w100p h100p" id="cpanelLoading"><img id="cpanelLoading_img" src="./storage/logo/logo.png" alt=""><div></div><div></div><div></div><div></div></div>

<body>
    <div class="popupContainer none"></div>
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
                </div>
                <div id="helpWindow" class="helpWindowNormal">
                    <div id="helpWindowControls">
                        <span class="pointer ico-minimize" id="autoHelp-miniAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.minimizeAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.miniAll') }}</span></div>" ></span>
                        <span class="pointer ico-maximize" id="autoHelp-maxAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.minimizeAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.maxAll') }}</span></div>" ></span>
                        <span class="pointer ico-eraser " id="autoHelp-clearUnpinned" tooltip="<div><span>{{ trans('cpanel/cpanel.public.clearUnpinned') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.clearUnpinned') }}</span></div>" ></span>
                        <span class="pointer ico-delete" id="autoHelp-clearAll" tooltip="<div><span>{{ trans('cpanel/cpanel.public.clearAll') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.clearAll') }}</span></div>" ></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="statusBar"></div>


    <div id="windowsCover_autoHelp"></div>

    <div id="windowsCover_popupPage"></div>

    <div id="popupPage">
        <div id="popupPageHead">
            <span id="popupPageTitle" class=""></span>
            <span id="popupPageClose" class="ico-close" tooltip="<div><span>{{ trans('cpanel/cpanel.public.close') }}</span> <span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.CloseHotKey') }}</span></div>"></span>
        </div>
        <div id="popupPageBody"></div>
    </div>


    <form id="imgs-uploadImgForm" enctype="multipart/form-data">
        @csrf
        <input type="file" name="designUploadImg" id="imgs-uploadImg" accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" hidden>
    </form>

    <div id="alertsContainer"></div>

    <audio id="alert_normal"><source src="./storage/audio/cpanelAlerts/normal.wav" type="audio/mpeg" /></audio>
    <audio id="alert_error"><source id="notificationErrorSource" src="./storage/audio/cpanelAlerts/error.wav" type="audio/mpeg" /></audio>
    <audio id="alert_success"><source src="./storage/audio/cpanelAlerts/success.wav" type="audio/mpeg" /></audio>
    <audio id="alert_warning"><source src="./storage/audio/cpanelAlerts/warning.wav" type="audio/mpeg" /></audio>
    <audio id="newChatMsgSound"><source id="newChatMsgSoundSource" src="./storage/audio/cpanelAlerts/chat.wav" type="audio/mpeg" /></audio>

    <div id="tooltipDiv"></div>
    <div id="popupId" class="none"></div>
    <div id="liveChatBoxMenu" class="liveChatBoxMenu none"></div>
    <div id="onMove" class=""></div>
    <div id="website_QRcodeDownload"></div>
    <div id="statisticspopupDiv"></div>
    <div id="printDiv"></div>
    <div id="imgs-imgPreview" class="none">
        <div id="imgs-imgPreviewBtns">
            <div class="row alnC jstfyC vH imgs-imgPreveiwBtnsLeft">
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
        <img src="" class="imgs-imgPreviewimg none" alt="" zoomLvl="1">
        <div class="imgPreviewLoading"></div>
    </div>
    <div id="changeOrderStatus" class="none"></div>
    <div id="changeOrderType"  class="none"></div>
    <div id="changeItemSelection" class="none"></div>
</body>
<form method="post" id="logoutForm" action="{{ route('account.logout') }}">
    @csrf
</form>
<script id="cpanelJS" src="{{ asset('js/cpanel/cpanel.js?v=1') }}"></script>
</html>
