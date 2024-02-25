<div class="registerForm none"  step="2">
    <div class="column alnS jstfyS alnsS">
        <div class="row alnBL jstfyS mB30">
            <div class="ico-templates fs104 mie-10"></div>
            <div class="fs105 bold taS">{{ trans('foodmenu/register.installWebsite') }}</div>
        </div>
        <div class="fs09 mxw400 taS">{{ trans('foodmenu/register.installWebsite2') }}</div>
        <div class="fs09 mxw500 taS">{{ trans('foodmenu/register.installWebsite3') }}</div>
    </div>

    <div class="w100p mT40 pT40 brdrT1">
        <div class="row alnC jstfyS alnsS mX10 ">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.domainName') }}</div>
            <div class="inputTextInfo ico-info cO">
                <div class="inputTextInfoElem w300 cO none">{{ trans('foodmenu/register.domainName2') }}</div>
            </div>
        </div>
        <div class="row alnC jstfyS wrap">
            <div class="inputTextContainer_C">
                <div class="inputTextContainer">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-shop"></span>
                    </div>
                    <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.domainName') }}" id="domainName" autocomplete="new-password" >
                    <span class="inputText-clearVal clearVal ico-close" id="domainNameClearVal"></span>
                </div>
                <div id="domainName_error" class="inputTxtError"></div>
            </div>
            <div class="mT5 mX20 row alnC jstfyC">
                <span class=" mie-5 ico-link"></span>
                <a id="domainNameLink" href="{{ env('APP_URL') }}" target="_blank">
                    <span class="m0 p0">{{ env('APP_URL_HTTP') }}</span><span class="m0 p0" id="domainNameTxt"></span><span class="m0 p0">.{{ env('APP_DOMAIN') }}</span>
                </a>
                {{-- <div class="inputTextInfo ico-info mis-5 cO">
                    <div class="inputTextInfoElem w300 cO none">{{ trans('foodmenu/register.domainName2') }}</div>
                </div> --}}
            </div>
        </div>
    </div>


    <div class="row alnS jstfyC wrap w100p">
        <div class="inputTextContainer_C mX10 mT40 pT40 brdrT1">
            <div class="row alnC jstfyC mX10">
                <div class="fs102 mX5 bold">{{ trans('foodmenu/register.country') }}</div>
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.country2') }}</div>
                </div>
            </div>
            <div id="country_error" class="inputTxtError mB2"></div>
            <div id="countryContainer"></div>
            {{-- <input type="text" id="country"> --}}
            {{-- <x-input-list id="country" icon="ico-flag" containerClass="zx10 mT0" iconClass="pX10" class="pY10" listId="countriesList" placeholder="{{ trans('foodmenu/register.country') }}"/> --}}
            <img src="" class="countryImg none" id="countryImg" alt="">
        </div>
        <div class="inputTextContainer_C mX10 mT40 pT40 brdrT1">
            <div class="row alnC jstfyC mX10">
                <div class="fs102 mX5 bold">{{ trans('foodmenu/register.timeZone') }}</div>
                <div class="inputTextInfo ico-info cO">
                    <div class="inputTextInfoElem w300 none">{!! trans('foodmenu/register.timeZone2') !!}</div>
                </div>
            </div>
            <div id="timeZone_error" class="inputTxtError mB2"></div>
            <div id="timezoneContainer"></div>

            {{-- <x-input-list id="timeZone" icon="ico-clock" containerClass="zx5 mT0" iconClass="pX10" class="pY10" listId="timeZonesList" placeholder="{{ trans('foodmenu/register.timeZone') }}"/> --}}
            {{-- <input type="text" id="timeZone"> --}}
            <div class="column wrap alnC jstfyC alnsC mX10">
                <label class="checkboxlabel ">
                    <span class="mX5 taS">{{ trans('foodmenu/register.enable12Hour') }}</span>
                    <input id="timeZone-hour12" type="checkbox" class="checkbox" name="checkbox" checked>
                    <span class="mX5"></span>
                </label>
                <div id="timeZoneTimeNow" class="digitalWatch"></div>
            </div>

        </div>
    </div>

    <div class="column alnS jstfyS mT40 pT40 brdrT1 w100p">
        <div class="row alnC jstfyC mX10">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.lang') }}</div>
            <div class="inputTextInfo ico-info">
                <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.lang2') }}</div>
            </div>
        </div>
        <div id="websiteLang_error" class="inputTxtError"></div>
        <div class="row wrap alnS jstfyS mT10 mX10 langCardsContainer">
            <div class="langCard" lang="en">
                <img src="/storage/imgs/flags/USA.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.en') }}</div>
                <div class="ico-check1 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="fr">
                <img src="/storage/imgs/flags/FRA.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.fr') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="de">
                <img src="/storage/imgs/flags/DEU.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.de') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="it">
                <img src="/storage/imgs/flags/ITA.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.it') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="es">
                <img src="/storage/imgs/flags/ESP.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.es') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="ua">
                <img src="/storage/imgs/flags/UKR.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.ua') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
            <div class="langCard" lang="ar">
                <img src="/storage/imgs/flags/EGY.png" class="wA h30" alt="">
                <div class="grow2 taS mX5">{{ trans('foodmenu/register.ar') }}</div>
                <div class="ico-check0 langCardCheck mX5"></div>
            </div>
        </div>
    </div>

    <div class="column alnS jstfyS mT40 pT40 brdrT1 w100p">
        <div class="row alnC jstfyC mX10">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.template') }}</div>
            <div class="inputTextInfo ico-info">
                <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.template2') }}</div>
            </div>
        </div>
        <div class="m10 row alnC jstfyC w100p-20">
            <input type="text" id="templatesInputList">
            {{-- <x-input-list id="templatesInputList" listId="templatesList" containerClass="zx5" iconClass="pX10" class="pY10" icon="ico-templates" placeholder="{{ trans('foodmenu/register.templatesPlaceHolder')  }}" /> --}}
        </div>
        <div id="template_error" class="inputTxtError fs1"></div>
        <div class="w100p row alnC jstfyC ofH">
            <div class="ico-left templateContainerArrow" action="prev"></div>
            <div class="templatesContainer"></div>
            <div class="ico-right templateContainerArrow" action="next"></div>

        </div>
    </div>

    <div class="column alnS jstfyS mT40 pT40 brdrT1 w100p">
        <div class="row alnC jstfyC mX10 mB20">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.restaurantInfo') }}</div>
            <div class="inputTextInfo ico-info">
                <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantInfo2') }}</div>
            </div>
        </div>

        <div class="row alnC jstfyS w100p">
            <div class="inputTextContainer">
                <div class="inputTextIcon pX10" >
                    <span class="ico-edit"></span>
                </div>
                <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.restaurantName') }}" id="restaurantName" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close"></span>
            </div>
            {{-- <div class="row alnC jstfyC mX5">
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantName2') }}</div>
                </div>
            </div> --}}
        </div>

        <div class="row alnC jstfyS w100p">
            {{-- <x-textarea  id="restaurantDescription" icon="ico-description" title="{{ trans('foodmenu/register.restaurantDescription') }}" maxLength="150" /> --}}
            <div class="row alnC jstfyC mX5">
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantDescription2') }}</div>
                </div>
            </div>
        </div>

        <div class="row alnC jstfyS w100p">
            <div class="inputTextContainer">
                <div class="inputTextIcon pX10" >
                    <span class="ico-money"></span>
                </div>
                <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.currencySymbol') }}" id="currencySymbol" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close"></span>
            </div>
            <div class="row alnC jstfyC mX5">
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.currencySymbol2') }}</div>
                </div>
            </div>
        </div>

        <div class="row alnC jstfyS w100p">
            <div class="inputTextContainer">
                <div class="inputTextIcon pX10" >
                    <span class="ico-phone_number"></span>
                </div>
                <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.restaurantPhoneNumber') }}" id="restaurantPhoneNumber" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close"></span>
            </div>
            {{-- <div class="row alnC jstfyC mX5">
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantPhoneNumber2') }}</div>
                </div>
            </div> --}}
        </div>

        <div class="row alnC jstfyS w100p">
            <div class="inputTextContainer inputTextContainer_100p">
                <div class="inputTextIcon pX10" >
                    <span class="ico-address"></span>
                </div>
                <input class="inputText grow1 pY10" type="text" placeholder="{{ trans('foodmenu/register.restaurantAddress') }}" id="restaurantAddress" autocomplete="new-password" >
                <span class="inputText-clearVal clearVal ico-close" ></span>
            </div>
            {{-- <div class="row alnC jstfyC mX5">
                <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantAddress2') }}</div>
                </div>
            </div> --}}
        </div>

        <div class="w100p-20 mX10 mT20 column alnS jstfyS">
            <div class="row alnC jstfyC mB10">
                <div class="fs102 c-placeholder mX5 ">{{ trans('foodmenu/register.restaurantLocation') }}</div>
                {{-- <div class="inputTextInfo ico-info">
                    <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.restaurantLocation2') }}</div>
                </div> --}}
            </div>
            <div class="relative w100p ofH">
                <button class="ico-gps currentLocationIcon"></button>
                <div id="restaurantLocationMap" class="w100p h250 zx1"></div>
            </div>
        </div>
    </div>

    <div class="column alnS jstfyS mT40 pT40 brdrT1 w100p">
        <div class="row alnC jstfyC mX10">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.system') }}</div>
            <div class="inputTextInfo ico-info">
                <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.system2') }}</div>
            </div>
        </div>
        <div class="row wrap alnS jstfyS mT10 mX10">
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.useDelivery') }}</span>
                <input id="useDelivery" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.usePickup') }}</span>
                <input id="usePickup" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.dineinWorkingHours') }}</span>
                <input id="dineinWorkingHours" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.guestOrders') }}</span>
                <input id="guestOrders" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.cancelOrder') }}</span>
                <input id="cancelOrder" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>

            <label class="checkboxlabel checkboxlabel_100p mT20">
                <span class="mX5 taS">{{ trans('foodmenu/register.productReviews') }}</span>
                <input id="productReviews" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.guestReviews') }}</span>
                <input id="guestReviews" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>

            <label class="checkboxlabel checkboxlabel_100p mT20">
                <span class="mX5 taS">{{ trans('foodmenu/register.liveChat') }}</span>
                <input id="liveChat" type="checkbox" class="checkbox" name="checkbox" checked>
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel checkboxlabel_100p">
                <span class="mX5 taS">{{ trans('foodmenu/register.guestLiveChat') }}</span>
                <input id="guestLiveChat" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
        </div>
    </div>

    <div class="column alnS jstfyS mT40 pT40 brdrT1 w100p">
        <div class="row alnC jstfyC mX10">
            <div class="fs102 mX5 bold">{{ trans('foodmenu/register.subscriptionPlan') }}</div>
            {{-- <div class="inputTextInfo ico-info">
                <div class="inputTextInfoElem w300 none">{{ trans('foodmenu/register.subscriptionPlan2') }}</div>
            </div> --}}
        </div>
        <div class="subscriptionPlanTxtContainer">
            <div class="subscriptionPlanTxt">
                <div class="ico-check1 cG fs101 mie-10"></div>
                <div class="fs101 bold">{{ trans('foodmenu/register.subscriptionPlanTxt3') }}</div>
            </div>
            <div class="subscriptionPlanTxt">
                <div class="ico-check1 cG fs101 mie-10"></div>
                <div class="fs101 bold">{{ trans('foodmenu/register.subscriptionPlanTxt4') }}</div>
            </div>
            <div class="subscriptionPlanTxt">
                <div class="ico-check1 cG fs101 mie-10"></div>
                <div class="fs102 bold mie-5">{{ trans('foodmenu/register.subscriptionPlanTxt1') }}</div>
                <div class="inputTextInfo cO ico-info">
                    <div class="inputTextInfoElem w300 cO none">{{ trans('foodmenu/register.subscriptionPlanTxt1-2') }}</div>
                </div>
            </div>
            <div class="subscriptionPlanTxt">
                <div class="ico-check1 cG fs101 mie-10"></div>
                <div class="fs102 bold mie-5">{{ trans('foodmenu/register.subscriptionPlanTxt2') }}</div>
                {{-- <div class="inputTextInfo cO ico-info">
                    <div class="inputTextInfoElem w300 cO none">{{ trans('foodmenu/register.subscriptionPlanTxt2-2') }}</div>
                </div> --}}
            </div>


        </div>
        <label class="checkboxlabel ofH relative alnsC bgc-c1 fs102">
            <div class="getDiscountBadge">{{ trans('foodmenu/register.discount') }}</div>
            <span class="mis-50 mX5 taS ">{!! trans('foodmenu/register.billedYearly') !!}</span>
            <input id="billedYearly" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX5"></span>
        </label>
        <div id="plans_error" class="inputTxtError fs1 mT10"></div>
        <div class="plansCards"></div>

    </div>
    <div class="btnContainer mT40">
        <button class="btn" id="step2Btn">
            <div class="btnLoading"></div>
            <div class="btnTxt">{{  trans('foodmenu/register.install') }}</div>
        </button>
    </div>

</div>

