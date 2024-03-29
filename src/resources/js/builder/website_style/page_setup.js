set_page_setup_settings = function(){
    set_page_setup_vars();
    $('#page_max_width_inputList').children().first().text(texts.select_elems[`_${window.template.page_setup.max_width}`])
    //
    $('.page_margin_select').removeClass('select_box_selected')
    $(`.page_margin_select[key="${window.template.page_setup.page_margin}"]`).addClass('select_box_selected')
    //

    $('#page_setup_theme_color_picker').removeClass().addClass(`color_theme_picker_container ${window.template.page_setup.page_color_theme}`).children().first().text(texts.website_style[window.template.page_setup.page_color_theme])
    //
    $('#pageTransition_inputList').children().first().text(texts.select_elems[window.template.page_setup.pageTransition])
    //
    $('.page_transitionDuration_select').removeClass('select_box_selected')
    $(`.page_transitionDuration_select[key="${window.template.page_setup.transitionDuration}"]`).addClass('select_box_selected')
    //
    $('#page_social_image').attr('src',window.template.page_setup.social_image ?? window.website.icon)
}

draw_page_setup = function(){
    $('#page_setup').find('.editor_popup_title').text(texts.website_style.page_setup)
    $('#page_setup').addClass('w500 h500').find('.editor_popup_body').text('').append(
        // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.page_setup}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.page_setup_des}),
        $('<div/>',{class:'w100p mB40'}).append(
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.max_content_width}),
                $('<div/>',{class:'inputList_container',id:'page_max_width_inputList',key_tree:'page_setup',key:'max_width'}).append(
                    $('<div/>',{class:'',text:texts.select_elems[`_${window.template.page_setup.max_width}`]}),
                    $('<div/>',{class:'ico-arrowDown'}),
                    $('<div/>',{class:'none inputList_elems_temp'}).append(
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._800px,key:'800px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1000px,key:'1000px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1200px,key:'1200px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1400px,key:'1400px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1600px,key:'1600px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._1800px,key:'1800px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._2000px,key:'2000px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._2200px,key:'2200px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._2400px,key:'2400px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._2600px,key:'2600px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._2800px,key:'2800px'}),
                        $('<div/>',{class:`inputList_elem`,text:texts.select_elems._3000px,key:'3000px'}),
                    )
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.page_margin}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'page_setup',key:'page_margin'}).append(
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box ico-no`,key:'0%'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'S',key:'1%'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'M',key:'1.5%'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'L',key:'2%'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.color_theme}),
                draw_color_theme_Picker('page_setup_theme_color_picker','page_setup','page_color_theme')
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.pageTransition}),
                $('<div/>',{class:'row alnC jstfyE'}).append(
                    $('<div/>',{class:'inputList_container',id:'pageTransition_inputList',key_tree:'page_setup',key:'pageTransition'}).append(
                        $('<div/>',{class:'',text:texts.select_elems[`_${window.template.page_setup.pageTransition}`]}),
                        $('<div/>',{class:'ico-arrowDown'}),
                        $('<div/>',{class:'none inputList_elems_temp'}).append(
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.fade,key:'fade'}),
                            $('<div/>',{class:`inputList_elem`,text:texts.select_elems.fade2,key:'fade2'}),

                        )
                    ),
                    $('<div/>',{class:'pageTransition_preview mis-5 fs101 pointer ico-play',})
                ),

            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.transitionDuration}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'page_setup',key:'transitionDuration'}).append(
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:texts.select_elems.slower,key:'1000ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:texts.select_elems.slow,key:'500ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:texts.select_elems.fast,key:'300ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:texts.select_elems.faster,key:'100ms'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.social_image}),
                $('<div/>',{class:'editor_popup_img_select select_img',key_tree:'page_setup',key:'social_image'}).append(
                    $('<img/>',{class:'editor_popup_img_select_img',id:'page_social_image'}),
                    $('<div/>',{class:'ico-edit editor_popup_img_select_edit_icon'})
                )
            )
        )
    )
}

//events
let preview_page_transition_in_timeout = null;
let preview_page_transition_out_timeout = null;
$('html,body').on('click','.pageTransition_preview',function(e){
    e.stopImmediatePropagation();
    clearTimeout(preview_page_transition_in_timeout)
    clearTimeout(preview_page_transition_out_timeout)
    $('#website').removeClass(`${window.template.page_setup.pageTransition}_in`)
    $('#website').addClass(`${window.template.page_setup.pageTransition}_out`)
    preview_page_transition_in_timeout = setTimeout(()=>{
        $('#website').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        preview_page_transition_out_timeout = setTimeout(()=>{
            $('#website').removeClass(`${window.template.page_setup.pageTransition}_in`)
        },window.template.page_setup.transitionDuration.replace('ms',''))
    },window.template.page_setup.transitionDuration.replace('ms',''))
})
