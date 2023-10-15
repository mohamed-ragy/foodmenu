<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $report->websites->domainName.' '.trans('cpanel/dashboard/financialReports.financialReport').' '.$date }}</title>
    <link rel="stylesheet" href="css/cpanel/financialReport.css">
    <link id="colors" rel="stylesheet" href="{{ asset('css/cpanel/colors.css') }}">
</head>
<body>
        <table class="w100p brdr-Bot pB10">
            <tr>
                <td class="fs2">{{ strtoupper($report->websites->domainName).' ' }}</td>
            </tr>
            <tr>
                <td class="taS">{{ trans('cpanel/dashboard/financialReports.financialReport2')}}</td>
                <td class="taE">{{ $date }}</td>
            </tr>
        </table>

        <table>
            <tr class="tHC">
                <td class="taS fs104">{{ trans('cpanel/dashboard/financialReports.income') }}</td>
                <td class="taE"></td>
            </tr>
            <tr class="c2">
                <td class="taS">{{ trans('cpanel/dashboard/financialReports.itemsTotal') }}</td>
                <td class="taE">{{ $report->items_total }}</td>
            </tr>
            <tr class="c1">
                <td class="taS">{{ trans('cpanel/dashboard/financialReports.tax') }}</td>
                <td class="taE">{{ $report->tax }}</td>
            </tr>
            <tr class="c2">
                <td class="taS">{{ trans('cpanel/dashboard/financialReports.delivery') }}</td>
                <td class="taE">{{ $report->delivery }}</td>
            </tr>
            <tr class="c1">
                <td class="taS">{{ trans('cpanel/dashboard/financialReports.service') }}</td>
                <td class="taE">{{ $report->service }}</td>
            </tr>
            <tr class="c2 brdr-top">
                <td class="taS fs103">{{ trans('cpanel/dashboard/financialReports.total') }}</td>
                <td class="taE fs103">{{ $currency }}{{ $report->total }}</td>
            </tr>
        </table>
        <table>
            <tr class="tHC">
                <td class="taS fs104">{{ trans('cpanel/dashboard/financialReports.expenses') }}</td>
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
                <td class="taE">{{ $expense['amount'] }}</td>
            </tr>
            @endforeach
            @php
            $expenseColor = 1;
            $expensesTotal = 0;
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
                <td class="taE">{{ $expense['amount'] }}</td>
            </tr>
            @endforeach
            <tr class="{{ $report->expensesTotalColor }} brdr-top">
                <td class="taS fs103">{{ trans('cpanel/dashboard/financialReports.total') }}</td>
                <td class="taE fs103">{{ $currency }}{{ $report->expensesTotal }}</td>
            </tr>
        </table>
        <table>
            <tr class="tHC">
                <td class="taS bold fs103">{{ $report->reportTotalTxt }}</td>
                <td class="taE bold fs103">{{ $currency }}{{ $report->profits }}</td>
            </tr>
        </table>
      <div class="mT30">{{ trans('cpanel/dashboard/financialReports.note1') }}</div>
      <div >{{ trans('cpanel/dashboard/financialReports.note2') }}</div>
      <div >{{ trans('cpanel/dashboard/financialReports.note3') }}</div>
      <div  class="mT30 taC">
            <a href="{{ env('APP_URL') }}" target="_blank">{{ trans('cpanel/cpanel.public.poweredByFoodMenu') }}</a>
      </div>

</body>

</html>
