<div class="pageWrapper" id="languages-page">
    <input type="hidden" id="languages-title" value="{{ trans('cpanel/cpanel.menu.languages') }}" icon="language">

    <x-content-window title="{{ trans('cpanel/settings/lang.websiteLangs') }}" helpId="59" noSaveId="lang-websiteLangsNoSave" windowClass=" authority_4 contentWindow_100p" >
        <div class="area" autoHelp="56">
            <span class="areaTitle">{{ trans('cpanel/settings/lang.selectWebsiteLangs') }}</span>
            <div class="row wrap alnC jstfyS w100p" id="langs-websiteLangsContainer"></div>
        </div>
        <div class="area" autoHelp="57">
            <span class="areaTitle">{{ trans('cpanel/settings/lang.setDefaultLang') }}</span>
            <div class="row wrap alnC jstfyS w100p" id="langs-defaultWebsiteLangsContainer"></div>
        </div>
        <div class="area" autoHelp="58">
            <span class="areaTitle">{{ trans('cpanel/settings/lang.setReceiptLang') }}</span>
            <div class="row wrap alnC jstfyS w100p" id="langs-receiptLangContainer"></div>
        </div>
        <div class="btnContainer">
            <button id="lang-websiteLangsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="lang-websiteLangsSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>
    </x-content-window>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/lang.customLangOptions') }}" helpId="64"  noSaveId="lang-customLanguageNoSave" windowClass=" authority_4 contentWindow_50p" contentClass="column alnC jstfyC h100p" >


            <x-input-text type="text" id="lang-customLanguageName" icon="ico-websiteTexts" autoHelp="60" placeholder="{{ trans('cpanel/settings/lang.customLangName') }}" />

            <x-input-text type="text" id="lang-customLanguageCode" icon="ico-websiteTexts" autoHelp="61" placeholder="{{ trans('cpanel/settings/lang.customLangCode') }}" maxlength="2" />

            <x-input-list id="lang-customLanguageFlag" listId="lang-customLanguageFlag-list" icon="ico-flag" autoHelp="62" placeholder="{{ trans('cpanel/settings/lang.customLangFlag') }}" />

            <label class="checkboxlabel" autoHelp="63">
                <span class="mX5">{{ trans('cpanel/settings/lang.customLangdirectionRTL') }}</span>
                <input id="lang-customLangDirection" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>

            <div class="btnContainer">
                <button id="lang-customLanguageCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button id="lang-customLanguageSaveBtn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                </button>
            </div>

        </x-content-window>
        <x-content-window title="{{ trans('cpanel/settings/lang.LangTexts') }}" helpId="65"  windowClass="authority_4 contentWindow_50p"  contentClass="column alnC jstfyC h100p"  windowId="settings-language-langTextsWindow">
            <div class="row wrap alnC jstfyC w100p" id="lang-EditLangTextContainer"></div>
        </x-content-window>
    </div>
        {{-- <x-content-window title="{{ trans('cpanel/settings/lang.cpanelLang') }}" windowClass="contentWindow_50p"  contentClass="column alnC jstfyC h100p"  helpId="69">
            <div class="tipsContainer" >
                <span class="tipsContainerTitle">{{ trans('cpanel/settings/lang.selectCpanelLang') }}</span>
            </div>
        </x-content-window> --}}
</div>
