
$('html,body').on('click','#createCategory_img',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.products.selectCategoryImg,'imgBrowser-createCatImg');
});
$('html,body').on('click','.imgBrowser-createCatImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#createCategory_img').attr('imgId',imgId)
    $('#createCategory_img').attr('src',imgUrl)
});

$('html,body').on('click','#createCategoryBtn',function(e){
    e.stopImmediatePropagation();
    let categoryName =$('#createCategory_categoryName').val();
    let categoryImg = $('#createCategory_img').attr('imgId') ?? null;
    if(categoryImg == ''){categoryImg = null;}
    let categoryNames = {};
    let categoryDescriptions = {};
    for(const key in website.languages){
        let lang = website.languages[key];
        categoryNames[lang.code] = $(`#createCategory_categoryName_${lang.code}`).val();
        categoryDescriptions[lang.code] = $(`#createCateogry_description_${lang.code}`).val();
    }
    showBtnLoading($('#createCategoryBtn'));
    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewCategory:true,
            categoryName:categoryName,
            categoryImg:categoryImg,
            categoryNames:categoryNames,
            categoryDescriptions:categoryDescriptions,
        },success:function(response){
            hideBtnLoading($('#createCategoryBtn'));
            if(response.createNewCategoryStatus == 1){
                showAlert('success',response.msg,4000,true);
                response.category.imgUrl = '/storage/imgs/cpanel/noimg.png';
                response.category.imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
                Object.keys(imgs).some(function(k) {
                    if(imgs[k].id == response.category.img_id){
                        response.category.imgs = imgs[k];
                        response.category.imgUrl = '/storage/'+imgs[k].url;
                        response.category.imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
                    }
                });
                website.categories.push(JSON.parse(JSON.stringify(response.category)));
                website_temp.categories.push(JSON.parse(JSON.stringify(response.category)));
                drawCategoryList();
                popupPageClose();
                window.guideHints.categories(website.categories);
            }else if(response.createNewCategoryStatus == 0){
                showAlert('error',response.msg,4000,true);
            }else if(response.createNewCategoryStatus == 3){
                showAlert('warning',response.msg,10000,true);
            }else if(response.createNewCategoryStatus == 2){
                inputTextError($('#createCategory_categoryName'));
                showAlert('error',response.error.categoryName[0],4000,true);
            }else if(response.createNewCategoryStatus == 4 ||response.createNewCategoryStatus == 5){
                showAlert('error',response.msg,4000,true);
                inputTextError($('#createCategory_categoryName'));
            }
        }
    });
});

