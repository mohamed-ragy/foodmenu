$('html,body').on('click','.productOptionAddSelection',function(e){
    e.stopImmediatePropagation();
    let product = website.products.find(item=> item.name == window.history.state.product);
    let option = product.product_options.find(item=>item.id == $(this).closest('.productOptionContainer').attr('option'));
    showPopup('createNewProductSelection',function(){
        $('.popupBody').addClass('m0 p10 w100p-20').append(
            $('<div/>',{class:'row alnC jstfyS mB20'}).append(
                $('<img/>',{class:'h40 w40 br5 ofCover',src:product.thumbnail}),
                $('<div/>',{class:'mis-5'}).append(
                    $('<span/>',{class:'fs102 bold500',text:product.name}),
                    $('<span/>',{class:'mis-5',text:`(${option.name})`})
                ),
            ),
            $('<div/>',{class:'',id:'createNewSelectionInputsContainer'}).append(
                drawInputText('','ico-edit','',texts.products.selectionIdentifier,'createSelection_identifier','text',texts.products.selectionIdentifier,200,'clearVal','','',false,''),
                drawInputText('','ico-money','',texts.products.selectionPrice,'createSelection_price','number',texts.products.selectionPrice,200,'clearVal','','',false,'')
            ),
            $('<div/>',{class:'btnContainer mT20'}).append(
                $('<button/>',{class:'btn',id:'createNewSelection_btn',option:option.id}).append(
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create}),
                    $('<div/>',{class:'btnLoading'}),
                )
            )
        );
        for(const key in website.languages){
            const lang = website.languages[key];
            $('#createNewSelectionInputsContainer').append(
                drawInputText('','',lang.flag,texts.products.selectionNameLang.replace(':lang:',lang.name),`createSelection_name-${lang.code}`,'text',texts.products.selectionNameLang.replace(':lang:',lang.name),200,'clearVal','','',false,'')
            )
        }
        $('#createSelection_identifier').focus();
    })
})
$('html,body').on('click','#createNewSelection_btn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let product = website.products.find(item=> item.name == window.history.state.product);
    let option = product.product_options.find(item=>item.id == $(this).attr('option'));
    if($('#createSelection_price').val() == '' || $('#createSelection_price').val() == null){
        $('#createSelection_price').val('0.00')
    }
    let selection_name = $('#createSelection_identifier').val();
    let price = parseFloat($('#createSelection_price').val());
    let selection_names = {};
    for(const key in website.languages){
        const lang = website.languages[key];
        selection_names[lang.code] = $(`#createSelection_name-${lang.code}`).val();
    }
    showBtnLoading($('#createNewSelection_btn'))
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createProductSelection:true,
            product_id:product.id,
            product_name:product.name,
            option_id:option.id,
            option_name:option.name,
            selection_name:selection_name,
            price:price,
            selection_names:selection_names,
        },success:function(r){
            hideBtnLoading($('#createNewSelection_btn'))
            if(r.createProductSelectionStatus == 1){
                website.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).product_option_selections.push(JSON.parse(JSON.stringify(r.selection)))
                website_temp.products.find(item=>item.id == product.id).product_options.find(item=>item.id == option.id).product_option_selections.push(JSON.parse(JSON.stringify(r.selection)))
                if(window.history.state.popupPage == 'manage_product_variants' && window.history.state.product == product.name){
                    drawPopupPage_manage_product_variants(window.history.state.product)
                }
                closePopup();
                showAlert('success',r.msg,4000,true)
                window.guideHints.products();
            }else if(r.createProductSelectionStatus == 0){
                inputTextError($('#createSelection_identifier'));
                showAlert('error',r.msg,4000,true)
            }else if(r.createProductSelectionStatus == 2){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
