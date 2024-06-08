draw_elem_text_selector = function(key_tree){
    return '';
    let elem_data = get_key_tree(key_tree).elem;
    let elem = $('<div/>',{class:'elem_text_selector_container'}).append(
        $('<div/>',{class:'bold mT20',text:texts.styling.text})
    );
    let hyperLinks = get_hyperLinks();
    for(const key in window.website_data.languages){
        let language = window.website_data.languages[key];
        let this_links_dropDown;
        elem.append(
            $('<div/>',{class:'elem_text_selector'}).append(
                $('<div/>',{class:'fs09 mT20 mis-5',text:language.name}),
                $('<div/>',{class:'elem_text_selector_format_btns'}).append(
                    $('<button/>',{tooltip:texts.styling.bold,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-bold',format_action:'bold',format_tag:'span'}),
                    $('<button/>',{tooltip:texts.styling.italic,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-italic',format_action:'italic',format_tag:'span'}),
                    $('<button/>',{tooltip:texts.styling.underline,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-underline fs1',format_action:'underline',format_tag:'span'}),
                    $('<div/>',{tooltip:texts.styling.font_color,class:''}).append(
                        $('<input/>',{format_action:'color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'color'}),
                        $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
                            $('<span/>',{class:'ico-text_color fs101'}),
                            $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
                        ),
                    ),
                    $('<div/>',{tooltip:texts.styling.bg_color,class:''}).append(
                        $('<input/>',{format_action:'background_color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'background_color'}),
                        $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
                            $('<span/>',{class:'ico-background_color fs103'}),
                            $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
                        ),
                    ),

                    $('<button/>',{class:'elem_text_selector_format_btn2 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2',format_action:'link'}).append(
                        $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-link'}),
                        $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-arrowDown fs06 bold mis-10'}),
                        this_links_dropDown = $('<div/>',{class:'elem_text_selector_format_btn2_dropDown elem_text_selector_format_btn2_dropDown_editor_popup none'})
                    ),
                    $('<button/>',{tooltip:texts.styling.remove_hyperlinke,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style none ico-unlink',format_action:'unlink',format_tag:'a'}),

                    $('<button/>',{tooltip:texts.styling.clear_formating,class:'elem_text_selector_format_btn4 elem_text_selector_format_btn_style ico-erase fs1',format_action:'clear'}),

                ),
                $('<div/>',{class:'builder_font elem_text_selector_editor elem_text_selector_editor_editor_popup',contenteditable:true,lang:language.code,key_tree:key_tree,html:elem_data.text.val[language.code]})
            )
        )
        for(const key in hyperLinks){
            this_links_dropDown.append(
                $('<div/>',{
                    class:`elem_text_selector_format_btn2_dropDown_elem elem_text_selector_format_btn builder_font`,
                    format_action:'link',
                    format_tag:'a',
                    text:hyperLinks[key].name,
                    link_key:key
                })
            )

        }
    }

    return elem
}
draw_edit_home_text_elem_text = function(elem){
    let key_tree = elem.attr('key_tree');
    let elem_data = get_key_tree(elem.attr('key_tree')).elem;
    elem.addClass('editing_edit_home_elem_editing')
    elem.text('')
    let this_links_dropDown;
    let hyperLinks = get_hyperLinks();
    elem.append(
        $('<div/>',{class:'elem_text_selector'}).append(
            $('<div/>',{class:'elem_text_selector_format_btns elem_text_selector_format_btns_website_body'}).append(
                $('<button/>',{tooltip:texts.styling.bold,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-bold',format_action:'bold',format_tag:'span'}),
                $('<button/>',{tooltip:texts.styling.italic,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-italic',format_action:'italic',format_tag:'span'}),
                $('<button/>',{tooltip:texts.styling.underline,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style ico-underline fs1',format_action:'underline',format_tag:'span'}),
                $('<div/>',{tooltip:texts.styling.font_color,class:''}).append(
                    $('<input/>',{format_action:'color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'color'}),
                    $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
                        $('<span/>',{class:'ico-text_color fs101'}),
                        $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
                    ),
                ),
                $('<div/>',{tooltip:texts.styling.bg_color,class:''}).append(
                    $('<input/>',{format_action:'background_color',class:`color_picker color_picker_hidden elem_text_selector_format_btn3_picker dummy_color_picker`,type:'text',style:`background-color:rgba(0,0,0,1)`,value:'rgba(0,0,0,1)',formate_action:'background_color'}),
                    $('<button/>',{class:'elem_text_selector_format_btn3 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2'}).append(
                        $('<span/>',{class:'ico-background_color fs103'}),
                        $('<span/>',{class:'ico-arrowDown fs06 bold mis-10'}),
                    ),
                ),

                $('<button/>',{class:'elem_text_selector_format_btn2 elem_text_selector_format_btn_style elem_text_selector_format_btn_style_2',format_action:'link'}).append(
                    $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-link'}),
                    $('<span/>',{tooltip:texts.styling.hyperlink,class:'ico-arrowDown fs06 bold mis-10'}),
                    this_links_dropDown = $('<div/>',{class:'elem_text_selector_format_btn2_dropDown none'})
                ),
                $('<button/>',{tooltip:texts.styling.remove_hyperlinke,class:'elem_text_selector_format_btn elem_text_selector_format_btn_style none ico-unlink',format_action:'unlink',format_tag:'a'}),

                $('<button/>',{tooltip:texts.styling.clear_formating,class:'elem_text_selector_format_btn4 elem_text_selector_format_btn_style ico-erase fs1',format_action:'clear'}),

            ),
            $('<div/>',{class:' elem_text_selector_editor',contenteditable:true,lang:window.preview_language,key_tree:key_tree,html:elem_data.text.val[window.preview_language]})
        )
    )
    for(const key in hyperLinks){
        this_links_dropDown.append(
            $('<div/>',{
                class:`elem_text_selector_format_btn2_dropDown_elem elem_text_selector_format_btn builder_font`,
                format_action:'link',
                format_tag:'a',
                text:hyperLinks[key].name,
                link_key:key
            })
        )
    }

    let range = document.createRange();
    range.selectNodeContents(elem.find('.elem_text_selector_editor').get(0));
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}
//
$('body').on('click','.elem_text_selector_format_btn4',function(e){
    // e.stopImmediatePropagation();
    $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').find('.format').each(function(){
        if($(this).hasClass('format_container')){
            $(this).after($('<div/>',{class:'format format_container',text:$(this).text()}))
            $(this).remove();
        }else{
            $(this).after($(this).text());
            $(this).remove();
        }
    })
    $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
})
$('body').on('click','.elem_text_selector_format_btn3',function(e){
    // e.stopImmediatePropagation();
    $(this).parent().find('.color_picker').trigger('click')
})
$('body').on('input','.elem_text_selector_format_btn3_picker',function(e){
    // e.stopImmediatePropagation();
    let span = get_text_selection_span($(this).closest('.elem_text_selector'));
    if(typeof(span) == 'undefined'){return;}
    let selection = window.getSelection();
    let newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    span = selection.anchorNode;
    let selection_string = selection.toString();

    if($(this).attr('format_action') == 'color'){
        $(span).css('color',$(this).val())
    }else if($(this).attr('format_action') == 'background_color'){
        $(span).css('background-color',$(this).val())
    }

})
$('body').on('change','.elem_text_selector_format_btn3_picker',function(e){
    // e.stopImmediatePropagation();
    let span = get_text_selection_span($(this).closest('.elem_text_selector'));
    if(typeof(span) == 'undefined'){return;}
    let selection = window.getSelection();
    let newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    let selection_string = selection.toString();
    set_text_selection_format_btns($(this).closest('.elem_text_selector'));
    clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
    $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
})
$('body').on('click','.elem_text_selector_format_btn2',function(e){
    // e.stopImmediatePropagation();
    switch ($(this).attr('format_action')) {
        case 'link':
                if($(this).find('.elem_text_selector_format_btn2_dropDown').hasClass('elem_text_selector_format_btn2_dropDown_editor_popup')){
                    $(this).find('.elem_text_selector_format_btn2_dropDown').removeClass('none').css({
                        top:$(this).offset().top + $(this).height(),
                        left:$(this).offset().left,
                    })
                }else{
                    $(this).find('.elem_text_selector_format_btn2_dropDown').removeClass('none').css({
                        top:$(this).position().top - 2,
                        left:$(this).position().left,
                    })
                }
            break;

        default:
            break;
    }
})
get_text_selection_span = function(elem_text_selector){
    let selection = window.getSelection();
    if(selection.toString().length == 0){
        elem_text_selector.find('.elem_text_selector_editor').focus()
        return selection.anchorNode.parentElement;
    }
    let range = selection.getRangeAt(0).cloneRange();
    let node = selection.anchorNode;
    let span
    if (node.nodeType === 1 && $(node).hasClass('format')) {
        span = node;
    }else if(node.nodeType == 3 && $(node.parentElement).text() == selection.toString() &&  $(node.parentElement).hasClass('format')){
        span = node.parentElement;
    }else if(node.nodeType == 3){
            span = document.createElement('span');
            span.className = 'format';
            span.appendChild(range.extractContents());
            range.insertNode(span);
    }
    return span;
}

set_text_selection_format_btns = function(elem_text_selector){
        let selection = window.getSelection();
        let node = selection.anchorNode;
        let span
        if (node.nodeType === 1 && $(node).hasClass('format')) {
            span = node;
        }else if(node.nodeType == 3 && $(node.parentElement).hasClass('format')){
            span = node.parentElement;
        }
        if($(span).css('font-weight') == '700'){
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="bold"]').addClass('elem_text_selector_format_btn_selected');
        }else{
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="bold"]').removeClass('elem_text_selector_format_btn_selected');
        }

        if($(span).css('font-style') == 'italic'){
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="italic"]').addClass('elem_text_selector_format_btn_selected');
        }else{
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="italic"]').removeClass('elem_text_selector_format_btn_selected');
        }

        if($(span).css('text-decoration-line') == 'underline'){
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="underline"]').addClass('elem_text_selector_format_btn_selected');
        }else{
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="underline"]').removeClass('elem_text_selector_format_btn_selected');
        }

        if($(span).attr('href') == null || $(span).attr('href') == ''){
            elem_text_selector.find('.elem_text_selector_format_btn2[format_action="link"]').removeClass('none')
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="unlink"]').addClass('none')
        }else{
            elem_text_selector.find('.elem_text_selector_format_btn[format_action="unlink"]').removeClass('none')
            elem_text_selector.find('.elem_text_selector_format_btn2[format_action="link"]').addClass('none')
        }
        if(typeof(span) == 'undefined'){
            elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="color"]').parent().find('.ico-text_color').css('color','')
            elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="background_color"]').parent().find('.ico-background_color').css('color','')
        }else{
            elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="color"]').parent().find('.ico-text_color').css('color',span.style.color ?? '')
            elem_text_selector.find('.elem_text_selector_format_btn3_picker[format_action="background_color"]').parent().find('.ico-background_color').css('color',span.style['background-color'] ?? '')
        }




}
clean_unformated_text = function(elem_text_selector,selection,selection_string){
    if(elem_text_selector.find('.elem_text_selector_editor').children().length === 0){
        let text = elem_text_selector.find('.elem_text_selector_editor').children().text();
        elem_text_selector.find('.elem_text_selector_editor').children().text('').append(
            $('<div/>',{class:'format format_container',text:text})
        )
    }
    elem_text_selector.find('.elem_text_selector_editor').children().each(function(){
        let remove_elem = false;
        if(
            $(this).css('font-weight') == '400' &&
            $(this).css('font-style') == 'normal' &&
            $(this).css('text-decoration-line') == 'none' &&

            $(this).parent().css('font-weight') == '400' &&
            $(this).parent().css('font-style') == 'normal' &&
            $(this).parent().css('text-decoration-line') == 'none'
        ){
            remove_elem = true;
        }
        if(
            $(this).attr('href') == '' && remove_elem ||
            typeof($(this).attr('href')) === 'undefined' && remove_elem
        ){
            remove_elem = true;
        }else{
            remove_elem = false
        }

        if(
            $(this).get(0).style['color'] == '' && remove_elem
        ){
            remove_elem = true;
        }else{
            remove_elem = false;
        }

        if(
            $(this).get(0).style['background-color'] == '' && remove_elem
        ){
            remove_elem = true;
        }else{
            remove_elem = false;
        }

        if(!$(this).hasClass('format')){
            remove_elem = true;
        }

        if($(this).hasClass('format_container')){
            remove_elem = false;
        }



        if(remove_elem){
            $(this).after($(this).text());
            $(this).remove();
        }else{
            if(typeof($(this).attr('href')) === 'undefined' || $(this).attr('href') == ''){
                new_elem = $('<span/>');
                $(this).removeClass('open_page open_popup scroll_to_section')
                $(this).attr('page','');
                $(this).attr('popup','');
                $(this).attr('section','')
            }else{
                new_elem = $('<a/>');
            }
            $.each($(this).prop('attributes'), function() {
                if(this.value != ''){
                    new_elem.attr(this.name, this.value);
                }
            });
            new_elem.append($(this).contents());
            $(this).after(new_elem);
            $(this).remove();
            if(selection_string == new_elem.text()){
                let range = document.createRange();
                range.selectNodeContents(new_elem.get(0));
                selection.removeAllRanges();
                selection.addRange(range);
            }

        }
    })
    if(elem_text_selector.find('.elem_text_selector_editor').find('.format_container').length === 0){
        let html = elem_text_selector.find('.elem_text_selector_editor').html();
        elem_text_selector.find('.elem_text_selector_editor').text('').append(
            $('<div/>',{class:'format format_container'}).append(html)
        )
    }
}
//
$('body').on('keydown','.elem_text_selector_editor',function(e){
    if(e.ctrlKey ){
        if(
            e.ctrlKey && e.which == 65 ||
            e.ctrlKey && e.which == 67 ||
            e.ctrlKey && e.which == 86 ||
            e.ctrlKey && e.which == 88 ||
            e.shiftKey && e.ctrlKey && e.which == 90 ||
            e.ctrlKey && e.which == 90 ||
            e.ctrlKey && e.which == 83

        ){

        }else{
            e.preventDefault();
            // e.stopPropagation();
        }
    }

});
$('body').on('mouseup keyup','.elem_text_selector_editor',function(e){
    // e.stopPropagation();
    set_text_selection_format_btns($(this).closest('.elem_text_selector'));
    // hidePopupSelectors();
});

$('body').on('input','.elem_text_selector_editor',function(e){
    // e.stopImmediatePropagation();
    set_text_selection_format_btns($(this).closest('.elem_text_selector'));
    let key_tree = $(this).attr('key_tree');
    let elem = get_key_tree(key_tree).elem
    elem.text.val[$(this).attr('lang')] = $(this).html();
    if($(this).hasClass('elem_text_selector_editor_editor_popup')){
        new_action(false,true);
    }else{
        new_action(false,false)
    }
})
$('body').on('click','.elem_text_selector_format_btn',function(e){
    // e.stopImmediatePropagation();
    let span = get_text_selection_span($(this).closest('.elem_text_selector'));
    if(typeof(span) == 'undefined'){return;}
    let selection = window.getSelection();
    let newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    span = selection.anchorNode;
    let selection_string = selection.toString();

    if($(this).attr('format_action') == 'bold'){
        if($(span).css('font-weight')  == '700'){
            $(span).css('font-weight','400');
            $(span).children().css('font-weight','400');
            // $(span).children('.format').css('font-weight','normal');
        }else{
            $(span).css('font-weight','700');
        }
    }else if($(this).attr('format_action') == 'italic'){
        if($(span).css('font-style') == 'italic'){
            $(span).css('font-style','normal');
            $(span).children().css('font-style','normal');
            // $(span).children('.format').css('font-style','');
        }else{
            $(span).css('font-style','italic');
        }
    }else if($(this).attr('format_action') == 'underline'){
        if($(span).css('text-decoration-line') == 'underline'){
            $(span).css('text-decoration-line','none');
            $(span).children().css('text-decoration-line','none');
            // $(span).children('.format').css('text-decoration','');
        }else{
            $(span).css('text-decoration-line','underline');
        }
    }else if($(this).attr('format_action') == 'link'){
        let hyperLink = get_hyperLinks()[$(this).attr('link_key')]
        $(span).addClass(hyperLink.class)
        for(const key in hyperLink.attr){
            $(span).attr(key,hyperLink.attr[key])
        }
        // $(span).attr('page',$(this).attr('format_class'))
    }else if($(this).attr('format_action') == 'unlink'){
        $(span).attr('href','')
    }

    set_text_selection_format_btns($(this).closest('.elem_text_selector'));
    clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
    $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
});

$('body').on('paste','[contenteditable]',function(e){
    e.preventDefault();
    let clipboardData = (event.clipboardData || window.clipboardData).getData('text/plain');
    let selection = window.getSelection();
    let selection_string = selection.toString();
    let selected_range = window.getSelection().getRangeAt(0);
    selected_range.deleteContents();
    let newNode = document.createTextNode(clipboardData);
    selected_range.insertNode(newNode);
    selected_range.setEnd(newNode, newNode.length);
    selected_range.setStart(newNode, newNode.length);
    clean_unformated_text($(this).closest('.elem_text_selector'),selection,selection_string);
    $(this).closest('.elem_text_selector').find('.elem_text_selector_editor').trigger('input')
})
