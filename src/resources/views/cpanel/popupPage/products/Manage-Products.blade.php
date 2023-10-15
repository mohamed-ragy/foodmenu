<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="manage_products" value="{{ trans('cpanel/cpanel.menu.manage_products') }}" icon="products">

    <x-content-window windowId="Product" >
        <div class="mnw300 m10" id="productWindowNotFound">{{ trans('cpanel/products/products.productNotFound') }}</div>
        <div class="column alnS jstfyS" id="productWindowContainer">
            <img id="productPage-img" class="m5 w100p-10 h150 br3 ofCover" src="" alt="">
            <div class="mX5 column alnS jstfyS">
                <div class="mY2 fs104 bold taC row alnC jstfyC"><div id="productPage-title"></div><div id="productPage-unsorted" class="cO fs08 mX3 ico-warning" tooltip="{{ trans('cpanel/products/products.uncategorizedProduct') }}"></div></div>
                <div class="mY2 mX3 fs104 cStar row alnC jstfyC" id="productPage-stars"></div>
                <div class="mY2 mX3 fs104" id="productPage-price"></div>
                <div class="mY2 mX3 fs102 row alnC jstfyC"><div>{{ trans('cpanel/products/products.category') }}</div><a id="prductPage-category" popupPage="Edit-Category" class="mX3 popupPage"></a></div>
                <div class="authority_master mY2 mX3 fs102 row alnC jstfyC"><div>{{ trans('cpanel/products/products.ordered') }}</div><div id="productPage-ordered" class="mX3"></div><div class="ico-info fs08" tooltip="{{ trans('cpanel/products/products.productOrderedNumNotice') }}"></div></div>
                <div class="mY2 mX3 fs102 row alnC jstfyC"><div>{{ trans('cpanel/products/products.created') }}</div><div id="productPage-created" class="mX3 "></div></div>
            </div>
            <div class="btnContainer">
                <button id="productPage-editOptions" class="btn btn-cancel popupPage" popupPage="Product-Options">{{ trans('cpanel/products/products.manageOptions') }}</button>
                <button id="productPage-editProduct" class="btn btn-cancel popupPage" popupPage="Edit-Product">{{ trans('cpanel/cpanel.public.edit') }}</button>
            </div>
        </div>
    </x-content-window>

    <x-content-window title="{{ trans('cpanel/products/products.editProduct') }}" windowId="Edit-Product" helpId="141"  noSaveId="editProduct-editProductNoSave">
        <div class="mnw300 m10" id="editProductWindowNotFound">{{ trans('cpanel/products/products.productNotFound') }}</div>
        <div id="editProductWindowContainer">
            <div class="btnContainer">
                <button class="btn btn-cancel popupPage" popupPage="Product-Options" product="" id="editProduct-productOptionsBtn">{{ trans('cpanel/products/products.manageOptions') }}</button>
            </div>

            <div class="area">
                <span class="areaTitle">{{ trans('cpanel/products/products.productInfo') }}</span>
                <x-input-text closeIcon="no" attr="readonly" id="editProduct-ProductName" autoHelp="130" icon="ico-products" placeholder="{{ trans('cpanel/products/products.productName') }}" />
                <x-input-text type="number" value="0.00" autoHelp="131" id="editProduct-productPrice"  icon="ico-money" placeholder="{{ trans('cpanel/products/products.productPrice') }}" />
                <x-input-list id="editProduct-productCategory" autoHelp="132" icon="ico-category_list" listId="editProduct-productCategoryList" placeholder="{{ trans('cpanel/products/products.findCategory') }}" title="{{ trans('cpanel/products/products.productCategory') }}"/>
                <label class="checkboxlabel_100p" autoHelp="140">
                    <span class="mX5">{{ trans('cpanel/products/products.productAvailability') }}</span>
                    <input id="editProduct-productAvailability" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
            </div>

            <div class="area" autoHelp="133">
                <span class="areaTitle">{{ trans('cpanel/products/products.productImg') }}</span>
                <div class="row alnC jstfyC  wFC mXA mB20 relative">
                    <span class="ico-edit imgCardIcon"></span>
                    <img class="imgCard h150 w150" id="editProduct-productImgCard" src="" alt="">
                </div>
            </div>

            <div class="area" autoHelp="134">
                <span class="areaTitle">{{ trans('cpanel/products/products.productNames') }}</span><br>
                <x-input-text id="editProduct-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/products/products.enName') }}"/>
                <x-input-text id="editProduct-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/products/products.frName') }}"/>
                <x-input-text id="editProduct-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/products/products.deName') }}"/>
                <x-input-text id="editProduct-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/products/products.itName') }}"/>
                <x-input-text id="editProduct-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/products/products.esName') }}"/>
                <x-input-text id="editProduct-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/products/products.arName') }}"/>
                <x-input-text id="editProduct-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/products/products.ruName') }}"/>
                <x-input-text id="editProduct-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/products/products.uaName') }}"/>
                <x-input-text id="editProduct-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/products/products.egName') }}" tooltip="{{ trans('cpanel/products/products.egName').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
            </div>

            <div class="area" autoHelp="135">
                <span class="areaTitle">{{ trans('cpanel/products/products.productDescriptions') }}</span><br>
                <x-textarea id="editProduct_enDescription" containerClass="languageInput_en" iconFlag="USA" title="{{ trans('cpanel/products/products.enDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_frDescription" containerClass="languageInput_fr" iconFlag="FRA" title="{{ trans('cpanel/products/products.frDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_deDescription" containerClass="languageInput_de" iconFlag="DEU" title="{{ trans('cpanel/products/products.deDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_itDescription" containerClass="languageInput_it" iconFlag="ITA" title="{{ trans('cpanel/products/products.itDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_esDescription" containerClass="languageInput_es" iconFlag="ESP" title="{{ trans('cpanel/products/products.esDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_arDescription" containerClass="languageInput_ar" iconFlag="EGY" title="{{ trans('cpanel/products/products.arDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_ruDescription" containerClass="languageInput_ru" iconFlag="RUS" title="{{ trans('cpanel/products/products.ruDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_uaDescription" containerClass="languageInput_ua" iconFlag="UKR" title="{{ trans('cpanel/products/products.uaDescription') }}" maxLength="400"></x-textarea>
                <x-textarea id="editProduct_egDescription" containerClass="languageInput_eg" iconFlag="CLF" title="{{ trans('cpanel/products/products.egDescription').' ' }}<span class='customLangName'></span>" maxLength="400"></x-textarea>
            </div>

            <div class="btnContainer">
                <button class="btn btn-cancel" id="editProduct-cancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                <button class="btn" id="editProduct-saveBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                </button>
            </div>
        </div>

    </x-content-window>

    <x-content-window title="{{ trans('cpanel/products/products.editProductOptions') }}" windowId="Product-Options" helpId="235"  noSaveId="productOptions-productOptionsNoSave">
        <div class="mnw300 m10" id="editProductOptionsWindowNotFound">{{ trans('cpanel/products/products.productNotFound') }}</div>
        <div id="editProductOptionsWindowContainer">
            <div class="row alnC jstfyS">
                <img src="" id="editProductOptions-productImg" class="h50 w50 br50p ofCover" alt="">
                <div id="editProductOptions-productName" class="fs103 bold mX5"></div>
            </div>
            <div class="btnContainer">
                <button class="btn btn-cancel popupPage" id="editProductOptions-editProductBtn" popupPage="Edit-Product">{{ trans('cpanel/products/products.editProduct') }}</button>
            </div>
            <div class="area" autoHelp="137">
                <span class="areaTitle">{{ trans('cpanel/products/products.manageOptions') }}</span>
                <div class="column alnSH jstfyS w600 mxw100p" id="editProductOptions-optionsContainer"></div>
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="editProductOptions-createNewOption">{{ trans('cpanel/products/products.addOption') }}</button>
                </div>
            </div>
            <div class="area none" autoHelp="167" id="editOption-container">
                {{-- <span class="areaTitle" id="editOption-title"></span> --}}
                <span class="areaTitle ico-close lU r10 t-11 pointer fs09" id="editOption-closeArea" tooltip="{{ trans('cpanel/cpanel.public.close') }}"></span>
                <div class="column alnS jstfyS w600 mxw100p" id="editOption-optionSelectionsContainer"></div>
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="editOption-createNewSelection">{{ trans('cpanel/products/products.addOptionSelection') }}</button>
                </div>
            </div>
        </div>
    </x-content-window>
</div>
