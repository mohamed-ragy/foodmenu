<div class="pageWrapper" id="restaurant_information-page">
    <input type="hidden" id="restaurant_information-title" value="{{ trans('cpanel/cpanel.menu.restaurant_information')}}" icon="websiteInformation">

    <x-content-window title="{{ trans('cpanel/settings/generalSettings.logoAndIcon') }}" helpId="72" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p" windowId="settings-generalSettings-logoAndIcon">

        <div class="row alnSH jstfyS w100p">
            <div class="area row alnC jstfyC" autoHelp="70">
                <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.websiteIcon') }}</span>
                <div id="settings-websiteIconCard" class="row alnC jstfyC relative">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard h50 w50" id="settings-websiteIconImg" src="" alt="">
                    <div class="loading absolute" id="settings-websiteIconLoading"></div>
                </div>
            </div>

            <div class="area row alnC jstfyC" autoHelp="71">
                <span class="areaTitle">{{ trans('cpanel/settings/generalSettings.websiteLogo') }}</span>
                <div id="settings-websiteLogoCard" class="row alnC jstfyC relative">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard w100 h100" id="settings-websiteLogoImg" src="" alt="">
                    <div class="loading_L absolute" id="settings-websiteLogoLoading"></div>
                </div>
            </div>
        </div>

    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteNameTitle') }}" windowId="settings-generalSettings-websiteNameWindow" helpId="74" noSaveId="setting-websiteNameNosave" contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">
            <x-input-text id="setting-restaurantName-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
            <x-input-text id="setting-restaurantName-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
            <x-input-text id="setting-restaurantName-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
            <x-input-text id="setting-restaurantName-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
            <x-input-text id="setting-restaurantName-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
            <x-input-text id="setting-restaurantName-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
            <x-input-text id="setting-restaurantName-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
            <x-input-text id="setting-restaurantName-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
            <x-input-text id="setting-restaurantName-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/settings/generalSettings.websiteName').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>

            <div class="btnContainer mTA">
                <button class="btn btn-cancel" id="setting-restaurantName-CancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="setting-restaurantName-SaveBtn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteDescription') }}" windowId="settings-generalSettings-websiteDescriptionWindow" helpId="76" noSaveId="settings-websiteDescriptionNosave" contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">

        <x-textarea iconFlag="USA" id="settings_websiteDescription_en" containerClass="languageInput_en" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
        <x-textarea iconFlag="FRA" id="settings_websiteDescription_fr" containerClass="languageInput_fr" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
        <x-textarea iconFlag="DEU" id="settings_websiteDescription_de" containerClass="languageInput_de" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
        <x-textarea iconFlag="ITA" id="settings_websiteDescription_it" containerClass="languageInput_it" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
        <x-textarea iconFlag="ESP" id="settings_websiteDescription_es" containerClass="languageInput_es" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
        <x-textarea iconFlag="EGY" id="settings_websiteDescription_ar" containerClass="languageInput_ar" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
        <x-textarea iconFlag="RUS" id="settings_websiteDescription_ru" containerClass="languageInput_ru" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
        <x-textarea iconFlag="UKR" id="settings_websiteDescription_ua" containerClass="languageInput_ua" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
        <x-textarea iconFlag="CLF" id="settings_websiteDescription_eg" containerClass="languageInput_eg" maxLength="150" title="{{ trans('cpanel/settings/generalSettings.websiteDescription').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="settings-websiteDescriptionCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="settings-websiteDescriptionSaveBtn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.restaurantEmail') }}" helpId="206" windowId="settings-restaurantEmailWindow" noSaveId="settings-restaurantEmailNoSave" contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">
            <x-input-text id="settings-restaurantEmail"  icon="ico-email_address" value="" placeholder="{{ trans('cpanel/settings/generalSettings.restaurantEmail') }}" />
            <div class="btnContainer mTA">
                <button class="btn btn-cancel" id="settings-restaurantEmailCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="settings-restaurantEmailSaveBtn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.websitePhone') }}" windowId="settings-generalSettings-phoneNumberWindow" helpId="73" noSaveId="setting-websitePhoneNumberNoSave" contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">
            <div class="btnContainer alnC jstfyC">
                <button class="btn" id="setting-addPhoneNumberBtn">{{ trans('cpanel/settings/generalSettings.addNewPhoneNumber') }}</button>
            </div>

            <div id="setting-phoneNumbers" class="w100p"></div>

            <div class="btnContainer mTA">
                <button class="btn btn-cancel" id="setting-phoneNumberCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="setting-phoneNumberSaveBtn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteAddressTitle') }}" helpId="79" windowClass="contentWindow_100p" noSaveId="setting-websiteAddressNoSave" windowId="settings-generalSettings-websiteAdressesWindow">

        <div class="btnContainer alnC jstfyC">
            <button class="btn popupPage" popupPage="Restaurant-Location">{{ trans('cpanel/settings/generalSettings.restaurantLocation') }}</button>
        </div>

        <x-input-text class="inputText_100p" id="setting-restaurantAddress_en" containerClass="inputTextContainer_100p languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_fr" containerClass="inputTextContainer_100p languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_de" containerClass="inputTextContainer_100p languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_it" containerClass="inputTextContainer_100p languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_es" containerClass="inputTextContainer_100p languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_ar" containerClass="inputTextContainer_100p languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_ru" containerClass="inputTextContainer_100p languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"/>
        <x-input-text class="inputText_100p" id="setting-restaurantAddress_ua" containerClass="inputTextContainer_100p languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"/>
        <x-input-text class="inputText_100p inputTextCL" id="setting-restaurantAddress_eg" containerClass="inputTextContainer_100p languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/settings/generalSettings.websiteAddress').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"/>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="setting-websiteAddressCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="setting-websiteAddressSaveBtn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>

    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.currencySymbol') }}" windowId="settings-generalSettings-currencySymbolWindow" helpId="75" noSaveId="settings-currencyUnsaved"  contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">

            <x-input-text id="settings-enCurrency" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"/>
            <x-input-text id="settings-frCurrency" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"/>
            <x-input-text id="settings-deCurrency" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"/>
            <x-input-text id="settings-itCurrency" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"/>
            <x-input-text id="settings-esCurrency" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"/>
            <x-input-text id="settings-arCurrency" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"/>
            <x-input-text id="settings-ruCurrency" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"/>
            <x-input-text id="settings-uaCurrency" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"/>
            <x-input-text id="settings-egCurrency" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/settings/generalSettings.currencySymbol').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>

            <div class="btnContainer mTA">
                <button class="btn btn-cancel" id="settings-currencyCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="settings-currencySaveBtn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/settings/generalSettings.socialMediaLinks') }}" windowId="settings-generalSettings-socialMediaLinksWindow" helpId="78" noSaveId="settings-socialMediaLinksNoSave"  contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">
            <span class="cO">{{ trans('cpanel/settings/generalSettings.socialMediaLinksNotice') }}</span>

            <x-input-text id="settings-facebookLink"  icon="ico-facebook" value="" placeholder="{{ trans('cpanel/settings/generalSettings.facebookLink') }}" />
            <x-input-text id="settings-youtubeLink"  icon="ico-youtube" value="" placeholder="{{ trans('cpanel/settings/generalSettings.youtubeLink') }}" />
            <x-input-text id="settings-twitterLink"  icon="ico-twitter" value="" placeholder="{{ trans('cpanel/settings/generalSettings.twitterLink') }}" />
            <x-input-text id="settings-linkedinLink"  icon="ico-linkedin" value="" placeholder="{{ trans('cpanel/settings/generalSettings.linkedinLink') }}" />
            <x-input-text id="settings-instagramLink"  icon="ico-instagram" value="" placeholder="{{ trans('cpanel/settings/generalSettings.instagramLink') }}" />

            <div class="btnContainer mTA">
                <button class="btn btn-cancel" id="settings-socialMediaLinksCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="settings-socialMediaLinksSaveBtn">
                    <span class="btnLoading"></span>
                    <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                </button>
            </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncementTitle') }}" windowId="settings-generalSettings-announcementWindow" helpId="77" noSaveId="settings-websiteAnnouncementNoSave" contentClass="column alnC jstfyC h100p" windowClass="contentWindow_50p">

        <x-textarea iconFlag="USA" id="settings_enAnnouncement" containerClass="languageInput_en" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="FRA" id="settings_frAnnouncement" containerClass="languageInput_fr" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="DEU" id="settings_deAnnouncement" containerClass="languageInput_de" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="ITA" id="settings_itAnnouncement" containerClass="languageInput_it" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="ESP" id="settings_esAnnouncement" containerClass="languageInput_es" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="EGY" id="settings_arAnnouncement" containerClass="languageInput_ar" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="RUS" id="settings_ruAnnouncement" containerClass="languageInput_ru" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="UKR" id="settings_uaAnnouncement" containerClass="languageInput_ua" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" maxLength="500" ></x-textarea>
        <x-textarea iconFlag="CLF" id="settings_egAnnouncement" containerClass="languageInput_eg" title="{{ trans('cpanel/settings/generalSettings.websiteAnnouncement').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" maxLength="500"></x-textarea>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="settings-websiteAnnouncementCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="settings-websiteAnnouncementSaveBtn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>

    </x-content-window>


    <x-content-window title="{{ trans('cpanel/settings/generalSettings.receiptMsg') }}" windowId="settings-generalSettings-receiptMsgWindow" helpId="99" noSaveId="settings-receiptMsgNoSave" windowClass="contentWindow_100p">

        <x-textarea id="settings_enReceiptMsg" iconFlag="USA" containerClass="languageInput_en" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_frReceiptMsg" iconFlag="FRA" containerClass="languageInput_fr" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_deReceiptMsg" iconFlag="DEU" containerClass="languageInput_de" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_itReceiptMsg" iconFlag="ITA" containerClass="languageInput_it" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_esReceiptMsg" iconFlag="ESP" containerClass="languageInput_es" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_arReceiptMsg" iconFlag="EGY" containerClass="languageInput_ar" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_ruReceiptMsg" iconFlag="RUS" containerClass="languageInput_ru" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_uaReceiptMsg" iconFlag="UKR" containerClass="languageInput_ua" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" maxLength="250"></x-textarea>
        <x-textarea id="settings_egReceiptMsg" iconFlag="CLF" containerClass="languageInput_eg" title="{{ trans('cpanel/settings/generalSettings.receiptMsg').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" maxLength="250"></x-textarea>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="settings-receiptMsgCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="settings-receiptMsgSaveBtn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>

    </x-content-window>

</div>
