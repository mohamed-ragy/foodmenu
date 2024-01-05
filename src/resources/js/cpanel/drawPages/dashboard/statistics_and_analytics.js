drawPage_statistics_and_analytics_smallScreen = function(){
    $('#pageWrapper').addClass('mxw1800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.statistics_and_analytics}),
            ),
            $('<div/>',{class:'msgBox_red wFC'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.dashboard.statisticsSmallScreenMsg})
            ),
        )
    )
}
drawPage_statistics_and_analytics = function(){
    $('#pageWrapper').addClass('mxw1800 column alnS jstfyS h100p')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection mB0 pB0 pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle mB10'}).append(
                $('<span/>',{text:texts.cpanel.menu.statistics_and_analytics}),
            ),
            $('<div/>',{id:'statistics_select_period',class:'pointer mis-10',})
        ),
        $('<div/>',{class:'w100p-40 m20 grow2',id:'statistics_container'})
    )
    load_statistics();
}
draw_statistics_selected_period = function(){
    let statistics_Dates = get_statistics_Dates();
    $('#statistics_select_period').text('').append(
        $('<span/>',{class:'fs085 c_white-10',text:texts.dashboard.showingDataFor}),
        $('<span/>',{id:'statistics_selected_period',class:'mX5 fs085',html:`${statistics_Dates.date1} ${window.page.compare == 1 ? `<span class="c_white-10">${texts.dashboard.vs}</span>` :''} ${statistics_Dates.date2}`} ),
        $('<span/>',{id:'statistics_selected_period_edit',class:'ico-edit fs08'})
    )
}
draw_statistics_loading = function(){
    //
}
draw_statistics_loaded = function(s){
    $('#statistics_container').text('').append(
        $('<div/>',{class:'pageTabs'}).append(
            $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
            $('<div/>',{class:'pageTabsContainer'}).append(
                $('<div/>',{tab:'overview',class:'pageTab pageTab_selected'}).append(
                    $('<span/>',{text:texts.dashboard.overview})
                ),
                $('<div/>',{tab:'orders',class:'pageTab'}).append(
                    $('<span/>',{text:texts.dashboard.orders})
                ),
                $('<div/>',{tab:'products',class:'pageTab'}).append(
                    $('<span/>',{text:texts.dashboard.products})
                ),
                $('<div/>',{tab:'users',class:'pageTab'}).append(
                    $('<span/>',{text:texts.dashboard.users})
                ),
                $('<div/>',{tab:'deliveryMan',class:'pageTab'}).append(
                    $('<span/>',{text:texts.dashboard.deliveryMan})
                ),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
        ),
        $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'overview'}).append(

        )
    )

    fixPageTabsArrows();

}
