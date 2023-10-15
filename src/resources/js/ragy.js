require("./bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
$('body').trigger('click');

$(document).ready(function(){
    $('#soundControl').on('click',function(){
        if($(this).hasClass('icon-unmute')){
            $(this).removeClass('icon-unmute').addClass('icon-mute');
            $('#song')[0].volume = 0;
        }else{
            $(this).removeClass('icon-mute').addClass('icon-unmute');
            $('#song')[0].volume = 0.4;
        }
    })
    $('.bgIcon').each(function(){
        $(this).css({
            transform:'translateY('+Math.round(Math.random() * $('body').innerHeight())+'px) translateX('+Math.round(Math.random() * $('body').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 240)+'deg)',
        })
    })
    $('.bgIcon').each(function(){
        $(this).css('transition-duration','140000ms');
    });
    $('.bgIcon').each(function(){
        $(this).css({
            transform:'translateY('+Math.round(Math.random() * $('body').innerHeight())+'px) translateX('+Math.round(Math.random() * $('body').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 240)+'deg)',
        })
    })
    setInterval(function(){
        $('.bgIcon').each(function(){
            $(this).css({
                transform:'translateY('+Math.round(Math.random() * $('body').innerHeight())+'px) translateX('+Math.round(Math.random() * $('body').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 240)+'deg)',
            })
        })
    },140000);
    appendEnterButton = function(){
        $('#welcome').append(
            $('<div/>',{style:'width:100%;padding-top:.5em;display:flex;align-items:center;justify-content:flex-end;'}).append(
                $('<button/>',{id:'enterBtn',text:'See Portfolio!',class:'btn',style:'opacity:0;transition-duration: 1s;transform: translateX(-.5em);'})
            )
        )
        setTimeout(function(){
            $('#enterBtn').css({'opacity':'1','transform':'translateY(0em)'})
            setTimeout(function(){
                $('#enterBtn').css({'transition-duration':'0s'})
            },1000)
        },250)
    }
    let typingSpeed = 50;
    welcomeText5Fun = function(){
        let welcomeText5 = ' Feel free to explore my portfolio website.';
        welcomeText5 = welcomeText5.split('');
        let welcomeText5Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText5Interval = setInterval(() => {
                if(!$(document).hidden){
                    if(welcomeText5Counter == welcomeText5.length){
                        $('#clicks')[0].pause()
                        clearInterval(welcomeText5Interval)
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<span/>',{class:'textCursor',text:'|'}),
                        )
                        appendEnterButton();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText5[welcomeText5Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText5Counter = welcomeText5Counter + 1;
                }
            },typingSpeed);
        },500)
    }
    welcomeText4Fun = function(){
        let welcomeText4 = ' I thought I could add a twist this time around.';
        welcomeText4 = welcomeText4.split('');
        let welcomeText4Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText4Interval = setInterval(() => {
                    if(!$(document).hidden){
                    if(welcomeText4Counter== welcomeText4.length){
                        $('#clicks')[0].pause()
                        clearInterval(welcomeText4Interval)
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<br/>'),
                            $('<span/>',{class:'textCursor',text:'|'})
                        )
                        welcomeText5Fun();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText4[welcomeText4Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText4Counter = welcomeText4Counter + 1;
                }
            },typingSpeed);
        },2000)
    }
    welcomeText3fun = function(){
        let welcomeText3 = ' Instead of making a generic CV,';
        welcomeText3 = welcomeText3.split('');
        let welcomeText3Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText3Interval = setInterval(() => {
                if(!$(document).hidden){
                    if(welcomeText3Counter == welcomeText3.length){
                        $('#clicks')[0].pause();
                        clearInterval(welcomeText3Interval)
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<span/>',{class:'textCursor',text:'|'})
                        )
                        welcomeText4Fun();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText3[welcomeText3Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText3Counter = welcomeText3Counter + 1;
                }
            },typingSpeed);
        },1000)
    }
    welcomeText2Fun = function(){
        let welcomeText2 = ' I am a Full Stack web developer.';
        welcomeText2 = welcomeText2.split('');
        let welcomeText2Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText2Interval = setInterval(() => {
                if(!$(document).hidden){
                    if(welcomeText2Counter == welcomeText2.length){
                        $('#clicks')[0].pause();
                        clearInterval(welcomeText2Interval)
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<br/>'),
                            $('<span/>',{class:'textCursor',text:'|'})
                        )
                        welcomeText3fun();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText2[welcomeText2Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText2Counter = welcomeText2Counter + 1;
                }
            },typingSpeed);
        },1000)
    }
    welcomeText1Fun = function(){
        let welcomeText1 = ' My name is Mohamed Ragy.';
        welcomeText1 = welcomeText1.split('');
        let welcomeText1Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText1Interval = setInterval(() => {
                if(!$(document).hidden){
                    if(welcomeText1Counter == welcomeText1.length){
                        $('#clicks')[0].pause();
                        clearInterval(welcomeText1Interval)
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<br/>'),
                            $('<span/>',{class:'textCursor',text:'|'})
                        )
                        welcomeText2Fun();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText1[welcomeText1Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText1Counter = welcomeText1Counter + 1;
                }
            },typingSpeed);
        },2000)
    }
    welcomeText0Fun = function(){
        let welcomeText0 = 'Hello,';
        welcomeText0 = welcomeText0.split('');
        let welcomeText0Counter = 0;
        setTimeout(function(){
            $('#clicks')[0].currentTime = 0;
            $('#clicks')[0].play();
            $('#welcome').prepend($('<div/>',{style:'text-align:left;'}))
            welcomeText0Interval = setInterval(() => {
                if(!$(document).hidden){
                    if(welcomeText0Counter  == welcomeText0.length){
                        $('#clicks')[0].pause();
                        clearInterval(welcomeText0Interval);
                        $('.textCursor').remove();
                        $('#welcome').append(
                            $('<br/>'),
                            $('<span/>',{class:'textCursor',text:'|'})
                        )
                        welcomeText1Fun();
                    }
                    $('.textCursor').remove();
                    $('#welcome').append(
                        $('<span/>',{text:welcomeText0[welcomeText0Counter]}),
                        $('<span/>',{class:'textCursor',text:'|'})
                    )
                    $('#welcome').scrollTop($('#welcome').height());
                    welcomeText0Counter = welcomeText0Counter + 1;
                }
            },typingSpeed);
        },1000)
    }
    $('#FirstBtn').on('click',function(){
        // appendEnterButton();
        // $('#enterBtn').trigger('click');


        $('#welcomeContainer').css('transform','translateY(0)');
        $('#FirstBtn').animate({'opacity':'0'},500)
        $('#firstNote').animate({'opacity':'0'},500)
        setTimeout(function(){
            $('#firstNote').hide();
            $('#FirstBtn').hide();
            $('#FirstBtn').parent().hide();
            welcomeText0Fun();
        },750)
    })
//////////////////
    $(document).on('click','#enterBtn',function(){
        $('#welcomeContainer').css('transform','translateY(-100%)');
        $('#song')[0].play();
        $('#song')[0].volume = 0.4;
        $('#soundControl').css('transform','translateX(0)');
        setTimeout(function(){
            $('#welcomeContainer').hide();
            $('#container').css('transform','translateY(0)');
            // setTimeout(function(){
                $('.headBtn[btnAction="info"]').trigger('click')
            // },500)
        },500)
    });
    $('.headBtn').on('click',function(){
        if($(this).hasClass('headBtn_selected')){return}
        $('.headBtn').removeClass('headBtn_selected');
        $(this).addClass('headBtn_selected');
        $('.content').css('opacity','0');
        let thisContent = $('#'+$(this).attr('btnAction'))
        setTimeout(function(){
            $('.content').css('display','none');
            thisContent.css('display','flex');
            setTimeout(function(){
                thisContent.css('opacity','1')
            },100)
        },500)
    })


    //////////////////imgs
    $('.imgsImgContainer').on('click',function(){
        $('#imgMax').attr('src',$(this).children().first().attr('src'))
        $('#imgMax').attr('top',$(this).children().first().offset().top)
        $('#imgMax').attr('left',$(this).children().first().offset().left)
        $('#imgMax').attr('tempW',$(this).children().first().width())
        $('#imgMax').attr('temoH',$(this).children().first().height())
        $('#imgMax').css({
            'top':$(this).children().first().offset().top,
            'left':$(this).children().first().offset().left,
            'width':$(this).children().first().width(),
            'height':$(this).children().first().height(),
        })
        $(this).children().first().css('opacity','0');
        $('#imgMax').show();
        // $(this).children().first().addClass('imgMax');
        $('#imgMaxCover').show();
        $('#imgMaxCover').animate({'opacity':'1'},50)
        $('#imgMax').animate({
            'top':'0',
            'left':'0',
            'width':'100%',
            'height':'100%',
        },500)
    });
    $('#imgMax, #imgMaxCover').on('click',function(){
        // $(this).hide();
        // $('#imgMaxCover').hide();
        // $('#imgMaxCover').css({'opacity':'1'})
        $('#imgMaxCover').animate({'opacity':'0'},50)
        $('#imgMax').animate({
            'top':$('#imgMax').attr('top'),
            'left':$('#imgMax').attr('left'),
            'width':$('#imgMax').attr('tempW'),
            'height':$('#imgMax').attr('temoH'),
        },500)
        setTimeout(function(){
            $('#imgMaxCover').hide();
            $('#imgMax').hide();
            $('.imgsImg').css('opacity','1');
        },480)
    });
});
