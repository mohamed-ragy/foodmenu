open_page = function(page,page_key,push_history){
    $('main').removeClass('main_home main_full/')
    $('nav').removeClass('nav_hidden')
    $('.page').removeClass().addClass('page').text('');
    $('.page').addClass('page_hidden');
    $('#tooltip').css('display','none')
    $('main').scrollTop(0)
    hideHomeSearch();
    hideHeaderSearch();
    hideMobileNavSearch();
    hidemobileNav();
    setTimeout(function(){
        switch(page){
            case 'home':
                hideHomeSearch();
                $('.page').addClass('page_home');
                $('main').addClass('main_home main_full')
                $('nav').addClass('nav_hidden')
                if( $('main').scrollTop() == 0 ){
                    header_home_intro();
                }
                if(push_history == true){
                    window.history.pushState({page:'home'},'',`/${window.lang}/home`)
                }else{
                    window.history.replaceState({page:'home'},'',`/${window.lang}/home`)
                }
                document.title = `${texts.title}`
                $('meta[name="description"]').attr('content',texts.description)
                setTimeout(()=>{
                    draw_page_home();
                    setHomeSearch();
                },200)
            break;
            case 'article':
                window.article = window.articles.find(item=>item.title_id == page_key.article);
                open_nav_group(window.article.category)
                $(`.navArticleA[article="${window.article.title_id}"]`).addClass('navArticleA_selected')
                if(push_history == true){
                    window.history.pushState({page:'article',article:window.article.title_id,section:page_key.section},'',`/${window.lang}/articles/${window.article.category}/${window.article.title_id}/${page_key.section}`)
                }else{
                    window.history.replaceState({page:'article',article:window.article.title_id,section:page_key.section},'',`/${window.lang}/articles/${window.article.category}/${window.article.title_id}/${page_key.section}`)
                }
                document.title = `${window.article.title}`
                $('meta[name="description"]').attr('content',window.article.description)
                header_shdow();
                draw_page_article()
            break;
            case 'category':
                window.category = page_key.category;
                open_nav_group(page_key.category)
                if(push_history == true){
                    window.history.pushState({page:'category',category:page_key.category},'',`/${window.lang}/articles/${page_key.category}/`)
                }else{
                    window.history.replaceState({page:'category',category:page_key.category},'',`/${window.lang}/articles/${page_key.category}/`)
                }
                document.title = `${texts.cats[page_key.category.replaceAll('-','')]}`
                $('meta[name="description"]').attr('content',texts.cats[`${page_key.category.replaceAll('-','')}_des`])
                header_shdow();
                draw_page_category()
            break;
        }
        $('.page').removeClass('page_hidden')
    },200)

}
$('html,body').on('click','.openPage',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    if($(this).attr('page') == 'home'){
        open_page($(this).attr('page'),{},true)
    }else if($(this).attr('page') == 'article'){
        if(window.history.state.article == $(this).attr('article')){return}
        open_page($(this).attr('page'),{article:$(this).attr('article'),section:$(this).attr('section') ?? ''},true)
    }else if($(this).attr('page') == 'category'){
        if(window.history.state.category == $(this).attr('category')){return}
        open_page($(this).attr('page'),{category:$(this).attr('category') ?? ''},true)
    }

})
$('html,body').on('click','.articaleContainer_section',function(e){
    scrollToSection($(this).attr('section'))
})
$(window).on('popstate',(e)=>{
    let page_key = {};
    if(window.history.state.page == 'home'){
        page_key = {};
    }else if(window.history.state.page == 'category'){
        page_key.category = window.history.state.category;
    }else if(window.history.state.page == 'article'){
        page_key.article = window.history.state.article;
        page_key.section = window.history.state.section ?? '';
    }
    open_page(window.history.state.page,page_key,false)
});

