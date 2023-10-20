<div class="navList authority_5" id="liveChatMsgsList">
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
