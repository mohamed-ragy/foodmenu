<div class="pageWrapper" id="system-page" icon="power" pageTitle="{{ trans('cpanel/cpanel.menu.system') }}" >
    <div class="pageSection pT10" id="system-websiteSwitchWindow">
        <div class="pageSectionTitle">
            <span>{{ trans('cpanel/settings/generalSettings.websiteSwitch')  }}</span>
            <span class="ico-help help-icon" helpId="84"></span>
        </div>
        <div class="websiteStatus wFC">
            <div class="websiteStatusIcon ico-power fs105"></div>
            <div class="websiteStatusTxt bold fs103 mT10"></div>
        </div>
        <label class="checkboxlabel mY20">
            <span>{{ trans('cpanel/settings/generalSettings.websiteSwitch') }}</span>
            <div class="loading mX10" id="websiteSwitchLoading"></div>
            <input id="system-websiteSwitch" type="checkbox" class="checkbox" name="checkbox">
            <span></span>
        </label>
    </div>
    <div class="w100p row alnSH jstfyS wrap">
        {{-- <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteSwitch') }}" helpId="84" windowId="system-websiteSwitchWindow" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
            <div id="" class=" column alnC jstfyC websiteStatus">
                <span class="websiteStatusIcon ico-power fs105"></span>
                <span class="websiteStatusTxt bold fs103 mT10"></span>
            </div>
            <label class="checkboxlabel mY20">
                <span>{{ trans('cpanel/settings/generalSettings.websiteSwitch') }}</span>
                <div class="loading mX10" id="websiteSwitchLoading"></div>
                <input id="system-websiteSwitch" type="checkbox" class="checkbox" name="checkbox">
                <span></span>
            </label>
        </x-content-window> --}}
        <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteUrl') }}" helpId="85" windowClass="contentWindow_50p" >
            <div class="w100p h100p">
                <x-input-text icon="ico-link" id="websiteUrlInput"  attr="readOnly" closeIcon="no"  title="{{ trans('cpanel/settings/generalSettings.websiteUrl') }}"/>
                <div class="area column alnC jstfyC">
                    <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.qrcode') }}</span>
                    <div id="website_QRcode"></div>
                    <a class="btn tdNone hvr-tdNone" id="download-website-qrcode" >{{ trans('cpanel/settings/generalSettings.downloadqr') }}</a>
                </div>
            </div>
        </x-content-window>
    </div>

    <x-content-window title="{{ trans('cpanel/settings/generalSettings.SystemSettings') }}" windowId="settings-system-systemSettings" helpId="102" noSaveId="systemSettings-noSave" windowClass="w100p">
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.orderingSystem') }}</span>
            <label class="checkboxlabel_100p" autoHelp="16">
                <span class="mX5">{{ trans('cpanel/settings/homeDelivery.useDelivery') }}</span>
                <input id="systemSettings-useDelivery" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>

            <label class="checkboxlabel_100p" autoHelp="17">
                <span class="mX5">{{ trans('cpanel/settings/orderPickup.usePickup') }}</span>
                <input id="systemSettings-usePickup" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="93">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.enableGuestOrders') }}</span>
                <input id="systemSettings-guestOrders" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="94">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.acceptDeliveryOrders24') }}</span>
                <input id="systemSettings-acceptDeliveryOrders24" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="95">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.acceptPickupOrders24') }}</span>
                <input id="systemSettings-acceptPickupOrders24" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="96">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.cancelOrder') }}</span>
                <input id="systemSettings-cancelOrder" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
        </div>
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.reviewsSystem') }}</span>
            <label class="checkboxlabel_100p" autoHelp="90">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.enableProductReviews') }}</span>
                <input id="systemSettings-productReviews" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="91">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.enableGuestReviews') }}</span>
                <input id="systemSettings-guestReviews" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="92">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.collectReviews') }}</span>
                <input id="systemSettings-collectReviews" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
        </div>
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.liveChatSystem') }}</span>
            <label class="checkboxlabel_100p" autoHelp="97">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.liveChat') }}</span>
                <input id="systemSettings-liveChat" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="216">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.guestLiveChat') }}</span>
                <input id="systemSettings-guestLiveChat" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
        </div>
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.otherSystem') }}</span>

            <label class="checkboxlabel_100p" autoHelp="212">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.fastLoading') }}</span>
                <input id="systemSettings-fastLoading" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="207">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.dineinWorkingHours') }}</span>
                <input id="systemSettings-dineinWorkingHours" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="211">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.langPopup') }}</span>
                <input id="systemSettings-langPopup" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="201">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.discountAnnouncement') }}</span>
                <input id="systemSettings-discountAnnouncement" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p" autoHelp="98">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.cookiesMsg') }}</span>
                <input id="systemSettings-cookiesMsg" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>

            <div class="numberPickerContainer_100p"  autoHelp="100">
                <span>{{ trans('cpanel/settings/generalSettings.cartLifeTime') }}</span>
                <div class="numberPickerControls">
                    <span id="systemSettings-cartLifeTimeD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue">
                        <span class="mX2" id="systemSettings-cartLifeTime"></span>
                        <span class="mX2" id="systemSettings-cartLifeTimeText"></span>
                    </span>
                    <span id="systemSettings-cartLifeTimeU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>

            <div class="numberPickerContainer_100p"  autoHelp="101">
                <span>{{ trans('cpanel/settings/generalSettings.printerWidth') }}</span>
                <div class="numberPickerControls">
                    <span id="systemSettings-printerWidthD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue">
                        <span class="mX2" id="systemSettings-printerWidth"></span>
                        <span class="mX2" >{{ trans('cpanel/settings/generalSettings.printerWidthmm') }}</span>
                    </span>
                    <span id="systemSettings-printerWidthU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button id="systemSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="systemSettingsSaveBtn" class="btn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>
    </x-content-window>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/generalSettings.timeZone') }}" helpId="88" noSaveId="system-timeZone-noSave" windowId="system-timeZoneWindow" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
            <div class="timeZoneCard">
                <div id="system-timeZoneTimeNow" class="accountTimeZoneNow digitalWatch"></div>
            </div>

            <x-input-list id="system-timeZones" autoHelp="86" icon="ico-clock" listId="system-timeZonesList" placeholder="{{ trans('cpanel/settings/generalSettings.findTimeZone') }}"  title="{{ trans('cpanel/settings/generalSettings.timeZone') }}"/>

            <label class="checkboxlabel" autoHelp="87">
                <span class="mX5">{{ trans('cpanel/settings/generalSettings.enable12Hour') }}</span>
                <input id="system-timeZone-hour12" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <div class="btnContainer mTA">
                <button id="system-timeZoneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button id="system-timeZoneSaveBtn" class="btn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/settings/generalSettings.country') }}" helpId="89" windowId="system-countryWindow" noSaveId="system-countrynoSave" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
            <img id="system-countryFlag" class="countryFlagCard" src="" alt="" >
            <x-input-list id="system-countries" icon="ico-flag" listId="system-countriesList" placeholder="{{ trans('cpanel/settings/generalSettings.findCountry') }}" title="{{ trans('cpanel/settings/generalSettings.country') }}"/>
            <div class="btnContainer mTA" >
                <button id="system-countryCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button id="system-countrySaveBtn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                </button>
            </div>
        </x-content-window>
    </div>

    <x-content-window title="{{ trans('cpanel/settings/generalSettings.privacyPolicy') }}" helpId="246" noSaveId="system-privacyPolicyNoSave" windowClass="w100p authority_master" windowId="settings-system-privacyPolicyWindow">

        <x-textarea id="system_enPrivacyPolicy" iconFlag="USA" containerClass="languageInput_en" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
        <x-textarea id="system_frPrivacyPolicy" iconFlag="FRA" containerClass="languageInput_fr" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
        <x-textarea id="system_dePrivacyPolicy" iconFlag="DEU" containerClass="languageInput_de" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
        <x-textarea id="system_itPrivacyPolicy" iconFlag="ITA" containerClass="languageInput_it" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
        <x-textarea id="system_esPrivacyPolicy" iconFlag="ESP" containerClass="languageInput_es" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
        <x-textarea id="system_arPrivacyPolicy" iconFlag="EGY" containerClass="languageInput_ar" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
        <x-textarea id="system_ruPrivacyPolicy" iconFlag="RUS" containerClass="languageInput_ru" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
        <x-textarea id="system_uaPrivacyPolicy" iconFlag="UKR" containerClass="languageInput_ua" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
        <x-textarea id="system_egPrivacyPolicy" iconFlag="CLF" containerClass="languageInput_eg" maxLength="20000" title="{{ trans('cpanel/settings/generalSettings.privacyPolicy').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>
        <div class="btnContainer">
            <button id="system-privacyPolicyCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="system-privacyPolicySaveBtn" class="btn">
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                <span class="btnLoading"></span>
            </button>
        </div>
    </x-content-window>


    <x-content-window title="{{ trans('cpanel/settings/generalSettings.deleteOrdersAndStatistics') }}" windowId="settings-system-deleteOrdersStatisticsWindow"  helpId="150" windowClass="authority_master w100p">
        <div class="column alnC jstfyC cO mY20">
            <span class="ico-warning fs2 mB10"></span>
            <span class="fs102 taC">{{ trans('cpanel/settings/generalSettings.deleteOrdersAndStatisticsText') }}</span>
        </div>
        <div class="column alnC jstfyC wFC mA alnsC mY20">
            <x-input-text id="deleteOrdersAndStatistics-password" icon="ico-password" type="password" placeholder="{{ trans('cpanel/settings/generalSettings.password') }}" />
            <button id="deleteOrdersAndStatistics-btn" class="btn btn-delete">
                <span class="btnTxt">{{ trans('cpanel/settings/generalSettings.deleteMyData') }}</span>
                <span class="btnLoading"></span>
            </button>
        </div>
    </x-content-window>
</div>
