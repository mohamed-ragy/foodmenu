draw_nav = function(){
    for(const key in window.categories){
        let category = window.categories[key];
        let thisNavArticles;
        $('nav').append(
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
open_nav_group = function(category){
    $('.navGroup').removeClass('navGroup_open');
    $(`.navGroup[category="${category}"]`).addClass('navGroup_open')
    $(`.navArticleA`).removeClass('navArticleA_selected')
}
$('html,body').on('click','.navGroupHead',function(e){
    e.stopImmediatePropagation();
    open_nav_group($(this).closest('.navGroup').attr('category'))
})
