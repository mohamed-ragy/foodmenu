$('html,body').on('click','.manageProductCardDelete',function(e){
    e.stopImmediatePropagation();
    let product = products.find(item=> item.id == $(this).attr('productId'));
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',html:texts.products.productDeleteConfirm+' <b>'+product.name+'</b>?'}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteProduct-confirmBtn',productId:product.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))
})
$('html,body').on('click','#deleteProduct-confirmBtn',function(){
    showBtnLoading($('#deleteProduct-confirmBtn'));
    let productId = $(this).attr('productId')
    let productName = products.find(item=> item.id == productId).name;
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteProduct:true,
            productId:productId,
            productName:productName,
        },success:function(r){
            hideBtnLoading($('#deleteProduct-confirmBtn'))
            if(r.deleteProductStatus == 1 ){
                let categoryId;
                for(const key in products){
                    product = products[key];
                    if(product.id == productId){
                        categoryId = product.category_id;
                        products.splice(key,1)
                    }
                }
                if($('#manageProducts-selectCategory').attr('key') != null){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
                closePopup();
                drawProductsInputLists();
                drawTodayHomeProducts();
                showAlert('success',r.msg,4000,true);
                window.guideHints.products(products);
            }else if(r.deleteProductStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
