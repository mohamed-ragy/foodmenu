<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="General-Settings" value="{{ trans('cpanel/cpanel.menu.restaurant_information') }}" icon="websiteInformation">

    <x-content-window title="{{ trans('cpanel/settings/generalSettings.restaurantLocation') }}" windowId="Restaurant-Location" helpId="83" windowClass="contentWindow_100p" noSaveId="setting-restaurantLocation_mapWindowNoSave">


        <div class="btnContainer">
            <button class="btn" id="setting-restaurantLocation_currentLocationBtn" autoHelp="81">{{ trans('cpanel/settings/generalSettings.getCurrentLocation') }}</button>
            <button class="btn" id="setting-restaurantLocation_unsetLocationBtn" autoHelp="82">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/settings/generalSettings.unsetLocation') }}</span>
            </button>
        </div>

        <div id="setting-restaurantLocation_map" autoHelp="80"></div>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="setting-restaurantLocation_cancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="setting-restaurantLocation_saveBtn">
                <span class="btnLoading"></span>
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
            </button>
        </div>

    </x-content-window>



</div>
