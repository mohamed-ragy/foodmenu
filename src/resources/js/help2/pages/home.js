drawHomeArticles = function(){
    calcArticlesRates();
    $('.homeRecentlyViewed').text('')
    $('.homeFeaturedArticles').text('')
    $('.homeRecentlyViewedTitle').removeClass('none');
    let visitedArticlesCookies = Cookies.get('visitedArticles');
    if(typeof(visitedArticlesCookies) !== 'undefined'){
        let visitedArticles = JSON.parse(visitedArticlesCookies);
        for(const key in visitedArticles){
            if(key < 10){
                let article = articles.find(item=>item.title_id == visitedArticles[key]);
                if(typeof(article !== 'undefined')){
                    try{
                        drawHomeArticle($('.homeRecentlyViewed'),article)
                    }catch{}
                }
            }
        }
    }else{
        $('.homeRecentlyViewedTitle').addClass('none');
    }

    let featuredArticles = [];
    if(typeof(visitedArticlesCookies) !== 'undefined'){
        let visitedArticles2 = JSON.parse(visitedArticlesCookies);
        for(const key in articles){
            if(typeof(visitedArticles2.find(item=> item == articles[key].title_id)) === 'undefined'){
                featuredArticles.push(articles[key]);
            }
        }
        featuredArticles.sort((a,b)=>{
            return b.rate - a.rate;
        })
        for(const key in featuredArticles){
            if(key < 10){
                drawHomeArticle($('.homeFeaturedArticles'),featuredArticles[key])
            }
        }
    }else{
        for(const key in articles){
            if(key < 10){
                drawHomeArticle($('.homeFeaturedArticles'),articles[key])
            }
        }
    }

}

drawHomeArticle = function(container,article){
    let catClassAndColor = catIconColor(article.helpCat);
    container.append(
        $('<a/>',{
            class:'openPage homeArticleCard',
            page:'article',
            article:article.title_id,
            cat:article.helpCat,
            href:`/${lang}/articles/${article.helpCat}/${article.title_id}`,
            // tooltip:'article',
            // tooltipStyle:'left'
        }).append(
            $('<div/>',{class:'fs101 bold row alnBL jstfyC'}).append(
                $('<span/>',{class:article.icon+' mie-5'}),
                $('<span/>',{text:article.title})
            ),
            $('<div/>',{class:'fs09',text:article.description})
        )
    )
}
