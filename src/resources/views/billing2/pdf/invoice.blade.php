<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ trans('billing.invoice.title').'#'.$invoice->foodmenu_id }}</title>
    <link rel="stylesheet" href="/css/billing/invoice.css">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
</head>
<body>

    <table class="w100p">
        <tr class="">
            <td class="taS fs108 bold">
                {{ trans('billing.invoice.invoice') }}
            </td>
            <td class="taE">
                <img src="/storage/logo/logo.png" class="w50" alt="Foodmenu">
            </td>
        </tr>
    </table>

    <table class="fs09 w100p">
        <tr class="brdrB1">
            <td class="pR20">{{ trans('billing.invoice.invoiceNumber') }}</td>
            <td class="pL20">{{ $invoice->foodmenu_id }}</td>
        </tr>
        <tr class="brdrB1">
            <td class="pR20">{{ trans('billing.invoice.date') }}</td>
            <td class="pL20">{{ $invoice->date }}</td>
        </tr>
        <tr class="brdrB1">
            <td class="pR20">{{ trans('billing.invoice.status') }}</td>
            <td class="pL20">{{ trans('billing.'.$invoice->status) }}</td>
        </tr>
        @if ($invoice->paid_at != null)
        <tr class="brdrB1">
            <td class="pR20">{{ trans('billing.invoice.paid_at') }}</td>
            <td class="pL20">{{ trans($invoice->paid_at) }}</td>
        </tr>
        @endif
        <tr class="">
            <td class="pR20">{{ trans('billing.invoice.billTo') }}</td>
            <td class="pL20">
                <div>{{ $invoice->website->domainName }}</div>
                <div>{{ $invoice->accountEmail }}</div>

            </td>
        </tr>
    </table>

    <table class="w100p mT80 fs09">
        <tr class="brdrB1 ">
            <td class="taS pR10 pB5">{{ trans('billing.invoice.description') }}</td>
            <td class="taE pL10 pB5">{{ trans('billing.invoice.amount') }}</td>
        </tr>
        @foreach($invoice->invoice_items as $invoiceItem)
        <tr class="">
            <td class="taS pR10 pB5">{{ $invoiceItem->description }}</td>
            <td class="taE pL10 pB5">${{ $invoiceItem->amount }}</td>
        </tr>
        @endforeach
        <tr class="">
            <td class="taS pR10 pB5 bold">{{ trans('billing.invoice.total') }}</td>
            <td class="taE pL10 pB5 bold">${{ $invoice->total }}</td>
        </tr>
    </table>
    <table class="w50p mT40 fs09" style="margin-left:auto;">
        {{-- <tr class=" ">
            <td class="taE w50p fs09">
                <table class="w100p brdrT1"> --}}
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.amountDue') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->amount_due }}</td>
                    </tr>
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.amountPaid') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->amount_paid }}</td>
                    </tr>
                    @if($invoice->status != 'uncollectible' && $invoice->status != 'void')
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.amountRemaining') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->amount_remaining }}</td>
                    </tr>
                    @endif
                    @if($invoice->amount_refunded > 0)
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.amountRefunded') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->amount_refunded_txt }}</td>
                    </tr>
                    @endif
                    {{-- @if($invoice->status == 'paid')
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.startingBalance') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->starting_balance }}</td>
                    </tr>
                    <tr class="brdrT1">
                        <td class="taS w50p pY5">{{ trans('billing.invoice.endingBalance') }}</td>
                        <td class="taE w50p pY5">${{ $invoice->ending_balance }}</td>
                    </tr>
                    @endif --}}

                {{-- </table> --}}
            {{-- </td> --}}
        {{-- </tr> --}}
    </table>

</body>
</html>
