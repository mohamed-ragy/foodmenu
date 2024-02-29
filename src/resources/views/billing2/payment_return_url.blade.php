@extends('billing.layout')
@section('title'){!! trans('billing.title') !!}@endsection
@section('description'){{ trans('billing.description') }}@endsection
@section('head')
<script src="https://js.stripe.com/v3/"></script>
@endsection
@section('body')

    <div class="loading loading_L mY20 vV"></div>
    <div id="message"></div>
    <a class="backToBillingCenter none w100p taC fs101 mY40" href="{{ env('BILLING_CENTER_URL') }}/{{ $lang }}/">{{ trans('billing.payment_return_url.backToBillingCenter') }}</a>

@endsection
@section('footer')
<script>
    let paymentType = "{!! $payment !!}"
    let texts =  {!! $texts !!}
</script>
<script src="/js/billing/payment_return_url.js"></script>
@endsection
