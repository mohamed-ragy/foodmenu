$('#editOption-optionSelectionsContainer').on('click','.productOptionCardIconEdit',function(e){
    e.stopImmediatePropagation();
    setEditProductOption($(this).closest('.selectionsOptionCard').attr('productId'),$(this).closest('.selectionsOptionCard').attr('optionId'))
})

setEditProductOption = function(productId,optionId,callback=()=>{}){
    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){return;}
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){return;}
    $('#editProductOption-popup-productImg').attr('src',product.imgUrl_thumbnail);
    $('#editProductOption-popup-productName').text(product.name);
    $('#editProductOption-optionName').attr('productid',productId).val(option.name)
    $('#editProductOption-enName').val(option.name_en);
    $('#editProductOption-frName').val(option.name_fr);
    $('#editProductOption-deName').val(option.name_de);
    $('#editProductOption-itName').val(option.name_it);
    $('#editProductOption-esName').val(option.name_es);
    $('#editProductOption-arName').val(option.name_ar);
    $('#editProductOption-ruName').val(option.name_ru);
    $('#editProductOption-uaName').val(option.name_ua);
    $('#editProductOption-egName').val(option.name_eg);
    showPopup($('#editProductOption-popup'),function(){
        callback();
    })
}

$('#editProductOption-savebtn').on('click',function(){
    let option_name = $('#editProductOption-optionName').val()
    let product = website.products.find(item=> item.id == $('#editProductOption-optionName').attr('productId'));
    let option = product.product_options.find(item=> item.name == option_name);
    if(typeof(option) === 'undefined'){return;}
    let option_id = option.id;
    let name_en = $('#editProductOption-enName').val();
    let name_fr = $('#editProductOption-frName').val();
    let name_de = $('#editProductOption-deName').val();
    let name_it = $('#editProductOption-itName').val();
    let name_es = $('#editProductOption-esName').val();
    let name_ar = $('#editProductOption-arName').val();
    let name_ru = $('#editProductOption-ruName').val();
    let name_ua = $('#editProductOption-uaName').val();
    let name_eg = $('#editProductOption-egName').val();
    showBtnLoading($('#editProductOption-savebtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProductOption:true,
            product_id:product.id,
            product_name:product.name,
            option_name:option_name,
            option_id:option_id,
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
            hideBtnLoading($('#editProductOption-savebtn'));
            if(r.editProductOptionStat == 1){
                for(const key in website.products){
                    for(const key2 in website.products[key].product_options){
                        if(website.products[key].product_options[key2].id == option_id){
                            website.products[key].product_options[key2].name_en = name_en;
                            website.products[key].product_options[key2].name_fr = name_fr;
                            website.products[key].product_options[key2].name_de = name_de;
                            website.products[key].product_options[key2].name_it = name_it;
                            website.products[key].product_options[key2].name_es = name_es;
                            website.products[key].product_options[key2].name_ar = name_ar;
                            website.products[key].product_options[key2].name_ru = name_ru;
                            website.products[key].product_options[key2].name_ua = name_ua;
                            website.products[key].product_options[key2].name_eg = name_eg;
                        }
                    }
                }
                window.guideHints.products(website.products);
                showAlert('success',r.msg,4000,true);
                if(!$('#editProductOption-popup').hasClass('none') && $('#editProductOption-optionName').val() == option_name){
                    closePopup();
                }
            }else if(r.editProductOptionStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
