set_font_style_vars = function(){
    $(':root').css('--font_t',`'${window.template.font_style.title}', cairo, sans-serif`);
    $(':root').css('--font_p',`'${window.template.font_style.paragraph}', Tajawal, sans-serif`);
}
draw_font_style = function(){
    $('#font_style').find('.editor_popup_head_btn').text('').append(
        $('<div/>',{class:'backToFontStyle none ico-arrowLeft pointer fs101'}),
    )
    $('#font_style').addClass('w400 h400').find('.editor_popup_body').text('').append(
        $('<div/>',{id:'font_style_pack_container',class:''}).append(
            $('<div/>',{id:'font_style_pack_container'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.font_style}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.font_style_des}),

                $('<div/>',{class:`font_style_pack default_color_theme`}).append(
                    $('<div/>',{class:`fs103 bold font_t`,text:texts.website_style.titleFont_style}),
                    $('<div/>',{class:`fs09 font_p`,text:texts.website_style.paragraphFont_style}),
                )
            ),
            $('<div/>',{class:'row alnC jstfyE w100p mT30'}).append(
                $('<button/>',{class:'btn btn-cancel changeFontStyle',text:texts.website_style.changeFontStyle}),
            ),
        ),
        $('<div/>',{id:'font_style_packs_container',class:'none'}).append(
            $('<div/>',{class:'inter fs1 bold',text:texts.website_style.fontStyles}),
            $('<div/>',{class:'fs085 mB20  c_white-11',text:texts.website_style.fontStyles_des}),
            $('<div/>',{class:'font_style_packs_container '})
        ),
    )
    for(const key in window.fonts){
        $('.font_style_packs_container').append(
            $('<div/>',{class:`font_style_pack font_style_pack_change default_color_theme`,key:key}).append(
                $('<div/>',{style:`font-family:${window.fonts[key].title}`,class:`pointer fs103 bold`,text:texts.website_style.titleFont_style}),
                $('<div/>',{style:`font-family:${window.fonts[key].paragraph}`,class:`pointer fs09`,text:texts.website_style.paragraphFont_style}),
            )
        )
    }

}


//events
$('html,body').on('click','.changeFontStyle',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').removeClass('none');
})
$('html,body').on('click','.backToFontStyle',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').addClass('none');
})
$('html,body').on('click','.font_style_pack_change',function(e){
    e.stopImmediatePropagation();
    let font = window.fonts[$(this).attr('key')];
    window.template.font_style.title = font.title;
    window.template.font_style.paragraph = font.paragraph;
    new_action();
    editor_popup_to_parent($('#font_style_pack_container'),$('#font_style_packs_container'))
    $('.backToFontStyle').addClass('none');
})
