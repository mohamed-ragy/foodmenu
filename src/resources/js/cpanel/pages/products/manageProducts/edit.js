setEditProduct = function(productName){
    $('#editProductWindowContainer').removeClass('none');
    $('#editProductWindowNotFound').addClass('none');
    let product = products.find(item=> item.name == productName);
    if (typeof(product) === "undefined"){
        $('#editProductWindowContainer').addClass('none');
        $('#editProductWindowNotFound').removeClass('none');
        // popupPageClose(false);
        return;
    }
    $('#editProduct-productOptionsBtn').attr('product',product.name);
    $('#editProduct-ProductName').val(product.name);
    $('#editProduct-productPrice').val(product.price);
    if(product.category_id == null){
        $('#editProduct-productCategory').val(texts.products.unsortProduct).attr('key','uncategorized');
    }else{
        $('#editProduct-productCategory').val(categories.find(item=> item.id == product.category_id).name).attr('key',categories.find(item=> item.id == product.category_id).name);
    }
    $('#editProduct-productAvailability').prop('checked',product.availability)
    $('#editProduct-productImgCard').attr('imgId',product.img_id).attr('src',product.imgUrl)
    $('#editProduct-enName').val(product.name_en);
    $('#editProduct-frName').val(product.name_fr);
    $('#editProduct-deName').val(product.name_de);
    $('#editProduct-itName').val(product.name_it);
    $('#editProduct-esName').val(product.name_es);
    $('#editProduct-arName').val(product.name_ar);
    $('#editProduct-ruName').val(product.name_ru);
    $('#editProduct-uaName').val(product.name_ua);
    $('#editProduct-egName').val(product.name_eg);

    $('#editProduct_enDescription').val(product.description_en);
    $('#editProduct_frDescription').val(product.description_fr);
    $('#editProduct_deDescription').val(product.description_de);
    $('#editProduct_itDescription').val(product.description_it);
    $('#editProduct_esDescription').val(product.description_es);
    $('#editProduct_arDescription').val(product.description_ar);
    $('#editProduct_ruDescription').val(product.description_ru);
    $('#editProduct_uaDescription').val(product.description_ua);
    $('#editProduct_egDescription').val(product.description_eg);
    editProductNoSaveCheck();
}

editProductNoSaveCheck = function(){
    let product = products.find(item=> item.name == $('#editProduct-ProductName').val());
    if (typeof(product) === "undefined"){
        return;
    }
    product.name_en == null ? product.name_en = '' : product.name_en = product.name_en;
    product.name_fr == null ? product.name_fr = '' : product.name_fr = product.name_fr;
    product.name_de == null ? product.name_de = '' : product.name_de = product.name_de;
    product.name_it == null ? product.name_it = '' : product.name_it = product.name_it;
    product.name_es == null ? product.name_es = '' : product.name_es = product.name_es;
    product.name_ar == null ? product.name_ar = '' : product.name_ar = product.name_ar;
    product.name_ru == null ? product.name_ru = '' : product.name_ru = product.name_ru;
    product.name_ua == null ? product.name_ua = '' : product.name_ua = product.name_ua;
    product.name_eg == null ? product.name_eg = '' : product.name_eg = product.name_eg;
    product.description_en == null ? product.description_en = '' : product.description_en = product.description_en;
    product.description_fr == null ? product.description_fr = '' : product.description_fr = product.description_fr;
    product.description_de == null ? product.description_de = '' : product.description_de = product.description_de;
    product.description_it == null ? product.description_it = '' : product.description_it = product.description_it;
    product.description_es == null ? product.description_es = '' : product.description_es = product.description_es;
    product.description_ar == null ? product.description_ar = '' : product.description_ar = product.description_ar;
    product.description_eg == null ? product.description_eg = '' : product.description_eg = product.description_eg;
    product.description_ru == null ? product.description_ru = '' : product.description_ru = product.description_ru;
    product.description_ua == null ? product.description_ua = '' : product.description_ua = product.description_ua;
    let categoryIdCheck;
    let tempCategory = categories.find(item=> item.name == $('#editProduct-productCategory').attr('key'))
    if(typeof(tempCategory) === 'undefined'){categoryIdCheck = null}else{
        categoryIdCheck = tempCategory.id;
    }
    $('#editProduct-productCategory').attr('key') == 'uncategorized' ? categoryIdCheck = null : null;
    if(
        parseFloat($('#editProduct-productPrice').val()) == parseFloat(product.price) &&
        categoryIdCheck == product.category_id &&
        $('#editProduct-productAvailability').prop('checked') == product.availability &&

        $('#editProduct-productImgCard').attr('imgId') == product.img_id &&
        $('#editProduct-enName').val() == product.name_en &&
        $('#editProduct-frName').val() == product.name_fr &&
        $('#editProduct-deName').val() == product.name_de &&
        $('#editProduct-itName').val() == product.name_it &&
        $('#editProduct-esName').val() == product.name_es &&
        $('#editProduct-arName').val() == product.name_ar &&
        $('#editProduct-ruName').val() == product.name_ru &&
        $('#editProduct-uaName').val() == product.name_ua &&
        $('#editProduct-egName').val() == product.name_eg &&
        $('#editProduct_enDescription').val() == product.description_en &&
        $('#editProduct_frDescription').val() == product.description_fr &&
        $('#editProduct_deDescription').val() == product.description_de &&
        $('#editProduct_itDescription').val() == product.description_it &&
        $('#editProduct_esDescription').val() == product.description_es &&
        $('#editProduct_arDescription').val() == product.description_ar &&
        $('#editProduct_ruDescription').val() == product.description_ru &&
        $('#editProduct_uaDescription').val() == product.description_ua &&
        $('#editProduct_egDescription').val() == product.description_eg
    ){
        $('#editProduct-editProductNoSave').addClass('none');
    }else{
        $('#editProduct-editProductNoSave').removeClass('none');
    }
}
$('#editProduct-productImgCard').on('click',function(){
    showImgBrowser(texts.products.selectProductImg,'imgBrowser-editProductImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-editProductImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#editProduct-productImgCard').attr('imgId',imgId)
    $('#editProduct-productImgCard').attr('src',imgUrl)
    editProductNoSaveCheck();
});
$(`
    #editProduct-productPrice,
    #editProduct-enName,
    #editProduct-frName,
    #editProduct-deName,
    #editProduct-itName,
    #editProduct-esName,
    #editProduct-arName,
    #editProduct-egName,
    #editProduct-ruName,
    #editProduct-uaName,
    #editProduct_enDescription,
    #editProduct_frDescription,
    #editProduct_deDescription,
    #editProduct_itDescription,
    #editProduct_esDescription,
    #editProduct_arDescription,
    #editProduct_ruDescription,
    #editProduct_uaDescription,
    #editProduct_egDescription
`).on('input change',function(){
    editProductNoSaveCheck();
})
$('#editProduct-productAvailability').on('click',function(){
    editProductNoSaveCheck();
})
$('#editProduct-cancelBtn').on('click',function(){
    setEditProduct($('#editProduct-ProductName').val())
})
$('#editProduct-saveBtn').on('click',function(){

    let productName = $('#editProduct-ProductName').val();
    let productPrice = $('#editProduct-productPrice').val();
    if(productPrice == '' || productPrice == null){productPrice = 0.00;$('#editProduct-productPrice').val('0.00')}
    let productAvailability;
    $('#editProduct-productAvailability').prop('checked') ? productAvailability = 1 : productAvailability = 0;
    let productImg = $('#editProduct-productImgCard').attr('imgId');
    let productSort = products.find(item=> item.name == productName).sort;
    let productCategory;
    let tempCategory = categories.find(item=> item.name == $('#editProduct-productCategory').attr('key'))
    if(typeof(tempCategory) === 'undefined'){productCategory = null}else{
        productCategory = tempCategory.id;
    }
    $('#editProduct-productCategory').attr('key') == 'uncategorized' ? productCategory = null : null;
    let productCategoryChanged;
    productCategory == products.find(item=> item.name == productName).category_id ? productCategoryChanged = false : productCategoryChanged = true;
    if(productCategoryChanged){
        productSort = 0;
        for(const key in products){
            if(products[key].category_id == productCategory){
                if(products[key].sort >= productSort){
                    productSort = parseInt(products[key].sort) + 1;
                }
            }
        }
    }
    let productName_en = $('#editProduct-enName').val();
    let productName_fr = $('#editProduct-frName').val();
    let productName_de = $('#editProduct-deName').val();
    let productName_it = $('#editProduct-itName').val();
    let productName_es = $('#editProduct-esName').val();
    let productName_ar = $('#editProduct-arName').val();
    let productName_ru = $('#editProduct-ruName').val();
    let productName_ua = $('#editProduct-uaName').val();
    let productName_eg = $('#editProduct-egName').val();

    let productDescription_en = $('#editProduct_enDescription').val();
    let productDescription_fr = $('#editProduct_frDescription').val();
    let productDescription_de = $('#editProduct_deDescription').val();
    let productDescription_it = $('#editProduct_itDescription').val();
    let productDescription_es = $('#editProduct_esDescription').val();
    let productDescription_ar = $('#editProduct_arDescription').val();
    let productDescription_ru = $('#editProduct_ruDescription').val();
    let productDescription_ua = $('#editProduct_uaDescription').val();
    let productDescription_eg = $('#editProduct_egDescription').val();

    showBtnLoading($('#editProduct-saveBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            productName:productName,
            editProduct:true,
            sort:productSort,
            price:productPrice,
            availability:productAvailability,
            category_id:productCategory,
            img_id:productImg,
            name_en:productName_en,
            name_ar:productName_ar,
            name_eg:productName_eg,
            name_fr:productName_fr,
            name_it:productName_it,
            name_de:productName_de,
            name_es:productName_es,
            name_ru:productName_ru,
            name_ua:productName_ua,
            description_en:productDescription_en,
            description_ar:productDescription_ar,
            description_eg:productDescription_eg,
            description_fr:productDescription_fr,
            description_it:productDescription_it,
            description_de:productDescription_de,
            description_es:productDescription_es,
            description_ru:productDescription_ru,
            description_ua:productDescription_ua,
        },success:function(r){
            hideBtnLoading($('#editProduct-saveBtn'));
            if(r.editProductStatus == 1){
                r.product.imgUrl = '/storage/imgs/cpanel/noimg.png';
                r.product.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == r.product.img_id){
                        r.product.imgs = imgs[k];
                        r.product.imgUrl = '/storage/'+imgs[k].url;
                        r.product.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
                    }
                });
                for(const key in products){
                    if(products[key].id == r.product.id){
                        products[key] = r.product;
                    }
                }
                if($('#manageProducts-selectCategory').attr('key') != null){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
                window.guideHints.products(products);
                drawTodayHomeProducts();
                showAlert('success',r.msg,4000,true);
                popupPageClose(true);
                editProductNoSaveCheck();
            }else if(r.editProductStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
