draw_mobileNav = function(){
    $('.mobileNav').text('').append(
        $('<div/>',{class:'mobileNavSearchContainer'}).append(
            $('<div/>',{class:'mobileNavSearchLeft'}).append(
                $('<div/>',{class:'fs102 mie-5 ico-search'}),
                $('<div/>',{class:'searchLoading loading_s vV'}),
            ),
            $('<input/>',{type:'text',class:'mobileNavSearch',placeholder:texts.searchPlaceHolder}),
            $('<div/>',{class:'mobileNavSearchRight'}).append(
                $('<div/>',{class:'mobileNavOpenSearchBtn ico-down w25 h25'})
            )
        ),
        $('<div/>',{class:'mobileNavSearchResultsContainer mobileNavSearchResultsContainer_hidden'}).append(
            $('<div/>',{class:'mobileNavSearchResults'})
        ),
        $('<div/>',{class:'mobileNav_Body'})
    )
    for(const key in window.categories){
        let category = window.categories[key];
        let thisNavArticles;
        $('.mobileNav_Body').append(
            $('<div/>',{class:'navGroup',category:category}).append(
                $('<div/>',{class:'navGroupHead'}).append(
                    $('<div/>',{class:'ico-right navGroupHeadArrow'}),
                    $('<div/>',{class:'navGroupHeadName',text:texts.cats[category.replaceAll('-','')]})
                ),
                thisNavArticles = $('<ul/>',{class:'navArticles'})
            )
        )
        for(const key2 in window.articles){
            let article = window.articles[key2];
            if(article.category == category){
                thisNavArticles.append(
                    $('<li/>',{class:'navArticle'}).append(
                        $('<a/>',{
                            text:article.title,
                            class:'openPage navArticleA',
                            page:'article',
                            article:article.title_id,
                            href:`/${lang}/articles/${category}/${article.title_id}`
                        })
                    )
                )
            }
        }
    }
}
$('html,body').on('click','.headMobileNavIcon',function(e){
    e.stopImmediatePropagation();
    $('.headMobileNavIcon').removeClass('headMobileNavIcon ico-menu2').addClass('MobileNavIconClose ico-close')
    $('header').addClass('header_notHome')
    $('.mobileNav').removeClass('mobileNav_hidden')
})
$('html,body').on('click','.MobileNavIconClose',function(e){
    e.stopImmediatePropagation();
    hidemobileNav();
})

hidemobileNav = function(){
    $('.MobileNavIconClose').addClass('headMobileNavIcon ico-menu2').removeClass('MobileNavIconClose ico-close')
    // if(window.history.state.page == 'home' && $('main').scrollTop() == 0){
    //     $('header').removeClass('header_notHome')
    // }
    $('.mobileNav').addClass('mobileNav_hidden')
    hideMobileNavSearch();
}
$('main').on('scroll',function(){
    if(window.history.state.page == 'home' && $('main').scrollTop() == 0){
        $('header').removeClass('header_notHome header_shadow')
    }
});
