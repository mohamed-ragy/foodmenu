let sKeyPressed = false;
$('html,body').keydown(function(e){
    if(e.keyCode  == 83){
        sKeyPressed = true;
    }
})
$('html,body').keyup(function(e){
    if(e.keyCode  == 83){
        sKeyPressed = false;
    }
});
/////
drawAutoHelp = function(helpId){
    if($(`.autoHelpContainer[helpNumber=${helpId}]`).length == 0){
        $('#helpWindow').prepend(
            $('<div/>',{class:'autoHelpContainer none',helpNumber:helpId}).append(
                $('<div/>',{class:'autoHelpHead'}).append(
                    $('<div/>',{class:'autoHelpTitle'}).append($('<span/>',{text:autoHelp_text[helpId].title})),
                    $('<div/>',{class:'autoHelpHeadIcons'}).append(
                        $('<span/>',{class:'ico-minimize autoHelpHeadIcon autoHelpMinMax',tooltip:texts.cpanel.public.minimize}),
                        $('<span/>',{class:'ico-close fs08 autoHelpHeadIcon autoHelpClose',tooltip:texts.cpanel.public.close}),
                    )
                ),
                $('<div/>',{class:'autoHelpContent'}).append(autoHelp_text[helpId].content),
                $('<div/>',{class:'autoHelpRateContainer'}).append(
                    $('<span/>',{class:'ico-fullScreen autoHelpBottomIcon autoHelpFullScreenClass',tooltip:texts.cpanel.public.fullScreen}),
                    $('<span/>',{class:'ico-unbin autoHelpBottomIcon autoHelpPinUnpin',tooltip:`${texts.cpanel.public.pin}</span><span class="hotKeys">${texts.cpanel.hotKeys.binUnbinHotKey}</span></div>`}),
                    $('<span/>',{class:'fs1 ico-thumbsUp autoHelpBottomIcon autoHelpUp',tooltip:texts.cpanel.public.helpful}),
                    $('<span/>',{class:'fs1 ico-thumbsDown autoHelpBottomIcon autoHelpDown',tooltip:texts.cpanel.public.unhelpful}),
                )
            )
        )
    }
}
autoHelp = class {
    constructor(helpNum=null){
        if(helpNum == null){this.helpElem = $('.autoHelpContainer')}else{
            this.helpNum = helpNum;
            drawAutoHelp(helpNum);
            this.helpElem = $(`[helpNumber=${helpNum}]`)
        }
    }
    show(force=false) {
        if(force){
            this.helpElem.removeClass('none').prependTo('#helpWindow')
            $('#helpWindow').stop().animate({'scrollTop':'0'},250)
        }else{
            if(this.helpNum == null || this.helpNum == ''){return}
            if(sKeyPressed){return}
            if(settings_temp.autoHelp == false){return;}
            if(this.helpElem.index() != 0 || this.helpElem.hasClass('none')){
                this.helpElem.removeClass('none').prependTo('#helpWindow')
            }
            $('#helpWindow').stop().animate({'scrollTop':'0'},250)
        }
    }
    close(update=true){
        this.helpElem.closest('.autoHelpContainer').addClass('none')
        this.helpElem.find('.autoHelpMinMax').removeClass('ico-maximize').addClass('ico-minimize').attr('toolTip',texts.cpanel.public.minimize)
        this.helpElem.find('.autoHelpContent').removeClass('none')
        this.helpElem.find('.autoHelpRateContainer').removeClass('none')
        this.helpElem.find('.autoHelpPinUnpin').addClass('ico-unbin').removeClass('ico-pin')
        if(update){
            let helpTipCheck = account.helpTips.find(item=> item.helpNum == this.helpNum);
            if(typeof(helpTipCheck) !== 'undefined'){
                update ? this.update('unpin') : null;
            }
        }
    }
    update(action){
        let helpTip = account.helpTips.find(item=> item.helpNum == this.helpNum);
        if(typeof(helpTip) === 'undefined'){
            account.helpTips.push({
                helpNum:this.helpNum,
                is_pined:0,
                rateUp:0,
                rateDown:0,
                min:0,
            })
        }
        switch (action) {
            case 'min':
                account.helpTips.find(item=> item.helpNum == this.helpNum).min = 1;
            break;
            case 'max':
                account.helpTips.find(item=> item.helpNum == this.helpNum).min = 0;
            break;
            case 'pin':
                account.helpTips.find(item=> item.helpNum == this.helpNum).is_pined = 1;
            break;
            case 'unpin':
                account.helpTips.find(item=> item.helpNum == this.helpNum).is_pined = 0;
            break;
            case 'rateUp':
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateUp = 1;
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateDown = 0;
                break;
            case 'rateDown':
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateDown = 1;
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateUp = 0;
                break;
            case 'unRate':
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateUp = 0;
                account.helpTips.find(item=> item.helpNum == this.helpNum).rateDown = 0;
            break;
            default:
            break;
        }
        for(const key in account.helpTips){
            if(account.helpTips[key].is_pined == 0 && account.helpTips[key].rateUp == 0 && account.helpTips[key].rateDown == 0){
                account.helpTips.splice(key,1)
            }
        }
        this.save();
    }
    save(){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                saveHelpTips:account.helpTips,
            }
        })
    }
    select(){
        $('.selectedAutoHelp').removeClass('selectedAutoHelp');
        this.helpElem.addClass('selectedAutoHelp');
    }
    unselect(){
        $('.selectedAutoHelp').removeClass('selectedAutoHelp');
    }
    minMax(update=true){
        if(this.helpElem.find('.autoHelpMinMax').hasClass('ico-minimize')){
            this.helpElem.find('.autoHelpMinMax').removeClass('ico-minimize').addClass('ico-maximize').attr('toolTip',texts.cpanel.public.maximize)
            this.helpElem.find('.autoHelpContent').addClass('none')
            this.helpElem.find('.autoHelpRateContainer').addClass('none')
            update ? this.update('min') : null;
        }else{
            this.helpElem.find('.autoHelpMinMax').removeClass('ico-maximize').addClass('ico-minimize').attr('toolTip',texts.cpanel.public.minimize)
            this.helpElem.find('.autoHelpContent').removeClass('none')
            this.helpElem.find('.autoHelpRateContainer').removeClass('none')
            update ? this.update('max') : null;
        }
    }
    forceMin(){
        this.helpElem.find('.autoHelpMinMax').removeClass('ico-minimize').addClass('ico-maximize').attr('toolTip',texts.cpanel.public.maximize)
        this.helpElem.find('.autoHelpContent').addClass('none')
        this.helpElem.find('.autoHelpRateContainer').addClass('none')
    }
    pinUnpin(update=true){
        if(this.helpElem.find('.autoHelpPinUnpin').hasClass('ico-unbin')){
            this.helpElem.find('.autoHelpPinUnpin').removeClass('ico-unbin').addClass('ico-pin')
            this.helpElem.find('.autoHelpPinUnpin').attr('tooltip',`<div><span>${texts.cpanel.public.unPin} </span><span class='hotKeys'>${texts.cpanel.hotKeys.binUnbinHotKey}</span></div>`)
            update ? this.update('pin') : null;
        }else{
            this.helpElem.find('.autoHelpPinUnpin').addClass('ico-unbin').removeClass('ico-pin')
            this.helpElem.find('.autoHelpPinUnpin').attr('tooltip',`<div><span>${texts.cpanel.public.pin} </span><span class='hotKeys'>${texts.cpanel.hotKeys.binUnbinHotKey}</span></div>`)
            update ? this.update('unpin') : null;
        }
        updateToolTip();
    }
    forcePin(){
        this.helpElem.find('.autoHelpPinUnpin').removeClass('ico-unbin').addClass('ico-pin')
        this.helpElem.find('.autoHelpPinUnpin').attr('tooltip',`<div><span>${texts.cpanel.public.unPin} </span><span class='hotKeys'>${texts.cpanel.hotKeys.binUnbinHotKey}</span></div>`)
    }
    rateUp(update=true){
        if(!this.helpElem.find('.autoHelpUp').hasClass('autoHelpUpSelected')){
            this.helpElem.find('.autoHelpUp').addClass('autoHelpUpSelected ico-thumbsUp1').removeClass('ico-thumbsUp');
            this.helpElem.find('.autoHelpDown').removeClass('autoHelpDownSelected ico-thumbsDown1').addClass('ico-thumbsDown')
            update ? this.update('rateUp') : null;
        }else{
            this.helpElem.find('.autoHelpUp').removeClass('autoHelpUpSelected ico-thumbsUp1').addClass('ico-thumbsUp');
            update ? this.update('unRate') : null;
        }
    }
    forceRateUp(){
        this.helpElem.find('.autoHelpUp').addClass('autoHelpUpSelected ico-thumbsUp1').removeClass('ico-thumbsUp');
        this.helpElem.find('.autoHelpDown').removeClass('autoHelpDownSelected ico-thumbsDown1').addClass('ico-thumbsDown')
    }
    rateDown(update=true){
        if(!this.helpElem.find('.autoHelpDown').hasClass('autoHelpDownSelected')){
            this.helpElem.find('.autoHelpDown').addClass('autoHelpDownSelected ico-thumbsDown1').removeClass('ico-thumbsDown');
            this.helpElem.find('.autoHelpUp').removeClass('autoHelpUpSelected ico-thumbsUp1').addClass('ico-thumbsUp')
            update ? this.update('rateDown') : null;
        }else{
            this.helpElem.find('.autoHelpDown').removeClass('autoHelpDownSelected ico-thumbsDown1').addClass('ico-thumbsDown');
            update ? this.update('unRate') : null;
        }
    }
    forceRateDown(){
        this.helpElem.find('.autoHelpDown').addClass('autoHelpDownSelected ico-thumbsDown1').removeClass('ico-thumbsDown');
        this.helpElem.find('.autoHelpUp').removeClass('autoHelpUpSelected ico-thumbsUp1').addClass('ico-thumbsUp')
    }

    minAll(){
        $('.autoHelpContainer').each(function(){
            if(!$(this).hasClass('none')){
                $(this).find('.autoHelpMinMax').removeClass('ico-minimize').addClass('ico-maximize').attr('toolTip',texts.cpanel.public.maximize)
                 $(this).find('.autoHelpContent').addClass('none')
                 $(this).find('.autoHelpRateContainer').addClass('none')
            }
        })
        for(const key in account.helpTips){
            account.helpTips[key].min = 1;
        }
        this.save();
    }
    maxAll(){
        $('.autoHelpContainer').each(function(){
            if(!$(this).hasClass('none')){
                $(this).find('.autoHelpMinMax').addClass('ico-minimize').removeClass('ico-maximize').attr('toolTip',texts.cpanel.public.minimize)
                 $(this).find('.autoHelpContent').removeClass('none')
                 $(this).find('.autoHelpRateContainer').removeClass('none')
            }
        })
        for(const key in account.helpTips){
            account.helpTips[key].min = 0;
        }
        this.save();
    }
    clean(){
        $('.autoHelpContainer').each(function(){
            if(!$(this).hasClass('none') && $(this).find('.autoHelpPinUnpin').hasClass('ico-unbin')){
                new autoHelp($(this).attr('helpNumber')).close(false);
            }
        });
    }
    cleanAll(){
        $('.autoHelpContainer').each(function(){
            if(!$(this).hasClass('none')){
                new autoHelp($(this).attr('helpNumber')).close(false);
            }
        });

        for(const key in account.helpTips){
            account.helpTips[key].is_pined = 0;
            if(account.helpTips[key].is_pined == 0 && account.helpTips[key].rateUp == 0 && account.helpTips[key].rateDown == 0){
                account.helpTips.splice(key,1)
            }
        }

        this.save();

    }

}

loadPinnedHelp = function(){
    for(const key in account.helpTips){
        let helpTip = new autoHelp(account.helpTips[key].helpNum)
        account.helpTips[key].is_pined ? helpTip.show(true) : null;
        account.helpTips[key].is_pined ? helpTip.forcePin() : null;
        account.helpTips[key].rateUp ? helpTip.forceRateUp() : null;
        account.helpTips[key].rateDown ? helpTip.forceRateDown() : null;
        account.helpTips[key].min && account.helpTips[key].is_pined ? helpTip.forceMin() : null;

    }
}

$('html,body').on('click','.help-icon, [helpid]',function(e){
    e.stopImmediatePropagation();
    let helpTip = new autoHelp($(this).attr('helpId'));
    helpTip.show()
    helpTip.select();
});
$('html,body').on('mouseleave','.help-icon',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).attr('helpId')).unselect();
})
$('html,body').on('mouseenter','.help-icon',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('helpId') == null || $(this).attr('helpId') == ''){return;}
    new autoHelp($(this).attr('helpId')).select();
})
$('html,body').on('mouseenter','[autohelp]',function(e){
    if($(this).attr('autohelp') == null || $(this).attr('autohelp') == ''){return;}
    let helpTip = new autoHelp($(this).attr('autohelp'));
    helpTip.show()
    helpTip.select();
});

$('html,body').on('mouseleave','[autohelp]',function(){
    if($(this).attr('autohelp') == null || $(this).attr('autohelp') == ''){return;}
    new autoHelp($(this).attr('autohelp')).unselect();
});

$('html,body').on('click','.autoHelpClose',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).closest('.autoHelpContainer').attr('helpNumber')).close();
});
$('html,body').on('click','.autoHelpMinMax,.autoHelpHead',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).closest('.autoHelpContainer').attr('helpNumber')).minMax();
});
$('html,body').on('click','.autoHelpPinUnpin',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).closest('.autoHelpContainer').attr('helpNumber')).pinUnpin();
})

$('html,body').on('click','.autoHelpUp',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).closest('.autoHelpContainer').attr('helpNumber')).rateUp();
})
$('html,body').on('click','.autoHelpDown',function(e){
    e.stopImmediatePropagation();
    new autoHelp($(this).closest('.autoHelpContainer').attr('helpNumber')).rateDown();
})

$('html,body').on('click','.autoHelpFullScreenClass',function(e){
    e.stopImmediatePropagation();
    $('#windowsCover_autoHelp').show();
    $('#windowsCover_autoHelp').text('');
    $('#windowsCover_autoHelp').append(
        $('<div/>',{html:$(this).closest('.autoHelpContainer').html(),class:'autoHelpContainer-fullScreen'})
    );
    $('#windowsCover_autoHelp').find('.autoHelpRateContainer').hide();
    $('#windowsCover_autoHelp').children().first().find('.autoHelpContent').addClass('autoHelpContent_fullScreen');
    $('#windowsCover_autoHelp').children().first().find('.autoHelpHeadIcons').text('');
    $('#windowsCover_autoHelp').children().first().find('.autoHelpRateContainer').text('');
    $('#windowsCover_autoHelp').children().first().find('.autoHelpHeadIcons').append(
        $('<span/>',{class:'ico-close closeFullScreenAutoHelp pointer'})
    );
})
$('#windowsCover_autoHelp').on('click','.closeFullScreenAutoHelp',function(e){
    e.stopPropagation();
    $('#windowsCover_autoHelp').text('');
    $('#windowsCover_autoHelp').hide();
});

$('#windowsCover_autoHelp').on('click',function(){
    if($('.autoHelpContainer-fullScreen').is(':hover')){return;}
    $('.closeFullScreenAutoHelp').trigger('click')
})
$('#autoHelp-miniAll').on('click',function(){
    new autoHelp().minAll();
})
$('#autoHelp-maxAll').on('click',function(){
    new autoHelp().maxAll();
})
$('#autoHelp-clearUnpinned').on('click',function(){
    new autoHelp().clean();
})
$('#autoHelp-clearAll').on('click',function(){
    new autoHelp().cleanAll();
})

