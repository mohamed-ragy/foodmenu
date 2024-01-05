
require("./statistics_old/class.js")//done
require("./statistics_old/statisticsPopup.js")//done

$('.statisticsPeriodTypeCard').on('click',function(e){
    e.stopImmediatePropagation();
    $('.statisticsPeriodTypeCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').addClass('ico-check1').removeClass('ico-check0');
    $('#datePicker-statistics').attr('selectBy',$(this).attr('period'));
    $('#datePicker-statistics2').attr('selectBy',$(this).attr('period'));
    drawdatePicker($('#datePicker-statistics'))
    drawdatePicker($('#datePicker-statistics2'))
})
$('#statisticsCompareCheckBox').on('click',function(){
    if($(this).find('.ico-check1').hasClass('ico-check1')){
        $(this).find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
        $('.datePickerSelectedDateContainer[datePickerContainer="datePicker-statistics2"]').addClass('none');
    }else if($(this).find('.ico-check0').hasClass('ico-check0')){
        $(this).find('.ico-check0').addClass('ico-check1').removeClass('ico-check0');
        $('.datePickerSelectedDateContainer[datePickerContainer="datePicker-statistics2"]').removeClass('none');
    }
})

loadStatistics = function(){
    let period;let compare = 0;let day1; let month1; let year1;let day2; let month2; let year2;
    $('.statisticsPeriodTypeCardCheck').each(function(){
        $(this).hasClass('ico-check1') ? period = $(this).closest('.statisticsPeriodTypeCard').attr('period') : null;
    })

    $('.statisticsCompareCheck').hasClass('ico-check1') ? compare = 1 : compare = 0;

    if(period == 'day'){
        if(compare == 1){
            day1 = $('#datePicker-statistics').find('.datePickerSelectedDay').text();
            month1 = $('#datePicker-statistics').find('.datePickerMonth').attr('month');
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = $('#datePicker-statistics2').find('.datePickerSelectedDay').text();
            month2 = $('#datePicker-statistics2').find('.datePickerMonth').attr('month');
            year2 = $('#datePicker-statistics2').find('.datePickerYear').attr('year');
        }else{
            day1 = $('#datePicker-statistics').find('.datePickerSelectedDay').text();
            month1 = $('#datePicker-statistics').find('.datePickerMonth').attr('month');
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = null;
            month2 = null;
            year2 = null;
        }
    }else if(period == 'month'){
        if(compare == 1){
            day1 = null;
            month1 = $('#datePicker-statistics').find('.datePickerMonth').attr('month');
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = null;
            month2 = $('#datePicker-statistics2').find('.datePickerMonth').attr('month');
            year2 = $('#datePicker-statistics2').find('.datePickerYear').attr('year');
        }else{
            day1 = null;
            month1 = $('#datePicker-statistics').find('.datePickerMonth').attr('month');
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = null;
            month2 = null;
            year2 = null;
        }
    }else if(period == 'year'){
        if(compare == 1){
            day1 = null;
            month1 = null;
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = null;
            month2 = null;
            year2 = $('#datePicker-statistics2').find('.datePickerYear').attr('year');
        }else{
            day1 = null;
            month1 = null;
            year1 = $('#datePicker-statistics').find('.datePickerYear').attr('year');
            day2 = null;
            month2 = null;
            year2 = null;
        }
    }

    showBtnLoading($('#statistics-loadStatisticsBtn'))
    $('#StatisticsWindowContainer').addClass('none')
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            loadStatistics:true,
            period:period,
            compare:compare,
            day1:day1,
            month1:month1,
            year1:year1,
            day2:day2,
            month2:month2,
            year2:year2,
        },success:function(response){
            hideBtnLoading($('#statistics-loadStatisticsBtn'))
            window.statisticsPopups = [];
            if(response.period == 'day'){
                if(response.compare == 0){
                    if(response.statistics1_day.length == 0 || response.statistics1_hours == 0){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsDay(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }else if(response.compare == 1){
                    if(response.statistics1_day.length == 0 || response.statistics1_hours == 0 || response.statistics2_day.length == 0 || response.statistics2_hours == 0){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive2,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsDayCompare(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }
            }else if(response.period == 'month'){
                if(response.compare == 0){
                    if(response.statistics1_month.length == 0 || response.statistics1_days == 0){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsMonth(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }else if(response.compare == 1){
                    if(response.statistics1_month.length == 0 || response.statistics1_days == 0 || response.statistics2_month.length == 0 || response.statistics2_days == 0){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive2,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsMonthCompare(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }
            }else if(response.period == 'year'){
                if(response.compare == 0){
                    if(response.statistics1_months.length == 0){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsYear(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }else if(response.compare == 1){
                    if(response.statistics1_months.length == 0 || response.statistics2_months == 0 ){
                        showAlert('error',texts.statistics.periodSelectedHasNoArchive2,4000,true);
                        return;
                    }else{
                        $('#StatisticsWindowContainer').removeClass('none')
                        scrollToDiv($('#bodyPage'),$('#StatisticsWindowContainer'),500,0)
                        window.statisticsClass = new statisticsYearCompare(response);
                        $('#statusBar').text(texts.statistics.dataloaded)
                    }
                }
            }
        }
    })


}

$('#statistics-loadStatisticsBtn').on('click',function(){
    loadStatistics();
})
////////
$('.statisticsTabElem').on('click',function(e){
    e.stopImmediatePropagation();
    $('.statisticsTabElem').removeClass('statisticsTabElem_selected');
    $('.statisticsContainer').addClass('none');
    $(this).addClass('statisticsTabElem_selected');
    $(`.statisticsContainer[statisticsTab="${$(this).attr('statisticsTab')}"]`).removeClass('none');
})
///////////orders
$('html,body').on('click','.statisticsGraphsElem_orders',function(e){
    e.stopImmediatePropagation();
    $('.statisticsGraphsElem_orders').removeClass('statisticsGraphsElem_selected');
    $(this).addClass('statisticsGraphsElem_selected');
    let symbol = '';
    $(this).attr('key2') == 'total' ? symbol = website.currency : null ;
    if(window.statisticsClass.period == 'day'){
        window.statisticsClass.fillOrdersGraph_day($(this).attr('key1'),$(this).attr('key2'),symbol)
    }else if(window.statisticsClass.period == 'month'){
        window.statisticsClass.fillOrdersGraph_month($(this).attr('key1'),$(this).attr('key2'),symbol);
    }else if(window.statisticsClass.period == 'year'){
        window.statisticsClass.fillOrdersGraph_year($(this).attr('key1'),$(this).attr('key2'),symbol);
    }
})
/////////products
$('html,body').on('click','.productsGraphsCatElem',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('productsGraphsCatElem_selected')){return;}
    $('.productsGraphsCatElem').removeClass('productsGraphsCatElem_selected');
    $(this).addClass('productsGraphsCatElem_selected');
    window.statisticsClass.setProductsGraphs();
})
$('html,body').on('click','.statisticsGraphsElem_products',function(e){
    e.stopImmediatePropagation();
    $('.statisticsGraphsElem_products').removeClass('statisticsGraphsElem_selected')
    $(this).addClass('statisticsGraphsElem_selected')
    window.statisticsClass.setProductGraph($(this).attr('key'));
})
//////////users
$('html,body').on('click','.usersGraphsCatElem',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('usersGraphsCatElem_selected')){return;}
    $('.usersGraphsCatElem').removeClass('usersGraphsCatElem_selected');
    $(this).addClass('usersGraphsCatElem_selected');
    window.statisticsClass.setUsersGraphs();
})
$('html,body').on('click','.statisticsGraphsElem_users',function(e){
    e.stopImmediatePropagation();
    $('.statisticsGraphsElem_users').removeClass('statisticsGraphsElem_selected')
    $(this).addClass('statisticsGraphsElem_selected')
    window.statisticsClass.setUserOverview($(this).attr('key'));
})
/////deliveries
$('html,body').on('click','.statisticsGraphsElem_deliveries',function(e){
    e.stopImmediatePropagation();
    $('.statisticsGraphsElem_deliveries').removeClass('statisticsGraphsElem_selected')
    $(this).addClass('statisticsGraphsElem_selected')
    window.statisticsClass.setDeliveryGraph($(this).attr('key'));
})
