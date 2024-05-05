save = function(){
    if(!coolDownChecker()){return;}
    return new Promise(function(resolve,reject){
        let save_template = {
            settings:0,
            website_colors:0,
            font_style:0,
            page_setup:0,
            form_elements:0,
            loading_spinner:0,
            website_header:0,
            popup_window:0,
            home:0,
        }
        if(JSON.stringify(window.template.settings) != JSON.stringify(window.last_saved_template.settings)){
            save_template.settings = JSON.stringify(window.template.settings);
        }
        if(JSON.stringify(window.template.website_colors) != JSON.stringify(window.last_saved_template.website_colors)){
            save_template.website_colors = JSON.stringify(window.template.website_colors);
        }
        if(JSON.stringify(window.template.font_style) != JSON.stringify(window.last_saved_template.font_style)){
            save_template.font_style = JSON.stringify(window.template.font_style);
        }
        if(JSON.stringify(window.template.page_setup) != JSON.stringify(window.last_saved_template.page_setup)){
            save_template.page_setup = JSON.stringify(window.template.page_setup);
        }
        if(JSON.stringify(window.template.form_elements) != JSON.stringify(window.last_saved_template.form_elements)){
            save_template.form_elements = JSON.stringify(window.template.form_elements);
        }
        if(JSON.stringify(window.template.loading_spinner) != JSON.stringify(window.last_saved_template.loading_spinner)){
            save_template.loading_spinner = JSON.stringify(window.template.loading_spinner);
        }
        if(JSON.stringify(window.template.website_header) != JSON.stringify(window.last_saved_template.website_header)){
            save_template.website_header = JSON.stringify(window.template.website_header);
        }
        if(JSON.stringify(window.template.popup_window) != JSON.stringify(window.last_saved_template.popup_window)){
            save_template.popup_window = JSON.stringify(window.template.popup_window);
        }
        if(JSON.stringify(window.template.home) != JSON.stringify(window.last_saved_template.home)){
            save_template.home = JSON.stringify(window.template.home);
        }
        $.ajax({
            url:'api',
            type:'post',
            data:{
                save_template:true,
                template_data:save_template,
                template_id:window.template._id,
            },success:function(r){
                if(r.save_template_state == 1){
                    window.last_saved_template = JSON.parse(JSON.stringify(window.template));
                    for(const key in window.templates){
                        if(window.templates[key]._id == window.template._id){
                            for(const key2 in save_template){
                                window.templates[key][key2] = JSON.stringify(window.template[key2])
                            }
                        }
                    }

                    is_saved_checker()
                    resolve();
                }else if(r.save_template_state == 0){
                    showAlert('error',texts.responses.tempalteSaveFail,4000,true);
                    reject();
                }
            }
        })

    });

}
$('body').on('click','#save',function(e){
    //e.stopImmediatePropagation();

    showBtnLoading($('#save'))
    save().then(function(){
        hideBtnLoading($('#save'))
        is_saved_checker()
        showAlert('success',texts.responses.templateSaved,4000,true);
    })
})

// setInterval(()=>{
//     // if(!is_saved_checker()){
//     //     save();
//     // }
//     console.log(Object.keys(flattenObject(get_template_changes(window.template,window.last_saved_template,[]))).length)
//     if(Object.keys(flattenObject(get_template_changes(window.template,window.last_saved_template,[]))).length > 500){
//         save();
//         is_saved_checker()
//     }
// },1000)
