
show_add_home_section_previews = function(type){
    $('.add_home_section_sections_container').text('')
    switch(type){
        case 'blank':
            let section_layouts = get_home_sections_layouts();
            for(const key in section_layouts){
                let layout = section_layouts[key]
                let thisLayoutContainer;
                $('.add_home_section_sections_container').append(
                    $('<div/>',{class:'add_home_section_blank',layout:key}).append(
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
$('body').on('click','.add_home_section_blank',function(e){
    let section_layouts = get_home_sections_layouts();
    let layout = section_layouts[$(this).attr('layout')];
    let blank_section = get_blank_home_section();
    let section = JSON.parse(JSON.stringify(blank_section))
    let new_section_sort = parseInt($('.popupBody').attr('section_sort')) + 1;
    section.sort = new_section_sort;
    section.children.section_wrapper = layout;
    let section_name_num = 1
    let section_name = `${texts.untitled_section} ${section_name_num}`
    for(const key in window.template.home){
        if(window.template.home[key].name == section_name){
            section_name_num++;
            section_name = `${texts.untitled_section} ${section_name_num}`
        }
        if(key >= new_section_sort){
            window.template.home[key].sort = parseInt(window.template.home[key].sort) + 1
        }
    }
    section.name = section_name;
    window.template.home.push(JSON.parse(JSON.stringify(section)))
    new_action();
    $('#website').animate({scrollTop:$(`section[key_tree="home.${new_section_sort}"]`).position().top - 50},300)
    close_popup();
    select(`home.${new_section_sort}`)
})
//
$('body').on('click','.add_home_section',function(e){
    // e.stopImmediatePropagation();
    let section_sort = $(this).attr('section_sort');
    show_popup(function(){
        $('.popupTitle').text(texts.add_section);
        $('.popupBody').addClass('').attr('section_sort',section_sort).append(
            $('<div/>',{class:'add_section_popup_container'}).append(
                $('<div/>',{class:'add_home_section_type_elem_container'}).append(
                    $('<div/>',{class:'add_home_section_type_elem add_home_section_type_elem_selected',text:texts.home_sections.blank,type:'blank'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.intro,type:'intro'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.about,type:'about'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.our_staff,type:'our_staff'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.product,type:'product'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.category_list,type:'category_list'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.product_list,type:'product_list'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.gallery,type:'gallery'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.slide_show,type:'slide_show'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                    $('<div/>',{class:'add_home_section_type_elem',text:texts.home_sections.customer_reviews,type:'customer_reviews'}).append(
                        $('<div/>',{text:''}),
                        $('<div/>',{class:'ico-arrowRight vH'})
                    ),
                ),
                $('<div/>',{class:'add_home_section_sections_container'})
            )
        )
        show_add_home_section_previews('blank');
    })
})
//
$('body').on('click','.add_home_section_type_elem',function(e){
    // e.stopImmediatePropagation();
    $('.add_home_section_type_elem').removeClass('add_home_section_type_elem_selected');
    $(this).addClass('add_home_section_type_elem_selected')
    $('.add_home_section_type_elem').find('.ico-arrowRight').addClass('vH')
    $(this).find('.ico-arrowRight').removeClass('vH')
    show_add_home_section_previews($(this).attr('type'));
})
//
