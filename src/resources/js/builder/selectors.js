require('./selectors/select_box.js')
require('./selectors/color_theme_picker.js')
require('./selectors/inputList.js')
require('./selectors/border_radius_selector.js')
require('./selectors/color_selector.js')
require('./selectors/color_selector_no_var.js')
require('./selectors/switch_btn.js')
require('./selectors/img_browser.js')

hidePopupSelectors = function(){
    $('.color_theme_picker_themes').addClass('none')
    $('.inputList_elems').addClass('none')
    $('.border_radius_select_elems').addClass('none')
    $('.color_selector_palette_colors').addClass('none')
}
