$('html,body').on('click','#createNewProductOption',function(e){
    e.stopImmediatePropagation();
    let product = website.products.find(item=> item.name == window.history.state.product);
    showPopup('createNewProductOption',function(){
        $('.popupBody').addClass('m0 p10 w100p-20').append(
            $('<div/>',{class:'row alnC jstfyS mB20'}).append(
                $('<img/>',{class:'h40 w40 br5 ofCover',src:product.imgUrl_thumbnail}),
                $('<div/>',{class:'fs102 bold500 mis-5',text:product.name}),
            ),
            $('<div/>',{class:'',id:'createNewOptionInputsContainer'}).append(
                drawInputText('','ico-edit','',texts.products.optionIdentifier,'createOption_identifier','text',texts.products.optionIdentifier,200,'clearVal','','',false,'')
            ),
            $('<div/>',{class:'btnContainer mT20'}).append(
                $('<button/>',{class:'btn',id:'createNewOption_btn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create}),
                    $('<div/>',{class:'btnLoading'}),
                )
            )
        );
        for(const key in website.languages){
            const lang = website.languages[key];
            $('#createNewOptionInputsContainer').append(
                drawInputText('','',lang.flag,texts.products.optionNameLang.replace(':lang:',lang.name),`createOption_name-${lang.code}`,'text',texts.products.optionNameLang.replace(':lang:',lang.name),200,'clearVal','','',false,'')
            )
        }
        $('#createOption_identifier').focus();
    })

})
$('html,body').on('click','#createNewOption_btn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#createNewOption_btn'));
    let product = website.products.find(item=> item.name == window.history.state.product);

    let productId = product.id;
    let productName = product.name;
    let option_identifier = $('#createOption_identifier').val();
    let option_names = {};
    for(const key in website.languages){
        const lang = website.languages[key];
        option_names[lang.code] = $(`#createOption_name-${lang.code}`).val();
    }

    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createProductOption:true,
            product_id:product.id,
            product_name:product.name,
            option_identifier:option_identifier,
            option_names:option_names,
        },success:function(r){
            console.log(r);
            hideBtnLoading($('#createNewOption_btn'));
            if(r.createProductOptionStatus == 1){
                website.products.find(item=>item.name == product.name).product_options.push(JSON.parse(JSON.stringify(r.option)));
                website_temp.products.find(item=>item.name == product.name).product_options.push(JSON.parse(JSON.stringify(r.option)));
                window.guideHints.products(website.products);
                if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == product.name){
                    drawPopupPage_manage_product_options(window.history.state.product)
                }
                closePopup();
                showAlert('success',r.msg,4000,true);
            }else if(r.createProductOptionStatus == 0){
                inputTextError($('#createOption_identifier'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductOptionStatus == 2){
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductOptionStatus == 3){
                showAlert('warning',r.msg,10000,true);
            }

        }
    })

})
