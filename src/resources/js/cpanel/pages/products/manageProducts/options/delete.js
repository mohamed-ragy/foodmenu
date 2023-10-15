$('html,body').on('click','.productOptionCardIconDelete',function(e){
    e.stopImmediatePropagation();
    let product = products.find(item=> item.id == $(this).closest('.productOptionCardContainer').attr('productId'));
    let option = product.product_options.find(item=> item.id == $(this).closest('.productOptionCardContainer').attr('optionId'));
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',html:texts.products.optionDeleteConfirm1+' <b>'+option.name+'</b> '+texts.products.optionDeleteConfirm2+' <b>'+product.name+'</b>?'}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteOption-confirmBtn',productId:product.id,optionId:option.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))
})

$('html,body').on('click','#deleteOption-confirmBtn',function(){
    showBtnLoading($('#deleteOption-confirmBtn'))
    let option_id = $(this).attr('optionId');
    let product_id = $(this).attr('productId');
    let product_name = products.find(item=> item.id == product_id).name;
    let option_name = products.find(item=> item.id == product_id).product_options.find(item=> item.id == option_id).name;
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
                for(const key in products){
                    if(products[key].id == product_id){
                        for(const key2 in products[key].product_options){
                            if(products[key].product_options[key2].id == option_id){
                                products[key].product_options.splice(key2,1);
                                window.guideHints.products(products);
                                if(window.history.state.popupPage == 'Product-Options' && window.history.state.editProductOptions == products[key].name){
                                    setEditProductOptions(products[key].name)
                                    closePopup();
                                }
                            }
                        }
                    }
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.deleteProductOptionStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
