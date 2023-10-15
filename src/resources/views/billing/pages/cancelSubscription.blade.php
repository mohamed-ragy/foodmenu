<div class="popupPage none" page="cancelSubscription">
    {{-- <div class="fs103 bold w100p taC">{{ trans('billing.cancelSubscriptionPopupTxt1') }}</div> --}}
    <div class="fs103 bold">{{ trans('billing.cancelSubscriptionPopupTxt2') }}</div>
    <ul class="mT5">
        <li>{{ trans('billing.cancelSubscriptionPopupTxt3') }}</li>
        <li>{{ trans('billing.cancelSubscriptionPopupTxt4') }}</li>
        <li>{{ trans('billing.cancelSubscriptionPopupTxt5') }}</li>
    </ul>
    <div class="row alnC jstfyE w100p mT40">
        <button class="btn btn-delete" id="cancelSubscriptionBtn">
            <div class="btnTxt">{{ trans('billing.cancelSubscription') }}</div>
            <div class="btnLoading"></div>
        </button>
        <button class="btn btn-cancel popupClose">{{ trans('billing.keepMySubscription') }}</button>
    </div>
    <div class="cancelSubscriptionMessage mY20"></div>

</div>
