draw_responsive_selector = function(){
    return $('<div/>',{class:'responsive_selector_container'}).append(
        $('<div/>',{class:'responsive_selector',key:'general',tooltip:texts.general}).append(
            $('<div/>',{class:'ico-responsive mie-5'}),
        ),
        $('<div/>',{class:'responsive_selector',key:'desktop',tooltip:texts.desktop}).append(
            $('<div/>',{class:'ico-desktop mie-5'}),
        ),
        $('<div/>',{class:'responsive_selector',key:'mobile',tooltip:texts.mobile}).append(
            $('<div/>',{class:'ico-mobile mie-5'}),
        ),
    )
}
set_responsive_selector = function(){
    $('.responsive_selector_container').each(function(){
        let editors_container = $(this).closest('.editors_container');
        let is_general = true;
        editors_container.find('.editor').each(function(){
            if(!$(this).hasClass('dummy_editor')){
                let key_tree = $(this).attr('key_tree');
                let variable_key = $(this).attr('variable_key');
                let key = $(this).attr('key');
                let elem_data = get_elem_data(key_tree,variable_key,key);
                if(elem_data.val !== elem_data.val_mobile && typeof(elem_data.val_mobile) !== 'undefined'){
                    is_general = false;
                }
            }
        })
        $(this).find('.responsive_selector').removeClass('responsive_selector_selected')
        if(is_general){
            $(this).find('.responsive_selector[key="general"]').addClass('responsive_selector_selected')
        }else{
            if(window.current_view == 'desktop'){
                $(this).find('.responsive_selector[key="desktop"]').addClass('responsive_selector_selected')
            }else if(window.current_view == 'mobile'){
                $(this).find('.responsive_selector[key="mobile"]').addClass('responsive_selector_selected')
            }
        }
    })
}
$('body').on('click','.responsive_selector',function(){
    $('.responsive_selector').removeClass('responsive_selector_selected');
    $(this).addClass('responsive_selector_selected')
    undo_redo_actions(true,false)
})