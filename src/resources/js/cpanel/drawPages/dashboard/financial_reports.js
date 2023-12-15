drawPage_financial_reports = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.financial_reports}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
            $('<div/>',{class:'w100p mB10 row alnC jstfyE'}).append(
                $('<div/>',{class:'financialReportsCountContainer',page:1}),
                $('<div/>',{class:'financialReportsPrev financialReportsArrow_dump ico-left',tooltip:texts.cpanel.public.previous}),
                $('<div/>',{class:'financialReportsNext financialReportsArrow_dump ico-right',tooltip:texts.cpanel.public.next}),
            ),
            $('<div/>',{class:'w100p overflowX-A'}).append(
                $('<table/>',{id:'financialReportsTable'})
            ),
        )
    )
    getFinancialReports(1);
}
drawPage_financial_reports_loading = function(){
    $('#financialReportsTable').text('')
    for(i=0;i<=5;i++){
        $('#financialReportsTable').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:'w80p vaM'}).append(
                    $('<div/>',{class:'w250 h10 br5 cardLoading'})
                ),
                $('<td/>',{class:'w20p'}).append(
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<span/>',{class:'w25 h25 br5 mX5 cardLoading'}),
                        $('<span/>',{class:'w25 h25 br5 mX5 cardLoading'}),
                        $('<span/>',{class:'w25 h25 br5 mX5 cardLoading'})
                    )
                )
            ),
        )
    }
}
//
