draw_select_template = function(is_close_icon = false){
    //need to make create new template and select from demos
    show_popup(function(){
        $('.popupTitle').text(window.texts.selectTemplate)
        if(!is_close_icon){
            $('.popupClose').addClass('none')
        }
        $('.popupBody').addClass('').append(
            $('<div/>',{class:'select_template_langs row wrap alnC jstfyC'}),
            $('<div/>',{class:'select_template_container'}),
        )
    })
    for(const key in window.templates){
        let template = window.templates[key];
        $('.select_template_container').append(
            $('<div/>',{class:'selectTemplate',template_id:template._id}).append(
                $('<div/>',{text:template.name})
            )
        )
    }

    for(const key in website.languages){
        let lang = website.languages[key];
        let check_class = 'ico-check0';
        if(window.preview_language == lang.code){
            check_class = 'ico-check1'
        }
        if(lang.websiteDefault == true){window.preview_language = lang.code}

        $('.select_template_langs').append(
            $('<div/>',{class:'select_template_lang pointer row alnC jstfyC',lang:lang.code}).append(
                $('<img/>',{class:'w30 br5',src:`/storage/imgs/flags/${lang.flag}.png`}),
                $('<div/>',{class:'fs09 mX10',text:lang.name}),
                $('<div/>',{class:`select_template_lang_check ${check_class} mis-20`})
            )
        )
    }

    let is_lang_checked = false;
    $('.select_template_lang').each(function(){
        if($(this).find('.select_template_lang_check').hasClass('ico-check1')){
            is_lang_checked = true;
        }
    })
    if(!is_lang_checked){
        $(`.select_template_lang[lang="${window.preview_language}"]`).find('.select_template_lang_check').removeClass('ico-check0').addClass('ico-check1')
    }
}
//events
$('html,body').on('click','.select_template_lang',function(e){
    e.stopImmediatePropagation();
    $('.select_template_lang_check').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.select_template_lang_check').removeClass('ico-check0').addClass('ico-check1')
    window.preview_language = $(this).attr('lang')
})
$('html,body').on('click','.selectTemplate',function(e){
    e.stopImmediatePropagation();
    window.template_id = $(this).attr('template_id')
    if(window.preview_language == window.website_texts.lang){
        draw_builder(window.template_id);
        close_popup();
    }else{
        $('.popupClose').addClass('none')
        $('.popupBody').text('').append(
            $('<div/>',{class:'mY40 loading_L vV'})
        )
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                get_langText:window.preview_language,
            },success:function(r){
                if(r.website_texts != null){
                    window.website_texts = r.website_texts;
                    set_website_texts()
                    draw_builder(window.template_id);
                    close_popup();
                }
            }
        })
    }

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
