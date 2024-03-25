window.$ = require("jquery");
$(':root').css('--vh',($(window).innerHeight() - 70)+'px');
$(window).resize(()=>{
    $(':root').css('--vh',($(window).innerHeight() - 70)+'px');
})
switchPage = (page,callback=()=>{}) => {
    $('#body').animate({'opacity':0},300);
    setTimeout(()=>{
        $('.page').addClass('none');
        $('#body').scrollTop(0);
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
    let leftArrow = $('.productListArrowLeft');
    let rightArrow = $('.productListArrowRight')
    leftArrow.removeClass('ic-left productListArrowLeft').addClass('ic-right productListArrowRight')
    rightArrow.addClass('ic-left productListArrowLeft').removeClass('ic-right productListArrowRight')
    $('.promocodeCode').removeClass('promocodeCode').addClass('promocodeCode_rtl')
    $('.promocodeApplyBtn').removeClass('promocodeApplyBtn').addClass('promocodeApplyBtn_rtl')

}
iosFix = () => {
    $('.customersReviewsSection').css('background-attachment','unset')
    $('.infoImg').css('background-attachment','unset')
    $('.ourStoryContainer').css('background-attachment','unset')
}

hideLoadingScreen = () =>{
    setTimeout(() => {
        $('#body').scrollTop(0)
        $('#websiteLoading').animate({'opacity':'0'},500);
        $('#body').animate({'opacity':'1'},500);
        // $('html, body').css('overflow-y','visible')
        setTimeout(() => {
            $('#websiteLoading').hide();
            collectReviews();
        },500);
    }, 500);
}


require('../script.js');
require("./order.js");//done
require("./loading.js");//done
require("./colors.js");//in prograss
require("./popup.js"); //done
require("./liveChat.js"); //done
require("./lang.js");//done
require("./aboutus.js"); //done
require("./nav.js"); //done
require("./footer.js") //done
require("./announcement.js"); //done
require("./productCard.js");  //done

require("./profile.js"); //done
require("./allProducts.js"); //done
require("./category.js"); //done
require("./product.js"); // done
require("./homePage.js"); //done
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
