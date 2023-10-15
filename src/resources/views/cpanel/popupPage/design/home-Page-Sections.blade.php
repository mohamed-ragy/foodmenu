<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="home_page_sections" value="{{ trans('cpanel/cpanel.menu.home_page_sections') }}" icon="home">

    <x-content-window title="{{ trans('cpanel/design/homePageSections.intro') }}" windowId="Website-Intro" helpId="236" noSaveId="homePageSections-introNoSave">
        <div class="homePageSectionCardWarning 520 mB40 column alnC jstfyC">
            <span class="ico-warning fs2 cO mB5"></span>
            <span class="cO mX5 fs102">{{ trans('cpanel/design/homePageSections.templateWarning') }}</span>
        </div>
        <div class="row alnC jstfyC wFC mXA mB20 relative">
            <span class="ico-edit imgCardIcon"></span>
            <img class="imgCard h200 w200 " id="design-introImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
        </div>
        <x-input-text id="homePageSections-introTitle-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
        <x-input-text id="homePageSections-introTitle-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
        <x-input-text id="homePageSections-introTitle-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
        <x-input-text id="homePageSections-introTitle-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
        <x-input-text id="homePageSections-introTitle-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
        <x-input-text id="homePageSections-introTitle-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
        <x-input-text id="homePageSections-introTitle-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
        <x-input-text id="homePageSections-introTitle-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
        <x-input-text id="homePageSections-introTitle-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.introTitle').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/design/homePageSections.intro').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />

        <x-textarea id="homePageSections_introDes_en" containerClass="languageInput_en" iconFlag="USA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_es" containerClass="languageInput_es" iconFlag="ESP" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_fr" containerClass="languageInput_fr" iconFlag="FRA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_de" containerClass="languageInput_de" iconFlag="DEU" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_it" containerClass="languageInput_it" iconFlag="ITA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_ar" containerClass="languageInput_ar" iconFlag="EGY" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_ru" containerClass="languageInput_ru" iconFlag="RUS" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_ua" containerClass="languageInput_ua" iconFlag="UKR" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
        <x-textarea id="homePageSections_introDes_eg" containerClass="languageInput_eg" iconFlag="CLF" maxLength="100" title="{{ trans('cpanel/design/homePageSections.introdescription').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>

        <div class="btnContainer">
            <button id="homePageSections-introCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homePageSections-introSaveBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/design/homePageSections.slideShow') }}" windowId="Website-SlideShow" helpId="243" noSaveId="homePageSections-slideShowNoSave">
        <div class="homePageSectionCardWarning 520 mB40 column alnC jstfyC">
            <span class="ico-warning fs2 cO mB5"></span>
            <span class="cO mX5 fs102">{{ trans('cpanel/design/homePageSections.templateWarning') }}</span>
        </div>

        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/design/homePageSections.slideShowImgs') }}</span>
            <div id="homePageSections-slideShowimgsContainer"></div>
            <div class="btnContainer">
                <button id="homePageSections-slideShowAddNewImgBtn" class="btn btn-cancel">{{ trans('cpanel/design/homePageSections.addNewImage') }}</button>
            </div>
        </div>
        <div class="numberPickerContainer_100p" >
            <span>{{ trans('cpanel/design/homePageSections.slideShowInterval') }}</span>
            <div class="numberPickerControls">
                <span id="homePageSections-slideShowIntervalD" class="numberPickerArrow ico-left"></span>
                <span class="numberPickerValue">
                    <span class="mX2" id="homePageSections-slideShowInterval"></span>
                    <span class="mX2">{{ trans('cpanel/design/homePageSections.seconds') }}</span>
                </span>
                <span id="homePageSections-slideShowIntervalU" class="numberPickerArrow ico-right"></span>
            </div>
        </div>

        <div class="btnContainer">
            <button id="homePageSections-slideShowCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homePageSections-slideShowSaveBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/design/homePageSections.info') }}" windowId="Website-Info" helpId="237" noSaveId="homePageSections-infoNoSave">
        <div class="homePageSectionCardWarning 520 mB40 column alnC jstfyC">
            <span class="ico-warning fs2 cO mB5"></span>
            <span class="cO mX5 fs102">{{ trans('cpanel/design/homePageSections.templateWarning') }}</span>
        </div>
        <div class="row alnC jstfyC wFC mXA mB20 relative">
            <span class="ico-edit imgCardIcon"></span>
            <img class="imgCard h200 w200" id="design-infoImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
        </div>
        <x-input-text id="homePageSections-infoTitle-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
        <x-input-text id="homePageSections-infoTitle-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
        <x-input-text id="homePageSections-infoTitle-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
        <x-input-text id="homePageSections-infoTitle-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
        <x-input-text id="homePageSections-infoTitle-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
        <x-input-text id="homePageSections-infoTitle-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
        <x-input-text id="homePageSections-infoTitle-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
        <x-input-text id="homePageSections-infoTitle-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
        <x-input-text id="homePageSections-infoTitle-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.infoTitle').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/design/homePageSections.info').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />

        <x-textarea id="homePageSections_infoDes_en" containerClass="languageInput_en" iconFlag="USA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_es" containerClass="languageInput_es" iconFlag="ESP" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_fr" containerClass="languageInput_fr" iconFlag="FRA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_de" containerClass="languageInput_de" iconFlag="DEU" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_it" containerClass="languageInput_it" iconFlag="ITA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_ar" containerClass="languageInput_ar" iconFlag="EGY" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_ru" containerClass="languageInput_ru" iconFlag="RUS" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_ua" containerClass="languageInput_ua" iconFlag="UKR" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
        <x-textarea id="homePageSections_infoDes_eg" containerClass="languageInput_eg" iconFlag="CLF" maxLength="100" title="{{ trans('cpanel/design/homePageSections.infodescription').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>

        <div class="btnContainer">
            <button id="homePageSections-infoCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homePageSections-infoSaveBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/design/homePageSections.ourStory') }}" windowId="Website-OurStory" helpId="239" noSaveId="homePageSections-ourStoryNoSave">
        <div class="homePageSectionCardWarning 520 mB40 column alnC jstfyC">
            <span class="ico-warning fs2 cO mB5"></span>
            <span class="cO mX5 fs102">{{ trans('cpanel/design/homePageSections.templateWarning') }}</span>
        </div>
        <div class="row alnC jstfyC wFC mXA mB20 relative">
            <span class="ico-edit imgCardIcon"></span>
            <img class="imgCard h200 w200" id="design-ourStoryImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
        </div>
        <x-input-text id="homePageSections-ourStoryTitle-en" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-es" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-fr" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-de" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-it" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-ar" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-ru" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-ua" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}" />
        <x-input-text id="homePageSections-ourStoryTitle-eg" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/design/homePageSections.ourStoryTitle').' '.trans('cpanel/cpanel.public.in') }}"  tooltip="{{ trans('cpanel/design/homePageSections.ourStory').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />

        <x-textarea id="homePageSections_ourStoryDes_en" containerClass="languageInput_en" iconFlag="USA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.en') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_es" containerClass="languageInput_es" iconFlag="ESP" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.es') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_fr" containerClass="languageInput_fr" iconFlag="FRA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.fr') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_de" containerClass="languageInput_de" iconFlag="DEU" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.de') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_it" containerClass="languageInput_it" iconFlag="ITA" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.it') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_ar" containerClass="languageInput_ar" iconFlag="EGY" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ar') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_ru" containerClass="languageInput_ru" iconFlag="RUS" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ru') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_ua" containerClass="languageInput_ua" iconFlag="UKR" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' '.trans('cpanel/cpanel.public.ua') }}"></x-textarea>
        <x-textarea id="homePageSections_ourStoryDes_eg" containerClass="languageInput_eg" iconFlag="CLF" maxLength="100" title="{{ trans('cpanel/design/homePageSections.ourStorydescription').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>

        <div class="btnContainer">
            <button id="homePageSections-ourStoryCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homePageSections-ourStorySaveBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/design/homePageSections.gallery') }}" windowId="Website-Gallery" helpId="240" noSaveId="homePageSections-galleryNoSave">
        <div class="homePageSectionCardWarning 520 mB40 column alnC jstfyC">
            <span class="ico-warning fs2 cO mB5"></span>
            <span class="cO mX5 fs102">{{ trans('cpanel/design/homePageSections.templateWarning') }}</span>
        </div>
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/design/homePageSections.addToGallery') }}</span>

            <div class="row alnC jstfyC wFC mXA mB20 relative">
                <span class="ico-edit imgCardIcon"></span>
                <img class="imgCard h100 w100" id="design-addToGalleryImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
            </div>
            <div class="btnContainer">
                <button id="design-galleryAddBtn" class="btn">{{ trans('cpanel/cpanel.public.add') }}</button>
            </div>
        </div>
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/design/homePageSections.galleryImgs') }}</span>
            <div id="design-galleryImgs"></div>
        </div>

        <div class="btnContainer">
            <button id="homePageSections-galleryCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homePageSections-gallerySaveBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>
    </x-content-window>

</div>
