<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="sub_accounts" value="{{ trans('cpanel/cpanel.menu.sub_accounts') }}" icon="subAccount">
    <x-content-window title="{{ trans('cpanel/security/subAccounts.manageSubaccount') }}" helpId="213" windowId="Sub-Account" >
        <input type="hidden" id="manageSubAccount-Id">
        <div id="manageSubAccountContainer">
            <x-input-text id="manageSubAccount-name" icon="ico-sub_accounts" placeholder="{{ trans('cpanel/security/subAccounts.name') }}"  closeIcon="no" attr="readOnly" />
            <x-input-text id="manageSubAccount-email" icon="ico-email_address" placeholder="{{ trans('cpanel/security/subAccounts.emailAddress') }}"  closeIcon="no" attr="readOnly" />
            <div class="area" autoHelp="189">
                <span class="areaTitle row alnC jstfyS">
                    <span class="unsaved fs08" id="subAccounts-manageAuthorities-nosave" tooltip="{{ trans('cpanel/cpanel.public.unsaved') }}"><span class="ico-warning mX5"></span></span>
                    <span>{{ trans('cpanel/security/subAccounts.manageAuthorities') }}</span>
                </span>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority0') }}</span>
                    <input id="subAccounts-manageAuthorities-authority0" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority1') }}</span>
                    <input id="subAccounts-manageAuthorities-authority1" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority2') }}</span>
                    <input id="subAccounts-manageAuthorities-authority2" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority3') }}</span>
                    <input id="subAccounts-manageAuthorities-authority3" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority4') }}</span>
                    <input id="subAccounts-manageAuthorities-authority4" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority5') }}</span>
                    <input id="subAccounts-manageAuthorities-authority5" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="subAccounts-manageAuthorities-cancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button class="btn" id="subAccounts-manageAuthorities-saveBtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                    </button>
                </div>
            </div>
            <div class="area" autoHelp="188">
                <span class="areaTitle row alnC jstfyS">
                    <span class="unsaved fs08" id="subAccounts-changePassword-nosave" tooltip="{{ trans('cpanel/cpanel.public.unsaved') }}"><span class="ico-warning mX5"></span></span>
                    <span>{{ trans('cpanel/security/subAccounts.changePassword') }}</span>
                </span>
                <x-input-text id="subAccounts-changePassword-password" type="password" icon="ico-password" placeholder="{{ trans('cpanel/security/subAccounts.newPassword') }}" />
                <div class="btnContainer">
                    <button class="btn btn-cancel" id="subAccounts-changePassword-cancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button class="btn" id="subAccounts-changePassword-saveBtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                    </button>
                </div>
            </div>
        </div>
        <div id="subAccountNotFound" class="none fs101 m10 mnw300">{{ trans('cpanel/security/subAccounts.accountNotFound') }}</div>
    </x-content-window>

    <x-content-window title="{{ trans('cpanel/security/subAccounts.createSubAccount') }}" windowId="Create-Sub-Account" helpId="185" >
        <x-input-text icon="ico-sub_accounts" autoHelp="181" placeholder="{{ trans('cpanel/security/subAccounts.name') }}" id="createNewSubAccount-name" />
        <x-input-text type="password" autoHelp="183" icon="ico-password" placeholder="{{ trans('cpanel/security/subAccounts.password') }}" id="createNewSubAccount-password" />
        <x-input-text icon="ico-email_address" autoHelp="182" placeholder="{{ trans('cpanel/security/subAccounts.emailAddress') }}" id="createNewSubAccount-email" attr="readonly" closeIcon="no" />
            <div class="area" autoHelp="184">
                <span class="areaTitle">{{ trans('cpanel/security/subAccounts.authorities') }}</span>

                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority0') }}</span>
                    <input id="createNewSubAccount-authority0" type="checkbox" class="checkbox" checked>
                    <span class="mX5"></span>
                </label>


                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority1') }}</span>
                    <input id="createNewSubAccount-authority1" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>

                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority2') }}</span>
                    <input id="createNewSubAccount-authority2" type="checkbox" class="checkbox" checked>
                    <span class="mX5"></span>
                </label>

                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority3') }}</span>
                    <input id="createNewSubAccount-authority3" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>

                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority4') }}</span>
                    <input id="createNewSubAccount-authority4" type="checkbox" class="checkbox" >
                    <span class="mX5"></span>
                </label>

                <label class="checkboxlabel_100p">
                    <span class="mX5">{{ trans('cpanel/security/subAccounts.authority5') }}</span>
                    <input id="createNewSubAccount-authority5" type="checkbox" class="checkbox" checked>
                    <span class="mX5"></span>
                </label>
            </div>

            <div class="btnContainer">
                <button class="btn" id="createNewSubAccount-createBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.create') }}</div>
                </button>
            </div>
    </x-content-window>

</div>
