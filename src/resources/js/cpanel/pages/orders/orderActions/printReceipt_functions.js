getReceiptTxts = function(receiptLanguage){
    return new Promise((resolve,reject)=>{
        if(window.receiptTxt == null){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    getLangTexts:receiptLanguage,

                },success:function(response){
                    window.receiptTxt = response.text.receipt;
                    resolve(window.receiptTxt);
                }
            })
        }else{
            resolve(window.receiptTxt);
        }
    })
}
printOrderReceipt = function(order_id){
    getOrder(order_id).then(function(order){
        let direction;
        let receiptDate = getDate(order.placed_at).date_time_weekday.restaurant;
        let receiptLanguage;
        for(const key in website.languages){
            if(website.languages[key].receiptDefault == true){
                receiptLanguage = website.languages[key].code;
                direction = website.languages[key].direction;
            }
        }
        let receiptCurrency = website.currencies[receiptLanguage];
        let receiptRestaurantName = website.websiteNames[receiptLanguage] != '' && website.websiteNames[receiptLanguage] != null ? website.websiteNames[receiptLanguage] : website.domainName;
        let receiptAddress = website.addresses[receiptLanguage];

        getReceiptTxts(receiptLanguage).then(function(receiptTxt){
            let receiptPhoneNumbers = `<div class="fs08 mX5">`;
            for(const key in website.phoneNumbers){
                receiptPhoneNumbers = receiptPhoneNumbers + `<div>${receiptTxt.tel} ${website.phoneNumbers[key]}</div>`
            }
            receiptPhoneNumbers = receiptPhoneNumbers + `</div>`
            let orderType = ''
            if(order.type == 0){orderType = 'delivery' }
            else if(order.type == 1){orderType = 'pickup' }
            else if(order.type == 2){orderType = 'dineIn' }
            let paymentMethod = ``;
            if(order.paymentMethod != null){
                paymentMethod = $('<div/>',{class:'w100p-10 mX3 mT2 taS fs08',text:receiptTxt[order.paymentMethod]});
            }
            let itemsContainer;
            ///
            let discount = '';
            let itemsTotal = '';
            if(parseFloat(order.discount) > 0){
                discount = $('<div/>',{class:'w100p-10 mX3 mT3 row alnC jstfySB'}).append(
                    $('<div/>',{class:'fs08',text:receiptTxt.discount}),
                    $('<div/>',{class:'fs08',text:bigInt(order.discount)+'%'})
                );
                itemsTotal = $('<div/>',{class:'w100p-10 mX3 mT3 bold row alnC jstfySB '}).append(
                    $('<div/>',{class:'fs08',text:receiptTxt.subTotal}),
                    $('<div/>',{class:'fs08 taE'}).append(
                        $('<div/>',{text:bigFloat(order.itemsTotal),class:'lThrough'}),
                        $('<div/>',{text:bigFloat(order.discount_itemsTotal)})
                    )
                );
            }else{
                itemsTotal = $('<div/>',{class:'w100p-10 mX3 mT3 bold row alnC jstfySB '}).append(
                    $('<div/>',{class:'fs08',text:receiptTxt.subTotal}),
                    $('<div/>',{class:'fs08',text:bigFloat(order.discount_itemsTotal)})
                );
            }
            ///
            let orderTax='';
            if(parseFloat(order.tax) > 0){
                let taxPercentage = '';
                if(parseFloat(order.taxPercent) > 0){
                    taxPercentage = $('<span/>',{class:'fs07',text:' '+bigFloat(order.taxPercent)+'%'})
                }
                orderTax = $('<div/>',{class:'w100p-10 mX3 mT3 row alnC jstfySB'}).append(
                    $('<div/>',{}).append(
                        $('<span/>',{class:'fs08',text:receiptTxt.tax}),
                        taxPercentage,
                    ),
                    $('<div/>',{class:'fs08',text:bigFloat(order.tax)})
                )
            }
            ////
            let orderService='';
            if(parseFloat(order.service) > 0){
                let servicePercentage = '';
                if(parseFloat(order.servicePercent) > 0){
                    servicePercentage = $('<span/>',{class:'fs07',text:' '+bigFloat(order.servicePercent)+'%'})
                }
                orderService = $('<div/>',{class:'w100p-10 mX3 mT3 row alnC jstfySB'}).append(
                    $('<div/>',{}).append(
                        $('<span/>',{class:'fs08',text:receiptTxt.service}),
                        servicePercentage,
                    ),
                    $('<div/>',{class:'fs08',text:bigFloat(order.service)})
                )
            }
            ///
            let deliveryCost='';
            if(parseFloat(order.deliveryCost) > 0){
                deliveryCost = $('<div/>',{class:'w100p-10 mX3 mT3 row alnC jstfySB'}).append(
                    $('<div/>',{class:'fs08',text:receiptTxt.deliveryCost}),
                    $('<div/>',{class:'fs08',text:bigFloat(order.deliveryCost)})
                )
            }
            ///
            let total = '';
            total = $('<div/>',{class:'w100p-10 mX3 mT3 fs1 bold row alnC jstfySB mB20'}).append(
                $('<div/>',{class:'',text:receiptTxt.total}),
                $('<div/>',{class:'',text:receiptCurrency+bigFloat(order.total)})
            );
            ///
            $('#printDiv').text('').css({
                'width':website.printerWidth+'mm','direction':direction,
            }).append(
                $('<img/>',{
                    class:'printReceiptLogo mX5',
                    src:website.logo ,
                    id:'receiptWebsiteLogoId',
                }),
                $('<div/>',{
                    class:'fs1 mT5 mX5',
                    text:receiptRestaurantName,
                }),
                $('<div/>',{
                    class:'mxw300 mXa fs08 mY10 mB5',
                    text:receiptAddress,
                }),
                receiptPhoneNumbers,
                $('<div/>',{class:'w100p-10 mX3 mT10 taS fs08 bold500',text:`#${order.id}`}),
                $('<div/>',{class:'w100p-10 mX3 mT2 taS fs08 bold500',text:receiptTxt[orderType]}),
                $('<div/>',{class:'w100p-10 mX3 mT2 taS fs07',text:receiptDate}),
                paymentMethod,
                $('<div/>',{class:'w100p-10 mX3 mT40 mB5 row alnE jstfyS'}).append(
                    $('<div/>',{class:'printReceiptQtyW taS fs09 bold500',text:receiptTxt.qty2}),
                    $('<div/>',{class:'printReceiptItemW taS fs09 bold500',text:receiptTxt.item}),
                    $('<div/>',{class:'printReceiptPriceW taE fs09 bold500',text:receiptTxt.price}),
                ),
                itemsContainer = $('<div/>',{class:'w100p printReceiptItems'}),
                discount,
                itemsTotal,
                orderTax,
                orderService,
                deliveryCost,
                total,
                $('<div/>',{id:'receiptQrCode',class:'printReceiptQrCode'}),
                $('<div/>',{class:'mT10 mB40 fs09',text:`https://${website.url}`}),
                $('<div/>',{text:website.website_receiptMsgs[receiptLanguage],class:'fs09'})
            );


            for(const key in order.order_items){
                let item = order.order_items[key];
                let itemName;
                let product = website.products.find(i=> i.id == item.product_id);
                if(typeof(product) === 'undefined'){itemName = item.productName}else{
                    if(product.names[receiptLanguage] != null && product.names[receiptLanguage] != ''){
                        itemName = product.names[receiptLanguage];
                    }else{
                        itemName = product.name;
                    }
                }
                let thisItemOptions;
                itemsContainer.append(
                    $('<div/>',{class:'w100p mY10 row alnS jstfyS'}).append(
                        $('<div/>',{class:'printReceiptQtyW taS fs08',text:item.qty}),
                        $('<div/>',{class:'printReceiptItemW taS'}).append(
                            $('<div/>',{class:'fs08 bold500',text:itemName}),
                            thisItemOptions = $('<div/>',{class:'fs06 w100p taS'})
                        ),
                        $('<div/>',{class:'printReceiptPriceW taE fs08 bold500',text:bigFloat(item.total)}),
                    ),

                )
                for(const key2 in item.order_item_option_selections){
                    let itemSelection = item.order_item_option_selections[key2];
                    let selectionName = itemSelection.selectionName; let optionName = itemSelection.optionName;
                    if(typeof(product) !== 'undefined'){
                        let option = product.product_options.find(i=> i.id == itemSelection.product_option_id)
                        console.log(option)
                        if(typeof(option) !== 'undefined'){
                            if(option.names[receiptLanguage] != null && option.names[receiptLanguage] != ''){
                                optionName = option.names[receiptLanguage];
                            }else{
                                optionName = option.name
                            }
                            let selection = option.product_option_selections.find(i=> i.id == itemSelection.product_option_selection_id);
                            if(typeof(selection) !== 'undefined'){
                                if(selection.names[receiptLanguage] != null && selection.names[receiptLanguage] != ''){
                                    selectionName = selection.names[receiptLanguage];
                                }else{
                                    selectionName = selection.name
                                }
                            }
                        }

                    }

                    thisItemOptions.append(
                        $('<div/>',{text:`${optionName}: ${selectionName}`})
                    )
                }
            }

            var qrcode = new QRCode(document.getElementById("receiptQrCode"), {
                text: 'https://'+website.url,
                width: 100,
                height: 100,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            $('#receiptWebsiteLogoId').on('load',function(){
                $('#printDiv').css('left',0);
                window.print();
                $('#printDiv').css('left','200%');
                $('#printDiv').html('');
            })

        })
    })
}
