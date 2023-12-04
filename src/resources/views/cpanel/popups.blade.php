<div class="popupContainer none">
{{-- /////////////////////////slideShowimg edit///////////////////////// --}}
    <div class="popupCard popupCard-600 none"  id="slideShowImgEdit-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-image"></span><span class="mX5">{{ trans('cpanel/design/homePageSections.slideShowImgEdit') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="w100p">
                <div class="row alnC jstfyC  wFC mXA mB20 relative mT40">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard h200 w200" id="homePageSections-EditslideShowImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
                </div>

                <div id="slideShowImgInfoTitles" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgTitles') }}</span>
                    <x-input-text id="homePageSections-EditslideShowImgTitle-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
                    <x-input-text id="homePageSections-EditslideShowImgTitle-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />
                </div>
                <div id="slideShowImgInfoDescriptions" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgDescriptions') }}</span>
                    <x-textarea id="homePageSections_EditslideShowImgDes_en" containerClass="languageInput_en" iconFlag="USA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_fr" containerClass="languageInput_fr" iconFlag="FRA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_de" containerClass="languageInput_de" iconFlag="DEU" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_it" containerClass="languageInput_it" iconFlag="ITA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_es" containerClass="languageInput_es" iconFlag="ESP" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_ar" containerClass="languageInput_ar" iconFlag="EGY" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_ru" containerClass="languageInput_ru" iconFlag="RUS" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_ua" containerClass="languageInput_ua" iconFlag="UKR" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
                    <x-textarea id="homePageSections_EditslideShowImgDes_eg" containerClass="languageInput_eg" iconFlag="CLF" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '}}<span class='customLangName'></span>"></x-textarea>

                </div>
                <div id="slideShowImgInfoLinks" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgLIinks') }}</span>
                    <label class="checkboxlabel mT20">
                        <span class="mX5 taS">{{ trans('cpanel/design/homePageSections.openNewTab') }}</span>
                        <input id="homePageSections-EditslideShowImgLink-openNewTab" type="checkbox" class="checkbox" name="checkbox">
                        <span class="mX5"></span>
                    </label>
                    <x-input-text id="homePageSections-EditslideShowImgLink-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"/>
                    <x-input-text id="homePageSections-EditslideShowImgLink-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
                </div>
                <div class="btnContainer">
                    <button class="btn btn-cancel popupClose">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="homePageSections-EditslideShowImgChange" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.keepChanges') }}</button>
                </div>
            </div>
        </div>
    </div>

{{-- /////////////////////////slideShowimg add////////////////////////// --}}
    <div class="popupCard popupCard-600 none"  id="slideShowImgAdd-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-image"></span><span class="mX5">{{ trans('cpanel/design/homePageSections.addNewImageToSlideShow') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="w100p">
                <div class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.addFromProduct') }}</span>
                    <x-input-list id="homePageSections-slideShowProducts" listId="homePageSections-slideShowProductsList" icon="ico-products" placeholder="{{ trans('cpanel/design/homePageSections.findProduct') }}" />
                </div>

                <div class="row alnC jstfyC  wFC mXA mB20 relative mT40">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard h200 w200" id="homePageSections-slideShowImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
                </div>

                <div id="slideShowImgInfoTitles" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgTitles') }}</span>
                    <x-input-text id="homePageSections-slideShowImgTitle-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
                    <x-input-text id="homePageSections-slideShowImgTitle-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/design/homePageSections.slideShowTitle').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />
                </div>
                <div id="slideShowImgInfoDescriptions" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgDescriptions') }}</span>
                    <x-textarea id="homePageSections_slideShowImgDes_en" containerClass="languageInput_en" iconFlag="USA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_fr" containerClass="languageInput_fr" iconFlag="FRA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_de" containerClass="languageInput_de" iconFlag="DEU" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_it" containerClass="languageInput_it" iconFlag="ITA" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_es" containerClass="languageInput_es" iconFlag="ESP" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_ar" containerClass="languageInput_ar" iconFlag="EGY" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_ru" containerClass="languageInput_ru" iconFlag="RUS" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_ua" containerClass="languageInput_ua" iconFlag="UKR" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
                    <x-textarea id="homePageSections_slideShowImgDes_eg" containerClass="languageInput_eg" iconFlag="CLF" maxLength="200" title="{{ trans('cpanel/design/homePageSections.slideShowDes').' '.trans('cpanel/cpanel.public.in').' '}}<span class='customLangName'></span>"></x-textarea>
                </div>
                <div id="slideShowImgInfoLinks" class="area">
                    <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgLIinks') }}</span>
                    <label class="checkboxlabel mT20">
                        <span class="mX5 taS">{{ trans('cpanel/design/homePageSections.openNewTab') }}</span>
                        <input id="homePageSections-slideShowImgLink-openNewTab" type="checkbox" class="checkbox" name="checkbox">
                        <span class="mX5"></span>
                    </label>
                    <x-input-text id="homePageSections-slideShowImgLink-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"/>
                    <x-input-text id="homePageSections-slideShowImgLink-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/design/homePageSections.slideShowLink').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
                </div>

                <div class="btnContainer">
                    <button class="btn btn-cancel" id="homePageSections-slideShowImgAddBtn">{{ trans('cpanel/design/homePageSections.slideShowImgAdd') }}</button>
                </div>

            </div>
        </div>
    </div>






{{-- /////////////////////////scheduled discount alert////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="scheduledDiscountAlert-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/orders/orders.scheduledDiscountAlert') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">

        </div>
    </div>

{{-- /////////////////////////change email confirm////////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="changeEmail-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/security/email.changeEmail') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="fs102 mY10">
                <span>{{ trans('cpanel/security/email.changeEmailText') }}</span>
                <span id="changeEmailPopup-email"></span>
            </div>
            <div class="btnContainer">
                <button class="btn btn-cancel popupClose" >{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="security-changeEmail-confirm">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.yes') }}</div>
                </button>
            </div>
        </div>
    </div>
{{-- /////////////////////////change password confirm/////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="changePassword-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/security/password.changePassword') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="fs102 mY10">{{ trans('cpanel/security/password.changePasswordText-2') }}</div>
            <div class="btnContainer">
                <button class="btn btn-cancel popupClose" >{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="security-changePassword-confirm">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.yes') }}</div>
                </button>
            </div>
        </div>
    </div>
{{-- /////////////////////////create phone confirm////////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="createPhone-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/security/phone.createPhoneNumber') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="fs102 mY10">
                <span>{{ trans('cpanel/security/phone.changePhoneText6-1') }}</span>
                <span class="mX2 bold" id="security-createPhone-PhoneNumber"></span>
                <span>{{ trans('cpanel/security/phone.changePhoneText6-2') }}</span>
            </div>
            <div class="btnContainer">
                <button class="btn btn-cancel popupClose" >{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="security-createPhone-confirm">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.yes') }}</div>
                </button>
            </div>
        </div>
    </div>
{{-- /////////////////////////change email confirm////////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="changePhone-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/security/phone.changePhone') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="fs102 mY10">
                <span>{{ trans('cpanel/security/phone.changePhoneText2') }}</span>
                <span id="changePhonePopup-phone"></span>
            </div>
            <div class="btnContainer">
                <button class="btn btn-cancel popupClose" >{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="security-changePhone-confirm">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.yes') }}</div>
                </button>
            </div>
        </div>
    </div>
{{-- /////////////////////////change email confirm////////////////////// --}}
    <div class="popupCard none"  id="statistics-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-email_address fs102"></span><span class="mX5 popupTitleTxt"></span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">

        </div>
    </div>

</div>



