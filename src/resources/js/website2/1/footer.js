drawFooterPhoneNumbers = (phoneNumber) => {
    return $('<div/>',{class:'m-5 fs-08 phoneNumberCall pointer',text:phoneNumber,phoneNumber:phoneNumber})
}
drawFooterAddress  = (address) => {
    return $('<div/>',{class:'m-5 fs-08',text:address})
}
drawFooterRestaurantEmail = (email) => {
    return $('<div/>',{class:'m-5 fs-08',text:email})
}
$('.footerLangFlag').attr('src',website.LanguageFlag)
$('.footerLangName').text(website.LanguageName)
