$('body').on('click','.productOptionSelectionSetDefault',function(e){
    if(!coolDownChecker()){return;}
    if($(this).find('.productOptionSelectionSetDefaultIcon').hasClass('ico-check1')){return}
    let product = website.products.find(item=>item.name == window.history.state.product);
    let option = product.product_options.find(item=>item.id == $(this).closest('.productOptionContainer').attr('option'))
    let selection = option.product_option_selections.find(item=>item.id == $(this).closest('.productOptionSelectionContainer').attr('selection'))

    $('.productOptionSelectionSetDefaultIcon').addClass('none');
    $('.productOptionSelectionSetDefaultLoading').removeClass('none').addClass('vV');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setDefaultSelection:true,
            product_id:product.id,
            product_name:product.name,
            option_id:option.id,
            option_name:option.name,
            selection_id:selection.id,
            selection_name:selection.name,
        },success:function(r){
            if(r.setDefaultSelectionStat = 1){
                for(const key in website.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).product_option_selections){
                    website.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).product_option_selections[key].isDefault = 0;
                }
                website.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).product_option_selections.find(item=>item.id == selection.id).isDefault = 1;
                if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == product.name){
                    drawPopupPage_manage_product_variants(window.history.state.product)
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.setDefaultSelectionStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
