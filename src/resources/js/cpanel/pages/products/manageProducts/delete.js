$('html,body').on('click','.manageProductCardDelete',function(e){
    e.stopImmediatePropagation();
    let product = website.products.find(item=> item.id == $(this).attr('product'));
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.products.productDeleteConfirm.replace(':product:',product.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteProduct-confirmBtn',product:product.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    });
})
$('html,body').on('click','#deleteProduct-confirmBtn',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#deleteProduct-confirmBtn'));
    if(!coolDownChecker()){return;}
    let productId = $(this).attr('product')
    let productName = website.products.find(item=> item.id == productId).name;
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
                for(const key in website.products){
                    let product = website.products[key];
                    if(product.id == productId){
                        categoryId = product.category_id;
                        website.products.splice(key,1)
                    }
                }
                for(const key in website_temp.products){
                    let product = website_temp.products[key];
                    if(product.id == productId){
                        categoryId = product.category_id;
                        website_temp.products.splice(key,1)
                    }
                }
                if(window.history.state.category != null && window.history.state.page == 'manage_products' ){
                    drawManageProductCards(window.history.state.category);
                }
                closePopup();
                showAlert('success',r.msg,4000,true);
                window.guideHints.products(website.products);
            }else if(r.deleteProductStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
