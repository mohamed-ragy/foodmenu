<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('cpanel/login.description') }}">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/deliveryAccount/login.css') }}">
    <script src="{{ asset('js/deliveryAccount/login.js') }}"></script>
    <title>{{ trans('deliveryAccount/deliveryAccount.homeTitle') }}</title>

</head>

<body>
    <div id="loginFormContainer">
        <a class="unset column alnC jstfyC hvr-tdNone pointer" href="{{ env('APP_URL') }}">
            <div class="mB5 bold fs108 taC c4">{{ trans('deliveryAccount/deliveryAccount.loginTitle1') }}</div>
            <div class="mB5 bold fs108 taC c4 mB40">{{ trans('deliveryAccount/deliveryAccount.loginTitle2') }}</div>
        </a>
        <div class="formContainer">
            <span class="mX10 fs105 mB20 bold">{{ trans('deliveryAccount/deliveryAccount.login') }}</span>
            <span id="loginMsg" class="taC cR"></span>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-delivery_accounts"></span>
                </div>
                <input class="inputText pY10" type="text" placeholder="{{ trans('deliveryAccount/deliveryAccount.loginName')  }}"  id="loginName" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close" id="email-clearVal"></span>
            </div>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-password"></span>
                </div>
                <input class="inputText pY10" type="password" placeholder="{{ trans('deliveryAccount/deliveryAccount.password') }}" id="password" autocomplete="new-password" >
                <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide"></span>
            </div>
            <button class="btn mT20" id="loginBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('deliveryAccount/deliveryAccount.login') }}</div>
            </button>
        </div>
    </div>
</body>

</html>
