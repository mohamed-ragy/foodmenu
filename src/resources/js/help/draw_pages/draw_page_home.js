draw_page_home = function(){
    $('.page').append(
        $('<div/>',{class:'homeIntro'}).append(
            $('<div/>',{class:'column alnC jstfyS'}).append(
                $('<div/>',{class:'homeIntroTxt',text:window.texts.homeIntroTxt}),
                $('<div/>',{class:'homeSearchContainer'}).append(
                    $('<div/>',{class:'homeSearchLeft'}).append(
                        $('<div/>',{class:'fs102 mie-5 ico-search'}),
                        $('<div/>',{class:'searchLoading vV loading_s none'}),
                    ),
                    $('<input/>',{type:'text',class:'homeSearch',placeholder:window.texts.searchPlaceHolder}),
                    $('<div/>',{class:'homeSearchRight'}).append(
                        $('<div/>',{class:'homeOpenSearchBtn bold w25 h25',text:'/'})
                    )
                )
            )
        ),
        $('<div/>',{class:'homeCatsContainer'}),
        $('<div/>',{class:'homeBotSectionContainer'}).append(
            $('<div/>',{class:'fs105 bold inter mB10 mX20 homeRecentlyViewedTitle',text:texts.recentlyViewed}),
            $('<div/>',{class:'row wrap w100p alnSH jstfyS homeRecentlyViewed'})
        ),
        $('<div/>',{class:'homeBotSectionContainer'}).append(
            $('<div/>',{class:'fs105 bold inter mB10 mX20 ',text:texts.featuredArticles}),
            $('<div/>',{class:'row wrap w100p alnSH jstfyS homeFeaturedArticles'})
        ),

    )
    for(const key in window.categories){
        let category = window.categories[key];
        let category_classAndColor = categoryIconColor(category);
        $('.homeCatsContainer').append(
            $('<a/>',{class:'homeCatContainer openPage',page:'category',category:category,href:`/${window.lang}/articles/${category}`}).append(
                $('<div/>',{class:`${category_classAndColor.icon} homeCatContainerIcon`}).append(
                    $('<div/>',{class:'homeCatContainerIcon_after'}),
                    $('<div/>',{class:`${category_classAndColor.icon} homeCatContainerIcon2`}),
                ),
                $('<div/>',{class:' fs102 taS mT10 bold',text:texts.cats[category.replaceAll('-','')]}),
                $('<div/>',{class:'homeCatContainerDes taS fs09',text:texts.cats[`${category.replaceAll('-','')}_des`]})
            )
        )
    }
    drawHomeArticles();
}
drawHomeArticles = function(){
    window.articles.sort((a,b)=>{
        return b.rating - a.rating;
    })
    $('.homeRecentlyViewed').text('')
    $('.homeFeaturedArticles').text('')
    $('.homeRecentlyViewedTitle').removeClass('none');

    let visitedArticlesCookies = Cookies.get('visitedArticles');
    if(typeof(visitedArticlesCookies) !== 'undefined'){
        let visitedArticles = JSON.parse(visitedArticlesCookies);
        for(const key in visitedArticles){
            if(key < 10){
                let article = window.articles.find(item=>item.title_id == visitedArticles[key]);
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
        for(const key in window.articles){
            if(typeof(visitedArticles2.find(item=> item == window.articles[key].title_id)) === 'undefined'){
                featuredArticles.push(articles[key]);
            }
        }
        featuredArticles.sort((a,b)=>{
            return b.rating - a.rating;
        })
        for(const key in featuredArticles){
            if(key < 10){
                drawHomeArticle($('.homeFeaturedArticles'),featuredArticles[key])
            }
        }
    }else{
        for(const key in window.articles){
            if(key < 10){
                drawHomeArticle($('.homeFeaturedArticles'),window.articles[key])
            }
        }
    }

}
drawHomeArticle = function(container,article){
    container.append(
        $('<a/>',{
            class:'openPage homeArticleCard',
            page:'article',
            article:article.title_id,
            href:`/${lang}/articles/${article.category}/${article.title_id}`,
        }).append(
            $('<div/>',{class:'c_txt1 bold row alnBL jstfyC'}).append(
                $('<span/>',{class:article.icon+' mie-5 fs1'}),
                $('<span/>',{class:'fs101',text:article.title})
            ),
            $('<div/>',{class:'fs09 mT3',text:article.description})
        )
    )
}
