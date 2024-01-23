draw_statistics_users = function(){
    $('#statistics_users').text('').append(
        $('<div/>',{id:'statistics_users_list',class:'td200'}),
        $('<div/>',{id:'statistics_users_user',class:'mT50 td200 opacity0 none'})
    )
    draw_statistics_users_list('so_total','desc');
}
draw_statistics_users_list = function(order,sort){
    let top_users = get_statistics_top_users(window.statistics.s1.users,order,sort);
    if(top_users.length == 0){
        $('#statistics_users_list').text('').append(
            $('<div/>',{class:'mT30',text:texts.dashboard.noData})
        );
        return;
    }
    $('#statistics_users_list').text('').append(
        $('<table/>',{class:'mT30',id:'statistics_users_user_table'}).append(
            $('<tr/>',{class:'trHead'}).append(
                $('<th/>',{order:'name',class:'statistics_users_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.name}),
                        $('<span/>',{class:`statistics_users_list_thArrow fs09 ${order == 'name' && sort == 'desc' ? 'ico-down' : order == 'name' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'so_total',class:'statistics_users_list_th pointer '}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.income}),
                        $('<span/>',{class:`statistics_users_list_thArrow fs09 ${order == 'so_total' && sort == 'desc' ? 'ico-down' : order == 'so_total' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'so',class:'statistics_users_list_th pointer  pie-30'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.successfulOrders}),
                        $('<span/>',{class:`statistics_users_list_thArrow fs09 ${order == 'so' && sort == 'desc' ? 'ico-down' : order == 'so' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'co',class:'statistics_users_list_th pointer  pie-30'}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.canceledorders}),
                        $('<span/>',{class:`statistics_users_list_thArrow fs09 ${order == 'co' && sort == 'desc' ? 'ico-down' : order == 'co' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'rv',class:'statistics_users_list_th pointer '}).append(
                    $('<div/>',{class:'w100p row aonC jstfySB'}).append(
                        $('<span/>',{class:'tnw mie-10',text:texts.dashboard.Reviews}),
                        $('<span/>',{class:`statistics_users_list_thArrow fs09 ${order == 'rv' && sort == 'desc' ? 'ico-down' : order == 'rv' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{class:'taE',text:''}),
            )
        )
    )
    for(const key in top_users){
        let so_compare ='';let co_compare = '';let total_compare = '';let reviews_compare = '';

        if(window.page.compare == 1){
            if(typeof(window.statistics.s2.users[top_users[key].id]) === 'undefined'){
                so_compare = $('<span/>',{class:'',html:compareNums(top_users[key].so,0,texts.dashboard.userOrders_compare.replace(':user:',top_users[key].name),false,false)})
                co_compare = $('<span/>',{class:'',html:compareNums(top_users[key].co,0,texts.dashboard.userOrders_co_compare.replace(':user:',top_users[key].name),true,false)})
                total_compare = $('<span/>',{class:'',html:compareNums(top_users[key].so_total,0,texts.dashboard.userTotal_compare.replace(':user:',top_users[key].name),false,false)})
                reviews_compare = $('<span/>',{class:'',html:compareNums(top_users[key].rv,0,texts.dashboard.userReviews_compare.replace(':user:',top_users[key].name),false,false)})
                key4 = 'undefined';
            }else{
                key4 = window.statistics.s2._id;
                so_compare = $('<span/>',{class:'',html:compareNums(top_users[key].so,window.statistics.s2.users[top_users[key].id].so,texts.dashboard.userOrders_compare.replace(':user:',top_users[key].name),false,false)})
                co_compare = $('<span/>',{class:'',html:compareNums(top_users[key].co,window.statistics.s2.users[top_users[key].id].co,texts.dashboard.userOrders_co_compare.replace(':user:',top_users[key].name),true,false)})
                total_compare = $('<span/>',{class:'',html:compareNums(top_users[key].so_total,window.statistics.s2.users[top_users[key].id].so_total,texts.dashboard.userTotal_compare.replace(':user:',top_users[key].name),false,false)})
                reviews_compare = $('<span/>',{class:'',html:compareNums(top_users[key].rv,window.statistics.s2.users[top_users[key].id].rv,texts.dashboard.userReviews_compare.replace(':user:',top_users[key].name),false,false)})
            }
        }else{
            key4 = null;
        }

        $('#statistics_users_user_table').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:''}).append(
                        $('<a/>',{class:'ellipsis mis-5 popupPage popupId',popupPage:'user',popupId:'user',user:top_users[key].id,text:top_users[key].name}),
                ),
                $('<td/>',{class:' pie-30'}).append(
                    $('<span/>',{text:`${website.currency}${bigFloat(top_users[key].so_total)}`}),
                    total_compare
                ),
                $('<td/>',{class:' pie-30'}).append(
                    $('<span/>',{text:`${bigInt(top_users[key].so)}`}),
                    so_compare
                ),
                $('<td/>',{class:' pie-30'}).append(
                    $('<span/>',{text:`${bigInt(top_users[key].co)}`}),
                    co_compare
                ),
                $('<td/>',{class:''}).append(
                    $('<span/>',{text:`${bigInt(top_users[key].rv)}`}),
                    reviews_compare
                ),
                $('<td/>',{class:'taE vaM'}).append(
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:'btn_table ico-info pointer statisticspopup',key1:'user',key2:top_users[key].id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                        $('<div/>',{class:'btn_table ico-statistics_and_analytics pointer statistics_users_list_showUser',user:top_users[key].id,tooltip:texts.dashboard.moreDetails})

                    )
                )
            )
        )
    }
}
$('body,html').on('click','.statistics_users_list_th',function(e){
    e.stopImmediatePropagation();
    let sort = 'desc';
    $(this).find('.statistics_users_list_thArrow').hasClass('ico-down') ? sort = 'asc' : null;
    draw_statistics_users_list($(this).attr('order'),sort)
})
$('html,body').on('click','.statistics_users_list_showUser',function(e){
    e.stopImmediatePropagation();
    let user_id = $(this).attr('user');
    $('#statistics_users_list').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_users_list').addClass('none');
        $('#statistics_users_user').removeClass('none');
        draw_statistics_users_user(user_id)
        setTimeout(function(){
            $('#statistics_users_user').removeClass('opacity0');
        },200)
    },200)

})
$('html,body').on('click','.statistics_users_list_showList',function(e){
    // e.stopImmediatePropagation();
    $('#statistics_users_user').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_users_user').addClass('none');
        $('#statistics_users_list').removeClass('none');
        setTimeout(function(){
            $('#statistics_users_list').removeClass('opacity0');
        },200)
    },200)

})

draw_statistics_users_user = function(user_id){
    let graph_width = 600; let graph_height = 200;
    $(window).width() < 1920 ? graph_width = 500 : null ;
    $(window).width() < 1920 ? graph_height = 175 : null ;

    let heighestNum_so = getGraphHighestNumber_user(user_id,'so',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_co = getGraphHighestNumber_user(user_id,'co',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_total = getGraphHighestNumber_user(user_id,'so_total',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_orders = heighestNum_so > heighestNum_co ? heighestNum_so : heighestNum_co ;

    let user_s1 = window.statistics.s1.users[user_id];
    let user_s2 = {id:user_id,name:window.statistics.s1.users[user_id].name,so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,po:0,po_itemsTotal:0,po_tax:0,po_total:0,di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,}

    let user_s1_so_percent = Math.round((user_s1.so/(user_s1.so + user_s1.co))*100);
    let user_s1_co_percent = Math.round((user_s1.co/(user_s1.so + user_s1.co))*100);
    let user_s1_do_percent = Math.round((user_s1.do/user_s1.so)*100);
    let user_s1_po_percent = Math.round((user_s1.po/user_s1.so)*100);
    let user_s1_di_percent = Math.round((user_s1.di/user_s1.so)*100);

    user_s1_so_percent + user_s1_co_percent == 99 ? user_s1_so_percent = user_s1_so_percent + 1 : null;
    user_s1_so_percent + user_s1_co_percent == 101 ? user_s1_so_percent = user_s1_so_percent - 1 : null;
    user_s1_do_percent + user_s1_po_percent + user_s1_di_percent == 99 ? user_s1_do_percent = user_s1_do_percent + 1 : null;
    user_s1_do_percent + user_s1_po_percent + user_s1_di_percent == 101 ? user_s1_do_percent = user_s1_do_percent - 1 : null;

    let key4 = null;
    if(window.page.compare == 1){
        if(typeof(window.statistics.s2.users[user_id]) !== 'undefined'){
            user_s2 = window.statistics.s2.users[user_id];
            key4 = window.statistics.s2._id;
        }
    }
    $('#statistics_users_user').text('').append(

        $('<div/>',{class:'row alnBL jstfyS mB30'}).append(
            $('<span/>',{class:'statistics_users_list_showList ico-left statistics_usersUser_backBtn',tooltip:texts.cpanel.public.back}),
            $('<div/>',{class:'fs108 ico-user mie-10'}),
            $('<a/>',{text:user_s1.userName,class:'popupPage popupId fs101',popupPage:'user',popupId:'user',user:user_id}),

        ),

        $('<div/>',{class:'row alnS jstfyS w100p'}).append(

            $('<div/>',{class:'grow1'}).append(
                $('<div/>',{class:'statistics_usersUserElem'}).append(
                    $('<table/>',{class:'statistics_usersUserElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{}),
                            $('<td/>',{class:'c_statistics1 taE'}).append($('<span/>',{text:window.statistics.date1,class:'fs08'}),),
                            window.page.compare == 1 ? $('<td/>',{class:'c_statistics2 taE'}).append($('<span/>',{text:window.statistics.date2,class:'fs08'})) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'bold',text:texts.dashboard.income}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'bold',text:`${website.currency}${bigFloat(user_s1.so_total)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.so_total,user_s2.so_total,texts.dashboard.userTotal_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'bold taE',text:`${website.currency}${bigFloat(user_s2.so_total)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_0}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${website.currency}${bigFloat(user_s1.do_total)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.do_total,user_s2.do_total,texts.dashboard.userTotal_do_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${website.currency}${bigFloat(user_s2.do_total)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_1}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${website.currency}${bigFloat(user_s1.po_total)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.po_total,user_s2.po_total,texts.dashboard.userTotal_po_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${website.currency}${bigFloat(user_s2.po_total)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_2}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${website.currency}${bigFloat(user_s1.di_total)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.di_total,user_s2.di_total,texts.dashboard.userTotal_di_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${website.currency}${bigFloat(user_s2.di_total)}`}) : null,
                        ),
                    )
                ),
                $('<div/>',{class:'statistics_usersUserElem'}).append(
                    $('<table/>',{class:'statistics_usersUserElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'bold',text:texts.dashboard.successfulOrders}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'bold',text:`${bigInt(user_s1.so)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.so,user_s2.so,texts.dashboard.userOrders_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'bold taE',text:`${bigInt(user_s2.so)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_0}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${bigInt(user_s1.do)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.do,user_s2.do,texts.dashboard.userOrders_do_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${bigInt(user_s2.do)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_1}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${bigInt(user_s1.po)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.po,user_s2.po,texts.dashboard.userOrders_po_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${bigInt(user_s2.po)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'statistics_usersUserElem_table_td_pis-10',text:texts.orders.type_2}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${bigInt(user_s1.di)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.di,user_s2.di,texts.dashboard.userOrders_di_compare.replace(':user:',user_s1.userName),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${bigInt(user_s2.di)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'bold',text:texts.dashboard.canceledorders}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'bold',text:`${bigInt(user_s1.co)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.co,user_s2.co,texts.dashboard.userOrders_co_compare.replace(':user:',user_s1.userName),true,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'bold taE',text:`${bigInt(user_s2.co)}`}) : null,
                        ),
                    )
                ),
                $('<div/>',{class:'statistics_usersUserElem'}).append(
                    $('<table/>',{class:'statistics_usersUserElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'bold',text:texts.dashboard.reviews}),
                            $('<td/>',{class:' taE'}).append(
                                $('<span/>',{class:'bold',text:bigInt(user_s1.rv)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv,user_s2.rv,texts.dashboard.userReviews_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'bold',text:bigInt(user_s2.rv)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x1<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(user_s1.rv1)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv1,user_s2.rv1,texts.dashboard.userReviews_s1_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(user_s2.rv1)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x2<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(user_s1.rv2)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv2,user_s2.rv2,texts.dashboard.userReviews_s2_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(user_s2.rv2)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x3<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(user_s1.rv3)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv3,user_s2.rv3,texts.dashboard.userReviews_s3_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(user_s2.rv3)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x4<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(user_s1.rv4)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv4,user_s2.rv4,texts.dashboard.userReviews_s4_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(user_s2.rv4)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x5<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(user_s1.rv5)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(user_s1.rv5,user_s2.rv5,texts.dashboard.userReviews_s5_compare.replace(':user:',user_s1.userName),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(user_s2.rv5)}) : null
                        ),
                    )
                )
            ),
            $('<div/>',{class:'grow1 column alnC jstfyS mis-100 mT10'}).append(
                $('<div/>',{class:'row alnC jstfyS w100p'}).append(

                    $('<div/>',{class:'statistics_userOrdersHeadElem statistics_userOrdersHeadElem_selected',key:'successful',user:user_id}).append(
                        $('<div/>',{class:'row alnC jstfyS tnw'}).append(
                            $('<div/>',{class:'ico-accepted cG fs101 mT4 mie-5'}),
                            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(user_s1.so)} (${user_s1_so_percent}%)</span>`}),
                            window.page.compare == 1 ? $('<div/>',{class:'fs085',html:compareNums(user_s1.so,user_s2.so,texts.dashboard.userOrders_compare,false,false)}) : null
                        ),
                        $('<div/>',{class:'c_white-10 mis-3'}).append(
                            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'user_so',key2:user_id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<span/>',{class:'',text:texts.dashboard.successfulOrders})
                        )
                    ),

                    $('<div/>',{class:'statistics_userOrdersHeadElem ',key:'canceled',user:user_id}).append(
                        $('<div/>',{class:'row alnC jstfyS tnw'}).append(
                            $('<div/>',{class:'ico-no cR fs101 mT4 mie-5'}),
                            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(user_s1.co)} (${user_s1_co_percent}%)</span>`}),
                            window.page.compare == 1 ? $('<div/>',{class:'fs085',html:compareNums(user_s1.co,user_s2.co,texts.dashboard.userOrders_co_compare,true,false)}) : null
                        ),
                        $('<div/>',{class:'c_white-10 mis-3'}).append(
                            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'user_co',key2:user_id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<span/>',{class:'',text:texts.dashboard.canceledorders})
                        )
                    ),
                ),
                $('<div/>',{class:'row alnC jstfyS w100p'}).append(
                    $('<div/>',{class:'statistics_userOrdersHeadElem ',key:'delivered',user:user_id}).append(
                        $('<div/>',{class:'row alnC jstfyS tnw'}).append(
                            $('<div/>',{class:'ico-delivery c_delivery fs101 mT4 mie-5'}),
                            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(user_s1.do)} (${user_s1_do_percent}%)</span>`}),
                            window.page.compare == 1 ? $('<div/>',{class:'fs085',html:compareNums(user_s1.do,user_s2.do,texts.dashboard.userOrders_do_compare,false,false)}) : null
                        ),
                        $('<div/>',{class:'c_white-10 mis-3'}).append(
                            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'user_do',key2:user_id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<span/>',{class:'',text:texts.dashboard.deliveredOrders})
                        )
                    ),
                    $('<div/>',{class:'statistics_userOrdersHeadElem ',key:'pickedup',user:user_id}).append(
                        $('<div/>',{class:'row alnC jstfyS tnw'}).append(
                            $('<div/>',{class:'ico-pickup c_pickup fs101 mT4 mie-5'}),
                            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(user_s1.po)} (${user_s1_po_percent}%)</span>`}),
                            window.page.compare == 1 ? $('<div/>',{class:'fs085',html:compareNums(user_s1.po,user_s2.po,texts.dashboard.userOrders_po_compare,false,false)}) : null
                        ),
                        $('<div/>',{class:'c_white-10 mis-3'}).append(
                            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'user_po',key2:user_id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<span/>',{class:'',text:texts.dashboard.pickedupOrders})
                        )
                    ),
                    $('<div/>',{class:'statistics_userOrdersHeadElem ',key:'dinedin',user:user_id}).append(
                        $('<div/>',{class:'row alnC jstfyS tnw'}).append(
                            $('<div/>',{class:'ico-dineIn c_dineIn fs101 mT4 mie-5'}),
                            $('<div/>',{class:'fs102',html:`<span class="bold ">${bigInt(user_s1.di)} (${user_s1_di_percent}%)</span>`}),
                            window.page.compare == 1 ? $('<div/>',{class:'fs085',html:compareNums(user_s1.di,user_s2.di,texts.dashboard.userOrders_di_compare,false,false)}) : null
                        ),
                        $('<div/>',{class:'c_white-10 mis-3'}).append(
                            $('<span/>',{class:'ico-info mie-5 fs085 pointer statisticspopup',key1:'user_di',key2:user_id,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<span/>',{class:'',text:texts.dashboard.dinedinOrders})
                        )
                    ),
                ),
                $('<div/>',{class:'column alnS jstfyS mT70'}).append(
                    $('<div/>',{class:'mB50 mie-50'}).append(
                        drawStatisticsGraph('statistics_users_list_userGraph_orders',graph_height,graph_width,'orders',heighestNum_orders),
                    ),
                    $('<div/>',{class:' mie-50'}).append(
                        drawStatisticsGraph('statistics_users_list_userGraph_income',graph_height,graph_width,'income',heighestNum_total)
                    )
                )

            )
        )
    )
    fill_statistics_users_user('successful',user_id)

}

//
$('html,body').on('click','.statistics_userOrdersHeadElem',function(e){
    e.stopImmediatePropagation();
    $('.statistics_userOrdersHeadElem').removeClass('statistics_userOrdersHeadElem_selected');
    $(this).addClass('statistics_userOrdersHeadElem_selected')

    fill_statistics_users_user($(this).attr('key'),$(this).attr('user'))
})
fill_statistics_users_user = function(key,user_id){
    let graph_width = 600; let graph_height = 200;
    $(window).width() < 1920 ? graph_width = 500 : null ;
    $(window).width() < 1920 ? graph_height = 175 : null ;

    let heighestNum_so = getGraphHighestNumber_user(user_id,'so',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_co = getGraphHighestNumber_user(user_id,'co',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_total = getGraphHighestNumber_user(user_id,'so_total',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_orders = heighestNum_so > heighestNum_co ? heighestNum_so : heighestNum_co ;

    switch(key){
        case 'successful':
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_orders',graph_height,graph_width,'so',user_id,heighestNum_orders)
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_income',graph_height,graph_width,'so_total',user_id,heighestNum_total)
        break;
        case 'delivered':
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_orders',graph_height,graph_width,'do',user_id,heighestNum_orders)
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_income',graph_height,graph_width,'do_total',user_id,heighestNum_total)
        break;
        case 'pickedup':
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_orders',graph_height,graph_width,'po',user_id,heighestNum_orders)
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_income',graph_height,graph_width,'po_total',user_id,heighestNum_total)
        break;
        case 'dinedin':
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_orders',graph_height,graph_width,'di',user_id,heighestNum_orders)
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_income',graph_height,graph_width,'di_total',user_id,heighestNum_total)
        break;
        case 'canceled':
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_orders',graph_height,graph_width,'co',user_id,heighestNum_orders)
            fillStatisticsGraph_user_orders('statistics_users_list_userGraph_income',graph_height,graph_width,'co_total',user_id,heighestNum_total)
        break;
    }
}
//
