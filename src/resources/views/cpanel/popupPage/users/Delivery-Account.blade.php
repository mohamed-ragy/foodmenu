<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="delivery_accounts" value="{{ trans('cpanel/cpanel.menu.delivery_accounts') }}" icon="deliveryAccount">

    <x-content-window title="{{ trans('cpanel/users/deliveryAccounts.manageDeliveryAccount') }}" windowId="Edit-Delivery-Account" helpId="108" >
        <div class="mnw300 m10" id="editDeliveryWindowNotFound">{{ trans('cpanel/users/deliveryAccounts.deliveryNotFound') }}</div>
        <div id="editDeliveryWindowContainer">
            <div class="area" autoHelp="109">
                <span class="areaTitle">{{ trans('cpanel/users/deliveryAccounts.changeDeliveryAccountName') }}</span>
                <x-input-text id="deliveryAccounts-editDeliveryNameInput" icon="ico-delivery_accounts" placeholder="{{ trans('cpanel/users/deliveryAccounts.deliveryName') }}" />
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="deliveryAccounts-editDeliveryNameCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button class="btn" id="deliveryAccounts-editDeliveryNameSaveBtn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
            </div>
            <div class="area" autoHelp="110">
                <span class="areaTitle">{{ trans('cpanel/users/deliveryAccounts.changeDeliveryAccountPassword') }}</span>
                <x-input-text type="password" id="deliveryAccounts-editDeliveryPasswordInput" icon="ico-password" placeholder="{{ trans('cpanel/users/deliveryAccounts.password') }}" />
                <div class="btnContainer">
                    <button class="btn" id="deliveryAccounts-editDeliveryPasswordSaveBtn">
                        <div class="btnTxt">{{ trans('cpanel/users/deliveryAccounts.changePassword') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
            </div>
        </div>
    </x-content-window>
</div>
