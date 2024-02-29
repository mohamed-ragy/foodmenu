window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
window.pageTransition = false;
window.articlesData = {};
window.homeSearchContainerTimeout = null;
window.searchInputTimeout = null;
calcArticlesRates = function(){
    for(const key in articles){
        articles[key].rate = parseInt(articles[key].upRates) - parseInt(articles[key].downRates);
    }
    articles.sort((a,b)=>{
        return b.rate - a.rate;
    })
}
calcArticlesRates();

drawTree = function(){
    switch(window.history.state.page){
        case 'cat':
            $('.helpCenterTree').text('').append(
                $('<a/>',{class:'openPage',page:'home',text:texts.home,href:`/${lang}/`}),
                $('<span/>',{class:'ico-right fs07 mX5 c-placeholder2'}),
                $('<a/>',{class:'openPage',page:'cat',cat:window.history.state.cat,text:texts.cats[window.history.state.cat.replaceAll('-','')],href:`/${lang}/articles/${window.history.state.cat}`}),
            )
        break;
        case 'article':
            $('.helpCenterTree').text('').append(
                $('<a/>',{class:'openPage',page:'home',text:texts.home,href:`/${lang}/`}),
                $('<span/>',{class:'ico-right fs07 mX5 c-placeholder2'}),
                $('<a/>',{class:'openPage',page:'cat',cat:window.history.state.cat,text:texts.cats[window.history.state.cat.replaceAll('-','')],href:`/${lang}/articles/${window.history.state.cat}`}),
                $('<span/>',{class:'ico-right fs07 mX5 c-placeholder2'}),
                $('<a/>',{class:'openPage',page:'article',cat:window.history.state.cat,article:window.history.state.article,text:window.history.state.article.replaceAll('-',' '),href:`/${lang}/articles/${window.history.state.cat}/${window.history.state.article}`}),
            )
        break;
    }
}


showPage = function(page,cat,article,section,push=true){
    let pageTransition = true;
    switch(page){
        case 'home':
            if(window.history.state == null){
                push ? window.history.pushState({page:page},'',`/${lang}/home`) : window.history.replaceState({page:page},'',`/${lang}/home`) ;
            }else{
                if(window.history.state.page == 'home'){
                    pageTransition = false;
                }else{
                    push ? window.history.pushState({page:page},'',`/${lang}/home`) : window.history.replaceState({page:page},'',`/${lang}/home`) ;
                }
            }
            document.title = texts.title;
            $('meta[name="description"]').attr('content',texts.description)
            $('header').removeClass('header_notHome');
            $('main').addClass('main_full main_home');
            $('nav').addClass('nav_hidden');
            $('.navGroup').removeClass('navGroup_open');
            $('.navArticleA').removeClass('navArticleA_selected');
            hidemobileNav();
            drawHomeArticles();
        break;
        case 'cat':
            if(window.history.state == null){
                push ? window.history.pushState({page:page,cat:cat},'',`/${lang}/articles/${cat}`) : window.history.replaceState({page:page,cat:cat},'',`/${lang}/articles/${cat}`);
            }else{
                if(window.history.state.cat == cat && window.history.state.article == article){
                    pageTransition = false;
                }else{
                    push ? window.history.pushState({page:page,cat:cat},'',`/${lang}/articles/${cat}`) : window.history.replaceState({page:page,cat:cat},'',`/${lang}/articles/${cat}`);
                }
            }
            document.title = `${texts.cats[cat.replaceAll('-','')]} | ${texts.helpCenter}`
            $('meta[name="description"]').attr('content',texts.cats[cat.replaceAll('-','')+'_des'])
            $('header').addClass('header_notHome');
            $('main').removeClass('main_full main_home');
            $('nav').removeClass('nav_hidden');
            $('.navGroup').removeClass('navGroup_open');
            $(`.navArticles[cat="${cat}"]`).closest('.navGroup').addClass('navGroup_open');
            $('.navArticleA').removeClass('navArticleA_selected');
            setTimeout(()=>{drawCatPage(cat);},220)

        break;
        case 'article':
            // title in drawArticle()
            if(window.history.state == null){
                push ? window.history.pushState({page:page,cat:cat,article:article},'',`/${lang}/articles/${cat}/${article}`) : window.history.replaceState({page:page,cat:cat,article:article},'',`/${lang}/articles/${cat}/${article}`);
            }else{
                if(window.history.state.article == article && window.history.state.section == section){
                    pageTransition = false;
                }else{
                    push ? window.history.pushState({page:page,cat:cat,article:article},'',`/${lang}/articles/${cat}/${article}`) : window.history.replaceState({page:page,cat:cat,article:article},'',`/${lang}/articles/${cat}/${article}`);
                }
            }
            $('.mobileNav').addClass('mobileNav_hidden')
            $('header').addClass('header_notHome');
            $('main').removeClass('main_full main_home');
            $('nav').removeClass('nav_hidden');
            $('.navGroup').removeClass('navGroup_open');
            $(`.navArticles[cat="${cat}"]`).closest('.navGroup').addClass('navGroup_open');
            $('.navArticleA').removeClass('navArticleA_selected');
            $(`.navArticleA[article="${article}"]`).addClass('navArticleA_selected');

            hidemobileNav();
            setTimeout(()=>{drawArticle(article,cat,null);},220)
        break;
        case 'section':
            $('.mobileNav').addClass('mobileNav_hidden')
            if(window.history.state == null){
                push ? window.history.pushState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`) : window.history.replaceState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`);
            }else{
                if(window.history.state.article == article){
                    pageTransition = false;
                    if(section != window.history.state.section){
                        push ? window.history.pushState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`) : window.history.replaceState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`);
                    }
                }else{
                    push ? window.history.pushState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`) : window.history.replaceState({page:page,cat:cat,article:article,section:section},'',`/${lang}/articles/${cat}/${article}/${section}`);
                }
            }
            $('header').addClass('header_notHome');
            $('main').removeClass('main_full main_home');
            $('nav').removeClass('nav_hidden');
            $('.navGroup').removeClass('navGroup_open');
            $(`.navArticles[cat="${cat}"]`).closest('.navGroup').addClass('navGroup_open');
            $('.navArticleA').removeClass('navArticleA_selected');
            $(`.navArticleA[article="${article}"]`).addClass('navArticleA_selected');

            hidemobileNav();
            setTimeout(()=>{drawArticle(article,cat,section);},220)
            // title in drawArticle()
        break;
        default:
            $('header').addClass('header_notHome');
            $('main').removeClass('main_full main_home');
            $('nav').removeClass('nav_hidden');
        break;
    }


    if(pageTransition || window.pageTransition == false){
        $('.page[page]').addClass('page_hidden')
        $('footer').removeClass('footer_show')
        setTimeout(()=>{
            drawTree();
            $('main').scrollTop(0)
            $('.page[page]').addClass('none')
            $(`.page[page="${page == 'section' ? 'article' : page}"]`).removeClass('none');
            setTimeout(()=>{
                $('footer').addClass('footer_show')
                $(`.page[page="${page == 'section' ? 'article' : page}"]`).removeClass('page_hidden');
                window.pageTransition = true;
            },220)
        },220)
    }else{
        drawTree();
        $('.page[page]').addClass('page_hidden')
        $('.page[page]').addClass('none')
        $(`.page[page="${page == 'section' ? 'article' : page}"]`).removeClass('none');
        $(`.page[page="${page == 'section' ? 'article' : page}"]`).removeClass('page_hidden');
    }


}

require('../page_loading.js')
require('./tools/tooltip.js')
require('./tools/mobileNav.js')
require('./tools/header.js')
require('./tools/nav.js')
require('./tools/search.js')
require('./pages/home.js')
require('./pages/cat.js')
require('./pages/article.js')


$(window).on('popstate',(e)=>{
    $('#tooltip').css('display','none')
    hideHomeSearch();
    hideHeaderSearch();
    hideMobileNavSearch();
    showPage(window.history.state.page,window.history.state.cat,window.history.state.article,window.history.state.section,false)
});



setTimeout(()=>{
    showPage(routeName.split('.')[1],cat,article,section,false)
    hide_page_loading()
},500)


$('html,body').on('click','.openPage',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    $('#tooltip').css('display','none')
    hideHomeSearch();
    hideHeaderSearch();
    hideMobileNavSearch();
    // if(window.history.state.page == $(this).attr('page') && window.history.state.cat == $(this).attr('cat')  && window.history.state.article == $(this).attr('article') && window.history.state.section == $(this).attr('section') ){return;}
    showPage($(this).attr('page'),$(this).attr('cat'),$(this).attr('article'),$(this).attr('section'))

})
////////////
