diffTimeArr = {
    before:texts.other.before,
    after:texts.other.after,
    lessThanMin:texts.other.lessThanMin,
    min:texts.other.min,
    mins:texts.other.mins,
    hour:texts.other.hour,
    hours:texts.other.hours,
    day:texts.other.day,
    days:texts.other.days,
    month:texts.other.month,
    months:texts.other.months,
    year:texts.other.year,
    years:texts.other.years,
}

showTexts = () => {
    $('[showtext]').each((i,elem) => {
        $(elem).text(texts[$(elem).attr('showtext').split('.')[0]][$(elem).attr('showtext').split('.')[1]])
    });
    $('[showPlaceholder]').each((i,elem) => {
        $(elem).attr('placeholder',texts[$(elem).attr('showPlaceholder').split('.')[0]][$(elem).attr('showPlaceholder').split('.')[1]])
    })
    $('[Showtooltip]').each((i,elem) =>{
        $(elem).attr('tooltip',texts[$(elem).attr('Showtooltip').split('.')[0]][$(elem).attr('Showtooltip').split('.')[1]])
    });

    $('.introTitle').text(website.introTitle)
    $('.introDescription').text(website.introDescription)
    if(website.ourStoryTitle == '' && website.ourStoryDescription == ''){
        $('.ourStorySection').hide();
    }else{
        $('.ourStoryTitle').text(website.ourStoryTitle)
        $('.ourStoryDescription').text(website.ourStoryDescription)
    }


    if(website.infoTitle == '' && website.infoDescription == ''){
        $('.infoSection').hide();
    }else{
        $('.infoTitle').text(website.infoTitle)
        $('.infoDescription').text(website.infoDescription)
    }

    $('.category').each((i,elem) => {
        let category = categories.find(item => item.id == $(elem).attr('categoryId'))
        try{
            $(elem).text(category.nameLang)
        }catch{}
    })

    for(const key in categories){
        $(`.category[categoryId="${categories[key].id}"]`).text(categories[key].nameLang);
        $(`.categoryDes[categoryId="${categories[key].id}"]`).text(categories[key].descriptionLang);
        $(`.categoryImg[categoryId="${categories[key].id}"]`).attr('src',categories[key].imgUrl);
        $(`.categoryLink[categoryId="${categories[key].id}"]`).attr('href',categories[key].link);
    }
    for(const key in products){
        $(`.product[productId="${products[key].id}"]`).text(products[key].nameLang);
        $(`.productDes[productId="${products[key].id}"]`).text(products[key].descriptionLang);
        $(`.productImg[productId="${products[key].id}"]`).attr('src',products[key].imgUrl);
        $(`.productLink[productId="${products[key].id}"]`).attr('href',products[key].link);
    }

    $('.restaurantName').text(website.restaurantName)
    $('.userName').text(user.name.split(' ')[0])
    $('#copyRightsNotice').text(`© ${getDateAndTime(website.created_at,'onlyYear')} ${website.restaurantName}.`)
    $('.privacyPolicyContent').html(website.privacyPolicy)


    if(!website.liveChat){
        $('.productToChat').hide();
    }
}
setLinks = function(elem=null){

    !website.facebookLink ? $('[soIcon="facebook"]').addClass('none') : $('[soIcon="facebook"]').prop('href',website.facebookLink).removeClass('none');
    !website.youtubeLink ? $('[soIcon="youtube"]').addClass('none') : $('[soIcon="youtube"]').prop('href',website.youtubeLink).removeClass('none');
    !website.linkedinLink ? $('[soIcon="linkedin"]').addClass('none') : $('[soIcon="linkedin"]').prop('href',website.linkedinLink).removeClass('none');
    !website.twitterLink ? $('[soIcon="twitter"]').addClass('none') : $('[soIcon="twitter"]').prop('href',website.twitterLink).removeClass('none');
    !website.instagramLink ? $('[soIcon="instagram"]').addClass('none') : $('[soIcon="instagram"]').prop('href',website.instagramLink).removeClass('none');

    $('.home').prop('href',`/${urlLang}/home`);
    $('.allProducts').prop('href',`/${urlLang}/allproducts`);
    $('.privacyPolicy').prop('href',`/${urlLang}/privacypolicy`);
    $('.aboutus').prop('href',`/${urlLang}/aboutus`);
    $('.profile, .changeEmail, .changePassword, .orderHistory').prop('href',`/${urlLang}/profile`);

    website.phoneNumbers.length == 0 ? $('.restaurantPhoneNumbers').addClass('none') : null;
    website.address == null || website.address == '' ? $('.restaurantAddress').addClass('none') : null
    website.restaurantEmail == null || website.restaurantEmail == ''?  $('.restaurantEmail').addClass('none') : null

    for(const key in categories){
        $(`.categoryLink[categoryId="${categories[key].id}"]`).prop('href',`/${urlLang}/${categories[key].name}`);
    }
    for(const key in products){
        $(`.productLink[productId="${products[key].id}"]`).prop('href',`/${urlLang}/${products[key].catName}/${products[key].name}`);
    }

    $('.trending').attr('href',`/${urlLang}/allproducts?tag=trending`)
    $('.popular').attr('href',`/${urlLang}/allproducts?tag=popular`)
    $('.topRated').attr('href',`/${urlLang}/allproducts?tag=topRated`)
    $('.new').attr('href',`/${urlLang}/allproducts?tag=new`)

}


rtl = () => {
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('#liveChat').css({right:'unset',left:'0px'})
        rtlFix();
    }
}
privacyPolicy = () => {
    if(website.privacyPolicy == '' || website.privacyPolicy == null){
        $('.privacyPolicy').addClass('none');
        $('.privacyPolicyHideShow').addClass('none');
    }
}
fixAllTexts = () => {

    showTexts();
    setLinks();
    // enToarNumbers();
    rtl();
    privacyPolicy();
}
