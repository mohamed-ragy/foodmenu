$('html,body').on('click','.productOptionSelectionEdit',function(e){
    e.stopImmediatePropagation();
    drawEditProductSelectionPopup(window.history.state.product,$(this).closest('.productOptionContainer').attr('option'),$(this).closest('.productOptionSelectionContainer').attr('selection'))
})
$('html,body').on('click','.productOptionSelectionEdit_guideAlert',function(e){
    e.stopImmediatePropagation();
    drawEditProductSelectionPopup($(this).attr('product'),$(this).attr('option'),$(this).attr('selection'))
    $(`#editSelection_name-${$(this).attr('lang')}`).focus();
    highlightElem($(`#editSelection_name-${$(this).attr('lang')}`))
})
$('html,body').on('click','.productOptionSelectionEdit_activityLog',function(e){
    e.stopImmediatePropagation();
    drawEditProductSelectionPopup($(this).attr('product'),$(this).attr('option'),$(this).attr('selection'))
})
drawEditProductSelectionPopup = function(product_name,option_id,selection_id){
    if(account.authorities[1] == false){showPopup('accessDenied');return;}
    let product = website.products.find(item=>item.name == product_name);
    if(typeof(product) === 'undefined'){showPopup_notFound(texts.products.productNotFound);return;}
    let option = product.product_options.find(item=>item.id == option_id);
    if(typeof(option) === 'undefined'){showPopup_notFound(texts.products.optionNotFound);return;}
    let selection = option.product_option_selections.find(item=>item.id == selection_id);
    if(typeof(selection) === 'undefined'){showPopup_notFound(texts.products.selectionNotFound);return;}
    showPopup('editProductSelection',function(){
        $('.popupBody').addClass('m0 p10 w100p-20').append(
            $('<div/>',{class:'row alnC jstfyS mB20'}).append(
                $('<img/>',{class:'h40 w40 br5 ofCover',src:product.thumbnail}),
                $('<div/>',{class:'mis-5'}).append(
                    $('<span/>',{class:'fs102 bold500',text:product.name}),
                    $('<span/>',{class:'mis-5',text:`(${option.name})`})
                ),
            ),
            $('<div/>',{class:'',id:'editSelectionInputsContainer',product:product.name,option:option.id,selection:selection.id}).append(
                drawInputText('','ico-edit','',texts.products.selectionIdentifier,'editSelection_identifier','text',texts.products.selectionIdentifier,200,'copy','',selection.name,true,''),
                drawInputText('','ico-money','',texts.products.selectionPrice,'editSelection_price','number',texts.products.selectionPrice,200,'clearVal','',selection.price,false,'')
            ),
            drawSaveCancelBtns('editSelection_saveBtn','editSelection_cancelBtn','mT20'),
        );
        for(const key in website.languages){
            const lang = website.languages[key];
            $('#editSelectionInputsContainer').append(
                drawInputText('','',lang.flag,texts.products.selectionNameLang.replace(':lang:',lang.name),`editSelection_name-${lang.code}`,'text',texts.products.selectionNameLang.replace(':lang:',lang.name),200,'clearVal','',selection.names[lang.code],false,'')
            )
        }
    })
}
$('html,body').on('click','#editSelection_cancelBtn',function(e){
    e.stopImmediatePropagation();
    closePopup();
})

$('html,body').on('click','#editSelection_saveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let product = website.products.find(item=>item.name == $('#editSelectionInputsContainer').attr('product'));
    let option = product.product_options.find(item=>item.id == $('#editSelectionInputsContainer').attr('option'));
    let selection = option.product_option_selections.find(item=>item.id == $('#editSelectionInputsContainer').attr('selection'));
    if($('#editSelection_price').val() == '' || $('#editSelection_price').val() == null){
        $('#editSelection_price').val('0.00')
    }
    let price = $('#editSelection_price').val();
    let names ={};
    for(const key in website.languages){
        names[website.languages[key].code] = $(`#editSelection_name-${website.languages[key].code}`).val();
    }
    showBtnLoading($('#editSelection_saveBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProductSelection:true,
            product_id:product.id,
            product_name:product.name,
            option_id:option.id,
            option_name:option.name,
            selection_id:selection.id,
            selection_name:selection.name,
            price:price,
            selection_names:names,
        },success:function(r){
            hideBtnLoading($('#editSelection_saveBtn'));
            if(r.editProductSelectionStatus == 1){
                website.products.find(item=>item.id==product.id).product_options.find(item=>item.id == option.id).product_option_selections.find(item=>item.id == selection.id).price = price;
                website.products.find(item=>item.id==product.id).product_options.find(item=>item.id == option.id).product_option_selections.find(item=>item.id == selection.id).names = names;
                website_temp.products.find(item=>item.id==product.id).product_options.find(item=>item.id == option.id).product_option_selections.find(item=>item.id == selection.id).price = price;
                website_temp.products.find(item=>item.id==product.id).product_options.find(item=>item.id == option.id).product_option_selections.find(item=>item.id == selection.id).names = names;
                window.guideHints.products();
                showAlert('success',r.msg,4000,true);
                closePopup();
            }else if(r.editProductSelectionStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
