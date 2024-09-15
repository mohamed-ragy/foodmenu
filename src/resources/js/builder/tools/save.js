save = function(){
    if(!coolDownChecker()){return;}
    return new Promise(function(resolve,reject){
        $('.desktop_view').append(
            $('<div/>',{class:'saving_screen'}).append(
                $('<div/>',{class:'loading_L vV m10'}),
                $('<div/>',{text:texts.saving,class:'fs105'})
            )
        )
        let save_template = {
            settings:0,
            website_colors:0,
            page_setup:0,
            form_elements:0,
            website_header:0,
            popup_window:0,
            home:0,
            login_popup:0,
        }
        if(JSON.stringify(window.template.settings) != JSON.stringify(window.last_saved_template.settings)){
            save_template.settings = JSON.stringify(window.template.settings);
        }
        if(JSON.stringify(window.template.website_colors) != JSON.stringify(window.last_saved_template.website_colors)){
            save_template.website_colors = JSON.stringify(window.template.website_colors);
        }
        if(JSON.stringify(window.template.page_setup) != JSON.stringify(window.last_saved_template.page_setup)){
            save_template.page_setup = JSON.stringify(window.template.page_setup);
        }
        if(JSON.stringify(window.template.form_elements) != JSON.stringify(window.last_saved_template.form_elements)){
            save_template.form_elements = JSON.stringify(window.template.form_elements);
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
        if(JSON.stringify(window.template.login_popup) != JSON.stringify(window.last_saved_template.login_popup)){
            save_template.login_popup = JSON.stringify(window.template.login_popup);
        }
        $.ajax({
            url:'api',
            type:'post',
            data:{
                save_template:true,
                template_data:save_template,
                template_id:window.template._id,
            },success:function(r){
                $('.saving_screen').remove();
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
    showBtnLoading($('#save'))
    save().then(function(){
        hideBtnLoading($('#save'))
        is_saved_checker()
        showAlert('success',texts.responses.templateSaved,4000,true);
    })
})