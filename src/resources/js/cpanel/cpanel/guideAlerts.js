class guideHintsClass {

    deleteGuideAlert(code){
        for(const key in window.guideAlertsOBJ){
            if(window.guideAlertsOBJ[key].code == code){
                delete window.guideAlertsOBJ[key];
            }
        }
    }
    subscriptionCheck (drawAlerts=true){
        this.deleteGuideAlert(36);
        if(!account.is_master){return}
        if(website.payment_methods_count < 1){
            window.guideAlertsOBJ.push({
                code:36,
                priority:4,
                icon:'ico-card',
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
                popupPage:null,
                popup:null,
                scrollToElem:'security-verifyEmail',
                selectElem:'security-verifyEmail',
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
                popup:null,
                popupPage:null,
                scrollToElem:'phoneNumber-accountPhoneSelectPhoneNumber',
                selectElem:'phoneNumber-accountPhoneSelectPhoneNumber',
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
                popupPage:null,
                popup:null,
                scrollToElem:'security-verifyPhone',
                selectElem:'security-verifyPhone',
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
        for(const key in categories){
            let category = categories[key];
            //// names
            if(category.name_en == null || category.name_en == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-enName',
                    selectElem:'editCategory-enName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_fr == null || category.name_fr == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-frName',
                    selectElem:'editCategory-frName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_de == null || category.name_de == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-deName',
                    selectElem:'editCategory-deName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_es == null || category.name_es == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-esName',
                    selectElem:'editCategory-esName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_it == null || category.name_it == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-itName',
                    selectElem:'editCategory-itName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_ar == null || category.name_ar == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-arName',
                    selectElem:'editCategory-arName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_eg == null || category.name_eg == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-egName',
                    selectElem:'editCategory-egName',
                    attrs:{category:category.name},

                })
            }
            if(category.name_ru == null || category.name_ru == ''){
                if(category.name_eg == null || category.name_eg == ''){
                    window.guideAlertsOBJ.push({
                        code:4,
                        priority:2,
                        icon:null,
                        img:category.imgUrl_thumbnail,
                        lang:'ru',
                        text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inru}.`,
                        cpPage:null,
                        popupPage:'Edit-Category',
                        popup:null,
                        scrollToElem:'editCategory-ruName',
                        selectElem:'editCategory-ruName',
                        attrs:{category:category.name},

                    })
                }
            }
            if(category.name_ua == null || category.name_ua == ''){
                window.guideAlertsOBJ.push({
                    code:4,
                    priority:2,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.categoryName} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory-uaName',
                    selectElem:'editCategory-uaName',
                    attrs:{category:category.name},

                })
            }
            ////discriptions
            if(category.description_en == null || category.description_en == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_enDescription',
                    selectElem:'editCategory_enDescription',
                    attrs:{category:category.name},

                })
            }
            if(category.description_fr == null || category.description_fr == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_frDescription',
                    selectElem:'editCategory_frDescription',
                    attrs:{category:category.name},

                })
            }
            if(category.description_de == null || category.description_de == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_deDescription',
                    selectElem:'editCategory_deDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_es == null || category.description_es == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_esDescription',
                    selectElem:'editCategory_esDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_it == null || category.description_it == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_itDescription',
                    selectElem:'editCategory_itDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_ar == null || category.description_ar == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_arDescription',
                    selectElem:'editCategory_arDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_eg == null || category.description_eg == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_egDescription',
                    selectElem:'editCategory_egDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_ru == null || category.description_ru == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_ruDescription',
                    selectElem:'editCategory_ruDescription',
                    attrs:{category:category.name},
                })
            }
            if(category.description_ua == null || category.description_ua == ''){
                window.guideAlertsOBJ.push({
                    code:29,
                    priority:1,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.categoryDescription} <b>${category.name}</b> ${texts.cpanel.guideHints.category} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    popup:null,
                    scrollToElem:'editCategory_uaDescription',
                    selectElem:'editCategory_uaDescription',
                    attrs:{category:category.name},
                })
            }
            ///////////img
            if(category.img_id == null){
                window.guideAlertsOBJ.push({
                    code:5,
                    priority:3,
                    icon:null,
                    img:category.imgUrl_thumbnail,
                    lang:null,
                    text:`${texts.cpanel.guideHints.categoryImg} <b>${category.name}</b> ${texts.cpanel.guideHints.category}.`,
                    cpPage:null,
                    popupPage:'Edit-Category',
                    scrollToElem:'editCategory-categoryImgCard',
                    selectElem:null,
                    attrs:{category:category.name},
                })
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

        for(const key in products){
            let product = products[key];
            //availability
            if(product.availability == 0){
                window.guideAlertsOBJ.push({
                    code:6,
                    priority:4,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:null,
                    text:`<b>${product.name}</b> ${texts.cpanel.guideHints.productAvailability}`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-productAvailability',
                    selectElem:null,
                    attrs:{product:product.name},

                })
            }
            //product names
            if(product.name_en == null || product.name_en == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-enName',
                    selectElem:'editProduct-enName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_fr == null || product.name_fr == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-frName',
                    selectElem:'editProduct-frName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_de == null || product.name_de == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-deName',
                    selectElem:'editProduct-deName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_es == null || product.name_es == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-esName',
                    selectElem:'editProduct-esName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_it == null || product.name_it == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-itName',
                    selectElem:'editProduct-itName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_ar == null || product.name_ar == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-arName',
                    selectElem:'editProduct-arName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_eg == null || product.name_eg == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-egName',
                    selectElem:'editProduct-egName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_ru == null || product.name_ru == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-ruName',
                    selectElem:'editProduct-ruName',
                    attrs:{product:product.name},

                })
            }
            if(product.name_ua == null || product.name_ua == ''){
                window.guideAlertsOBJ.push({
                    code:7,
                    priority:2,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.productName} <b>${product.name}</b> ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-uaName',
                    selectElem:'editProduct-uaName',
                    attrs:{product:product.name},

                })
            }
            ////////products descriptions
            if(product.description_en == null || product.description_en == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_enDescription',
                    selectElem:'editProduct_enDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_fr == null || product.description_fr == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_frDescription',
                    selectElem:'editProduct_frDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_de == null || product.description_de == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_deDescription',
                    selectElem:'editProduct_deDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_es == null || product.description_es == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_esDescription',
                    selectElem:'editProduct_esDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_it == null || product.description_it == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_itDescription',
                    selectElem:'editProduct_itDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_ar == null || product.description_ar == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_arDescription',
                    selectElem:'editProduct_arDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_eg == null || product.description_eg == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_egDescription',
                    selectElem:'editProduct_egDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_ru == null || product.description_ru == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_ruDescription',
                    selectElem:'editProduct_ruDescription',
                    attrs:{product:product.name},

                })
            }
            if(product.description_ua == null || product.description_ua == ''){
                window.guideAlertsOBJ.push({
                    code:8,
                    priority:1,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.productDescription} <b>${product.name}</b> ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct_uaDescription',
                    selectElem:'editProduct_uaDescription',
                    attrs:{product:product.name},

                })
            }
            //////////product category
            if(product.category_id == null){
                window.guideAlertsOBJ.push({
                    code:9,
                    priority:3,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:null,
                    text:`${texts.cpanel.guideHints.productCategory1} <b>${product.name}</b> ${texts.cpanel.guideHints.productCategory2}`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-productCategory',
                    selectElem:'editProduct-productCategory',
                    attrs:{product:product.name},

                })
            }
            ///////product img
            if(product.img_id == null){
                window.guideAlertsOBJ.push({
                    code:10,
                    priority:3,
                    icon:null,
                    img:product.imgUrl_thumbnail,
                    lang:null,
                    text:`${texts.cpanel.guideHints.productImg} <b>${product.name}</b>.`,
                    cpPage:null,
                    popupPage:'Edit-Product',
                    popup:null,
                    scrollToElem:'editProduct-productImgCard',
                    selectElem:null,
                    attrs:{product:product.name},
                })
            }
            //////product option names
            for(const key in product.product_options){
                let option = product.product_options[key];
                if(option.name_en == null || option.name_en == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'en',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.inen} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-enName'},

                    })
                }
                if(option.name_fr == null || option.name_fr == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'fr',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.infr} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-frName'},

                    })
                }
                if(option.name_de == null || option.name_de == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'de',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.inde} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-deName'},

                    })
                }
                if(option.name_es == null || option.name_es == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'es',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.ines} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-esName'},

                    })
                }
                if(option.name_it == null || option.name_it == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'it',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.init} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-itName'},

                    })
                }
                if(option.name_ar == null || option.name_ar == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'ar',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.inar} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-arName'},

                    })
                }
                if(option.name_eg == null || option.name_eg == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'eg',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span> ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-egName'},

                    })
                }
                if(option.name_ru == null || option.name_ru == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'ru',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.inru} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-ruName'},

                    })
                }
                if(option.name_ua == null || option.name_ua == ''){
                    window.guideAlertsOBJ.push({
                        code:11,
                        priority:2,
                        icon:null,
                        img:product.imgUrl_thumbnail,
                        lang:'ua',
                        text:`${texts.cpanel.guideHints.productOptionName1} <b>${option.name}</b> ${texts.cpanel.guideHints.inua} ${texts.cpanel.guideHints.productOptionName2} <b>${product.name}</b>.`,
                        cpPage:null,
                        popupPage:'Product-Options',
                        popup:null,
                        scrollToElem:null,
                        selectElem:null,
                        attrs:{product:product.name,productId:product.id,optionId:option.id,action:'editOption',selectOption:'editProductOption-uaName'},

                    })
                }
                ///////////products option selections names
                for(const key in option.product_option_selections){
                    let selection = option.product_option_selections[key];
                    if(selection.name_en == null || selection.name_en == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'en',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.inen} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-enName'},

                        })
                    }
                    if(selection.name_fr == null || selection.name_fr == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'fr',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.infr} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-frName'},

                        })
                    }
                    if(selection.name_de == null || selection.name_de == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'de',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.inde} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-deName'},

                        })
                    }
                    if(selection.name_es == null || selection.name_es == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'es',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.ines} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-esName'},

                        })
                    }
                    if(selection.name_it == null || selection.name_it == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'it',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.init} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-itName'},

                        })
                    }
                    if(selection.name_ar == null || selection.name_ar == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'ar',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.inar} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-arName'},

                        })
                    }
                    if(selection.name_eg == null || selection.name_eg == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'eg',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span> ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-egName'},

                        })
                    }
                    if(selection.name_ru == null || selection.name_ru == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'ru',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.inru} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-ruName'},

                        })
                    }
                    if(selection.name_ua == null || selection.name_ua == ''){
                        window.guideAlertsOBJ.push({
                            code:12,
                            priority:2,
                            icon:null,
                            img:product.imgUrl_thumbnail,
                            lang:'ua',
                            text:`${texts.cpanel.guideHints.productOptionSelection1} ${texts.cpanel.guideHints.inua} ${texts.cpanel.guideHints.productOptionSelection2} <b>${selection.name}</b> ${texts.cpanel.guideHints.productOptionSelection3} <b>${option.name}</b> ${texts.cpanel.guideHints.productOptionSelection4} <b>${product.name}</b>.`,
                            cpPage:null,
                            popupPage:'Product-Options',
                            popup:null,
                            scrollToElem:null,
                            selectElem:null,
                            attrs:{product:product.name,productId:product.id,optionId:option.id,selectionId:selection.id,action:'editselection',selectSelection:'editSection-uaName'},

                        })
                    }
                }

            }

        }
        this.guideHintsCounter(drawAlerts);
    }
    homePageIntro (drawAlerts=true){
        if(account.authorities[3] == false){return}
        this.deleteGuideAlert(33)
        if(website.templateData.intro == true ){
            if(website.intro.title_en == '' || website.intro.title_en == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-en',
                    selectElem:'homePageSections-introTitle-en',
                    attrs:{},

                })
            }
            if(website.intro.title_fr == '' || website.intro.title_fr == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-fr',
                    selectElem:'homePageSections-introTitle-fr',
                    attrs:{},

                })
            }
            if(website.intro.title_de == '' || website.intro.title_de == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-de',
                    selectElem:'homePageSections-introTitle-de',
                    attrs:{},

                })
            }
            if(website.intro.title_es == '' || website.intro.title_es == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-es',
                    selectElem:'homePageSections-introTitle-es',
                    attrs:{},

                })
            }
            if(website.intro.title_it == '' || website.intro.title_it == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-it',
                    selectElem:'homePageSections-introTitle-it',
                    attrs:{},

                })
            }
            if(website.intro.title_ar == '' || website.intro.title_ar == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-ar',
                    selectElem:'homePageSections-introTitle-ar',
                    attrs:{},

                })
            }
            if(website.intro.title_eg == '' || website.intro.title_eg == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-eg',
                    selectElem:'homePageSections-introTitle-eg',
                    attrs:{},

                })
            }
            if(website.intro.title_ru == '' || website.intro.title_ru == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-ru',
                    selectElem:'homePageSections-introTitle-ru',
                    attrs:{},

                })
            }
            if(website.intro.title_ua == '' || website.intro.title_ua == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections-introTitle-ua',
                    selectElem:'homePageSections-introTitle-ua',
                    attrs:{},

                })
            }

            if(website.intro.des_en == '' || website.intro.des_en == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_en',
                    selectElem:'homePageSections_introDes_en',
                    attrs:{},
                })
            }
            if(website.intro.des_fr == '' || website.intro.des_fr == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_fr',
                    selectElem:'homePageSections_introDes_fr',
                    attrs:{},
                })
            }
            if(website.intro.des_de == '' || website.intro.des_de == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_de',
                    selectElem:'homePageSections_introDes_de',
                    attrs:{},
                })
            }
            if(website.intro.des_es == '' || website.intro.des_es == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_es',
                    selectElem:'homePageSections_introDes_es',
                    attrs:{},
                })
            }
            if(website.intro.des_it == '' || website.intro.des_it == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_it',
                    selectElem:'homePageSections_introDes_it',
                    attrs:{},
                })
            }
            if(website.intro.des_ar == '' || website.intro.des_ar == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_ar',
                    selectElem:'homePageSections_introDes_ar',
                    attrs:{},
                })
            }
            if(website.intro.des_eg == '' || website.intro.des_eg == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_eg',
                    selectElem:'homePageSections_introDes_eg',
                    attrs:{},
                })
            }
            if(website.intro.des_ru == '' || website.intro.des_ru == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_ru',
                    selectElem:'homePageSections_introDes_ru',
                    attrs:{},
                })
            }
            if(website.intro.des_ua == '' || website.intro.des_ua == null){
                window.guideAlertsOBJ.push({
                    code:33,
                    priority:3,
                    icon:'ico-basics',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-Intro',
                    popup:null,
                    scrollToElem:'homePageSections_introDes_ua',
                    selectElem:'homePageSections_introDes_ua',
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);

    }
    homePageInfo (drawAlerts=true){
        if(account.authorities[3] == false){return}
        this.deleteGuideAlert(34)
        if(website.templateData.info == true ){
            if(website.info.title_en == '' || website.info.title_en == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-en',
                    selectElem:'homePageSections-infoTitle-en',
                    attrs:{},
                })
            }
            if(website.info.title_fr == '' || website.info.title_fr == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-fr',
                    selectElem:'homePageSections-infoTitle-fr',
                    attrs:{},

                })
            }
            if(website.info.title_de == '' || website.info.title_de == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-de',
                    selectElem:'homePageSections-infoTitle-de',
                    attrs:{},

                })
            }
            if(website.info.title_es == '' || website.info.title_es == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-es',
                    selectElem:'homePageSections-infoTitle-es',
                    attrs:{},

                })
            }
            if(website.info.title_it == '' || website.info.title_it == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-it',
                    selectElem:'homePageSections-infoTitle-it',
                    attrs:{},

                })
            }
            if(website.info.title_ar == '' || website.info.title_ar == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-ar',
                    selectElem:'homePageSections-infoTitle-ar',
                    attrs:{},

                })
            }
            if(website.info.title_eg == '' || website.info.title_eg == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-eg',
                    selectElem:'homePageSections-infoTitle-eg',
                    attrs:{},

                })
            }
            if(website.info.title_ru == '' || website.info.title_ru == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-ru',
                    selectElem:'homePageSections-infoTitle-ru',
                    attrs:{},

                })
            }
            if(website.info.title_ua == '' || website.info.title_ua == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections-infoTitle-ua',
                    selectElem:'homePageSections-infoTitle-ua',
                    attrs:{},

                })
            }

            if(website.info.des_en == '' || website.info.des_en == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_en',
                    selectElem:'homePageSections_infoDes_en',
                    attrs:{},
                })
            }
            if(website.info.des_fr == '' || website.info.des_fr == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_fr',
                    selectElem:'homePageSections_infoDes_fr',
                    attrs:{},
                })
            }
            if(website.info.des_de == '' || website.info.des_de == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_de',
                    selectElem:'homePageSections_infoDes_de',
                    attrs:{},
                })
            }
            if(website.info.des_es == '' || website.info.des_es == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_es',
                    selectElem:'homePageSections_infoDes_es',
                    attrs:{},
                })
            }
            if(website.info.des_it == '' || website.info.des_it == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_it',
                    selectElem:'homePageSections_infoDes_it',
                    attrs:{},
                })
            }
            if(website.info.des_ar == '' || website.info.des_ar == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_ar',
                    selectElem:'homePageSections_infoDes_ar',
                    attrs:{},
                })
            }
            if(website.info.des_eg == '' || website.info.des_eg == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_eg',
                    selectElem:'homePageSections_infoDes_eg',
                    attrs:{},
                })
            }
            if(website.info.des_ru == '' || website.info.des_ru == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_ru',
                    selectElem:'homePageSections_infoDes_ru',
                    attrs:{},
                })
            }
            if(website.info.des_ua == '' || website.info.des_ua == null){
                window.guideAlertsOBJ.push({
                    code:34,
                    priority:3,
                    icon:'ico-info',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-Info',
                    popup:null,
                    scrollToElem:'homePageSections_infoDes_ua',
                    selectElem:'homePageSections_infoDes_ua',
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);

    }
    homePageOurStory (drawAlerts=true){
        if(account.authorities[3] == false){return}
        this.deleteGuideAlert(35)
        if(website.templateData.ourStory == true ){
            if(website.ourStory.title_en == '' || website.ourStory.title_en == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-en',
                    selectElem:'homePageSections-ourStoryTitle-en',
                    attrs:{},
                })
            }
            if(website.ourStory.title_fr == '' || website.ourStory.title_fr == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-fr',
                    selectElem:'homePageSections-ourStoryTitle-fr',
                    attrs:{},
                })
            }
            if(website.ourStory.title_de == '' || website.ourStory.title_de == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-de',
                    selectElem:'homePageSections-ourStoryTitle-de',
                    attrs:{},
                })
            }
            if(website.ourStory.title_es == '' || website.ourStory.title_es == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-es',
                    selectElem:'homePageSections-ourStoryTitle-es',
                    attrs:{},
                })
            }
            if(website.ourStory.title_it == '' || website.ourStory.title_it == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-it',
                    selectElem:'homePageSections-ourStoryTitle-it',
                    attrs:{},
                })
            }
            if(website.ourStory.title_ar == '' || website.ourStory.title_ar == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-ar',
                    selectElem:'homePageSections-ourStoryTitle-ar',
                    attrs:{},
                })
            }
            if(website.ourStory.title_eg == '' || website.ourStory.title_eg == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-eg',
                    selectElem:'homePageSections-ourStoryTitle-eg',
                    attrs:{},
                })
            }
            if(website.ourStory.title_ru == '' || website.ourStory.title_ru == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-ru',
                    selectElem:'homePageSections-ourStoryTitle-ru',
                    attrs:{},
                })
            }
            if(website.ourStory.title_ua == '' || website.ourStory.title_ua == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections-ourStoryTitle-ua',
                    selectElem:'homePageSections-ourStoryTitle-ua',
                    attrs:{},
                })
            }

            if(website.ourStory.des_en == '' || website.ourStory.des_en == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_en',
                    selectElem:'homePageSections_ourStoryDes_en',
                    attrs:{},
                })
            }
            if(website.ourStory.des_fr == '' || website.ourStory.des_fr == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_fr',
                    selectElem:'homePageSections_ourStoryDes_fr',
                    attrs:{},
                })
            }
            if(website.ourStory.des_de == '' || website.ourStory.des_de == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_de',
                    selectElem:'homePageSections_ourStoryDes_de',
                    attrs:{},
                })
            }
            if(website.ourStory.des_es == '' || website.ourStory.des_es == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_es',
                    selectElem:'homePageSections_ourStoryDes_es',
                    attrs:{},
                })
            }
            if(website.ourStory.des_it == '' || website.ourStory.des_it == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.init}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_it',
                    selectElem:'homePageSections_ourStoryDes_it',
                    attrs:{},
                })
            }
            if(website.ourStory.des_ar == '' || website.ourStory.des_ar == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_ar',
                    selectElem:'homePageSections_ourStoryDes_ar',
                    attrs:{},
                })
            }
            if(website.ourStory.des_eg == '' || website.ourStory.des_eg == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inar} <span class="customLangName bold"></span>.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_eg',
                    selectElem:'homePageSections_ourStoryDes_eg',
                    attrs:{},
                })
            }
            if(website.ourStory.des_ru == '' || website.ourStory.des_ru == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_ru',
                    selectElem:'homePageSections_ourStoryDes_ru',
                    attrs:{},
                })
            }
            if(website.ourStory.des_ua == '' || website.ourStory.des_ua == null){
                window.guideAlertsOBJ.push({
                    code:35,
                    priority:3,
                    icon:'ico-description',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:null,
                    popupPage:'Website-OurStory',
                    popup:null,
                    scrollToElem:'homePageSections_ourStoryDes_ua',
                    selectElem:'homePageSections_ourStoryDes_ua',
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);

    }
    slideShow (drawAlerts=true){
        if(account.authorities[3] == false){return}
        this.deleteGuideAlert(13)
        if(website.slideShow.content.length == 0 && website.templateData.slideShow == true ){
            window.guideAlertsOBJ.push({
                code:13,
                priority:3,
                icon:'ico-slideshow',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.slideShow}`,
                cpPage:null,
                popupPage:'Website-SlideShow',
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    gallery (drawAlerts=true){
        if(account.authorities[3] == false){return}
        this.deleteGuideAlert(30)
        if(website.gallery == '' && website.templateData.gallery == true ){
            window.guideAlertsOBJ.push({
                code:30,
                priority:3,
                icon:'ico-images',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.gallery}`,
                cpPage:null,
                popupPage:'Website-Gallery',
                popup:null,
                scrollToElem:null,
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteSwitch (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(15)
        if(website.active == false ){
            window.guideAlertsOBJ.push({
                code:15,
                priority:5,
                icon:'ico-power',
                img:null,
                lang:null,
                text:`${texts.cpanel.guideHints.websiteSwitch}`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system-websiteSwitchWindow',
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteIcon (drawAlerts=true){
        // if(account.authorities[4] == false){return}
        // this.deleteGuideAlert(16)
        // if(website.icon == null || website.icon == ''){
        //     window.guideAlertsOBJ.push({
        //         code:16,
        //         priority:4,
        //         icon:'ico-image',
        //         img:null,
        //         lang:null,
        //         text:`${texts.cpanel.guideHints.websiteIcon}`,
        //         cpPage:'restaurant_information',
        //         popupPage:null,
        //         popup:null,
        //         scrollToElem:null,
        //         selectElem:null,
        //         attrs:{},
        //     })
        // }
        // this.guideHintsCounter(drawAlerts);
    }
    websiteLogo (drawAlerts=true){
        // if(account.authorities[4] == false){return}
        // this.deleteGuideAlert(17)
        // if(website.logo == null || website.logo == ''){
        //     window.guideAlertsOBJ.push({
        //         code:17,
        //         priority:4,
        //         icon:'ico-image',
        //         img:null,
        //         lang:null,
        //         text:`${texts.cpanel.guideHints.websiteIcon}`,
        //         cpPage:'restaurant_information',
        //         popupPage:null,
        //         popup:null,
        //         scrollToElem:null,
        //         selectElem:null,
        //         attrs:{},
        //     })
        // }
        // this.guideHintsCounter(drawAlerts);
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
                popupPage:null,
                popup:null,
                scrollToElem:'settings-generalSettings-phoneNumberWindow',
                selectElem:null,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteAddressess (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(20)
        if(website.addresses.en == '' || website.addresses.en == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'en',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.inen}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_en',
                selectElem:'setting-restaurantAddress_en',
                attrs:{},
            })
        }
        if(website.addresses.ar == '' || website.addresses.ar == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'ar',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.inar}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_ar',
                selectElem:'setting-restaurantAddress_ar',
                attrs:{},
            })
        }
        if(website.addresses.eg == '' || website.addresses.eg == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'eg',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_eg',
                selectElem:'setting-restaurantAddress_eg',
                attrs:{},
            })
        }
        if(website.addresses.fr == '' || website.addresses.fr == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'fr',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.infr}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_fr',
                selectElem:'setting-restaurantAddress_fr',
                attrs:{},
            })
        }
        if(website.addresses.it == '' || website.addresses.it == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'it',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.init}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_it',
                selectElem:'setting-restaurantAddress_it',
                attrs:{},
            })
        }
        if(website.addresses.de == '' || website.addresses.de == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'de',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.inde}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_de',
                selectElem:'setting-restaurantAddress_de',
                attrs:{},
            })
        }
        if(website.addresses.es == '' || website.addresses.es == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'es',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.ines}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_es',
                selectElem:'setting-restaurantAddress_es',
                attrs:{},
            })
        }
        if(website.addresses.ru == '' || website.addresses.ru == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'ru',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.inru}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_ru',
                selectElem:'setting-restaurantAddress_ru',
                attrs:{},
            })
        }
        if(website.addresses.ua == '' || website.addresses.ua == null){
            window.guideAlertsOBJ.push({
                code:20,
                priority:4,
                icon:'ico-address',
                img:null,
                lang:'ua',
                text:`${texts.cpanel.guideHints.websiteAddress1} ${texts.cpanel.guideHints.inua}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantAddress_ua',
                selectElem:'setting-restaurantAddress_ua',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteNames (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(21)
        if(website.websiteNames.en == '' || website.websiteNames.en == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'en',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.inen}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-enName',
                selectElem:'setting-restaurantName-enName',
                attrs:{},
            })
        }
        if(website.websiteNames.ar == '' || website.websiteNames.ar == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'ar',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.inar}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-arName',
                selectElem:'setting-restaurantName-arName',
                attrs:{},
            })
        }
        if(website.websiteNames.eg == '' || website.websiteNames.eg == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'eg',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-egName',
                selectElem:'setting-restaurantName-egName',
                attrs:{},
            })
        }
        if(website.websiteNames.fr == '' || website.websiteNames.fr == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'fr',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.infr}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-frName',
                selectElem:'setting-restaurantName-frName',
                attrs:{},
            })
        }
        if(website.websiteNames.it == '' || website.websiteNames.it == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'it',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.init}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-itName',
                selectElem:'setting-restaurantName-itName',
                attrs:{},
            })
        }
        if(website.websiteNames.de == '' || website.websiteNames.de == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'de',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.inde}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-deName',
                selectElem:'setting-restaurantName-deName',
                attrs:{},
            })
        }
        if(website.websiteNames.es == '' || website.websiteNames.es == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'es',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.ines}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-esName',
                selectElem:'setting-restaurantName-esName',
                attrs:{},
            })
        }
        if(website.websiteNames.ru == '' || website.websiteNames.ru == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'ru',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.inru}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-ruName',
                selectElem:'setting-restaurantName-ruName',
                attrs:{},
            })
        }
        if(website.websiteNames.ua == '' || website.websiteNames.ua == null){
            window.guideAlertsOBJ.push({
                code:21,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:'ua',
                text:`${texts.cpanel.guideHints.websiteName} ${texts.cpanel.guideHints.inua}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'setting-restaurantName-uaName',
                selectElem:'setting-restaurantName-uaName',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteDescriptions (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(22)
        if(website.websiteDescriptions.en == '' || website.websiteDescriptions.en == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'en',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.inen}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_en',
                selectElem:'settings_websiteDescription_en',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.ar == '' || website.websiteDescriptions.ar == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'ar',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.inar}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_ar',
                selectElem:'settings_websiteDescription_ar',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.eg == '' || website.websiteDescriptions.eg == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'eg',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_eg',
                selectElem:'settings_websiteDescription_eg',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.fr == '' || website.websiteDescriptions.fr == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'fr',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.infr}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_fr',
                selectElem:'settings_websiteDescription_fr',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.it == '' || website.websiteDescriptions.it == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'it',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.init}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_it',
                selectElem:'settings_websiteDescription_it',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.de == '' || website.websiteDescriptions.de == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'de',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.inde}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_de',
                selectElem:'settings_websiteDescription_de',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.es == '' || website.websiteDescriptions.es == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'es',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.ines}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_es',
                selectElem:'settings_websiteDescription_es',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.ru == '' || website.websiteDescriptions.ru == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'ru',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.inru}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_ru',
                selectElem:'settings_websiteDescription_ru',
                attrs:{},
            })
        }
        if(website.websiteDescriptions.ua == '' || website.websiteDescriptions.ua == null){
            window.guideAlertsOBJ.push({
                code:22,
                priority:4,
                icon:'ico-description',
                img:null,
                lang:'ua',
                text:`${texts.cpanel.guideHints.websiteDescription} ${texts.cpanel.guideHints.inua}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings_websiteDescription_ua',
                selectElem:'settings_websiteDescription_ua',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteCurrencies (drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(23)
        if(website.currencies.en == '' || website.currencies.en == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'en',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.inen}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-enCurrency',
                selectElem:'settings-enCurrency',
                attrs:{},
            })
        }
        if(website.currencies.ar == '' || website.currencies.ar == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'ar',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.inar}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-arCurrency',
                selectElem:'settings-arCurrency',
                attrs:{},
            })
        }
        if(website.currencies.eg == '' || website.currencies.eg == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'eg',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-egCurrency',
                selectElem:'settings-egCurrency',
                attrs:{},
            })
        }
        if(website.currencies.fr == '' || website.currencies.fr == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'fr',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.infr}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-frCurrency',
                selectElem:'settings-frCurrency',
                attrs:{},
            })
        }
        if(website.currencies.it == '' || website.currencies.it == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'it',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.init}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-itCurrency',
                selectElem:'settings-itCurrency',
                attrs:{},
            })
        }
        if(website.currencies.de == '' || website.currencies.de == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'de',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.inde}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-deCurrency',
                selectElem:'settings-deCurrency',
                attrs:{},
            })
        }
        if(website.currencies.es == '' || website.currencies.es == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'es',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.ines}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-esCurrency',
                selectElem:'settings-esCurrency',
                attrs:{},
            })
        }
        if(website.currencies.ru == '' || website.currencies.ru == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'ru',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.inru}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-ruCurrency',
                selectElem:'settings-ruCurrency',
                attrs:{},
            })
        }
        if(website.currencies.ua == '' || website.currencies.ua == null){
            window.guideAlertsOBJ.push({
                code:23,
                priority:4,
                icon:'ico-money',
                img:null,
                lang:'ua',
                text:`${texts.cpanel.guideHints.websiteCurrency} ${texts.cpanel.guideHints.inua}.`,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:'settings-uaCurrency',
                selectElem:'settings-uaCurrency',
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteAnnouncements(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(24)
        if(
            website.website_announcements.en != '' ||
            website.website_announcements.ar != '' ||
            website.website_announcements.eg != '' ||
            website.website_announcements.fr != '' ||
            website.website_announcements.it != '' ||
            website.website_announcements.de != '' ||
            website.website_announcements.es != '' ||
            website.website_announcements.ru != '' ||
            website.website_announcements.ua != ''
        ){
            if(website.website_announcements.en == '' || website.website_announcements.en == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'en',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.inen}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_enAnnouncement',
                    selectElem:'settings_enAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.ar == '' || website.website_announcements.ar == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'ar',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.inar}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_arAnnouncement',
                    selectElem:'settings_arAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.eg == '' || website.website_announcements.eg == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'eg',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_egAnnouncement',
                    selectElem:'settings_egAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.fr == '' || website.website_announcements.fr == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'fr',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.infr}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_frAnnouncement',
                    selectElem:'settings_frAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.it == '' || website.website_announcements.it == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'it',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.init}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_itAnnouncement',
                    selectElem:'settings_itAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.de == '' || website.website_announcements.de == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'de',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.inde}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_deAnnouncement',
                    selectElem:'settings_deAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.es == '' || website.website_announcements.es == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'es',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.ines}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_esAnnouncement',
                    selectElem:'settings_esAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.ru == '' || website.website_announcements.ru == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'ru',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.inru}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_ruAnnouncement',
                    selectElem:'settings_ruAnnouncement',
                    attrs:{},
                })
            }
            if(website.website_announcements.ua == '' || website.website_announcements.ua == null){
                window.guideAlertsOBJ.push({
                    code:24,
                    priority:4,
                    icon:'ico-edit',
                    img:null,
                    lang:'ua',
                    text:`${texts.cpanel.guideHints.websiteAnnouncement} ${texts.cpanel.guideHints.inua}.`,
                    cpPage:'restaurant_information',
                    popupPage:null,
                    popup:null,
                    scrollToElem:'settings_uaAnnouncement',
                    selectElem:'settings_uaAnnouncement',
                    attrs:{},
                })
            }
        }
        this.guideHintsCounter(drawAlerts);
    }
    websiteReceiptMsgs(drawAlerts=true){
        if(account.authorities[4] == false){return}
        this.deleteGuideAlert(25)
        if(website.website_receiptMsgs[website.receiptLanguage] == '' || website.website_receiptMsgs[website.receiptLanguage] == null){
            let text = `${texts.cpanel.guideHints.websiteReceiptMsg1} ${texts.cpanel.guideHints['in'+website.receiptLanguage]} ${texts.cpanel.guideHints.websiteReceiptMsg2}`;
            website.receiptLanguage == 'eg' ? `${texts.cpanel.guideHints.websiteReceiptMsg1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span> ${texts.cpanel.guideHints.websiteReceiptMsg2}` : null;
            window.guideAlertsOBJ.push({
                code:25,
                priority:4,
                icon:'ico-edit',
                img:null,
                lang:website.receiptLanguage,
                text:text,
                cpPage:'restaurant_information',
                popupPage:null,
                popup:null,
                scrollToElem:`settings_${website.receiptLanguage}ReceiptMsg`,
                selectElem:`settings_${website.receiptLanguage}ReceiptMsg`,
                attrs:{},
            })
        }
        this.guideHintsCounter(drawAlerts);

    }
    websitePrivacyPolicy(drawAlerts=true){
        if(account.is_master == false){return}
        this.deleteGuideAlert(27)
        if(website.website_privacyPolicy.en == '' || website.website_privacyPolicy.en == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'en',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.inen}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_enPrivacyPolicy',
                selectElem:'system_enPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.ar == '' || website.website_privacyPolicy.ar == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'ar',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.inar}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_arPrivacyPolicy',
                selectElem:'system_arPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.eg == '' || website.website_privacyPolicy.eg == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'eg',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_egPrivacyPolicy',
                selectElem:'system_egPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.fr == '' || website.website_privacyPolicy.fr == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'fr',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.infr}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_frPrivacyPolicy',
                selectElem:'system_frPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.it == '' || website.website_privacyPolicy.it == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'it',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.init}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_itPrivacyPolicy',
                selectElem:'system_itPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.de == '' || website.website_privacyPolicy.de == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'de',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.inde}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_dePrivacyPolicy',
                selectElem:'system_dePrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.es == '' || website.website_privacyPolicy.es == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'es',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.ines}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_esPrivacyPolicy',
                selectElem:'system_esPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.ru == '' || website.website_privacyPolicy.ru == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'ru',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.inru}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_ruPrivacyPolicy',
                selectElem:'system_ruPrivacyPolicy',
                attrs:{},
            })
        }
        if(website.website_privacyPolicy.ua == '' || website.website_privacyPolicy.ua == null){
            window.guideAlertsOBJ.push({
                code:27,
                priority:4,
                icon:'ico-warning',
                img:null,
                lang:'ua',
                text:`${texts.cpanel.guideHints.websitePrivacyPolicy} ${texts.cpanel.guideHints.inua}.`,
                cpPage:'system',
                popupPage:null,
                popup:null,
                scrollToElem:'system_uaPrivacyPolicy',
                selectElem:'system_uaPrivacyPolicy',
                attrs:{},
            })
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
                text:`${texts.cpanel.guideHints.restaurantLocation}`,
                cpPage:null,
                popupPage:'Restaurant-Location',
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
                text:`${texts.cpanel.guideHints.restaurantEmail}`,
                cpPage:'restaurant_information',
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
            let langClass;
            let customLangFlagClass = '';
            if(guideAlert.lang != null){
                switch(guideAlert.lang){
                    case 'en':langFlag = 'USA.png'; langClass = 'languageInput_en';break;
                    case 'fr':langFlag = 'FRA.png'; langClass = 'languageInput_fr';break;
                    case 'de':langFlag = 'DEU.png'; langClass = 'languageInput_de';break;
                    case 'it':langFlag = 'ITA.png'; langClass = 'languageInput_it';break;
                    case 'es':langFlag = 'ESP.png'; langClass = 'languageInput_es';break;
                    case 'ar':langFlag = 'EGY.png'; langClass = 'languageInput_ar';break;
                    case 'ru':langFlag = 'RUS.png'; langClass = 'languageInput_ru';break;
                    case 'ua':langFlag = 'UKR.png'; langClass = 'languageInput_ua';break;
                    case 'eg':langFlag = website.customLang_flag+'.png'; langClass = 'languageInput_eg'; customLangFlagClass = 'customLangFlag'; break;
                }
            if(guideAlert.icon == null){
                guideAlertLangImg = $('<img/>',{class:`guideAlertLangImg ${customLangFlagClass}`,src:`./storage/imgs/flags/${langFlag}`})
            }else{
                guideAlertLangImg = $('<img/>',{class:`guideAlertLangImg2 ${customLangFlagClass}`,src:`./storage/imgs/flags/${langFlag}`})
            }
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
            let guideAlertIconContainerClass = 'guideAlertIconContainer';
            if(guideAlert.icon != null && guideAlert.lang != null){
                guideAlertIconContainerClass = 'guideAlertIconContainer2';
            }

            let linkClass;
            guideAlert.cpPage != null ? linkClass = 'cpPage' : guideAlert.popupPage != null ? linkClass = 'popupPage' : null ;
            guideAlert.priority == 5 ? linkClass = linkClass + ' guideAlertContainer-red' : null;
            guideAlert.code == 36 ? linkClass = linkClass + ' guideAlertContainer-orange' : null;
            $('#guideHintsContainer').append(
                thisGuideAlert = $('<a/>',{
                    class:`guideAlertContainer ${linkClass} ${langClass}`,
                    priority:guideAlert.priority,
                    popupPage:guideAlert.popupPage,
                    cpPage:guideAlert.cpPage,
                    selectElem:guideAlert.selectElem,
                    scrollToElem:guideAlert.scrollToElem,
                }).append(
                    $('<div/>',{class:guideAlertIconContainerClass}).append(
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
            if(Alert.lang == null || Object.values(website.languages).indexOf(Alert.lang) > -1){
                guideHintsNumber = guideHintsNumber + 1;
            }
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
        window.guideHints.emailVerification(false);
        window.guideHints.phoneRegister(false);
        window.guideHints.phoneVerification(false);
        window.guideHints.categories(false);
        window.guideHints.products(false);
        window.guideHints.homePageIntro(false);
        window.guideHints.homePageInfo(false);
        window.guideHints.homePageOurStory(false);
        window.guideHints.slideShow(false);
        window.guideHints.gallery(false);
        window.guideHints.websiteSwitch(false);
        // window.guideHints.websiteIcon(); // canceled because there will be always a logo and icon
        // window.guideHints.websiteLogo(); // canceled because there will be always a logo and icon
        window.guideHints.websitePhoneNumbers(false);
        window.guideHints.websiteAddressess(false);
        window.guideHints.websiteNames(false);
        window.guideHints.websiteDescriptions(false);
        window.guideHints.websiteCurrencies(false);
        window.guideHints.websiteAnnouncements(false);
        window.guideHints.websiteReceiptMsgs(false);
        window.guideHints.websitePrivacyPolicy(false);
        window.guideHints.restaurantLocation(false);
        window.guideHints.restaurantEmail(false);
        window.guideHints.subscriptionCheck(false);
        window.guideHints.drawGuideAlerts();
    }
}
window.guideHints = new guideHintsClass();
window.guideHints.all();
