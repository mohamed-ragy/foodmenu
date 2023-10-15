<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('cpanel/login.description') }}">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
    <link rel="stylesheet" href="{{ asset('css/cpanel/login.css') }}">
    <script src="{{ asset('js/cpanel/login.js') }}"></script>
    <title>{{ trans('cpanel/login.title') }}</title>
</head>

<body>
    <div id="loginFormsContainer">
        <a class="unset hvr-tdNone column alnC jstfyC pointer" href="{{ env('APP_URL') }}">
            <img id="foodMenuLogo" src="{{ asset('/storage/logo/logo.png') }}" alt="" class="h100 mB10">
            <div class="mB5 bold fs108 taC c4">{{ trans('cpanel/login.controlPanelLogin1') }}</div>
            <div class="mB5 bold fs108 taC c4 mB40">{{ trans('cpanel/login.controlPanelLogin2') }}</div>
        </a>


        <div class="formContainer opacity0" id="loginContainer">
            <span class="mX10 fs105 bold">{{ trans('cpanel/login.login') }}</span>
            <span id="loginMsg" class="taC"></span>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-email_address"></span>
                </div>
                <input class="inputText pY10" type="text" placeholder="{{ trans('cpanel/login.email') }}"  id="loginEmailinput" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close" id="email-clearVal"></span>
            </div>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-password"></span>
                </div>
                <input class="inputText pY10" type="password" placeholder="{{ trans('cpanel/login.password') }}" id="loginPasswordinput" autocomplete="new-password" >
                <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide"></span>
            </div>
            <a id="forgetPassword" class="alnsE mX20 fs09 mB20">{{ trans('cpanel/login.forgetPassword') }}</a>
            <button class="btn" id="loginBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/login.login') }}</div>
            </button>
            <div class="mT20">{!! trans('cpanel/login.dontHaveAccount') !!}</div>
        </div>


        <div class="formContainer opacity0 none" id="forgetPasswordContainer">

            <div id="forgetPasswordSelectContainer" class="row alnC jstfyC td04 none opacity0">
                <div class="column alnC jstfyC pointer pie-20 mxw200 brdrR1 forgetPasswordSelect" id="forgetPasswordSelectEmail">
                    <div class="ico-email_address fs3"></div>
                    <div class="fs101 taC mX10 mY20">{{ trans('cpanel/login.recoverPasswordEmail') }}</div>
                </div>

                <div class="column alnC jstfyC pointer pis-20 mxw200 brdrL1 forgetPasswordSelect" id="forgetPasswordSelectPhone">
                    <div class="ico-phone_number fs3"></div>
                    <div class="fs101 taC mX10 mY20">{{ trans('cpanel/login.recoverPasswordSMS') }}</div>
                </div>
            </div>


            <div class="column alnC jstfyC m10 td04 none opacity0" id="forgetPasswordEmailContainer">
                <div class="m10 taC" id="recoverPassEmailMsg"></div>

                <div class="inputTextContainer mT20">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-email_address"></span>
                    </div>
                    <input class="inputText pY10" type="text" placeholder="{{ trans('cpanel/login.email') }}"  id="recoverPasswordEmailInput" autocomplete="new-password" >
                    <span class="inputText-clearVal clearVal ico-close" id="email-clearVal"></span>
                </div>
                <button class="btn" id="recoverPasswordEmailBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/login.recoverPasswordEmailBtn') }}</div>
                </button>
            </div>

            <div class="column alnC jstfyC m10 td04 none opacity0" id="forgetPasswordPhoneContainer">
                <div class="m10 taC" id="recoverPassPhoneMsg"></div>
                <div class="inputTextContainer mT20">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-phone_number"></span>
                    </div>
                    <input class="inputText pY10" type="text" placeholder="{{ trans('cpanel/login.phoneNumber') }}"  id="recoverPasswordPhoneInput" autocomplete="new-password" >
                    <span class="inputText-clearVal clearVal ico-close" id="email-clearVal"></span>
                </div>
                <button class="btn" id="recoverPasswordPhoneBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/login.recoverPasswordPhoneBtn') }}</div>
                </button>
            </div>

        </div>


        <div class="formContainer opacity0 none" id="resetPasswordEnterCodeForm">
            <div class="m10">{{ trans('cpanel/login.enterTheCode') }}</div>
            <div class="m10 taC cR none" id="resetPasswordEnterCodeMsg"></div>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-security"></span>
                </div>
                <input class="inputText w100 pY10" type="text" id="resetPasswordCode" autocomplete="new-password" >
            </div>
            <button class="btn" id="resetPasswordCodeBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/login.confirm') }}</div>
            </button>
        </div>

        <div class="formContainer opacity0 none" id="changePasswordForm">
            <div class="m10 cR taC none" id="changePasswordMsg"></div>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-password"></span>
                </div>
                <input class="inputText pY10" type="password" placeholder="{{ trans('cpanel/login.newPassword') }}" id="changePasswordPassword" autocomplete="new-password" >
                <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide" ></span>
            </div>
            <div class="inputTextContainer mT20">
                <div class="inputTextIcon pX10" >
                    <span class="ico-password"></span>
                </div>
                <input class="inputText pY10" type="password" placeholder="{{ trans('cpanel/login.newPasswordConfirm') }}" id="changePasswordConfirm" autocomplete="new-password" >
                <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide" ></span>
            </div>
            <button class="btn mT20" id="changePasswordBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/login.changePassword') }}</div>
            </button>
        </div>

        <div class="row alnC jstfyC alnsS mT20 none opacity0"  id="backToLoginForm">
            <span class="ico-left mie-5 cG"></span>
            <a class="">{!! trans('cpanel/login.backToLogin') !!}</a>
        </div>

        <div class="formContainer cR opacity0 none" id="errorMsg">
            <div class="ico-warning fs2 m10"></div>
            <div class="m10 fs102 taC" id="errorMsgTxt"></div>

        </div>
    </div>
    <div id="tooltipDiv"></div>
</body>
</html>
