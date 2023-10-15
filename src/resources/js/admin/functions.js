$('#articleMaker').on('click',function(){
    window.location.href = '/articleMaker'
})
$(document).one('touchstart',function(){
    $('#sound').prop('muted',true);
    $('#sound')[0].play();
});
$(document).on('click',function(e){
    e.stopImmediatePropagation();
    $('.btnConfirm').removeClass('btnConfirm');
})
// $('#body').children().css('height',$('#body').height());
showContent = function(id,container,containerContainer,selectedClass=''){
    $(id).on('click',function(){
        $(containerContainer).children().css('opacity',0);
        setTimeout(function(){
            $(containerContainer).children().hide();
            $(container).css('display','flex');
            $(container).css('opacity',1)
        },250);
        if(selectedClass != ''){
            $('.'+selectedClass).removeClass(selectedClass);
            $(id).addClass(selectedClass);
        }
    });
}

getDateAndTime = function(timeStamp){
    if(String(timeStamp).includes("T")){timeStamp = timeStamp.replace(/T/g, " ")}
    time = new Date(timeStamp);
    format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :1,};
    timeFinal = time.toLocaleString('en',format);
    return timeFinal;
}

toggleMenu = function(){
    if($('#menu').attr('isOpen') == 'true'){
        $('#menu').css('top','-22.8em');
        $('#menu').attr('isOpen','false');
    }else{
        $('#menu').css('top',$('#headContainer').height() + $('#headContainer').position().top);
        $('#menu').attr('isOpen','true');
    }
}

handelGlobalChanel = function(r){

}
handelAdminsChanel = function(r){
    if(r.admin.status == 0){
        appendToTicketsList(r.admin.ticket,'prepend',true);
    }else if(r.admin.status == 1){
        appendToTicketsList(r.admin.ticket,'prepend',true);
        if($('#ticketPageContainer').attr('ticketId') == r.admin.msg.ticket_id){
            appendTicketMsg(r.admin.msg,r.admin.domainName);
        }
    }else if(r.admin.status == 2){
        ticket = r.admin.ticket;
        appendToTicketsList(r.admin.ticket,'prepend',true);
        if($('#ticketPageContainer').attr('ticketId') == r.admin.msg.ticket_id){
            appendTicketMsg(r.admin.msg,ticket.websites.domainName);
            
        }
    }else if(r.admin.status == 3){
        appendToTicketsList(r.admin.ticket,'prepend',true);
        if($('#ticketPageContainer').attr('ticketid') == r.admin.ticket.id){
            $('#ticketContainer-'+r.admin.ticket.id).trigger('click');
        }
    }
}

flashNumber = function(ticketName){
    isHeadenNumber = false;
    falshInterval = setInterval(function(){
        if(isHeadenNumber == false){
            isHeadenNumber = true;
            $('.'+ticketName+'Number').css('visibility','hidden');
        }else{
            isHeadenNumber = false;
            $('.'+ticketName+'Number').css('visibility','visible');
        }
    },1000);

    setTimeout(function(){
        clearInterval(falshInterval);
        $('.'+ticketName+'Number').css('visibility','visible');
    },6000)
}
