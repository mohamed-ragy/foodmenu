$('#editOption-optionSelectionsContainer').on('click','.selectionCardIconDefault',function(e){
    e.stopImmediatePropagation();
    let isDefault;
    if($(this).hasClass('ico-check1')){isDefault = 0}else{ isDefault = 1}
    let productId = $(this).closest('.selectionCardContainer').attr('productId');
    let optionId = $(this).closest('.selectionCardContainer').attr('optionId');
    let selectionId = $(this).closest('.selectionCardContainer').attr('selectionId');
    let product = products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){
        return;
    }
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){return;}
    let selection = option.product_option_selections.find(item=> item.id == selectionId);
    if(typeof(selection) === 'undefined'){return;}
    $('.selectionCardIconDefault').addClass('none');
    $('.selectionCardIconDefaultLoading').removeClass('none').css('visibility','visible');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setDefaultSelection:true,
            isDefault:isDefault,
            product_id:product.id,
            product_name:product.name,
            option_id:optionId,
            option_name:option.name,
            selection_id:selectionId,
            selection_name:selection.name,
        },success:function(r){
            if(r.setDefaultSelectionStat = 1){
                for(const key in products){
                    if(products[key].id == product.id){
                        for(const key2 in products[key].product_options){
                            if(products[key].product_options[key2].id == optionId){
                                for(const key3 in products[key].product_options[key2].product_option_selections){
                                    if(products[key].product_options[key2].product_option_selections[key3].id == selectionId){
                                        products[key].product_options[key2].product_option_selections[key3].isDefault = isDefault;
                                    }else{
                                        products[key].product_options[key2].product_option_selections[key3].isDefault = false;
                                    }
                                }
                                if($('#editOption-createNewSelection').attr('productId') == product.id && $('#editOption-createNewSelection').attr('optionId') == optionId){
                                    setManageSelections(product.id,optionId);
                                }
                            }
                        }
                    }
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.setDefaultSelectionStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
