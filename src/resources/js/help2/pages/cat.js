catIconColor = function(cat){
    let catIcon; let catColor;
    let catColor_5p;
    switch(cat){
        case 'getting-started':catIcon = 'ico-rocket';catColor = '#2ec4b6';catColor_5p = '#2ec4b60d';break;
        case 'basics':catIcon = 'ico-basics';catColor = '#00b4d8';catColor_5p = '#00b4d80d';break;
        case 'security':catIcon = 'ico-security';catColor = '#ef233c';catColor_5p = '#ef233c0d';break;
        case 'ordering-system':catIcon = 'ico-orders';catColor = '#e29578';catColor_5p = '#e295780d';break;
        case 'statistics-and-analytics':catIcon = 'ico-statistics_and_analytics';catColor = '#3c6e71';catColor_5p = '#3c6e710d';break;
        case 'billing-and-subscription':catIcon = 'ico-plans';catColor = '#6a994e';catColor_5p = '#6a994e0d';break;
        case 'products-and-categories':catIcon = 'ico-products';catColor = '#4c956c';catColor_5p = '#4c956c0d';break;
        case 'website-users':catIcon = 'ico-users';catColor = '#9a8c98';catColor_5p = '#9a8c980d';break;
        case 'website-design':catIcon = 'ico-design';catColor = '#507dbc';catColor_5p = '#507dbc0d';break;
        case 'system-and-settings':catIcon = 'ico-settings';catColor = '#4a5759';catColor_5p = '#4a57590d';break;
    }
    return {
        icon:catIcon,
        color:catColor,
        color5p:catColor_5p,
    }
}
drawCatPage = function(cat){
    let catIcon;
    let catClassAndColor = catIconColor(cat);
    switch(cat){
        case 'getting-started':catIcon = `${catClassAndColor.icon} fs106 mie-5`;break;
        case 'basics':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
        case 'security':catIcon = `${catClassAndColor.icon} fs106 mie-7`;break;
        case 'ordering-system':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
        case 'statistics-and-analytics':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
        case 'billing-and-subscription':catIcon = `${catClassAndColor.icon} fs106 mie-7`;break;
        case 'products-and-categories':catIcon = `${catClassAndColor.icon} fs108 mie-7 mB5`;break;
        case 'website-users':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
        case 'website-design':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
        case 'system-and-settings':catIcon = `${catClassAndColor.icon} fs105 mie-7`;break;
    }
    $('#catArticalesContainer').text('').append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<div/>',{class:`${catIcon}`}),
            $('<div/>',{class:'bold inter fs108',text:texts.cats[cat.replaceAll('-','')]}),
        ),
        $('<div/>',{class:'mT5 mxw650 fs1',text:texts.cats[cat.replaceAll('-','')+'_des']}),
        $('<div/>',{class:'catArticlesContainer'})
    );
    for(const key in articles){
        let article = articles[key];
        if(article.helpCat == cat){
            drawArticleCard($('.catArticlesContainer'),article)
        }
    }
}
drawArticleCard = function(container,article){
    let catClassAndColor = catIconColor(article.helpCat);
    container.append(
        $('<a/>',{
            class:'catArticleContainer openPage',
            href:`/${lang}/articles/${article.helpCat}/${article.title_id}`,
            page:'article',
            article:article.title_id,
            cat:article.helpCat,
            style:`background-color:${catClassAndColor.color5p}`,
        }).append(
            $('<div/>',{style:`color:${catClassAndColor.color};`,class:`${article.icon} catArticleContainerIcon`}).append(
                $('<div/>',{style:`border-color:${catClassAndColor.color};`,class:'catArticleContainerIcon_after'}),
                $('<div/>',{class:`${article.icon} catArticleContainerIcon2`})
            ),
            $('<div/>',{style:`color:${catClassAndColor.color};`,class:'fs102 c4 taS mT10 bold',text:article.title}),
            $('<div/>',{class:'fs09 taS',text:article.description})
        )
    )
}
