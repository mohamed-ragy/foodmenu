
$('#createCategory-categoryImgCard').on('click',function(){
    showImgBrowser(texts.categories.selectCategoryImg,'imgBrowser-createCatImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-createCatImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#createCategory-categoryImgCard').attr('imgId',imgId)
    $('#createCategory-categoryImgCard').attr('src',imgUrl)
});

$('#createCategory-createBtn').on('click',function(){
    if($('#createCategory-categoryName').val() == '' || $('#createCategory-categoryName').val() == null){
        scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
        inputTextError($('#createCategory-categoryName'));
        showAlert('error',texts.categories.categoryNameRequired,4000,true)
        return;
    }
    if(!/^[a-z0-9_-]+$/.test($('#createCategory-categoryName').val())){
        scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
        inputTextError($('#createCategory-categoryName'));
        showAlert('error',texts.categories.categoryNameRegex,4000,true)
        return;
    }
    for(const key in categories){
        if(categories[key].name == $('#createCategory-categoryName').val()){
            scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
            inputTextError($('#createCategory-categoryName'));
            showAlert('error',texts.categories.categoryNameUnique,4000,true)
            return;
        }
    }
    if(
        $('#createCategory-categoryName').val() == 'privacypolicy' ||
        $('#createCategory-categoryName').val() == 'home' ||
        $('#createCategory-categoryName').val() == 'aboutus' ||
        $('#createCategory-categoryName').val() == 'profile' ||
        $('#createCategory-categoryName').val() == 'allproducts'
    ){
        scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
        inputTextError($('#createCategory-categoryName'));
        showAlert('error',texts.categories.categoryNameNotAllowed,4000,true)
        return;
    }
    if(categories.length >= window.plans[website.plan].categories){
        showAlert('warning',texts.categories.createFailPlanLimit,10000,true)
        return;
    }
    let categoryName =$('#createCategory-categoryName').val();
    let categoryImg = $('#createCategory-categoryImgCard').attr('imgId') ?? null;
    if(categoryImg == ''){categoryImg = null;}
    let categoryName_en = $('#createCategory-enName').val();
    let categoryName_ar = $('#createCategory-arName').val();
    let categoryName_eg = $('#createCategory-egName').val();
    let categoryName_fr = $('#createCategory-frName').val();
    let categoryName_de = $('#createCategory-deName').val();
    let categoryName_it = $('#createCategory-itName').val();
    let categoryName_es = $('#createCategory-esName').val();
    let categoryName_ru = $('#createCategory-ruName').val();
    let categoryName_ua = $('#createCategory-uaName').val();
    let categoryDescription_en = $('#createCategory_enDescription').val();
    let categoryDescription_ar = $('#createCategory_arDescription').val();
    let categoryDescription_eg = $('#createCategory_egDescription').val();
    let categoryDescription_fr = $('#createCategory_frDescription').val();
    let categoryDescription_de = $('#createCategory_deDescription').val();
    let categoryDescription_it = $('#createCategory_itDescription').val();
    let categoryDescription_es = $('#createCategory_esDescription').val();
    let categoryDescription_ru = $('#createCategory_ruDescription').val();
    let categoryDescription_ua = $('#createCategory_uaDescription').val();
    showBtnLoading($('#createCategory-createBtn'));
    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewCategory:true,
            categoryName:categoryName,
            categoryImg:categoryImg,
            categoryName_en:categoryName_en,
            categoryName_ar:categoryName_ar,
            categoryName_eg:categoryName_eg,
            categoryName_fr:categoryName_fr,
            categoryName_de:categoryName_de,
            categoryName_it:categoryName_it,
            categoryName_es:categoryName_es,
            categoryName_ru:categoryName_ru,
            categoryName_ua:categoryName_ua,
            categoryDescription_en:categoryDescription_en,
            categoryDescription_ar:categoryDescription_ar,
            categoryDescription_eg:categoryDescription_eg,
            categoryDescription_fr:categoryDescription_fr,
            categoryDescription_de:categoryDescription_de,
            categoryDescription_it:categoryDescription_it,
            categoryDescription_es:categoryDescription_es,
            categoryDescription_ru:categoryDescription_ru,
            categoryDescription_ua:categoryDescription_ua,

        },success:function(response){
            hideBtnLoading($('#createCategory-createBtn'));
            if(response.createNewCategoryStatus == 1){
                showAlert('success',response.msg,4000,true);
                $('#createCategory-categoryName').val('');
                $('#createCategory-categoryImgId').val('');
                $('#createCategory-categoryImgCard').attr('imgId',null).attr('src','/storage/imgs/cpanel/noimg.png');
                $('#createCategory-enName').val('');
                $('#createCategory-arName').val('');
                $('#createCategory-egName').val('');
                $('#createCategory-frName').val('');
                $('#createCategory-deName').val('');
                $('#createCategory-itName').val('');
                $('#createCategory-esName').val('');
                $('#createCategory-ruName').val('');
                $('#createCategory-uaName').val('');
                $('#createCategory_enDescription').val('');
                $('#createCategory_arDescription').val('');
                $('#createCategory_egDescription').val('');
                $('#createCategory_frDescription').val('');
                $('#createCategory_deDescription').val('');
                $('#createCategory_itDescription').val('');
                $('#createCategory_esDescription').val('');
                $('#createCategory_ruDescription').val('');
                $('#createCategory_uaDescription').val('');
                response.category.imgUrl = '/storage/imgs/cpanel/noimg.png';
                response.category.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == response.category.img_id){
                        response.category.imgs = imgs[k];
                        response.category.imgUrl = '/storage/'+imgs[k].url;
                        response.category.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
                    }
                });
                categories.push(response.category);
                drawCategoryList();
                popupPageClose();
                window.guideHints.categories(categories);
            }else if(response.createNewCategoryStatus == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.createNewCategoryStatus == 3){
                showAlert('warning',response.msg,10000,true);
            }else if(response.createNewCategoryStatus == 2){
                scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
                inputTextError($('#createCategory-categoryName'));
                showAlert('error',response.error.categoryName[0],4000,true);
            }else if(response.createNewCategoryStatus == 4 ||response.createNewCategoryStatus == 5){
                showAlert('error',response.msg,4000,true);
                scrollToDiv($('#bodyPage'),$('#createCategory-categoryName'))
                inputTextError($('#createCategory-categoryName'));
            }
        }
    });
});

