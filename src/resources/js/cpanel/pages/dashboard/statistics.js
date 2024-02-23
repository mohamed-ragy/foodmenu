require("./statistics/functions.js")//done//
require("./statistics/statisticspopup.js")//done//
require("./statistics/period_selection.js")//done//
require("./statistics/dounts.js")//done//
require("./statistics/graph.js")//done//

//
load_statistics = function(){
    draw_statistics_loading();
    draw_statistics_selected_period();
    window.statistics = [];
    window.statisticspopup = [];
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
            calc_statistics(r);

            if(window.page.compare == 0){
                if(r.statistics1 == null){
                    draw_statistics_loaded_notFound(texts.dashboard.statisticsNotFound);
                }else{
                    checkUseenNotifications(['system.statistics_day.created'],'statistics_id',r.statistics1._id)
                    draw_statistics_loaded();
                }
            }else if(window.page.compare == 1){
                if(r.statistics1 == null && r.statistics2 == null){
                    draw_statistics_loaded_notFound(texts.dashboard.statisticsNotFound_compare2);
                }else if(r.statistics1 == null || r.statistics2 == null){
                    draw_statistics_loaded_notFound(texts.dashboard.statisticsNotFound_compare);
                }else{
                    checkUseenNotifications(['system.statistics_day.created'],'statistics_id',r.statistics1._id)
                    checkUseenNotifications(['system.statistics_day.created'],'statistics_id',r.statistics2._id)
                    draw_statistics_loaded();
                }
            }
        }
    })

}
//
