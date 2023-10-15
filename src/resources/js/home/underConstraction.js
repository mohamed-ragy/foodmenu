require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

$(window).ready(function(){
    // $('body').scrollTop($('.section[sectionNum="2"]').offset().top)
        $('.bodyAnimatedIcon').each(function(){
            $(this).css({
                opacity:'.5',transform:'translateY('+Math.round(Math.random() * $('body').innerHeight())+'px) translateX('+Math.round(Math.random() * $('body').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
            });
        })

        $('.bodyAnimatedIcon').each(function(){
            $(this).css('transition-duration','200000ms');
        });
        $('.bodyAnimatedIcon').each(function(){
            $(this).css({
                transform:'translateY('+Math.round(Math.random() * $('body').innerHeight())+'px) translateX('+Math.round(Math.random() * $('body').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
            })
        })
        setInterval(function(){
            $('.bodyAnimatedIcon').each(function(){
                $(this).css({
                    transform:'translateY('+Math.round(Math.random() * $('#top').innerHeight())+'px) translateX('+Math.round(Math.random() * $('#top').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
                })
            })
        },200000)
    setTimeout(function(){
        $('#topTxt').css({'transform':'translateX(0)','opacity':'1'})
        $('#imgContainer').css({'transform':'translateX(0)','opacity':'1'})
        setTimeout(function(){
            $('#learnMore').css({'transform':'translateY(0)','opacity':'1'})
        },500)
    },500)
    $('body').on('scroll',function(){
        // if($('body').scrollTop() > $('#mid').offset().top + ($('#mid').height() / 2)){
        if($('#mid').offset().top < $(window).height() / 3){
            // setTimeout(function(){
                $('#cardsContainer').children().eq(0).addClass('cardShow');
            // },100)
            setTimeout(function(){
                $('#cardsContainer').children().eq(1).addClass('cardShow');
            },300)
            setTimeout(function(){
                $('#cardsContainer').children().eq(2).addClass('cardShow');
            },600)
        }
        if($('#section1').offset().top < $(window).height() / 3){
            // setTimeout(function(){
                $('#section1Text').css({'transform':'translateX(0)','opacity':'1'})
                $('#img1Container').css({'transform':'translateX(0)','opacity':'1'})
            // },250)
        }
        if($('#section2').offset().top < $(window).height() / 3){
            // setTimeout(function(){
                $('#section2Text').css({'transform':'translateX(0)','opacity':'1'})
                $('#img2Container').css({'transform':'translateX(0)','opacity':'1'})
            // },250)
        }
        if($('#section3').offset().top < $(window).height() / 3){
            // setTimeout(function(){
                $('#section3Text').css({'transform':'translateX(0)','opacity':'1'})
                $('#img3Container').css({'transform':'translateX(0)','opacity':'1'})
            // },250)
        }
    })
    $('#learnMore').on('click',function(e){
        // $('body').animate({'scrollTop':$('body').height() - $('body')[0].scrollTop + $('#mid').offset().top},1000,'swing')
        $('body').animate({
            'scrollTop':$('#mid').offset().top - $('body').offset().top + $('body').scrollTop(),
        },500,'swing');
        setTimeout(function(){
            $('#cardsContainer').children().eq(0).addClass('cardShow');
        },800)
        setTimeout(function(){
            $('#cardsContainer').children().eq(1).addClass('cardShow');
        },1100)
        setTimeout(function(){
            $('#cardsContainer').children().eq(2).addClass('cardShow');
        },1400)
    });
    $('.card').on('mouseenter',function(e){
        e.stopImmediatePropagation();
        $(this).find('.cardReadMore').addClass('cardReadMoreHover')
    })
    $('.card').on('mouseleave',function(e){
        e.stopImmediatePropagation();
        $(this).find('.cardReadMore').removeClass('cardReadMoreHover')
    });
    $('.card').on('click',function(e){
        $('body').animate({
            'scrollTop':$('.section[sectionNum="'+$(this).attr('card')+'"]').offset().top - $('body').offset().top + $('body').scrollTop(),
        },500*$(this).attr('card'),'swing');
    });
    $('.signupBtn').on('click',function(e){
        e.stopImmediatePropagation();
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if ($(this).parent().find('.signupInput').val().match(validEmail)) {
            $('.signupContainer').hide();
            $('.loading').show();
            $('.wrongEmail').hide();
            let thisBtn = $(this);
            let email = $(this).parent().find('.signupInput').val();
            $.ajax({
                url:'/underConstractionSignup',
                type:'put',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    email:email,
                },
                success:function(r){
                    if(r.stat == 1){
                        $('.loading').hide();
                        $('.signupFail').hide();
                        $('.signupContainer').hide();
                        $('.signupSuccess').show();
                    }else if(r.stat == 0){
                        thisBtn.parent().parent().find('.signupFail').show();
                        $('.loading').hide();
                        $('.signupContainer').show();
                    }
                },
                error:function(){
                    thisBtn.parent().parent().find('.signupFail').show();
                    $('.loading').hide();
                    $('.signupContainer').show();
                }

            })

        }else{
            $(this).parent().parent().find('.wrongEmail').show();

        }
    })
});
