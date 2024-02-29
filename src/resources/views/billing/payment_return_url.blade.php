<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ trans('billing.description') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="/css/billing/billing.css">
    <title>{!! trans('billing.title') !!}</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>
@include('page_loading')
<body>
    <div class="ma taC">
        <div id="message"></div>
        <a class="backToBillingCenter w100p taC fs101 mY40" href="{{ env('BILLING_CENTER_URL') }}/{{ $lang }}/">{{ trans('billing.payment_return_url.backToBillingCenter') }}</a>
    </div>
    @include('billing.footer')
</body>
<script>
    let paymentType = "{!! $payment !!}"
    let texts =  {!! $texts !!}
</script>
<script src="/js/billing/payment_return_url.js"></script>
</html>
