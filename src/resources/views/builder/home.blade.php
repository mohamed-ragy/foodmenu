
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
    <title>{{ trans('builder.title') }}</title>
</head>
@include('page_loading')
<body>
    <div class="popupContainer none"></div>
    <header class="none"></header>
    <div id="website" class="website_body body_color_theme">
        <section class="section">
            <div class="font_t fs2">Test test wa7ed 2tnen talata</div>
            <div class="font_p fs1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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
        </section>
    </div>


    <div class="editor_popup none"></div>
    <div id="tooltipDiv" class="none"></div>
    <div class="color_theme_picker_themes none"></div>
    <div id="alertsContainer"></div>
    <audio id="alert_normal"><source src="./storage/audio/cpanelAlerts/normal.wav" type="audio/mpeg" /></audio>
    <audio id="alert_error"><source id="notificationErrorSource" src="./storage/audio/cpanelAlerts/error.wav" type="audio/mpeg" /></audio>
    <audio id="alert_success"><source src="./storage/audio/cpanelAlerts/success.wav" type="audio/mpeg" /></audio>
    <audio id="alert_warning"><source src="./storage/audio/cpanelAlerts/warning.wav" type="audio/mpeg" /></audio>
    <audio id="newChatMsgSound"><source id="newChatMsgSoundSource" src="./storage/audio/cpanelAlerts/chat.wav" type="audio/mpeg" /></audio>
</body>
<script>
    window.template_id = "{{ $template_id }}";
</script>
<script src="/js/builder/builder.js"></script>

</html>
