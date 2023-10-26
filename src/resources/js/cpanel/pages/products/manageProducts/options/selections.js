

require('./selections/create.js')//done
require('./selections/setDefault.js')//done
require('./selections/delete.js')//done
require('./selections/sort.js')//done
require('./selections/edit.js')//done


$('#editProductOptions-optionsContainer').on('click','.productOptionCardIconManage',function(e){
    e.stopImmediatePropagation();
    $('.productOptionCardContainer').removeClass('productOptionCardContainer_managing')
    $(this).closest('.productOptionCardContainer').addClass('productOptionCardContainer_managing')
    setManageSelections($(this).closest('.productOptionCardContainer').attr('productId'),$(this).closest('.productOptionCardContainer').attr('optionId'))
    scrollToDiv($('#popupPageBody'),$('#editOption-container'))
})
$('#editOption-closeArea').on('click',function(){
    $('.productOptionCardContainer').removeClass('productOptionCardContainer_managing')
    $('#editOption-container').addClass('none')
})
setManageSelections = function(productId,optionId){
    let option = website.products.find(item=> item.id == productId).product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){return;}
    for(const key in website.products){
        if(website.products[key].id == productId){
            for(const key2 in website.products[key].product_options){
                if(website.products[key].product_options[key2].id == optionId){
                    website.products[key].product_options[key2].product_option_selections.sort((a,b)=>{
                        return parseInt(a.sort - b.sort);
                    })
                }
            }
        }
    }
    $('#editOption-container').removeClass('none');
    $('#editOption-createNewSelection').attr('productId',productId).attr('optionId',optionId)
    $('#editOption-optionSelectionsContainer').text('').append(
        $('<div/>',{
            class:'selectionsOptionCard',
            productId:productId,
            optionId:optionId,
        }).append(
            $('<div/>',{text:option.name,class:'fs102 mX10'}),
            $('<div/>',{class:'ico-edit productOptionCardIcon productOptionCardIconEdit mX5',tooltip:texts.cpanel.public.edit})
        )
    )
    for(const key in option.product_option_selections){
        let selection = option.product_option_selections[key];
        let selectionDefaultClass = 'ico-check0';
        if(selection.isDefault == true){selectionDefaultClass = 'ico-check1'}
        $('#editOption-optionSelectionsContainer').append(
            $('<div/>',{
                class:'selectionCardContainer',
                productId:productId,
                optionId:optionId,
                selectionId:selection.id,
            }).append(
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>',{class:'ico-move fs102 selectionCardMoveIcon mX3',selectionId:selection.id,tooltip:texts.cpanel.public.swap}),
                    $('<div/>',{class:'loading_s mX2 selectionCardMoveLoading none'}),
                    $('<div/>',{text:selection.name,class:'fs102 mX5'})
                ),
                $('<div/>',{class:'productOptionCardIconsContainer m0'}).append(
                    $('<div/>',{class:'loading_s selectionCardIconDefaultLoading mX13 none'}),
                    $('<div/>',{class:'selectionCardIcon selectionCardIconDefault fs102 mX5 '+selectionDefaultClass,tooltip:texts.products.setAsdefaultSelection}),
                    $('<div/>',{class:'selectionCardIcon selectionCardIconEdit ico-edit',tooltip:texts.cpanel.public.edit}),
                    $('<div/>',{class:'selectionCardIcon selectionCardIconDelete ico-delete',tooltip:texts.cpanel.public.delete}),
                )
            )
        )
    }

}
