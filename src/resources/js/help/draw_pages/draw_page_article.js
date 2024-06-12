draw_page_article = function(){
    draw_page_article_loading();
    let article = window.articles_data.find(item=>item.title_id == window.article.title_id)
    if(typeof(article) !== 'undefined'){
        drawArticlePage();
    }else{
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getArticle:true,
                article:window.article.title_id,
                category:window.article.category,
                lang:window.lang,
            },success:function(r){
                console.log(r)
                 window.articles_data.push(r.article)
                 drawArticlePage();
            }
        })
    }
}

draw_page_article_loading = function(){
    $('.page').text('').append(
        $('<div/>',{class:'articaleContainer_loading mT40'}).append(
            $('<div/>',{class:'w500 br5 mxw100p h30 cardLoading'}),
            $('<div/>',{class:'w600 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w600 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 mT40 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w600 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 mT40 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w600 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 mT40 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w600 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w700 mY10 br5 mxw100p h10 cardLoading'}),
            $('<div/>',{class:'w650 mY10 br5 mxw100p h10 cardLoading'})
        )
    )
}

drawArticlePage = function(){
    let article = window.articles_data.find(item=>item.title_id == window.article.title_id)
    let keyWords = article.keyWords.split('.');
    let relatedArticles = {}
    for(const key in keyWords){
        for(const key2 in window.articles){
            let thisKeywords = window.articles[key2].keyWords.split('.');
            if(window.articles[key2].id != article.id){
                if(thisKeywords.length > 0){
                    for(const key3 in thisKeywords){
                        if(thisKeywords[key3] == keyWords[key]){
                            relatedArticles[window.articles[key2].title_id] = window.articles[key2]
                        }
                    }
                }
            }
        }
    }
    let articleRateUpClass = '';
    let articleRateDownClass = '';
    if(typeof (Cookies.get(`articleRate_${article.title_id}`)) !== 'undefined'){
        if(Cookies.get(`articleRate_${article.title_id}`) == 'up'){
            articleRateUpClass = 'articleRateUp_selected';
        }else if(Cookies.get(`articleRate_${article.title_id}`) == 'down'){
            articleRateDownClass = 'articleRateDown_selected';
        }
    }

    $('.page').text('').append(
        $('<div/>',{class:'helpCenterTree row wrap alnC jstfyS mB20 fs09'}).append(
            $('<a/>',{class:'openPage',page:'home',text:texts.home,href:`/${lang}/`}),
            $('<span/>',{class:'ico-right fs07 mX5 c_white-10'}),
            $('<a/>',{class:'openPage',page:'category',category:article.category,text:texts.cats[article.category.replaceAll('-','')],href:`/${lang}/articles/${article.category}`}),
            $('<span/>',{class:'ico-right fs07 mX5 c_white-10'}),
            $('<a/>',{class:'openPage',page:'article',article:article.title_id,text:article.title,href:`/${lang}/articles/${article.category}/${article.title_id}`}),
        ),
        $('<div/>',{id  :'articleContainerWrapper'}).append(
            $('<div/>',{id:'articaleContainer'}).append(
                $('<div/>',{class:'mB5 mT40'}).append(
                    $('<span/>',{class:`${article.icon} fs106 mie-10`}),
                    $('<span/>',{class:'bold inter fs107',text:article.title}),
                ),
                $('<div/>',{class:'fs101 mxw650',text:article.description}),
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
            ),
            $('<div/>',{id:'articaleContainer_sections'}).append(
                $('<div/>',{class:'bold mY5',text:texts.inThisArticle})
            ),
        )
    )

    for(const key in article.sections){
        let section = article.sections[key];
        let sectionId = section.title.replaceAll(/\W/g, '_')
        $('#articaleContainer_sections').append(
            $('<a/>',{
                class:'articaleContainer_section',
                id:sectionId,
                text:section.title,
                section:sectionId,
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

    let visitedArticles = Cookies.get('visitedArticles');
    if(typeof(visitedArticles) === 'undefined'){
        Cookies.set('visitedArticles',JSON.stringify([article.title_id]),{expires:365 });
    }else{
        visitedArticles = JSON.parse(visitedArticles);
        visitedArticles.unshift(article.title_id);
        visitedArticles = [...new Set(visitedArticles)];
        visitedArticles = visitedArticles.slice(0,10);
        Cookies.set('visitedArticles',JSON.stringify(visitedArticles),{expires:365 });
    }
    if(window.history.state.section == '' || window.history.state.section == null){
        $('main').animate({'scrollTop':0},200)
    }else{
        scrollToSection(window.history.state.section);
    }
}


scrollToSection = function(section,scroll=true){
    window.history.replaceState({page:'article',article:window.history.state.article,section:section},'',`/${window.lang}/articles/${window.article.category}/${window.article.title_id}/${section}`)
    if(scroll){
        try{
            $('main').animate({'scrollTop':($(`#${section}`).position().top  + 30)},200)
        }catch{}
    }

}
$('main').on('scroll',function(){
    if(window.history.state.page == 'article' || window.history.state.page == 'section'){
        let mainScrollTop = $('main').scrollTop() + 50;
        $('.articleSectionContainer').each(function(){
            if($(this).position().top <= mainScrollTop && parseFloat($(this).position().top) + parseFloat($(this).outerHeight()) >= mainScrollTop ){
                scrollToSection($(this).attr('id'),false)
                $('.articaleContainer_section').removeClass('articaleContainer_section_selected')
                $(`.articaleContainer_section[section="${$(this).attr('id')}"]`).addClass('articaleContainer_section_selected')
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
        },success:function(r){
            Cookies.set(`articleRate_${article}`,rate,{expires:365 });
            $('.articleRateThnxPopup').addClass('articleRateThnxPopup_animation');
        }
    })

})
$('html,body').on('click','.articleImg',function(e){
    e.stopImmediatePropagation();
    console.log('gg')
    $('.fullScreenImgcontainer').text('').append(
        $('<div/>',{class:'fullScreenImgClose ico-close'}),
        $('<img/>',{src:$(this).attr('src'),class:'fullScreenImg'})
    )
    $('.fullScreenImgcontainer').removeClass('none')
})
$('.fullScreenImgcontainer').on('click',function(){
    $('.fullScreenImgcontainer').addClass('none').text('')
})
