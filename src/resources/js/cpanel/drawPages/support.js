drawPage_submit_a_help_ticket = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.submit_a_help_ticket}),
                $('<span/>',{class:'ico-help help-icon',helpId:'submit_ticket'})
            ),
            drawInputText('','ico-title','',texts.support.ticketTitle,'support-submitTicket-ticketTitle','text',texts.support.ticketTitle,100,'clearVal',),
            drawInputList('','ico-categories','',texts.support.ticketCode,'support-submitTicket-ticketCode',texts.support.selectTicketCode,100,'support-submitTicket-ticketCodeList',false),
            drawTextArea('','ico-description','',texts.support.ticketDescription,'support_submitTicket_ticketDescription',1000,''),
            $('<div/>',{id:'support-submitTicket-attachImgsContainer',class:'area'}).append(
                $('<div/>',{id:'support-submitTicket-attachedImgsTitle',class:'areaTitle',text:texts.support.attachedImgs}),
                $('<div/>',{id:'support-submitTicket-attachedImgs'}),
                $('<span/>',{id:'support-submitTicket-attachAnImg'}).append(
                    $('<span/>',{class:'fs08 ico-attachment'}),
                    $('<span/>',{class:'',text:texts.support.attachAnImg})
                ),
                $('<div/>',{class:'loading',id:'supprt-submitTicket-attachImgLoading'}),
            ),
            $('<div/>',{class:'btnContainer mT10'}).append(
                $('<button/>',{class:'btn',id:'support-submitTicket-submitTicketBtn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.support.submitTicketBtn}),
                    $('<div/>',{class:'btnLoading'})
                )
            ),
            $('<form/>',{id:'support-submitTicket-attachImgForm',enctype:'multipart/form-data'}).append(
                $('<input/>',{type:'file',name:'ticketUploadImg',id:'support-submitTicket-attachImgInputFile',accept:'image/png, image/jpeg, image/gif, image/bmp, image/webp',hidden:true})
            )

        )
    )
    setSubmitTicketInputList();
}
drawPage_ticket_history = function(){
    $('#pageWrapper').addClass('mxw1300')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.ticket_history}),
                $('<span/>',{class:'ico-help help-icon',helpId:'ticket_history'})
            ),
            $('<div/>',{class:'w100p mB10 row alnC jstfyE'}).append(
                $('<div/>',{class:'ticketsCountContainer'}),
                $('<div/>',{class:'ticketHistoryPrev ticketHistoryArrow_dump ico-left',tooltip:texts.cpanel.public.previous}),
                $('<div/>',{class:'ticketHistoryNext ticketHistoryArrow_dump ico-right',tooltip:texts.cpanel.public.next}),
            ),
            $('<div/>',{id:'support-ticketsHistoryContainer',class:'w100p overflowX-A'}),
            $('<table/>',{class:'ticketContainerLoadingContainer'}).append(
                $('<tr/>',{class:'trHead'}).append(
                    $('<th/>',{text:texts.cpanel.public.noDot}),
                    $('<th/>',{text:texts.support.title}),
                    $('<th/>',{text:texts.support.status}),
                    $('<th/>',{text:texts.support.created})
                )
            )
        )
    )
    for(i=1;i<=10;i++){
        $('.ticketContainerLoadingContainer').append(
            $('<tr/>',{class:'trHead'}).append(
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w30'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w400 w150-720'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
            )
        )
    }
    getTickets();
}
drawPopupPage_ticket_browser = function(ticketId){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.ticket_browser}),
        $('<span/>',{class:'ico-help help-icon',helpId:'ticket_browser'})
    );
    $('#popupPageBody').addClass('mxw1000 p10').append(
        $('<div/>',{id:'ticketBrowserContainer'}),
        $('<div/>',{class:'none',id:'ticketBrowserLoading'}).append(
            $('<div/>',{class:'cardLoading mX10 mY10 w200 h20 br10'}),
            $('<div/>',{class:'cardLoading mX10 mY10 w50p h10 br10'}),
            $('<div/>',{class:'cardLoading mX10 mY10 w50p h10 br10'}),
            $('<div/>',{class:'cardLoading mX10 mT50 mB10 w100p-20 h10 br10'}),
            $('<div/>',{class:'cardLoading mX10 mY10 w100p-20 h10 br10'}),
            $('<div/>',{class:'cardLoading mX10 mY10 w100p-20 h10 br10'}),
        )
    )
    openHelpTicket(ticketId);
}
