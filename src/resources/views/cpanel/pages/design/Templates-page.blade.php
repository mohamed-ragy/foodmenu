<div class="pageWrapper" id="templates-page">
    <input type="hidden" id="templates-title" value="{{ trans('cpanel/cpanel.menu.templates') }}" icon="templates">

    <x-content-window title="{{ trans('cpanel/design/Templates.currentTemplate') }}" windowClass="contentWindow_100p" helpId="121">
        <div class="currentTemplateContainer m10 w100p-20 row wrap alnS jstfyS"></div>
    </x-content-window>
    <x-content-window title="{{ trans('cpanel/design/Templates.title') }}" windowClass="contentWindow_100p" helpId="138" >
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/design/Templates.templatesCategories') }}</span>
            <x-input-list id="design-tempaltes-templatesInputList" listId="design-tempaltes-templatesList" icon="ico-templates" placeholder="{{ trans('cpanel/design/Templates.templatesPlaceHolder') }}" />
            <div class="btnContainer">
                <button class="btn" id="design-templates-templatesCategoriesFindBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.find') }}</div>
                </button>
            </div>
        </div>
        <div id="design-Templates-templatesContainer" class="m10 w100p-20 row wrap alnSH jstfyC">

        </div>
    </x-content-window>
</div>
