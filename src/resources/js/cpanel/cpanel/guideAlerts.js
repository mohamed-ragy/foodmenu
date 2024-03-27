guideHintsClass = class  {

    deleteGuideAlert(code){
        for(const key in window.guideAlertsOBJ){
            if(window.guideAlertsOBJ[key].code == code){
                delete window.guideAlertsOBJ[key];
            }
        }
    }
    subaccountsBlockCheck (drawAlerts=true){
        this.deleteGuideAlert(37);
        if(!account.is_master){return}
        for(const key in website.accounts){
            let subaccount = website.accounts[key];
            if(subaccount.is_master == false && subaccount.password_fails > 10){
                window.guideAlertsOBJ.push({
                    code:37,
                    priority:5,
                    icon:'ico-warning c_txt2',
                    img:null,
                    lang:null,
                    text:texts.cpanel.guideHints.subaccountBlocked.replace(':subaccount:',subaccount.name),
                    cpPage:'sub_accounts',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`subaccount_table_row_${subaccount.id}`,
                    selectElem:`subaccount_table_row_${subaccount.id}`,
                    attrs:{},
                });
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    subscriptionCheck (drawAlerts=true){
        this.deleteGuideAlert(36);
        if(!account.is_master){return}
        if(website.payment_methods_count < 1){
            window.guideAlertsOBJ.push({
                code:36,
                priority:4,
                icon:'ico-card c_txt2',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.noPaymentMethod,
                cpPage:null,
                popupPage:null,
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{
                    href:process.env.MIX_BILLING_CENTER_URL,
                    target:'_blank'
                },
            });
        }
        this.guideHintsCounter(drawAlerts);
    }
    emailVerification (drawAlerts=true){
        this.deleteGuideAlert(1)
        if(account.email_verified_at == null && account.is_master){
            window.guideAlertsOBJ.push({
                code:1,
                priority:4,
                icon:'ico-email_address',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.emailNotVerified,
                cpPage:'email_address',
                openTab:'my_email_address',
                popupPage:null,
                popup:null,
                scrollToElem:'account-emailVerificationCode',
                selectElem:'account-emailVerificationCode',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    phoneRegister (drawAlerts=true){
        this.deleteGuideAlert(2)
        if(account.phone == null && account.is_master){
            window.guideAlertsOBJ.push({
                code:2,
                priority:4,
                icon:'ico-phone_number',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.phoneNotRegistered,
                cpPage:'phone_number',
                openTab:'my_phone_number',
                popup:null,
                popupPage:null,
                scrollToElem:'account-phoneNumber',
                selectElem:'account-phoneNumber',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    phoneVerification (drawAlerts=true){
        this.deleteGuideAlert(3)
        if(account.phone_verified_at == null && account.phone != '' && account.phone != null && account.is_master){
            window.guideAlertsOBJ.push({
                code:3,
                priority:4,
                icon:'ico-phone_number',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.phoneNotVerified,
                cpPage:'phone_number',
                openTab:'my_phone_number',
                popupPage:null,
                popup:null,
                scrollToElem:'account-phoneVerificationCode',
                selectElem:'account-phoneVerificationCode',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    categories (drawAlerts=true){
        this.deleteGuideAlert(4)
        this.deleteGuideAlert(5)
        this.deleteGuideAlert(29)
        if(account.authorities[1] == false){return}
        for(const key in website.categories){
            let category = website.categories[key];
            if(category.img_id == null){
                window.guideAlertsOBJ.push({
                    code:5,
                    priority:2,
                    icon:'ico-image',
                    img:null,
                    lang:null,
                    text:texts.cpanel.guideHints.categoryImg.replace(':category:',`<b>${category.name}</b>`),
                    cpPage:null,
                    popupPage:'edit_category',
                    scrollToElem:'editCategory_img_container',
                    selectElem:'editCategory_img_container',
                    attrs:{category:category.name},
                })
            }
            for(const key in website.languages){
                let lang = website.languages[key];
                if(typeof(category.names[lang.code]) === 'undefined' || category.names[lang.code] == null || category.names[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:4,
                        priority:2,
                        icon:null,
                        img:category.img,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.categoryName.replace(':category:',`<b>${category.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                        cpPage:null,
                        popupPage:'edit_category',
                        popup:null,
                        scrollToElem:`editCategory_categoryName_${lang.code}`,
                        selectElem:`editCategory_categoryName_${lang.code}`,
                        attrs:{category:category.name},

                    })
                }
                if(typeof(category.descriptions[lang.code]) === 'undefined' || category.descriptions[lang.code] == null || category.descriptions[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:29,
                        priority:2,
                        icon:null,
                        img:category.img,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.categoryDescription.replace(':category:',`<b>${category.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                        cpPage:null,
                        popupPage:'edit_category',
                        popup:null,
                        scrollToElem:`editCateogry_description_${lang.code}`,
                        selectElem:`editCateogry_description_${lang.code}`,
                        attrs:{category:category.name},

                    })
                }

            }
        }

        this.guideHintsCounter(drawAlerts);
    }
    products (drawAlerts=true){
        if(account.authorities[1] == false){return}
        this.deleteGuideAlert(6)
        this.deleteGuideAlert(7)
        this.deleteGuideAlert(8)
        this.deleteGuideAlert(9)
        this.deleteGuideAlert(10)
        this.deleteGuideAlert(11)
        this.deleteGuideAlert(12)

        for(const key in website.products){
            let product = website.products[key];
            //availability
            if(product.availability == 0){
                window.guideAlertsOBJ.push({
                    code:6,
                    priority:2,
                    icon:null,
                    img:product.img,
                    lang:null,
                    text:texts.cpanel.guideHints.productAvailability.replace(':product:',`<b>${product.name}</b>`),
                    cpPage:null,
                    popupPage:'edit_product',
                    popup:null,
                    scrollToElem:'editProduct_productAvailability_container',
                    selectElem:'editProduct_productAvailability_container',
                    attrs:{product:product.name},
                })
            }
            //////////product category
            if(product.category_id == null){
                window.guideAlertsOBJ.push({
                    code:9,
                    priority:2,
                    icon:null,
                    img:product.img,
                    lang:null,
                    text:texts.cpanel.guideHints.productCategory.replace(':product:',`<b>${product.name}</b>`),
                    cpPage:null,
                    popupPage:'edit_product',
                    popup:null,
                    scrollToElem:'editProduct_productCategory',
                    selectElem:'editProduct_productCategory',
                    attrs:{product:product.name},

                })
            }
            ///////product img
            if(product.img_id == null){
                window.guideAlertsOBJ.push({
                    code:10,
                    priority:2,
                    icon:'ico-image',
                    img:null,
                    lang:null,
                    text:texts.cpanel.guideHints.productImg.replace(':product:',`<b>${product.name}</b>`),
                    cpPage:null,
                    popupPage:'edit_product',
                    popup:null,
                    scrollToElem:'editProduct_img_container',
                    selectElem:'editProduct_img_container',
                    attrs:{product:product.name},
                })
            }
            for(const key in website.languages){
                let lang = website.languages[key];
                if(typeof(product.names[lang.code]) === 'undefined' || product.names[lang.code] == null || product.names[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:7,
                        priority:2,
                        icon:null,
                        img:product.img,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.productName.replace(':product:',`<b>${product.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                        cpPage:null,
                        popupPage:'edit_product',
                        popup:null,
                        scrollToElem:`editProduct_productName_${lang.code}`,
                        selectElem:`editProduct_productName_${lang.code}`,
                        attrs:{product:product.name},

                    })
                }
                if(typeof(product.descriptions[lang.code]) === 'undefined' || product.descriptions[lang.code] == null || product.descriptions[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:8,
                        priority:2,
                        icon:null,
                        img:product.img,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.productDescription.replace(':product:',`<b>${product.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                        cpPage:null,
                        popupPage:'edit_product',
                        popup:null,
                        scrollToElem:`editproduct_description_${lang.code}`,
                        selectElem:`editproduct_description_${lang.code}`,
                        attrs:{product:product.name},

                    })
                }
                //////product option names
                for(const key in product.product_options){
                    let option = product.product_options[key];
                    if(typeof(option.names[lang.code]) === 'undefined' || option.names[lang.code] == null || option.names[lang.code] == ''){
                        window.guideAlertsOBJ.push({
                            code:11,
                            priority:2,
                            icon:null,
                            img:product.img,
                            lang:lang.code,
                            text:texts.cpanel.guideHints.productOptionName.replace(':option:',`<b>${option.name}</b>`).replace(':product:',`<b>${product.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                            cpPage:null,
                            popupPage:null,
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            containerClass:'productOptionEdit_guideAlert',
                            attrs:{product:product.name,option:option.id,lang:lang.code},

                        })
                    }
                    for(const key in option.product_option_selections){
                        let selection = option.product_option_selections[key];
                        if(typeof(selection.names[lang.code]) === 'undefined' || selection.names[lang.code] == null || selection.names[lang.code] == ''){
                            window.guideAlertsOBJ.push({
                                code:12,
                                priority:2,
                                icon:null,
                                img:product.img,
                                lang:lang.code,
                                text:texts.cpanel.guideHints.productOptionSelection.replace(':selection:',`<b>${selection.name}</b>`).replace(':option:',`<b>${option.name}</b>`).replace(':product:',`<b>${product.name}</b>`).replace(':lang:',`<b>${lang.name}</b>`),
                                cpPage:null,
                                popupPage:null,
                                popup:null,
                                scrollToElem:null,
                                selectElem:null,
                                containerClass:'productOptionSelectionEdit_guideAlert',
                                attrs:{product:product.name,option:option.id,selection:selection.id,lang:lang.code},
                            })
                        }
                    }
                }
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteSwitch (drawAlerts=true){
        if(!account.is_master){return}
        this.deleteGuideAlert(15)
        if(website.active == false ){
            window.guideAlertsOBJ.push({
                code:15,
                priority:5,
                icon:'ico-power c_txt2',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.websiteSwitch}`,
                cpPage:'home',
                popupPage:null,
                popup:null,
                scrollToElem:'system-websiteSwitch_container',
                selectElem:'system-websiteSwitch_container',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteIcon (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(16)
        if(website.icon_id == null || website.icon_id == ''){
            window.guideAlertsOBJ.push({
                code:16,
                priority:4,
                icon:'ico-image',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.websiteIcon}`,
                cpPage:'restaurant_information',
                openTab:'logo_and_icon',
                popupPage:null,
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteLogo (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(17)
        if(website.logo_id == null || website.logo_id == ''){
            window.guideAlertsOBJ.push({
                code:17,
                priority:4,
                icon:'ico-image',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.websiteIcon}`,
                cpPage:'restaurant_information',
                openTab:'logo_and_icon',
                popupPage:null,
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websitePhoneNumbers (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(18)
        if(website.phoneNumbers.length == 0){
            window.guideAlertsOBJ.push({
                code:18,
                priority:4,
                icon:'ico-phone_number',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.websitePhoneNumber}`,
                cpPage:'restaurant_information',
                openTab:'restaurant_phone_numbers',
                popupPage:null,
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteAddressess (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(20)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(typeof(website.addresses[lang.code]) === 'undefined' || website.addresses[lang.code] == null || website.addresses[lang.code] == ''){
                window.guideAlertsOBJ.push({
                    code:20,
                    priority:4,
                    icon:'ico-address',
                    img:null,
                    lang:lang.code,
                    text:texts.cpanel.guideHints.websiteAddress.replace(':lang:',`<b>${lang.name}</b>`),
                    cpPage:'restaurant_information',
                    openTab:'restaurant_address',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`setting-restaurantAddress_${lang.code}`,
                    selectElem:`setting-restaurantAddress_${lang.code}`,
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteNames (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(21)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(typeof(website.websiteNames[lang.code]) === 'undefined' || website.websiteNames[lang.code] == null || website.websiteNames[lang.code] == ''){
                window.guideAlertsOBJ.push({
                    code:21,
                    priority:4,
                    icon:'ico-shop',
                    img:null,
                    lang:lang.code,
                    text:texts.cpanel.guideHints.websiteName.replace(':lang:',`<b>${lang.name}</b>`),
                    cpPage:'restaurant_information',
                    openTab:'restaurant_name',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`setting-restaurantName-${lang.code}`,
                    selectElem:`setting-restaurantName-${lang.code}`,
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteDescriptions (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(22)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(typeof(website.websiteDescriptions[lang.code]) === 'undefined' || website.websiteDescriptions[lang.code] == null || website.websiteDescriptions[lang.code] == ''){
                window.guideAlertsOBJ.push({
                    code:22,
                    priority:4,
                    icon:'ico-description',
                    img:null,
                    lang:lang.code,
                    text:texts.cpanel.guideHints.websiteDescription.replace(':lang:',`<b>${lang.name}</b>`),
                    cpPage:'restaurant_information',
                    openTab:'restaurant_description',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`settings_websiteDescription_${lang.code}`,
                    selectElem:`settings_websiteDescription_${lang.code}`,
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteCurrencies (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(23)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(typeof(website.currencies[lang.code]) === 'undefined' || website.currencies[lang.code] == null || website.currencies[lang.code] == ''){
                window.guideAlertsOBJ.push({
                    code:23,
                    priority:4,
                    icon:'ico-money',
                    img:null,
                    lang:lang.code,
                    text:texts.cpanel.guideHints.websiteCurrency.replace(':lang:',`<b>${lang.name}</b>`),
                    cpPage:'restaurant_information',
                    openTab:'currency_symbol',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`setting-enCurrency_${lang.code}`,
                    selectElem:`setting-enCurrency_${lang.code}`,
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteAnnouncements(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(24)
        let announcemetCheck = false;
        for(const key in website.languages){
            let lang = website.languages[key];
            if(website.website_announcements[lang.code] != '' &&  website.website_announcements[lang.code] != null && typeof(website.website_announcements[lang.code]) !== 'undefined'){
                announcemetCheck = true;
            }
        }
        if(announcemetCheck){
            for(const key in website.languages){
                let lang = website.languages[key];
                if(typeof(website.website_announcements[lang.code]) === 'undefined' || website.website_announcements[lang.code] == null || website.website_announcements[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:24,
                        priority:4,
                        icon:'ico-announcement',
                        img:null,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.websiteAnnouncement.replace(':lang:',`<b>${lang.name}</b>`),
                        cpPage:'restaurant_information',
                        openTab:'website_announcement',
                        popupPage:null,
                        popup:null,
                        scrollToElem:`settings_Announcement_${lang.code}`,
                        selectElem:`settings_Announcement_${lang.code}`,
                        attrs:{},
                    })
                }
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteReceiptMsgs(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(25)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(lang.receiptDefault){
                if(typeof(website.website_receiptMsgs[lang.code]) === 'undefined' || website.website_receiptMsgs[lang.code] == null || website.website_receiptMsgs[lang.code] == ''){
                    window.guideAlertsOBJ.push({
                        code:25,
                        priority:4,
                        icon:'ico-edit',
                        img:null,
                        lang:lang.code,
                        text:texts.cpanel.guideHints.websiteReceiptMsg,
                        cpPage:'restaurant_information',
                        openTab:'receipt_footer_message',
                        popupPage:null,
                        popup:null,
                        scrollToElem:`settings_ReceiptMsg_${lang.code}`,
                        selectElem:`settings_ReceiptMsg_${lang.code}`,
                        attrs:{},
                    })
                }
            }
        }
        this.guideHintsCounter(drawAlerts);

    }
    websitePrivacyPolicy(drawAlerts=true){
        if(account.is_master == false){return}
        this.deleteGuideAlert(27)
        for(const key in website.languages){
            let lang = website.languages[key];
            if(typeof(website.website_privacyPolicy[lang.code]) === 'undefined' || website.website_privacyPolicy[lang.code] == null || website.website_privacyPolicy[lang.code] == ''){
                window.guideAlertsOBJ.push({
                    code:27,
                    priority:4,
                    icon:'ico-warning',
                    img:null,
                    lang:lang.code,
                    text:texts.cpanel.guideHints.websitePrivacyPolicy.replace(':lang:',`<b>${lang.name}</b>`),
                    cpPage:'system',
                    openTab:'privacy_policy',
                    popupPage:null,
                    popup:null,
                    scrollToElem:`system_PrivacyPolicy_${lang.code}`,
                    selectElem:`system_PrivacyPolicy_${lang.code}`,
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    restaurantLocation(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(26)
        if(website.lat == 0 && website.lng == 0){
            window.guideAlertsOBJ.push({
                code:26,
                priority:4,
                icon:'ico-location',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.restaurantLocation,
                cpPage:'restaurant_information',
                openTab:'restaurant_location',
                popupPage:'',
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    restaurantEmail(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(28)
        if(website.restaurantEmail == null || website.restaurantEmail == ''){
            window.guideAlertsOBJ.push({
                code:28,
                priority:4,
                icon:'ico-email_address',
                img:null,
                lang:null,
                text:texts.cpanel.guideHints.restaurantEmail,
                cpPage:'restaurant_information',
                openTab:'restaurant_email',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-restaurantEmail',
                selectElem:'settings-restaurantEmail',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    drawGuideAlerts(){
        window.guideAlertsOBJ.sort((a,b)=>{return b.priority - a.priority})

        $('#guideHintsContainer').text('');
        for(const key in window.guideAlertsOBJ){

            let thisGuideAlert;
            let guideAlert = window.guideAlertsOBJ[key];
            let guideAlertIcon = '';
            let guideAlertLangImg = '';
            let langFlag;
            if(guideAlert.lang != null){
                langFlag = `${website.languages[guideAlert.lang].flag}.png`;
                guideAlertLangImg = $('<img/>',{class:`guideAlertLangImg`,src:`./storage/imgs/flags/${langFlag}`})
            }

            if(guideAlert.icon == null){
                guideAlertIcon = $('<img/>',{class:'guideAlertImg',src:guideAlert.img})
            }else{
                if(guideAlert.lang != null){
                    guideAlertIcon = $('<div/>',{class:`guideAlertIcon2 ${guideAlert.icon}`})
                }else{
                    guideAlertIcon = $('<div/>',{class:`guideAlertIcon ${guideAlert.icon}`})
                }
            }

            let linkClass ;
            guideAlert.cpPage != null ? linkClass = 'cpPage' : guideAlert.popupPage != null ? linkClass = 'popupPage' : null ;
            guideAlert.priority == 5 ? linkClass = linkClass + ' guideAlertContainer-red' : null;
            guideAlert.code == 36 ? linkClass = linkClass + ' guideAlertContainer-orange' : null;


            $('#guideHintsContainer').append(
                thisGuideAlert = $('<a/>',{
                    class:`guideAlertContainer ${guideAlert.containerClass ?? ''} ${linkClass}`,
                    priority:guideAlert.priority,
                    popupPage:guideAlert.popupPage,
                    cpPage:guideAlert.cpPage,
                    selectElem:guideAlert.selectElem,
                    scrollToElem:guideAlert.scrollToElem,
                    openTab:guideAlert.openTab,
                }).append(
                    $('<div/>',{class:'guideAlertIconContainer'}).append(
                        guideAlertLangImg,
                        guideAlertIcon,
                    ),
                    $('<div/>',{class:'fs085',html:guideAlert.text})
                )
            )
            for(const key in guideAlert.attrs){
                thisGuideAlert.attr(key,guideAlert.attrs[key])
            }
        }
    }
    guideHintsCounter(drawAlerts) {
        let guideHintsNumber = 0;
        for(const key in window.guideAlertsOBJ){
            let Alert = window.guideAlertsOBJ[key];
            guideHintsNumber = guideHintsNumber + 1;
        }
        if(guideHintsNumber == 0){
            $('#guideHintsNumber').hide();
            $('#noGuideHints').removeClass('none');
        }else if(guideHintsNumber > 0){
            guideHintsNumber > 99 ? $('#guideHintsNumber').text('99+') : $('#guideHintsNumber').text(guideHintsNumber);
            $('#guideHintsNumber').css('display','flex');
            $('#noGuideHints').addClass('none');
        }

        if(drawAlerts){
            this.drawGuideAlerts();
        }
    }

    all(){
        window.guideAlertsOBJ =[];
        window.guideHints.emailVerification(false);//done
        window.guideHints.phoneRegister(false);//done
        window.guideHints.phoneVerification(false);//done
        window.guideHints.categories(false);//done
        window.guideHints.products(false);//done
        window.guideHints.websiteSwitch(false);//done

        window.guideHints.websiteIcon(false);//done
        window.guideHints.websiteLogo(false);//done

        window.guideHints.websitePhoneNumbers(false);//done
        window.guideHints.websiteAddressess(false);//done
        window.guideHints.websiteNames(false);//done
        window.guideHints.websiteDescriptions(false);//done
        window.guideHints.websiteCurrencies(false);//done
        window.guideHints.websiteAnnouncements(false);//done
        window.guideHints.websiteReceiptMsgs(false);//done
        window.guideHints.websitePrivacyPolicy(false);//done
        window.guideHints.restaurantLocation(false);//done
        window.guideHints.restaurantEmail(false);//done
        window.guideHints.subscriptionCheck(false);//done
        window.guideHints.subaccountsBlockCheck(false)//done
        window.guideHints.drawGuideAlerts();//done
    }
}
