window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
$.ajaxSetup({
    headers: {
        'X-Csrf-Token':$('meta[name="csrf-token"]').attr('content'),
    },
});
require('../page_loading.js')
require('./selectors.js');
require('./key_tree.js');

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
require('../builder/tools/save.js');


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
        // preview_language:params.get('preview_language'),
        template_id:params.get('template_id'),
    },success:function(r){
        process_data(r);
    }
})

$('body').on('click',function(e){
    if($('#clr-picker:hover').length > 0){return;}
    hide_website_pages_menu();
    hide_website_style_menu();
    hide_website_tools_menu();
    hide_show_preview_languages_menu();
    hidePopupSelectors();
})
$(window).resize(function(){
    $(':root').css('--screen_height',`calc(${$('body').outerHeight()}px - ${$('header').outerHeight()}px - ${$('.website_header').outerHeight()}px)`)
    fix_header_nav_list();
})
window.addEventListener("beforeunload", function (e) {
    if(!is_saved_checker()){
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    }
});

$('body').on('keydown',function(e){

    if(e.shiftKey && e.ctrlKey && e.which == 90){
        // e.stopImmediatePropagation();
        e.preventDefault();
        redo();
    }
    else if(e.ctrlKey && e.which == 90){
        // e.stopImmediatePropagation();
        e.preventDefault();
        undo();
    }
    else if(e.altKey && e.which == 88){
        // e.stopImmediatePropagation();
        view_toggle()
    }
    else if(e.ctrlKey && e.which == 83){
        // e.stopImmediatePropagation();
        e.preventDefault();
        if(!is_saved_checker()){
            $('#save').trigger('click')
        }
    }else if(
        e.ctrlKey && e.which == 49 ||
        e.ctrlKey && e.which == 50 ||
        e.ctrlKey && e.which == 51 ||
        e.ctrlKey && e.which == 52 ||
        e.ctrlKey && e.which == 53 ||
        e.ctrlKey && e.which == 54 ||
        e.ctrlKey && e.which == 55 ||
        e.ctrlKey && e.which == 56 ||
        e.ctrlKey && e.which == 57
    ){
        e.preventDefault();
        try{
            window.preview_language = Object.keys(window.website_data.languages)[e.which - 49];
            $('.showWebsitePreviewLangs').children().first().text(window.website_data.languages[window.preview_language].name)
            window.history.pushState({},'',`/?template_id=${window.template_id}&preview_language=${window.preview_language}`)
            set_website_variable_data()
            undo_redo_actions();
        }catch{}

    }

    if(e.altKey){
        // e.stopImmediatePropagation();
        e.preventDefault();
    }
    if(e.altKey && e.which == 83){
        // e.stopImmediatePropagation();
        set_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        // e.stopImmediatePropagation();
        heighlight_all();
    }


})
$('body').on('keyup',function(e){
    // e.stopImmediatePropagation();
    if(e.altKey && e.which == 83){
        unset_preview_mode();
    }
    else if(e.altKey  && e.which == 65){
        deheighlight_all();
    }

});

///
$('body').on('click','a',function(e){
    e.preventDefault();
})
//
document.execCommand = function(command, showUI, value) {
    throw new Error("execCommand is disabled");
};
