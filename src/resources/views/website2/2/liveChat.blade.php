<div id="liveChatIconContainer">

    @if ($website->liveChat)
    @if ($website->guestLiveChat || Auth::guard('user')->check())
    <div class="liveChatContainer none">
        <div id="liveChatHead">
            <div class="row alnC jstfyC">
                <span id="liveChatOnline" class="none" Showtooltip="liveChat.online"></span>
                <span id="liveChatOffline" class="" Showtooltip="liveChat.offline"></span>
                <span class="mX-5 fs-103 restaurantName"></span>
            </div>
            <div class="ic-close pointer" id="liveCloseChat"></div>
        </div>
        <div id="liveChatLoading" class="loadingChat none mX-a mT-20 zx-10 w-100p" style="top:35px;left:0;">
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div id="liveChatBody"></div>

        <form id="liveChatFooter" disabled>
            <input type="text" name="" autocomplete="new-password" showPlaceholder="liveChat.YourMessage"  id="liveChatmsgInput">
            <div class="ic-send fs-105 pointer" id="liveChatmsgBtn" showtooltip="liveChat.send"></div>
        </form>
        <div class="ic-down liveChatScrollToTop"></div>
        <div class="liveChatFixedDate"></div>
        <div class="liveChatSendingMsgCoolDown" showText="liveChat.sendMessageCoolDown"></div>
        <div class="liveChatTyping">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    @endif
    @endif
    <div>
        <div class="relative">
            <div id="cartIcon" Showtooltip="orders.cart" class="ic-cart cart"></div>
            <div class="cartItemsNumber cartIconNumber">
                <div></div>
            </div>
        </div>
        @if ($website->liveChat)
        <div class="relative">
            <div id="liveChatIcon" Showtooltip="liveChat.liveChat" class="ic-chat"></div>
            <div class="liveChatIconNumber none">
                <div></div>
            </div>
        </div>
        @endif
    </div>
</div>
