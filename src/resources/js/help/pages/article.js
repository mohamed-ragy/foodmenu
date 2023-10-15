

drawArticle = function(article,cat,section){
    $('.articaleContainer_loading').removeClass('none')
    $('#articaleContainer').text('')
    $('#articaleContainer_sections').text('')
    if(article in window.articlesData){
        drawArticlePage(window.articlesData[article],cat,section);
        return;
    }
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getArticle:true,
            article:article,
            cat:cat,
            lang:lang,
        },success:function(r){
            window.articlesData[article] = r.article;
            drawArticlePage(r.article,cat,section)
        }
    })
}
drawArticlePage = function(article,cat,section){
    // if(window.history.state.page == 'section' && window.history.state.article == article.title_id && window.history.state.cat == cat && $('#articaleContainer_sections').children().length > 0){
    //     console.log('gg')
    //     $('main').animate({'scrollTop':($(`#${section}`).position().top + 200)},200)
    //     setTimeout(()=>{
    //         $('.articaleContainer_section').removeClass('articaleContainer_section_selected')
    //         $(`.articaleContainer_section[section="${section}"]`).addClass('articaleContainer_section_selected')
    //     },300)
    //     return;
    // }
    let keyWords = article.keyWords.split('.');
    let relatedArticles = {}
    for(const key in keyWords){
        for(const key2 in articles){
            let thisKeywords = articles[key2].keyWords.split('.');
            if(articles[key2].id != article.id){
                if(thisKeywords.length > 0){
                    for(const key3 in thisKeywords){
                        if(thisKeywords[key3] == keyWords[key]){
                            relatedArticles[articles[key2].title_id] = articles[key2]
                        }
                    }
                }
            }
        }
    }
    // console.log(relatedArticles)

    let articleRateUpClass = '';
    let articleRateDownClass = '';
    if(typeof (Cookies.get(`articleRate_${article.title_id}`)) !== 'undefined'){
        if(Cookies.get(`articleRate_${article.title_id}`) == 'up'){
            articleRateUpClass = 'articleRateUp_selected';
        }else if(Cookies.get(`articleRate_${article.title_id}`) == 'down'){
            articleRateDownClass = 'articleRateDown_selected';
        }
    }
    document.title = `${article.title} | ${texts.helpCenter}`
    $('meta[name="description"]').attr('content',article.description)
    $('.articaleContainer_loading').addClass('none');
    $('#articaleContainer').text('').append(
        $('<div/>',{class:''}).append(
            $('<span/>',{class:`${article.icon} fs106 mie-7`}),
            $('<span/>',{class:'bold inter fs108',text:article.title}),
        ),
        $('<div/>',{class:'mT5 fs1 mxw650',text:article.description}),
        $('<div/>',{class:'articleSectionsContainer'}),
        $('<div/>',{class:'articleRateContainerWrapepr'}).append(
            $('<div/>',{class:'articleRateContainer'}).append(
                $('<div/>',{class:'articleRateThnxPopup',text:texts.thnxForRate}),
                $('<div/>',{text:texts.articleQuestion,class:'mie-10 fs103 fs1-720 tnw'}),
                $('<div/>',{class:`articleRateUp articleRateButton row alnC jstfyC ${articleRateUpClass}`}).append(
                    $('<div/>',{class:'mie-5',text:texts.yes}),
                    $('<div/>',{class:'ico-thumbsUp'}),
                ),
                $('<div/>',{class:`articleRateDown articleRateButton row alnC jstfyC ${articleRateDownClass}`}).append(
                    $('<div/>',{class:'mie-5',text:texts.no}),
                    $('<div/>',{class:'ico-thumbsDown'}),
                ),
            ),
        ),
        $('<div/>',{class:'mT40 relatedArticlesContainer'}).append(
            $('<div/>',{class:'bold fs103 mB5',text:texts.relatedArticles}),
            $('<div/>',{class:'relatedArticles column alnS jstfyS'})
        )
    );
    $('#articaleContainer_sections').text('').append(
        $('<div/>',{class:'bold mY5',text:texts.inThisArticle})
    );

    for(const key in article.help_sections){
        let section = article.help_sections[key];
        let sectionId = section.title.replaceAll(/\W/g, '_')
        $('#articaleContainer_sections').append(
            $('<a/>',{
                class:'articaleContainer_section openPage',
                page:'section',
                text:section.title,
                href:`/${lang}/articles/${cat}/${article.title_id}/${sectionId}`,
                section:sectionId,
                article:article.title_id,
                cat:cat,
            })
        )
        $('.articleSectionsContainer').append(
            $('<div/>',{class:'articleSectionContainer',id:sectionId}).append(
                $('<div/>',{text:section.title,class:'bold fs103 mB10'}),
                $('<div/>',{html:section.html})
            )
        )
    }

    if(Object.keys(relatedArticles).length > 0){
        for(const key in relatedArticles){
            $('.relatedArticles').append(
                $('<a/>',{
                    class:'row alnBL jstfyS fs09 mY5 bold openPage',
                    page:'article',
                    article:relatedArticles[key].title_id,
                    cat:relatedArticles[key].helpCat,
                    href:`/${lang}/articles/${relatedArticles[key].helpCat}/${relatedArticles[key].title_id}`,
                    tooltip:'article',
                    tooltipStyle:'left'
                }).append(
                    $('<span/>',{class:relatedArticles[key].icon+' mX5'}),
                    $('<span/>',{text:relatedArticles[key].title})
                )
            )
        }

    }else{
        $('.relatedArticlesContainer').addClass('none');
    }

    if(section == null){
        $('main').animate({'scrollTop':0},200)
    }else{
        setTimeout(()=>{
            $('main').animate({'scrollTop':($(`#${section}`).position().top + 50)},200)
            setTimeout(()=>{
                $('.articaleContainer_section').removeClass('articaleContainer_section_selected')
                $(`.articaleContainer_section[section="${section}"]`).addClass('articaleContainer_section_selected')
            },300)
        },300)

    }

    let visitedArticles = Cookies.get('visitedArticles');
    if(typeof(visitedArticles) === 'undefined'){
        Cookies.set('visitedArticles',JSON.stringify([article.title_id]),{expires:365 });
    }else{
        visitedArticles = JSON.parse(visitedArticles);
        visitedArticles.unshift(article.title_id);
        visitedArticles = [...new Set(visitedArticles)];
        visitedArticles = visitedArticles.slice(0,10);
        // console.log(visitedArticles)
        Cookies.set('visitedArticles',JSON.stringify(visitedArticles),{expires:365 });
    }

}

$('main').on('scroll',function(){
    if(window.history.state.page == 'article' || window.history.state.page == 'section'){
        let mainScrollTop = $('main').scrollTop() + 50;
        $('.articleSectionContainer').each(function(){
            if($(this).position().top <= mainScrollTop && parseFloat($(this).position().top) + parseFloat($(this).outerHeight()) >= mainScrollTop ){
                $('.articaleContainer_section').removeClass('articaleContainer_section_selected')
                $(`.articaleContainer_section[section="${$(this).attr('id')}"]`).addClass('articaleContainer_section_selected')
                return false;
            }
        })
    }
})

$('html,body').on('click','.articleRateButton',function(e){
    e.stopImmediatePropagation();
    let rate;
    let article = window.history.state.article;
    let currentRate = 'no_rate';
    if(typeof (Cookies.get(`articleRate_${article}`)) !== 'undefined'){
        currentRate = Cookies.get(`articleRate_${article}`);
    }
    if($(this).hasClass('articleRateUp') ){
        rate = 'up';
        $('.articleRateUp').addClass('articleRateUp_selected')
        $('.articleRateDown').removeClass('articleRateDown_selected')

    }else if($(this).hasClass('articleRateDown') ){
        rate = 'down'
        $('.articleRateUp').removeClass('articleRateUp_selected')
        $('.articleRateDown').addClass('articleRateDown_selected')
    }
    if(currentRate ==  rate){return;}
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            rateArticle:article,
            rate:rate,
            oldRate:currentRate,
        },success:function(r){
            Cookies.set(`articleRate_${article}`,rate,{expires:365 });
            for(const key in articles){
                if(articles[key].title_id == article){
                    currentRate == 'up' ? articles[key].upRates = parseInt(articles[key].upRates) - 1 :
                    currentRate == 'down' ? articles[key].downRate = parseInt(articles[key].downRates) - 1 : null;
                    rate == 'up' ? articles[key].upRates = parseInt(articles[key].upRates) + 1 :
                    rate == 'down' ? articles[key].downRates = parseInt(articles[key].downRates) + 1 : null;
                }
            }
            calcArticlesRates();
            $('.articleRateThnxPopup').addClass('articleRateThnxPopup_animation');
        }
    })

})

$('html,body').on('click','.articleImg',function(e){
    e.stopImmediatePropagation();
    $('.fullScreenImgcontainer').text('').append(
        $('<div/>',{class:'fullScreenImgClose ico-close'}),
        $('<img/>',{src:$(this).attr('src'),class:'fullScreenImg'})
    )
    $('.fullScreenImgcontainer').removeClass('none')
})
$('.fullScreenImgcontainer').on('click',function(){
    $('.fullScreenImgcontainer').addClass('none').text('')
})
