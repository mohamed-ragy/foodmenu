<div class="pageWrapper" id="sub_accounts-page" >
    <input type="hidden" id="sub_accounts-title" value="{{ trans('cpanel/cpanel.menu.sub_accounts') }}" icon="subAccount">


    <x-content-window title="{{ trans('cpanel/security/subAccounts.subAccounts') }}" helpId="186" windowClass="contentWindow_100p">
        <div class="btnContainer">
            <button class="btn btn-cancel popupPage" popupPage="Create-Sub-Account">{{ trans('cpanel/security/subAccounts.createSubAccount') }}</button>
        </div>
        <span id="subAccounts-noSubAccounts">{{ trans('cpanel/security/subAccounts.noSubAccounts') }}</span>
        <div id="subAccounts-subAccountsContainer"></div>
    </x-content-window>
</div>
