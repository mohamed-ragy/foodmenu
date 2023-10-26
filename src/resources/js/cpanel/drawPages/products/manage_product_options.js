drawPopupPage_manage_product_options = function(product_name){
    let product = website.products.find(item=>item.name == product_name);
    $('#popupPageTitle').text('').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`manageProductOptionsNoSave_${product.name} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.manage_product_options}),
        $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 p20').append(
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'edit_product',product:product.name,text:texts.products.editProduct}),
        ),
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<img/>',{class:'h40 w40 br5 ofCover',src:product.imgUrl_thumbnail}),
            $('<div/>',{class:'fs102 bold500 mis-5',text:product.name}),
        ),
        $('<div/>',{class:'btnContainer'}).append(
            $('<button/>',{class:'btn btn-cancel',id:'createNewProductOption',text:texts.products.addOption})
        ),
        $('<div/>',{id:'productOptionsContainer',class:'mT20 w600 mxw100p'})
    )
    product.product_options.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    });
    for(const key in product.product_options){
        const option = product.product_options[key];
        $('#productOptionsContainer').append(
            $('<div/>',{class:'productOptionContainer productOptionContainer_expand',option:option.id}).append(
                $('<div/>',{
                    class:'optionCardMoveContainer'
                }).append(
                    $('<div/>',{class:'optionCardMove ico-move fs09 zx10 cursorMove m2',tooltip:texts.cpanel.public.swap}),
                ),
                $('<div/>',{class:'productOptionContainerHead'}).append(
                    $('<div/>',{class:'bold500 fs101 productOptionContainerExpandIcon grow1 pointer',text:option.name}),
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:'optionHeadBtn ico-plus productOptionAddSelection fs09',tooltip:texts.products.addOptionSelection}),
                        $('<div/>',{class:'optionHeadBtn ico-edit productOptionEdit',tooltip:texts.cpanel.public.edit}),
                        $('<div/>',{class:'optionHeadBtn ico-delete fs101 productOptionDelete',tooltip:texts.cpanel.public.delete}),
                        // $('<div/>',{class:'optionHeadBtn ico-down productOptionContainerExpandIcon'}),

                    )
                ),
                $('<div/>',{class:`w100p productOptionsSelectionsContainer-${option.id}`})
            )
        )

        for(const key in option.product_option_selections){
            const selection = option.product_option_selections[key];
            $(`.productOptionsSelectionsContainer-${option.id}`).append(
                $('<div/>',{class:'productOptionSelectionContainer'}).append(
                    $('<div/>',{
                        class:'selectionCardMoveContainer'
                    }).append(
                        $('<div/>',{class:'selectionCardMove ico-move fs09 zx10 cursorMove m2',tooltip:texts.cpanel.public.swap}),
                    ),
                    $('<div/>',{class:'fs09',text:selection.name}),
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:`selectionHeadBtn productOptionSelectionSetDefault`}).append(
                            $('<div/>',{class:'loading_s none'}),
                            $('<div/>',{class:`${selection.isDefault?'ico-check1':'ico-check0'}`,tooltip:texts.products.setAsdefaultSelection})
                        ),
                        $('<div/>',{class:'selectionHeadBtn ico-edit productOptionSelectionEdit',tooltip:texts.cpanel.public.edit}),
                        $('<div/>',{class:'selectionHeadBtn ico-delete fs101 productOptionSelectionDelete',tooltip:texts.cpanel.public.delete}),

                    )
                )
            )
        }
    }
}


//
