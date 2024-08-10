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

$('body').on('mouseup',function(){
    $('#website').css('cursor','')
    $('.edit_padding_selected').removeClass('edit_padding_selected').text('')
    $('.edit_margin_selected').removeClass('edit_margin_selected').text('')
    $('.edit_padding_symmetry').removeClass('edit_padding_symmetry').text('')
    $('.edit_margin_symmetry').removeClass('edit_margin_symmetry').text('')
    if(window.edit_padding_top.key_tree !== undefined){
        window.edit_padding_top = {};
        new_action();
    }
    if(window.edit_padding_top_section.key_tree !== undefined){
        window.edit_padding_top_section = {};
        new_action();
    }
    else if(window.edit_padding_bottom_section.key_tree !== undefined){
        window.edit_padding_bottom_section = {};
        new_action();
    }
    else if(window.edit_padding_bottom.key_tree !== undefined){
        window.edit_padding_bottom = {};
        new_action();
    }
    else if(window.edit_padding_right.key_tree !== undefined){
        window.edit_padding_right = {};
        new_action();
    }
    else if(window.edit_padding_left.key_tree !== undefined){
        window.edit_padding_left = {};
        new_action();
    }
    else if(window.edit_margin_top.key_tree !== undefined){
        window.edit_margin_top = {};
        new_action();
    }
    else if(window.edit_margin_bottom.key_tree !== undefined){
        window.edit_margin_bottom = {};
        new_action();
    }
    else if(window.edit_margin_top_section.key_tree !== undefined){
        window.edit_margin_top_section = {};
        new_action();
    }
    else if(window.edit_margin_bottom_section.key_tree !== undefined){
        window.edit_margin_bottom_section = {};
        new_action();
    }
    else if(window.edit_margin_right.key_tree !== undefined){
        window.edit_margin_right = {};
        new_action();
    }
    else if(window.edit_margin_left.key_tree !== undefined){
        window.edit_margin_left = {};
        new_action();
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