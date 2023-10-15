<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="manage_users" value="{{ trans('cpanel/cpanel.menu.manage_users') }}" icon="users">
    <x-content-window windowId="User"  windowClass="contentWindow_100p" >
        <div class="column alnS jstfyS mnw300" id="UserPageContent_loading">
            <div class="row alnC jstfyC mX5 mB10">
                <div class="br50p cardLoading h20 w20"></div>
                <div class="mX5 cardLoading h8 w70 br10"></div>
            </div>
            <div class="row wrap alnS jstfyS w100p-20 pX10">
                <div class="br3 cardLoading h20 w20 mX5"></div>
                <div class="br3 cardLoading h20 w20 mX5"></div>
                <div class="br3 cardLoading h20 w20 mX5"></div>
                <div class="br3 cardLoading h20 w20 mX5"></div>
            </div>
            <div class="area column alnS jstfyS">
                <div class="mX5 mY5 cardLoading h8 w100 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w150 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w100 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w200 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w50 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w50 br10"></div>
            </div>
            <div class="area column alnS jstfyS">
                <div class="mX5 mY5 cardLoading h8 w100p-10 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w100p-10 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w100p-10 br10"></div>
                <div class="mX5 mY5 cardLoading h8 w100p-10 br10"></div>
            </div>
        </div>
        <div class="column alnS jstfyS mnw300" id="UserPageContent">
            <div class="row alnC jstfyC mX10">
                <div class="ico-user fs103" id="userPage-icon"></div>
                <div class="fs103 mX5" id="userPage-name"></div>
            </div>
            <div class="mX10 row alnC jstfyC mB5">
                <div id="userPage-onlineStatus"></div>
                <div id="userPage-UserActions"></div>
            </div>
            <div class="row wrap alnS jstfyS w100p-20 pX10">
                <div class="authority_5 ico-chat action_chat userPage-icon" user=></div>
                <div class="authority_0 ico-orders userPage-icon cpPage" cpPage="order_history" id="userPage-orders" tooltip="{{ trans('cpanel/users/onlineUsers.orders') }}"></div>
                <div class="authority_1 ico-star userPage-icon cpPage" cpPage="product_reviews" id="userPage-reviews" tooltip="{{ trans('cpanel/users/onlineUsers.reviews') }}"></div>
                <div class="authority_2 ico-settings userPage-icon cpPage" cpPage="manage_users" id="userPage-manage" tooltip="{{ trans('cpanel/users/onlineUsers.manage') }}"></div>
            </div>
            <div class="area column alnS jstfyS">
                <div class="areaTitle">{{ trans('cpanel/users/manageUsers.userInfo') }}</div>
                <div class="mX10 row alnC jstfyC mY3 ">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userEmail').': ' }}</div>
                    <div id="userPage-email" class="mX5"></div>
                </div>
                <div class="mX10 row alnC jstfyC mY3 ">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userPhoneNumber').': ' }}</div>
                    <div id="userPage-phone" class="mX5"></div>
                </div>
                <div class="mX10 row alnC jstfyC mY3 ">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userAddress').': ' }}</div>
                    <div id="userPage-address" class="mX5"></div>
                </div>
                <div class="mX10 row alnC jstfyC mY3 ">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userSignedUp').': ' }}</div>
                    <div id="userPage-signedUp" class="mX5"></div>
                </div>
                <div class="mX10 row alnC jstfyC mY3 authority_0">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userOrdersPlaced').': ' }}</div>
                    <div id="userPage-ordersPlaced" class="mX5"></div>
                </div>
                <div class="mX10 row alnC jstfyC mY3 authority_1">
                    <div class="bold c-inpttxt">{{ trans('cpanel/users/manageUsers.userPostedReviews').': ' }}</div>
                    <div id="userPage-postedReviews" class="mX5"></div>
                </div>
            </div>

            <div class="area pB0">
                <div class="areaTitle">{{ trans('cpanel/users/manageUsers.userCart') }}</div>
                <div class="w100p-10 p5" id="userPage-cart"></div>
            </div>
        </div>
    </x-content-window>
</div>
