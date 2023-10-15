@extends('foodmenu.layout')
@section('title'){!! trans('foodmenu/register.title') !!}@endsection
@section('description'){{ trans('foodmenu/register.description') }}@endsection
@section('body')
<div id="registerPageContainer">

    <div class="registerFormContainer">
        <div class="bold fs205 mT40 mB40 getStartedText">{{ trans('foodmenu/register.getStarted2') }}</div>
        <div class="registerPrograssContainer">
            <div class="registerPrograssBar"><div class="registerPrograssBar_val"></div></div>
            <div class="stepContainer" step="1" >
                <div class="ico-user stepIcon"></div>
                <div class="stepTxt">{{ trans('foodmenu/register.createAccount') }}</div>
                <div class="ico-check stepTxtCheck"></div>
            </div>
            <div class="stepContainer" step="2" >
                <div class="ico-templates stepIcon"></div>
                <div class="stepTxt">{{ trans('foodmenu/register.installWebsite') }}</div>
                <div class="ico-check stepTxtCheck"></div>
            </div>
            <div class="stepContainer" step="3" >
                <div class="ico-rocket stepIcon"></div>
                <div class="stepTxt">{{ trans('foodmenu/register.finishInstallation') }}</div>
                <div class="ico-check stepTxtCheck"></div>
            </div>
        </div>

        <div class="row alnC jstfyC mT50 opacity0 none getStartedBtnContainer">
            <div class="loginBtn fs103" id="getStartedBtn">
                <span>{{ trans('foodmenu/register.getStarted')  }}</span>
                <span class="ico-right"></span>
            </div>
        </div>

        @include('foodmenu.register.step1')
        @include('foodmenu.register.step2')
        @include('foodmenu.register.step3')
        @include('foodmenu.register.step4')
    </div>
</div>


@endsection
@section('footer')
<div class="tempaltePreviewContainer tempaltePreviewContainer_hidden none">
    <iframe id="tempaltePreview" class="tempaltePreview" allow="geolocation" src="" frameborder="0"></iframe>
    <div class="tempaltePreview_icons">
        <div class="tempaltePreview_icon ico-close" previewSize="close"></div>
        <div class="tempaltePreview_icon ico-mobile" previewSize="mobile"></div>
        <div class="tempaltePreview_icon ico-pc" previewSize="pc"></div>
    </div>
</div>

<script>
    let account = {!! $account !!};
    window.templates = {!! $templates !!};
    window.plans = {!! $plans !!};
    let templatesNames = {
            "pizzeria":"{!! trans('foodmenu/register.pizzeria') !!}",
            "americanDiner":"{!! trans('foodmenu/register.americanDiner') !!}",
            "casualDining":"{!! trans('foodmenu/register.casualDining') !!}",
            "fineDining":"{!! trans('foodmenu/register.fineDining') !!}",
            "italian":"{!! trans('foodmenu/register.italian') !!}",
            "burgers":"{!! trans('foodmenu/register.burgers') !!}",
            "sandwiches":"{!! trans('foodmenu/register.sandwiches') !!}",
            "donuts":"{!! trans('foodmenu/register.donuts') !!}",
            "patisserie":"{!! trans('foodmenu/register.patisserie') !!}",
            "desserts":"{!! trans('foodmenu/register.desserts') !!}",
            "fastFood":"{!! trans('foodmenu/register.fastFood') !!}",
            "vegan":"{!! trans('foodmenu/register.vegan') !!}",
            "mexican":"{!! trans('foodmenu/register.mexican') !!}",
            "vegetarian":"{!! trans('foodmenu/register.vegetarian') !!}",
            "mediterranean":"{!! trans('foodmenu/register.mediterranean') !!}",
            "asian":"{!! trans('foodmenu/register.asian') !!}",
            "indian":"{!! trans('foodmenu/register.indian') !!}",
            "steakhouse":"{!! trans('foodmenu/register.steakhouse') !!}",
            "chinese":"{!! trans('foodmenu/register.chinese') !!}",
            "sushiBar":"{!! trans('foodmenu/register.sushiBar') !!}",
            "friedChicken":"{!! trans('foodmenu/register.friedChicken') !!}",
            "seafood":"{!! trans('foodmenu/register.seafood') !!}",
            "icecream":"{!! trans('foodmenu/register.icecream') !!}",
        };
    let plansTxt = {
        "small":"{!! trans('foodmenu/register.plan-small') !!}",
        "standard":"{!! trans('foodmenu/register.plan-standard') !!}",
        "large":"{!! trans('foodmenu/register.plan-large') !!}",
        "premium":"{!! trans('foodmenu/register.plan-premium') !!}",
        "perMonth":"{!! trans('foodmenu/register.perMonth') !!}",
        "perYear":"{!! trans('foodmenu/register.perYear') !!}",
        "saveMonry":"{!! trans('foodmenu/register.saveMonry') !!}",
        "bestSeller":"{!! trans('foodmenu/register.bestSeller') !!}",
        "products":"{!! trans('foodmenu/register.products') !!}",
        "categories":"{!! trans('foodmenu/register.categories') !!}",
        "productOption":"{!! trans('foodmenu/register.productOption') !!}",
        "productOptions":"{!! trans('foodmenu/register.productOptions') !!}",
        "websiteLang":"{!! trans('foodmenu/register.websiteLang') !!}",
        "websiteLangs":"{!! trans('foodmenu/register.websiteLangs') !!}",
        "promocode":"{!! trans('foodmenu/register.promocode') !!}",
        "promocodes":"{!! trans('foodmenu/register.promocodes') !!}",
        "subAccount":"{!! trans('foodmenu/register.subAccount') !!}",
        "subAccounts":"{!! trans('foodmenu/register.subAccounts') !!}",
        "deliveryAccount":"{!! trans('foodmenu/register.deliveryAccount') !!}",
        "deliveryAccounts":"{!! trans('foodmenu/register.deliveryAccounts') !!}",
        "storage":"{!! trans('foodmenu/register.storage') !!}",
        "subdomain":"{!! trans('foodmenu/register.subdomain') !!}",
        "restaurantDotCom":"{!! trans('foodmenu/register.restaurantDotCom') !!}",
    };
</script>
<script src="/js/foodmenu/register.js"></script>

@endsection
