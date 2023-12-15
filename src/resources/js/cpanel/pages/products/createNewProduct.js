$('html,body').on('click','#createProduct_img',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.products.selectProductImg,'imgBrowser_createProductImg');
});
$('html,body').on('click','.imgBrowser_createProductImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#createProduct_img').attr('imgId',imgId)
    $('#createProduct_img').attr('src',imgUrl)
});
$('html,body').on('click','#createProductBtn',function(e){
    e.stopImmediatePropagation();
    let productName = $('#createProduct_productName').val();
    let productPrice = $('#createProduct_productPrice').val();
    if(productPrice == '' || productPrice == null){productPrice = 0.00;$('#createProduct_productPrice').val('0.00')}
    let categoryId = null;
    if($('#createProduct_productCategory').val() != '' && $('#createProduct_productCategory').val() != null){
        if($('#createProduct_productCategory').attr('key') == 'uncategorized'){
            categoryId = null;
        }else{
            categoryId = website.categories.find(item=> item.name == $('#createProduct_productCategory').attr('key')).id;
        }
    }
    let productImg = $('#createProduct_img').attr('imgId') ?? null;
    if(productImg == ''){productImg = null}
    let productNames = {};
    let productDescriptions = {};
    for(const key in website.languages){
        let lang = website.languages[key];
        productNames[lang.code] = $(`#createProduct_productName_${lang.code}`).val();
        productDescriptions[lang.code] = $(`#createproduct_description_${lang.code}`).val();
    }

    showBtnLoading($('#createProductBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewProduct:true,
            productName:productName,
            price:productPrice,
            categoryId:categoryId,
            productImgId:productImg,
            productNames:productNames,
            productDescriptions:productDescriptions,
        },success:function(r){
            hideBtnLoading($('#createProductBtn'));
            if(r.createNewProductStatus == 1){
                showAlert('success',r.msg,4000,true)
                website.products.push(JSON.parse(JSON.stringify(r.product)));
                website_temp.products.push(JSON.parse(JSON.stringify(r.product)));
                if(window.history.state.page == 'manage_products'){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
                window.guideHints.products();
                popupPageClose();
                setTimeout(function(){
                    showPopupPage('product',{'product':r.product.name}).then(()=>{
                        pushHistory(true);
                        authorities();
                    })
                },500)

            }else if(r.createNewProductStatus == 0){
                inputTextError($('#createProduct_productName'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createNewProductStatus == 2){
                showAlert('error',r.msg,4000,true)
            }else if(r.createNewProductStatus == 3){
                showAlert('warning',r.msg,10000,true)
            }
        }
    })

})
