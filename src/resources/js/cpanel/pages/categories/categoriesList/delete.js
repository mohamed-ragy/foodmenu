$('html,body').on('click','.categoryCardDelete',function(e){
    e.stopImmediatePropagation();
    let category = categories.find(item=> item.id == $(this).attr('categoryId'));
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',text:texts.categories.categoryDeleteConfirm+' '+category.name+'?'}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteCategory-confirmBtn',categoryId:category.id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))
})
$('html,body').on('click','#deleteCategory-confirmBtn',function(){
    showBtnLoading($('#deleteCategory-confirmBtn'));
    let categoryId = $(this).attr('categoryId')
    let categoryName = categories.find(item=> item.id == categoryId).name;
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
                for(const key in categories){
                    category = categories[key];
                    if(category.id == categoryId){
                        categories.splice(key,1)
                    }
                }
                for(const key in products){
                    if(products[key].category_id == categoryId){
                        products[key].category_id = null;
                    }
                }
                drawCategoryList();
                closePopup();
                showAlert('success',r.msg,4000,true);
                window.guideHints.categories(categories);
            }else if(r.deleteCategoryStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
