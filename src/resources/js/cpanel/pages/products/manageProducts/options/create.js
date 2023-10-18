$('#editProductOptions-createNewOption').on('click',function(){
    let product = website.products.find(item=> item.id == $(this).attr('productId'));
    if(typeof(product) === 'undefined'){
        return;
    }

    $('#createProductOption-popup-productImg').attr('src',product.imgUrl_thumbnail);
    $('#createProductOption-popup-productName').text(product.name);
    $('#createNewProductOption-optionName').val('');
    $('#createNewProductOption-enName').val('');
    $('#createNewProductOption-frName').val('');
    $('#createNewProductOption-deName').val('');
    $('#createNewProductOption-itName').val('');
    $('#createNewProductOption-esName').val('');
    $('#createNewProductOption-arName').val('');
    $('#createNewProductOption-ruName').val('');
    $('#createNewProductOption-uaName').val('');
    $('#createNewProductOption-egName').val('');
    $('#createNewProductOption-createbtn').attr('productId',product.id)
    showPopup($('#createProductOption-popup'),function(){
        $('#createNewProductOption-optionName').select();
    })
})
$('#createNewProductOption-createbtn').on('click',function(){
    let product = website.products.find(item=> item.id == $(this).attr('productId'));
    if(typeof(product) === 'undefined'){
        return;
    }

    if($('#createNewProductOption-optionName').val() == '' || $('#createNewProductOption-optionName').val() == null){
        scrollToDiv($('#createProductOption-popup').find('.popupBody'),$('#createNewProductOption-optionName'))
        inputTextError($('#createNewProductOption-optionName'));
        showAlert('error',texts.products.optionNameRequired,4000,true)
        return;
    }
    if(!/^[a-z0-9_-]+$/.test($('#createNewProductOption-optionName').val())){
        scrollToDiv($('#createProductOption-popup').find('.popupBody'),$('#createNewProductOption-optionName'))
        inputTextError($('#createNewProductOption-optionName'));
        showAlert('error',texts.products.optionNameRegex,4000,true)
        return;
    }
    for(const key in product.product_options){
        if($('#createNewProductOption-optionName').val() == product.product_options[key].name){
            scrollToDiv($('#createProductOption-popup').find('.popupBody'),$('#createNewProductOption-optionName'))
            inputTextError($('#createNewProductOption-optionName'));
            showAlert('error',texts.products.optionNameUnique,4000,true)
            return;
        }
    }
    if(product.product_options.length >= window.plans[website.plan].productOptions){
        showAlert('warning',texts.products.planProductOptionsLimitError,10000,true);
        return;
    }
    let productId = product.id;
    let productName = product.name;
    let optionName = $('#createNewProductOption-optionName').val();
    let name_en = $('#createNewProductOption-enName').val();
    let name_fr = $('#createNewProductOption-frName').val();
    let name_de = $('#createNewProductOption-deName').val();
    let name_it = $('#createNewProductOption-itName').val();
    let name_es = $('#createNewProductOption-esName').val();
    let name_ar = $('#createNewProductOption-arName').val();
    let name_ru = $('#createNewProductOption-ruName').val();
    let name_ua = $('#createNewProductOption-uaName').val();
    let name_eg = $('#createNewProductOption-egName').val();
    showBtnLoading($('#createNewProductOption-createbtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createProductOption:true,
            productId:productId,
            productName:productName,
            optionName:optionName,
            name_en:name_en,
            name_fr:name_fr,
            name_de:name_de,
            name_it:name_it,
            name_es:name_es,
            name_ar:name_ar,
            name_ru:name_ru,
            name_ua:name_ua,
            name_eg:name_eg,
        },success:function(r){
            hideBtnLoading($('#createNewProductOption-createbtn'));
            if(r.createProductOptionStatus == 1){
                for(const key in website.products){
                    if(website.products[key].id == r.option.product_id){
                        website.products[key].product_options.push(r.option);
                        window.guideHints.products(website.products);
                    if(window.history.state.popupPage == 'Product-Options' && window.history.state.editProductOptions == website.products[key].name){
                        setEditProductOptions(website.products[key].name)
                        $('.productOptionCardContainer[optionId="'+r.option.id+'"]').find('.productOptionCardIconManage').trigger('click');
                        closePopup();
                    }
                    }
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.createProductOptionStatus == 0){
                scrollToDiv($('#createProductOption-popup').find('.popupBody'),$('#createNewProductOption-optionName'))
                inputTextError($('#createNewProductOption-optionName'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductOptionStatus == 2){
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductOptionStatus == 3){
                showAlert('warning',r.msg,10000,true);
            }

        }
    })

})
