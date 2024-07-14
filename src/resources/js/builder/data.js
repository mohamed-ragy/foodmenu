hash = function() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 20) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return `_${result}`;
}
small_hash = function(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return `_${result}`;
}
require('./data/colors.js')
// require('./data/fonts.js')
require('./data/links.js')
require('./data/headers.js')
require('./data/home_page_sections.js')
// require('./data/titles.js')

require('./data/default_styling.js')
require('./data/page_transitions.js')
require('./data/animations.js')
require('./data/scroll_animations.js')
require('./data/drivers.js')
require('./data/icons.js')
require('./data/input_list_arrays.js')
require('./data/box_shadows.js')
require('./data/buttons.js')

