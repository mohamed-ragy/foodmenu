get_inputList_obj = function(key){
    switch(key){
        case 'background_blend_mode':
            return [
                {name:'normal',val:'normal',class:''},
                {name:'color',val:'color',class:''},
                {name:'color-burn',val:'color-burn',class:''},
                {name:'color-dodge',val:'color-dodge',class:''},
                {name:'darken',val:'darken',class:''},
                {name:'difference',val:'difference',class:''},
                {name:'exclusion',val:'exclusion',class:''},
                {name:'hard-light',val:'hard-light',class:''},
                {name:'hue',val:'hue',class:''},
                {name:'lighten',val:'lighten',class:''},
                {name:'luminosity',val:'luminosity',class:''},
                {name:'multiply',val:'multiply',class:''},
                {name:'overlay',val:'overlay',class:''},
                {name:'saturation',val:'saturation',class:''},
                {name:'screen',val:'screen',class:''},
                {name:'soft-light',val:'soft-light',class:''},
            ]
        break;
        case 'pageTransition':
            return [
                {name:texts.select_elems._fade,val:'fade',class:''},
                {name:texts.select_elems._slide_up_down,val:'slide_up_down',class:''},
                {name:texts.select_elems._slide_up_up,val:'slide_up_up',class:''},
                {name:texts.select_elems._slide_down_up,val:'slide_down_up',class:''},
                {name:texts.select_elems._slide_down_down,val:'slide_down_down',class:''},
                {name:texts.select_elems._slide_left_right,val:'slide_left_right',class:''},
                {name:texts.select_elems._slide_left_left,val:'slide_left_left',class:''},
                {name:texts.select_elems._slide_right_left,val:'slide_right_left',class:''},
                {name:texts.select_elems._slide_right_right,val:'slide_right_right',class:''},
            ]
        break;
        case 'transitions':
            return [
                {name:texts.select_elems._no_animation,val:'no_animation',class:''},
                {name:texts.select_elems._fade,val:'fade',class:''},
                {name:texts.select_elems._zoom,val:'zoom',class:''},
                {name:texts.select_elems._slide_up,val:'slide_up',class:''},
                {name:texts.select_elems._slide_down,val:'slide_down',class:''},
                {name:texts.select_elems._slide_left,val:'slide_left',class:''},
                {name:texts.select_elems._slide_right,val:'slide_right',class:''},
            ]
        break;
    }
}