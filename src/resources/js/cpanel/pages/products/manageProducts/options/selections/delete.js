$('#editOption-optionSelectionsContainer').on('click','.selectionCardIconDelete',function(e){
    e.stopImmediatePropagation();
    let product_id = $(this).closest('.selectionCardContainer').attr('productId');
    let product = website.products.find(item => item.id == product_id);
    if(typeof(product) == 'undefined'){return;}
    let option_id = $(this).closest('.selectionCardContainer').attr('optionId');
    let option = product.product_options.find(item=> item.id == option_id);
    if(typeof(option) == 'undefined'){return}
    let selection_id = $(this).closest('.selectionCardContainer').attr('selectionId');
    let selection = option.product_option_selections.find(item=> item.id == selection_id);
    if(typeof(selection) == 'undefined'){return}
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',html:`${texts.products.selectionDeleteConfirm1} <b>${selection.name}</b> ${texts.products.selectionDeleteConfirm2} <b>${option.name}</b> ${texts.products.selectionDeleteConfirm3}?`}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteSelection-confirmBtn',productId:product_id,optionId:option_id,selectionId:selection_id,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))


})

$('html,body').on('click','#deleteSelection-confirmBtn',function(){
    let product_id = $(this).attr('productId');
    let product = website.products.find(item=> item.id == product_id);
    console.log(product)
    if(typeof(product) == 'undefined'){return;}
    let option_id = $(this).attr('optionId');
    let selection_id = $(this).attr('selectionId');
    let option = product.product_options.find(item=>item.id == option_id);
    if(typeof(option) === 'undefined'){return;}
    let selection = option.product_option_selections.find(item=>item.id == selection_id);
    if(typeof(selection) === 'undefined'){return;}
    showBtnLoading($('#deleteSelection-confirmBtn'));
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteProductSelection:true,
            product_id:product_id,
            product_name:product.name,
            option_id:option_id,
            option_name:option.name,
            selection_id:selection_id,
            selection_name:selection.name,
        },success:function(r){
            hideBtnLoading($('#deleteSelection-confirmBtn'));
            if(r.delteProductSelectionStat == 1){
                for(const key in website.products){
                    if(website.products[key].id == product_id){
                        for(const key2 in website.products[key].product_options){
                            if(website.products[key].product_options[key2].id == option_id){
                                for(const key3 in website.products[key].product_options[key2].product_option_selections){
                                    if(website.products[key].product_options[key2].product_option_selections[key3].id == selection_id){
                                        website.products[key].product_options[key2].product_option_selections.splice(key3,1);
                                        closePopup();
                                        if($('#editOption-createNewSelection').attr('productId') == website.products[key].id && $('#editOption-createNewSelection').attr('optionId') == website.products[key].product_options[key2].id){
                                            setManageSelections(product_id,option_id);
                                        }
                                        window.guideHints.products(website.products);
                                    }
                                }
                            }
                        }
                    }
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.delteProductSelectionStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
