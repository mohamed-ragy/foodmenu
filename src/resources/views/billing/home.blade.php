<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('billing.description') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="/css/billing/billing.css">
    <title>{!! trans('billing.title') !!}</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>
@include('page_loading')
<div class="popupContainer none ">
    <div class="popup">
        <div class="popupHead">
            <div id="popupHeadTitle" class="fs103 ellipsis p10">{{ trans('billing.confirmIdentity') }}</div>
            <div class="ico-close popupClose popupClose_style"></div>
        </div>
        <div class="popupBody">
            <div class="mB10 fs101">{{ trans('billing.enterPasswordMsg') }}</div>
            <div class="inputTextContainer w100p">
                <div class="inputTextIcon"><span class="ico-password"></span></div>
                <input type="password" class="inputText" id="confirmIdentity" placeholder="{{ trans('billing.password') }}">
            </div>
            <button class="btn w100p pY5 mB10" id="confirmIdentity_btn">
                <div class="btnLoading"></div>
                <div class="btnTxt fs101">{{ trans('billing.confirm') }}</div>
            </button>
            <div id="login-message" class=""></div>
        </div>
        <div class="payment_gateway p20 mxw300 none">
        <div class="fs105 bold mB40" id="paymentFormTitle"></div>
            <div class="loading_L mY40" id="payment-form_loading"></div>
            <form id="payment-form" class="none mxw300">
                <div id="payment-element"></div>
                <div class="row alnC jstfyE w100p mT40">
                    <button id="submit" class="btn">
                        <div class="btnTxt" id="paymentFormTxt">{{ trans('billing.confirm') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
                <div id="error-message" class="cR"></div>
            </form>
        </div>
    </div>
</div>
<body>
    <div class="mB40 fs09 row alnC jstfySB w100p">
        <div class="mB40 fs09 row alnC jstfyS">
            <img src="/storage/logo/f_green.png" class="h40 mie-5 mB2" alt="">
            <span class="bold">{{ trans('billing.billingCenter') }}</span>
        </div>
        <div id="balance"></div>
    </div>
    <div class="page page_hidden"></div>
    @include('billing.footer')
    
</body>
<div id="tooltip"></div>

<script src="/js/billing/billing.js"></script>

</html>
