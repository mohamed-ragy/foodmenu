drawFooterPhoneNumbers = (phoneNumber) => {
    return $('<div/>',{class:'m-10 phoneNumberCall pointer',text:phoneNumber,phoneNumber:phoneNumber})
}
drawFooterAddress  = (address) => {
    return $('<div/>',{class:'m-10',text:address})
}
drawFooterRestaurantEmail = (email) => {
    return $('<div/>',{class:'m-10',text:email})
}
$('.footerLangFlag').attr('src',website.LanguageFlag)
$('.footerLangName').text(website.LanguageName)
$('.footerLinksContainerCats').children().last().remove();
