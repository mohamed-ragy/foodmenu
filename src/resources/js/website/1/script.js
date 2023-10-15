window.$ = require("jquery");

$(':root').css('--vh',$(window).innerHeight()+'px' );
$(window).resize(()=>{
    $(':root').css('--vh',$(window).innerHeight()+'px' );
})

switchPage = (page,callback=()=>{}) => {
    $('#body').animate({'opacity':0},300);
    setTimeout(()=>{
        $('#body').scrollTop(0);
        $('.page').addClass('none');
        page.removeClass('none');
        $('#body').animate({'opacity':1},600);
    },400)
    callback();
}
currentPage = () => {
    $('#body').animate({'scrollTop':'0'},200)
}
rtlFix = () => {
    $('#popupClose').css({'right':'unset','left':'.7em'});
    $('.ic-send ').css('transform','rotateZ(180deg)')
    $('.profileMapBtnsContainer').css('align-self','flex-start')
    $('.navCart').addClass('navCart_rtl');
    $('.navCartItemsNumber').addClass('navCartItemsNumber_rtl');
    $('.galleryFullScreenArrowRight').removeClass('ic-right').addClass('ic-left');
    $('.galleryFullScreenArrowLeft').removeClass('ic-left').addClass('ic-right');

}
iosFix = () => {
    $('.section1').css('background-attachment','unset')
    $('.topRatedProduct').css('background-attachment','unset')
    $('.trendingProduct').css('background-attachment','unset')
    // $('.ourStoryContainer').css('background-attachment','unset')
}

hideLoadingScreen = () =>{
    setTimeout(() => {
        $('#body').scrollTop(0)
        $('#websiteLoading').animate({'opacity':'0'},500);
        $('#body').animate({'opacity':'1'},500);
        // $('body').css('overflow-y','visible')
        // $('html, body').css('overflow-y','visible')
        setTimeout(() => {
            $('#websiteLoading').hide();
            collectReviews();
        },500);
    }, 500);
}
require('../script.js');
require("./order.js");
require("./loading.js");
require("./colors.js");
require("./popup.js");
require("./liveChat.js");
require("./lang.js");
require("./aboutus.js");
require("./nav.js");
require("./footer.js")
require("./announcement.js");
require("./productCard.js");

require("./profile.js");
require("./allProducts.js");
require("./category.js");
require("./product.js");
require("./homePage.js");
if(website.fastLoading == true){
    showFirstPage();
}

$(document).ready(() =>{
    if(website.fastLoading == false){
        hideLoadingScreen();
        showFirstPage();
    }
})


// wrting review
// var status = {
//     'status' :'user_writeReview',
//     'productName':$(this).parent().attr('productName'),
// };
// userStatus(status)

// change language
// var status = {
//     'status' :'user_changeLang',
// };
// userStatus(status);

// placeorder
// var status = {
//     'status': 'user_placeOrder',
// }
// userStatus(status);

//orderhistory
// var status = {
//     'status': 'user_checkOrderHistory',
// }
// userStatus(status);

///track order
// var status = {
//     'status': 'user_trackOrder',
//     'orderNumber':order.id,
// }
// userStatus(status);
