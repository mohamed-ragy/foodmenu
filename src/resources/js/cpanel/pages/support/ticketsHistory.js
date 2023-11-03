
appendNewTicketMsg = function(msg,append){
    let ticketMsgClass;
    let ticketMsgAuthor;
    let authorImg;
    let ticketMsgMSgClass;
    if(msg.author == 0){
        ticketMsgClass = 'ticketMsgwebsite';
        ticketMsgAuthor = website.domainName;
        authorImg = website.logo;
        ticketMsgMSgClass = 'ltr';
    }else if(msg.author == 1){
        ticketMsgClass = 'ticketMsgadmin';
        ticketMsgAuthor = 'Foodmenu';
        authorImg = '/storage/logo/logo.png';
        ticketMsgMSgClass = '';
    }

    $('#ticketBrowsermsgsContainer').append(
        $('<div/>',{
            class:'ticketMsgContainer '+ticketMsgClass,
        }).append(
            $('<div/>',{
                class:'row alnC jstfyC',
            }).append(
                $('<img/>',{
                    src:authorImg,
                    class:'ticketMsgAuthorImg websiteLogo'
                }),
                $('<div/>',{
                    text:ticketMsgAuthor,
                    class:'bold fs1 mX5'
                }),
            ),
            $('<div/>',{
                class:'ticketMsgMsg fs09 m20 '+ticketMsgMSgClass,
                html:msg.msg,
            }),
            $('<div/>',{
                class:' diffTimeCalc alnsE fs08',
                time:msg.created_at,
            })
        )
    )

}
getTickets = function(page=1,orderBy='created_at',order='desc'){
    if(account.is_master == false){return}
    $('.ticketContainerLoadingContainer').removeClass('none')
    $('#support-ticketsHistoryContainer').text('')
    $('.ticketHistoryNext').addClass('ticketHistoryArrow_dump')
    $('.ticketHistoryPrev').addClass('ticketHistoryArrow_dump')
    $('.ticketsCountContainer').text('')
    let skip = (page - 1) * 10;
    let ticketHistoryTRArrow_id = '';
    let ticketHistoryTRArrow_title = '';
    let ticketHistoryTRArrow_status = '';
    let ticketHistoryTRArrow_created = '';
    if(orderBy == 'id'){
        order == 'desc' ? ticketHistoryTRArrow_id = 'ico-down' : order == 'asc' ? ticketHistoryTRArrow_id = 'ico-up' : null;
    }
    if(orderBy == 'title'){
        order == 'desc' ? ticketHistoryTRArrow_title = 'ico-down' : order == 'asc' ? ticketHistoryTRArrow_title = 'ico-up' : null;
    }
    if(orderBy == 'status'){
        order == 'desc' ? ticketHistoryTRArrow_status = 'ico-down' : order == 'asc' ? ticketHistoryTRArrow_status = 'ico-up' : null;
    }
    if(orderBy == 'created_at'){
        order == 'desc' ? ticketHistoryTRArrow_created = 'ico-down' : order == 'asc' ? ticketHistoryTRArrow_created = 'ico-up' : null;
    }
    $.ajax({
        url:'support',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getTickets:true,
            skip:skip,
            orderBy:orderBy,
            order:order,
        },success:function(response){
            $('.ticketContainerLoadingContainer').addClass('none')
            if(response.ticketsCount == 0){
                $('#support-ticketsHistoryContainer').append(
                    $('<div/>',{class:'m10',text:texts.support.noTickets})
                    )
                }else{
                $('.ticketsCountContainer').attr('page',page);
                $('.ticketsCountContainer').text('').text(`${skip + 1}-${skip + response.tickets.length} ${texts.cpanel.public.of} ${response.ticketsCount}`);
                page == 1 ? $('.ticketHistoryPrev').addClass('ticketHistoryArrow_dump') : $('.ticketHistoryPrev').removeClass('ticketHistoryArrow_dump');
                (skip + response.tickets.length) >=  response.ticketsCount ?  $('.ticketHistoryNext').addClass('ticketHistoryArrow_dump') : $('.ticketHistoryNext').removeClass('ticketHistoryArrow_dump');

                $('#support-ticketsHistoryContainer').append(
                    $('<table/>').append(
                        $('<tr/>',{class:'trHead'}).append(
                            $('<th/>',{class:'ticketHistoryTR',key:'id'}).append(
                                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                                    $('<span/>',{text:texts.cpanel.public.noDot,class:'mie-10'}),
                                    $('<span/>',{class:`ticketHistoryTRArrow fs08 ${ticketHistoryTRArrow_id}`})
                                )
                            ),
                            $('<th/>',{class:'ticketHistoryTR',key:'title'}).append(
                                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                                    $('<span/>',{text:texts.support.title,class:'mie-10'}),
                                    $('<span/>',{class:`ticketHistoryTRArrow fs08 ${ticketHistoryTRArrow_title}`})
                                )
                            ),
                            $('<th/>',{class:'ticketHistoryTR',key:'status'}).append(
                                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                                    $('<span/>',{text:texts.support.status,class:'mie-10'}),
                                    $('<span/>',{class:`ticketHistoryTRArrow fs08 ${ticketHistoryTRArrow_status}`})
                                )
                            ),
                            $('<th/>',{class:'ticketHistoryTR none-720',key:'created_at'}).append(
                                $('<div/>',{class:'w100p row alnC jstfySB',}).append(
                                    $('<span/>',{text:texts.support.created,class:'mie-10'}),
                                    $('<span/>',{class:`ticketHistoryTRArrow fs08 ${ticketHistoryTRArrow_created}`})
                                )
                            ),
                        )
                    )
                )
                for(const key in response.tickets){
                    const ticket = response.tickets[key];
                    let ticketStatus;
                    if(ticket.status == 0 || ticket.status == 1){
                        ticketStatus = $('<div/>',{class:`ticketStatusTag`,text:texts.support.ticketOpen})
                    }else if(ticket.status == 3 || ticket.status == 4){
                        ticketStatus = $('<div/>',{class:`ticketStatus-${ticket.id} ticketStatusTag ticketStatusTag_solved`,text:texts.support.ticketSolved})
                    }else if(ticket.status == 2){
                        ticketStatus = $('<div/>',{class:`ticketStatus-${ticket.id} ticketStatusTag ticketStatusTag_pending`,text:texts.support.ticketPending})
                    }
                    $('#support-ticketsHistoryContainer').find('table').append(
                        $('<tr/>',{
                            class:'popupPage pointer ticketContainer',
                            popupPage:'ticket_browser',
                            ticket:ticket.id,
                        }).append(
                            $('<td/>',{class:'',text:ticket.id}),
                            $('<td/>',{class:'',text:ticket.title}),
                            $('<td/>',{class:'tnw'}).append(ticketStatus),
                            $('<td/>',{class:'tnw none-720',text:getDate(ticket.created_at).date.local})
                        )
                    )
                }
            }
        }
    })
}
$('html,body').on('click','.ticketHistoryTR',function(e){
    e.stopImmediatePropagation();
    let order = 'desc';
    if($(this).find('.ticketHistoryTRArrow').hasClass('ico-down')){
        order = 'asc';
    }
    getTickets(1,$(this).attr('key'),order)
})
$('html,body').on('click','.ticketHistoryNext',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ticketHistoryArrow_dump')){return;}
    let orderBy; let order;
    $('.ticketHistoryTRArrow').each(function(e){
        if($(this).hasClass('ico-down')){
            order = 'desc';
            orderBy = $(this).closest('.ticketHistoryTR').attr('key')
        }else if($(this).hasClass('ico-up')){
            order = 'asc';
            orderBy = $(this).closest('.ticketHistoryTR').attr('key')
        }
    })
    getTickets(parseInt($('.ticketsCountContainer').attr('page')) + 1,orderBy,order)

})
$('html,body').on('click','.ticketHistoryPrev',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ticketHistoryArrow_dump')){return;}
    let orderBy; let order;
    $('.ticketHistoryTRArrow').each(function(e){
        if($(this).hasClass('ico-down')){
            order = 'desc';
            orderBy = $(this).closest('.ticketHistoryTR').attr('key')
        }else if($(this).hasClass('ico-up')){
            order = 'asc';
            orderBy = $(this).closest('.ticketHistoryTR').attr('key')
        }
    })
    getTickets(parseInt($('.ticketsCountContainer').attr('page')) - 1,orderBy,order)

})

openHelpTicket = function(ticketNumber){
    $('#ticketBrowserContainer').text('');
    $('#ticketBrowserLoading').removeClass('none');
    $.ajax({
        url:'support',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getTicket:ticketNumber,
        },success:function(response){
            ticket = response.ticket;
            $('#ticketBrowserLoading').addClass('none');
            if(ticket == null){
                popupPageClose(false);
                return;
            }
            checkUseenNotifications([74],'ticket_id',ticketNumber)
            if(ticket.status == 0 || ticket.status == 1){ticketStatus = texts.support.ticketOpen;ticketStatusClass = ''}
            if(ticket.status == 2){ticketStatus = texts.support.ticketPending;ticketStatusClass = 'ticketStatusTag_pending'}
            if(ticket.status == 3 || ticket.status == 4){ticketStatus = texts.support.ticketSolved;ticketStatusClass = 'ticketStatusTag_solved'}
            $('#ticketBrowserContainer').append(
                $('<div/>',{
                    class:'row alnC jstfyC',
                }).append(
                    $('<div/>',{class:'ico-ticket fs102'}),
                    $('<div/>',{text:ticket.id,class:'mX5 bold'}),
                ),
                $('<div/>',{
                    text:getDate(ticket.created_at).date.local,
                    class:'fs08 mY3',
                }),
                $('<div/>',{text:ticketStatus,class:`fs08 ticketStatus-${ticket.id} ticketStatusTag ${ticketStatusClass}`}),
                $('<div/>',{
                    text:ticket.title,
                    class:'fs101 mT40 mB10 bold inter'
                }),
            )
            $('#ticketBrowserContainer').append(
                $('<div/>',{
                    text:ticket.msg,
                    class:'mB40 mX10 fs09'
                }),
                $('<div/>',{
                    id:'ticketBrowserImgsContainer',
                    class:'alnsE area wA',
                }).append(
                    $('<div/>',{text:texts.support.attachedImgs,class:'areaTitle'})
                ),
                $('<div/>',{
                    class:'w100p',
                    id:'ticketBrowsermsgsContainer',
                }),

            )
            ticketImgs = JSON.parse(ticket.imgs);
            if(ticketImgs.length == 0){
                $('#ticketBrowserImgsContainer').addClass('none');
            }
            for(const key in ticketImgs){
                $('#ticketBrowserImgsContainer').append(
                    $('<div/>',{
                        class:'row alnC jstfyS m5',

                    }).append(
                        $('<div/>',{class:'ico-attachment fs08'}),
                        $('<a/>',{
                            text:ticketImgs[key].split('-')[2],
                            class:'mX3 fs08',
                            href:'/storage/'+ticketImgs[key],
                            target:'_blank',
                        }),
                    )
                )
            }
            if(ticket.status == 0 || ticket.status == 1 || ticket.status == 2){
                $('#ticketBrowserContainer').append(
                    $('<div/>',{
                        id:'ticketBrowserInputContainer',
                    }).append(
                        $('<textarea/>',{
                            id:'ticketBrowserInput',
                            placeholder:texts.support.postTicketMsg,
                            maxlength:1000,
                        }),
                        $('<button/>',{
                            class:'btn mX5 mY0',
                            id:'ticketBrowserSendBtn',
                            text:texts.support.postTicketSend,
                            ticketId:ticket.id,
                        })
                    )
                )
            }
            for(const key in ticket.ticket_msgs){
                const msg = ticket.ticket_msgs[key];
                appendNewTicketMsg(msg,'append');
            }
        }
    })
}


$('html,body').on('click','#ticketBrowserSendBtn',function(e){
    e.stopImmediatePropagation();
    if($('#ticketBrowserInput').val() == ''){return}
    if(!coolDownChecker()){return;}
    showBtnLoading($('#ticketBrowserSendBtn'))
    let ticketId = $(this).attr('ticketId');
    $.ajax({
        url:'support',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sendTicketMSg:true,
            ticketId:$(this).attr('ticketId'),
            msg:$('#ticketBrowserInput').val(),
        },
        success:function(response){
            hideBtnLoading($('#ticketBrowserSendBtn'))
            appendNewTicketMsg(response.ticketMsg,'append');
            $('#ticketBrowserInput').val('');
            $('.ticketStatus-'+ticketId).text(texts.support.ticketOpen);
            $('.ticketStatus-'+ticketId).removeClass('ticketStatusTag_pending')
            $('#popupPageBody').animate({
                scrollTop:$('#popupPageBody').height() + $('#popupPageBody')[0].scrollHeight,
            },0)

        }
    })
})
