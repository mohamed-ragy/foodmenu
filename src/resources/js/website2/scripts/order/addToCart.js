let addToCartProduct = null;

calcAddToCartPrice = function(){
    if(addToCartProduct == null){return;}
    let price = parseFloat(addToCartProduct.price);
    $('.addToCartOptionSelection').each(function(){
        if($(this).find('.addToCartSelectionCheck').hasClass('ic-check1')){
            price = price + parseFloat($(this).attr('selectionPrice'));
        }
    })
    price = price * parseInt($('#addToCartQty').val())
    return price.toFixed(2);
}
$('html,body').on('click','.addToCart',function(e){
    e.stopImmediatePropagation();
    let product = products.find(item => item.id == $(this).attr('productId'));
    let status = {
        'status': 'user_addItemToCart',
        'product':product.name,
    }
    userStatus(status);
    addToCartProduct = product;
    $('#addToCart-popup').attr('showImg',product.img_id);
    $('#addToCart-productName').text(product.nameLang)
    $('#addToCartPrice').text(website.currency+product.price)
    $('#addToCartOptionsContainer').text('');
    $('#addToCartQty').val(1)
    $('#addToCartItemNotice').val('');
    if(product.product_options.length > 0){
        for(const key in product.product_options){
            let option = product.product_options[key];
            let thisProductOption;
            let optionName = option.name;
            if(option['name_'+lang] != null && option['name_'+lang] != ''){optionName = option['name_'+lang]}
            $('#addToCartOptionsContainer').append(
                thisProductOption = drawAddToCartOption(optionName)
            );
            if(option.product_option_selections.length > 0){
                for(const key in option.product_option_selections){
                    selection = option.product_option_selections[key];
                    selectionName = selection.name;
                    if(selection['name_'+lang] != null && selection['name_'+lang] != ''){selectionName = selection['name_'+lang]}
                    thisProductOption.append(
                        drawAddToCartSelection(selectionName,selection.isDefault,option.id,selection.id,selection.price)
                    )
                }
            }
        }
    }

    $('#addToCartPrice').text(website.currency+calcAddToCartPrice())

    showPopup($('#addToCart-popup'))
})

$('html, body').on('click','.addToCartMinus',function(e){
    e.stopImmediatePropagation();
    if($('#addToCartQty').val() == 1){return;}
    $('#addToCartQty').val(parseInt($('#addToCartQty').val()) - 1)
    $('#addToCartPrice').text(website.currency+calcAddToCartPrice())
})
$('html, body').on('click','.addToCartPlus',function(e){
    e.stopImmediatePropagation();
    $('#addToCartQty').val(parseInt($('#addToCartQty').val()) + 1)
    $('#addToCartPrice').text(website.currency+calcAddToCartPrice())
})
$('html, body').on('click','.addToCartOptionSelection',function(e){
    e.stopImmediatePropagation();
    $('.addToCartOptionSelection[optionId="'+$(this).attr('optionId')+'"]').find('.addToCartSelectionCheck').removeClass('ic-check1').addClass('ic-check0');
    $(this).find('.addToCartSelectionCheck').removeClass('ic-check0').addClass('ic-check1')
    $('#addToCartPrice').text(website.currency+calcAddToCartPrice())
})
$('#addToCart-btn').on('click',function(){
    showLoading($('#addToCart-Loading'))
    let itemId = '';
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let productCheck = null;
    productCheck = products.find(elem => elem.id == addToCartProduct.id);
    if(productCheck == null){return;}
    for(let i = 0;i<=15;i++){
        itemId = itemId+ chars[Math.floor(Math.random() * chars.length)]
    }
    window.cart[itemId] = {
        productId:addToCartProduct.id,
        itemOptions:[],
        qty:$('#addToCartQty').val(),
        itemNotice:$('#addToCartItemNotice').val(),
    }
    $('.addToCartOptionSelection').each(function(){
        if($(this).find('.addToCartSelectionCheck').hasClass('ic-check1')){

        window.cart[itemId].itemOptions.push({
            optionId:$(this).attr('optionId'),
            selectionId:$(this).attr('selectionId')
        })
        }
    });
    setCart(function(){
        hideLoading($('#addToCart-Loading'))
        addToCartAnimation();
        hidePopup();
    })

})
