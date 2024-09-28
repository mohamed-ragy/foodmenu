draw_statistics_products = function(){
    $('#statistics_products').text('').append(
        $('<div/>',{id:'statistics_products_list',class:'td200'}),
        $('<div/>',{id:'statistics_products_product',class:'mT50 td200 opacity0 none'})
    )
    draw_statistics_products_list('total','desc');
}
draw_statistics_products_list = function(order,sort){
    let top_products = get_statistics_top_products(window.statistics.s1.products,order,sort);
    if(top_products.length == 0 ){
    $('#statistics_products_list').text('').append(
        $('<div/>',{class:'mT30',text:texts.dashboard.noData})
    )
        return;

    }
    $('#statistics_products_list').text('').append(
        $('<table/>',{class:'mT30',id:'statistics_products_product_table'}).append(
            $('<tr/>',{class:'trHead'}).append(
                $('<th/>',{class:'taE vaM w5',text:''}),
                $('<th/>',{order:'name',class:'statistics_products_list_th pointer'}).append(
                    $('<div/>',{class:'w100p row alnC jstfySB'}).append(
                        $('<span/>',{class:'mie-10',text:texts.dashboard.name}),
                        $('<span/>',{class:`statistics_products_list_thArrow fs09 ${order == 'name' && sort == 'desc' ? 'ico-down' : order == 'name' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'sum',class:'statistics_products_list_th pointer  pie-30'}).append(
                    $('<div/>',{class:'w100p row alnC jstfySB'}).append(
                        $('<span/>',{class:'mie-10',text:texts.dashboard.ordered}),
                        $('<span/>',{class:`statistics_products_list_thArrow fs09 ${order == 'sum' && sort == 'desc' ? 'ico-down' : order == 'sum' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'total',class:'statistics_products_list_th pointer '}).append(
                    $('<div/>',{class:'w100p row alnC jstfySB'}).append(
                        $('<span/>',{class:'mie-10',text:texts.dashboard.income}),
                        $('<span/>',{class:`statistics_products_list_thArrow fs09 ${order == 'total' && sort == 'desc' ? 'ico-down' : order == 'total' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
                $('<th/>',{order:'reviews_sum',class:'statistics_products_list_th pointer '}).append(
                    $('<div/>',{class:'w100p row alnC jstfySB'}).append(
                        $('<span/>',{class:'mie-10',text:texts.dashboard.Reviews}),
                        $('<span/>',{class:`statistics_products_list_thArrow fs09 ${order == 'reviews_sum' && sort == 'desc' ? 'ico-down' : order == 'reviews_sum' && sort == 'asc' ? 'ico-up' :  ''}`})
                    )
                ),
            )
        )
    )
    for(const key in top_products){
            let product_img = '/storage/imgs/cpanel/noimg.png';
            if(typeof(website.products.find(item=>item.name == top_products[key].name)) !== 'undefined'){product_img = website.products.find(item=>item.name == top_products[key].name).img}
            let ordered_compare = ''; let total_compare = ''; let reviews_compare = '';
            if(window.page.compare == 1){
                if(typeof(window.statistics.s2.products[top_products[key].name]) === 'undefined'){
                    ordered_compare = $('<span/>',{class:'',html:compareNums(top_products[key].sum,0,texts.dashboard.productOrdered_compare.replace(':product:',top_products[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_products[key].total,0,texts.dashboard.productTotal_compare.replace(':product:',top_products[key].name),false,false)})
                    reviews_compare = $('<span/>',{class:'',html:compareNums(top_products[key].reviews_sum,0,texts.dashboard.productReviews_compare.replace(':product:',top_products[key].name),false,false)})
                    key4 = 'undefined';
                }else{
                    key4 = window.statistics.s2._id;
                    ordered_compare = $('<span/>',{class:'',html:compareNums(top_products[key].sum,window.statistics.s2.products[top_products[key].name].sum,texts.dashboard.productOrdered_compare.replace(':product:',top_products[key].name),false,false)})
                    total_compare = $('<span/>',{class:'',html:compareNums(top_products[key].total,window.statistics.s2.products[top_products[key].name].total,texts.dashboard.productTotal_compare.replace(':product:',top_products[key].name),false,false)})
                    reviews_compare = $('<span/>',{class:'',html:compareNums(top_products[key].reviews_sum,window.statistics.s2.products[top_products[key].name].reviews.rv,texts.dashboard.productReviews_compare.replace(':product:',top_products[key].name),false,false)})
                }
            }else{
                key4 = null;
            }

            $('#statistics_products_product_table').append(
                $('<tr/>',{class:''}).append(
                    $('<td/>',{class:'taE vaM'}).append(
                        $('<div/>',{class:'row alnC jstfyE'}).append(
                            $('<div/>',{class:'btn_table ico-info pointer statisticspopup',key1:'product',key2:top_products[key].name,key3:window.statistics.s1._id,key4:key4,key5:window.statistics.date1,key6:window.page.compare == 1 ? window.statistics.date2 : ''}),
                            $('<div/>',{class:'btn_table ico-statistics_and_analytics pointer statistics_products_list_showProduct',product:top_products[key].name,tooltip:texts.dashboard.moreDetails})

                        )
                    ),
                    $('<td/>',{class:'vaM'}).append(
                        $('<div/>',{class:'row alnC jstfyS mxw300'}).append(
                            $('<img/>',{class:'br5 w30 h30 ofCover',src:product_img}),
                            $('<a/>',{class:'ellipsis mis-5 popupPage popupId',popupPage:'product',popupId:'product',product:top_products[key].name,text:top_products[key].name}),
                        )
                    ),
                    $('<td/>',{class:'vaM pie-30'}).append(
                        $('<span/>',{text:`${bigInt(top_products[key].sum)}`}),
                        ordered_compare
                    ),
                    $('<td/>',{class:'vaM'}).append(
                        $('<span/>',{text:`${website.currency}${bigFloat(top_products[key].total)}`}),
                        total_compare
                    ),
                    $('<td/>',{class:'vaM'}).append(
                        $('<span/>',{text:`${bigInt(top_products[key].reviews_sum)}`}),
                        reviews_compare
                    ),

                )
            )
    }
}
$('body').on('click','.statistics_products_list_th',function(e){
    let sort = 'desc';
    $(this).find('.statistics_products_list_thArrow').hasClass('ico-down') ? sort = 'asc' : null;
    draw_statistics_products_list($(this).attr('order'),sort)
})
$('body').on('click','.statistics_products_list_showProduct',function(e){
    let product_name = $(this).attr('product');
    $('#statistics_products_list').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_products_list').addClass('none');
        $('#statistics_products_product').removeClass('none');
        draw_statistics_products_product(product_name)
        setTimeout(function(){
            $('#statistics_products_product').removeClass('opacity0');
        },200)
    },200)

})
$('body').on('click','.statistics_products_list_showList',function(e){
    $('#statistics_products_product').addClass('opacity0');
    setTimeout(function(){
        $('#statistics_products_product').addClass('none');
        $('#statistics_products_list').removeClass('none');
        setTimeout(function(){
            $('#statistics_products_list').removeClass('opacity0');
        },200)
    },200)

})
draw_statistics_products_product = function(product_name){

    let product_img = '/storage/imgs/cpanel/noimg.png';
    if(typeof(website.products.find(item=>item.name == product_name)) !== 'undefined'){product_img = website.products.find(item=>item.name == product_name).img}


    let heighestNum_orders = getGraphHighestNumber_product(product_name,'orders',window.statistics.s1_,window.statistics.s2_ ?? []);
    let heighestNum_income = getGraphHighestNumber_product(product_name,'income',window.statistics.s1_,window.statistics.s2_ ?? []);

    let product_s1 = window.statistics.s1.products[product_name];
    let product_s2 = {options:{},reviews:{rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0},sum:0,total:0};
    if(window.page.compare == 1 ){
        if( typeof(window.statistics.s2.products[product_name]) !== 'undefined'){
            product_s2 = window.statistics.s2.products[product_name]
        }
    }

    let product_s1_rating = 0;
    let product_s2_rating = 0;
    if(product_s1.reviews.rv > 0){
        product_s1_rating = product_s1.reviews.rv1 + (product_s1.reviews.rv2 * 2) + (product_s1.reviews.rv3 * 3) + (product_s1.reviews.rv4 * 4) + (product_s1.reviews.rv5 * 5);
        product_s1_rating = (product_s1_rating / product_s1.reviews.rv)
    }
    if(window.page.compare == 1){
        if(product_s2.reviews.rv > 0){
            product_s2_rating = product_s2.reviews.rv1 + (product_s2.reviews.rv2 * 2) + (product_s2.reviews.rv3 * 3) + (product_s2.reviews.rv4 * 4) + (product_s2.reviews.rv5 * 5);
            product_s2_rating = (product_s2_rating / product_s2.reviews.rv)
        }
    }
    let product_stars = $('<div/>',{class:'row alnC jstfyS'}).append(
        $('<div/>',{class:`cStar ${product_s1_rating > 1 ? 'ico-star' : 'ico-starEmpty'}`}),
        $('<div/>',{class:`cStar ${product_s1_rating > 2 ? 'ico-star' : 'ico-starEmpty'}`}),
        $('<div/>',{class:`cStar ${product_s1_rating > 3 ? 'ico-star' : 'ico-starEmpty'}`}),
        $('<div/>',{class:`cStar ${product_s1_rating > 4 ? 'ico-star' : 'ico-starEmpty'}`}),
        $('<div/>',{class:`cStar ${product_s1_rating > 5 ? 'ico-star' : 'ico-starEmpty'}`}),
        window.page.compare == 1 ? compareNums(product_s1_rating,product_s2_rating,texts.dashboard.productRating_compare.replace(':product:',product_name),false,false) : null,
    )

    $('#statistics_products_product').text('').append(

        $('<div/>',{class:'row alnC jstfyS mB30'}).append(
            $('<span/>',{class:'statistics_products_list_showList ico-left statistics_productsProduct_backBtn',tooltip:texts.cpanel.public.back}),
            $('<img/>',{class:'br5 w50 h50 ofCover',src:product_img}),
            $('<div/>',{class:'column alnS jstfyS mX10'}).append(
                $('<div/>',{class:''}).append(
                    $('<a/>',{text:product_name,class:'popupPage popupId fs101',popupPage:'product',popupId:'product',product:product_name}),
                ),
                product_stars,
            )
        ),

        $('<div/>',{class:'row alnS jstfyS w100p'}).append(

            $('<div/>',{class:'grow1'}).append(

                $('<div/>',{class:'statistics_productsProductElem'}).append(
                    $('<table/>',{class:'statistics_productsProductElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{}),
                            $('<td/>',{class:'c_statistics1 taE'}).append($('<span/>',{text:window.statistics.date1,class:'fs08'}),),
                            window.page.compare == 1 ? $('<td/>',{class:'c_statistics2 taE'}).append($('<span/>',{text:window.statistics.date2,class:'fs08'})) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',text:texts.dashboard.totalIncome}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:`${website.currency}${bigInt(product_s1.total)}`}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.total,product_s2.total,texts.dashboard.productTotal_compare.replace(':product:',product_name),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:`${website.currency}${bigInt(product_s2.total)}`}) : null,
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',text:texts.dashboard.ordered}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{text:bigInt(product_s1.sum)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.sum,product_s2.sum,texts.dashboard.productOrdered_compare.replace(':product:',product_name),false,false)}) : null
                            ),
                            window.page.compare == 1 ? $('<td/>',{class:'taE',text:bigInt(product_s2.sum)}) : null,
                        ),
                    )
                ),

                product_s1_options = $('<div/>',{id:'statistics_products_product'}),
                $('<div/>',{class:'statistics_productsProductElem'}).append(
                    $('<table/>',{class:'statistics_productsProductElem_table'}).append(
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'bold',text:texts.dashboard.reviews}),
                            $('<td/>',{class:' taE'}).append(
                                $('<span/>',{class:'bold',text:bigInt(product_s1.reviews.rv)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv,product_s2.reviews.rv,texts.dashboard.productReviews_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'bold',text:bigInt(product_s2.reviews.rv)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x1<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(product_s1.reviews.rv1)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv1,product_s2.reviews.rv1,texts.dashboard.productReviews_s1_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(product_s2.reviews.rv1)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x2<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(product_s1.reviews.rv2)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv2,product_s2.reviews.rv2,texts.dashboard.productReviews_s2_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(product_s2.reviews.rv2)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x3<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(product_s1.reviews.rv3)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv3,product_s2.reviews.rv3,texts.dashboard.productReviews_s3_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(product_s2.reviews.rv3)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x4<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(product_s1.reviews.rv4)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv4,product_s2.reviews.rv4,texts.dashboard.productReviews_s4_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(product_s2.reviews.rv4)}) : null
                        ),
                        $('<tr/>',{class:''}).append(
                            $('<td/>',{class:'',html:`x5<span class="ico-star cStar"></span>`}),
                            $('<td/>',{class:'taE'}).append(
                                $('<span/>',{class:'',text:bigInt(product_s1.reviews.rv5)}),
                                window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.reviews.rv5,product_s2.reviews.rv5,texts.dashboard.productReviews_s5_compare.replace(':product:',product_name),false,false)}) : null,
                            ),
                            window.page.compare ? $('<td/>',{class:'',text:bigInt(product_s2.reviews.rv5)}) : null
                        ),
                    )
                )
            ),

            $('<div/>',{class:'grow1 column alnS jstfyS mis-100 mT10 taC'}).append(
                $('<div/>',{class:'mB50'}).append(
                    drawStatisticsGraph('statistics_products_list_productGraph_orders',200,600,'orders',heighestNum_orders),
                ),
                $('<div/>',{class:'taC'}).append(
                    drawStatisticsGraph('statistics_products_list_productGraph_income',200,600,'income',heighestNum_income)
                )
            ),
        ),

    )

    for(const key in product_s1.options){
        let product_s1_options_selections;
        product_s1_options.append(
            $('<div/>',{class:'statistics_productsProductElem'}).append(
                product_s1_options_selections = $('<table/>',{class:'statistics_productsProductElem_table'}).append(
                    $('<tr/>',{class:''}).append(
                        $('<td/>',{class:'bold fs101',text:key}),
                        $('<td/>',{class:''}),
                        window.page.compare == 1 ? $('<td/>',{class:''}) : null,
                    )
                )
            )

        )
        let selections_s1_percent = 0;
        let selections_s2_percent = 0;
        for(const key2 in product_s1.options[key]){
            let this_s2_selection_percent;
            let this_s1_selection_percent = Math.round((product_s1.options[key][key2]/product_s1.sum)*100);
            selections_s1_percent = selections_s1_percent + this_s1_selection_percent;
            selections_s1_percent == 99 ? this_s1_selection_percent = this_s1_selection_percent + 1 : null;
            selections_s1_percent == 101 ? this_s1_selection_percent = this_s1_selection_percent - 1 : null;

            let s2Option = 0;
            if(window.page.compare == 1){
                if(typeof(product_s2.options[key]) !== 'undefined'){
                    if(typeof(product_s2.options[key][key2]) !== 'undefined'){
                        s2Option = product_s2.options[key][key2];
                        this_s2_selection_percent = Math.round((s2Option/product_s2.sum)*100);
                        selections_s2_percent = selections_s2_percent + this_s2_selection_percent;
                        selections_s2_percent == 99 ? this_s2_selection_percent = this_s2_selection_percent + 1 : null;
                        selections_s2_percent == 101 ? this_s2_selection_percent = this_s2_selection_percent - 1 : null;
                    }
                }
            }
            product_s1_options_selections.append(
                $('<tr/>',{class:''}).append(
                    $('<td/>',{class:'pis-15',text:key2}),
                    $('<td/>',{class:''}).append(
                        $('<span/>',{text:`${product_s1.options[key][key2]} (${this_s1_selection_percent}%)`}),
                        window.page.compare == 1 ? $('<span/>',{html:compareNums(product_s1.options[key][key2],s2Option,texts.dashboard.productSelection_compare.replace(':option:',key).replace(':selection:',key2),false,false)}) : null
                    ),
                    window.page.compare == 1 ?  $('<td/>',{text:`${s2Option} (${this_s2_selection_percent}%)`}) : null,
                ),
            )
        }

    }
    fillStatisticsGraph_product('statistics_products_list_productGraph_orders',200,600,product_name,'sum',heighestNum_orders)
    fillStatisticsGraph_product('statistics_products_list_productGraph_income',200,600,product_name,'total',heighestNum_income)
}
