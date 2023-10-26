$('html,body').on('click','.manageProductCardProductAvailability',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){
        if($(this).prop('checked')){
            $(this).prop('checked',false)
        }else{
            $(this).prop('checked',true)
        }
        return;
    }
    let productAvailabilityStat;
    let productId = $(this).attr('key')
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
            productName:website.products.find(item=> item.id == productId).name,
        },success:function(response){
            if(response.changeProductAvailabiltyStatus = 1){
                showAlert('success',response.msg,4000,true);
                for(const key in website.products){
                    if(website.products[key].id == productId){
                        website.products[key].availability = productAvailabilityStat;
                    }
                }
                for(const key in website_temp.products){
                    if(website_temp.products[key].id == productId){
                        website_temp.products[key].availability = productAvailabilityStat;
                    }
                }
                manage_products_unsave_check();
                window.guideHints.products(website.products);
            }else if(response.changeProductAvailabiltyStatus = 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})
