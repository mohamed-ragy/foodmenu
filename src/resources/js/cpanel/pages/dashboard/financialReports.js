appendFinancialReport = function(report,append){
    if(append == 'append'){
        $('#financialReports-reportsContainer').append(
            $('<div/>',{
                class:'finanialReportContainer',
                reportId:report.id,
                created_at:report.created_at,
                month:report.month,
                year:report.year,
                autoHelp:'196',
            }).append(
                $('<div/>',{
                    class:'ico-financial_reports fs2 m10',
                }),
                $('<div/>',{
                    class:'finanialReportBody',
                }).append(
                    $('<div/>',{
                        text:getDateAndTime(new Date(report.year,report.month,0).toISOString(),'monthAndYear'),
                        class:'fs102',
                    }),
                    $('<div/>',{class:'finanialReportIconsContainer'}).append(
                        $('<span/>',{
                            class:'ico-download finanialReportIcon downloadFinancialReportClass',
                            tooltip:texts.cpanel.public.downloadPDF,
                            reportId:report.id,
                        }),
                        $('<span/>',{
                            class:'ico-pdf finanialReportIcon viewFinancialReportClass',
                            tooltip:texts.cpanel.public.viewPDF,
                            month:report.month,
                            year:report.year,
                            reportId:report.id,
                            }),
                        $('<span/>',{
                            class:'ico-delete finanialReportIcon deleteFinancialReportClass',
                            tooltip:texts.cpanel.public.delete,
                        }),
                    )
                )
            )
        )
    }else if(append == 'prepend'){
        $('#financialReports-reportsContainer').prepend(
            $('<div/>',{
                class:'finanialReportContainer',
                reportId:report.id,
                created_at:report.created_at,
                month:report.month,
                year:report.year,
                autoHelp:'196',
            }).append(
                $('<div/>',{
                    class:'ico-financial_reports fs2 m10',
                }),
                $('<div/>',{
                    class:'finanialReportBody',
                }).append(
                    $('<div/>',{
                        text:getDateAndTime(new Date(report.year,report.month,0).toISOString(),'monthAndYear'),
                        class:'fs102',
                    }),
                    $('<div/>',{class:'finanialReportIconsContainer'}).append(
                        $('<span/>',{
                            class:'ico-download finanialReportIcon downloadFinancialReportClass',
                            tooltip:texts.cpanel.public.downloadPDF,
                            reportId:report.id,
                        }),
                        $('<span/>',{
                            class:'ico-pdf finanialReportIcon viewFinancialReportClass',
                            tooltip:texts.cpanel.public.viewPDF,
                            month:report.month,
                            year:report.year,
                            reportId:report.id,
                            }),
                        $('<span/>',{
                            class:'ico-delete finanialReportIcon deleteFinancialReportClass',
                            tooltip:texts.cpanel.public.delete,
                        }),
                    )
                )
            )
        )
    }

}
let getMorefinancialReportsCheck = true;
let noMoreFinanchialReports = false;
getfinancialReports = function(){
    if(noMoreFinanchialReports){return;}
    if(!getMorefinancialReportsCheck){return;}
    window.financialReportsFirstLoad = true;
    $('#financialReports-reportsContainer_loading').removeClass('none');
    getMorefinancialReportsCheck = false;
    let getMoreFinancialReports = null;
    if($('#financialReports-reportsContainer').children().length > 0 ){
        getMoreFinancialReports = $('#financialReports-reportsContainer').children().last().attr('created_at');
    }
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getfinancialReports:true,
            getMorefinancialReports:getMoreFinancialReports,
        },success:function(response){
            $('#financialReports-reportsContainer_loading').addClass('none');
            if(response.reports.length == 0){
                if(getMoreFinancialReports == null){
                    $('#financialReports-reportsContainer').append(
                        $('<div/>',{id:'financialReports-noReports',text:texts.financialReports.noReports,class:'m20'})
                    )
                }
                noMoreFinanchialReports = true;
            }else{
                for(const key in response.reports){
                    appendFinancialReport(response.reports[key],'append');
                }
            }
        }
    }).done(function(){
        getMorefinancialReportsCheck = true;
        if(!noMoreFinanchialReports && $('#financialReports-reportsContainer').height() <= $('#bodyPage').height()){
            getfinancialReports();
        }
    })
}
///////////////evens
$('#bodyPage').on('scroll',function(e){
    // e.stopImmediatePropagation();
    if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100 && 'financial_reports' == window.history.state.page){
        getfinancialReports();
    }
});

$('html,body').on('click','.viewFinancialReportClass',function(e){
    e.stopImmediatePropagation();
    checkUseenNotifications([80],'financialReport_id',$(this).attr('reportId'))
    window.open('/financialreport/view/'+$(this).attr('year')+'/'+$(this).attr('month')+'/'+account.language+'/'+website.currency, '_blank').focus();
});

$('#financialReports-reportsContainer').on('click','.downloadFinancialReportClass',function(e){
    e.stopImmediatePropagation();
    checkUseenNotifications([80],'financialReport_id',$(this).attr('reportId'))
    window.open('/financialreport/download/'+$(this).closest('.finanialReportContainer').attr('year')+'/'+$(this).closest('.finanialReportContainer').attr('month')+'/'+account.language+'/'+website.currency, '_blank').focus();
});


$('#financialReports-reportsContainer').on('click','.deleteFinancialReportClass',function(e){
    e.stopImmediatePropagation();
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',html:texts.financialReports.deleteConfirmMsg+' <b>'+getDateAndTime(new Date($(this).closest('.finanialReportContainer').attr('year'),$(this).closest('.finanialReportContainer').attr('month'),0).toISOString(),'monthAndYear')+'</b> '+texts.financialReports.financialReport+'?'}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deletefinancialReport-confirmBtn',reportId:$(this).closest('.finanialReportContainer').attr('reportId'),class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))
})

$('html,body').on('click','#deletefinancialReport-confirmBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#deletefinancialReport-confirmBtn'))
    let reportId = $(this).attr('reportId');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteFinancialReport:reportId,
        },
        success:function(response){
            hideBtnLoading($('#deletefinancialReport-confirmBtn'))
            if(response.deleteFinancialReportStatus == 1){
                showAlert('success',response.msg,4000,true);
                closePopup();
                $('.finanialReportContainer[reportId='+reportId+']').remove();
            }else if(response.deleteFinancialReportStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})


