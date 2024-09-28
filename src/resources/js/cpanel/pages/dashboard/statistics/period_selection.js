$('body').on('click','#statistics_select_period',function(e){
    showPopup('statistics_select_period',function(){
        $('.popupBody').append(
            $('<div/>',{class:'mB10',text:texts.dashboard.selectPeriod}),
            $('<div/>',{}).append(
                $('<div/>',{class:'row alnS jstfyS wrap'}).append(
                    $('<div/>',{class:'mie-30 statisticsPeriodCheck fs08 pointer',period:'day'}).append(
                        $('<span/>',{class:`${window.page.period == 'day' ? 'ico-check1' : 'ico-check0'} mie-5`}),$('<span/>',{class:'',text:texts.dashboard.aday})
                    ),
                    $('<div/>',{class:'mie-30 statisticsPeriodCheck fs08 pointer',period:'month'}).append(
                        $('<span/>',{class:`${window.page.period == 'month' ? 'ico-check1' : 'ico-check0'} mie-5`}),$('<span/>',{class:'',text:texts.dashboard.amonth})
                    ),
                    $('<div/>',{class:'statisticsPeriodCheck fs08 pointer',period:'year'}).append(
                        $('<span/>',{class:`${window.page.period == 'year' ? 'ico-check1' : 'ico-check0'} mie-5`}),$('<span/>',{class:'',text:texts.dashboard.ayear})
                    ),
                ),

                $('<div/>',{class:'mT10'}).append(
                    $('<div/>',{class:'datePickerSelectedDateContainer',id:'datePicker-statistics1Container',datePickerContainer:'datePicker-statistics1'}).append(
                        $('<span/>',{class:'ico-datePicker datePickerSelectedDateIcon'}),
                        $('<span/>',{class:'datePickerSelectedDate'}),
                        $('<span/>',{class:'ico-down mX10'})
                    )
                ),
                $('<div/>',{class:'datePickerContainer',id:'datePicker-statistics1',todayActive:'0',selectPeriod:'month',selectBy:window.page.period,datePickerType:''}).append(
                    $('<div/>',{class:'datePickerMonthContainer'}).append(
                        $('<span/>',{class:'ico-left datePickerPrevMonthBtn',datePickerContainer:'datePicker-statistics1'}),
                        $('<span/>',{class:'datePickerMonthNameContainer',month:'',year:''}).append(
                            $('<span/>',{class:'datePickerMonth fs1 mX3',month:''}),
                            $('<span/>',{class:'datePickerYear fs09 mT10',year:''})
                        ),
                        $('<span/>',{class:'ico-right datePickerNextMonthBtn',datePickerContainer:'datePicker-statistics1'}),
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
                        $('<div/>',{class:'datePickerWeekDays',id:'datePickerWeekDays-statistics1'})
                    )
                ),

                $('<div/>',{class:'row alnC jstfyS fs085 mX5 mY10 pointer wFC',id:'statistics-periodSelect-compare'}).append(
                    $('<div/>',{class:`${window.page.compare == 1 ? 'ico-check1' : 'ico-check0'}`}),
                    $('<div/>',{class:'mis-5',text:texts.dashboard.compare})
                ),

                $('<div/>',{class:`mT10`}).append(
                    $('<div/>',{class:`datePickerSelectedDateContainer  ${window.page.compare == 1 ? '' : 'none'}`,id:'datePicker-statistics2Container',datePickerContainer:'datePicker-statistics2'}).append(
                        $('<span/>',{class:'ico-datePicker datePickerSelectedDateIcon'}),
                        $('<span/>',{class:'datePickerSelectedDate'}),
                        $('<span/>',{class:'ico-down mX10'})
                    )
                ),
                $('<div/>',{class:`datePickerContainer ${window.page.compare == 1 ? '' : 'none'}`,id:'datePicker-statistics2',todayActive:'0',selectPeriod:'month',selectBy:window.page.period,datePickerType:''}).append(
                    $('<div/>',{class:'datePickerMonthContainer'}).append(
                        $('<span/>',{class:'ico-left datePickerPrevMonthBtn',datePickerContainer:'datePicker-statistics2'}),
                        $('<span/>',{class:'datePickerMonthNameContainer',month:'',year:''}).append(
                            $('<span/>',{class:'datePickerMonth fs1 mX3',month:''}),
                            $('<span/>',{class:'datePickerYear fs09 mT10',year:''})
                        ),
                        $('<span/>',{class:'ico-right datePickerNextMonthBtn',datePickerContainer:'datePicker-statistics2'}),
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
                        $('<div/>',{class:'datePickerWeekDays',id:'datePickerWeekDays-statistics2'})
                    )
                ),
            ),
            $('<div/>',{class:'btnContainer mT30'}).append(
                $('<button/>',{class:'btn',text:texts.dashboard.loadStatistics,id:'loadStatistics_btn'})
            )
        )

        for(i=1;i<=42;i++){
            $('#datePickerWeekDays-statistics1').append(
                $('<span/>',{class:'datePickerDay',dayNum:i})
            )
            $('#datePickerWeekDays-statistics2').append(
                $('<span/>',{class:'datePickerDay',dayNum:i})
            )
        }



        drawdatePicker($('#datePicker-statistics1'),true)
        drawdatePicker($('#datePicker-statistics2'),true)
        setdatePicker($('#datePicker-statistics1'),parseInt(window.page.year1),parseInt(window.page.month1),window.page.day1)
        setdatePicker($('#datePicker-statistics2'),parseInt(window.page.year2),parseInt(window.page.month2),window.page.day2)
        $('.popupContainer').removeClass('none');

    })
})
//
$('body').on('click','.statisticsPeriodCheck',function(e){
    $('#datePicker-statistics1').hide()
    $('#datePicker-statistics2').hide()
    $('#datePicker-statistics1').attr('selectBy',$(this).attr('period'))
    $('#datePicker-statistics2').attr('selectBy',$(this).attr('period'))
    drawdatePicker($('#datePicker-statistics1'),true)
    drawdatePicker($('#datePicker-statistics2'),true)
    $('.statisticsPeriodCheck').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1')

})
//
$('body').on('click','#statistics-periodSelect-compare',function(e){
    e.stopImmediatePropagation();
    $('#datePicker-statistics1').hide()
    $('#datePicker-statistics2').hide()
    if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().addClass('ico-check0').removeClass('ico-check1')
        $('#datePicker-statistics2Container').addClass('none')
    }else if($(this).children().first().hasClass('ico-check0')){
        $(this).children().first().addClass('ico-check1').removeClass('ico-check0')
        $('#datePicker-statistics2Container').removeClass('none')
    }

})
//
$('body').on('click','#loadStatistics_btn',function(e){
    e.stopImmediatePropagation();
    $('#datePicker-statistics1').hide()
    $('#datePicker-statistics2').hide()
    $('#statistics-periodSelect-compare').children().first().hasClass('ico-check1') ? window.page.compare = 1 : $('#statistics-periodSelect-compare').children().first().hasClass('ico-check0') ? window.page.compare = 0 : null;
    $('.statisticsPeriodCheck[period="day"]').children().first().hasClass('ico-check1') ? window.page.period = 'day' :
    $('.statisticsPeriodCheck[period="month"]').children().first().hasClass('ico-check1') ? window.page.period = 'month' :
    $('.statisticsPeriodCheck[period="year"]').children().first().hasClass('ico-check1') ? window.page.period = 'year' : null;
    window.page.day1 = $('#datePicker-statistics1').find('.datePickerSelectedDay').text();
    window.page.day2 = $('#datePicker-statistics2').find('.datePickerSelectedDay').text();
    window.page.month1 = $('#datePicker-statistics1').find('.datePickerMonth').attr('month');
    window.page.month2 = $('#datePicker-statistics2').find('.datePickerMonth').attr('month');
    window.page.year1 = $('#datePicker-statistics1').find('.datePickerYear').attr('year');
    window.page.year2 = $('#datePicker-statistics2').find('.datePickerYear').attr('year');
    pushHistory(false)
    closePopup();
    load_statistics();
})
//
