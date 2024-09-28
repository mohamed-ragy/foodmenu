$('body').on('click','.productOptionDelete',function(e){
    let product = website.products.find(item=> item.name == window.history.state.product);
    let option = product.product_options.find(item=> item.id == $(this).closest('.productOptionContainer').attr('option'));
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.products.optionDeleteConfirm.replace(':option:',option.name).replace(':product:',product.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteOption-confirmBtn',option:option.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    });
})

$('body').on('click','#deleteOption-confirmBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deleteOption-confirmBtn'))
    let option_id = $(this).attr('option');
    let product_name = window.history.state.product;
    let product_id = website.products.find(item=> item.name == product_name).id;
    let option_name = website.products.find(item=> item.id == product_id).product_options.find(item=> item.id == option_id).name;
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteProductOption:true,
            product_id:product_id,
            option_id:option_id,
            product_name:product_name,
            option_name:option_name,
        },success:function(r){
            hideBtnLoading($('#deleteOption-confirmBtn'))
            if(r.deleteProductOptionStatus == 1){
                for(const key in website.products){
                    if(website.products[key].id == product_id){
                        for(const key2 in website.products[key].product_options){
                            if(website.products[key].product_options[key2].id == option_id){
                                website.products[key].product_options.splice(key2,1);
                                if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == website.products[key].name){
                                    drawPopupPage_manage_product_variants(window.history.state.product)
                                }
                            }
                        }
                    }
                }
                for(const key in website_temp.products){
                    if(website_temp.products[key].id == product_id){
                        for(const key2 in website_temp.products[key].product_options){
                            if(website_temp.products[key].product_options[key2].id == option_id){
                                website_temp.products[key].product_options.splice(key2,1);
                            }
                        }
                    }
                }

                window.guideHints.products();
                closePopup();
                showAlert('success',r.msg,4000,true);
            }else if(r.deleteProductOptionStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
