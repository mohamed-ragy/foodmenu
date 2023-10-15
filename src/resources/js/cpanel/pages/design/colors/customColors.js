resetCustomColors = function(){
    for(const key in website.customColors){
        let color = website.customColors[key];
        let colorContainer = $(`.customColorContainer[colorName="${key}"]`);
        colorContainer.css('background-color',color)
        colorContainer.find('.customColorPicker').val(color)
        colorContainer.find('.customColorHex').val(color)
    }
}
resetCustomColors();
customColorsNoSaveCheck = function(){
    if(
        $('#websiteColors-useCustomColors').prop('checked') == website.useCustomColors &&
        website.customColors.color1 == $(`.customColorContainer[colorName="color1"]`).find('.customColorHex').val() &&
        website.customColors.color2 == $(`.customColorContainer[colorName="color2"]`).find('.customColorHex').val() &&
        website.customColors.color3 == $(`.customColorContainer[colorName="color3"]`).find('.customColorHex').val() &&
        website.customColors.color4 == $(`.customColorContainer[colorName="color4"]`).find('.customColorHex').val() &&
        website.customColors.color5 == $(`.customColorContainer[colorName="color5"]`).find('.customColorHex').val() &&
        website.customColors.colorError == $(`.customColorContainer[colorName="colorError"]`).find('.customColorHex').val() &&
        website.customColors.colorSuccess == $(`.customColorContainer[colorName="colorSuccess"]`).find('.customColorHex').val() &&
        website.customColors.colorWarning == $(`.customColorContainer[colorName="colorWarning"]`).find('.customColorHex').val() &&
        website.customColors.colorStar == $(`.customColorContainer[colorName="colorStar"]`).find('.customColorHex').val()
    ){
        $('#websiteColors-customColorsNoSave').addClass('none');
    }else{
        $('#websiteColors-customColorsNoSave').removeClass('none');
    }
}

if(website.useCustomColors){$('#websiteColors-useCustomColors').prop('checked',true)}
$('#websiteColors-useCustomColors').on('click',function(){
    customColorsNoSaveCheck();
});
$('.customColorHex').on('change input',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.customColorContainer').find('.customColorHex').val($(this).val());
    $(this).closest('.customColorContainer').css('background-color',$(this).val());
    customColorsNoSaveCheck();
})
$('.customColor').on('click',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.customColorContainer').find('.customColorPicker')[0].click();
})
$('.customColorPicker').on('input change',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.customColorContainer').css('background-color',$(this).val());
    $(this).closest('.customColorContainer').find('.customColorHex').val($(this).val());
    customColorsNoSaveCheck();
})
$('#websiteColors-customColorCancelBtn').on('click',function(){
    $('#websiteColors-useCustomColors').prop('checked',website.useCustomColors)
    resetCustomColors();
    customColorsNoSaveCheck();
})
$('#websiteColors-customColorSaveBtn').on('click',function(){
    showBtnLoading($('#websiteColors-customColorSaveBtn'))
    let useCustomColors;let customColorsHexCode;
    if($('#websiteColors-useCustomColors').prop('checked') == true){useCustomColors = 1;}
    else if($('#websiteColors-useCustomColors').prop('checked') == false){useCustomColors = 0;}
    customColorsHexCode = {
        color1:$(`.customColorContainer[colorName="color1"]`).find('.customColorHex').val(),
        color2:$(`.customColorContainer[colorName="color2"]`).find('.customColorHex').val(),
        color3:$(`.customColorContainer[colorName="color3"]`).find('.customColorHex').val(),
        color4:$(`.customColorContainer[colorName="color4"]`).find('.customColorHex').val(),
        color5:$(`.customColorContainer[colorName="color5"]`).find('.customColorHex').val(),
        colorError:$(`.customColorContainer[colorName="colorError"]`).find('.customColorHex').val(),
        colorSuccess:$(`.customColorContainer[colorName="colorSuccess"]`).find('.customColorHex').val(),
        colorWarning:$(`.customColorContainer[colorName="colorWarning"]`).find('.customColorHex').val(),
        colorStar:$(`.customColorContainer[colorName="colorStar"]`).find('.customColorHex').val(),
    }
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveCustomColors:true,
            useCustomColors:useCustomColors,
            color1:customColorsHexCode.color1,
            color2:customColorsHexCode.color2,
            color3:customColorsHexCode.color3,
            color4:customColorsHexCode.color4,
            color5:customColorsHexCode.color5,
            colorError:customColorsHexCode.colorError,
            colorSuccess:customColorsHexCode.colorSuccess,
            colorWarning:customColorsHexCode.colorWarning,
            colorStar:customColorsHexCode.colorStar,
        },
        success:function(response){
            hideBtnLoading($('#websiteColors-customColorSaveBtn'))
            if(response.saveCustomColorsStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.useCustomColors = useCustomColors;
                website.customColors = customColorsHexCode;
                customColorsNoSaveCheck();
            }else if(response.saveCustomColorsStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})
