require("./statistics/functions.js")
require("./statistics/period_selection.js")


//
//
load_statistics = function(){
    // make ajax call
    draw_statistics_loading();
    draw_statistics_selected_period();
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            load_statistics:true,
            period:window.page.period,
            compare:window.page.compare,
            day1:window.page.day1,
            month1:window.page.month1,
            year1:window.page.year1,
            day2:window.page.day2,
            month2:window.page.month2,
            year2:window.page.year2,
        },success:function(r){
            console.log(r.statistics1_day)
            if(window.page.period == 'day'){
                checkUseenNotifications(['system.statistics_day.created'],'statistics_id',r.statistics1_day._id)
            }
            console.log(r)
            draw_statistics_loaded(r);
        }
    })

}
//
