<div class="nav">
    <div id="navTitle" class="">
        {{-- <img class="w25 h25 " /> --}}
        {{-- <div class="mis-5 fs205 bold500 inter">{{ $website->domainName }}</div> --}}
    </div>
    <div class="navMenu">
        <div class="navElement ico-warning" id="guideHints" tooltip="{{ trans('cpanel/cpanel.guideHints.guideHints') }}"><div class="navElementNum" id="guideHintsNumber"></div></div>
        <div class="navElement ico-orders authority_0" id="menuOrders" tooltip="{{ trans('cpanel/cpanel.public.incompleteOrders') }}"><div class="navElementNum incompleteOrdersSum"></div><div class="loading_navIconNum"></div></div>
        <div class="navElement ico-chat authority_5" id="liveChatMsgs" tooltip="{{ trans('cpanel/cpanel.liveChat.liveChat') }}"><div class="navElementNum liveChatMsgsNumber"></div><div class="loading_navIconNum"></div></div>
        <div class="navElement ico-notifications" id="notifications" tooltip="{{ trans('cpanel/cpanel.notifications.notifications') }}"><div class="navElementNum" id="notificationsNumber"></div><div class="loading_navIconNum"></div></div>
        <div class="navElement ico-menu1 relative" id="Menu" tooltip="{{ trans('cpanel/cpanel.menu.menu') }}"><div class="navMenu-unsaved none"></div></div>
    </div>
</div>

{{-- //////////////////////////////////////////////////////////////////////// --}}




@include('cpanel.cpanel.nav.menu')
@include('cpanel.cpanel.nav.notifications')
@include('cpanel.cpanel.nav.liveChat')
@include('cpanel.cpanel.nav.menuOrders')
@include('cpanel.cpanel.nav.guideHints')
