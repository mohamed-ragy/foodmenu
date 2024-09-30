draw_website_domain_page = function(){
    if(!account.is_master){return;}
    $('.website_domain_container').text('').append(
        $('<div/>',{class:'relative m50 mxw200'}).append(
            $('<div/>',{class:'loading_L vV'})
        )
    )
    if(website.user_domainName === null){

        draw_website_add_domain_page();

    }else if(website.user_domainName !== website.url){
        if(website.user_domainName_data === undefined){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    get_user_domainName_data:true,
                },success:function(r){
                    website.user_domainName_data = r.user_domainName_data;
                    draw_website_add_domain_nameservers_page();
                }
            })
        }else{
            draw_website_add_domain_nameservers_page();
        }

    }
}
draw_website_add_domain_page = function(){
    $('.website_domain_container').text('').append(
        $('<div/>',{class:'wFC mxw400'}).append(
            $('<div/>',{class:'msgBox_green'}).append(
                $('<span/>',{class:'ico-info fs2 mB10'}),
                $('<span/>',{class:'fs09 taC',html:texts.settings.website_domain_des})
            ),
        ),
        $('<div/>',{class:'mX20 wFC'}).append(
            drawInputText('','ico-link','',texts.settings.website_domain,'add_user_domain_input','text',texts.settings.website_domain,100,'clearVal','','',false,''),
            $('<div/>',{class:'btnContainer mT20'}).append(
                $('<button/>',{id:'add_user_domain_btn',class:'btn '}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.settings.add_domain})
                )
            )
        )
    )
}

draw_website_add_domain_nameservers_page = function(){
    if(website.user_domainName_data.status === 'active'){
        draw_website_user_domain_active();
        return;
    }else if(website.user_domainName_data.status !== 'pending'){
        draw_website_domain_error();
    }
    let nameservers = website.user_domainName_data.name_servers;
    let nameservers_list = $('<ul/>',{class:'pis-30 alnsS'});
    for(const key in nameservers){
        nameservers_list.append(
            $('<li/>',{style:'user-select:text;',class:'bold600',text:nameservers[key]}),
        )
    }
    $('.website_domain_container').text('').append(
        $('<div/>',{class:'wFC mxw400'}).append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'fs09 taS',html:texts.settings.domain_pending_nameservers_1}),
                nameservers_list,
                $('<span/>',{class:'fs09 taS',html:texts.settings.domain_pending_nameservers_2}),
            ),
            $('<div/>',{class:'mX20 wFC'}).append(
                drawInputText('','ico-link','',texts.settings.website_domain,'add_user_domain_input','text',texts.settings.website_domain,100,'copy','',website.user_domainName,true,''),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{id:'delete_user_domainName_btn',class:'btn btn-delete'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.settings.remove_domain})
                    )
                )
            )
        ),
    )
}


//
draw_website_domain_error = function(){
    $('.website_domain_container').text('').append(
        $('<div/>',{class:'wFC mxw400'}).append(
            $('<div/>',{class:'msgBox_red'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'fs09 taC',html:texts.settings.domain_error})
            ),
        ),
    )
}

//events
$('body').on('click','#add_user_domain_btn',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#add_user_domain_btn'))
    let domain = $('#add_user_domain_input').val();
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            add_user_domain:domain,
        },
        success:function(r){
            hideBtnLoading($('#add_user_domain_btn'));
            if(r.status == 0){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#add_user_domain_input'))
            }else if(r.status == 1){
                showAlert('success',r.msg,4000,true);
                website_temp.user_domainName = r.user_domainName;
                website.user_domainName = r.user_domainName;
                website.user_domainName_data = r.user_domainName_data;
                draw_website_domain_page(r.nameservers);
            }
        }
    })
})

$('body').on('click','#delete_user_domainName_btn',function(){
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',html:texts.settings.delete_user_domainName_confirm.replace(':user_domain:',website.user_domainName)})
            ),
            $('<div/>',{class:'mxw500 ma column alnC jstfyC'}).append(
                $('<div/>',{class:'taC cR mX20',html:texts.settings.delete_user_domainName_confirm_msg1.replace(':subdomain:',`${website.domainName}.${process.env.MIX_APP_DOMAIN}`)}),
                $('<div/>',{class:'taC cR mX20',html:texts.settings.delete_user_domainName_confirm_msg2}),
                drawInputText('','ico-password','',texts.settings.password,'delete_user_domainName_password','password',texts.settings.password,100,'password','','',false,''),
            ),
                $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'delete_user_domainName_btn_confirm',class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('body').on('click','#delete_user_domainName_btn_confirm',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#delete_user_domainName_btn_confirm'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_user_domainName:true,
            password:$('#delete_user_domainName_password').val(),
        },
        success:function(r){
            closePopup();
            hideBtnLoading($('#delete_user_domainName_btn_confirm'));
            if(r.status == 0){
                showAlert('error',r.msg,4000,true);
                inputTextError($('#add_user_domain_input'))
            }else if(r.status == 1){
                showAlert('success',r.msg,4000,true);
                website_temp.user_domainName = null;
                website.user_domainName = null;
                website.user_domainName_data = null;
                draw_website_add_domain_page();
            }
        }
    })
})