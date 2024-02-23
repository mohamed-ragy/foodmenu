getFinancialReports = function(page){
    if(account.is_master == false){return}
    drawPage_financial_reports_loading();
    let skip = (page - 1) * 10;
    $('.financialReportsNext').addClass('financialReportsArrow_dump')
    $('.financialReportsPrev').addClass('financialReportsArrow_dump')
    $('.financialReportsCountContainer').text('')
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getFinancialReports:true,
            skip:skip,
        },success:function(r){
            window.financialReports = r.reports;
            $('#financialReportsTable').text('')
            if(r.reports.length == 0){
                $('#financialReportsTable').append(
                    $('<div/>',{class:'m10',text:texts.dashboard.noFinancialReports})
                )
            }else{
                $('.financialReportsCountContainer').attr('page',page);
                $('.financialReportsCountContainer').text('').text(`${skip + 1}-${skip + r.reports.length} ${texts.cpanel.public.of} ${r.count}`);
                page == 1 ? $('.financialReportsPrev').addClass('financialReportsArrow_dump') : $('.financialReportsPrev').removeClass('financialReportsArrow_dump');
                (skip + r.reports.length) >=  r.count ?  $('.financialReportsNext').addClass('financialReportsArrow_dump') : $('.financialReportsNext').removeClass('financialReportsArrow_dump');

                for(const key in r.reports){
                    let report = r.reports[key];
                    let report_date = getDate(Date.parse(new Date(report.year,(parseInt(report.month) - 1),5)) / 1000);
                    $('#financialReportsTable').append(
                        $('<tr/>',{class:'financial_report_container',report:report.id}).append(
                            $('<td/>',{class:'fs09',text:`${report_date.month_long.restaurant} ${report_date.year.restaurant}`}),
                            $('<td/>',{class:''}).append(
                                $('<div/>',{class:'row alnC jstfyE'}).append(
                                    $('<div/>',{class:'btn_table ico-pdf open_financial_report',year:report.year,month:report.month,report:report.id,tooltip:texts.cpanel.public.viewPDF}),
                                    $('<div/>',{class:'btn_table ico-download download_financial_report',tooltip:texts.cpanel.public.downloadPDF}),
                                    $('<div/>',{class:'btn_table ico-delete delete_financial_report',tooltip:texts.cpanel.public.delete}),
                                )
                            )
                        )
                    )
                }
            }
        }
    })
}
$('html,body').on('click','.financialReportsNext',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('financialReportsArrow_dump')){return;}
    getFinancialReports(parseInt($('.financialReportsCountContainer').attr('page')) + 1)
})
$('html,body').on('click','.financialReportsPrev',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('financialReportsArrow_dump')){return;}
    getFinancialReports(parseInt($('.financialReportsCountContainer').attr('page')) - 1)
})
//
$('html,body').on('click','.delete_financial_report',function(e){
    e.stopImmediatePropagation();
    let report_id = $(this).closest('.financial_report_container').attr('report');
    let report = window.financialReports.find(item=>item.id == report_id);
    let report_date = getDate(Date.parse(new Date(report.year,(parseInt(report.month) - 1),5)) / 1000);

    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',html:texts.dashboard.deleteFinancialReport_confirmTxt.replace(':date:',`<b>${report_date.month_long.restaurant} ${report_date.year.restaurant}</b>`)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'delete_financial_report-confirmBtn',report:report.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#delete_financial_report-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let report_id = $(this).attr('report');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteFinancialReport:true,
            report_id:report_id,
        },success:function(r){
            if(r.deleteFinancialReportStatus == 1){
                getFinancialReports(parseInt($('.financialReportsCountContainer').attr('page')));
                closePopup();
                showAlert('success',r.msg,4000,true);
            }else if(r.deleteFinancialReportStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})

$('html,body').on('click','.open_financial_report',function(e){
    e.stopImmediatePropagation();
    let report_id = $(this).attr('report');
    checkUseenNotifications(['system.financial_report'],'financialReport_id',report_id)
    window.open(`/financialreport/view?year=${$(this).attr('year')}&month=${$(this).attr('month')}&currency_symbol=${website.currency}&lang=${account.language}`, '_blank').focus();
});

$('html,body').on('click','.download_financial_report',function(e){
    e.stopImmediatePropagation();
    let report_id = $(this).closest('.financial_report_container').attr('report');
    let report = window.financialReports.find(item=>item.id == report_id);
    checkUseenNotifications(['system.financial_report'],'financialReport_id',report_id)
    window.open(`/financialreport/download?year=${report.year}&month=${report.month}&currency_symbol=${website.currency}&lang=${account.language}`, '_blank').focus();
});

