<div class="pageWrapper" id="password-page">
    <input type="hidden" id="password-title" value="{{ trans('cpanel/cpanel.menu.password') }}" icon="password">

    <x-content-window title="{{ trans('cpanel/security/password.changePassword') }}" helpId="176">
        <x-input-text containerClass="mB40" id="security-oldPassword" type="password" icon="ico-password" placeholder="{{ trans('cpanel/security/password.currentpassword') }}"/>
        <x-input-text  id="security-newPassword" type="password" icon="ico-password"  placeholder="{{ trans('cpanel/security/password.newPassword') }}"/>
        <x-input-text  id="security-newPasswordConfirm" type="password" icon="ico-password" placeholder="{{ trans('cpanel/security/password.newPasswordConfirm') }}"/>
        <div class="btnContainer">
            <button class="btn" id="security-changePasswordBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/security/password.changePassword') }}</div>
            </button>
        </div>
    </x-content-window>

</div>
