draw_interactions_selector = function(interactions){
    let elem = get_element_data(window.selected)
    let accessibility = elem.accessibility;
    if('styling_target' in elem){
        if('interactions' in elem.styling_target){
            accessibility = get_element_data(elem.styling_target.interactions).accessibility; 
        }
    }
    return $('<div/>',{class:'interactions_selector'}).append(
        $('<div/>',{key:'regular',class:`interaction_elem interaction_elem_selected ico-regular`,tooltip:texts.regular_style}),
        $('<div/>',{key:'hover',class:`${interactions.includes('hover') ? '' : 'none'} ${accessibility.includes('can_hover') ? '' :'none'} ${ accessibility.includes('hover') ? '' : 'interaction_elem_disabled'} interaction_elem ico-hover`,tooltip:texts.hover_style}),
        $('<div/>',{key:'click',class:`${interactions.includes('click') ? '' : 'none'} ${accessibility.includes('can_click') ? '' :'none'} ${ accessibility.includes('click') ? '' : 'interaction_elem_disabled'} interaction_elem ico-click`,tooltip:texts.click_style}),
        $('<div/>',{key:'focus',class:`${interactions.includes('focus') ? '' : 'none'} ${accessibility.includes('can_focus') ? '' :'none'} ${ accessibility.includes('focus') ? '' : 'interaction_elem_disabled'} interaction_elem ico-rename`,tooltip:texts.focus_style}),
        $('<div/>',{key:'disabled',class:`${interactions.includes('disabled') ? '' : 'none'} ${accessibility.includes('can_disabled') ? '' :'none'} ${ accessibility.includes('disabled') ? '' : 'interaction_elem_disabled'} interaction_elem ico-no`,tooltip:texts.disabled_style}),
        $('<div/>',{key:'error',class:`${interactions.includes('error') ? '' : 'none'} ${accessibility.includes('can_error') ? '' :'none'} ${ accessibility.includes('error') ? '' : 'interaction_elem_disabled'} interaction_elem ico-error`,tooltip:texts.error_style}),
        $('<div/>',{key:'selected',class:`${interactions.includes('selected') ? '' : 'none'} ${accessibility.includes('can_selected') ? '' :'none'} ${ accessibility.includes('selected') ? '' : 'interaction_elem_disabled'} interaction_elem ico-selected`,tooltip:texts.selected_style}),
    )
}
$('body').on('click','.interaction_elem',function(){
    if($(this).hasClass('interaction_elem_disabled')){return;}
    $(this).closest('.interactions_selector').find('.interaction_elem').removeClass('interaction_elem_selected');
    $(this).addClass('interaction_elem_selected');
    set_all_editors();
})
get_interaction_key = function(editor){
    let editors_container = editor.closest('.editors_container');
    let is_interactions = editors_container.attr('is_interactions');
    let interaction;
    if(is_interactions == '0'){return '0'}
    else if(is_interactions == '1'){
        interaction = editors_container.find('.interaction_elem_selected').attr('key');
        return interaction;
    }
}