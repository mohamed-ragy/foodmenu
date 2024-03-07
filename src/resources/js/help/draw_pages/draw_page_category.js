categoryIconColor = function(category){
    let catIcon; let catColor;
    let catColor_5p;
    switch(category){
        case 'getting-started':catIcon = 'ico-rocket';catColor = '#32c0b3';catColor_5p = '#32c0b30d';break;
        case 'basics':catIcon = 'ico-basics';catColor = '#00b4d8';catColor_5p = '#00b4d80d';break;
        case 'security':catIcon = 'ico-security';catColor = '#e14b3e';catColor_5p = '#e14b3e0d';break;
        case 'ordering-system':catIcon = 'ico-orders';catColor = '#e66e42';catColor_5p = '#e66e420d';break;
        case 'statistics-and-analytics':catIcon = 'ico-statistics_and_analytics';catColor = '#3c6e71';catColor_5p = '#3c6e710d';break;
        case 'products-and-categories':catIcon = 'ico-products';catColor = '#4c956c';catColor_5p = '#4c956c0d';break;
        case 'website-users':catIcon = 'ico-users';catColor = '#4c71ae';catColor_5p = '#4c71ae0d';break;
        case 'website-design':catIcon = 'ico-design';catColor = '#c445b2';catColor_5p = '#c445b20d';break;
        case 'system-and-settings':catIcon = 'ico-settings';catColor = '#4a5759';catColor_5p = '#4a57590d';break;
        case 'my-staff':catIcon = 'ico-my_staff';catColor = '#4a5759';catColor_5p = '#4a57590d';break;
        case 'billing-center':catIcon = 'ico-billing';catColor = '#6a994e';catColor_5p = '#6a994e0d';break;
    }
    return {
        icon:catIcon,
        color:catColor,
        color5p:catColor_5p,
    }
}
draw_page_category = function(){
    let category_icon;
    let category_classAndColor = categoryIconColor(window.category);
    switch(window.category){
        case 'getting-started':category_icon = `${category_classAndColor.icon} fs106 mie-5`;break;
        case 'basics':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'security':category_icon = `${category_classAndColor.icon} fs106 mie-7`;break;
        case 'ordering-system':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'statistics-and-analytics':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'products-and-categories':category_icon = `${category_classAndColor.icon} fs108 mie-7 mB5`;break;
        case 'website-users':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'website-design':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'system-and-settings':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'system-my-staff':category_icon = `${category_classAndColor.icon} fs105 mie-7`;break;
        case 'billing-center':category_icon = `${category_classAndColor.icon} fs106 mie-7`;break;
    }

    $('.page').text('').append(
        $('<div/>',{class:'helpCenterTree row wrap alnC jstfyS mB20 fs09'}).append(
            $('<a/>',{class:'openPage',page:'home',text:texts.home,href:`/${lang}/`}),
            $('<span/>',{class:'ico-right fs07 mX5 c_white-10'}),
            $('<a/>',{class:'openPage',page:'category',category:window.category,text:texts.cats[window.category.replaceAll('-','')],href:`/${lang}/articles/${window.category}`}),
        ),
        $('<div/>',{id:'catArticalesContainer'}).append(
            $('<div/>',{class:'row alnC jstfyS'}).append(
                $('<div/>',{class:`${category_icon}`}),
                $('<div/>',{class:'bold inter fs108',text:texts.cats[window.category.replaceAll('-','')]}),
            ),
            $('<div/>',{class:'mT5 mxw650 fs1',text:texts.cats[window.category.replaceAll('-','')+'_des']}),
            $('<div/>',{class:'catArticlesContainer'})
        )
    )
    for(const key in window.articles){
        let article = window.articles[key];
        if(article.category == window.category){
            drawArticleCard($('.catArticlesContainer'),article)
        }
    }
}
drawArticleCard = function(container,article){
    let catClassAndColor = categoryIconColor(article.category);
    container.append(
        $('<a/>',{
            class:'catArticleContainer openPage',
            href:`/${lang}/articles/${article.category}/${article.title_id}`,
            page:'article',
            article:article.title_id,
            category:article.category,
        }).append(
            $('<div/>',{class:`${article.icon} catArticleContainerIcon`}).append(
                $('<div/>',{class:'catArticleContainerIcon_after'}),
                $('<div/>',{class:`${article.icon} catArticleContainerIcon2`})
            ),
            $('<div/>',{class:' fs102 c4 taS mT10 bold',text:article.title}),
            $('<div/>',{class:'catArticleContainerDes fs09 taS',text:article.description})
        )
    )
}
