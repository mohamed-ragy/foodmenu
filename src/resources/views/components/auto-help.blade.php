<div class="autoHelpContainer none" helpNumber="{{ $helpNumber ?? '' }}">
    <div class="autoHelpHead">
        <div class="autoHelpTitle">
            <span>{{ $title ?? '' }}</span>
        </div>
        <div class="autoHelpHeadIcons">
            <span class="ico-minimize autoHelpHeadIcon autoHelpMinMax "tooltip="{{ trans('cpanel/cpanel.public.minimize') }}" ></span>
            <span class="ico-close fs08 autoHelpHeadIcon autoHelpClose" tooltip="{{ trans('cpanel/cpanel.public.close') }}" ></span>
        </div>
    </div>
    <div class="autoHelpContent">
        {{ $slot }}
    </div>
    <div class="autoHelpRateContainer">
        <span class="ico-fullScreen autoHelpBottomIcon autoHelpFullScreenClass" tooltip="{{ trans('cpanel/cpanel.public.fullScreen') }}" ></span>
        <span class="ico-unbin autoHelpBottomIcon autoHelpPinUnpin" tooltip="<div><span>{{ trans('cpanel/cpanel.public.pin') }} </span><span class='hotKeys'>{{ trans('cpanel/cpanel.hotKeys.binUnbinHotKey') }}</span></div>"></span>
        <span class="fs1 ico-thumbsUp autoHelpBottomIcon autoHelpUp" tooltip="{{ trans('cpanel/cpanel.public.helpful') }}"></span>
        <span class="fs1 ico-thumbsDown autoHelpBottomIcon autoHelpDown" tooltip="{{ trans('cpanel/cpanel.public.unhelpful') }}"></span>
    </div>
</div>

