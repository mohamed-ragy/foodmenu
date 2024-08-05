draw_website_header_html = function(){
    $('.website_header').remove();
    $('#page').before(generate_html(window.template.website_header.elems,'website_header.elems'))
    $('.website_header').addClass('stop_transitions')
    let sorted_header_navList = $('.header_navList').children().sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_navList').append(sorted_header_navList)

    let sorted_header_iconList = $('.header_iconsList').children().sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_iconsList').append(sorted_header_iconList)

    draw_edit_header_navList();
    draw_edit_header_iconList();
    setTimeout(()=>{
        fix_header_nav_list();
        $('.website_header').removeClass('stop_transitions')
    },200)
}
set_adapted_header = function(){
    if(window.selected_page == null){return}
    if(typeof(window.template[window.selected_page][0]) === 'undefined'){return;}
    if(window.template[window.selected_page][0].attr.adapt_header == '1' && $('#website').scrollTop() == 0){
        $(':root').css('--adapt_header_color',window.template[window.selected_page][0].attr.adapt_header_color);
        $('.website_header').addClass('adapted_header')
        $('section').first().find('.select_section_title').css('top',$('.website_header').outerHeight())
    }else{
        $('.website_header').removeClass('adapted_header')

    }
}
//
draw_edit_header_navList = function(){
    let sorted_header_navList = Object.entries(window.template.website_header.elems.children.header_wrapper.children.header_navList.children).sort(function(a, b) {
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_navList_container').text('');
    for(const key in sorted_header_navList){
        let item_key = sorted_header_navList[key][0];
        let item = sorted_header_navList[key][1];
        let sort = item.attr.sort;
        if(item_key != 'header_drop_down_list' && item_key != 'header_list_see_more'){
            $('.edit_header_navList_container').append(
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_nav_list_sorter',item_sort:sort,key_tree:`website_header.elems.children.header_wrapper.children.header_navList.children.${item_key}.attr`}),
                        $('<div/>',{text:texts.styling[item_key]}),
                    ),
                    draw_select_box({
                        keys_arr:[{key:'display',key_tree:`website_header.elems.children.header_wrapper.children.header_navList.children.${item_key}.css`}],
                        name:null,
                        selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                        selection_class:'pX10'
                    }),
                )
            )
        }

    }
}
draw_edit_header_iconList = function(){
    let sorted_header_iconList = Object.entries(window.template.website_header.elems.children.header_wrapper.children.header_iconsList.children).sort(function(a,b){
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_iconList_container').text('');
    for(const key in sorted_header_iconList){
        let icon_key = sorted_header_iconList[key][0];
        let icon = sorted_header_iconList[key][1];
        let sort = icon.attr.sort;
        $('.edit_header_iconList_container').append(
            $('<div/>',{class:'editor_popup_row pointer editor_popup_show_container',key:icon_key}).append(
                $('<div/>',{class:'row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_icon_list_sorter',icon_sort:sort,key_tree:`website_header.elems.children.header_wrapper.children.header_iconsList.children.${icon_key}.attr`}),
                    $('<div/>',{text:texts.styling[icon_key]}),
                ),
                $('<div/>',{class:'ico-arrowRight'})
            ),
        )
    }
}
fix_header_nav_list = function(){
    let header_width = $('.website_header').width();
    let header_children_width = $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth();
    let header_navList_children = $($('.header_navList').children().get().reverse());
    if(header_width < header_children_width){
        $('.header_list_see_more').removeClass('none')
        header_navList_children.each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu') && $(this).css('display') != 'none'){
                $(this).addClass('none');
                if(header_width >= $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
                    return false;
                }
            }
        })
    }else{
        $('.header_list_see_more').addClass('none')
        $('.header_navList').children().each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                $(this).removeClass('none');
            }
        })
        if(header_width < $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
            fix_header_nav_list();
        }
    }
}