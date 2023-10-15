<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="manage_products" value="{{ trans('cpanel/cpanel.menu.manage_products') }}" icon="products">

    <x-content-window title="{{ trans('cpanel/products/products.createNewProduct') }}" helpId="139" windowId="Create-Product">

        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/products/products.productInfo') }}</span>
            <x-input-text id="createNewProduct-ProductName" autoHelp="130" icon="ico-products" placeholder="{{ trans('cpanel/products/products.productName') }}" />
            <x-input-text type="number" value="0.00" autoHelp="131" id="createNewProduct-productPrice"  icon="ico-money" placeholder="{{ trans('cpanel/products/products.productPrice') }}" />
            <x-input-list id="createNewProduct-productCategory" autoHelp="132" icon="ico-category_list" listId="createNewProduct-productCategoryList" placeholder="{{ trans('cpanel/products/products.findCategory') }}" title="{{ trans('cpanel/products/products.productCategory') }}"/>
        </div>

        <div class="area" autoHelp="133">
            <span class="areaTitle">{{ trans('cpanel/products/products.productImg') }}</span>
            <div class="row alnC jstfyC wFC mXA mB20 relative">
                <span class="ico-edit imgCardIcon"></span>
                <img class="imgCard h150 w150" id="createNewProduct-productImgCard" src="./storage/imgs/cpanel/noimg.png" alt="">
            </div>
        </div>
        <div class="area" autoHelp="134">
            <span class="areaTitle">{{ trans('cpanel/products/products.productNames') }}</span><br>
            <x-input-text id="createNewProduct-enName" containerClass="languageInput_en" iconFlag="USA" placeholder="{{ trans('cpanel/products/products.enName') }}"/>
            <x-input-text id="createNewProduct-frName" containerClass="languageInput_fr" iconFlag="FRA" placeholder="{{ trans('cpanel/products/products.frName') }}"/>
            <x-input-text id="createNewProduct-deName" containerClass="languageInput_de" iconFlag="DEU" placeholder="{{ trans('cpanel/products/products.deName') }}"/>
            <x-input-text id="createNewProduct-itName" containerClass="languageInput_it" iconFlag="ITA" placeholder="{{ trans('cpanel/products/products.itName') }}"/>
            <x-input-text id="createNewProduct-esName" containerClass="languageInput_es" iconFlag="ESP" placeholder="{{ trans('cpanel/products/products.esName') }}"/>
            <x-input-text id="createNewProduct-arName" containerClass="languageInput_ar" iconFlag="EGY" placeholder="{{ trans('cpanel/products/products.arName') }}"/>
            <x-input-text id="createNewProduct-ruName" containerClass="languageInput_ru" iconFlag="RUS" placeholder="{{ trans('cpanel/products/products.ruName') }}"/>
            <x-input-text id="createNewProduct-uaName" containerClass="languageInput_ua" iconFlag="UKR" placeholder="{{ trans('cpanel/products/products.uaName') }}"/>
            <x-input-text id="createNewProduct-egName" containerClass="languageInput_eg" iconFlag="CLF" placeholderTxt="{{ trans('cpanel/products/products.egName') }}" tooltip="{{ trans('cpanel/products/products.egName').' ' }}<span class='customLangName'></span>" class="inputTextCL"/>
        </div>

        <div class="area" autoHelp="135">
            <span class="areaTitle">{{ trans('cpanel/products/products.productDescriptions') }}</span><br>
            <x-textarea id="createNewProduct_enDescription" containerClass="languageInput_en" iconFlag="USA" title="{{ trans('cpanel/products/products.enDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_frDescription" containerClass="languageInput_fr" iconFlag="FRA" title="{{ trans('cpanel/products/products.frDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_deDescription" containerClass="languageInput_de" iconFlag="DEU" title="{{ trans('cpanel/products/products.deDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_itDescription" containerClass="languageInput_it" iconFlag="ITA" title="{{ trans('cpanel/products/products.itDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_esDescription" containerClass="languageInput_es" iconFlag="ESP" title="{{ trans('cpanel/products/products.esDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_arDescription" containerClass="languageInput_ar" iconFlag="EGY" title="{{ trans('cpanel/products/products.arDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_ruDescription" containerClass="languageInput_ru" iconFlag="RUS" title="{{ trans('cpanel/products/products.ruDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_uaDescription" containerClass="languageInput_ua" iconFlag="UKR" title="{{ trans('cpanel/products/products.uaDescription') }}" maxLength="400"></x-textarea>
            <x-textarea id="createNewProduct_egDescription" containerClass="languageInput_eg" iconFlag="CLF" title="{{ trans('cpanel/products/products.egDescription').' ' }}<span class='customLangName'></span>" maxLength="400"></x-textarea>
        </div>

        <div class="btnContainer">
            <button id="createNewProduct-createBtn" class="btn">
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.create') }}</div>
                <div class="btnLoading"></div>
            </button>
        </div>
        <div class="vH popupPage" popupPage="Product" id="createNewProductOpen"></div>
    </x-content-window>

</div>
