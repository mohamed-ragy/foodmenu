
require('./colors/websiteColors.js')//done
require('./colors/customColors.js')//done
getColors = function(){
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getColors:true,
        },success:function(r){
            window.colorsFirstLoad = true;
            window.colors = r.colors;
            $('.colorCardLoading').addClass('none');
            for(const key in window.colors){
                drawColorCard(window.colors[key]);
            }
            $('.colorCard').each(function(){
                if($(this).attr('colorId') == website.website_colors){
                    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
                    $(this).addClass('selectedColorCard');
                    $('#design-websiteStyle-colorPreviewText').text($(this).text())
                    $('#design-websiteStyle-colorPreview-color1').css('background-color',$(this).attr('color1'));
                    $('#design-websiteStyle-colorPreview-color1').attr('colorCode',$(this).attr('color1'));
                    $('#design-websiteStyle-colorPreview-color2').css('background-color',$(this).attr('color2'));
                    $('#design-websiteStyle-colorPreview-color2').attr('colorCode',$(this).attr('color2'));
                    $('#design-websiteStyle-colorPreview-color3').css('background-color',$(this).attr('color3'));
                    $('#design-websiteStyle-colorPreview-color3').attr('colorCode',$(this).attr('color3'));
                    $('#design-websiteStyle-colorPreview-color4').css('background-color',$(this).attr('color4'));
                    $('#design-websiteStyle-colorPreview-color4').attr('colorCode',$(this).attr('color4'));
                    $('#design-websiteStyle-colorPreview-color5').css('background-color',$(this).attr('color5'));
                    $('#design-websiteStyle-colorPreview-color5').attr('colorCode',$(this).attr('color5'));
                    $('#design-websiteStyle-colorPreview-colorError').css('background-color',$(this).attr('colorError'));
                    $('#design-websiteStyle-colorPreview-colorError').attr('colorCode',$(this).attr('colorError'));
                    $('#design-websiteStyle-colorPreview-colorSuccess').css('background-color',$(this).attr('colorSuccess'));
                    $('#design-websiteStyle-colorPreview-colorSuccess').attr('colorCode',$(this).attr('colorSuccess'));
                    $('#design-websiteStyle-colorPreview-colorWarning').css('background-color',$(this).attr('colorWarning'));
                    $('#design-websiteStyle-colorPreview-colorWarning').attr('colorCode',$(this).attr('colorWarning'));
                    $('#design-websiteStyle-colorPreview-colorStar').css('background-color',$(this).attr('colorStar'));
                    $('#design-websiteStyle-colorPreview-colorStar').attr('colorCode',$(this).attr('colorStar'));
                    $('#design-websiteStyle-colorId').val($(this).attr('colorId'));
                    $('#design-websiteStyle-colorName').val($(this).attr('colorName'));
                    $('#design-websiteStyle-colorError').val($(this).attr('colorError'));
                    $('#design-websiteStyle-colorSuccess').val($(this).attr('colorSuccess'));
                    $('#design-websiteStyle-colorWarning').val($(this).attr('colorWarning'));
                    $('#design-websiteStyle-color1').val($(this).attr('color1'));
                    $('#design-websiteStyle-color2').val($(this).attr('color2'));
                    $('#design-websiteStyle-color3').val($(this).attr('color3'));
                    $('#design-websiteStyle-color4').val($(this).attr('color4'));
                    $('#design-websiteStyle-color5').val($(this).attr('color5'));

                }
            })
        }
    })
}
drawColorCard = function(color){
    let checkBoxClass = 'ico-check0';
    if(color.id == website.website_colors){
        checkBoxClass = 'ico-check1';
        setPreviewColors(color.id)
    }
    $('#colorCardsContainer').append(
        $('<div>/',{
            class:'colorCard',
            colorId:color.id,
        }).append(
            $('<div/>',{class:'fs103 mX10 colorCardCheck '+checkBoxClass}),
            $('<div/>',{class:'colorCardInside',style:`background-color:${color.color1}`}),
            $('<div/>',{class:'colorCardInside',style:`background-color:${color.color2}`}),
            $('<div/>',{class:'colorCardInside',style:`background-color:${color.color3}`}),
            $('<div/>',{class:'colorCardInside',style:`background-color:${color.color4}`}),
            $('<div/>',{class:'colorCardInside',style:`background-color:${color.color5}`})
        )
    )
}
setPreviewColors = function(colorId){
    let color;
    for(const key in window.colors){
        if(window.colors[key].id == colorId){color = window.colors[key]}
    }
    $('.colorPreview[colorName="color1"]').attr('colorCode',color.color1).css('background-color',color.color1);
    $('.colorPreview[colorName="color1"]').children().first().css('color',color.color3).text(color.color1);
    $('.colorPreview[colorName="color2"]').attr('colorCode',color.color2).css('background-color',color.color2);
    $('.colorPreview[colorName="color2"]').children().first().css('color',color.color5).text(color.color2);
    $('.colorPreview[colorName="color3"]').attr('colorCode',color.color3).css('background-color',color.color3);
    $('.colorPreview[colorName="color3"]').children().first().css('color',color.color1).text(color.color3);
    $('.colorPreview[colorName="color4"]').attr('colorCode',color.color4).css('background-color',color.color4);
    $('.colorPreview[colorName="color4"]').children().first().css('color',color.color3).text(color.color4);
    $('.colorPreview[colorName="color5"]').attr('colorCode',color.color5).css('background-color',color.color5);
    $('.colorPreview[colorName="color5"]').children().first().css('color',color.color2).text(color.color5);
    $('.colorPreview[colorName="colorError"]').attr('colorCode',color.colorError).css('background-color',color.colorError);
    $('.colorPreview[colorName="colorError"]').children().first().css('color',color.color3).text(color.colorError);
    $('.colorPreview[colorName="colorSuccess"]').attr('colorCode',color.colorSuccess).css('background-color',color.colorSuccess);
    $('.colorPreview[colorName="colorSuccess"]').children().first().css('color',color.color3).text(color.colorSuccess);
    $('.colorPreview[colorName="colorWarning"]').attr('colorCode',color.colorWarning).css('background-color',color.colorWarning);
    $('.colorPreview[colorName="colorWarning"]').children().first().css('color',color.color3).text(color.colorWarning);
    $('.colorPreview[colorName="colorStar"]').attr('colorCode',color.colorStar).css('background-color',color.colorStar);
    $('.colorPreview[colorName="colorStar"]').children().first().css('color',color.color3).text(color.colorStar);
}
