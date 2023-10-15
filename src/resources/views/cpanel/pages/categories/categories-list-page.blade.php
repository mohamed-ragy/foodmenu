<div class="pageWrapper" id="category_list-page" >
    <input type="hidden" id="category_list-title" value="{{ trans('cpanel/cpanel.menu.category_list') }}" icon="categories">
    <x-content-window title="{{ trans('cpanel/categories/categoriesList.title') }}" helpId="128"  windowClass="contentWindow_100p">
        <div class="btnContainer mB40">
            <button class="btn btn-cancel popupPage" popupPage="Create-Category">{{ trans('cpanel/categories/createNewCategory.title') }}</button>
        </div>
        <div id="categoriesList-categoriesListContainer"></div>

    </x-content-window>

</div>
