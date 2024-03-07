for(const key in articles){
    let article = articles[key];
    $(`.navArticles[cat="${article.helpCat}"]`).append(
        $('<li/>',{class:'navArticle'}).append(
            $('<a/>',{
                text:article.title,
                class:'openPage navArticleA',
                page:'article',
                cat:article.helpCat,
                article:article.title_id,
                href:`/${lang}/articles/${article.helpCat}/${article.title_id}`
            })
        )
    )
}
