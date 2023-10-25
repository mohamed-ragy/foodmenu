$('html,body').on('click','.categoryCardDelete',function(e){
    e.stopImmediatePropagation();
    let category = website.categories.find(item=> item.id == $(this).attr('category'));
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.products.categoryDeleteConfirm.replace(':category:',category.name)})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteCategory-confirmBtn',category:category.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#deleteCategory-confirmBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#deleteCategory-confirmBtn'));
    let categoryId = $(this).attr('category')
    let categoryName = website.categories.find(item=> item.id == categoryId).name;
    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteCategory:true,
            categoryId:categoryId,
            categoryName:categoryName,
        },success:function(r){
            hideBtnLoading($('#deleteCategory-confirmBtn'))
            if(r.deleteCategoryStatus == 1 ){
                for(const key in website.categories){
                    category = website.categories[key];
                    if(category.id == categoryId){
                        website.categories.splice(key,1)
                    }
                }
                for(const key in website_temp.categories){
                    category = website_temp.categories[key];
                    if(category.id == categoryId){
                        website_temp.categories.splice(key,1)
                    }
                }
                for(const key in website.products){
                    if(website.products[key].category_id == categoryId){
                        website.products[key].category_id = null;
                    }
                }
                for(const key in website_temp.products){
                    if(website_temp.products[key].category_id == categoryId){
                        website_temp.products[key].category_id = null;
                    }
                }
                drawCategoryList();
                closePopup();
                showAlert('success',r.msg,4000,true);
                window.guideHints.categories(website.categories);
            }else if(r.deleteCategoryStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
