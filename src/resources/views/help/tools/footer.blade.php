<footer class="">
    <div class="w100p row wrap alnS jstfyS">
        <div class="mX30 mY20 fs09">
            <div class="">
                <span class="mis-1 ico-support fs09"></span>
                <span>{{ trans('help/help.footer.needMoreHelp') }}</span>
                <a href="{{ env('APP_URL') }}/{{ $lang }}/contact-us">{{ trans('help/help.footer.contactus') }}</a>.
            </div>
            <div class=" mT5">
                <span class="ico-lamp"></span>
                <span>{{ trans('help/help.footer.haveAnIdea') }}</span>
                <a href="{{ env('APP_URL') }}/{{ $lang }}/share-your-idea">{{ trans('help/help.footer.shareitwithus') }}</a>.
            </div>
        </div>
        <div class="mX30 mY20 column alnS jstfyS">
            <div class="bold mB5">{{ trans('help/help.footer.quickLinks') }}</div>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}">{{ trans('help/help.footer.fodmenuHome') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/pricing">{{ trans('help/help.footer.pricing') }}</a>
            @if(\Auth::guard('account')->check())
            <a class="fs09 mis-5" href="{{ env('CPANEL_URL') }}">{{ trans('help/help.controlPanel') }}</a>
            @else
            <a class="fs09 mis-5" href="{{ env('CPANEL_URL') }}/login">{{ trans('help/help.signin') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/register">{{ trans('help/help.getStarted') }}</a>
            @endif
            <a class="fs09 mis-5" href="{{ env('BILLING_CENTER_URL') }}/{{ $lang }}">{{ trans('help/help.footer.billingCenter') }}</a>
            <a class="fs09 mis-5" href="{{ env('DELIVERY_HUB_URL') }}/">{{ trans('help/help.footer.deliveryGate') }}</a>
        </div>
        <div class="mX30 mY20 column alnS jstfyS">
            <div class="bold mB5">{{ trans('help/help.footer.solutions') }}</div>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/solutions/restaurant-website">{{ trans('help/help.footer.restaurantWebsite') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/solutions/online-ordering-system">{{ trans('help/help.footer.onlineOrderingSystem') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/solutions/restaurant-management-tools">{{ trans('help/help.footer.restaurantManagementTools') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/solutions/performance-analytics">{{ trans('help/help.footer.performanceAnalytics') }}</a>
        </div>
        <div class="mX30 mY20 column alnS jstfyS">
            <div class="bold mB5">{{ trans('help/help.footer.support') }}</div>
            <a class="fs09 mis-5" href="{{ env('CPANEL_URL') }}/?page=submit_a_help_ticket">{{ trans('help/help.footer.submitHelpTicket') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/faq">{{ trans('help/help.footer.faq') }}</a>
            <a class="fs09 mis-5" href="{{ env('APP_URL') }}/{{ $lang }}/service-status">{{ trans('help/help.footer.serviceStatus') }}</a>

        </div>
    </div>
</footer>
