drawPage_statistics_and_analytics_smallScreen = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection ',
        }).append(
            $('<div/>',{class:'msgBox_red wFC'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.dashboard.statisticsSmallScreenMsg})
            ),
        )
    )
}
drawPage_statistics_and_analytics = function(){
    $('#pageWrapper').addClass('column alnS jstfyS')
    $('#pageWrapper').append(
        $('<div/>',{id:'statistics_select_period',class:'pointer mis-10',}),
        $('<div/>',{class:'w100p-40 m20 mnw1366',id:'statistics_container'})
    )
    load_statistics();
}
draw_statistics_selected_period = function(){
    let statistics_Dates = get_statistics_Dates();
    $('#statistics_select_period').text('').append(
        $('<span/>',{class:'fs085 c_white-10',text:texts.dashboard.showingDataFor}),
        $('<span/>',{id:'statistics_selected_period',class:'mX5 fs085',html:`<span class="c_statistics1 bold">${statistics_Dates.date1}</span> ${window.page.compare == 1 ? `<span class="">${texts.dashboard.vs}</span>` :''} <span class="c_statistics2 bold">${statistics_Dates.date2}</span>`} ),
        $('<span/>',{id:'statistics_selected_period_edit',class:'ico-edit fs08'})
    )
}
draw_statistics_loading = function(){
    $('#statistics_container').text('').append(
        $('<div/>',{class:'cardLoading w200 h20 br5 mX10 mY20'}),
        $('<div/>',{class:'cardLoading w300 h20 br5 mX10 mY20'}),
        $('<div/>',{class:'cardLoading w250 h20 br5 mX10 mY20'}),
        $('<div/>',{class:'cardLoading w400 h20 br5 mX10 mY20'}),
        $('<div/>',{class:'cardLoading w300 h20 br5 mX10 mY20'}),

    )
}
draw_statistics_loaded_notFound = function(text){
    $('#statistics_container').text('').append(
        $('<div/>',{class:'m10',text:text})
    )
}

require('./statistics/overview.js')
require('./statistics/orders.js')
require('./statistics/products.js')
require('./statistics/users.js')
require('./statistics/deliveries.js')

draw_statistics_loaded = function(){
    $('#statistics_container').text('').append(
        $('<div/>',{class:'pageTabs mB0'}).append(
            $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
            $('<div/>',{class:'pageTabsContainer'}).append(
                $('<div/>',{tab:'overview',class:'pageTab pageTab_selected'}).append(
                    $('<span/>',{text:texts.dashboard.overview})
                ),
                $('<div/>',{tab:'orders',class:'pageTab'}).append(
                    $('<span/>',{text:texts.dashboard.orders})
                ),
                $('<div/>',{tab:'products',class:'pageTab statistics_products_list_showList'}).append(
                    $('<span/>',{text:texts.dashboard.products})
                ),
                $('<div/>',{tab:'users',class:'pageTab statistics_users_list_showList'}).append(
                    $('<span/>',{text:texts.dashboard.users})
                ),
                $('<div/>',{tab:'deliveries',class:'pageTab statistics_deliveries_list_showList'}).append(
                    $('<span/>',{text:texts.dashboard.deliveryMan})
                ),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
        ),
        $('<div/>',{id:'statistics_overview',class:'pageTabContainer pageTabContainer_selected',tab:'overview'}),
        $('<div/>',{id:'statistics_orders',class:'pageTabContainer',tab:'orders'}),
        $('<div/>',{id:'statistics_products',class:'pageTabContainer',tab:'products'}),
        $('<div/>',{id:'statistics_users',class:'pageTabContainer',tab:'users'}),
        $('<div/>',{id:'statistics_deliveries',class:'pageTabContainer',tab:'deliveries'}),
    )

    fixPageTabsArrows();
    draw_statistics_overview()
    draw_statistics_orders()
    draw_statistics_products()
    draw_statistics_users()
    draw_statistics_deliveries()

}
