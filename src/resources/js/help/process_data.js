process_data = function(data){
    window.window.homeSearchContainerTimeout = null;
    window.searchInputTimeout = null;
    window.categories = data.categories;
    window.articles_data = [];
    window.articles = data.articles;
    window.texts = data.texts;
    draw_nav();
    draw_mobileNav();
    hideSearchLoading();
    if(window.page == 'home'){
        open_page(window.page,{},false);
    }else if(window.page == 'category'){
        open_page(window.page,{category:window.category},false);
    }else if(window.page == 'article'){
        window.articles_data.push(window.article)
        open_page(window.page,{article:window.article.title_id,section:''},false);
    }else if(window.page == 'section'){
        window.page = 'article'
        window.articles_data.push(window.article)
        open_page(window.page,{article:window.article.title_id,section:window.section},false);
    }
    hide_page_loading()
}
