<div class="pageWrapper" id="phone_number-page" >

    <input type="hidden" id="phone_number-title" value="{{ trans('cpanel/cpanel.menu.phone_number') }}" icon="phone">

    <div class="w100p row wrap alnSH jstfyS" id="security-addPhoneContainer">
        <x-content-window title="{{ trans('cpanel/security/phone.createPhoneNumber') }}" helpId="177" windowId="secutiry-phoneNumber-createPhoneWindow">
            <div class="mB20 mX10">
                <div>{{ trans('cpanel/security/phone.changePhoneText5') }}</div>
            </div>

            <div class="accountPhoneSelectContainer" id="accountPhoneSelectContainer-create">
                <div class="ico-phone_number accountPhoneSelectFlagIcon fs103 mX12" ></div>
                <img class="accountPhoneSelectFlag none" src="" alt="">
                <div class="mis-5 fs103 w10">+</div>
                <input class="accountPhoneSelectCountryCode" type="text">
                <input class="accountPhoneSelectPhoneNumber" id="phoneNumber-accountPhoneSelectPhoneNumber" type="text">
                <div class="accountPhoneSelectKeysListContainer none"></div>
            </div>
            <div class="btnContainer">
                <button class="btn" id="security-createPhone-btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                </button>
            </div>
        </x-content-window>

    </div>
    <div class="w100p row wrap alnSH jstfyS" id="security-phoneContainer">
        <x-content-window title="{{ trans('cpanel/security/phone.phoneNumber') }}" windowClass="grow2" helpId="178" >
            <x-input-text  id="security-phone" icon="ico-phone_number" value="{{ $account->phone }}" attr="readOnly" closeIcon="no" placeholder="{{ trans('cpanel/security/phone.phoneNumber') }}"/>
            <div class="area mT40" autoHelp="179">
                <div class="areaTitle">{{ trans('cpanel/security/phone.phoneVerification') }}</div>
                <div id="security-phoneNotVerified">
                    <div class="cO mxw330 taS mX10">{{ trans('cpanel/security/phone.phoneVerificatoinText1') }}</div>
                    <x-input-text id="security-verifyPhone" icon="ico-warning" placeholder="{{ trans('cpanel/security/phone.phoneVerificationCode') }}"  maxlength="6" />
                    <div class="btnContainer">
                        <button class="btn" id="security-resendVerifyPhone-btn">
                            <div class="btnLoading"></div>
                            <div class="btnTxt">{{ trans('cpanel/security/phone.resend') }}</div>
                        </button>
                        <button class="btn" id="security-verifyPhone-btn">
                            <div class="btnLoading"></div>
                            <div class="btnTxt">{{ trans('cpanel/security/phone.verify') }}</div>
                        </button>
                    </div>
                </div>
                <div id="security-phoneVerified" class="h100 column alnC jstfyC">
                    <div class="ico-success cG fs2 mY10"></div>
                    <div>{{ trans('cpanel/security/phone.phoneVerificatoinText2') }}</div>
                </div>
            </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/security/phone.changePhone') }}"  helpId="180" windowClass="grow2" contentClass="mA" >
            <div class="mB20 mX10">
                <div>{{ trans('cpanel/security/phone.changePhoneText1') }}</div>
                <div class="mY5">{{ trans('cpanel/security/phone.changePhoneText3') }}</div>
            </div>

            <div class="accountPhoneSelectContainer" id="accountPhoneSelectContainer-change">
                <div class="ico-phone_number accountPhoneSelectFlagIcon fs103 mX12" ></div>
                <img class="accountPhoneSelectFlag none" src="" alt="">
                <div class="mis-5 fs103 w10">+</div>
                <input class="accountPhoneSelectCountryCode" type="text">
                <input class="accountPhoneSelectPhoneNumber" type="text">
                <div class="accountPhoneSelectKeysListContainer none"></div>
            </div>
            <x-input-text type="password"  id="security-changePhone-password" icon="ico-password"  placeholder="{{ trans('cpanel/security/phone.changePhonePassword') }}"/>
            <div class="btnContainer">
                <button id="security-changePhone-btn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/security/phone.change') }}</div>
                </button>
            </div>
        </x-content-window>
    </div>


</div>
