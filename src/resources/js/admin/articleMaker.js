require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
$(document).ready(function(){  

    addSection = function(){
        $('#sectionsContainer').append(
            $('<div/>',{
                class:'sectionContainer',
                sectionSort:$('.sectionContainer').length + 1,
            }).append(
                $('<div/>',{style:'display:flex;width:100%;'}).append(
                    $('<span/>',{class:'ico-close removeSection',style:'color:red;'}),
                    $('<input/>',{
                        class:'sectionTitle',
                        placeholder:'Dummy Section Title',
                    }),
                ),
                $('<div/>',{
                    class:'sectionBody',
                }).append(
                    $('<div/>',{
                        class:'sectionOptions',
                    }).append(
                        $('<span/>',{class:'sectionOption addP ico-description'}),
                        $('<span/>',{class:'sectionOption addImg ico-image'}),
                        $('<span/>',{class:'sectionOption addHint ico-lamp'}),
                        $('<span/>',{class:'sectionOption addTip ico-info'}),
                    )
                )
            )
        )
    }
    $('#tutMaker').on('click','.removeSection',function(){
        $(this).parent().parent().remove();
    });
    $('#tutMaker').on('mouseover','.sectionContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.sectionOptions').show();
    });
    $('#tutMaker').on('mouseleave','.sectionContainer',function(e){
        e.stopImmediatePropagation();
        $(this).find('.sectionOptions').hide();
    });


    $('#tutMaker').on('click','.addP',function(e){
        e.stopImmediatePropagation();
        $(this).parent().parent().append(
            $('<div/>',{
                style:'display:flex'
            }).append(
                $('<span/>',{class:'ico-close removeP',style:'color:red;margin-inline-end:1em;'}),
                $('<div/>',{
                    class:'sectionP',
                    contentEditable:true,
                    text:'Section Paragraph',
                }),
            )

        )
    })
    $('#tutMaker').on('click','.removeP',function(){
        $(this).parent().remove();
    });
    $('#tutMaker').on('click','.addImg',function(e){
        $(this).parent().parent().append(
            $('<div/>',{
                style:'display:flex;'
            }).append(
                $('<span/>',{class:'ico-close removeP',style:'color:red;margin-inline-end:1em;'}),
                $('<div/>',{
                    style:'width:100%;display:flex;flex-direction:column;'
                }).append(
                    $('<img/>',{
                        class:'sectionImg',
                        // src:'/storage/imgs/noimg.png'
                    }),
                    $('<input/>',{class:'sectionImgInput',style:'align-self:center;'}),
                )

            ),
        )
    });
    $('#tutMaker').on('change','.sectionImgInput',function(e){
        $(this).parent().find('.sectionImg').attr('src','/storage/imgs/help/'+$(this).val()+'.PNG')
    })




    $('.toolsElement2').on('click',function(e){
        e.stopImmediatePropagation();
        if($(this).attr('action') == 'a'){
            let sel = window.getSelection();
            let text = sel.toString();
            if ($(sel.anchorNode.parentNode).hasClass('sectionP')) {
                let a = document.createElement("a");
                // span.style.fontWeight = "bold";
                // $(a).attr('src',$('#link').val());
                a.href = $('#link').val();
                a.title = $('#link').val();
                a.text = text;
                if (sel.rangeCount) {
                    let range = sel.getRangeAt(0);
                    // range.surroundContents(a);
                    // sel.removeAllRanges();
                    // sel.addRange(range);
                    range.deleteContents();
                    range.insertNode(a);
                    return;
                }

            }
        }
    });

    $(document).on('click',function(){
        $('.toolsElementConfirm').removeClass('toolsElementConfirm');
    })
    $('.toolsElement').on('click',function(e){
        e.stopImmediatePropagation();
        if($(this).attr('action') == 'new'){
            if(!$(this).hasClass('toolsElementConfirm')){
                $(this).addClass('toolsElementConfirm');
                return;
            }
            $(this).removeClass('toolsElementConfirm');
            $('#tutTitle').val('');
            $('#sectionsContainer').text('')
        }else if($(this).attr('action') == 'addSection'){
            addSection();
        }
    })

});
