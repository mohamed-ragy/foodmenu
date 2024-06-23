

require('./search/events.js')
require('./search/homeSearchEvents.js')
require('./search/headerSearchEvents.js')
require('./search/mobileNavSearchEvents.js')


$('.headerSearch').on('focus',function(e){
    // console.log('headerSearch')
})
$('.mobileNavSearch').on('focus',function(e){
    // console.log('mobileNavSearch')
})

hideSearchLoading = function(){
    $('.searchLoading').addClass('none')
    $('.headerSearchLeft').find('.ico-search').removeClass('none')
    $('.mobileNavSearchLeft').find('.ico-search').removeClass('none')
    $('.homeSearchLeft').find('.ico-search').removeClass('none')
}
showSearchResaults = function(container,val){
    container.text('');
    if(val == ''){
        drawSearchResault_noVal(container);
    }else{
        clearTimeout(window.searchInputTimeout);
        window.searchInputTimeout = setTimeout(() => {
            drawSearchResault_Val(container,val);
        }, 1000);

    }
}

drawSearchResault_noVal = function(container){
    hideSearchLoading();
    let visitedArticlesCookies = Cookies.get('visitedArticles');
    if(typeof(visitedArticlesCookies) !== 'undefined'){
        container.append(
            $('<div/>',{text:window.texts.recentlyViewed,class:'m5 bold'})
        )
        let visitedArticles = JSON.parse(visitedArticlesCookies);
        for(const key in visitedArticles){
            if(key < 4){
                let article = window.articles.find(item=>item.title_id == visitedArticles[key]);
                if(typeof(article !== 'undefined')){
                    container.append(drawSearchArticle(article,container))
                }
            }
        }
        container.append(
            $('<div/>',{class:'w100p mY20'})
        )
    }
    container.append(
        $('<div/>',{text:window.texts.featuredArticles,class:'m5 bold'})
    )

    let featuredArticles = [];
    if(typeof(visitedArticlesCookies) !== 'undefined'){
        let visitedArticles2 = JSON.parse(visitedArticlesCookies);
        for(const key in window.articles){
            if(typeof(visitedArticles2.find(item=> item == window.articles[key].title_id)) === 'undefined'){
                featuredArticles.push(window.articles[key]);
            }
        }
        featuredArticles.sort((a,b)=>{
            return b.rating - a.rating;
        })
        for(const key in featuredArticles){
            if(key < 4){
                container.append(drawSearchArticle(featuredArticles[key],container))
            }
        }
    }else{
        window.articles.sort((a,b)=>{
            return b.rating - a.rating;
        })
        for(const key in window.articles){
            if(key < 4){
                container.append(drawSearchArticle(window.articles[key],container))
            }
        }
    }



}
drawSearchResault_Val = function(container,val){
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            search:val,
        },success:function(r){
            hideSearchLoading();
            if(r.results.length == 0){
                container.text('').append(
                    $('<div/>',{class:'mX5 mY10 fs102',text:texts.noResultsFound})
                )
            }else{
                for(const key in r.results){
                    container.append(drawSearchSection(r.results[key],container,val))
                }
            }
        }
    })
}

drawSearchArticle = function(article,container){
    console.log(article)
    let classs = '';
    if(container.hasClass('mobileNavSearchResults')){
        classs = 'brdrB1 br0 pY10';
    }
    return $('<a/>',{
                class:`${classs} searchElem openPage`,
                page:'article',
                article:article.title_id,
                href:`/${window.lang}/articles/${article.category}/${article.title_id}`
            }).append(
                $('<div/>',{class:'w100p'}).append(
                    $('<span/>',{class:`${article.icon}  mie-5`}),
                    $('<span/>',{class:'bold',text:article.title}),
                ),
                $('<div/>',{class:'ellipsis fs09 w100p-10 mX5',text:article.description})
            )
}

drawSearchSection = function(section,container,val){
    let article = window.articles.find(item=> item.id == section.article_id);
    if(typeof(article) === 'undefined'){return '';}
    let classs = '';
    if(container.hasClass('mobileNavSearchResults')){
        classs = 'brdrB1 br0 pY10';
    }
    let valWords = val.split(' ');
    let sectionTitle = section.title;
    for(const key in valWords){
        let regEx = new RegExp(valWords[key], "ig");
        sectionTitle = sectionTitle.replaceAll(regEx,`<span class="bold">${valWords[key]}</span>`)
    }
    return $('<a/>',{
                class:`${classs} searchElem openPage pY10`,
                page:'article',
                article:article.title_id,
                section:section.title.replaceAll(/\W/g, '_'),
                href:`/${lang}/articles/${article.category}/${article.title_id}/${section.title.replaceAll(/\W/g, '_')}`
            }).append(
                $('<div/>',{class:' fs101 mB2 c1txt',html:sectionTitle}),
                $('<div/>',{class:''}).append(
                    $('<span/>',{text:window.texts.cats[article.category.replaceAll('-','')]}),
                    $('<span/>',{class:'mX3 ico-right fs07',}),
                    $('<span/>',{text:article.title})
                )
            )
}

