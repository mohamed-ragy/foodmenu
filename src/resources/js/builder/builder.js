window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
$.ajaxSetup({
    headers: {
        'X-Csrf-Token':$('meta[name="csrf-token"]').attr('content'),
    },
});

require('../page_loading.js')
require('./select_template.js')
require('./process_data.js');
require('./set_template_vars.js');
require('./general_events.js');
require('./draw_builder.js')
require('./elem_data.js');
require('./undo_redo.js');

require('../cpanel/tools/loading.js');
require('../cpanel/functions/coolDown.js');

require('./editors.js');
require('./editors2.js');
require('./data.js');


require('./tools/alerts.js');
require('./tools/tooltip.js');
require('./tools/popup.js');
require('./tools/is_saved_checker.js');
require('./tools/save.js');
require('./tools/select.js')
require('./tools/contextMenu.js')
require('./tools/copy.js')
require('./tools/accessibility_check.js')

require('./editor_popup/editor_popup.js');
require('./editor_popup/editor.js');

require('./website_style.js')/////
require('./website_tools.js')/////


require('./pages.js')
require('./generate_html.js')





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
