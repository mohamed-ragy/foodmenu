<div class="pageWrapper" id="manage_users-page">
    <input type="hidden" id="manage_users-title" value="{{ trans('cpanel/cpanel.menu.manage_users') }}" icon="users">

    <x-content-window title="{{ trans('cpanel/users/manageUsers.manageUser') }}" helpId="122" windowClass="contentWindow_100p">

        <div class="area" autoHelp="120">
            <span class="areaTitle">{{ trans('cpanel/users/manageUsers.usersList') }}</span>
            <x-input-list id="manageUsers-usersInputList" listId="manageUsers-usersInputListList" class="findUser" listClass="findUserList" listLoading="no" icon="ico-users" placeholder="{{ trans('cpanel/cpanel.public.findUser') }}" />
            <div class="btnContainer">
                <button class="btn" id="manageUsers-loadUserBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.find') }}</div>
                </button>
            </div>
        </div>
        <div class="none w100p" id="editUser-container">

            <div class="column alnS jstfyS mB20">
                <div class="row alnC jstfyC mX10">
                    <div class="ico-user fs103" id="editUser-icon"></div>
                    <a class="fs103 mX5 popupPage" popupPage="User" id="editUser-name"></a>
                </div>
                <div class="mX10 row alnC jstfyC mB5">
                    <div id="editUser-onlineStatus"></div>
                    <div id="editUser-UserActions"></div>
                </div>
                <div class="row wrap alnC jstfyC pX10">
                    <div class="authority_5 ico-chat action_chat userPage-icon"></div>
                    <div class="authority_0 ico-orders userPage-icon cpPage" cpPage="order_history" id="editUser-orders" tooltip="{{ trans('cpanel/users/onlineUsers.orders') }}"></div>
                    <div class="authority_1 ico-star userPage-icon cpPage" cpPage="product_reviews" id="editUser-reviews" tooltip="{{ trans('cpanel/users/onlineUsers.reviews') }}"></div>
                    <div class="authority_2 ico-no userPage-icon" id="editUser-banBtn"><div class="loading_s none"></div></div>
                </div>
            </div>
            <div class="mY20 pT10 brdrT1 w100p column alnS jstfyS">
                <div class="unsaved wFC fs102 mX10" id="editUser-noSave" tooltip="{{ trans('cpanel/cpanel.public.unsaved') }}"><span class="ico-warning mX5"></span></div>
                <x-input-text id="editUser-email" icon="ico-email_address" placeholder="{{ trans('cpanel/users/createNewUser.email') }}" autoHelp="113" />
                <div class="w100p row alnC jstfyS">
                    <x-input-text id="editUser-password" icon="ico-password" type="password" placeholder="{{ trans('cpanel/users/createNewUser.password') }}" autoHelp="114" />
                    <div class="ico-info fs101" tooltip="{{ trans('cpanel/users/manageUsers.editPassowrdNote') }}"></div>
                </div>

                <x-input-text id="editUser-name" icon="ico-user" placeholder="{{ trans('cpanel/users/createNewUser.name') }}" autoHelp="115" />
                <x-input-text id="editUser-phoneNumber" icon="ico-phone_number" placeholder="{{ trans('cpanel/users/createNewUser.phoneNumber') }}" autoHelp="117" />
                <x-input-text id="editUser-address" icon="ico-address" placeholder="{{ trans('cpanel/users/createNewUser.address') }}" class="inputText_100p" containerClass="w100p"  autoHelp="116"/>
                <div class="area"  autoHelp="238">
                    <span class="areaTitle">{{ trans('cpanel/users/createNewUser.userLocation') }}</span>
                    <div id="editUser-Location" class="m10 w100p-20 h250 zx1"></div>
                    <div class="btnContainer">
                        <button id="editUser-unsetLocation" class="btn btn-cancel">{{ trans('cpanel/users/createNewUser.userUnsetLocation') }}</button>
                    </div>
                </div>
                <div class="btnContainer">
                    <button id="editUser-cancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="editUser-saveBtn" class="btn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                    </button>
                </div>
            </div>
        </div>
    </x-content-window>
</div>
