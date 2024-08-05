show_add_section_previews = function(type){
    $('.add_section_sections_container').text('')
    switch(type){
        case 'blank':
            let section_layouts = get_sections_layouts();
            for(const key in section_layouts){
                let layout = section_layouts[key]
                let thisLayoutContainer;
                $('.add_section_sections_container').append(
                    $('<div/>',{class:'add_section_blank',layout:key}).append(
                        thisLayoutContainer = $('<div/>',{class:'section_layout_elem_L'})
                    )
                )
                thisLayoutContainer.css({
                    'grid-template-areas':layout.css['grid-template-areas'],
                    'grid-template-columns':layout.css['grid-template-columns'],
                })
                let children_counter = 0;
                for(const key2 in layout.children){
                    children_counter++;
                    thisLayoutContainer.append(
                        $('<div/>',{class:'',style:`grid-area:elem${children_counter};background-color:var(--green-20)`})
                    )
                }
            }
        break;
    }
}
//
$('body').on('click','.add_section_blank',function(e){
    let section_layouts = get_sections_layouts();
    let layout = section_layouts[$(this).attr('layout')];
    let blank_section = get_blank_section();
    let section = JSON.parse(JSON.stringify(blank_section))
    let new_section_sort = parseInt($('.popupBody').attr('section_sort')) + 1;
    section.sort = new_section_sort;
    section.children.section_wrapper = layout;
    let section_name_num = 1
    let section_name = `${texts.untitled_section} ${section_name_num}`
    for(const key in window.template[window.selected_page]){
        if(window.template[window.selected_page][key].name == section_name){
            section_name_num++;
            section_name = `${texts.untitled_section} ${section_name_num}`
        }
        if(key >= new_section_sort){
            window.template[window.selected_page][key].sort = parseInt(window.template[window.selected_page][key].sort) + 1
        }
    }
    section.name = section_name;
    window.template[window.selected_page].push(JSON.parse(JSON.stringify(section)))
    new_action();
    $('#website').animate({scrollTop:$(`section[key_tree="${window.selected_page}.${new_section_sort}"]`).position().top - 50},300)
    close_popup();
    select(`${window.selected_page}.${new_section_sort}`)
})
//
$('body').on('click','.add_section',function(e){
    let section_sort = $(this).attr('section_sort');
    show_popup(function(){
        $('.popupTitle').text(texts.add_section);
        $('.popupBody').addClass('').attr('section_sort',section_sort).append(
            $('<div/>',{class:'add_section_popup_container'}).append(
                $('<div/>',{class:'add_section_type_elem_container'}).append(
                    $('<div/>',{class:'add_section_type_elem add_section_type_elem_selected',text:texts.sections.blank,type:'blank'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.intro,type:'intro'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.about,type:'about'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.our_staff,type:'our_staff'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.product,type:'product'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.category_list,type:'category_list'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.product_list,type:'product_list'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.gallery,type:'gallery'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.slide_show,type:'slide_show'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_section_type_elem',text:texts.sections.customer_reviews,type:'customer_reviews'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                ),
                $('<div/>',{class:'add_section_sections_container'})
            )
        )
        show_add_section_previews('blank');
    })
})
//
$('body').on('click','.add_section_type_elem',function(e){
    $('.add_section_type_elem').removeClass('add_section_type_elem_selected');
    $(this).addClass('add_section_type_elem_selected')
    $('.add_section_type_elem').find('.ico-arrowRight').addClass('vH')
    $(this).find('.ico-arrowRight').removeClass('vH')
    show_add_section_previews($(this).attr('type'));
})
//