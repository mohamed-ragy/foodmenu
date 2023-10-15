<div class="pageWrapper" id="online_users-page">
    <input type="hidden" id="online_users-title" value="{{ trans('cpanel/cpanel.menu.online_users') }}" icon="online">

    <x-content-window title="{{ trans('cpanel/users/onlineUsers.onlineUsers') }}" helpId="119" windowClass="contentWindow_100p">

        <div class="row alnC jstfyC w100p-20 m10 ">
            <span class="ico-online online-icon"></span>
            <span class="fs102 mX5 bold">{{ trans('cpanel/users/onlineUsers.onlineStatus') }}</span>
            <span class="fs102 bold">(<span class="onlineUsersSum mX3">0</span>)</span>
        </div>

        <div id="onlineUsers-onlineUsersContainer" class="m10 mT40 w100p-20 row wrap alnSH jstfyC "></div>
    </x-content-window>

</div>
