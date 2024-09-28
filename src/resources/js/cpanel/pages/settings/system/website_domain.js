
draw_website_domain_page = function(nameservers = null){
    if(!account.is_master){return;}
    $('.website_domain_container').text('')
    if(website.user_domainName === null){
        $('.website_domain_container').append(
            $('<div/>',{class:'wFC mxw400'}).append(
                $('<div/>',{class:'msgBox_green'}).append(
                    $('<span/>',{class:'ico-info fs2 mB10'}),
                    $('<span/>',{class:'fs09 taC',html:texts.settings.website_domain_des})
                ),
            ),
            $('<div/>',{class:'mX20 wFC'}).append(
                drawInputText('','ico-link','',texts.settings.website_domain,'add_user_domain_input','text',texts.settings.website_domain,100,'clearVal','','',false,''),
                $('<div/>',{class:'btnContainer mT20'}).append(
                    $('<button/>',{id:'add_user_domain_btn',class:'btn btn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.settings.add_domain})
                    )
                )
            )
        )
    }else if(website.user_domainName !== website.url){
        console.log('gaga')
    }
}
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
                website_temp.user_domainName = r.domain;
                website.user_domainName = r.domain;
                website_temp.user_domainNameServers = r.user_domainNameServers;
                website.user_domainNameServers = r.user_domainNameServers;
                draw_website_domain_page(r.nameservers);
            }
        }
    })
})