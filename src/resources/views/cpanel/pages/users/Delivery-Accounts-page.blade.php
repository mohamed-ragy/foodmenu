<div class="pageWrapper" id="delivery_accounts-page">
    <input type="hidden" id="delivery_accounts-title" value="{{ trans('cpanel/cpanel.menu.delivery_accounts') }}" icon="deliveryAccount">

    <x-content-window title="{{ trans('cpanel/users/deliveryAccounts.deliveryAccounts') }}" helpId="111" windowClass="contentWindow_100p">
        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/users/deliveryAccounts.createDeliveryAccount') }}</span>
            <x-input-text id="deliveryAccounts-createNewDeliveryNameInput" icon="ico-delivery_accounts" autoHelp="103" placeholder="{{ trans('cpanel/users/deliveryAccounts.deliveryName') }}" />
            <x-input-text type="password" id="deliveryAccounts-createNewDeliveryPasswordInput" autoHelp="104" icon="ico-password" placeholder="{{ trans('cpanel/users/deliveryAccounts.password') }}" />
            <div class="btnContainer">
                <button id="deliveryAccounts-createNewDeliveryBtn" class="btn" autoHelp="105">
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.create') }}</div>
                    <div class="btnLoading"></div>
                </button>
            </div>
        </div>

        <div id="deliveryAccountes-deliveryAccountsContainer"></div>
    </x-content-window>
</div>
