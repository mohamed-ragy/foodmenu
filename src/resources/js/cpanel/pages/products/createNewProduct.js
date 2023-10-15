$('#createNewProduct-productImgCard').on('click',function(){
    showImgBrowser(texts.products.selectProductImg,'imgBrowser-createProductImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-createProductImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#createNewProduct-productImgCard').attr('imgId',imgId)
    $('#createNewProduct-productImgCard').attr('src',imgUrl)
});
$('#createNewProduct-createBtn').on('click',function(){
    if($('#createNewProduct-ProductName').val() == '' || $('#createNewProduct-ProductName').val() == null){
        scrollToDiv($('#bodyPage'),$('#createNewProduct-ProductName'))
        inputTextError($('#createNewProduct-ProductName'));
        showAlert('error',texts.products.productNameRequired,4000,true)
        return;
    }
    if(!/^[a-z0-9_-]+$/.test($('#createNewProduct-ProductName').val())){
        scrollToDiv($('#bodyPage'),$('#createNewProduct-ProductName'))
        inputTextError($('#createNewProduct-ProductName'));
        showAlert('error',texts.products.productNameRegex,4000,true)
        return;
    }
    for(const key in products){
        if($('#createNewProduct-ProductName').val() == products[key].name){
            scrollToDiv($('#bodyPage'),$('#createNewProduct-ProductName'))
            inputTextError($('#createNewProduct-ProductName'));
            showAlert('error',texts.products.productNameUnique,4000,true)
            return;
        }
    }
    if(products.length >= window.plans[website.plan].products){
        showAlert('warning',texts.products.createFailPlanLimit,10000,true)
        return;
    }

    let productName = $('#createNewProduct-ProductName').val();
    let productPrice = $('#createNewProduct-productPrice').val();
    if(productPrice == '' || productPrice == null){productPrice = 0.00;$('#createNewProduct-productPrice').val('0.00')}
    let categoryId = null;
    if($('#createNewProduct-productCategory').val() != '' && $('#createNewProduct-productCategory').val() != null){
        if($('#createNewProduct-productCategory').attr('key') == 'uncategorized'){
            categoryId == null;
        }else{
            categoryId = categories.find(item=> item.name == $('#createNewProduct-productCategory').attr('key')).id;
        }
    }
    let productImg = $('#createNewProduct-productImgCard').attr('imgId') ?? null;
    if(productImg == ''){productImg = null}
    let productName_en = $('#createNewProduct-enName').val()
    let productName_fr = $('#createNewProduct-frName').val()
    let productName_de = $('#createNewProduct-deName').val()
    let productName_it = $('#createNewProduct-itName').val()
    let productName_es = $('#createNewProduct-esName').val()
    let productName_ar = $('#createNewProduct-arName').val()
    let productName_ru = $('#createNewProduct-ruName').val()
    let productName_ua = $('#createNewProduct-uaName').val()
    let productName_eg = $('#createNewProduct-egName').val()
    let productDescription_en = $('#createNewProduct_enDescription').val()
    let productDescription_fr = $('#createNewProduct_frDescription').val()
    let productDescription_de = $('#createNewProduct_deDescription').val()
    let productDescription_it = $('#createNewProduct_itDescription').val()
    let productDescription_es = $('#createNewProduct_esDescription').val()
    let productDescription_ar = $('#createNewProduct_arDescription').val()
    let productDescription_ru = $('#createNewProduct_ruDescription').val()
    let productDescription_ua = $('#createNewProduct_uaDescription').val()
    let productDescription_eg = $('#createNewProduct_egDescription').val()
    showBtnLoading($('#createNewProduct-createBtn'));
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
            name_en:productName_en,
            name_fr:productName_fr,
            name_de:productName_de,
            name_it:productName_it,
            name_es:productName_es,
            name_ar:productName_ar,
            name_ru:productName_ru,
            name_ua:productName_ua,
            name_eg:productName_eg,
            description_en:productDescription_en,
            description_fr:productDescription_fr,
            description_de:productDescription_de,
            description_it:productDescription_it,
            description_es:productDescription_es,
            description_ar:productDescription_ar,
            description_ru:productDescription_ru,
            description_ua:productDescription_ua,
            description_eg:productDescription_eg,
        },success:function(r){
            hideBtnLoading($('#createNewProduct-createBtn'));
            if(r.createNewProductStatus == 1){
                showAlert('success',r.msg,4000,true)
                $('#createNewProduct-ProductName').val('');
                $('#createNewProduct-productPrice').val('0.00');
                $('#createNewProduct-productCategory').val('').attr('key',null);
                $('#createNewProduct-productImgCard').attr('imgId',null).attr('src','/storage/imgs/cpanel/noimg.png');
                $('#createNewProduct-enName').val('');
                $('#createNewProduct-frName').val('');
                $('#createNewProduct-deName').val('');
                $('#createNewProduct-itName').val('');
                $('#createNewProduct-esName').val('');
                $('#createNewProduct-arName').val('');
                $('#createNewProduct-ruName').val('');
                $('#createNewProduct-uaName').val('');
                $('#createNewProduct-egName').val('');
                $('#createNewProduct_enDescription').val('');
                $('#createNewProduct_frDescription').val('');
                $('#createNewProduct_deDescription').val('');
                $('#createNewProduct_itDescription').val('');
                $('#createNewProduct_esDescription').val('');
                $('#createNewProduct_arDescription').val('');
                $('#createNewProduct_ruDescription').val('');
                $('#createNewProduct_uaDescription').val('');
                $('#createNewProduct_egDescription').val('');
                r.product.imgUrl = '/storage/imgs/cpanel/noimg.png';
                r.product.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == r.product.img_id){
                        r.product.imgs = imgs[k];
                        r.product.imgUrl = '/storage/'+imgs[k].url;
                        r.product.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
                    }
                });
                products.push(r.product);
                $('#createNewProductOpen').attr('product',r.product.name).trigger('click');

                window.guideHints.products(products);
                drawProductsInputLists();
                drawTodayHomeProducts();
                drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
            }else if(r.createNewProductStatus == 0){
                scrollToDiv($('#bodyPage'),$('#createNewProduct-ProductName'))
                inputTextError($('#createNewProduct-ProductName'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createNewProductStatus == 2){
                showAlert('error',r.msg,4000,true)
            }else if(r.createNewProductStatus == 3){
                showAlert('warning',r.msg,10000,true)
            }
        }
    })

})
