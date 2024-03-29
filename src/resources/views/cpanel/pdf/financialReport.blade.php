<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $report->websites->domainName.' '.trans('cpanel/financialReport.financialReport').' '.$date }}</title>
    <link rel="stylesheet" href="css/cpanel/financialReport.css?v=1">
</head>
<body>
        <table class="w100p brdr-Bot pB10">
            <tr>
                <td class="fs2">{{ strtoupper($report->websites->domainName).' ' }}</td>
            </tr>
            <tr>
                <td class="taS">{{ trans('cpanel/financialReport.financialReport2')}}</td>
                <td class="taE">{{ $date }}</td>
            </tr>
        </table>

        <table class="mT30">
            <tr class="tHC">
                <td class="taS fs104">{{ trans('cpanel/financialReport.income') }}</td>
                <td class="taE"></td>
            </tr>
            <tr class="c2">
                <td class="taS">{{ trans('cpanel/financialReport.itemsTotal') }}</td>
                <td class="taE">{{ $report->items_total }}</td>
            </tr>
            <tr class="c1">
                <td class="taS">{{ trans('cpanel/financialReport.tax') }}</td>
                <td class="taE">{{ $report->tax }}</td>
            </tr>
            <tr class="c2">
                <td class="taS">{{ trans('cpanel/financialReport.delivery') }}</td>
                <td class="taE">{{ $report->delivery }}</td>
            </tr>
            <tr class="c1">
                <td class="taS">{{ trans('cpanel/financialReport.service') }}</td>
                <td class="taE">{{ $report->service }}</td>
            </tr>
            <tr class="c2 brdr-top">
                <td class="taS fs103">{{ trans('cpanel/financialReport.total') }}</td>
                <td class="taE fs103">{{ $currency }}{{ $report->total }}</td>
            </tr>
        </table>
        <table class="mT30">
            <tr class="tHC">
                <td class="taS fs104">{{ trans('cpanel/financialReport.expenses') }}</td>
                <td class="taE"></td>
            </tr>
            @php
            $expenseColor = 1;
            $expensesTotal = 0;
            $color = ''
            @endphp
            @foreach ($report->expenses as $expense)
            @php
            if($expenseColor == 0){
                $color = 'c1';
                $expenseColor = 1;
            }else{
                $color = 'c2';
                $expenseColor = 0;
            }
            @endphp

            <tr class="{{ $color }}">
                <td class="taS">{{ $expense['name'] }}</td>
                <td class="taE">{{ number_format($expense['amount'],2) }}</td>
            </tr>
            @endforeach
            @php
            $color = ''
            @endphp
            @foreach ($report->month_expenses as $expense)
            @php
            if($expenseColor == 0){
                $color = 'c1';
                $expenseColor = 1;
            }else{
                $color = 'c2';
                $expenseColor = 0;
            }
            @endphp
            <tr class="{{ $color }}">
                <td class="taS">{{ $expense['name'] }}</td>
                <td class="taE">{{ number_format($expense['amount'],2) }}</td>
            </tr>
            @endforeach
            <tr class="{{ $report->expensesTotalColor }} brdr-top">
                <td class="taS fs103">{{ trans('cpanel/financialReport.total') }}</td>
                <td class="taE fs103">{{ $currency }}{{ $report->expensesTotal }}</td>
            </tr>
        </table>
        <table class="mT30 brdrT1 brdrB1">
            <tr class="tHC">
                <td class="taS bold fs103">{{ $report->reportTotalTxt }}</td>
                <td class="taE bold fs103">{{ $currency }}{{ $report->profits }}</td>
            </tr>
        </table>
      <div class="mT30">{{ trans('cpanel/financialReport.note1') }}</div>
      <div >{{ trans('cpanel/financialReport.note2') }}</div>
      <div  class="mT30 taC">
            <a href="{{ env('APP_URL') }}" target="_blank">{{ trans('cpanel/cpanel.public.poweredByFoodMenu') }}</a>
      </div>

</body>

</html>
