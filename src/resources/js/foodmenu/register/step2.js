
step2 = function(){
    $('.getStartedText').addClass('getStartedText_show');
    $('.stepTxt').addClass('stepTxt_Show')
    $('.stepIcon').addClass('stepIcon_show')


    $('.getStartedBtnContainer').addClass('opacity0')
    $('.registerForm').removeClass('registerForm_show');
    $('.stepContainer[step="3"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');
    $('.stepContainer[step="4"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');


    setTimeout(function(){
        $('.getStartedBtnContainer').addClass('none')
        $('.registerForm').addClass('none');
        $('.registerForm[step="2"]').removeClass('none');

        $('.stepContainer[step="2"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="3"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="4"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');



    },500)
    setTimeout(function(){
        $('.stepContainer[step="1"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');
        $('.registerForm[step="2"]').addClass('registerForm_show');
        $('.stepContainer[step="1"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="2"]').find('.stepIcon').addClass('stepIcon_active').removeClass('stepIcon_success')
        $('.registerPrograssBar_val').css('width','50%')
        $('#domainName').focus();
        drawMap();
    },550)
}
$('#domainName').on('input change',function(){
    $('#domainNameTxt').text($('#domainName').val())
    $('#domainNameLink').attr('href',`${process.env.MIX_APP_URL_HTTP}${$('#domainName').val()}.${process.env.MIX_APP_DOMAIN}`)
})
$('#domainNameClearVal').on('click',function(){
    $('#domainNameTxt').text('')
})
//
$.getJSON('/storage/json/catz.json',function(j){
    window.countries = j.countries;
    window.timeZones = j.timeZones;
    window.cityToTz = j.cityToTz;
}).done(function(){
    window.countries.sort( (a, b) => {
        let textA = a[lang].toUpperCase();
        let textB = b[lang].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    window.countries.sort((a,b) => {
        return a.code == 'USA' ? -1
        : b.code == 'USA' ? 1
        : a.code == 'CAN' ? -1
        : b.code == 'CAN' ? 1
        : a.code == 'AUS' ? -1
        : b.code == 'AUS' ? 1
        : a.code == 'GBR' ? -1
        : b.code == 'GBR' ? 1
        : a.code == 'FRA' ? -1
        : b.code == 'FRA' ? 1
        : a.code == 'DEU' ? -1
        : b.code == 'DEU' ? 1
        : a.code == 'ITA' ? -1
        : b.code == 'ITA' ? 1
        : a.code == 'ESP' ? -1
        : b.code == 'ESP' ? 1
        : a.code == 'UKR' ? -1
        : b.code == 'UKR' ? 1
        : a.code == 'ARE' ? -1
        : b.code == 'ARE' ? 1
        : a.code == 'SAU' ? -1
        : b.code == 'SAU' ? 1
        : a.code == 'EGY' ? -1
        : b.code == 'EGY' ? 1
        : 0;
    })
    window.timeZones.sort( (a, b) => {
        let textA = a[lang].toUpperCase();
        let textB = b[lang].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    for(const key in window.countries){
        const country = window.countries[key];
        let countryName;
        if(lang == 'en'){countryName = country.en;}
        else if(lang == 'ar'){countryName = country.ar;}
        else if(lang == 'fr'){countryName = country.fr;}
        else if(lang == 'de'){countryName = country.de;}
        else if(lang == 'it'){countryName = country.it;}
        else if(lang == 'es'){countryName = country.es;}
        else if(lang == 'ru'){countryName = country.ru;}
        else if(lang == 'ua'){countryName = country.ua;}
        else{countryName = country.en;}

        addToInputList($('#countriesList'),countryName,country.code);

        // if(website.country_code == country.code){
        //     $('#system-countries').val(countryName);
        //     $('#system-countries').attr('key',country.code);
        //     $('#system-countryFlag').attr('src','storage/imgs/flags/'+country.code+'.png');
        // }
    }

    for(const key in window.timeZones){
        const timeZone = window.timeZones[key];
        let timeZoneName;
        if(lang == 'en'){timeZoneName = timeZone.en;}
        else if(lang == 'ar'){timeZoneName = timeZone.ar;}
        else if(lang == 'fr'){timeZoneName = timeZone.fr;}
        else if(lang == 'de'){timeZoneName = timeZone.de;}
        else if(lang == 'it'){timeZoneName = timeZone.it;}
        else if(lang == 'es'){timeZoneName = timeZone.es;}
        else if(lang == 'ru'){timeZoneName = timeZone.ru;}
        else if(lang == 'ua'){timeZoneName = timeZone.ua;}
        else{countryName = country.en;}

        addToInputList($('#timeZonesList'),timeZoneName,timeZone.code);

        if(Intl.DateTimeFormat().resolvedOptions().timeZone == timeZone.code){
            $('#timeZone').val(timeZoneName);
            $('#timeZone').attr('key',timeZone.code);
        }
    }
    setInterval(function(){
        const timeNow = new Date();
        try{
            liveTimeNow = timeNow.toLocaleTimeString(lang, {hour12 :$('#timeZone-hour12').prop('checked'),timeZone:$('#timeZone').attr('key')});
        }catch{
            liveTimeNow = '--:--:-- --';
        }
        $('#timeZoneTimeNow').text(liveTimeNow)
    },1000);

})
$('#country').on('input change',function(){
    $('#countryImg').addClass('none')
    for(const key in window.countries){
        if($(this).attr('key') == window.countries[key].code ){
            $('#countryImg').removeClass('none').attr('src',`/storage/imgs/flags/${$(this).attr('key')}.png`)
        }
    }
})
$('#countriesList').on('click','.inputListElement',function(){
    try{
        $('#countryImg').removeClass('none').attr('src',`/storage/imgs/flags/${$(this).attr('key')}.png`)
    }catch{
        $('#countryImg').addClass('none')

    }
})
//
let templatesCategories = ['pizzeria','americanDiner','casualDining','fineDining','italian','burgers','sandwiches','donuts','patisserie','desserts','fastFood','vegan','mexican','vegetarian','mediterranean','asian','indian','steakhouse','chinese','sushiBar','friedChicken','seafood','icecream'];
for(const key in templatesCategories){
    addToInputList($('#templatesList'),templatesNames[templatesCategories[key]],templatesCategories[key])
}
$('#templatesList').on('click','.inputListElement',function(e){
    $('.templatesContainer').text('').append(
        $('<div/>',{class:'templateContainer_loading'}),
        $('<div/>',{class:'templateContainer_loading'}),
        $('<div/>',{class:'templateContainer_loading'}),
        $('<div/>',{class:'templateContainer_loading'}),
    )
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getTemplates:$(this).attr('key'),
        },success:function(r){
            $('.templatesContainer').text('');
            window.templates = r.templates;
            window.templatesPages = Math.round(window.templates.length / 4);
            window.templatesPage = 1;
            drawTemplates(window.templatesPage);
        }
    })
})
drawTemplates = function(page){
    $('.templateImg').attr('src',null)
    $('.templateContainerArrow').addClass('templateContainerArrow_dump')
    setTimeout(()=>{
        $('.templatesContainer').text('')
        for(const key in window.templates){
            if((parseInt(key) + 1) <= (page*4) && (parseInt(key) + 1) > ((page * 4) - 4)){
                $('.templatesContainer').append(
                    $('<div/>',{
                        class:'templateContainer',
                        key:window.templates[key].id,
                    }).append(
                        $('<div/>',{class:'tempalteContainer_check ico-check0'}),
                        $('<div/>',{class:'templateContainer_btn templateContainer_pc ico-pc'}),
                        $('<div/>',{class:'templateContainer_btn templateContainer_mobile ico-mobile'}),
                        $('<img/>',{
                            class:'templateImg',
                            src:`/storage/imgs/templates/${window.templates[key].id}/preview.webp`
                        }),
                    ),
                )
            }
        }

        $('.templateContainerArrow').removeClass('templateContainerArrow_dump')
        if(window.templatesPages == 1){
            $('.templateContainerArrow[action="prev"]').addClass('templateContainerArrow_dump')
            $('.templateContainerArrow[action="next"]').addClass('templateContainerArrow_dump')
        }else if(page == 1){
            $('.templateContainerArrow[action="prev"]').addClass('templateContainerArrow_dump')
        }else if(page == window.templatesPages){
            $('.templateContainerArrow[action="next"]').addClass('templateContainerArrow_dump')
        }
    },300)

}
window.templatesPages = Math.round(window.templates.length / 4);
window.templatesPage = 1;
drawTemplates(window.templatesPage);

$('.templateContainerArrow').on('click',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('templateContainerArrow_dump')){return;}
    if($(this).attr('action') == 'next'){
        $('.templatesContainer').css('transition-duration','200ms')
        $('.templatesContainer').css('transform','translateX(-110%)')
        window.templatesPage = window.templatesPage + 1;
        drawTemplates(window.templatesPage);
        setTimeout(()=>{
            $('.templatesContainer').css('transition-duration','0ms')
            $('.templatesContainer').css('transform','translateX(110%)')
            setTimeout(()=>{
                $('.templatesContainer').css('transition-duration','200ms')
                $('.templatesContainer').css('transform','translateX(0)')
            },30)
        },220)
    }else if($(this).attr('action') == 'prev'){
        $('.templatesContainer').css('transition-duration','200ms')
        $('.templatesContainer').css('transform','translateX(110%)')
        window.templatesPage = window.templatesPage - 1;
        drawTemplates(window.templatesPage);
        setTimeout(()=>{
            $('.templatesContainer').css('transition-duration','0ms')
            $('.templatesContainer').css('transform','translateX(-110%)')
            setTimeout(()=>{
                $('.templatesContainer').css('transition-duration','200ms')
                $('.templatesContainer').css('transform','translateX(0)')
            },30)
        },200)
    }
})
$('.templatesContainer').on('swipeleft',function(e){
    // e.stopImmediatePropagation();
    console.log('left')
    $('.templateContainerArrow[action="next"').trigger('click');
});
$('.templatesContainer').on('swiperight',function(e){
    // e.stopImmediatePropagation();
    console.log('right')
    $('.templateContainerArrow[action="prev"').trigger('click');
});
$('html,body').on('click','.templateContainer',function(e){
    e.stopImmediatePropagation();
    if($('.templateContainer_btn:hover').length > 0){return;}
    $('.tempalteContainer_check').removeClass('ico-check1').addClass('ico-check0')
    $('.templateContainer').removeClass('templateContainer_selected');
    $(this).addClass('templateContainer_selected');
    $(this).find('.tempalteContainer_check').removeClass('ico-check0').addClass('ico-check1')
})

$('.tempaltePreview_icon[previewSize="mobile"]').on('click',function(e){
    e.stopImmediatePropagation();
    $('.tempaltePreview_icon[previewSize="pc"]').removeClass('none')
    $('.tempaltePreview_icon[previewSize="mobile"]').addClass('none')
    $('#tempaltePreview').addClass('tempaltePreview_mobile').removeClass('tempaltePreview_pc');
})
$('.tempaltePreview_icon[previewSize="pc"]').on('click',function(e){
    e.stopImmediatePropagation();
    $('.tempaltePreview_icon[previewSize="pc"]').addClass('none')
    $('.tempaltePreview_icon[previewSize="mobile"]').removeClass('none')
    $('#tempaltePreview').removeClass('tempaltePreview_mobile').addClass('tempaltePreview_pc');
})
$('.tempaltePreview_icon[previewSize="close"]').on('click',function(e){
    e.stopImmediatePropagation();
    $('#tempaltePreview').attr('src',`about:blank`)
    $('.tempaltePreviewContainer').addClass('tempaltePreviewContainer_hidden');
    setTimeout(()=>{$('.tempaltePreviewContainer').addClass('none')},500)
});
$('.tempaltePreviewContainer').on('click',function(e){
    if($('.tempaltePreview:hover').length > 0){return;}
    if($('.tempaltePreview_icons:hover').length > 0){return;}
    $('#tempaltePreview').attr('src',`about:blank`)
    $('.tempaltePreviewContainer').addClass('tempaltePreviewContainer_hidden');
    setTimeout(()=>{$('.tempaltePreviewContainer').addClass('none')},500)
})
$('html,body').on('click','.templateContainer_btn',function(e){
    e.stopImmediatePropagation();
    let templateId = $(this).closest('.templateContainer').attr('key');
    let template = window.templates.find(item=> item.id == templateId);
    if(typeof(template) === 'undefined'){return;}
    $('#tempaltePreview').attr('src',`${process.env.MIX_APP_URL_HTTP}${template.restaurantType}.${process.env.MIX_APP_DOMAIN}/${lang}/home?t=${template.id}`)
    setTimeout(()=>{
        if($(this).hasClass('templateContainer_mobile')){
            $('.tempaltePreview_icon[previewSize="pc"]').removeClass('none')
            $('.tempaltePreview_icon[previewSize="mobile"]').addClass('none')
            $('#tempaltePreview').addClass('tempaltePreview_mobile').removeClass('tempaltePreview_pc');
        }else if($(this).hasClass('templateContainer_pc')){
            $('.tempaltePreview_icon[previewSize="pc"]').addClass('none')
            $('.tempaltePreview_icon[previewSize="mobile"]').removeClass('none')
            $('#tempaltePreview').removeClass('tempaltePreview_mobile').addClass('tempaltePreview_pc');
        }
        $('.tempaltePreviewContainer').removeClass('none')
        setTimeout(()=>{$('.tempaltePreviewContainer').removeClass('tempaltePreviewContainer_hidden');},20)
    },100)
})
//
$('.langCard').on('click',function(e){
    $('.langCard').find('.langCardCheck').addClass('ico-check0').removeClass('ico-check1')
    $(this).find('.langCardCheck').addClass('ico-check1').removeClass('ico-check0')
})
///
let map;
let mapMarker;
drawMap = function(){
    map = L.map('restaurantLocationMap').setView([0,0],2);
    // setInterval(() => {
        map.invalidateSize();
    // }, 100);

    const mapIcon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
     });

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(map);

    mapMarker = L.marker([0,0],{icon: mapIcon});
    map.on('click',function(e){
        map.addLayer(mapMarker)
        mapMarker.setLatLng(e.latlng);
    });
    $('.currentLocationIcon').on('click',function(e){
        navigator.geolocation.getCurrentPosition(function(pos){
            map.flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
                animate: true,
                duration: 1
            });
            mapMarker.setLatLng([pos.coords.latitude,pos.coords.longitude]);
        });
        map.addLayer(mapMarker)
    })
}
/////
for(const key in window.plans){
    const plan = window.plans[key];
    let productOptionsTxt; let websiteLangsTxt; let promocodeTxt; let subAccountsTxt; let deliveryAccountsTxt; let specialDomainNameTxt; let bestSellerElem;
    plan.productOptions == 1 ? productOptionsTxt = plansTxt.productOption : productOptionsTxt = plansTxt.productOptions;
    plan.websiteLangs == 1 ? websiteLangsTxt = plansTxt.websiteLang : websiteLangsTxt = plansTxt.websiteLangs;
    plan.promocodes == 1 ? promocodeTxt = plansTxt.promocode : promocodeTxt = plansTxt.promocodes;
    plan.subAccounts == 1 ? subAccountsTxt = plansTxt.subAccount : subAccountsTxt = plansTxt.subAccounts;
    plan.deliveryAccounts == 1 ? deliveryAccountsTxt = plansTxt.deliveryAccount : deliveryAccountsTxt = plansTxt.deliveryAccounts;
    plan.specialDomainName ? specialDomainNameTxt = plansTxt.restaurantDotCom : specialDomainNameTxt = plansTxt.subdomain;
    plan.name == 'standard' ? bestSellerElem = $('<div/>',{class:'bestSellerElem',text:plansTxt.bestSeller}) : bestSellerElem = '';
    $('.plansCards').append(
        $('<div/>',{
            class:`planCard planCard-${plan.name}`,
            key:plan.name,
        }).append(
            bestSellerElem,
            $('<div/>',{class:'ico-check0 planCardCheck'}),
            $('<div/>',{class:'planCardHead '}).append(
                $('<div/>',{class:'bold fs103',text:plansTxt[plan.name]}),
                $('<div/>',{class:'bold fs103 planPerMonthPrice',text:`$${plan.monthlyCost}${plansTxt.perMonth}`}),
                $('<div/>',{class:'bold fs103 none planPerYearPrice',html:`$${plan.yearlyCost}${plansTxt.perYear} `}),
                $('<div/>',{class:'none planPerYearPrice cR bold',text:`${plansTxt.saveMonry} $${((plan.monthlyCost * 12) - plan.yearlyCost)}`})
                // $('<div/>',{class:'cO bold',text:'2 months Free Triel (Beta verison)'})
            ),
            $('<div/>',{class:'column alnS jstfyS p10 fs09 taS'}).append(
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-products fs101 mT-4 planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.products} ${plansTxt.products}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-categories planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.categories} ${plansTxt.categories}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-list fs085 planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.productOptions} ${productOptionsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-languages planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.websiteLangs} ${websiteLangsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-promo_codes planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.promocodes} ${promocodeTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-sub_accounts planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.subAccounts} ${subAccountsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-delivery_accounts planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.deliveryAccounts} ${deliveryAccountsTxt}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-images planCardItemsIcon'}),
                    $('<div/>',{text:`${plan.storage}${plansTxt.storage}`})
                ),
                $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                    $('<div/>',{class:'ico-link planCardItemsIcon'}),
                    $('<div/>',{text:`${specialDomainNameTxt}`})
                ),
                // $('<div/>',{class:'w100p row alnC jstfyS'}).append(
                //     $('<div/>',{class:'ico-categories mie-3'}),
                //     $('<div/>',{text:`${plan.categories} ${plansTxt.categories}`})
                // ),
                // $('<div/>',{text:`${plan.products} products`}),
                // $('<div/>',{text:`${plan.categories} ${planTxt.categories}`}),
                // $('<div/>',{text:`${plan.productOptions} options per product`}),
                // $('<div/>',{text:`${plan.websiteLangs} website languages`}),
                // $('<div/>',{text:`${plan.promocodes} promocodes`}),
                // $('<div/>',{text:`${plan.subAccounts} sub-accounts`}),
                // $('<div/>',{text:`${plan.deliveryAccounts} delivery accounts`}),
                // $('<div/>',{text:`${plan.storage}MB images storage`}),
                // $('<div/>',{text:`yourRestaurant.com`}),
            )
        )
    )
}
$('#billedYearly').on('click',function(){
    if($('#billedYearly').prop('checked')){
        $('.planPerMonthPrice').addClass('none');
        $('.planPerYearPrice').removeClass('none');
    }else{
        $('.planPerMonthPrice').removeClass('none');
        $('.planPerYearPrice').addClass('none');
    }
})
$('html,body').on('click','.planCard',function(e){
    e.stopImmediatePropagation();
    $('.planCard').removeClass('planCard_selected');
    $('.planCard').find('.planCardCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).addClass('planCard_selected');
    $(this).find('.planCardCheck').removeClass('ico-check0').addClass('ico-check1')
})
/////
$('#step2Btn').on('click',function(){
    clearErrors();
    showBtnLoading($('#step2Btn'));
    $('input').prop('disabled',true);
    $('textarea').prop('disabled',true);
    $('.checkboxlabel ').addClass('checkboxlabel_disabled')

    let domainName = $('#domainName').val();
    let country = $('#country').attr('key');
    let timeZone = $('#timeZone').attr('key');
    let hour12 = $('#timeZone-hour12').prop('checked');
    let websiteLang = $('.langCardCheck.ico-check1').closest('.langCard').attr('lang');
    let template = $('.tempalteContainer_check.ico-check1').closest('.templateContainer').attr('key');
    let restaurantName = $('#restaurantName').val();
    let restaurantDescription = $('#restaurantDescription').val();
    let currencySymbol = $('#currencySymbol').val();
    let restaurantPhoneNumber = $('#restaurantPhoneNumber').val();
    let restaurantAddress = $('#restaurantAddress').val();
    let lat = mapMarker.getLatLng().lat;
    let lng = mapMarker.getLatLng().lng;
    let useDelivery = $('#useDelivery').prop('checked');
    let usePickup = $('#usePickup').prop('checked');
    let dineinWorkingHours = $('#dineinWorkingHours').prop('checked');
    let guestOrders = $('#guestOrders').prop('checked');
    let cancelOrder = $('#cancelOrder').prop('checked');
    let productReviews = $('#productReviews').prop('checked');
    let guestReviews = $('#guestReviews').prop('checked');
    let liveChat = $('#liveChat').prop('checked');
    let guestLiveChat = $('#guestLiveChat').prop('checked');
    let plan = $('.planCardCheck.ico-check1').closest('.planCard').attr('key');
    let billedYearly = $('#billedYearly').prop('checked');
    hour12 == true ? hour12 = 1 : hour12 == false ? hour12 = 0 : null;
    billedYearly == true ? billedYearly = 1 : billedYearly == false ? billedYearly = 0 : null;
    useDelivery == true ? useDelivery = 1 : useDelivery == false ? useDelivery = 0 : null;
    usePickup == true ? usePickup = 1 : usePickup == false ? usePickup = 0 : null;
    dineinWorkingHours == true ? dineinWorkingHours = 1 : dineinWorkingHours == false ? dineinWorkingHours = 0 : null;
    guestOrders == true ? guestOrders = 1 : guestOrders == false ? guestOrders = 0 : null;
    cancelOrder == true ? cancelOrder = 1 : cancelOrder == false ? cancelOrder = 0 : null;
    productReviews == true ? productReviews = 1 : productReviews == false ? productReviews = 0 : null;
    guestReviews == true ? guestReviews = 1 : guestReviews == false ? guestReviews = 0 : null;
    liveChat == true ? liveChat = 1 : liveChat == false ? liveChat = 0 : null;
    guestLiveChat == true ? guestLiveChat = 1 : guestLiveChat == false ? guestLiveChat = 0 : null;
    if(typeof(template) === 'undefined'){template = null}
    if(typeof(plan) === 'undefined'){plan = null}
    $.ajax({
        url:'/doRegister',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            installWebsite:true,
            domainName:domainName,
            country:country,
            timeZone:timeZone,
            hour12:hour12,
            websiteLang:websiteLang,
            template:template,
            restaurantName:restaurantName,
            restaurantDescription:restaurantDescription,
            currencySymbol:currencySymbol,
            restaurantPhoneNumber:restaurantPhoneNumber,
            restaurantAddress:restaurantAddress,
            lat:lat,
            lng:lng,
            useDelivery:useDelivery,
            usePickup:usePickup,
            dineinWorkingHours:dineinWorkingHours,
            guestOrders:guestOrders,
            cancelOrder:cancelOrder,
            productReviews:productReviews,
            guestReviews:guestReviews,
            liveChat:liveChat,
            guestLiveChat:guestLiveChat,
            plan:plan,
            billedYearly:billedYearly,
        },success:function(r){
            hideBtnLoading($('#step2Btn'));
            $('input').prop('disabled',false);
            $('textarea').prop('disabled',false);
            $('.checkboxlabel ').removeClass('checkboxlabel_disabled')
            if(r.installWebsiteState == 0){
                if(r.errors.plan){
                    $('.plansCards').addClass('plansCards_error')
                    $('#plans_error').removeClass('vH').text(r.errors.plan[0]);
                    $('body,html').animate({'scrollTop':$('.plansCards').offset().top - 150},500)
                }
                if(r.errors.template){
                    $('.templatesContainer').parent().addClass('templatesContainer_error')
                    $('#template_error').removeClass('vH').text(r.errors.template[0]);
                    $('body,html').animate({'scrollTop':$('.templatesContainer').offset().top - 150},500)
                }
                if(r.errors.websiteLang){
                    $('.langCardsContainer').addClass('langCardsContainer_error')
                    $('#websiteLang_error').removeClass('vH').text(r.errors.websiteLang[0]);
                    $('body,html').animate({'scrollTop':$('.langCardsContainer').offset().top - 150},500)
                }
                if(r.errors.timeZone){
                    inputTextError($('#timeZone'));
                    $('#timeZone_error').removeClass('vH').text(r.errors.timeZone[0]);
                }
                if(r.errors.country){
                    inputTextError($('#country'));
                    $('#country_error').removeClass('vH').text(r.errors.country[0]);
                }
                if(r.errors.domainName){
                    inputTextError($('#domainName'));
                    $('#domainName_error').removeClass('vH').text(r.errors.domainName[0]);
                }
            }else if(r.installWebsiteState == 1){
                $('#step4WebsiteLink').attr('href',`${process.env.MIX_APP_URL_HTTP}${domainName}.${process.env.MIX_APP_DOMAIN}`)
                step3(true);
            }
        }
    })
})

