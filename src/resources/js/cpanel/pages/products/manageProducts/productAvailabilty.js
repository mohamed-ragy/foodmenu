$('html,body').on('click','.manageProductCardProductAvailability',function(e){
    e.stopImmediatePropagation();
    let productAvailabilityStat;
    let productId = $(this).attr('productId')
    if($(this).prop('checked')){
        productAvailabilityStat = 1;
    }else{
        productAvailabilityStat = 0;
    }
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeProductAvailabilty:productId,
            productAvailability:productAvailabilityStat,
            productName:products.find(item=> item.id == productId).name,
        },success:function(response){
            if(response.changeProductAvailabiltyStatus = 1){
                showAlert('success',response.msg,4000,true);
                for(const key in products){
                    if(products[key].id == productId){
                        products[key].availability = productAvailabilityStat;
                        window.guideHints.products(products);
                    }
                }

                window.guideHints.products(products);
            }else if(response.changeProductAvailabiltyStatus = 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
