<div class="pageWrapper"  >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="category_list" value="{{ trans('cpanel/cpanel.menu.category_list') }}" icon="categories">

    <x-content-window title="{{ trans('cpanel/categories/categoriesList.editCategory') }}" windowId="Edit-Category" helpId="129"  noSaveId="editCategory-editCategoryNoSave">

        <div id="editCategoryContainer">
            <div class="area"  autoHelp="123">
                <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryName') }}</span>
                <x-input-text closeIcon="no" attr="readonly"  id="editCategory-categoryName" icon="ico-category_list" placeholder="{{ trans('cpanel/categories/createNewCategory.categoryName') }}" />
            </div>

            <div class="area"  autoHelp="124">
                <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryImg') }}</span>
                <div class="row alnC jstfyC  wFC mXA mB20 relative">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard h150 w150" id="editCategory-categoryImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
                </div>
            </div>

            <div class="area" autoHelp="125">
                <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryNames') }}</span>
                <x-input-text id="editCategory-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inEN') }}"/>
                <x-input-text id="editCategory-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inFR') }}"/>
                <x-input-text id="editCategory-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inDE') }}"/>
                <x-input-text id="editCategory-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inIT') }}"/>
                <x-input-text id="editCategory-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inES') }}"/>
                <x-input-text id="editCategory-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inAR') }}"/>
                <x-input-text id="editCategory-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inRU') }}"/>
                <x-input-text id="editCategory-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/categories/createNewCategory.inUA') }}"/>
                <x-input-text id="editCategory-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/cpanel.public.in') }}" tooltip="{{ trans('cpanel/categories/createNewCategory.name').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>" class="inputTextCL" />
            </div>

            <div class="area" autoHelp="205">
                <span class="areaTitle">{{ trans('cpanel/categories/createNewCategory.categoryDescriptions') }}</span>
                <x-textarea id="editCategory_enDescription" containerClass="languageInput_en" iconFlag="USA"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inEN') }}" ></x-textarea>
                <x-textarea id="editCategory_frDescription" containerClass="languageInput_fr" iconFlag="FRA"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inFR') }}" ></x-textarea>
                <x-textarea id="editCategory_deDescription" containerClass="languageInput_de" iconFlag="DEU"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inDE') }}" ></x-textarea>
                <x-textarea id="editCategory_itDescription" containerClass="languageInput_it" iconFlag="ITA"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inIT') }}" ></x-textarea>
                <x-textarea id="editCategory_esDescription" containerClass="languageInput_es" iconFlag="ESP"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inES') }}" ></x-textarea>
                <x-textarea id="editCategory_arDescription" containerClass="languageInput_ar" iconFlag="EGY"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inAR') }}" ></x-textarea>
                <x-textarea id="editCategory_ruDescription" containerClass="languageInput_ru" iconFlag="RUS"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inRU') }}" ></x-textarea>
                <x-textarea id="editCategory_uaDescription" containerClass="languageInput_ua" iconFlag="UKR"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/categories/createNewCategory.inUA') }}" ></x-textarea>
                <x-textarea id="editCategory_egDescription" containerClass="languageInput_eg" iconFlag="CLF"  maxLength="400" title="{{ trans('cpanel/categories/createNewCategory.description').' '.trans('cpanel/cpanel.public.in').' ' }}<span class='customLangName'></span>"></x-textarea>
            </div>

            <div class="btnContainer">
                <button id="editCategory-editCategoryCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button id="editCategory-editCategorySaveBtn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                </button>
            </div>
        </div>
        <div id="editCategoryNotFound" class="m10 mnw300">
            {{ trans('cpanel/categories/categoriesList.categoryNotFound') }}
        </div>

    </x-content-window>
</div>
