
calcticketsNums = function(ticketsName){
    setInterval(() => {
        // $('#sound')[0].play();
        if(ticketsName == 'newTickets'){ticketsLength = $('#NewTicketsContainer').children().length}
        if(ticketsName == 'openTickets'){ticketsLength = $('#openTicketsContainer').children().length}
        if(ticketsName == 'pendingTickets'){ticketsLength = $('#pendingTicketsContainer').children().length}
        $('.'+ticketsName+'Number').text(ticketsLength);
        if(ticketsLength == 0){
            $('.'+ticketsName+'Number')
            .removeClass('numberRed')
            .removeClass('numberOrange')
            .removeClass('numberYellow')
            .addClass('numberGreen')
        }else if(ticketsLength > 0 && ticketsLength <= 3){
            $('.'+ticketsName+'Number')
            .removeClass('numberRed')
            .removeClass('numberOrange')
            .addClass('numberYellow')
            .removeClass('numberGreen')
        }else if(ticketsLength > 3 && ticketsLength <= 5){
            $('.'+ticketsName+'Number')
            .removeClass('numberRed')
            .addClass('numberOrange')
            .removeClass('numberYellow')
            .removeClass('numberGreen')
        }else if(ticketsLength > 5){
            $('.'+ticketsName+'Number')
            .addClass('numberRed')
            .removeClass('numberOrange')
            .removeClass('numberYellow')
            .removeClass('numberGreen')
        }
    }, 1000);
}


calcticketsNums('newTickets');
calcticketsNums('openTickets');
calcticketsNums('pendingTickets');

appendToTicketsList = function(ticket,append,FirstLoadTicketsCheck){
    $('#ticketContainer-'+ticket.id).remove();
    if(ticket.status == 0 ) {
        Container = $('#NewTicketsContainer');
        if(FirstLoadTicketsCheck){
            flashNumber('newTickets');
            $('#notification').prop('muted',false);
            $('#sound')[0].play();
        }
    }
    if(ticket.status == 1){
        Container = $('#openTicketsContainer');
        if(FirstLoadTicketsCheck){
            flashNumber('openTickets');
            $('#notification').prop('muted',false);
            $('#sound')[0].play();
        }
    }
    if(ticket.status == 2){
        Container = $('#pendingTicketsContainer');
        if(FirstLoadTicketsCheck){
            flashNumber('pendingTickets');
        }

    }
    if(ticket.status == 3){Container = $('#solvedTicketsContainer');}
    if(ticket.status == 4){Container = $('#closedTicketsContainer');}
    if(append == 'append'){
        Container.append(
            $('<div/>',{
                id:'ticketContainer-'+ticket.id,
                class:'ticketContainer',
                ticketID:ticket.id,
            }).append(
                $('<div/>',{
                    text:ticket.websites.domainName,
                    style:'margin:0 .5em;width:calc(20% - 1em);overflow:hidden;text-align:start;',
                }),
                $('<div/>',{
                    text:ticket.title,
                    style:'margin:0 .5em;width:calc(30% - 1em);overflow:hidden;text-align:start',
                }),
                $('<div/>',{
                    text:ticket.language,
                    style:'margin:0 .5em;width:calc(10% - 1em);overflow:hidden;text-align:start',
                }),
                $('<div/>',{
                    text:getDateAndTime(ticket.created_at),
                    style:'margin:0 .5em;width:calc(40% - 1em);overflow:hidden;text-align:end',
                }),
            )
        )
    }else if(append == 'prepend'){
        Container.prepend(
            $('<div/>',{
                id:'ticketContainer-'+ticket.id,
                class:'ticketContainer',
                ticketID:ticket.id,
            }).append(
                $('<div/>',{
                    text:ticket.websites.domainName,
                    style:'margin:0 .5em;width:calc(20% - 1em);overflow:hidden;text-align:start;',
                }),
                $('<div/>',{
                    text:ticket.title,
                    style:'margin:0 .5em;width:calc(30% - 1em);overflow:hidden;text-align:start',
                }),
                $('<div/>',{
                    text:ticket.language,
                    style:'margin:0 .5em;width:calc(10% - 1em);overflow:hidden;text-align:start',
                }),
                $('<div/>',{
                    text:getDateAndTime(ticket.created_at),
                    style:'margin:0 .5em;width:calc(40% - 1em);overflow:hidden;text-align:end',
                }),
            )
        )
    }

    if(FirstLoadTicketsCheck){
        showContent('#ticketContainer-'+ticket.id,'#ticketPageContainer','#ticketsContainer');
    }
}
appendTicketMsg = function(msg,domainName){
    if(msg.author == 0){
        $('#ticketMSgsContainer').append(
            $('<div/>',{
                class:'websiteTicketMsg',
                id:'ticketMsg-'+msg.id,
            }).append(
                $('<div/>',{
                    text:domainName,
                    style:'margin-bottom:1em;font-weight:bold;font-size:1.1em;'
                }),
                $('<div/>',{
                    text:msg.msg,
                }),
                $('<div/>',{
                    style:'width:100%;text-align:end;font-size:.8em;margin-top:1em;',
                    text:getDateAndTime(msg.created_at),
                })
            ),
        )
    }
    if(msg.author == 1){
        $('#ticketMSgsContainer').append(
            $('<div/>',{
                class:'adminTicketMsg',
                id:'ticketMsg-'+msg.id,
            }).append(
                $('<div/>',{
                    text:msg.admins.adminName,
                    style:'margin-bottom:1em;font-weight:bold;font-size:1.1em;text-align:end'
                }),
                $('<div/>',{
                    text:msg.msg,
                    style:'text-align:end',
                }),
                $('<div/>',{
                    style:'width:100%;text-align:start;font-size:.8em;margin-top:1em;',
                    text:getDateAndTime(msg.created_at),
                })
            ),
        )
    }
}

for(const key in newTickets){
    appendToTicketsList(newTickets[key],'append',false);
}

for(const key in openTickets){
    appendToTicketsList(openTickets[key],'append',false);
}

for(const key in pendingTickets){
    appendToTicketsList(pendingTickets[key],'append',false);
}

for(const key in solvedTickets){
    appendToTicketsList(solvedTickets[key],'append',false);
}

for(const key in closedTickets){
    appendToTicketsList(closedTickets[key],'append',false);
}


showContent('#tickets','#ticketsContainerContainer','#body');
showContent('#NewTickets','#NewTicketsContainer','#ticketsContainer','cardSelected');
showContent('#openTickets','#openTicketsContainer','#ticketsContainer','cardSelected');
showContent('#pendingTickets','#pendingTicketsContainer','#ticketsContainer','cardSelected');
showContent('#solvedTickets','#solvedTicketsContainer','#ticketsContainer','cardSelected');
showContent('#closedTickets','#closedTicketsContainer','#ticketsContainer','cardSelected');
showContent('#findTicket','#findTicketContainer','#ticketsContainer','cardSelected');

showContent('.ticketContainer','#ticketPageContainer','#ticketsContainer');

$('#tickets').trigger('click');
$('#solvedTickets').trigger('click');

$('#body').on('click','.ticketContainer',function(e){
    e.stopImmediatePropagation();
    $.ajax({
        url:'getInfo',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getTicket:$(this).attr('ticketID'),
        },
        success:function(r){
            ticket = r.ticket[0];
            if(ticket.status == 0){ticketStatus = 'New'; tickethided = '';}
            if(ticket.status == 1){ticketStatus = 'Open'; tickethided = '';}
            if(ticket.status == 2){ticketStatus = 'Pending'; tickethided = '';}
            if(ticket.status == 3){ticketStatus = 'Solved'; tickethided = 'hide';}
            if(ticket.status == 4){ticketStatus = 'Closed';tickethided = 'hide';}
            if(ticket.code == 0){ticketCode = 'account'}
            if(ticket.code == 1){ticketCode = 'billing&subscription'}
            if(ticket.code == 2){ticketCode = 'products&categories'}
            if(ticket.code == 3){ticketCode = 'orders'}
            if(ticket.code == 4){ticketCode = 'users&deliveryAccounts'}
            if(ticket.code == 5){ticketCode = 'websiteSystem'}
            if(ticket.code == 6){ticketCode = 'design'}
            if(ticket.code == 7){ticketCode = 'controlPanel'}
            if(ticket.code == 8){ticketCode = 'other'}
            if(ticket.code == 9){ticketCode = 'other'}


            $('#ticketPageContainer').text('');
            $('#ticketPageContainer').attr('ticketId',ticket.id);
            $('#ticketPageContainer').append(
                $('<div/>',{
                    text:'#'+ticket.id +' ('+ticketStatus+') ('+ticket.language+') ('+ticketCode+')',
                    style:'margin:1em;font-weight:bold;align-self:flex-start',
                }),
                $('<div/>',{
                    text:getDateAndTime(ticket.created_at),
                    style:'margin-bottom:1em;font-weight:bold;align-self:flex-start',
                }),
                $('<div/>',{
                    text:ticket.title,
                    style:'margin:1em 0;font-weight:bold;font-size:1.5em;',
                }),
                $('<div/>',{
                    text:ticket.msg,
                    style:'margin:1em 0;font-size:1em;',
                }),
                $('<div/>',{
                    id:'ticketImgsContainer',
                    class:'row',
                    style:'margin:1em 0;font-size:1em;',
                }),
                $('<hr/>',{
                    style:'margin:1em; width:calc(100% - 2em);',
                }),
                $('<div/>',{
                    class:'ticketMsgsContainer',
                    id:'ticketMSgsContainer',
                }),
                $('<hr/>',{
                    style:'margin:1em; width:calc(100% - 2em);',
                }),
                $('<div/>',{
                    class:'row '+tickethided ,
                    style:'align-items:stretch;margin:1em 0;',
                }).append(
                    $('<textArea/>',{
                        class:'textArea',
                        id:'sendTicketMsgTextArea',
                    }),
                    $('<button/>',{
                        class:'btn',
                        text:'Post',
                        id:'sendTicketMsgBtn',
                        ticketId:ticket.id,
                        websiteId:ticket.website_id,
                    }),
                    $('<div/>',{
                        class:'col '+tickethided,
                        style:'width:auto;',
                    }).append(
                        $('<button/>',{
                            class:'btn',
                            text:'Solved',
                            id:'solvedTicketMsgBtn',
                            style:'height:50%;width:100%;',
                            ticketId:ticket.id,
                            websiteId:ticket.website_id,
                        }),
                        $('<button/>',{
                            class:'btn',
                            text:'Close',
                            id:'closeTicketMsgBtn',
                            style:'height:50%;width:100%;',
                            ticketId:ticket.id,
                            websiteId:ticket.website_id,
                        }),
                    )
                ),

            )
            ticketImgs = JSON.parse(ticket.imgs);
            if(ticketImgs){
                ticketImgs.forEach(img => {
                    $('#ticketImgsContainer').append(
                        $('<img/>',{
                            class:'ticketAttachedImg',
                            src:'/storage/'+img,
                        })
                    )
                });
            }
            $('.ticketAttachedImg').on('click',function(e){
                e.stopImmediatePropagation();
                window.open($(this).attr('src'), '_blank');
            })

            for(const key in ticket.ticket_msgs){
                msg = ticket.ticket_msgs[key];
                appendTicketMsg(msg,ticket.websites.domainName);
            }


        }
    })


})

$('#ticketPageContainer').on('click','#sendTicketMsgBtn',function(){
    if($('#sendTicketMsgTextArea').val() == ''){return}
    $.ajax({
        url:'getInfo',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            postTicketMsg:$(this).attr('ticketId'),
            websiteId:$(this).attr('websiteId'),
            msg:$('#sendTicketMsgTextArea').val(),
        },
        success:function(r){
            // appendTicketMsg(r.msg,null);
            $('#sendTicketMsgTextArea').val('');
        }
    })
})

$('#ticketPageContainer').on('click','#solvedTicketMsgBtn',function(e){
    e.preventDefault();
    e.stopPropagation();
    if(!$(this).hasClass('btnConfirm')){
        $(this).addClass('btnConfirm');
    }else{
        $.ajax({
            url:'getInfo',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                ticketSolved:$(this).attr('ticketId'),
                websiteId:$(this).attr('websiteId'),
            },
            success:function(response){

            }
        })
    }
});

$('#ticketPageContainer').on('click','#closeTicketMsgBtn',function(e){
    e.preventDefault();
    e.stopPropagation();
    if(!$(this).hasClass('btnConfirm')){
        $(this).addClass('btnConfirm');
    }else{
        $.ajax({
            url:'getInfo',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                ticketClosed:$(this).attr('ticketId'),
                websiteId:$(this).attr('websiteId'),
            },
            success:function(response){

            }
        })
    }
});
//////////////////////////////////////////////

