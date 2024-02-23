<div class="nav">
    <div id="navTitle" class=""></div>
    <div class="navMenu">
        <div navListId="guideHintsList" class="navElement ico-warning" id="guideHints" tooltip="{{ trans('cpanel/cpanel.guideHints.guideHints') }}"><div class="navElementNum" id="guideHintsNumber"></div></div>
        <div navListId="menuOrdersList" class="navElement ico-orders authority_0" id="menuOrders" tooltip="{{ trans('cpanel/cpanel.public.incompleteOrders') }}"><div class="navElementNum incompleteOrdersSum"></div><div class="loading_navIconNum"></div></div>
        <div navListId="liveChatMsgsList" class="navElement ico-chat authority_5" id="liveChatMsgs" tooltip="{{ trans('cpanel/cpanel.liveChat.liveChat') }}"><div class="navElementNum liveChatMsgsNumber"></div><div class="loading_navIconNum"></div></div>
        <div navListId="notificationsList" class="navElement ico-notifications" id="notifications" tooltip="{{ trans('cpanel/cpanel.notifications.notifications') }}"><div class="navElementNum" id="notificationsNumber"></div><div class="loading_navIconNum"></div></div>
        <div navListId="menuList" class="navElement ico-menu1 relative" id="Menu" tooltip="{{ trans('cpanel/cpanel.menu.menu') }}"><div class="navMenu-unsaved none"></div></div>
    </div>
</div>

{{-- //////////////////////////////////////////////////////////////////////// --}}

<div class="navList none" id="menuList">
    <span class="bold600 fs102 inter mX10">{{ trans('cpanel/cpanel.menu.menu') }}</span>
    <div class="inputSearchContainer">
        <input class="inputSearch" placeholder="{{ trans('cpanel/cpanel.menu.searchTheMenu') }}" type="text" id="menuListSearch">
        <div class="inputSearchIcon ico-search"></div>
    </div>
</div>
<div class="navList none" id="notificationsList">
    <span class="bold600 fs101 inter mX10 mB5">{{ trans('cpanel/cpanel.notifications.notifications') }}</span>
    <div id="notificationsListConainer" class="mT10 w100p"></div>

</div>
<div class="navList none authority_5" id="liveChatMsgsList">
    <div class="row alnC jstfySB w100p ">
        <span class="bold600 fs101 inter mX10 mB5">{{ trans('cpanel/cpanel.liveChat.liveChat') }}</span>
        <span class="ico-seeMore" id="navLiveChat-optionsIcon"></span>
    </div>
    <div class="navLiveChat-optionsContainer none">
        <div class="bold fs101 mX10 mB10">{{ trans('cpanel/cpanel.liveChat.liveChatOptions') }}</div>
        <div class="row alnC jstfySB w100p-20 p10 br3 hvr-bg2 pointer fs09" id="navLiveChat-mute">
            <span>{{ trans('cpanel/cpanel.liveChat.muteChat') }}</span>
            <span class="mX10"></span>
            <span class="ico-check1 navLiveChat-muteCheck"></span>
        </div>
        <label class="checkboxlabel checkboxlabel_goInvisible">
            <span class="checkBoxContainerText">{{ trans('cpanel/cpanel.liveChat.goInvisible') }}</span>
            <input id="LiveChat-goInvisible" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX10"></span>
        </label>
        <label class="checkboxlabel checkboxlabel_goInvisible">
            <span class="checkBoxContainerText">{{ trans('cpanel/cpanel.liveChat.chatPopup') }}</span>
            <input id="LiveChat-chatPopup" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX10"></span>
        </label>
    </div>

    <div id="usersGuestsChatContainer">
        <div id="showUsersChatBoxes" class="usersGuestsChat">
            <div>{{ trans('cpanel/cpanel.liveChat.users') }}</div>
            <div class="liveChatTabIconUnseen"></div>
        </div>
        <div id="showGuestsChatBoxes" class="usersGuestsChat" >
            <div>{{ trans('cpanel/cpanel.liveChat.guests') }}</div>
            <div class="liveChatTabIconUnseen_guests"></div>
        </div>
    </div>

    <div id="chatBoxesContainer" class="w100p"></div>
    <div id="chatBoxesContainer_loading" class="w100p"></div>

    <div><div id="noliveChatMsgs" class="fs085 mX10 mB10 none">{{ trans('cpanel/cpanel.liveChat.noLiveChatMsgs') }}</div></div>
    <div><div id="noliveChatMsgs_guests" class="fs085 mX10 mB10 none">{{ trans('cpanel/cpanel.liveChat.noLiveChatMsgs') }}</div></div>

</div>
<div class="navList none" id="menuOrdersList">
    <span class="bold600 fs101 inter mX10 mB10">{{ trans('cpanel/cpanel.public.incompleteOrders') }}</span>
    <div id="noMenuOrders" class="fs085 mX10 mB20 none">{{ trans('cpanel/cpanel.public.noMenuOrders') }}</div>
    <div id="menuOrders-pending" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="pending">
        <div class="row alnC jstfyC">
            <span class="ico-pending mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.pending') }}</span>
        </div>
        <div class="pendingOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-accepted" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="accepted">
        <div class="row alnC jstfyC">
            <span class="ico-accepted mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.accepted') }}</span>
        </div>
        <div class="acceptedOrdersSum fs09 mX3">0</div>
    </div>


    <div id="menuOrders-our_for_delivery" class="menuOrders-element  cpPage" cpPage="incomplete_orders" openTab="out_for_delivery">
        <div class="row alnC jstfyC">
            <span class="ico-delivery mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.out_for_delivery') }}</span>
        </div>
        <div class="our_for_deliveryOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-ready_for_pickup" class="menuOrders-element cpPage" cpPage="incomplete_orders" openTab="ready_for_pickup">
        <div class="row alnC jstfyC">
            <span class="ico-pickup mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.ready_for_pickup')}}</span>
        </div>
        <div class="ready_for_pickupOrdersSum fs09 mX3">0</div>
    </div>
    <div id="menuOrders-dinginin" class="menuOrders-element  cpPage" cpPage="incomplete_orders" openTab="dining_in">
        <div class="row alnC jstfyC">
            <span class="ico-dineIn mX5 fs09"></span>
            <span class="fs09">{{ trans('cpanel/orders/texts.diningIn') }}</span>
        </div>
        <div class="dingininOrdersSum fs09 mX3">0</div>
    </div>
</div>
<div class="navList none" id="guideHintsList">
    <span class="bold600 fs101 inter mX10 mB5">{{ trans('cpanel/cpanel.guideHints.guideHints') }}</span>
    <div id="noGuideHints" class="fs085 mX10 mB10 none">{{ trans('cpanel/cpanel.guideHints.noGuideHints') }}</div>
    <div id="guideHintsContainer" class="w100p mT10"></div>
</div>
