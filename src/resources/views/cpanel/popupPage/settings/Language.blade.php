<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="languages" value="{{ trans('cpanel/cpanel.menu.languages') }}" icon="language">

    <x-content-window noSaveId="langTxts-editLangTextNoSave" title="{{ trans('cpanel/settings/lang.EditLangText') }}" windowId="Language-Text" windowClass="contentWindow_100p" helpId="68" >
            <div class="w100p row alnE jstfySB ">

                <div class="column alnS jstfyE">
                    <div class="row alnS jstfyS w100p m10 ">
                        <img src="" id="langTxts-langImg" class="langTxtsFlag">
                        <span class="fs105 bold" id="langTxts-langName"></span>
                    </div>
                    <div class="btnContainer">
                        <button id="langTxts-editLangTextCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                        <button id="langTxts-editLangTextSaveBtn" class="btn">
                            <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                            <div class="btnLoading"></div>
                        </button>
                    </div>
                </div>


                <div class="column alnE jstfyE" autoHelp="66">
                    <div class="btnContainer">
                        <button id="langTxts-restoreDefaults" class="btn btn-warning">{{ trans('cpanel/settings/lang.restoreDefaultText') }}</button>
                    </div>
                    <div id="langTxts-restoreDefaultTextsConfirmMsg" class="cO mxw330 column alnC jstfyC none">
                        <div class="ico-warning fs2 mB10"></div>
                        <div class="taC fs101">
                            {{ trans('cpanel/settings/lang.areYouSureRestoreDefaultText1') }}
                            <span id="langTxts-restoreDefaultTextsConfirmMsgLangName"></span>
                            {{ trans('cpanel/settings/lang.areYouSureRestoreDefaultText2') }}
                        </div>
                        <div class="row alnC jstfyC mY10">
                            <button id="langTxts-restoreDefaultsCancel" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                            <button id="langTxts-restoreDefaultsConfirm" class="btn btn-warning">
                                <div class="btnTxt">{{ trans('cpanel/settings/lang.areYouSureRestoreDefaultText3') }}</div>
                                <div class="btnLoading"></div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="inputSearchContainer mT40">
                <input class="inputSearch" placeholder="{{ trans('cpanel/settings/lang.findText') }}" type="text" id="lang-editLangTextFindInput">
                <div class="inputSearchIcon ico-search"></div>
            </div>
            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.authentication') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-authenticationContainer"></div>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.orders') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-ordersContainer"></div>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.reviews') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-reviewsContainer"></div>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.liveChat') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-liveChatContainer"></div>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.other') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-otherContainer"></div>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/settings/lang.receipt') }}</span>
                <div class="languageTextEditContainer" id="editLangTxt-receiptContainer"></div>
            </div>

    </x-content-window>


</div>
