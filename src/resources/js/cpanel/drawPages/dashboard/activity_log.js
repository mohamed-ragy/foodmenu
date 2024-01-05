drawPage_activity_log = function(){
    $('#pageWrapper').addClass('mxw1000')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.activity_log}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
            $('<div/>',{class:'wFC'}).append(
                $('<div/>',{class:'fs085 mT30',text:texts.dashboard.selectDay}),
                $('<div/>',{class:'mT10'}).append(
                    $('<div/>',{class:'datePickerSelectedDateContainer',id:'datePicker-activityLogContainer',datePickerContainer:'datePicker-activityLog'}).append(
                        $('<span/>',{class:'ico-datePicker datePickerSelectedDateIcon'}),
                        $('<span/>',{class:'datePickerSelectedDate'}),
                        $('<span/>',{class:'ico-down mX10'})
                    )
                ),
                $('<div/>',{class:'datePickerContainer',id:'datePicker-activityLog',todayActive:'1',selectPeriod:'month',selectBy:'day',datePickerType:''}).append(
                    $('<div/>',{class:'datePickerMonthContainer'}).append(
                        $('<span/>',{class:'ico-left datePickerPrevMonthBtn',datePickerContainer:'datePicker-activityLog'}),
                        $('<span/>',{class:'datePickerMonthNameContainer',month:'',year:''}).append(
                            $('<span/>',{class:'datePickerMonth fs1 mX3',month:''}),
                            $('<span/>',{class:'datePickerYear fs09 mT10',year:''})
                        ),
                        $('<span/>',{class:'ico-right datePickerNextMonthBtn',datePickerContainer:'datePicker-activityLog'}),
                    ),
                    $('<div/>',{class:'datePickerDaysContainer'}).append(
                        $('<div/>',{class:'datePickerWeekDaysNames'}).append(
                            $('<span/>',{class:'datePickerDayName',text:'Su'}),
                            $('<span/>',{class:'datePickerDayName',text:'Mo'}),
                            $('<span/>',{class:'datePickerDayName',text:'Tu'}),
                            $('<span/>',{class:'datePickerDayName',text:'We'}),
                            $('<span/>',{class:'datePickerDayName',text:'Th'}),
                            $('<span/>',{class:'datePickerDayName',text:'Fr'}),
                            $('<span/>',{class:'datePickerDayName',text:'Sa'}),
                        ),
                        $('<div/>',{class:'datePickerWeekDays'})
                    )
                ),
            ),
            $('<div/>',{class:'btnContainer mY20'}).append(
                $('<button/>',{class:'btn',id:'findActivites_btn'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.dashboard.findActivites})
                )
            ),
            $('<div/>',{class:'activityLogsStickyDate'}),
            $('<div/>',{id:'activityLogContainer',class:'w100p mY40'}),
            $('<div/>',{id:'activityLogContainer_loading',class:'w100p none'}),
            drawLoadMore('activityLog_loadMore','none')
        )
    )

    for(i=1;i<=42;i++){
        $('.datePickerWeekDays').append(
            $('<span/>',{class:'datePickerDay',dayNum:i})
        )
    }
    for(i=0;i<=4;i++){
        $('#activityLogContainer_loading').append(
            $('<div/>',{class:'activityContainer_loading'}).append(
                $('<div/>',{class:'cardLoading w30 h30 m10 br5'}),
                $('<div/>',{class:'cardLoading w80p mxw400 h10 br3'}),
            )
        )
    }
    drawdatePicker($('#datePicker-activityLog'),true)
    setdatePicker($('#datePicker-activityLog'),window.page.year,window.page.month,window.page.day)
    activityLog_load();
}
