<div class="registerForm none"  step="4">
    <div class="column alnS jstfyS alnsS">
        <div class="row alnBL jstfyS mB30">
            <div class="ico-rocket fs104 mie-10"></div>
            <div class="fs105 bold taS">{{ trans('foodmenu/register.installationComplete') }}</div>
        </div>
        <div class="fs09 mxw400 taS">{{ trans('foodmenu/register.installationComplete2') }}</div>
    </div>

    <div class="w100p row wrap alnC jstfyC">
        <a target="_blank" href="{{ env('CPANEL_URL') }}" class="step4Icon">
            <div class="ico-control_panel_settings fs4"></div>
            <div class="mT20 fs103">Control Panel</div>
        </a>
        <a target="_blank" href="{{ env('APP_URL_HTTP') }}{{ $restaurantId }}.{{ env('APP_DOMAIN') }}" id="step4WebsiteLink" class="step4Icon">
            <div class="ico-link fs4"></div>
            <div class="mT20 fs103">Your Website</div>
        </a>
        <a target="_blank" href="{{ env('HELP_CENTER_URL') }}" class="step4Icon">
            <div class="ico-support fs4"></div>
            <div class="mT20 fs103">Help Center</div>
        </a>
    </div>
</div>
