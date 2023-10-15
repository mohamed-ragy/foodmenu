<div class="registerForm none"  step="1">
    <div class="column alnS jstfyS alnsS">
        <div class="row alnBL jstfyS mB30">
            <div class="ico-user fs104 mie-10"></div>
            <div class="fs105 bold taS">{{ trans('foodmenu/register.createAccount') }}</div>
        </div>
        <div class="fs09 mxw400 taS">{{ trans('foodmenu/register.createAccount2') }}</div>
        <div class="fs09 mxw400 taS">{!! trans('foodmenu/register.createAccount3') !!}</div>
    </div>
    <div class="w100p pT20 mT20 brdrT1">
        <div class="row alnS jstfyC wrap">
            <div class="inputTextContainer_C">
                <div class="inputTextContainer mT20 mB5">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-user"></span>
                    </div>
                    <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.name') }}" id="name" autocomplete="new-password" >
                    <span class="inputText-clearVal clearVal ico-close"></span>
                </div>
                <div id="name_error" class="inputTxtError"></div>
            </div>
            <div class="inputTextContainer_C">
                <div class="inputTextContainer mT20 mB5">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-email_address"></span>
                    </div>
                    <input class="inputText pY10" type="text" placeholder="{{ trans('foodmenu/register.email') }}" id="email" autocomplete="new-password" >
                    <span class="inputText-clearVal clearVal ico-close"></span>
                </div>
                <div id="email_error" class="inputTxtError"></div>
            </div>
        </div>
        <div class="row alnS jstfyC wrap">
            <div class="inputTextContainer_C">
                <div class="inputTextContainer mT20">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-password"></span>
                    </div>
                    <input class="inputText pY10" type="password" placeholder="{{ trans('foodmenu/register.password') }}" id="password" autocomplete="new-password" >
                    <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide"></span>
                </div>
                <div id="password_error" class="inputTxtError"></div>
            </div>
            <div class="inputTextContainer_C">
                <div class="inputTextContainer mT20">
                    <div class="inputTextIcon pX10" >
                        <span class="ico-password"></span>
                    </div>
                    <input class="inputText pY10" type="password" placeholder="{{ trans('foodmenu/register.passwordConfirm') }}" id="passwordConfirm" autocomplete="new-password" >
                    <span class="inputText-clearVal fs102 ico-showPassword passwordShowHide"></span>
                </div>
                <div id="passwordConfirm_error" class="inputTxtError"></div>
            </div>
        </div>
        <div class="taS row alnBL jstfyS w100p-60 mX30 agreeCheck pointer mT20">
            <div id="agree1Check" class="ico-check0 fs08 mie-5"></div>
            <div class="fs09">{!! trans('foodmenu/register.agree1') !!}</div>
        </div>
        <div class="taS row alnBL jstfyS w100p-60 mX30 agreeCheck pointer">
            <div id="agree2Check" class="ico-check0 fs08 mie-5"></div>
            <div class="fs09">{!! trans('foodmenu/register.agree2') !!}</div>
        </div>
        <div class="taS row alnBL jstfyS w100p-60 mX30 agreeCheck pointer">
            <div id="agree3Check" class="ico-check0 fs08 mie-5"></div>
            <div class="fs09">{!! trans('foodmenu/register.agree3') !!}</div>
        </div>
        <div class="mX30 taS cR fs09" id="agree1Error"></div>
        <div class="mX30 taS cR fs09" id="agree2Error"></div>
    </div>
    <div class="btnContainer">
        <button class="btn" id="step1Btn">
            <div class="btnLoading"></div>
            <div class="btnTxt">{{  trans('foodmenu/register.next') }}</div>
        </button>
    </div>
</div>
