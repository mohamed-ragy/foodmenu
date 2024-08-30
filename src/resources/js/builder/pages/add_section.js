//
$('body').on('click','.add_section',function(e){
    if($(this).hasClass('add_first_section')){
        window.add_first_section = true;
    }else{
        window.add_first_section = false;
    }
    show_popup(function(){
        $('.popupTitle').text(texts.add_section);
        $('.popupBody').addClass('').append(
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
show_add_section_previews = function(type){
    $('.add_section_sections_container').text('')
    let section_templates;
    switch(type){
        case 'blank':
            section_templates = get_sections_layouts();
            for(const key in section_templates){
                let section_template = section_templates[key]
                let this_section_template_container;
                $('.add_section_sections_container').append(
                    $('<div/>',{class:'add_section_blank',key:key}).append(
                        this_section_template_container = $('<div/>',{class:'section_layout_elem_L'})
                    )
                )
                this_section_template_container.css({
                    'grid-template-areas':section_template.css['grid-template-areas'],
                    'grid-template-columns':section_template.css['grid-template-columns'],
                })
                let children_counter = 0;
                for(const key2 in section_template.children){
                    children_counter++;
                    this_section_template_container.append(
                        $('<div/>',{class:'',style:`grid-area:elem${children_counter};background-color:var(--green-20)`})
                    )
                }
            }
        break;
        case 'intro':
            for(const key in get_section_templates_intro()){
                let section_template = get_section_templates_intro()[key]
                let this_section_template_container;
                $('.add_section_sections_container').append(
                    $('<div/>',{class:'add_section_intro',key:key}).append(
                        this_section_template_container = $('<div/>',{class:'section_layout_elem_L'})
                    )
                )
                this_section_template_container.css({
                    'grid-template-areas':section_template.children.section_wrapper.css['grid-template-areas'],
                    'grid-template-columns':section_template.children.section_wrapper.css['grid-template-columns'],
                })
                let children_counter = 0;
                for(const key2 in section_template.children){
                    children_counter++;
                    this_section_template_container.append(
                        $('<div/>',{class:'',style:`grid-area:elem${children_counter};`})
                    )
                }
            }
        break;
    }




}
add_section = function(section,section_name_prefix){
    let new_section_sort = 0;
    try{
        let selected_section = get_element_data(window.selected);
        new_section_sort = parseInt(selected_section.sort) + 1;
        if(window.add_first_section){
            new_section_sort = 0;
        }else{
            new_section_sort = parseInt(selected_section.sort) + 1;
        }
    }catch{
        new_section_sort = 0;
    }

    section.sort = new_section_sort;

    let section_name_num = 1
    let section_name = `${section_name_prefix} ${section_name_num}`
    for(const key in window.template[window.selected_page]){
        if(window.template[window.selected_page][key].name == section_name){
            section_name_num++;
            section_name = `${section_name_prefix} ${section_name_num}`
        }
        if(key >= new_section_sort){
            window.template[window.selected_page][key].sort = parseInt(window.template[window.selected_page][key].sort) + 1
        }
    }
    section.name = section_name;
    window.template[window.selected_page].push(JSON.parse(JSON.stringify(section)))
    new_action('','page');
    try{
        $('#website').animate({scrollTop:$(`section[key_tree="${window.selected_page}.${new_section_sort}"]`).position().top - 50},300)
    }catch{}
    close_popup();
    select(`${window.selected_page}.${new_section_sort}`)
}
//
$('body').on('click','.add_section_blank',function(e){
    let section_layouts = get_sections_layouts();
    let layout = section_layouts[$(this).attr('key')];
    let blank_section = get_blank_section();
    let section = JSON.parse(JSON.stringify(blank_section))
    section.children.section_wrapper = layout;
    add_section(section,texts.untitled_section)
})
$('body').on('click','.add_section_intro',function(e){
    section = JSON.parse(JSON.stringify(get_section_templates_intro()[$(this).attr('key')]))
    add_section(section,texts.sections.intro)
})


//