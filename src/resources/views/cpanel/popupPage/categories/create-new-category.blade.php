<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="category_list" value="{{ trans('cpanel/cpanel.menu.category_list') }}" icon="categories">

    <x-content-window title="{{ trans('cpanel/categories/createNewCategory.title') }}" windowId="Create-Category" helpId="126">

        <div class="area" autoHelp="123">
            <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryName') }}</span>
            <x-input-text id="createCategory-categoryName" icon="ico-category_list" placeholder="{{ trans('cpanel/categories/createNewCategory.categoryName') }}" />
        </div>

        <div class="area" autoHelp="124">
            <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryImg') }}</span>
            <div class="row alnC jstfyC  wFC mXA mB20 relative">
                <span class="ico-edit imgCardIcon"></span>
                <img class="imgCard h150 w150" id="createCategory-categoryImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
            </div>
        </div>

        <div class="area" autoHelp="125">
            <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryNames') }}</span>
            <x-input-text id="createCategory-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inEN') }}" />
            <x-input-text id="createCategory-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inFR') }}" />
            <x-input-text id="createCategory-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inDE') }}" />
            <x-input-text id="createCategory-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inIT') }}" />
            <x-input-text id="createCategory-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inES') }}" />
            <x-input-text id="createCategory-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inAR') }}" />
            <x-input-text id="createCategory-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inRU') }}" />
            <x-input-text id="createCategory-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inUA') }}" />
            <x-input-text id="createCategory-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />
        </div>


        <div class="area" autoHelp="205">
            <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryDescriptions') }}</span>
            <x-textarea iconFlag="USA" id="createCategory_enDescription" containerClass="languageInput_en" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inEN') }}" ></x-textarea>
            <x-textarea iconFlag="FRA" id="createCategory_frDescription" containerClass="languageInput_fr" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inFR') }}" ></x-textarea>
            <x-textarea iconFlag="DEU" id="createCategory_deDescription" containerClass="languageInput_de" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inDE') }}" ></x-textarea>
            <x-textarea iconFlag="ITA" id="createCategory_itDescription" containerClass="languageInput_it" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inIT') }}" ></x-textarea>
            <x-textarea iconFlag="ESP" id="createCategory_esDescription" containerClass="languageInput_es" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inES') }}" ></x-textarea>
            <x-textarea iconFlag="EGY" id="createCategory_arDescription" containerClass="languageInput_ar" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inAR') }}" ></x-textarea>
            <x-textarea iconFlag="RUS" id="createCategory_ruDescription" containerClass="languageInput_ru" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inRU') }}" ></x-textarea>
            <x-textarea iconFlag="UKR" id="createCategory_uaDescription" containerClass="languageInput_ua" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inUA') }}" ></x-textarea>
            <x-textarea iconFlag="CLF" id="createCategory_egDescription" containerClass="languageInput_eg" maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>
        </div>

        <div class="btnContainer">
            <button class="btn" id="createCategory-createBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.create') }}</div>
            </button>
        </div>

    </x-content-window>

</div>
