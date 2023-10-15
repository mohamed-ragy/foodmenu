<div class="pageWrapper" id="manage_products-page">
    <input type="hidden" id="manage_products-title" value="{{ trans('cpanel/cpanel.menu.manage_products') }}" icon="products">

    <x-content-window title="{{ trans('cpanel/products/products.manageProducts') }}" helpId="145" windowClass="contentWindow_100p" >
        <div class="btnContainer mB40">
            <button class="btn btn-cancel popupPage" popupPage="Create-Product">{{ trans('cpanel/products/products.createNewProduct') }}</button>
        </div>
        <div class="area" autoHelp="203">
            <span class="areaTitle">{{ trans('cpanel/products/products.selectCategory') }}</span>
            <x-input-list id="manageProducts-selectCategory" listId="manageProducts-selectCategoryList" icon="ico-category_list"  placeholder="{{ trans('cpanel/products/products.findCategory') }}" />
        </div>
        <div class="area">
            <span class="areaTitle" id="manageProducts-manageProductsContainerTitle"></span>
            <div id="manageProducts-manageProductsContainer">
                {{ trans('cpanel/products/products.selectCategoryToSortProducts') }}
            </div>
        </div>
    </x-content-window>

</div>
