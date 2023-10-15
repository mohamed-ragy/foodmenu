<div class="pageWrapper" id="email_address-page" >

    <input type="hidden" id="email_address-title" value="{{ trans('cpanel/cpanel.menu.email_address') }}" icon="email">

    <div class="w100p row wrap alnSH jstfyS">
        <x-content-window title="{{ trans('cpanel/security/email.emailAddress') }}" helpId="173" windowClass="grow2">
            <x-input-text  id="security-email" icon="ico-login" value="{{ $account->email }}"  attr="readOnly" closeIcon="no" placeholder="{{ trans('cpanel/security/email.emailAddress') }}" />
            <div class="area mT40" autoHelp="174">
                <div class="areaTitle">{{ trans('cpanel/security/email.emailVerification') }}</div>
                <div id="security-emailNotVerified">
                    <div class="cO mxw330 taS mX10">{{ trans('cpanel/security/email.emailVerificatoinText1') }}</div>
                    <x-input-text id="security-verifyEmail" icon="ico-warning" placeholder="{{ trans('cpanel/security/email.emailVerificationCode') }}"  maxlength="6" />
                    <div class="btnContainer">
                        <button class="btn" id="security-resendVerifyEmail-btn">
                            <div class="btnLoading"></div>
                            <div class="btnTxt">{{ trans('cpanel/security/email.resend') }}</div>
                        </button>
                        <button class="btn" id="security-verifyEmail-btn">
                            <div class="btnLoading"></div>
                            <div class="btnTxt">{{ trans('cpanel/security/email.verify') }}</div>
                        </button>
                    </div>
                </div>
                <div id="security-emailVerified" class="h100 column alnC jstfyC">
                    <div class="ico-success cG fs2 mY10"></div>
                    <div>{{ trans('cpanel/security/email.emailVerificatoinText2') }}</div>
                </div>
            </div>
        </x-content-window>
        <x-content-window title="{{ trans('cpanel/security/email.changeEmail') }}"  helpId="175"  windowClass="grow2" contentClass="mA">
            <x-input-text  id="security-changeEmail" icon="ico-email_address"   placeholder="{{ trans('cpanel/security/email.newEmail') }}" />
            <x-input-text type="password"  id="security-changeEmail-password" icon="ico-password" placeholder="{{ trans('cpanel/security/email.password') }}" />
            <div class="btnContainer">
                <button id="security-changeEmail-btn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/security/email.change') }}</div>
                </button>
            </div>
        </x-content-window>
    </div>

</div>
