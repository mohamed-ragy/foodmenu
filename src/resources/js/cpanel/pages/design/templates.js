
let templatesCategories = ['pizzeria','americanDiner','casualDining','fineDining','italian','burgers','sandwiches','donuts','patisserie','desserts','fastFood','vegan','mexican','vegetarian','mediterranean','asian','indian','steakhouse','chinese','sushiBar','friedChicken','seafood','icecream'];
for(const key in templatesCategories){
    addToInputList($('#design-tempaltes-templatesList'),texts.templates[templatesCategories[key]],templatesCategories[key])
}
$('#design-tempaltes-templatesList').on('click','.inputListElement',function(e){
    $('#design-tempaltes-templatesInputList').val($(this).text())
    $('#design-tempaltes-templatesInputList').attr('restaurantType',$(this).attr('key'))
})

drawTemplate = function(template){
    let imgsNoticeClass;let templateIntroClass;let templateSlideShowClass; let templateOurStoryClass; let templateInfoClass; let templateGalleryClass;
    template.intro ? templateIntroClass = 'ico-check' : templateIntroClass = 'ico-close';
    template.intro ? templateIntroClass = templateIntroClass+' cG' : templateIntroClass = templateIntroClass+' cR';

    template.slideShow ? templateSlideShowClass = 'ico-check' : templateSlideShowClass = 'ico-close';
    template.slideShow ? templateSlideShowClass = templateSlideShowClass+' cG' : templateSlideShowClass = templateSlideShowClass+' cR';

    template.ourStory ? templateOurStoryClass = 'ico-check' : templateOurStoryClass = 'ico-close';
    template.ourStory ? templateOurStoryClass = templateOurStoryClass+' cG' : templateOurStoryClass = templateOurStoryClass+' cR';

    template.info ? templateInfoClass = 'ico-check' : templateInfoClass = 'ico-close';
    template.info ? templateInfoClass = templateInfoClass+' cG' : templateInfoClass = templateInfoClass+' cR';

    template.gallery ? templateGalleryClass = 'ico-check' : templateGalleryClass = 'ico-close';
    template.gallery ? templateGalleryClass = templateGalleryClass+' cG' : templateGalleryClass = templateGalleryClass+' cR';

    if(template.imgsType == 'trans'){
        imgsNoticeClass = '';
    }else imgsNoticeClass = 'none';
    $('#design-Templates-templatesContainer').append(
    $('<div/>',{
            class:'templateContainer',
            autoHelp:'142',
        }).append(
            $('<img/>',{
                class:'templateContainerImg',
                src:`/storage/imgs/templates/${template.id}/preview.webp`
            }),
            $('<div/>',{class:'w100p-10 m5 cO '+imgsNoticeClass}).append(
                $('<span/>',{class:'ico-warning pX3 pY5'}),
                $('<span/>',{text:texts.templates.imgsTrans,class:' pX3 pY5'}),
            ),
            $('<div/>',{class:'row wrap w100p-10 p5 alnE jstfyE mTA'}).append(
                $('<div/>',{class:'w100p row wrap alnS jstfyS'}).append(
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.intro,class:'ico-basics pX3 pY5'}),
                        $('<span/>',{class:templateIntroClass+' pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.slideShow,class:'ico-slideshow pX3 pY5'}),
                        $('<span/>',{class:templateSlideShowClass+'  pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.info,class:'ico-info pX3 pY5'}),
                        $('<span/>',{class:templateInfoClass+'  pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.ourStory,class:'ico-description pX3 pY5'}),
                        $('<span/>',{class:templateOurStoryClass+'  pX3 pY5'}),
                    ),

                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.gallery,class:'ico-images pX3 pY5'}),
                        $('<span/>',{class:templateGalleryClass+'  pX3 pY5'}),
                    ),
                ),
                $('<div/>',{
                    class:'row wrap alnS jstfyE'
                }).append(
                    $('<button/>',{
                        text:texts.templates.livePreview,
                        class:'btn btn-cancel tdNone hvr-tdNone previewTemplateBtn',
                        link:`https://${template.restaurantType}.${process.env.MIX_APP_DOMAIN}/en/home?t=${template.id}`
                    }),
                    $('<button/>',{
                        templateId:template.id,
                        colorsId:template.colors,
                        class:'btn  applyTemplateBtn'
                    }).append(
                        $('<div/>',{class:'btnTxt',text:texts.templates.apply}),
                        $('<div/>',{class:'btnLoading',})
                    ),
                )
            )

        )
    )
}
drawCurrentTemplate = function(template){
    template.intro ? templateIntroClass = 'ico-check' : templateIntroClass = 'ico-close';
    template.intro ? templateIntroClass = templateIntroClass+' cG' : templateIntroClass = templateIntroClass+' cR';

    template.slideShow ? templateSlideShowClass = 'ico-check' : templateSlideShowClass = 'ico-close';
    template.slideShow ? templateSlideShowClass = templateSlideShowClass+' cG' : templateSlideShowClass = templateSlideShowClass+' cR';

    template.ourStory ? templateOurStoryClass = 'ico-check' : templateOurStoryClass = 'ico-close';
    template.ourStory ? templateOurStoryClass = templateOurStoryClass+' cG' : templateOurStoryClass = templateOurStoryClass+' cR';

    template.info ? templateInfoClass = 'ico-check' : templateInfoClass = 'ico-close';
    template.info ? templateInfoClass = templateInfoClass+' cG' : templateInfoClass = templateInfoClass+' cR';

    template.gallery ? templateGalleryClass = 'ico-check' : templateGalleryClass = 'ico-close';
    template.gallery ? templateGalleryClass = templateGalleryClass+' cG' : templateGalleryClass = templateGalleryClass+' cR';
    $('.currentTemplateContainer').text('');
    $('.currentTemplateContainer').append(
        $('<div/>',{
            class:'templateContainer',
            autoHelp:'142',
        }).append(
            $('<img/>',{
                class:'templateContainerImg',
                src:`/storage/imgs/templates/${template.id}/preview.webp`
            }),
            $('<div/>',{class:'row wrap w100p-10 p5 alnE jstfyE'}).append(
                $('<div/>',{class:'w100p row wrap alnS jstfyS'}).append(
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.intro,class:'ico-basics pX3 pY5'}),
                        $('<span/>',{class:templateIntroClass+' pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.slideShow,class:'ico-slideshow pX3 pY5'}),
                        $('<span/>',{class:templateSlideShowClass+'  pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.info,class:'ico-info pX3 pY5'}),
                        $('<span/>',{class:templateInfoClass+'  pX3 pY5'}),
                    ),
                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.ourStory,class:'ico-description pX3 pY5'}),
                        $('<span/>',{class:templateOurStoryClass+'  pX3 pY5'}),
                    ),

                    $('<div/>',{class:'m5'}).append(
                        $('<span/>',{tooltip:texts.homePageSections.gallery,class:'ico-images pX3 pY5'}),
                        $('<span/>',{class:templateGalleryClass+'  pX3 pY5'}),
                    ),
                ),
                $('<div/>',{
                    class:'row wrap alnS jstfyE'
                }).append(
                    $('<button/>',{
                        text:texts.templates.livePreview,
                        class:'btn btn-cancel tdNone hvr-tdNone previewTemplateBtn',
                        link:`https://${template.restaurantType}.${process.env.MIX_APP_DOMAIN}/en/home?t=${template.id}`
                    }),
                )
            )

        )
    )
}
drawCurrentTemplate(website.templateData)

$('html,body').on('click','.previewTemplateBtn',function(e){
    e.stopImmediatePropagation();
    window.open($(this).attr('link'), '_blank');
})

$('#design-templates-templatesCategoriesFindBtn').on('click',function(e){
    if($('#design-tempaltes-templatesInputList').val() == ''  ||  $('#design-tempaltes-templatesInputList').val() ==  null){
        return;
    }
    showBtnLoading($('#design-templates-templatesCategoriesFindBtn'))
    $('#design-Templates-templatesContainer').text('');
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            loadTemplates:$('#design-tempaltes-templatesInputList').attr('restaurantType'),
        },success:function(r){
            hideBtnLoading($('#design-templates-templatesCategoriesFindBtn'))
            for(const key in r.templates){
                drawTemplate(r.templates[key])
                scrollToDiv($('#bodyPage'),$('#design-Templates-templatesContainer'))
            }
        }
    })

})
$('#bodyPage').on('click','.applyTemplateBtn',function(e){
    e.stopImmediatePropagation();
    thisBtn = $(this);
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.applyTemplateBtn').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm);
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn');
        updateToolTip();
    }
    showBtnLoading($('.applyTemplateBtn'))
    $.ajax({
        url:'design',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            applyTemplate:$(this).attr('templateId'),
        },success:function(r){
            hideBtnLoading($('.applyTemplateBtn'))
            if(r.applyTemplateStatus == 1){
                showAlert('success',r.msg,4000,true)
                website.template = r.template.id;
                website.templateData = r.template;
                drawCurrentTemplate(website.templateData)
                website.website_colors = r.template.colors;
                $('#homePageSections-introCancelBtn').trigger('click');
                $('#design-homePageSections-infoCancelBtn').trigger('click');
                $('#design-homePageSections-ourStoryCancelBtn').trigger('click');
                let websiteLogo;let websiteIcon;
                if(website.logo == null){
                    website.logo = `/storage/imgs/templates/${website.template}/logo.webp`
                    $('#settings-websiteLogoImg').attr('src',website.logo);
                }
                if(website.icon == null){
                    website.icon = `/storage/imgs/templates/${website.template}/icon.webp`
                    $('#settings-websiteIconImg').attr('src',website.icon);
                }
                if(website.intro.img == 'template'){
                    website.introImgUrl = `/storage/imgs/templates/${website.template}/intro.webp`
                    $('#design-introImgCard').attr('src',website.introImgUrl)
                }
                if(website.intro.img == 'template'){
                    website.infoImgUrl = `/storage/imgs/templates/${website.template}/info.webp`
                    $('#design-infoImgCard').attr('src',website.infoImgUrl)
                }
                if(website.ourStory.img == 'template'){
                    website.ourStoryImgUrl = `/storage/imgs/templates/${website.template}/ourStory.webp`
                    $('#design-ourStoryImgCard').attr('src',website.ourStoryImgUrl)
                }
                $('.colorCard').each(function(){
                    if($(this).attr('colorId') == website.website_colors){
                        $(this).trigger('click');
                    }
                });
                website.useCustomColors = false;
                $('#websiteColors-useCustomColors').prop('checked',false);
                window.guideHints.gallery();
                window.guideHints.homePageIntro();
                window.guideHints.homePageInfo();
                window.guideHints.homePageOurStory();
                window.guideHints.slideShow();
            }else if(r.applyTemplateStatus == 0){
                showAlert('error',r.msg,4000,true)
            }

        }
    })
})
