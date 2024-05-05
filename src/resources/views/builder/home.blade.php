
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('builder.description') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="/css/builder/builder.css">
    <link id="custom_font" href="" rel="stylesheet">

    <title>{{ trans('builder.title') }}</title>
</head>
@include('page_loading')
<body>
    <div class="popupContainer none"></div>
    <header class="none builder_header"></header>
    <div class="desktop_view">
        <div id="website" class="website_body body_color_theme">
            <div class="popup_container"></div>
            <div id="page"></div>
        </div>
        <div class="resize_mobile_view ico-drag2" tooltip=""></div>
    </div>
    <form id="imgs-uploadImgForm" enctype="multipart/form-data">
        @csrf
        <input type="file" name="designUploadImg" id="imgs-uploadImg" accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" hidden>
    </form>
    <div class="editor_popup none"></div>
    <div class="add_elem_popup none"></div>
    <div id="tooltipDiv" class=""></div>
    <div class="inputList_elems none"></div>
    <div class="color_theme_picker_themes none"></div>
    <div class="font_style_selector_elems none"></div>
    <div class="color_selector_palette_colors none"></div>
    <div class="icons_browser"></div>
    <div id="alertsContainer"></div>
    <audio id="alert_normal"><source src="./storage/audio/cpanelAlerts/normal.wav" type="audio/mpeg" /></audio>
    <audio id="alert_error"><source id="notificationErrorSource" src="./storage/audio/cpanelAlerts/error.wav" type="audio/mpeg" /></audio>
    <audio id="alert_success"><source src="./storage/audio/cpanelAlerts/success.wav" type="audio/mpeg" /></audio>
    <audio id="alert_warning"><source src="./storage/audio/cpanelAlerts/warning.wav" type="audio/mpeg" /></audio>
    <audio id="newChatMsgSound"><source id="newChatMsgSoundSource" src="./storage/audio/cpanelAlerts/chat.wav" type="audio/mpeg" /></audio>

</body>

<script src="/js/builder/builder.js"></script>
</html>
