get_timing_functions = function(){
    return [
        {name:'linear',val:'linear',class:''},
    
        {name:'ease_in_sine',val:'cubic-bezier(0.47,0,0.75,0.72)',class:''},
        {name:'ease_out_sine',val:'cubic-bezier(0.39,0.57,0.56,1)',class:''},
        {name:'ease_in_out_sine',val:'cubic-bezier(0.45,0.05,0.55,0.95)',class:''},
    
        {name:'ease_in_quad',val:'cubic-bezier(0.55,0.08,0.68,0.53)',class:''},
        {name:'ease_out_quad',val:'cubic-bezier(0.25,0.46,0.45,0.94)',class:''},
        {name:'ease_in_out_quad',val:'cubic-bezier(0.46,0.03,0.52,0.96)',class:''},
    
        {name:'ease_in_cubic',val:'cubic-bezier(0.55,0.06,0.68,0.19)',class:''},
        {name:'ease_out_cubic',val:'cubic-bezier(0.22,0.61,0.36,1)',class:''},
        {name:'ease_in_out_cubic',val:'cubic-bezier(0.65,0.05,0.36,1)',class:''},
    
        {name:'ease_in_quart',val:'cubic-bezier(0.9,0.03,0.69,0.22)',class:''},
        {name:'ease_out_quart',val:'cubic-bezier(0.17,0.84,0.44,1)',class:''},
        {name:'ease_in_out_quart',val:'cubic-bezier(0.77,0,0.18,1)',class:''},
    
        {name:'ease_in_quint',val:'cubic-bezier(0.76,0.05,0.86,0.06)',class:''},
        {name:'ease_out_quint',val:'cubic-bezier(0.23,1,0.32,1)',class:''},
        {name:'ease_in_out_quint',val:'cubic-bezier(0.86,0,0.07,1)',class:''},
    
        {name:'ease_in_expo',val:'cubic-bezier(0.95,0.05,0.8,0.04)',class:''},
        {name:'ease_out_expo',val:'cubic-bezier(0.19,1,0.22,1)',class:''},
        {name:'ease_in_out_expo',val:'cubic-bezier(1,0,0,1)',class:''},
    
        {name:'ease_in_circ',val:'cubic-bezier(0.6,0.04,0.98,0.34)',class:''},
        {name:'ease_out_circ',val:'cubic-bezier(0.08,0.82,0.17,1)',class:''},
        {name:'ease_in_out_circ',val:'cubic-bezier(0.79,0.14,0.15,0.86)',class:''},
    
        {name:'ease_in_back',val:'cubic-bezier(0.6,-0.28,0.74,0.05)',class:''},
        {name:'ease_out_back',val:'cubic-bezier(0.18,0.89,0.32,1.27)',class:''},
        {name:'ease_in_out_back',val:'cubic-bezier(0.68,-0.55,0.27,1.55)',class:''},
    
    ]    
}

let timing_functions = get_timing_functions();
get_timing_function = function(timing_function){
    return timing_functions.find(item=> item.name == timing_function).val;
}