window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
$.ajaxSetup({
    headers: {
        'X-Csrf-Token':$('meta[name="csrf-token"]').attr('content'),
    },
});
require('../page_loading.js')
require('./elem_data.js');
require('./editors.js');
require('./key_tree.js');

require('../builder/data.js');

require('../builder/process_data.js');
require('../builder/set_template_vars.js');
require('../builder/undo_redo.js');
require('../builder/general_events.js');

require('../cpanel/tools/loading.js');
require('../cpanel/functions/coolDown.js');



require('../builder/tools/alerts.js');
require('../builder/tools/tooltip.js');
require('../builder/tools/popup.js');
require('../builder/tools/is_saved_checker.js');
require('../builder/tools/save.js');
require('./tools/select.js')
require('./tools/contextMenu.js')
require('./tools/copy.js')

require('./editor_popup/editor_popup.js');
require('./editor_popup/editor.js');

require('./website_style.js')

require('./website_tools.js')


require('./pages.js')

require('./draw_builder.js')
require('./select_template.js')

require('./pages/home.js')


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
