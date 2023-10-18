$('#editOption-createNewSelection').on('click',function(){
    let productId = $(this).attr('productId');
    let optionId = $(this).attr('optionId');
    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){
        return;
    }
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){
        return;
    }

    $('#createNewSection-popup-productImg').attr('src',product.imgUrl_thumbnail);
    $('#createNewSection-popup-productName').text(product.name+' ('+option.name+')');
    $('#createNewSection-selectionName').val('')
    $('#createNewSection-price').val('')
    $('#createNewSection-enName').val('')
    $('#createNewSection-frName').val('')
    $('#createNewSection-deName').val('')
    $('#createNewSection-itName').val('')
    $('#createNewSection-esName').val('')
    $('#createNewSection-arName').val('')
    $('#createNewSection-ruName').val('')
    $('#createNewSection-uaName').val('')
    $('#createNewSection-egName').val('')
    showPopup($('#createNewSection-popup'),function(){
        $('#createNewSection-selectionName').select();
    })
    $('#createNewSection-createbtn').attr('productId',productId).attr('optionId',optionId);
})
$('#createNewSection-createbtn').on('click',function(){
    let productId = $(this).attr('productId');
    let optionId = $(this).attr('optionId');
    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){
        return;
    }
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){
        return;
    }
    if($('#createNewSection-selectionName').val() == '' || $('#createNewSection-selectionName').val() == null){
        scrollToDiv($('#createNewSection-popup').find('.popupBody'),$('#createNewSection-selectionName'))
        inputTextError($('#createNewSection-selectionName'));
        showAlert('error',texts.products.selectionNameRequired,4000,true)
        return;
    }
    if(!/^[a-z0-9_-]+$/.test($('#createNewSection-selectionName').val())){
        scrollToDiv($('#createNewSection-popup').find('.popupBody'),$('#createNewSection-selectionName'))
        inputTextError($('#createNewProductOption-optionName'));
        showAlert('error',texts.products.selectionNameRegex,4000,true)
        return;
    }
    for(const key in option.product_option_selections){
        if($('#createNewSection-selectionName').val() == option.product_option_selections[key].name){
            scrollToDiv($('#createNewSection-popup').find('.popupBody'),$('#createNewSection-selectionName'))
            inputTextError($('#createNewProductOption-optionName'));
            showAlert('error',texts.products.selectionNameUnique,4000,true)
            return;
        }
    }
    let sort = 1;
    if(option.product_option_selections.length > 0){
        for(const key in option.product_option_selections){
            if(option.product_option_selections[key].sort >= sort){sort = parseInt(option.product_option_selections[key].sort) + 1 }
        }
    }
    let product_id = product.id;
    let product_name = product.name;
    let option_id = option.id;
    let option_name = option.name;
    let selection_name = $('#createNewSection-selectionName').val();
    if($('#createNewSection-price').val() == '' || $('#createNewSection-price').val() == null){
        $('#createNewSection-price').val('0.00')
    }
    let price = parseFloat($('#createNewSection-price').val());
    let name_en = $('#createNewSection-enName').val();
    let name_fr = $('#createNewSection-frName').val();
    let name_de = $('#createNewSection-deName').val();
    let name_it = $('#createNewSection-itName').val();
    let name_es = $('#createNewSection-esName').val();
    let name_ar = $('#createNewSection-arName').val();
    let name_ru = $('#createNewSection-ruName').val();
    let name_ua = $('#createNewSection-uaName').val();
    let name_eg = $('#createNewSection-egName').val();
    showBtnLoading($('#createNewSection-createbtn'))
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createProductSelection:true,
            product_id:product_id,
            product_name:product_name,
            option_id:option_id,
            option_name:option_name,
            sort:sort,
            selection_name:selection_name,
            price:price,
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
            hideBtnLoading($('#createNewSection-createbtn'))
            if(r.createProductSelectionStatus == 1){
                for(const key in website.products){
                    if(website.products[key].id == product_id){
                        for(const key2 in website.products[key].product_options){
                            if(website.products[key].product_options[key2].id == option_id){
                                website.products[key].product_options[key2].product_option_selections.push(r.selection);
                            }
                        }
                    }
                }
                if($('#editOption-createNewSelection').attr('productId') == product_id && $('#editOption-createNewSelection').attr('optionId') == option_id){
                    setManageSelections(product_id,option_id);
                }
                if(!$('#createNewSection-popup').hasClass('none')){
                    closePopup();
                }
                showAlert('success',r.msg,4000,true)
                window.guideHints.products(website.products);
            }else if(r.createProductSelectionStatus == 0){
                scrollToDiv($('#createNewSection-popup').find('.popupBody'),$('#createNewSection-selectionName'))
                inputTextError($('#createNewProductOption-optionName'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductSelectionStatus == 2){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
