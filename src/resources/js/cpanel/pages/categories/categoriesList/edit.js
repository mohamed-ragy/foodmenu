setEditCategory = function(categoryName){
    let category = categories.find(item=> item.name == categoryName);
    $('#editCategoryContainer').removeClass('none');
    $('#editCategoryNotFound').addClass('none');
    if (typeof(category) === "undefined"){
        // popupPageClose(false);
        $('#editCategoryContainer').addClass('none');
        $('#editCategoryNotFound').removeClass('none');

        return;
    }
    $('#editCategory-categoryName').val(category.name)
    $('#editCategory-categoryImgCard').attr('imgId',category.img_id).attr('src',category.imgUrl)
    $('#editCategory-enName').val(category.name_en)
    $('#editCategory-frName').val(category.name_fr)
    $('#editCategory-deName').val(category.name_de)
    $('#editCategory-itName').val(category.name_it)
    $('#editCategory-esName').val(category.name_es)
    $('#editCategory-arName').val(category.name_ar)
    $('#editCategory-egName').val(category.name_eg)
    $('#editCategory-ruName').val(category.name_ru)
    $('#editCategory-uaName').val(category.name_ua)

    $('#editCategory_enDescription').val(category.description_en)
    $('#editCategory_frDescription').val(category.description_fr)
    $('#editCategory_deDescription').val(category.description_de)
    $('#editCategory_itDescription').val(category.description_it)
    $('#editCategory_esDescription').val(category.description_es)
    $('#editCategory_arDescription').val(category.description_ar)
    $('#editCategory_ruDescription').val(category.description_ru)
    $('#editCategory_uaDescription').val(category.description_ua)
    $('#editCategory_egDescription').val(category.description_eg)
    editCategoryNoSaveCheck();
}
editCategoryNoSaveCheck = function(){
    let category = categories.find(item=> item.name == $('#editCategory-categoryName').val());
    category.name_en == null ? category.name_en = '' : category.name_en = category.name_en;
    category.name_fr == null ? category.name_fr = '' : category.name_fr = category.name_fr;
    category.name_de == null ? category.name_de = '' : category.name_de = category.name_de;
    category.name_it == null ? category.name_it = '' : category.name_it = category.name_it;
    category.name_es == null ? category.name_es = '' : category.name_es = category.name_es;
    category.name_ar == null ? category.name_ar = '' : category.name_ar = category.name_ar;
    category.name_ru == null ? category.name_ru = '' : category.name_ru = category.name_ru;
    category.name_ua == null ? category.name_ua = '' : category.name_ua = category.name_ua;
    category.name_eg == null ? category.name_eg = '' : category.name_eg = category.name_eg;
    category.description_en == null ? category.description_en = '' : category.description_en = category.description_en;
    category.description_fr == null ? category.description_fr = '' : category.description_fr = category.description_fr;
    category.description_de == null ? category.description_de = '' : category.description_de = category.description_de;
    category.description_it == null ? category.description_it = '' : category.description_it = category.description_it;
    category.description_es == null ? category.description_es = '' : category.description_es = category.description_es;
    category.description_ar == null ? category.description_ar = '' : category.description_ar = category.description_ar;
    category.description_eg == null ? category.description_eg = '' : category.description_eg = category.description_eg;
    category.description_ru == null ? category.description_ru = '' : category.description_ru = category.description_ru;
    category.description_ua == null ? category.description_ua = '' : category.description_ua = category.description_ua;
    if(
        $('#editCategory-categoryImgCard').attr('imgId') == category.img_id &&
        $('#editCategory-enName').val() == category.name_en &&
        $('#editCategory-frName').val() == category.name_fr &&
        $('#editCategory-deName').val() == category.name_de &&
        $('#editCategory-itName').val() == category.name_it &&
        $('#editCategory-esName').val() == category.name_es &&
        $('#editCategory-arName').val() == category.name_ar &&
        $('#editCategory-ruName').val() == category.name_ru &&
        $('#editCategory-uaName').val() == category.name_ua &&
        $('#editCategory-egName').val() == category.name_eg &&
        $('#editCategory_enDescription').val() == category.description_en &&
        $('#editCategory_frDescription').val() == category.description_fr &&
        $('#editCategory_deDescription').val() == category.description_de &&
        $('#editCategory_itDescription').val() == category.description_it &&
        $('#editCategory_esDescription').val() == category.description_es &&
        $('#editCategory_arDescription').val() == category.description_ar &&
        $('#editCategory_ruDescription').val() == category.description_ru &&
        $('#editCategory_uaDescription').val() == category.description_ua &&
        $('#editCategory_egDescription').val() == category.description_eg
    ){
        $('#editCategory-editCategoryNoSave').addClass('none');
    }else{
        $('#editCategory-editCategoryNoSave').removeClass('none');
    }
}
$('#editCategory-categoryImgCard').on('click',function(){
    showImgBrowser(texts.categories.selectCategoryImg,'imgBrowser-editCatImg');
});
$('#imgBrowser-popup').on('click','.imgBrowser-editCatImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#editCategory-categoryImgCard').attr('imgId',imgId)
    $('#editCategory-categoryImgCard').attr('src',imgUrl)
    editCategoryNoSaveCheck();
});

$(`
    #editCategory-enName,
    #editCategory-frName,
    #editCategory-deName,
    #editCategory-itName,
    #editCategory-esName,
    #editCategory-arName,
    #editCategory-egName,
    #editCategory-ruName,
    #editCategory-uaName,
    #editCategory_enDescription,
    #editCategory_frDescription,
    #editCategory_deDescription,
    #editCategory_itDescription,
    #editCategory_esDescription,
    #editCategory_arDescription,
    #editCategory_ruDescription,
    #editCategory_uaDescription,
    #editCategory_egDescription
`).on('input change',function(){
    editCategoryNoSaveCheck();
})

$('#editCategory-editCategoryCancelBtn').on('click',function(){
    setEditCategory($('#editCategory-categoryName').val());
})
$('#editCategory-editCategorySaveBtn').on('click',function(){
    showBtnLoading($('#editCategory-editCategorySaveBtn'));
    let categoryName =$('#editCategory-categoryName').val();
    let categoryImg = $('#editCategory-categoryImgCard').attr('imgId');
    let categoryName_en = $('#editCategory-enName').val();
    let categoryName_ar = $('#editCategory-arName').val();
    let categoryName_eg = $('#editCategory-egName').val();
    let categoryName_fr = $('#editCategory-frName').val();
    let categoryName_de = $('#editCategory-deName').val();
    let categoryName_it = $('#editCategory-itName').val();
    let categoryName_es = $('#editCategory-esName').val();
    let categoryName_ru = $('#editCategory-ruName').val();
    let categoryName_ua = $('#editCategory-uaName').val();
    let categoryDescription_en = $('#editCategory_enDescription').val();
    let categoryDescription_ar = $('#editCategory_arDescription').val();
    let categoryDescription_eg = $('#editCategory_egDescription').val();
    let categoryDescription_fr = $('#editCategory_frDescription').val();
    let categoryDescription_de = $('#editCategory_deDescription').val();
    let categoryDescription_it = $('#editCategory_itDescription').val();
    let categoryDescription_es = $('#editCategory_esDescription').val();
    let categoryDescription_ru = $('#editCategory_ruDescription').val();
    let categoryDescription_ua = $('#editCategory_uaDescription').val();

    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editCategory:true,
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
        },success:function(r){
            hideBtnLoading($('#editCategory-editCategorySaveBtn'));
            if(r.editCategoryStatus == 1){
                r.category.imgUrl = '/storage/imgs/cpanel/noimg.png';
                r.category.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == r.category.img_id){
                        r.category.imgs = imgs[k];
                        r.category.imgUrl = '/storage/'+imgs[k].url;
                        r.category.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
                    }
                });
                for(const key in categories){
                    if(categories[key].id == r.category.id){
                        categories[key] = r.category;

                    }
                }
                drawCategoryList();
                window.guideHints.categories(categories);
                showAlert('success',r.msg,4000,true);
                popupPageClose(true);
                editCategoryNoSaveCheck();
            }else if(r.editCategoryStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    });
})
