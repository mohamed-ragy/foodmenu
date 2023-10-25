

editProductsNoSaveCheck = function(){
    editProductsCheck = true;
    let unsavedProdsCats = [];
    for(const key in website.products){
        let product1 = website.products[key];
        let product2 = website_temp.products.find(item=>item.id == product1.id);
        let category_key = 'uncategorized';
        if(product1.category_id != null){category_key = website.categories.find(item=> item.id == product1.category_id).name}
        $('#manageProducts-selectCategoryList').find(`.inputListElement[key="${category_key}"]`).find('.inputListElement_unsaved').addClass('none')
        if(
            product1.availability == product2.availability &&
            product1.price == product2.price &&
            product1.category_id == product2.category_id &&
            product1.img_id == product2.img_id &&
            JSON.stringify(product1.names) == JSON.stringify(product2.names) &&
            JSON.stringify(product1.descriptions) == JSON.stringify(product2.descriptions)
        ){
            $(`.editProductNoSave_${product1.name}`).addClass('none')
        }else{
            $(`.editProductNoSave_${product1.name}`).removeClass('none')
            unsavedProdsCats.push(category_key)
            editProductsCheck = false;
        }
    }

    for(const key in unsavedProdsCats){
        $('#manageProducts-selectCategoryList').find(`.inputListElement[key="${unsavedProdsCats[key]}"]`).find('.inputListElement_unsaved').removeClass('none')
    }
    if(editProductsCheck){
        $('#manageProducts-selectCategory').closest('.inputListContainer').find('.inputList_unsaved').addClass('none')
        return true;
    }else{
        $('#manageProducts-selectCategory').closest('.inputListContainer').find('.inputList_unsaved').removeClass('none')
        return false;
    }
}
$('html,body').on('click','#editProduct_productAvailability',function(e){
    e.stopImmediatePropagation();
    $(this).prop('checked') ? website_temp.products.find(item=>item.name == window.history.state.product).availability = 1 :
    website_temp.products.find(item=>item.name == window.history.state.product).availability = 0;
    manage_products_unsave_check();
})
$('html,body').on('input change','#editProduct_productPrice',function(e){
    e.stopImmediatePropagation();
    website_temp.products.find(item=>item.name == window.history.state.product).price = $(this).val() == '' || $(this).val() == null ? '0.00':$(this).val();
    manage_products_unsave_check();
})
$('html,body').on('click','#editProduct_productCategoryList .inputListElement',function(e){
    website_temp.products.find(item=>item.name == window.history.state.product).category_id = $(this).attr('key') == 'uncategorized' ? null : website.categories.find(item=>item.name == $(this).attr('key')).id;
    manage_products_unsave_check();
})
$('html,body').on('click','#editProduct_img',function(e){
    e.stopImmediatePropagation();
    showImgBrowser(texts.products.selectProductImg,'imgBrowser_editProductImg');
});
$('html,body').on('click','.imgBrowser_editProductImg',function(){
    closePopup();
    let imgId = $(this).attr('imgId')
    let imgUrl = $(this).attr('src');
    $('#editProduct_img').attr('imgId',imgId)
    $('#editProduct_img').attr('src',imgUrl)
    website_temp.products.find(item=> item.name == window.history.state.product).img_id = imgId;
    website_temp.products.find(item=> item.name == window.history.state.product).imgUrl = '/storage/imgs/cpanel/noimg.png';
    website_temp.products.find(item=> item.name == window.history.state.product).imgUrl_thumbnail = '/storage/imgs/cpanel/noimg.png';
    Object.keys(imgs).some(function(k) {
        if(imgs[k].id ==  website_temp.products.find(item=> item.name == window.history.state.product).img_id){
            website_temp.products.find(item=> item.name == window.history.state.product).imgs = imgs[k];
            website_temp.products.find(item=> item.name == window.history.state.product).imgUrl = '/storage/'+imgs[k].url;
            website_temp.products.find(item=> item.name == window.history.state.product).imgUrl_thumbnail = '/storage/'+imgs[k].thumbnailUrl;
        }
    });
    manage_products_unsave_check();
});
$('html,body').on('input change','.editProductNamesInputText',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.products){
        if(website_temp.products[key].name == window.history.state.product){
            for(const key2 in website.languages){
                let lang = website.languages[key2];
                website_temp.products[key].names[lang.code] = $(`#editProduct_productName_${lang.code}`).val();
            }
        }
    }
    manage_products_unsave_check();
})
$('html,body').on('input change','.editProductDescriptionsTextarea',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.products){
        if(website_temp.products[key].name == window.history.state.product){
            for(const key2 in website.languages){
                let lang = website.languages[key2];
                website_temp.products[key].descriptions[lang.code] = $(`#editproduct_description_${lang.code}`).val();
            }
        }
    }
    manage_products_unsave_check();
})
$('html,body').on('click','#editProduct_cancel',function(e){
    e.stopImmediatePropagation();
    for(const key in website_temp.products){
        if(website_temp.products[key].name == window.history.state.product){
            website_temp.products[key] = JSON.parse(JSON.stringify(website.products.find(item=>item.name == window.history.state.product)))
        }
    }
    popupPageClose(true)
    manage_products_unsave_check();
})

$('html,body').on('click','#editProduct_save',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#editProduct_save'));
    let product = website_temp.products.find(item=>item.name == window.history.state.product);
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProduct:true,
            id:product.id,
            name:product.name,
            price:product.price,
            availability:product.availability,
            category_id:product.category_id,
            img_id:product.img_id,
            names:product.names,
            descriptions:product.descriptions,
        },success:function(r){
            hideBtnLoading($('#editProduct_save'));
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
                r.product.product_options = JSON.parse(JSON.stringify(website.products.find(item=>item.id == r.product.id).product_options))
                for(const key in website.products){
                    if(website.products[key].id == r.product.id){
                        website.products[key] = JSON.parse(JSON.stringify(r.product));
                    }
                }
                for(const key in website_temp.products){
                    if(website_temp.products[key].id == r.product.id){
                        website_temp.products[key] = JSON.parse(JSON.stringify(r.product));
                    }
                }
                if(window.history.state.page == 'manage_products' && window.history.state.category != null){
                    drawManageProductCards(window.history.state.category)
                }
                window.guideHints.products(website.products);
                showAlert('success',r.msg,4000,true);
                popupPageClose(true);
                manage_products_unsave_check();
            }else if(r.editProductStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })

})
