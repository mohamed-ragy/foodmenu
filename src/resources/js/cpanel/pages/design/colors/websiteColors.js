$('html,body').on('click','.colorCard',function(){
    $('.colorCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').addClass('ico-check1');
    setPreviewColors($(this).attr('colorId'));
    saveWebsiteColorsNoSave();
});

$('.colorPreview').on('click',function(e){
    e.stopImmediatePropagation();
    navigator.clipboard.writeText($(this).attr('colorCode')).then(function(){
        showAlert('normal',texts.design.colorCodeCopyed,4000,true);
    });
})

$('#websiteColors-colorCancelBtn').on('click',function(){
    $('.colorCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0')
    $('.colorCard[colorId="'+website.website_colors+'"]').find('.ico-check0').addClass('ico-check1').removeClass('ico-check0')
    setPreviewColors(website.website_colors);
    saveWebsiteColorsNoSave();
});

$('#websiteColors-colorSaveBtn').on('click',function(){
    showBtnLoading($('#websiteColors-colorSaveBtn'));
    let saveColor;
    let saveColorId;
    $('.colorCard').each(function(){
        if($(this).find('.colorCardCheck').hasClass('ico-check1')){
            saveColorId = $(this).closest('.colorCard').attr('colorId');
        }
    })
    for(const key in window.colors){
        if(saveColorId == window.colors[key].id){
            saveColor = window.colors[key];
        }
    }
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            websiteColor:saveColorId,
        },
        success:function(response){
            hideBtnLoading($('#websiteColors-colorSaveBtn'));
            if(response.saveWebsiteColorStatus == 1){
                showAlert('success',response.msg,4000,true);
                 website.website_colors = saveColorId;
                saveWebsiteColorsNoSave();
            }else if(response.saveWebsiteColorStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});

saveWebsiteColorsNoSave = function(){
    let selectColorId ;
    $('.colorCard').each(function(){
        if($(this).find('.colorCardCheck').hasClass('ico-check1')){
            selectColorId = $(this).closest('.colorCard').attr('colorId');
        }
    })
    if( selectColorId != website.website_colors){
        $('#websiteColors-websiteColorsNosave').removeClass('none');
    }else{
        $('#websiteColors-websiteColorsNosave').addClass('none');
    }
}
