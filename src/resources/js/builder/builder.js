window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
require('../page_loading.js')
require('./selectors.js');

require('../builder/data.js');
require('../builder/process_data.js');
require('../builder/set_template_vars.js');
require('../builder/undo_redo.js');

require('../cpanel/tools/loading.js');
require('../cpanel/functions/coolDown.js');

require('../builder/tools/alerts.js');
require('../builder/tools/tooltip.js');
require('../builder/tools/popup.js');
require('../builder/tools/editor_popup.js');
require('../builder/tools/is_saved_checker.js');


require('./website_style.js')

require('./website_tools.js')

require('./pages.js')

require('./draw_builder.js')
require('./select_template.js')


let params = new URLSearchParams(window.location.search)
window.template_id = params.get('template_id')
window.preview_language = params.get('preview_language')
$.ajax({
    url:'api',
    type:'post',
    data:{
        _token:$('meta[name="csrf-token"]').attr('content'),
        getData:true,
        preview_language:params.get('preview_language'),
        template_id:params.get('template_id'),
    },success:function(r){
        process_data(r);
    }
})

$('html,body').on('click',function(e){
    hide_website_pages_menu();
    hide_website_style_menu();
    hide_website_tools_menu();
    $('.editor_popup').addClass('editor_popup_dump')
    hidePopupSelectors();

})
$(window).resize(function(){
    $(':root').css('--screen_height',`${$('#page').outerHeight()}px`)
})
window.addEventListener("beforeunload", function (e) {
    if(!is_saved_checker()){
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    }
  });

$('html,body').on('keydown',function(e){
    if(e.shiftKey && e.ctrlKey && e.which == 90){
        e.stopImmediatePropagation();
        redo();
    }
    else if(e.ctrlKey && e.which == 90){
        e.stopImmediatePropagation();
        undo();
    }
    else if(e.ctrlKey && e.which == 88){
        e.stopImmediatePropagation();
        view_toggle()
    }
    else if(e.ctrlKey && e.which == 83){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!is_saved_checker()){
            $('#save').trigger('click')
        }
    }
    if(e.altKey){
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    if(e.altKey && e.which == 83){
        e.stopImmediatePropagation();
        set_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        e.stopImmediatePropagation();
        heighlight_all();
    }


})
$('html,body').on('keyup',function(e){
    e.stopImmediatePropagation();
    if(e.altKey && e.which == 83){
        unset_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        deheighlight_all();
    }


});
save = function(){
    if(!coolDownChecker()){return;}
    return new Promise(function(resolve,reject){
        let save_template = JSON.parse(JSON.stringify(window.template))
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                save_template:true,
                template:save_template,
            },success:function(r){
                // process_data(r);
                if(r.save_template_state == 1){
                    window.last_saved_template = JSON.parse(JSON.stringify(save_template))
                    resolve();
                }else if(r.save_template_state == 0){
                    showAlert('error',texts.responses.tempalteSaveFail,4000,true);
                    reject();
                }
            }
        })

    });

}
$('html,body').on('click','#save',function(e){
    e.stopImmediatePropagation();

    showBtnLoading($('#save'))
    save().then(function(){
        hideBtnLoading($('#save'))
        if(is_saved_checker()){
            $('#save').prop('disabled',true)
        }else{
            $('#save').prop('disabled',false)
        }
        showAlert('success',texts.responses.templateSaved,4000,true);
    })
})
///
