$('html,body').on('mouseenter','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    if($(this).attr('tooltip') == 'article'){
        let article = articles.find(item=> item.title_id == $(this).attr('article'));
            let relatedArticleTooltip = `<a class="articleTooltip openPage" page="article" article="${article.title_id}" cat="${article.helpCat}" href="/${lang}/articles/${article.helpCat}/${article.title_id}">
                <div class="bold fs102"><span class="${article.icon} mie-5"></span>${article.title}</div>
                <div class="mT2">${article.description}</div>
            </a>`;
            // if($(this).attr('tooltipStyle') == 'left'){
            //     $('#tooltip').html(relatedArticleTooltip).css({
            //         'top':parseFloat($(this).offset().top),
            //         'left':parseFloat($(this).offset().left) - $('#tooltip').outerWidth(),
            //         'display':'flex',
            //     })
            //     if($('#tooltip').offset().left < 0){
            //         $('#tooltip').html(relatedArticleTooltip).css({
            //             'top':parseFloat($(this).offset().top)  - 10 - $('#tooltip').height(),
            //             'left':parseFloat($(this).offset().left),
            //             'display':'flex',
            //         })
            //     }
            // }else{
                $('#tooltip').html(relatedArticleTooltip).css({
                    'top':parseFloat($(this).offset().top)  - 10 - $('#tooltip').height(),
                    'left':parseFloat($(this).offset().left),
                    'animation-name':'tooltipAnimation',
                    'display':'flex',
                })
            // }


    }
    else if($(this).attr('tooltip') == 'section'){

    }
    else{
        $('#tooltip').html($(this).attr('tooltip')).css({
            'top':parseFloat($(this).offset().top)  - 10 - $('#tooltip').height(),
            'left':parseFloat($(this).offset().left) - ($(this).width() / 2),
            'display':'flex',
            'animation-name':'tooltipAnimation',
        })
    }

    // if($('#tooltip').offset().left < 0){
    //     $('#tooltip').text($(this).attr('tooltip')).css({
    //         'left':0,
    //     })
    // }
    // if($('#tooltip').offset().top < 0){
    //     $('#tooltip').text($(this).attr('tooltip')).css({
    //         'top':parseFloat($(this).offset().top) + 25,
    //     })
    // }
})
$('html,body').on('mouseleave','#tooltip, [tooltip]',function(e){
    // e.stopImmediatePropagation();
    setTimeout(()=>{
        if($('#tooltip:hover').length <= 0 && $('[tooltip]:hover').length <= 0){
            $('#tooltip').text($(this).attr('tooltip')).css({
                'display':'none',
                'animation-name':'tooltipAnimation',
            })
        }
    },200)

})
