window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
const { post } = require("jquery");
loadTouchEvents($);
window.Cookies = require('js-cookie');
require("../cpanel/tools/loading.js")
// require("../cpanel/form/inputList.js")
require("../cpanel/tools/form/textArea.js")
require('./nav.js')


$('.clearVal').on('click',function(){
    if($(this).closest('.inputTextContainer').find('.inputText').prop('disabled')){return}
    $(this).closest('.inputTextContainer').find('.inputText').val('')
})
$('.passwordShowHide').on('click',function(){
    if($(this).hasClass('ico-showPassword')){
        $(this).removeClass('ico-showPassword').addClass('ico-hidePassword');
        $(this).closest('.inputTextContainer').find('.inputText').prop('type','text');
    }else if($(this).hasClass('ico-hidePassword')){
        $(this).removeClass('ico-hidePassword').addClass('ico-showPassword');
        $(this).closest('.inputTextContainer').find('.inputText').prop('type','password');
    }
})



// $('html,body').on('focus','.inputText',function(e){
//     e.stopImmediatePropagation();
//     $(this).parent().find('.inputTextIcon').addClass('cG').removeClass('cR cO');
//     $(this).closest('.inputTextContainer').removeClass('inputTextContainer_error')
//     $(this).closest('.inputTextContainer_C').find('.inputTxtError').text('');
// })
// $('html,body').on('focusout','.inputText',function(e){
//     e.stopImmediatePropagation();
//     $(this).parent().find('.inputTextIcon').removeClass('cR cO cG');
//     $(this).closest('.inputTextContainer').removeClass('inputTextContainer_error')
//     $(this).closest('.inputTextContainer_C').find('.inputTxtError').text('');
// })
