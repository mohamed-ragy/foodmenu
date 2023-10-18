$('#editOption-optionSelectionsContainer').on('click','.selectionCardIconEdit',function(e){
    e.stopImmediatePropagation();
    setEditProductSelection($(this).closest('.selectionCardContainer').attr('productId'),$(this).closest('.selectionCardContainer').attr('optionId'),$(this).closest('.selectionCardContainer').attr('selectionId'))
})

setEditProductSelection = function(productId,optionId,selectionId,callback=()=>{}){
    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) == 'undefined'){return;}
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) == 'undefined'){return;}
    let selection = option.product_option_selections.find(item=> item.id == selectionId);
    if(typeof(selection) == 'undefined'){return;}
    $('#editSection-popup-productImg').attr('src',product.imgUrl_thumbnail);
    $('#editSection-popup-productName').text(`${product.name} (${option.name})`);
    $('#editSection-selectionName').attr('productId',product.id).attr('optionId',option.id).val(selection.name)
    $('#editSection-price').val(selection.price)
    $('#editSection-enName').val(selection.name_en)
    $('#editSection-frName').val(selection.name_fr)
    $('#editSection-deName').val(selection.name_de)
    $('#editSection-itName').val(selection.name_it)
    $('#editSection-esName').val(selection.name_es)
    $('#editSection-arName').val(selection.name_ar)
    $('#editSection-ruName').val(selection.name_ru)
    $('#editSection-uaName').val(selection.name_ua)
    $('#editSection-egName').val(selection.name_eg)
    showPopup($('#editSection-popup'),function(){
        callback();
    })

}
$('#editSection-saveBtn').on('click',function(){
    let option_id = $('#editSection-selectionName').attr('optionId');
    let product_id = $('#editSection-selectionName').attr('productId');
    let product = website.products.find(item => item.id == product_id);
    let selection_name = $('#editSection-selectionName').val();
    let option = product.product_options.find(item=>item.id == option_id);
    if(typeof(option) === 'undefined'){return;}
    let selection = option.product_option_selections.find(item=>item.name == selection_name);
    if($('#editSection-price').val() == '' || $('#editSection-price').val() == null){$('#editSection-price').val('0.00')}
    let price = parseFloat($('#editSection-price').val());
    let name_en = $('#editSection-enName').val();
    let name_fr = $('#editSection-frName').val();
    let name_de = $('#editSection-deName').val();
    let name_it = $('#editSection-itName').val();
    let name_es = $('#editSection-esName').val();
    let name_ar = $('#editSection-arName').val();
    let name_ru = $('#editSection-ruName').val();
    let name_ua = $('#editSection-uaName').val();
    let name_eg = $('#editSection-egName').val();
    showBtnLoading($('#editSection-saveBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProductSelection:true,
            product_id:product.id,
            product_name:product.name,
            option_id:option_id,
            option_name:option.name,
            selection_id:selection.id,
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
            hideBtnLoading($('#editSection-saveBtn'));
            if(r.editProductSelectionStatus == 1){
                for(const key in website.products){
                    if(website.products[key].id == product.id){
                        for(const key2 in website.products[key].product_options){
                            if(website.products[key].product_options[key2].id == option_id){
                                for(const key3 in website.products[key].product_options[key2].product_option_selections){
                                    if(website.products[key].product_options[key2].product_option_selections[key3].name == selection_name){
                                        website.products[key].product_options[key2].product_option_selections[key3].price = price;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_en = name_en;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_fr = name_fr;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_de = name_de;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_it = name_it;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_es = name_es;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_ar = name_ar;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_ru = name_ru;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_ua = name_ua;
                                        website.products[key].product_options[key2].product_option_selections[key3].name_eg = name_eg;
                                    }
                                }
                            }
                        }
                    }
                }
                window.guideHints.products(website.products);
                showAlert('success',r.msg,4000,true);
                if(!$('#editSection-popup').hasClass('none') && $('#editSection-selectionName').val() == selection_name){
                    closePopup();
                }
            }else if(r.editProductSelectionStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
