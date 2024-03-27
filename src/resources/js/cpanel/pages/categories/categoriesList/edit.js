editCategoriesNoSaveCheck = function(){
    let editCategories_nosaveCheck = true;
    for(const key in website.categories){
        for(const key2 in website_temp.categories){
            if(website.categories[key].id == website_temp.categories[key2].id){
                if(
                    website.categories[key].img_id == website_temp.categories[key2].img_id &&
                    JSON.stringify(website.categories[key].names) == JSON.stringify(website_temp.categories[key2].names) &&
                    JSON.stringify(website.categories[key].descriptions) == JSON.stringify(website_temp.categories[key2].descriptions)
                ){
                    $(`.editCategoryNoSave_${website.categories[key].name}`).addClass('none')
                }else{
                    editCategories_nosaveCheck = false;
                    $(`.editCategoryNoSave_${website.categories[key].name}`).removeClass('none')
                }
            }
        }
    }
    if(editCategories_nosaveCheck){
        $('.categoryListNoSave').addClass('none')
        return true;
    }else{
        $('.categoryListNoSave').removeClass('none')
        return false;
    }
}
$('html,body').on('click','#editCategory_img',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.products.selectCategoryImg,'imgBrowser-editCatImg');
});
$('html,body').on('click','.imgBrowser-editCatImg',function(e){
    e.stopImmediatePropagation();
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#editCategory_img').attr('imgId',imgId)
    $('#editCategory_img').attr('src',imgUrl)
    website_temp.categories.find(item=> item.name == window.history.state.category).img_id = imgId;
    website_temp.categories.find(item=> item.name == window.history.state.category).img = imgUrl;
    category_list_unsave_check();
});

$('html,body').on('input change','.editCategoryNamesInputText',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.categories){
        if(website_temp.categories[key].name == window.history.state.category){
            for(const key2 in website.languages){
                let lang = website.languages[key2];
                website_temp.categories[key].names[lang.code] = $(`#editCategory_categoryName_${lang.code}`).val();
            }
        }
    }
    category_list_unsave_check();
});
$('html,body').on('input change','.editCateogryDescriptionsTextarea',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.categories){
        if(website_temp.categories[key].name == window.history.state.category){
            for(const key2 in website.languages){
                let lang = website.languages[key2];
                website_temp.categories[key].descriptions[lang.code] = $(`#editCateogry_description_${lang.code}`).val();
            }
        }
    }
    category_list_unsave_check();
});


$('html,body').on('click','#editCategory_cancelBtn',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.categories){
        if(website_temp.categories[key].name == window.history.state.category){
            website_temp.categories[key] = JSON.parse(JSON.stringify(website.categories.find(item=>item.name == window.history.state.category)))
        }
    }
    popupPageClose(true)
    category_list_unsave_check();

})
$('html,body').on('click','#editCategory_saveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let categoryName =$('#editCategory_categoryName').val();
    let category = website.categories.find(item=>item.name == categoryName);
    if(typeof(category) === 'undefined'){return}
    let categoryImg = $('#editCategory_img').attr('imgId');
    if(categoryImg == ''){categoryImg = null;}
    let categoryNames = {};
    let categoryDescriptions = {};
    for(const key in website.languages){
        let lang = website.languages[key];
        categoryNames[lang.code] = $(`#editCategory_categoryName_${lang.code}`).val();
        categoryDescriptions[lang.code] = $(`#editCateogry_description_${lang.code}`).val();
    }
    showBtnLoading($('#editCategory_saveBtn'));
    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editCategory:category.id,
            categoryName:categoryName,
            categoryImg:categoryImg,
            categoryNames:categoryNames,
            categoryDescriptions:categoryDescriptions,
        },success:function(r){
            hideBtnLoading($('#editCategory_saveBtn'));
            if(r.editCategoryStatus == 1){
                website.categories.find(item=>item.id == category.id).names = JSON.parse(JSON.stringify(categoryNames));
                website.categories.find(item=>item.id == category.id).descriptions = JSON.parse(JSON.stringify(categoryDescriptions));
                website.categories.find(item=>item.id == category.id).img_id = categoryImg;
                website.categories.find(item=>item.id == category.id).img = r.img;

                website_temp.categories.find(item=>item.id == category.id).names = JSON.parse(JSON.stringify(categoryNames));
                website_temp.categories.find(item=>item.id == category.id).descriptions = JSON.parse(JSON.stringify(categoryDescriptions));
                website_temp.categories.find(item=>item.id == category.id).img_id = categoryImg;
                website_temp.categories.find(item=>item.id == category.id).img = r.img;

                drawCategoryList();
                window.guideHints.categories();
                showAlert('success',r.msg,4000,true);
                popupPageClose(true);
                category_list_unsave_check();
            }else if(r.editCategoryStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    });
})
