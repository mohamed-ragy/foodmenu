draw_select_template = function(is_close_icon = false){
    //need to make create new template and select from demos
    show_popup(function(){
        $('.popupTitle').text(window.texts.selectTemplate)
        if(!is_close_icon){
            $('.popupClose').addClass('none')
        }
        $('.popupBody').addClass('mnw600').append(

        )
    })
    for(const key in window.templates){
        let template = window.templates[key];
        $('.popupBody').append(
            $('<div/>',{class:'selectTemplate',template_id:template._id}).append(
                $('<div/>',{text:template.name})
            )
        )
    }
}
//events
$('html,body').on('click','.selectTemplate',function(e){
    e.stopImmediatePropagation();
    window.template_id = $(this).attr('template_id')
    draw_builder(window.template_id);
    close_popup();

})

$('html,body').on('click','.showSelectTemplate',function(e){
    e.stopImmediatePropagation();
    if(is_saved_checker()){
        draw_select_template(true);
    }else{
        show_popup(function(){
            $('.popupTitle').text(window.texts.warning)
            $('.popupBody').addClass('mxw500').append(
                $('<div/>',{class:'msgBox_orange'}).append(
                    $('<div/>',{class:'ico-warning cO fs3 mB10'}),
                    $('<div/>',{class:'taC fs101 bold',text:texts.templateNotSaved}),
                ),
                $('<div/>',{class:'row alnC jstfyE'}).append(
                    $('<button/>',{class:'btn mie-5 showSelectTemplate_save'}).append(
                        $('<div/>',{class:'btnTxt',text:texts.saveAndContinue}),
                        $('<div/>',{class:'btnLoading'})
                    ),
                    $('<button/>',{class:'btn btn-warning mie-5 showSelectTemplate_confirm',text:texts.continue}),
                    $('<button/>',{class:'btn btn-cancel mie-5 popupClose',text:texts.cancel}),
                )
            )

        })
    }

})

$('html,body').on('click','.showSelectTemplate_confirm',function(e){
    e.stopImmediatePropagation();
    draw_select_template(true);
})
$('html,body').on('click','.showSelectTemplate_save',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('.showSelectTemplate_save'))
    save().then(function(){
        hideBtnLoading($('#save'));
        draw_select_template(true);
    },hideBtnLoading($('#save')))

})
