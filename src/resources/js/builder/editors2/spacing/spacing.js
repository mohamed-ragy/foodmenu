require('./edit_padding_top.js')
require('./edit_padding_top_section.js')
require('./edit_padding_bottom.js')
require('./edit_padding_bottom_section.js')
require('./edit_padding_right.js')
require('./edit_padding_left.js')
require('./edit_margin_top.js')
require('./edit_margin_top_section.js')
require('./edit_margin_bottom.js')
require('./edit_margin_bottom_section.js')
require('./edit_margin_right.js')
require('./edit_margin_left.js')
//
window.edit_padding_top = {};
window.edit_padding_top_section = {};
window.edit_padding_bottom = {};
window.edit_padding_bottom_section = {};
window.edit_padding_right = {};
window.edit_padding_left = {};
window.edit_margin_top = {};
window.edit_margin_top_section = {};
window.edit_margin_bottom = {};
window.edit_margin_bottom_section = {};
window.edit_margin_right = {};
window.edit_margin_left = {};

draw_spacing_edit_elems = function(elem,elem_class){
    let html = '';
    try{
        if(elem.accessibility.includes('padding')){
            let css = window.current_view == 'desktop' ? elem.css : elem.css_mobile ;
            let padding =  css.padding.split(' ')
            let padding_top;let padding_bottom; let padding_left; let padding_right;
            if('border-top' in css){padding_top = parseInt(css['border-top'].split(' ')[0]);}
            if('border-bottom' in css){padding_bottom = parseInt(css['border-bottom'].split(' ')[0]);}
            if('border-left' in css){padding_left = parseInt(css['border-left'].split(' ')[0]);}
            if('border-right' in css){padding_right = parseInt(css['border-right'].split(' ')[0]);}

            html = `${html}<div class="edit_padding_top ${elem_class}padding_top" style="top:${padding_top}px;height:${padding[0]}"></div>`;
            html = `${html}<div class="edit_padding_right ${elem_class}padding_right" style="right:${padding_right}px;width:${padding[1]}"></div>`;
            html = `${html}<div class="edit_padding_bottom ${elem_class}padding_bottom" style="bottom:${padding_bottom}px;height:${padding[2]}"></div>`;
            html = `${html}<div class="edit_padding_left ${elem_class}padding_left" style="left:${padding_left}px;width:${padding[3]}"></div>`;
        }
    }catch{}
    try{
        if(elem.accessibility.includes('margin')){
            let margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' '); 
            html = `${html}<div class="edit_margin_top ${elem_class}margin_top" style="height:${margin[0]};top:-${margin[0]};"></div>`;
            html = `${html}<div class="edit_margin_right ${elem_class}margin_right" style="width:${margin[1]};right:-${margin[1]};"></div>`;
            html = `${html}<div class="edit_margin_bottom ${elem_class}margin_bottom" style="height:${margin[2]};bottom:-${margin[2]};"></div>`;
            html = `${html}<div class="edit_margin_left ${elem_class}margin_left" style="width:${margin[3]};left:-${margin[3]};"></div>`;
        }
    }catch{}
    if(elem.type == 'section_wrapper'){
        try{
            let padding_top = window.current_view == 'desktop' ? elem.css['padding-top'] : elem.css_mobile['padding-top']; 
            let padding_bottom = window.current_view == 'desktop' ? elem.css['padding-bottom'] : elem.css_mobile['padding-bottom']; 
            let margin_top = window.current_view == 'desktop' ? elem.css['margin-top'] : elem.css_mobile['margin-top']; 
            let margin_bottom = window.current_view == 'desktop' ? elem.css['margin-bottom'] : elem.css_mobile['margin-bottom'];
        
            html = `${html}<div class="edit_padding_top_section" style="height:${padding_top}"></div>`;
            html = `${html}<div class="edit_padding_bottom_section" style="height:${padding_bottom}"></div>`;
            html = `${html}<div class="edit_margin_top_section" style="height:${margin_top};top:-${margin_top}"></div>`;
            html = `${html}<div class="edit_margin_bottom_section" style="height:${margin_bottom};bottom:-${margin_bottom}"></div>`;
        }catch{}
    }
    return html;
}
fix_spacing_edit_elems = function(){
    return;
    try{
        let elem = get_element_data(window.selected);
        if(elem.accessibility.includes('padding')){
            let css = window.current_view == 'desktop' ? elem.css : elem.css_mobile ;
            let padding =  css.padding.split(' ')
            let padding_top;let padding_bottom; let padding_left; let padding_right;
            if('border-top' in css){padding_top = parseInt(css['border-top'].split(' ')[0]);}
            if('border-bottom' in css){padding_bottom = parseInt(css['border-bottom'].split(' ')[0]);}
            if('border-left' in css){padding_left = parseInt(css['border-left'].split(' ')[0]);}
            if('border-right' in css){padding_right = parseInt(css['border-right'].split(' ')[0]);}
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_padding_top').first().css({height:padding[0],top:`${padding_top}px`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_padding_right').first().css({width:padding[1],right:`${padding_right}px`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_padding_bottom').first().css({height:padding[2],bottom:`${padding_bottom}px`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_padding_left').first().css({width:padding[3],left:`${padding_left}px`})
        }
        if(elem.accessibility.includes('margin')){
            let margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' ');
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_margin_top').first().css({height:margin[0],top:`-${margin[0]}`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_margin_right').first().css({width:margin[1],right:`-${margin[1]}`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_margin_bottom').first().css({height:margin[2],bottom:`-${margin[2]}`})
            $(`.${elem.class_selector}, .${elem.class_selector}_container`).find('.edit_margin_left').first().css({width:margin[3],left:`-${margin[3]}`})
        }
        if(elem.type == 'section'){
            elem = elem.children.section_wrapper;
            let padding_top = window.current_view == 'desktop' ? elem.css['padding-top'] : elem.css_mobile['padding-top']; 
            let padding_bottom = window.current_view == 'desktop' ? elem.css['padding-bottom'] : elem.css_mobile['padding-bottom']; 
            let margin_top = window.current_view == 'desktop' ? elem.css['margin-top'] : elem.css_mobile['margin-top']; 
            let margin_bottom = window.current_view == 'desktop' ? elem.css['margin-bottom'] : elem.css_mobile['margin-bottom'];
            $(`.${elem.class_selector}`).find('.edit_padding_top_section').first().css('height',padding_top)
            $(`.${elem.class_selector}`).find('.edit_padding_bottom_section').first().css('height',padding_bottom)
            $(`.${elem.class_selector}`).find('.edit_margin_top_section').first().css('height',margin_top).css('top',`-${margin_top}`)
            $(`.${elem.class_selector}`).find('.edit_margin_bottom_section').first().css('height',margin_bottom).css('bottom',`-${margin_bottom}`)
        }
    }catch{}
}
$('body').on('mouseup',function(){
    $('#website').css('cursor','')
    $('.edit_padding_selected').removeClass('edit_padding_selected').text('')
    $('.edit_margin_selected').removeClass('edit_margin_selected').text('')
    $('.edit_padding_symmetry').removeClass('edit_padding_symmetry').text('')
    $('.edit_margin_symmetry').removeClass('edit_margin_symmetry').text('')
    if(window.edit_padding_top.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_top = {};
        new_action('');
        set_all_editors();
    }
    if(window.edit_padding_top_section.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_top_section = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_padding_bottom_section.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_bottom_section = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_padding_bottom.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_bottom = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_padding_right.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_right = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_padding_left.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_padding_left = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_top.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_top = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_bottom.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_bottom = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_top_section.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_top_section = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_bottom_section.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_bottom_section = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_right.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_right = {};
        new_action('');
        set_all_editors();
    }
    else if(window.edit_margin_left.key_tree !== undefined){
        show_edit_btns(window.selected);
        window.edit_margin_left = {};
        new_action('');
        set_all_editors();
    }
})
$('body').on('mousemove',function(e){
    if(window.edit_padding_top.key_tree !== undefined){
        edit_padding_top_fun(e.pageY);
    }
    if(window.edit_padding_top_section.key_tree !== undefined){
        edit_padding_top_section_fun(e.pageY);
    }
    else if(window.edit_padding_bottom.key_tree !== undefined){
        edit_padding_bottom_fun(e.pageY);
    }
    else if(window.edit_padding_bottom_section.key_tree !== undefined){
        edit_padding_bottom_section_fun(e.pageY);
    }
    else if(window.edit_padding_right.key_tree !== undefined){
        edit_padding_right_fun(e.pageX);
    }
    else if(window.edit_padding_left.key_tree !== undefined){
        edit_padding_left_fun(e.pageX);
    }
    else if(window.edit_margin_top.key_tree !== undefined){
        edit_margin_top_fun(e.pageY);
    }
    else if(window.edit_margin_top_section.key_tree !== undefined){
        edit_margin_top_section_fun(e.pageY);
    }
    else if(window.edit_margin_bottom_section.key_tree !== undefined){
        edit_margin_bottom_section_fun(e.pageY);
    }
    else if(window.edit_margin_bottom.key_tree !== undefined){
        edit_margin_bottom_fun(e.pageY);
    }
    else if(window.edit_margin_right.key_tree !== undefined){
        edit_margin_right_fun(e.pageX);
    }
    else if(window.edit_margin_left.key_tree !== undefined){
        edit_margin_left_fun(e.pageX);
    }
})

spacing_symmetry_y = function(length){
    let new_length = length;
    
    if(window.ctrl_pressed === false){
        $('.edit_padding_bottom').each(function(){
            let this_height = $(this).height();
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_height}
        })
        $('.edit_padding_bottom_section').each(function(){
            let this_height = $(this).height();
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_height}
        })
        $('.edit_padding_top').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_height}
        })
        $('.edit_padding_top_section').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_height}
        })
        $('.edit_margin_bottom').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_height}
        })
        $('.edit_margin_bottom_section').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_height}
        })
        $('.edit_margin_top').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_height}
        })
        $('.edit_margin_top_section').each(function(){
            let this_height = parseInt($(this).height());
            if(length > (this_height - 5) && length < (this_height + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_height}
        })
    }
    
    $('.edit_padding_bottom').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_padding_top').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_margin_bottom').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })
    $('.edit_margin_top').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })

    $('.edit_padding_bottom_section').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_padding_top_section').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_margin_bottom_section').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })
    $('.edit_margin_top_section').each(function(){
        if( $(this).height() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })
    return new_length;
}

spacing_symmetry_x = function(length){
    let new_length = length;
    if(window.ctrl_pressed === false){
        $('.edit_padding_left').each(function(){
            let this_width = $(this).width();
            if(length > (this_width - 5) && length < (this_width + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_width}
        })
        $('.edit_padding_right').each(function(){
            let this_width = $(this).width();
            if(length > (this_width - 5) && length < (this_width + 5) && !$(this).hasClass('edit_padding_selected')){new_length = this_width}
        })
        $('.edit_margin_left').each(function(){
            let this_width = $(this).width();
            if(length > (this_width - 5) && length < (this_width + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_width}
        })
        $('.edit_margin_right').each(function(){
            let this_width = $(this).width();
            if(length > (this_width - 5) && length < (this_width + 5) && !$(this).hasClass('edit_margin_selected')){new_length = this_width}
        })
    }

    $('.edit_padding_left').each(function(){
        if( $(this).width() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_padding_right').each(function(){
        if( $(this).width() == new_length ){$(this).addClass('edit_padding_symmetry').text(new_length);}else{$(this).removeClass('edit_padding_symmetry').text('')}
    })
    $('.edit_margin_left').each(function(){
        if( $(this).width() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })
    $('.edit_margin_right').each(function(){
        if( $(this).width() == new_length ){$(this).addClass('edit_margin_symmetry').text(new_length);}else{$(this).removeClass('edit_margin_symmetry').text('')}
    })


    return new_length;
}