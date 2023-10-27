<div class="popupContainer none">
{{-- /////////////////////////share popup/////////////////////////////// --}}
    <div class="popupCard popupCard-800 none"  id="share-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-share"></span><span class="mX5">{{ trans('cpanel/cpanel.public.share') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <input type="hidden" id="share-inputHidden">
            <div id="share-imgNameContainer">
                <img src="" id="share-img" alt="">
                <div id="share-name"></div>
            </div>
            <div class="w100p row wrap alnSH jstfyC">
                <div class="area mxw330">
                    <span class="areaTitle">{{ trans('cpanel/cpanel.public.selectShareLang') }}</span>
                    <div class="row column w100p alnC jstfyC">
                        <div lang="en" class="sharelangicon languageInput_en">
                            <img src="{{ asset('/storage/imgs/flags/USA.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.en') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="ar" class="sharelangicon languageInput_ar">
                            <img src="{{ asset('/storage/imgs/flags/EGY.png') }}" alt="" class="sharelangiconImg" >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.ar') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="eg" class="sharelangicon languageInput_eg">
                            <img src="" alt="" class="sharelangiconImg customLangFlag" >
                            <span class="grow2 fs-102 mX10 customLangName" ></span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="fr" class="sharelangicon languageInput_fr">
                            <img src="{{ asset('/storage/imgs/flags/FRA.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.fr') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="es" class="sharelangicon languageInput_es">
                            <img src="{{ asset('/storage/imgs/flags/ESP.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.es') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="it" class="sharelangicon languageInput_it">
                            <img src="{{ asset('/storage/imgs/flags/ITA.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.it') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="de" class="sharelangicon languageInput_de">
                            <img src="{{ asset('/storage/imgs/flags/DEU.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.de') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="ru" class="sharelangicon languageInput_ru">
                            <img src="{{ asset('/storage/imgs/flags/RUS.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.ru') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>

                        <div lang="ua" class="sharelangicon languageInput_ua">
                            <img src="{{ asset('/storage/imgs/flags/UKR.png') }}" alt="" class="sharelangiconImg " >
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.ua') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                    </div>
                </div>
                <div  class="area mxw330">
                    <span class="areaTitle">{{ trans('cpanel/cpanel.public.shareOn') }}</span>
                    <div class="row column w100p alnC jstfyC">
                        <div class="shareIcon" shareTo="copy">
                            <span class="ico-copy fs105 m5"></span>
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.copyLink') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                        <div class="shareIcon" shareTo="facebook">
                            <span class=" ico-facebook fs105 m5" style="color:#4267B2;"></span>
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.facebook') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                        <div class="shareIcon" shareTo="twitter">
                            <span class=" ico-twitter fs105 m5" style="color:#1DA1F2;"></span>
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.twitter') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                        <div class="shareIcon" shareTo="linkedin">
                            <span class=" ico-linkedin fs105 m5" style="color:#0A66C2;"></span>
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.linkedin') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                        <div class="shareIcon" shareTo="whatsapp">
                            <span class=" ico-whatsapp fs105 m5" style="color:#128C7E;"></span>
                            <span class="grow2 fs-102 mX10">{{ trans("cpanel/cpanel.public.whatsapp") }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                        <div class="shareIcon" shareTo="telegram">
                            <span class=" ico-telegram fs105 m5" style="color:#0088cc;"></span>
                            <span class="grow2 fs-102 mX10">{{ trans('cpanel/cpanel.public.telegram') }}</span>
                            <span class="ico-check0 fs102 m5" ></span>
                        </div>
                    </div>

                    <div class="shareBtnContainer" shareTo="copy">
                        <button class="btn" id="share-copy">{{ trans('cpanel/cpanel.public.copyLink') }}</button>
                    </div>
                    <div class="shareBtnContainer" shareTo="facebook">
                        <button class="btn" id="share-facebook">{{ trans('cpanel/cpanel.public.shareOn') }} {{ trans('cpanel/cpanel.public.facebook') }}</button>
                    </div>
                    <div class="shareBtnContainer" shareTo="twitter">
                        <button class="btn" id="share-twitter">{{ trans('cpanel/cpanel.public.shareOn') }} {{ trans('cpanel/cpanel.public.twitter') }}</button>
                    </div>
                    <div class="shareBtnContainer" shareTo="linkedin">
                        <button class="btn" id="share-linkedin">{{ trans('cpanel/cpanel.public.shareOn') }} {{ trans('cpanel/cpanel.public.linkedin') }}</button>
                    </div>
                    <div class="shareBtnContainer" shareTo="whatsapp">
                        <button class="btn" id="share-whatsapp">{{ trans('cpanel/cpanel.public.shareOn') }} {{ trans('cpanel/cpanel.public.whatsapp') }}</button>
                    </div>
                    <div class="shareBtnContainer" shareTo="telegram">
                        <button class="btn" id="share-telegram">{{ trans('cpanel/cpanel.public.shareOn') }} {{ trans('cpanel/cpanel.public.telegram') }}</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
{{-- /////////////////////////imgs browser popup//////////////////////// --}}
    {{-- need to fix its design --}}
    <div class="popupCard popupCard-800x800 none"  id="imgBrowser-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-imgs"></span><span class="mX5" id="imgBrowserTitle"></span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="btnContainer">
                <button class="imgs-uploadImgBtn btn">
                    <span class="btnTxt">{{ trans('cpanel/design/imgs.uploadNew') }}</span>
                    <span class="btnLoading"></span>
                </button>
            </div>
            <div id="imgsBrowserContainer"></div>
        </div>
    </div>
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



{{-- /////////////////////////create new selection////////////////////// --}}
    <div class="popupCard popupCard-600 none"  id="createNewSection-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-edit fs102"></span><span class="mX5">{{ trans('cpanel/products/products.addOptionSelection') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="row alnC jstfyS">
                <img src="" id="createNewSection-popup-productImg" class="h50 w50 br50p ofCover" alt="">
                <div id="createNewSection-popup-productName" class="fs103 bold mX5"></div>
            </div>
            <div class="column alnS jstfyS mT20">
                <x-input-text id="createNewSection-selectionName" icon="ico-edit" placeholder="{{ trans('cpanel/products/products.optionSelectionName') }}" />
                <x-input-text id="createNewSection-price" type="number" icon="ico-money" placeholder="{{ trans('cpanel/products/products.optionSelectionPrice') }}"/>
                <x-input-text id="createNewSection-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/products/products.enName') }}"/>
                <x-input-text id="createNewSection-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/products/products.frName') }}"/>
                <x-input-text id="createNewSection-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/products/products.deName') }}"/>
                <x-input-text id="createNewSection-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/products/products.itName') }}"/>
                <x-input-text id="createNewSection-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/products/products.esName') }}"/>
                <x-input-text id="createNewSection-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/products/products.arName') }}"/>
                <x-input-text id="createNewSection-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/products/products.ruName') }}"/>
                <x-input-text id="createNewSection-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/products/products.uaName') }}"/>
                <x-input-text id="createNewSection-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/products/products.egName') }}" tooltip="{{ trans('cpanel/products/products.egName').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
                <div class="btnContainer">
                    <button class="btn btn-cancel popupClose">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button class="btn" id="createNewSection-createbtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.create') }}</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
{{-- /////////////////////////edit selection//////////////////////////// --}}
    <div class="popupCard popupCard-600 none"  id="editSection-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-edit fs102"></span><span class="mX5">{{ trans('cpanel/products/products.editSelection') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="row alnC jstfyS">
                <img src="" id="editSection-popup-productImg" class="h50 w50 br50p ofCover" alt="">
                <div id="editSection-popup-productName" class="fs103 bold mX5"></div>
            </div>
            <div class="column alnS jstfyS mT20">
                <x-input-text id="editSection-selectionName" closeIcon="no" attr="readOnly" icon="ico-edit" placeholder="{{ trans('cpanel/products/products.optionSelectionName') }}" />
                <x-input-text id="editSection-price" type="number" icon="ico-money" placeholder="{{ trans('cpanel/products/products.optionSelectionPrice') }}"/>
                <x-input-text id="editSection-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/products/products.enName') }}"/>
                <x-input-text id="editSection-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/products/products.frName') }}"/>
                <x-input-text id="editSection-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/products/products.deName') }}"/>
                <x-input-text id="editSection-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/products/products.itName') }}"/>
                <x-input-text id="editSection-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/products/products.esName') }}"/>
                <x-input-text id="editSection-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/products/products.arName') }}"/>
                <x-input-text id="editSection-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/products/products.ruName') }}"/>
                <x-input-text id="editSection-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/products/products.uaName') }}"/>
                <x-input-text id="editSection-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/products/products.egName') }}" tooltip="{{ trans('cpanel/products/products.egName').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
                <div class="btnContainer">
                    <button class="btn btn-cancel popupClose">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button class="btn" id="editSection-saveBtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
{{-- /////////////////////////add order item//////////////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="addOrderItem-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-createProduct fs102"></span><span class="mX5">{{ trans('cpanel/orders/orders.addOrderItem') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="mnh400 column w100p">
                <x-input-list id="addOrderItem-productsListInput" listId="addOrderItem-productsList" icon="ico-products" placeholder="{{ trans('cpanel/orders/orders.findProduct') }}" />
                <div id="addOrderItem-itemContainer" class=" mT20"></div>
                <textarea  id="addOrderItem-itemNotice" class="textarea" placeholder="{{ trans('cpanel/orders/orders.specialRequest') }}"></textarea>
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="addOrderItem-ConfirmBtn">
                        <span>{{ trans('cpanel/orders/orders.addItem') }}</span>
                        <span class="mX3"></span>
                        <span id="addOrderItem-itemTotal"></span>
                    </button>
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
{{-- /////////////////////////access denied///////////////////////////// --}}
    <div class="popupCard popupCard-400 none"  id="accessDenied-popup">
        <div class="popupHead">
            <div class="popupTitle"><span class="ico-warning fs102"></span><span class="mX5">{{ trans('cpanel/cpanel.public.accessDenied') }}</span></div>
            <div class="popupClose popupCloseStyle ico-close" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></div>
        </div>
        <div class="popupBody">
            <div class="fs102 mY10">{{ trans('cpanel/cpanel.public.accessDenied2') }}</div>
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



