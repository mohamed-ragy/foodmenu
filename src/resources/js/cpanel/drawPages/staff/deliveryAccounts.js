drawPage_delivery_accounts = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.delivery_accounts}),
                $('<span/>',{class:'ico-help help-icon',helpId:''})
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_delivery_account',text:texts.staff.createDeliveryAccount}),
            ),
            $('<table/>',{id:'deliveryAccountsTable',class:'w100p'})
        )
    );
    drawDeliveryAccountsTable();
}
drawDeliveryAccountsTable = function(){
    if(website.deliveries.length == 0){
        $('#deliveryAccountsTable').text('').append(
            $('<div/>',{class:'mT10',text:texts.staff.noDeliveryAccounts})
        )
        return;
    }
    $('#deliveryAccountsTable').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'fs08 tnw taC vaM w5'}),
            $('<th/>',{class:'fs08 tnw taS vaM w50p',text:texts.staff.name}),
            $('<th/>',{class:'fs08 tnw taS vaM w50p',text:texts.staff.loginName}),
            $('<th/>',{class:'fs08 tnw taS vaM none-720',text:texts.staff.lastSeen}),
            $('<th/>',{class:'fs08 tnw taE vaM'}),
        )
    )
    for(const key in website.deliveries){
        let delivery = website.deliveries[key];

        $('#deliveryAccountsTable').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:'fs08 tnw taC vaM'}).append(
                    $('<span/>',{class:`deliveryOnlineIcon-${delivery.id}`})
                ),
                $('<td/>',{class:'fs08 tnw taS vaM mxw0 w50p'}).append(
                    $('<a/>',{delivery:delivery.id,class:'popupPage popupId wFC',popupPage:'delivery_account',popupId:'delivery',text:delivery.deliveryName.split('@')[0]})
                ),
                $('<td/>',{class:'fs08 tnw taS vaM mxw0 w50p copyVal pointer',copyVal:delivery.deliveryName,tooltip:texts.cpanel.public.clickToCopy}).append(
                    $('<span/>',{class:'block ellipsis',text:delivery.deliveryName}),
                ),
                $('<td/>',{class:'fs08 tnw taS vaM w100p none-720 '}).append(
                    $('<span/>',{class:`deliverylastSeen-${delivery.id} `,time:delivery.lastSeen})
                ),
                $('<td/>',{class:'fs08 tnw taE vaM'}).append(
                    $('<button/>',{class:'btn_table ico-password editDeliveryAccountPassword',delivery:delivery.id,tooltip:texts.staff.changePassword}),
                    $('<button/>',{class:'btn_table deleteDeliveryPerson ico-delete',delivery:delivery.id,tooltip:texts.cpanel.public.delete})
                ),
                
            )
        )
        setDeliveryManOnlineStatus(delivery.id)
    }
}
drawPopupPage_create_delivery_account = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_delivery_account}),
        $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').addClass('mxw100p-40 p20').append(
        drawInputText('','ico-edit','',texts.staff.deliveryName,'createDeliveryAccount_name','text',texts.staff.deliveryName,'100','clearVal','mT0','',false),
        drawInputText('','ico-password','',texts.staff.password,'createDeliveryAccount_password','password',texts.staff.password,'100','password','','',false),
        drawInputText('','ico-delivery_accounts','',texts.staff.loginName,'createDeliveryAccount_loginName','text',texts.staff.loginName,'100','copy','','',true),
        $('<div/>',{class:'btnContainer mT20'}).append(
            $('<button/>',{id:'createNewDeliveryAccountBtn',class:'btn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
            )
        )
    )
}
let deliveryAccountPopupPageOrdersInterval;
drawPopupPage_delivery_account = function(deliveryId){
    clearInterval(deliveryAccountPopupPageOrdersInterval)
    deliveryAccountPopupPageOrdersInterval = setInterval(()=>{
        if(!window.waitFor_loadWebsiteOrdersAndChats){        clearInterval(deliveryAccountPopupPageOrdersInterval);
            let delivery = website.deliveries.find(item=>item.id == deliveryId);
            let deliveryOrdersCounter = 0;
            let deliveryManOrdersNowTxt = texts.staff.deliveryManOrderNow;
            
            for(const key in website.incompleteOrders){
                if(website.incompleteOrders[key].delivery_id == delivery.id){
                    deliveryOrdersCounter = deliveryOrdersCounter + 1;
                }
            }
            deliveryOrdersCounter == 1 ? deliveryManOrdersNowTxt = texts.staff.deliveryManOrderNow : deliveryManOrdersNowTxt = texts.staff.deliveryManOrdersNow ;
            $('#popupPageTitle').append(
                $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.delivery_account}),
                // $('<span/>',{class:'ico-help help-icon',helpId:''})
            );
            $('#popupPageBody').addClass('p10 mnw400').append(
                $('<div/>',{class:'row alnBL jstfyS mX10'}).append(
                    $('<div/>',{class:'ico-delivery_accounts',}),
                    $('<div/>',{class:'fs1 mX5',text:delivery.deliveryName.split('@')[0]})
                ),
                $('<div/>',{class:'mX5 row alnC jstfyS'}).append(
                    $('<div/>',{class:`deliveryOnlineIcon-${delivery.id}`}),
                    $('<div/>',{class:`fs08 deliverylastSeen2-${delivery.id}`}) 
                ),
                $('<div/>',{class:'fs08 mX5',text:deliveryManOrdersNowTxt.replace(':num:',deliveryOrdersCounter)}),
                $('<div/>',{class:'area mT40'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.staff.ordersWithDelivery}),
                    $('<div/>',{class:'deliveryAccountPopupPageOrders'})
                )
            );
            $('.deliveryAccountPopupPageOrders').text('')
            if(deliveryOrdersCounter == 0){
                $('.deliveryAccountPopupPageOrders').append(
                    $('<div/>',{class:'m10 fs08',text:texts.staff.deliveryPersonNoOrdersNow.replace(':delivery:',delivery.deliveryName.split('@')[0])})
                )
            }else{
                for(const key in website.incompleteOrders){
                    if(website.incompleteOrders[key].delivery_id == delivery.id){
                        $('.deliveryAccountPopupPageOrders').append(
                            $('<div/>',{class:'fs08'}).append(
                                $('<a/>',{order:website.incompleteOrders[key]._id,class:'popupId popupPage mie-5',popupId:'order',popupPage:'order',text:`#${website.incompleteOrders[key].id}`}),
                                $('<span/>',{class:'diffTimeCalc',time:website.incompleteOrders[key].withDelivery_at,timeText:texts.staff.handedToDeliveryMan.replace(':delivery:',delivery.deliveryName.split('@')[0])})
                            )
                        )
                    }
                }
            }
            setDeliveryManOnlineStatus(delivery.id)
        
        }

    },100)

}
