drawPage_create_new_user = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'wFC'}).append(
                drawInputText('','ico-email_address','',texts.users.email,'createNewUser-email','text',texts.users.email,'100','clearVal','inputTextContainer_100p','',false),
                drawInputText('','ico-password','',texts.users.password,'createNewUser-password','password',texts.users.password,'100','password','inputTextContainer_100p','',false),
                drawInputText('','ico-user','',texts.users.name,'createNewUser-name','text',texts.users.name,'100','clearVal','inputTextContainer_100p','',false),
                drawInputText('','ico-phone_number','',texts.users.phoneNumber,'createNewUser-phoneNumber','text',texts.users.phoneNumber,'100','clearVal','inputTextContainer_100p','',false),
            ),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn',id:'createNewUserBtn'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create})
                )
            )
        )
    )
}

