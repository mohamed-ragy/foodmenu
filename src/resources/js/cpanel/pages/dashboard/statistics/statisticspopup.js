$('html,body').on('click','.statisticspopup',function(e){
    e.stopImmediatePropagation();
    // let popupHtml = window.statisticspopup[$(this).attr('statisticspopup')]
    let popupHtml = statisticspopup_html($(this).attr('key1'),$(this).attr('key2'),$(this).attr('key3'),$(this).attr('key4'),$(this).attr('key5'),$(this).attr('key6'));
    showPopup('statistics',function(){
        $('.popupBody').text('').append(popupHtml)
    })

});

$('html,body').on('mouseleave','.statisticspopup',function(e){
    $('#statisticspopupDiv').text('');
    $('#statisticspopupDiv').hide();
});
$('html,body').on('mousemove mouseover mouseenter','.statisticspopup',function(e){
    if($(this).attr('statisticspopup') == ''){return;}
    if(!window.matchMedia("(pointer: coarse)").matches  && settings_temp.tooltip){
        // console.log($(this).attr('statisticspopup'));
        let tooltipHtml = statisticspopup_html($(this).attr('key1'),$(this).attr('key2'),$(this).attr('key3'),$(this).attr('key4'),$(this).attr('key5'),$(this).attr('key6'));
        $('#statisticspopupDiv').html(tooltipHtml);
        if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').css({
                'top':e.pageY + 15 ,
                'left':e.pageX + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').css({
                'top':e.pageY - $('#statisticspopupDiv').height() - 5,
                'left':e.pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').css({
                'top':e.pageY + 15,
                'left':e.pageX - $('#statisticspopupDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').css({
                'left':e.pageX - $('#statisticspopupDiv').width() - 10,
                'top':e.pageY - $('#statisticspopupDiv').height() - 10,
                'display':'block',
            });
        }
    }
});
$('html,body').on('mousemove',function(e){
    if($('.statisticspopup:hover').length == 0){
        $('#statisticspopupDiv').text('');
        $('#statisticspopupDiv').hide();
    }
});
statisticspopup_html = function(key1,key2,key3,key4,key5,key6){
    switch(key1){
        case 'orders':
            return statisticspopup_orders(key2,key3,key4,key5,key6)
        break;
        case 'product':
            return statisticspopup_product(key2,key3,key4,key5,key6)
        break;
        case 'user':
            return statisticspopup_user(key2,key3,key4,key5,key6)
        break;
        case 'user_so':
            return statisticspopup_user_orders('so',key2,key3,key4,key5,key6)
        break;
        case 'user_co':
            return statisticspopup_user_orders('co',key2,key3,key4,key5,key6)
        break;
        case 'user_do':
            return statisticspopup_user_orders('do',key2,key3,key4,key5,key6)
        break;
        case 'user_po':
            return statisticspopup_user_orders('po',key2,key3,key4,key5,key6)
        break;
        case 'user_di':
            return statisticspopup_user_orders('di',key2,key3,key4,key5,key6)
        break;
        case 'delivery':
            return statisticspopup_delivery(key2,key3,key4,key5,key6)
        break;
    }
}
///
statisticspopup_orders = function(type,s1_id,s2_id,date1,date2){
    let s1 = null;
    let s2 = null;
    window.statistics.s1._id == s1_id ? s1 = window.statistics.s1[type] : null;
    for(const key in window.statistics.s1_){
        if(window.statistics.s1_[key]._id == s1_id){
            s1 = window.statistics.s1_[key][type];
        }
    }
    if(window.page.compare == 1){
        window.statistics.s2._id == s2_id ? s2 = window.statistics.s2[type] : null;
        for(const key in window.statistics.s2_){
            if(window.statistics.s2_[key]._id == s2_id){
                s2 = window.statistics.s2_[key][type];
            }
        }
    }
    switch(type){
        case 'so':
            return statisticspopup_so(s1,s2,date1,date2)
        break;
        case 'co':
            return statisticspopup_co(s1,s2,date1,date2)
        break;
        case 'do':
            return statisticspopup_do(s1,s2,date1,date2)
        break;
        case 'po':
            return statisticspopup_po(s1,s2,date1,date2)
        break;
        case 'di':
            return statisticspopup_di(s1,s2,date1,date2)
        break;
    }
}
statisticspopup_so = function(s1,s2,date1,date2){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s1.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.orders)}</span> ${compareNums(s1.orders,s2.orders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${bigInt(s1.userOrders)}</span> ${compareNums(s1.userOrders,s2.userOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.guestOrders)}</span> ${compareNums(s1.guestOrders,s2.guestOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.items_total)}</span> ${compareNums(s1.items_total,s2.items_total,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.tax)}</span> ${compareNums(s1.tax,s2.tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.service)}</span> ${compareNums(s1.service,s2.service,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.delivery)}</span> ${compareNums(s1.delivery,s2.delivery,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.total)}</span> ${compareNums(s1.total,s2.total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        )
    }
}
statisticspopup_co = function(s1,s2,date1,date2){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s1.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.orders)}</span> ${compareNums(s1.orders,s2.orders,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${bigInt(s1.userOrders)}</span> ${compareNums(s1.userOrders,s2.userOrders,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.guestOrders)}</span> ${compareNums(s1.guestOrders,s2.guestOrders,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.items_total)}</span> ${compareNums(s1.items_total,s2.items_total,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.tax)}</span> ${compareNums(s1.tax,s2.tax,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.service)}</span> ${compareNums(s1.service,s2.service,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.delivery)}</span> ${compareNums(s1.delivery,s2.delivery,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.total)}</span> ${compareNums(s1.total,s2.total,null,true)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        )
    }
}
statisticspopup_do = function(s1,s2,date1,date2){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s1.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.orders)}</span> ${compareNums(s1.orders,s2.orders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${bigInt(s1.userOrders)}</span> ${compareNums(s1.userOrders,s2.userOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.guestOrders)}</span> ${compareNums(s1.guestOrders,s2.guestOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.items_total)}</span> ${compareNums(s1.items_total,s2.items_total,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.tax)}</span> ${compareNums(s1.tax,s2.tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.delivery)}</span> ${compareNums(s1.delivery,s2.delivery,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.total)}</span> ${compareNums(s1.total,s2.total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        )
    }
}
statisticspopup_po = function(s1,s2,date1,date2){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s1.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.orders)}</span> ${compareNums(s1.orders,s2.orders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${bigInt(s1.userOrders)}</span> ${compareNums(s1.userOrders,s2.userOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.guestOrders)}</span> ${compareNums(s1.guestOrders,s2.guestOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.items_total)}</span> ${compareNums(s1.items_total,s2.items_total,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.tax)}</span> ${compareNums(s1.tax,s2.tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.total)}</span> ${compareNums(s1.total,s2.total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        )
    }
}
statisticspopup_di = function(s1,s2,date1,date2){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s1.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.orderedByUsers}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.orderedByGuests}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.orders)}</span> ${compareNums(s1.orders,s2.orders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${bigInt(s1.userOrders)}</span> ${compareNums(s1.userOrders,s2.userOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.guestOrders)}</span> ${compareNums(s1.guestOrders,s2.guestOrders,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.items_total)}</span> ${compareNums(s1.items_total,s2.items_total,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.tax)}</span> ${compareNums(s1.tax,s2.tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.service)}</span> ${compareNums(s1.service,s2.service,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.total)}</span> ${compareNums(s1.total,s2.total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.orders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:bigInt(s2.userOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.guestOrders)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.items_total)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.total)}),

                )
            ),
        )
    }
}
//
statisticspopup_product = function(product_name,s1_id,s2_id,date1,date2){
    let s1 = {options:{},reviews:{rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0},sum:0,total:0};
    let s2 = {options:{},reviews:{rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0},sum:0,total:0};

    if(s1_id == window.statistics.s1._id && typeof(window.statistics.s1.products[product_name]) !== 'undefined'){s1 = window.statistics.s1.products[product_name]}else{
        for(const key in window.statistics.s1_){
            if(window.statistics.s1_[key]._id == s1_id && typeof(window.statistics.s1_[key].products[product_name]) !== 'undefined'){
                s1 = window.statistics.s1_[key].products[product_name];
            }
        }
    }

    if(window.page.compare == 1){
        if(s2_id == window.statistics.s2._id && typeof(window.statistics.s2.products[product_name]) !== 'undefined'){s2 = window.statistics.s2.products[product_name]}else{
            for(const key in window.statistics.s2_){
                if(window.statistics.s2_[key]._id == s2_id && typeof(window.statistics.s2_[key].products[product_name]) !== 'undefined'){
                    s2 = window.statistics.s2_[key].products[product_name];
                }
            }
        }
    }



    let product_img = '/storage/imgs/cpanel/noimg.png';
    if(typeof(website.products.find(item=>item.name == product_name)) !== 'undefined'){product_img = website.products.find(item=>item.name == product_name).thumbnail}

    let productTable = $('<table/>',{class:'w100p'}).append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{text:'',class:' pie-100 pY5'}),
            $('<th/>',{text:date1,class:`c_statistics1 taE pY5 tnw`}),
            window.page.compare == 1 ? $('<th/>',{text:date2,class:`c_statistics2 taE pY5 tnw`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'bold fs09 pY5',text:texts.dashboard.income}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${website.currency}${bigFloat(s1.total)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.total,s2.total,texts.dashboard.productTotal_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold taE fs09 pY5',text:`${website.currency}${bigFloat(s2.total)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'bold fs09 pY5',text:texts.dashboard.ordered}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${bigInt(s1.sum)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.sum,s2.sum,texts.dashboard.productOrdered_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold taE fs09 pY5',text:`${bigInt(s2.sum)}`}) : null,
        ),
    )

    for(const key in s1.options){
        productTable.append(
            $('<tr/>',{}).append(
                $('<td/>',{class:'brdrT1_w3 pY5 fs09 bold',text:key}),
                $('<td/>',{class:'brdrT1_w3 pY5 fs09',text:''}),
                window.page.compare == 1 ? $('<td/>',{class:'brdrT1_w3 pY5 fs09',text:''}) : null,
            )
        )

        let selections_s1_percent = 0;
        let selections_s2_percent = 0;
        for(const key2 in s1.options[key]){
            let this_s2_selection_percent;
            let this_s1_selection_percent = Math.round((s1.options[key][key2]/s1.sum)*100);
            selections_s1_percent = selections_s1_percent + this_s1_selection_percent;
            selections_s1_percent == 99 ? this_s1_selection_percent = this_s1_selection_percent + 1 : null;
            selections_s1_percent == 101 ? this_s1_selection_percent = this_s1_selection_percent - 1 : null;


            let s2Option = 0;
            if(window.page.compare == 1){
                if(typeof(s2.options[key]) !== 'undefined'){
                    if(typeof(s2.options[key][key2]) !== 'undefined'){
                        s2Option = s2.options[key][key2];
                        this_s2_selection_percent = Math.round((s2Option/s2.sum)*100);
                        selections_s2_percent = selections_s2_percent + this_s2_selection_percent;
                        selections_s2_percent == 99 ? this_s2_selection_percent = this_s2_selection_percent + 1 : null;
                        selections_s2_percent == 101 ? this_s2_selection_percent = this_s2_selection_percent - 1 : null;
                    }
                }
            }
            productTable.append(
                $('<tr/>',{}).append(
                    $('<td/>',{class:'pY5 fs09 pis-15',text:key2}),
                    $('<td/>',{class:'pY5 taE fs085'}).append(
                        $('<span/>',{text:`${s1.options[key][key2]} (${this_s1_selection_percent}%)`}),
                        window.page.compare == 1 ?$('<span/>',{html:compareNums(s1.options[key][key2],s2Option,texts.dashboard.productSelection_compare.replace(':option:',key).replace(':selection:',key2),false,false)}) : null,
                    ),
                    window.page.compare == 1 ? $('<td/>',{class:'pY5 taE fs085',text:`${s2Option} (${s2.sum == 0 ? '0' : this_s2_selection_percent}%)`}) : null,
                )
            )
        }
    }

    productTable.append(
        $('<tr/>',{}).append(
            $('<td/>',{class:'brdrT1_w3 pY5 fs09 bold',text:texts.dashboard.Reviews}),
            $('<td/>',{class:'brdrT1_w3 pY5 fs09 taE'}).append(
                $('<span/>',{class:'bold',text:s1.reviews.rv}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv,s2.reviews.rv,texts.dashboard.productReviews_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold brdrT1_w3 pY5 fs09 taE',text:s2.reviews.rv}) : null,
        ),

        $('<tr/>',{}).append(
            $('<td/>',{class:'pY5 fs09 pis-15',html:`x1<span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'pY5 fs09 taE'}).append(
                $('<span/>',{text:s1.reviews.rv1}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv1,s2.reviews.rv1,texts.dashboard.productReviews_s1_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'pY5 fs09 taE',text:s2.reviews.rv1}) : null,
        ),

        $('<tr/>',{}).append(
            $('<td/>',{class:'pY5 fs09 pis-15',html:`x2<span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'pY5 fs09 taE'}).append(
                $('<span/>',{text:s1.reviews.rv2}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv2,s2.reviews.rv2,texts.dashboard.productReviews_s2_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'pY5 fs09 taE',text:s2.reviews.rv2}) : null,
        ),

        $('<tr/>',{}).append(
            $('<td/>',{class:'pY5 fs09 pis-15',html:`x3<span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'pY5 fs09 taE'}).append(
                $('<span/>',{text:s1.reviews.rv3}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv3,s2.reviews.rv3,texts.dashboard.productReviews_s3_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'pY5 fs09 taE',text:s2.reviews.rv3}) : null,
        ),

        $('<tr/>',{}).append(
            $('<td/>',{class:'pY5 fs09 pis-15',html:`x4<span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'pY5 fs09 taE'}).append(
                $('<span/>',{text:s1.reviews.rv4}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv4,s2.reviews.rv4,texts.dashboard.productReviews_s4_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'pY5 fs09 taE',text:s2.reviews.rv4}) : null,
        ),

        $('<tr/>',{}).append(
            $('<td/>',{class:'pY5 fs09 pis-15',html:`x5<span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'pY5 fs09 taE'}).append(
                $('<span/>',{text:s1.reviews.rv5}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.reviews.rv5,s2.reviews.rv5,texts.dashboard.productReviews_s5_compare.replace(':product:',product_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'pY5 fs09 taE',text:s2.reviews.rv5}) : null,
        ),
    )
    return $('<div/>',{class:''}).append(
        $('<div/>',{class:'row alnC jstfyS m5'}).append(
            $('<img/>',{src:product_img,class:'w40 h40 br5 ofCover'}),
            $('<a/>',{text:product_name,class:'mis-5 popupPage popupId mis-5 fs101',popupPage:'product',popupId:'product',product:product_name}),
        ),
        productTable
    )

}
statisticspopup_user = function(user_id,s1_id,s2_id,date1,date2){
    let s1 = {
        userName:'',
        so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,po:0,po_itemsTotal:0,po_tax:0,po_total:0,di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
    }
    let s2 = {
        userName:'',
        so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,po:0,po_itemsTotal:0,po_tax:0,po_total:0,di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
    }

    if(window.statistics.s1._id == s1_id && typeof(window.statistics.s1.users[user_id]) !== 'undefined'){
        s1 = window.statistics.s1.users[user_id];
    }else{
        for(const key in window.statistics.s1_){
            if(window.statistics.s1_[key]._id == s1_id && typeof(window.statistics.s1_[key].users[user_id]) !== 'undefined'){
                s1 = window.statistics.s1_[key].users[user_id];
            }
        }
    }

    let s1_do_percent = 0;let s2_do_percent = 0;
    let s1_po_percent = 0;let s2_po_percent = 0;
    let s1_di_percent = 0;let s2_di_percent = 0;
    if(s1.so > 0){
        s1_do_percent = Math.round(s1.do/s1.so*100);
        s1_po_percent = Math.round(s1.po/s1.so*100);
        s1_di_percent = Math.round(s1.di/s1.so*100);

        s1_do_percent + s1_po_percent + s1_di_percent == 99 ? s1_do_percent = s1_do_percent + 1 : null;
        s1_do_percent + s1_po_percent + s1_di_percent == 101 ? s1_do_percent = s1_do_percent - 1 : null;
    }

    if(window.page.compare == 1 ){
        if(window.statistics.s2._id == s2_id && typeof(window.statistics.s2.users[user_id]) !== 'undefined'){
            s2 = window.statistics.s2.users[user_id];
        }else{
            for(const key in window.statistics.s2_){
                if(window.statistics.s2_[key]._id == s2_id && typeof(window.statistics.s2_[key].users[user_id]) !== 'undefined'){
                    s2 = window.statistics.s2_[key].users[user_id];
                }
            }
        }
        if(s2.so > 0){
            s2_do_percent = Math.round(s2.do/s2.so*100);
            s2_po_percent = Math.round(s2.po/s2.so*100);
            s2_di_percent = Math.round(s2.di/s2.so*100);

            s2_do_percent + s2_po_percent + s2_di_percent == 99 ? s2_do_percent = s2_do_percent + 1 : null;
            s2_do_percent + s2_po_percent + s2_di_percent == 101 ? s2_do_percent = s2_do_percent - 1 : null;
        }

    }


    let userTable = $('<table/>',{class:'w100p'}).append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{text:'',class:' pie-100 pY5'}),
            $('<th/>',{text:date1,class:`c_statistics1 taE pY5`}),
            window.page.compare == 1 ? $('<th/>',{text:date2,class:`c_statistics2 taE pY5`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'bold fs09 pY5',text:texts.dashboard.income}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${website.currency}${bigFloat(s1.so_total)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.so_total,s2.so_total,texts.dashboard.userTotal_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold taE fs09 pY5',text:`${website.currency}${bigFloat(s2.so_total)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_0}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${website.currency}${bigFloat(s1.do_total)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.do_total,s2.do_total,texts.dashboard.userTotal_do_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${website.currency}${bigFloat(s2.do_total)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_1}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${website.currency}${bigFloat(s1.po_total)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.po_total,s2.po_total,texts.dashboard.userTotal_po_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${website.currency}${bigFloat(s2.po_total)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_2}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${website.currency}${bigFloat(s1.di_total)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.di_total,s2.di_total,texts.dashboard.userTotal_di_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${website.currency}${bigFloat(s2.di_total)}`}) : null,
        ),
        ///
        $('<tr/>',{}).append(
            $('<td/>',{class:'brdrT1_w3 bold fs09 pY5',text:texts.dashboard.successfulOrders}),
            $('<td/>',{class:'brdrT1_w3 taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${bigInt(s1.so)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.so,s2.so,texts.dashboard.userOrders_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold brdrT1_w3 taE fs09 pY5',text:`${bigInt(s2.so)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_0}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.do)} (${s1_do_percent}%)`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.do,s2.do,texts.dashboard.userOrders_do_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.do)} (${s2_do_percent}%)`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_1}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.po)} (${s1_po_percent}%)`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.po,s2.po,texts.dashboard.userOrders_po_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.po)} (${s2_po_percent}%)`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',text:texts.orders.type_2}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.di)} (${s1_di_percent}%)`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.di,s2.di,texts.dashboard.userOrders_di_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.di)} (${s2_di_percent}%)`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'brdrT1_w3 bold fs09 pY5',text:texts.dashboard.canceledorders}),
            $('<td/>',{class:'brdrT1_w3 taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${bigInt(s1.co)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.co,s2.co,texts.dashboard.userOrders_co_compare.replace(':user:',s1.userName),true,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold brdrT1_w3 taE fs09 pY5',text:`${bigInt(s2.co)}`}) : null,
        ),
        //
        $('<tr/>',{}).append(
            $('<td/>',{class:'brdrT1_w3 bold fs09 pY5',text:texts.dashboard.Reviews}),
            $('<td/>',{class:'brdrT1_w3 taE fs09 pY5'}).append(
                $('<span/>',{class:'bold',text:`${bigInt(s1.rv)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv,s2.rv,texts.dashboard.userReviews_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'bold brdrT1_w3 taE fs09 pY5',text:`${bigInt(s2.rv)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',html:`x1 <span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.rv1)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv1,s2.rv1,texts.dashboard.userReviews_s1_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.rv1)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',html:`x2 <span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.rv2)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv2,s2.rv2,texts.dashboard.userReviews_s2_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.rv2)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',html:`x3 <span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.rv3)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv3,s2.rv3,texts.dashboard.userReviews_s3_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.rv3)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',html:`x4 <span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.rv4)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv4,s2.rv4,texts.dashboard.userReviews_s4_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.rv4)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'pis-15 fs09 pY5',html:`x5 <span class="ico-star cStar"></span>`}),
            $('<td/>',{class:'taE fs09 pY5'}).append(
                $('<span/>',{text:`${bigInt(s1.rv5)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.rv5,s2.rv5,texts.dashboard.userReviews_s5_compare.replace(':user:',s1.userName),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5',text:`${bigInt(s2.rv5)}`}) : null,
        ),
    )
    return $('<div/>',{class:''}).append(
        $('<div/>',{class:'row alnC jstfyS m5'}).append(
            $('<div/>',{class:'ico-user fs104'}),
            $('<a/>',{text:s1.userName,class:'mis-5 popupPage popupId mis-5 fs101',popupPage:'user',popupId:'user',user:s1.id}),
        ),
        userTable
    )
}
//
statisticspopup_user_orders = function(type,user_id,s1_id,s2_id,date1,date2){
    let s1;
    let s2;
    window.statistics.s1._id == s1_id ? s1 = window.statistics.s1.users[user_id] : null;
    for(const key in window.statistics.s1_){
        if(window.statistics.s1_[key]._id == s1_id){
            s1 = window.statistics.s1_[key].users[user_id];
        }
    }
    if(window.page.compare == 1){
        window.statistics.s2._id == s2_id ? s2 = window.statistics.s2.users[user_id] : null;
        for(const key in window.statistics.s2_){
            if(window.statistics.s2_[key]._id == s2_id){
                s2 = window.statistics.s2_[key].users[user_id];
            }
        }
    }
    if(typeof(s1) === 'undefined'){s1 = null;}
    if(typeof(s2) === 'undefined'){s2 = null;}

    switch(type){
        case 'so':
            return statisticspopup_user_so(s1,s2,date1,date2,user_id)
        break;
        case 'co':
            return statisticspopup_user_co(s1,s2,date1,date2,user_id)
        break;
        case 'do':
            return statisticspopup_user_do(s1,s2,date1,date2,user_id)
        break;
        case 'po':
            return statisticspopup_user_po(s1,s2,date1,date2,user_id)
        break;
        case 'di':
            return statisticspopup_user_di(s1,s2,date1,date2,user_id)
        break;
    }
}
statisticspopup_user_so = function(s1,s2,date1,date2,user_id){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.so)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.so_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.so_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.so_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.so_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.so_total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s2.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.so)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.so_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.so_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.successfulOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.so)}</span> ${compareNums(s1.so,s2.so,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.so_itemsTotal)}</span> ${compareNums(s1.so_itemsTotal,s2.so_itemsTotal,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.so_tax)}</span> ${compareNums(s1.so_tax,s2.so_tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.so_service)}</span> ${compareNums(s1.so_service,s2.so_service,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.so_delivery)}</span> ${compareNums(s1.so_delivery,s2.so_delivery,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.so_total)}</span> ${compareNums(s1.so_total,s2.so_total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.so)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.so_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.so_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.so_total)}),

                )
            ),
        )
    }
}
statisticspopup_user_co = function(s1,s2,date1,date2,user_id){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.co)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.co_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.co_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.co_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.co_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.co_total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s2.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.co)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.co_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.co_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.canceledorders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.total}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.co)}</span> ${compareNums(s1.co,s2.co,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.co_itemsTotal)}</span> ${compareNums(s1.co_itemsTotal,s2.co_itemsTotal,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.co_tax)}</span> ${compareNums(s1.co_tax,s2.co_tax,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.co_service)}</span> ${compareNums(s1.co_service,s2.co_service,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.co_delivery)}</span> ${compareNums(s1.co_delivery,s2.co_delivery,null,true)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.co_total)}</span> ${compareNums(s1.co_total,s2.co_total,null,true)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.co)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.co_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_service)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.co_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.co_total)}),

                )
            ),
        )
    }
}
statisticspopup_user_do = function(s1,s2,date1,date2,user_id){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.do)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.do_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.do_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.do_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.do_total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s2.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.do)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.do_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.do_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.do_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.do_total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveredOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.deliveryCost}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.do)}</span> ${compareNums(s1.do,s2.do,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.do_itemsTotal)}</span> ${compareNums(s1.do_itemsTotal,s2.do_itemsTotal,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.do_tax)}</span> ${compareNums(s1.do_tax,s2.do_tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.do_delivery)}</span> ${compareNums(s1.do_delivery,s2.do_delivery,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.do_total)}</span> ${compareNums(s1.do_total,s2.do_total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.do)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.do_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.do_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.do_delivery)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.do_total)}),

                )
            ),
        )
    }
}
statisticspopup_user_po = function(s1,s2,date1,date2,user_id){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.po)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.po_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.po_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.po_total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s2.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.po)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.po_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.po_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.po_total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.pickedupOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.po)}</span> ${compareNums(s1.po,s2.po,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.po_itemsTotal)}</span> ${compareNums(s1.po_itemsTotal,s2.po_itemsTotal,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.po_tax)}</span> ${compareNums(s1.po_tax,s2.po_tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.po_total)}</span> ${compareNums(s1.po_total,s2.po_total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.po)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.po_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.po_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.po_total)}),

                )
            ),
        )
    }
}
statisticspopup_user_di = function(s1,s2,date1,date2,user_id){
    if(s2 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s1.di)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.di_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s1.di_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.di_service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s1.di_total)}),

                )
            ),
        );
    }else if(s1 == null){
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s2.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.di)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.di_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_total)}),

                )
            ),
        );
    }else{
        return $('<div/>',{class:''}).append(
            $('<div/>',{class:'p5 row alnC jstfyS'}).append(
                $('<div/>',{class:'fs105 ico-user mie-5'}),
                $('<a/>',{class:'popupId popupPage',popupId:'user',popupPage:'user',user:user_id,text:s1.userName})
            ),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'statisticspopupRow_left1 pB10',text:''}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.dinedinOrders}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.itemsTotal}),
                    $('<div/>',{class:'statisticspopupRow_left1',text:texts.dashboard.tax}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.service}),
                    $('<div/>',{class:'statisticspopupRow_left2',text:texts.dashboard.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics1`,html:date1}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${bigInt(s1.di)}</span> ${compareNums(s1.di,s2.di,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.di_itemsTotal)}</span> ${compareNums(s1.di_itemsTotal,s2.di_itemsTotal,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right1',html:`<span class="mie-2">${website.currency+bigFloat(s1.di_tax)}</span> ${compareNums(s1.di_tax,s2.di_tax,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.di_service)}</span> ${compareNums(s1.di_service,s2.di_service,null,false)}`}),
                    $('<div/>',{class:'statisticspopupRow_right2',html:`<span class="mie-2">${website.currency+bigFloat(s1.di_total)}</span> ${compareNums(s1.di_total,s2.di_total,null,false)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`statisticspopupRow_right1 tnw taE bold pB10 c_statistics2`,html:date2}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:bigInt(s2.di)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_itemsTotal)}),
                    $('<div/>',{class:'statisticspopupRow_right1',text:website.currency+bigFloat(s2.di_tax)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_service)}),
                    $('<div/>',{class:'statisticspopupRow_right2',text:website.currency+bigFloat(s2.di_total)}),

                )
            ),
        )
    }
}
//
statisticspopup_delivery = function(delivery_name,s1_id,s2_id,date1,date2){
    let s1 = {id:null,name:delivery_name,orders:0,time:0,avgPerOrder:0}
    let s2 = {id:null,name:delivery_name,orders:0,time:0,avgPerOrder:0}

    if(window.statistics.s1._id == s1_id && typeof(window.statistics.s1.deliveries[delivery_name]) !== 'undefined'){
        s1 = window.statistics.s1.deliveries[delivery_name];
    }else{
        for(const key in window.statistics.s1_){
            if(window.statistics.s1_[key]._id == s1_id  && typeof(window.statistics.s1_[key].deliveries[delivery_name]) !== 'undefined'){
                s1 = window.statistics.s1_[key].deliveries[delivery_name];
            }
        }
    }
    if(window.page.compare == 1 ){
        if(window.statistics.s2._id == s2_id  && typeof(window.statistics.s2.deliveries[delivery_name]) !== 'undefined'){
            s2 = window.statistics.s2.deliveries[delivery_name];
        }else{
            for(const key in window.statistics.s2_){
                if(window.statistics.s2_[key]._id == s2_id  && typeof(window.statistics.s2_[key].deliveries[delivery_name]) !== 'undefined'){
                    s2 = window.statistics.s2_[key].deliveries[delivery_name];
                }
            }
        }
    }
    let deliveryTable = $('<table/>',{class:'w100p'}).append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{text:'',class:' pie-100 pY5 tnw'}),
            $('<th/>',{text:date1,class:`c_statistics1 taE pY5 tnw`}),
            window.page.compare == 1 ? $('<th/>',{text:date2,class:`c_statistics2 taE pY5 tnw`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'fs09 pY5 tnw',text:texts.dashboard.orders}),
            $('<td/>',{class:'taE fs09 pY5 tnw'}).append(
                $('<span/>',{class:'',text:`${bigFloat(s1.orders)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.orders,s2.orders,texts.dashboard.deliveriesOrders_compare.replace(':delivery:',delivery_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5 tnw',text:`${bigFloat(s2.orders)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'fs09 pY5 tnw',text:texts.dashboard.time}),
            $('<td/>',{class:'taE fs09 pY5 tnw'}).append(
                $('<span/>',{class:'',text:`${minsToTime(s1.time)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.time,s2.time,texts.dashboard.deliveriesTime_compare.replace(':delivery:',delivery_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5 tnw',text:`${minsToTime(s2.time)}`}) : null,
        ),
        $('<tr/>',{}).append(
            $('<td/>',{class:'fs09 pY5 tnw',text:texts.dashboard.avgPerOrder}),
            $('<td/>',{class:'taE fs09 pY5 tnw'}).append(
                $('<span/>',{class:'',text:`${minsToTime(s1.avgPerOrder)}`}),
                window.page.compare == 1 ? $('<span/>',{html:compareNums(s1.avgPerOrder,s2.avgPerOrder,texts.dashboard.deliveriesAvg_compare.replace(':delivery:',delivery_name),false,false)}) : null,
            ),
            window.page.compare == 1 ? $('<td/>',{class:'taE fs09 pY5 tnw',text:`${minsToTime(s2.avgPerOrder)}`}) : null,
        ),
    )


    return $('<div/>',{class:''}).append(
        $('<div/>',{class:'row alnC jstfyS m5 mB10'}).append(
            $('<div/>',{class:'ico-delivery_accounts fs103'}),
            $('<a/>',{text:delivery_name,class:'fs101 mis-5 popupPage popupId mis-5',popupPage:'delivery_account',popupId:'delivery',delivery:s1.id}),
        ),
        deliveryTable
    )
}
//
