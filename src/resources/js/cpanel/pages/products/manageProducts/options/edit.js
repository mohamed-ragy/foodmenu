$('html,body').on('click','.productOptionEdit',function(e){
    e.stopImmediatePropagation();
    showEditProductOptionPopup(window.history.state.product,$(this).closest('.productOptionContainer').attr('option'))
});
$('html,body').on('click','.productOptionEdit_guideAlert',function(e){
    e.stopImmediatePropagation();
    showEditProductOptionPopup($(this).attr('product'),$(this).attr('option'));
    $(`#editOption_name-${$(this).attr('lang')}`).focus();
    highlightElem($(`#editOption_name-${$(this).attr('lang')}`))
});
$('html,body').on('click','.productOptionEdit_activityLog',function(e){
    e.stopImmediatePropagation();
    showEditProductOptionPopup($(this).attr('product'),$(this).attr('option'));
});
showEditProductOptionPopup = function(product_name,option_id){
    if(account.authorities[1] == false){showPopup('accessDenied');return;}
    let product = website.products.find(item=>item.name == product_name);
    if(typeof(product) === 'undefined'){showPopup_notFound(texts.products.productNotFound);return;}
    let option = product.product_options.find(item=>item.id == option_id);
    if(typeof(option) === 'undefined'){showPopup_notFound(texts.products.optionNotFound);return;}
    showPopup('editProductOption',function(){
        $('.popupBody').addClass('m0 p10 w100p-20').append(
            $('<div/>',{class:'row alnC jstfyS mB20'}).append(
                $('<img/>',{class:'h40 w40 br5 ofCover',src:product.thumbnail}),
                $('<div/>',{class:'fs102 bold500 mis-5',text:product.name}),
                $('<div/>',{tooltip:texts.cpanel.public.unsaved,class:`editOptionNoSave_${product.name}_${option.id} ico-warning unsaved none mie-5 mis-5 fs1 `}),
            ),
            $('<div/>',{class:'',id:'editOptionInputsContainer',option:option.id,product:product.id}).append(
                drawInputText('','ico-edit','',texts.products.optionIdentifier,'createOption_identifier','text',texts.products.optionIdentifier,200,'copy','',option.name,true,'')
            ),
            drawSaveCancelBtns('editOption_saveBtn','editOption_cancelBtn','mT20')
        );
        for(const key in website.languages){
            const lang = website.languages[key];
            $('#editOptionInputsContainer').append(
                drawInputText('','',lang.flag,texts.products.optionNameLang.replace(':lang:',lang.name),`editOption_name-${lang.code}`,'text',texts.products.optionNameLang.replace(':lang:',lang.name),200,'clearVal','',option.names[lang.code],false,'')
            )
        }
    })
}

$('html,body').on('click','#editOption_cancelBtn',function(e){
    e.stopImmediatePropagation();
    closePopup();
})

$('html,body').on('click','#editOption_saveBtn',function(e){
    e.stopImmediatePropagation();
    let product = website.products.find(item=>item.id == $('#editOptionInputsContainer').attr('product'));
    let option_id = $('#editOptionInputsContainer').attr('option')
    let option = product.product_options.find(item=> item.id == option_id);
    let names ={};
    for(const key in website.languages){
        names[website.languages[key].code] = $(`#editOption_name-${website.languages[key].code}`).val();
    }
    showBtnLoading($('#editOption_saveBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProductOption:true,
            product_id:product.id,
            product_name:product.name,
            option_name:option.name,
            option_id:option.id,
            names:names,
        },success:function(r){
            hideBtnLoading($('#editOption_saveBtn'));
            if(r.editProductOptionStat == 1){
                for(const key in website.languages){
                    const lang = website.languages[key];
                    website.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).names[lang.code] = names[lang.code];
                    website_temp.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).names[lang.code] = names[lang.code];
                }
                window.guideHints.products();
                showAlert('success',r.msg,4000,true);
                closePopup();
                if(window.history.state.popupPage == 'manage_product_options' && window.history.state.product == product.name){
                    drawPopupPage_manage_product_options(window.history.state.product)
                }
            }else if(r.editProductOptionStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
