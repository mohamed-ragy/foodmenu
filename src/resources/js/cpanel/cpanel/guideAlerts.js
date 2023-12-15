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
                        img:category.thumbnail,
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
                        img:category.thumbnail,
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
                    img:product.thumbnail,
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
                    img:product.thumbnail,
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
                        img:product.thumbnail,
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
                        img:product.thumbnail,
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
                            img:product.thumbnail,
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
                                img:product.thumbnail,
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
    // homePageIntro (drawAlerts=true){
    //     if(account.authorities[3] == false){return}
    //     this.deleteGuideAlert(33)
    //     if(website.templateData.intro == true ){
    //         if(website.intro.title_en == '' || website.intro.title_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-en',
    //                 selectElem:'homePageSections-introTitle-en',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_fr == '' || website.intro.title_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-fr',
    //                 selectElem:'homePageSections-introTitle-fr',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_de == '' || website.intro.title_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-de',
    //                 selectElem:'homePageSections-introTitle-de',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_es == '' || website.intro.title_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-es',
    //                 selectElem:'homePageSections-introTitle-es',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_it == '' || website.intro.title_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-it',
    //                 selectElem:'homePageSections-introTitle-it',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_ar == '' || website.intro.title_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-ar',
    //                 selectElem:'homePageSections-introTitle-ar',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_eg == '' || website.intro.title_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-eg',
    //                 selectElem:'homePageSections-introTitle-eg',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_ru == '' || website.intro.title_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-ru',
    //                 selectElem:'homePageSections-introTitle-ru',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.intro.title_ua == '' || website.intro.title_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.introTitle1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-introTitle-ua',
    //                 selectElem:'homePageSections-introTitle-ua',
    //                 attrs:{},

    //             })
    //         }

    //         if(website.intro.des_en == '' || website.intro.des_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_en',
    //                 selectElem:'homePageSections_introDes_en',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_fr == '' || website.intro.des_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_fr',
    //                 selectElem:'homePageSections_introDes_fr',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_de == '' || website.intro.des_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_de',
    //                 selectElem:'homePageSections_introDes_de',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_es == '' || website.intro.des_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_es',
    //                 selectElem:'homePageSections_introDes_es',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_it == '' || website.intro.des_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_it',
    //                 selectElem:'homePageSections_introDes_it',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_ar == '' || website.intro.des_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_ar',
    //                 selectElem:'homePageSections_introDes_ar',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_eg == '' || website.intro.des_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_eg',
    //                 selectElem:'homePageSections_introDes_eg',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_ru == '' || website.intro.des_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_ru',
    //                 selectElem:'homePageSections_introDes_ru',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.intro.des_ua == '' || website.intro.des_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:33,
    //                 priority:3,
    //                 icon:'ico-basics',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.introDes1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Intro',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_introDes_ua',
    //                 selectElem:'homePageSections_introDes_ua',
    //                 attrs:{},
    //             })
    //         }
    //     }
    //     this.guideHintsCounter(drawAlerts);

    // }
    // homePageInfo (drawAlerts=true){
    //     if(account.authorities[3] == false){return}
    //     this.deleteGuideAlert(34)
    //     if(website.templateData.info == true ){
    //         if(website.info.title_en == '' || website.info.title_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-en',
    //                 selectElem:'homePageSections-infoTitle-en',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.title_fr == '' || website.info.title_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-fr',
    //                 selectElem:'homePageSections-infoTitle-fr',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_de == '' || website.info.title_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-de',
    //                 selectElem:'homePageSections-infoTitle-de',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_es == '' || website.info.title_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-es',
    //                 selectElem:'homePageSections-infoTitle-es',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_it == '' || website.info.title_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-it',
    //                 selectElem:'homePageSections-infoTitle-it',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_ar == '' || website.info.title_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-ar',
    //                 selectElem:'homePageSections-infoTitle-ar',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_eg == '' || website.info.title_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-eg',
    //                 selectElem:'homePageSections-infoTitle-eg',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_ru == '' || website.info.title_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-ru',
    //                 selectElem:'homePageSections-infoTitle-ru',
    //                 attrs:{},

    //             })
    //         }
    //         if(website.info.title_ua == '' || website.info.title_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.infoTitle1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-infoTitle-ua',
    //                 selectElem:'homePageSections-infoTitle-ua',
    //                 attrs:{},

    //             })
    //         }

    //         if(website.info.des_en == '' || website.info.des_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_en',
    //                 selectElem:'homePageSections_infoDes_en',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_fr == '' || website.info.des_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_fr',
    //                 selectElem:'homePageSections_infoDes_fr',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_de == '' || website.info.des_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_de',
    //                 selectElem:'homePageSections_infoDes_de',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_es == '' || website.info.des_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_es',
    //                 selectElem:'homePageSections_infoDes_es',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_it == '' || website.info.des_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_it',
    //                 selectElem:'homePageSections_infoDes_it',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_ar == '' || website.info.des_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_ar',
    //                 selectElem:'homePageSections_infoDes_ar',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_eg == '' || website.info.des_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_eg',
    //                 selectElem:'homePageSections_infoDes_eg',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_ru == '' || website.info.des_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_ru',
    //                 selectElem:'homePageSections_infoDes_ru',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.info.des_ua == '' || website.info.des_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:34,
    //                 priority:3,
    //                 icon:'ico-info',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.infoDes1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-Info',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_infoDes_ua',
    //                 selectElem:'homePageSections_infoDes_ua',
    //                 attrs:{},
    //             })
    //         }
    //     }
    //     this.guideHintsCounter(drawAlerts);

    // }
    // homePageOurStory (drawAlerts=true){
    //     if(account.authorities[3] == false){return}
    //     this.deleteGuideAlert(35)
    //     if(website.templateData.ourStory == true ){
    //         if(website.ourStory.title_en == '' || website.ourStory.title_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-en',
    //                 selectElem:'homePageSections-ourStoryTitle-en',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_fr == '' || website.ourStory.title_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-fr',
    //                 selectElem:'homePageSections-ourStoryTitle-fr',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_de == '' || website.ourStory.title_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-de',
    //                 selectElem:'homePageSections-ourStoryTitle-de',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_es == '' || website.ourStory.title_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-es',
    //                 selectElem:'homePageSections-ourStoryTitle-es',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_it == '' || website.ourStory.title_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-it',
    //                 selectElem:'homePageSections-ourStoryTitle-it',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_ar == '' || website.ourStory.title_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-ar',
    //                 selectElem:'homePageSections-ourStoryTitle-ar',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_eg == '' || website.ourStory.title_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.in} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-eg',
    //                 selectElem:'homePageSections-ourStoryTitle-eg',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_ru == '' || website.ourStory.title_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-ru',
    //                 selectElem:'homePageSections-ourStoryTitle-ru',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.title_ua == '' || website.ourStory.title_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.ourStoryTitle1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections-ourStoryTitle-ua',
    //                 selectElem:'homePageSections-ourStoryTitle-ua',
    //                 attrs:{},
    //             })
    //         }

    //         if(website.ourStory.des_en == '' || website.ourStory.des_en == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'en',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inen}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_en',
    //                 selectElem:'homePageSections_ourStoryDes_en',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_fr == '' || website.ourStory.des_fr == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'fr',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.infr}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_fr',
    //                 selectElem:'homePageSections_ourStoryDes_fr',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_de == '' || website.ourStory.des_de == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'de',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inde}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_de',
    //                 selectElem:'homePageSections_ourStoryDes_de',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_es == '' || website.ourStory.des_es == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'es',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.ines}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_es',
    //                 selectElem:'homePageSections_ourStoryDes_es',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_it == '' || website.ourStory.des_it == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'it',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.init}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_it',
    //                 selectElem:'homePageSections_ourStoryDes_it',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_ar == '' || website.ourStory.des_ar == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ar',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inar}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_ar',
    //                 selectElem:'homePageSections_ourStoryDes_ar',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_eg == '' || website.ourStory.des_eg == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'eg',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inar} <span class="customLangName bold"></span>.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_eg',
    //                 selectElem:'homePageSections_ourStoryDes_eg',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_ru == '' || website.ourStory.des_ru == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ru',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inru}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_ru',
    //                 selectElem:'homePageSections_ourStoryDes_ru',
    //                 attrs:{},
    //             })
    //         }
    //         if(website.ourStory.des_ua == '' || website.ourStory.des_ua == null){
    //             window.guideAlertsOBJ.push({
    //                 code:35,
    //                 priority:3,
    //                 icon:'ico-description',
    //                 img:null,
    //                 lang:'ua',
    //                 text:`${texts.cpanel.guideHints.ourStoryDes1} ${texts.cpanel.guideHints.inua}.`,
    //                 cpPage:null,
    //                 popupPage:'Website-OurStory',
    //                 popup:null,
    //                 scrollToElem:'homePageSections_ourStoryDes_ua',
    //                 selectElem:'homePageSections_ourStoryDes_ua',
    //                 attrs:{},
    //             })
    //         }
    //     }
    //     this.guideHintsCounter(drawAlerts);

    // }
    // slideShow (drawAlerts=true){
    //     if(account.authorities[3] == false){return}
    //     this.deleteGuideAlert(13)
    //     if(website.slideShow.content.length == 0 && website.templateData.slideShow == true ){
    //         window.guideAlertsOBJ.push({
    //             code:13,
    //             priority:3,
    //             icon:'ico-slideshow',
    //             img:null,
    //             lang:null,
    //             text:`${texts.cpanel.guideHints.slideShow}`,
    //             cpPage:null,
    //             popupPage:'Website-SlideShow',
    //             popup:null,
    //             scrollToElem:null,
    //             selectElem:null,
    //             attrs:{},
    //         })
    //     }
    //     this.guideHintsCounter(drawAlerts);
    // }
    // gallery (drawAlerts=true){
    //     if(account.authorities[3] == false){return}
    //     this.deleteGuideAlert(30)
    //     if(website.gallery == '' && website.templateData.gallery == true ){
    //         window.guideAlertsOBJ.push({
    //             code:30,
    //             priority:3,
    //             icon:'ico-images',
    //             img:null,
    //             lang:null,
    //             text:`${texts.cpanel.guideHints.gallery}`,
    //             cpPage:null,
    //             popupPage:'Website-Gallery',
    //             popup:null,
    //             scrollToElem:null,
    //             selectElem:null,
    //             attrs:{},
    //         })
    //     }
    //     this.guideHintsCounter(drawAlerts);
    // }
    // websiteSwitch (drawAlerts=true){
    //     if(account.authorities[4] == false){return}
    //     this.deleteGuideAlert(15)
    //     if(website.active == false ){
    //         window.guideAlertsOBJ.push({
    //             code:15,
    //             priority:5,
    //             icon:'ico-power',
    //             img:null,
    //             lang:null,
    //             text:`${texts.cpanel.guideHints.websiteSwitch}`,
    //             cpPage:'system',
    //             popupPage:null,
    //             popup:null,
    //             scrollToElem:'system-websiteSwitchWindow',
    //             selectElem:null,
    //             attrs:{},
    //         })
    //     }
    //     this.guideHintsCounter(drawAlerts);
    // }
    // websiteIcon (drawAlerts=true){
    //     // if(account.authorities[4] == false){return}
    //     // this.deleteGuideAlert(16)
    //     // if(website.icon == null || website.icon == ''){
    //     //     window.guideAlertsOBJ.push({
    //     //         code:16,
    //     //         priority:4,
    //     //         icon:'ico-image',
    //     //         img:null,
    //     //         lang:null,
    //     //         text:`${texts.cpanel.guideHints.websiteIcon}`,
    //     //         cpPage:'restaurant_information',
    //     //         popupPage:null,
    //     //         popup:null,
    //     //         scrollToElem:null,
    //     //         selectElem:null,
    //     //         attrs:{},
    //     //     })
    //     // }
    //     // this.guideHintsCounter(drawAlerts);
    // }
    // websiteLogo (drawAlerts=true){
    //     // if(account.authorities[4] == false){return}
    //     // this.deleteGuideAlert(17)
    //     // if(website.logo == null || website.logo == ''){
    //     //     window.guideAlertsOBJ.push({
    //     //         code:17,
    //     //         priority:4,
    //     //         icon:'ico-image',
    //     //         img:null,
    //     //         lang:null,
    //     //         text:`${texts.cpanel.guideHints.websiteIcon}`,
    //     //         cpPage:'restaurant_information',
    //     //         popupPage:null,
    //     //         popup:null,
    //     //         scrollToElem:null,
    //     //         selectElem:null,
    //     //         attrs:{},
    //     //     })
    //     // }
    //     // this.guideHintsCounter(drawAlerts);
    // }
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
                // if(guideAlert.icon == null){
                    guideAlertLangImg = $('<img/>',{class:`guideAlertLangImg`,src:`./storage/imgs/flags/${langFlag}`})
                // }else{
                //     guideAlertLangImg = $('<img/>',{class:`guideAlertLangImg2`,src:`./storage/imgs/flags/${langFlag}`})
                // }
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
        // window.guideHints.homePageIntro(false);
        // window.guideHints.homePageInfo(false);
        // window.guideHints.homePageOurStory(false);
        // window.guideHints.slideShow(false);
        // window.guideHints.gallery(false);
        // window.guideHints.websiteSwitch();

        // window.guideHints.websiteIcon(); // canceled because there will be always a logo and icon
        // window.guideHints.websiteLogo(); // canceled because there will be always a logo and icon

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
        window.guideHints.drawGuideAlerts();
    }
}
window.guideHints = new guideHintsClass();
window.guideHints.all();
