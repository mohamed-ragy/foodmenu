@extends('billing.layout')
@section('title'){!! trans('billing.title') !!}@endsection
@section('description'){{ trans('billing.description') }}@endsection
@section('head')
<script src="https://js.stripe.com/v3/"></script>
@endsection
@section('body')
<div class="mB40 fs09 row alnC jstfySB w100p">
    <div id="header" class="mB40 fs09 row alnC jstfyS"></div>
    <div id="balance"></div>
</div>

{{-- <div id="message" class="mB40"></div> --}}

@include('billing.pages.home')
@include('billing.pages.updatePlan')



@section('footer')

<div class="popupContainer none">
    <div class="popup">
        <div class="popupHead">
            <div id="popupHeadTitle" class="fs103 ellipsis p10"></div>
            <div class="ico-close popupClose p10 pointer"></div>
        </div>
        <div class="popupBody">
            @include('billing.pages.paymentForm')
            @include('billing.pages.activatePlan')
            @include('billing.pages.deletePaymentConfirm')
            @include('billing.pages.cancelSubscription')
            @include('billing.pages.updateSubscription')
            @include('billing.pages.refund')
        </div>
    </div>
</div>
<script src="/js/billing/billing.js"></script>
@endsection
<script>
    let plans = {!! $plans !!};
    let data = {!! $data !!};
    let texts = {!! $data['texts'] !!};
</script>
@endsection

