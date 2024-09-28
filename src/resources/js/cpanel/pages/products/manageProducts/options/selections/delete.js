$('body').on('click','.productOptionSelectionDelete',function(e){
    let product = website.products.find(item=>item.name == window.history.state.product);
    let option = product.product_options.find(item=>item.id == $(this).closest('.productOptionContainer').attr('option'));
    let selection = option.product_option_selections.find(item=>item.id == $(this).closest('.productOptionSelectionContainer').attr('selection'));
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.products.selectionDeleteConfirm.replace(':selection:',selection.name).replace(':option:',option.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteSelection-confirmBtn',option:option.id,selection:selection.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    });
})

$('body').on('click','#deleteSelection-confirmBtn',function(e){
    if(!coolDownChecker()){return;}
    let product = website.products.find(item=>item.name == window.history.state.product);
    let option = product.product_options.find(item=>item.id == $(this).attr('option'));
    let selection = option.product_option_selections.find(item=>item.id == $(this).attr('selection'));
    showBtnLoading($('#deleteSelection-confirmBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteProductSelection:true,
            product_id:product.id,
            product_name:product.name,
            option_id:option.id,
            option_name:option.name,
            selection_id:selection.id,
            selection_name:selection.name,
        },success:function(r){
            hideBtnLoading($('#deleteSelection-confirmBtn'));
            if(r.delteProductSelectionStat == 1){
                for(const key in website.products){
                    if(website.products[key].id == product.id){
                        for(const key2 in website.products[key].product_options){
                            if(website.products[key].product_options[key2].id == option.id){
                                for(const key3 in website.products[key].product_options[key2].product_option_selections){
                                    if(website.products[key].product_options[key2].product_option_selections[key3].id == selection.id){
                                        website.products[key].product_options[key2].product_option_selections.splice(key3,1);
                                        closePopup();
                                        if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == website.products[key].name){
                                            drawPopupPage_manage_product_variants(window.history.state.product)
                                        }
                                        window.guideHints.products();
                                    }
                                }
                            }
                        }
                    }
                }
                for(const key in website_temp.products){
                    if(website_temp.products[key].id == product.id){
                        for(const key2 in website_temp.products[key].product_options){
                            if(website_temp.products[key].product_options[key2].id == option.id){
                                for(const key3 in website_temp.products[key].product_options[key2].product_option_selections){
                                    if(website_temp.products[key].product_options[key2].product_option_selections[key3].id == selection.id){
                                        website_temp.products[key].product_options[key2].product_option_selections.splice(key3,1);
                                    }
                                }
                            }
                        }
                    }
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.delteProductSelectionStat == 0){
                closePopup();
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
