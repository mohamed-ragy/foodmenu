<div class="pageWrapper" id="create_new_user-page">
<input type="hidden" id="create_new_user-title" value="{{ trans('cpanel/cpanel.menu.create_new_user') }}" icon="createNewUser">
    <x-content-window title="{{ trans('cpanel/users/createNewUser.title') }}" helpId="112" windowClass="contentWindow_100p">
            <x-input-text id="createNewUser-email" icon="ico-email_address" placeholder="{{ trans('cpanel/users/createNewUser.email') }}" autoHelp="113" />
            <x-input-text id="createNewUser-password" icon="ico-password" type="password" placeholder="{{ trans('cpanel/users/createNewUser.password') }}" autoHelp="114" />
            <x-input-text id="createNewUser-name" icon="ico-user" placeholder="{{ trans('cpanel/users/createNewUser.name') }}" autoHelp="115" />
            <x-input-text id="createNewUser-phoneNumber" icon="ico-phone_number" placeholder="{{ trans('cpanel/users/createNewUser.phoneNumber') }}" type="number" autoHelp="117" />
            <x-input-text id="createNewUser-address" icon="ico-address" placeholder="{{ trans('cpanel/users/createNewUser.address') }}" class="inputText_100p" containerClass="w100p"  autoHelp="116"/>
            <div class="area"  autoHelp="238">
                <span class="areaTitle">{{ trans('cpanel/users/createNewUser.userLocation') }}</span>
                <div id="createNewUser-Location" class="m10 w100p-20 h250 zx1"></div>
                <div class="btnContainer">
                    <button id="createNewUser-unsetLocation" class="btn btn-cancel">{{ trans('cpanel/users/createNewUser.userUnsetLocation') }}</button>
                </div>
            </div>

            <div class="btnContainer"  autoHelp="118">
                <button id="createNewUser-createBtn" class="btn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/users/createNewUser.createUser') }}</div>
                </button>
            </div>
    </x-content-window>
</div>
