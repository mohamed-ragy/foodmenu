

statistics = class  {
    constructor(isCompare,date1,date2,data1,data2,_data1,_data2,period){
        $('.statisticsContainer').text('')
        this.isCompare = isCompare;
        this.date1 = date1;
        this.date2 = date2;
        this.data1 = data1;
        this.data2 = data2;
        this._data1 = _data1;
        this._data2 = _data2;
        this.period = period;
        for(const key in this._data1){
            for(const key2 in this._data1[key].products){
                this._data1[key].products[key2].id = key2;
            }
        }
        for(const key in this._data2){
            for(const key2 in this._data2[key].products){
                this._data2[key].products[key2].id = key2;
            }
        }
        $('.statisticsTabElem[statisticsTab="overview"]').trigger('click');
        if(isCompare){
            $('#StatisticsWindowDate').text('').append(
                $('<div/>',{class:'fs103 cs1 bold',text:date1}),
                $('<div/>',{class:'mT5'}).append(
                    $('<span/>',{class:'fs101 bold c-placeholder2 mie-3',text:texts.cpanel.public.vs}),
                    $('<span/>',{class:'fs103 cs2 bold',text:date2}),
                ),
            )
        }else{
            $('#StatisticsWindowDate').text('').append(
                $('<div/>',{class:'fs103 cs1 bold',text:date1})
            )
        }

    }

    drawDayGraph(container){
        container.append(
            $('<div/>',{class:'statisticsGraphLeftContainer'}).append(
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
            ),
            $('<div/>',{class:'statisticsGraphBlocksContainer'}).append(
                // $('<div/>',{class:'statisticsGrapHLine'}),
                $('<div/>',{class:'statisticsGrapHLine'}),
                $('<div/>',{class:'statisticsGrapHLine'}),
                ////
                $('<div/>',{class:'statisticsGraphBlock',hour:'0'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'1'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'2'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'3'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,3,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'4'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'5'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'6'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,6,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'7'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'8'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'9'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,9,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'10'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'11'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'12'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,12,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'13'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'14'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'15'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,15,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'16'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'17'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'18'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,18,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'19'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'20'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'21'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(0,0,0,21,0,0).toISOString(),'onlyTime')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',hour:'22'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',hour:'23'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
            )
        )
    }
    drawMonthGraph(container){
        let monthDays = new Date(this.data1.year,this.data1.month,0).getDate();
        container.append(
            $('<div/>',{class:'statisticsGraphLeftContainer'}).append(
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
            ),
            $('<div/>',{class:'statisticsGraphBlocksContainer'}).append(
                $('<div/>',{class:'statisticsGrapHLine'}),
                $('<div/>',{class:'statisticsGrapHLine'}),
            )
        )
        // for(const key in this._data1){
        for(let i=1; i<=31;i++){
            if(i == 5 || i == 10 || i == 15 || i == 20 || i == 25 || i == 30 ){
                // let botTxt ='sdf'
                let botTxt = `<div>${getDateAndTime2(new Date(this.data1.year,(parseInt(this.data1.month - 1)),i,0,0,0).toISOString(),'dayAndMonthShort')}</div>`;
                if(this.isCompare){
                    for(const key2 in this._data2){
                        if(this._data2[key2].day == i){
                            botTxt = `<div>${getDateAndTime2(new Date(this.data1.year,(parseInt(this.data1.month) - 1),i,0,0,0).toISOString(),'dayAndMonthShort')},</div><div>${getDateAndTime2(new Date(this.data2.year,(parseInt(this.data2.month) - 1),i,0,0,0).toISOString(),'dayAndMonthShort')}</div>`;
                        }
                    }
                }
                container.find('.statisticsGraphBlocksContainer').append(
                    $('<div/>',{class:'statisticsGraphBlock',day:i}).append(
                        $('<div/>',{class:'statisticsGraphBlock_line1'}),
                        $('<div/>',{class:'statisticsGraphBlock_line2'}),
                        $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                        $('<div/>',{class:'statisticsGraphBlock_botTxt',html:botTxt})
                    ),
                );
            }else{
                container.find('.statisticsGraphBlocksContainer').append(
                    $('<div/>',{class:'statisticsGraphBlock',day:i}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),

                );
            }

        }
    }
    drawYearGraph(container){
        container.append(
            $('<div/>',{class:'statisticsGraphLeftContainer'}).append(
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
                $('<div/>',{class:'statisticsGraphLeft',text:'--'}),
            ),
            $('<div/>',{class:'statisticsGraphBlocksContainer'}).append(
                $('<div/>',{class:'statisticsGrapHLine'}),
                $('<div/>',{class:'statisticsGrapHLine'}),
                ////
                $('<div/>',{class:'statisticsGraphBlock',month:'1'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'2'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,2,0,0,0,0).toISOString(),'monthShort')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',month:'3'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'4'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,4,0,0,0,0).toISOString(),'monthShort')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',month:'5'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'6'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,6,0,0,0,0).toISOString(),'monthShort')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',month:'7'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'8'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,8,0,0,0,0).toISOString(),'monthShort')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',month:'9'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'10'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,10,0,0,0,0).toISOString(),'monthShort')})
                ),
                $('<div/>',{class:'statisticsGraphBlock',month:'11'}).append($('<div/>',{class:'statisticsGraphBlock_line1'}),$('<div/>',{class:'statisticsGraphBlock_line2'})),
                $('<div/>',{class:'statisticsGraphBlock',month:'12'}).append(
                    $('<div/>',{class:'statisticsGraphBlock_line1'}),
                    $('<div/>',{class:'statisticsGraphBlock_line2'}),
                    $('<div/>',{class:'statisticsGraphBlock_botLine'}),
                    $('<div/>',{class:'statisticsGraphBlock_botTxt',text:getDateAndTime2(new Date(this.data1.year,12,0,0,0,0).toISOString(),'monthShort')})
                ),
            )
        );
    }
    ///////////
    overview(){
        let soTotalCompare = '';
        this.isCompare ? soTotalCompare = compareNums(this.data1.so.total,this.data2.so.total) : null ;
        let topTotalElem = '';
        let topSumElem = '';
        let overviewProductsElem = '';
        if(this.data1.products.length != 0){
            if(this.isCompare){
                topTotalElem = this.productCard(1,this.products1_total[0],this.data2.products[this.products1_total[0].id] ?? null,this.date1,this.date2);
                topSumElem = this.productCard(1,this.products1_sum[0],this.data2.products[this.products1_sum[0].id] ?? null,this.date1,this.date2);
            }else{
                topTotalElem = this.productCard(0,this.products1_total[0],null,this.date1,this.date2);
                topSumElem = this.productCard(0,this.products1_sum[0],null,this.date1,this.date2);
            }
            overviewProductsElem = $('<div/>',{class:'w100p row wrap alnS jstfyC mT20 brdrB1 pB40'}).append(
                $('<div/>',{class:'mT40 p20 shdw4 br5 mX20 w400 none-1024'}).append(
                    $('<div/>',{class:'w100p-40 taC mB20 fs105 bold mX20',text:texts.statistics.topProfitableProducts}),
                    $('<div/>',{class:'topProfitableProductsContainer w100p'})
                ),
                $('<div/>',{class:'row wrap alnSH jstfyC p20 shdw4 br5 mX20 mT40'}).append(
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'w100p-10 taC mX5 mB20 fs105 bold ',text:texts.statistics.topProfitableProduct}),
                        topTotalElem,
                    ),
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'w100p-10 taC mX5 mB20 fs105 bold ',text:texts.statistics.topOrderedProduct}),
                        topSumElem,
                    )
                ),
            );
        }
        let overviewUsersElem = '';
        if(this.data1.users.length != 0){

            overviewUsersElem = $('<div/>',{class:'w100p row wrap alnS jstfyC mT20 pB40'}).append(
                $('<div/>',{class:'mT40 p20 shdw4 br5 mX20 w400 none-1024'}).append(
                    $('<div/>',{class:'w100p-40 taC mB20 fs105 bold mX20',text:texts.statistics.topProfitableUsers}),
                    $('<div/>',{class:'topProfitableUsersContainer w100p'})
                ),
                $('<div/>',{class:'mT40 p20 shdw4 br5 mX20 wFC none-1024'}).append(
                    $('<div/>',{class:'w100p-40 taC mB20 fs105 bold mX20',text:texts.statistics.topProfitableUser}),
                    $('<div/>',{class:'topProfitableUserContainer w100p'})
                ),
            )
        }
        $('.statisticsContainer[statisticsTab="overview"]').append(
            $('<div/>',{class:'row alnC jstfyC wrap brdrB1'}).append(
                $('<div/>',{class:'column alnS jstfyC p10 mie-20 mY20 mnw200 none-1024'}).append(
                        $('<div/>',{class:'fs205 bold',text:texts.statistics.income}),
                        $('<div/>',{class:'fs205 bold',html:website.currency+bigFloat(this.data1.so.total)+' '+soTotalCompare}),
                ),
                $('<div/>',{class:'row wrap alnSH jstfyC'}).append(
                    $('<div/>',{class:'column alnC jstfyS pX10 m20 p10 shdw4 br5 SoCoDonut1'}),
                    $('<div/>',{class:'column alnC jstfyS pX10 m20 p10 shdw4 br5 incomeDonut_so'}).append(
                        $('<div/>',{class:'fs103 bold',text:texts.statistics.successfulIncom})
                    ),
                    $('<div/>',{class:'column alnC jstfyS pX10 m20 p10 shdw4 br5 servicesDonut'}),
                ),

            ),
            overviewProductsElem,
            overviewUsersElem,

        )


        this.SoCoDonut($('.SoCoDonut1'),this.data1.so.orders,this.data1.co.orders,'so','co');
        this.incomeDonut($('.incomeDonut_so'),this.data1.so.total,this.data1.so.items_total,this.data1.so.tax,this.data1.so.delivery,this.data1.so.service)
        this.servicesDonut($('.servicesDonut'),this.data1.do.orders,this.data1.po.orders,this.data1.di.orders,'do','po','di');

        for(const key in this.products1_total){
            if(key <= 10){
                let compare = '';
                let compare2Total = 0;
                if(this.isCompare){
                    if(typeof(this.data2.products[this.products1_total[key].id]) !== 'undefined'){compare2Total = this.data2.products[this.products1_total[key].id].total}
                    compare = compareNums(this.products1_total[key].total,compare2Total)
                    window.statisticsPopups[this.products1_total[key].id] = this.productCard(1,this.data1.products[this.products1_total[key].id],this.data2.products[this.products1_total[key].id] ?? null,this.date1,this.date2)
                }else{
                    window.statisticsPopups[this.products1_total[key].id] = this.productCard(0,this.data1.products[this.products1_total[key].id],null,this.date1,this.date2)
                }
                $('.topProfitableProductsContainer').append(
                    $('<div/>',{class:'p10 row alnC jstfySB w100p-20 hvr-bgc-c2',key:this.products1_total[key].id,statisticsPopup:this.products1_total[key].id,statisticsPopupTitle:this.products1_total[key].id}).append(
                        $('<div/>',{class:'ellipsis mie-40',text:this.products1_total[key].id,}),
                        $('<div/>',{class:'taE tnw',html:website.currency+bigFloat(this.products1_total[key].total)+' '+compare})
                    )
                )
            }
        }

        for(const key in this.users1_total){
            if(key <= 10){
                let compare = '';
                let compare2Total = 0;
                let user2Data = {
                    id:this.users1_total[key].id,userName:this.users1_total[key].userName,
                    so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
                    co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
                    do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
                    po:0,po_itemsTotal:0,po_tax:0,po_total:0,
                    di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
                    rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
                }
                if(this.isCompare){
                    if(typeof(this.data2.users[this.users1_total[key].id]) !== 'undefined'){
                        compare2Total = this.data2.users[this.users1_total[key].id].so_total;
                        user2Data = this.data2.users[this.users1_total[key].id];
                    }
                    compare = compareNums(this.users1_total[key].so_total,compare2Total)
                    statisticsPopupUsers(1,this.users1_total[key].id,'user-'+this.users1_total[key].userName,this.users1_total[key],user2Data,this.date1,this.date2)

                }else{
                    statisticsPopupUsers(0,this.users1_total[key].id,'user-'+this.users1_total[key].userName,this.users1_total[key],null,this.date1,null)
                }
                $('.topProfitableUsersContainer').append(
                    $('<div/>',{class:'p10 row alnC jstfySB w100p-20 hvr-bgc-c2',key:this.users1_total[key].userName,statisticsPopup:'user-'+this.users1_total[key].userName,statisticsPopupTitle:this.users1_total[key].userName}).append(
                        $('<div/>',{class:'ellipsis mie-40',text:this.users1_total[key].userName,}),
                        $('<div/>',{class:'taE tnw',html:website.currency+bigFloat(this.users1_total[key].so_total)+' '+compare})
                    )
                )
            }
        }
        if(this.data1.users.length != 0){
            if(this.isCompare){
                if(typeof(this.data2.users[this.users1_total[0].id]) !== 'undefined'){
                    compare2Total = this.data2.users[this.users1_total[0].id].so_total;
                    user2Data = this.data2.users[this.users1_total[0].id];
                }
                compare = compareNums(this.users1_total[0].so_total,compare2Total)
                statisticsPopupUsers(1,this.users1_total[0].id,'user-topProfitableUser',this.users1_total[0],user2Data,this.date1,this.date2)

            }else{
                statisticsPopupUsers(0,this.users1_total[0].id,'user-topProfitableUser',this.users1_total[0],null,this.date1,null)
            }
            $('.topProfitableUserContainer').html(
                window.statisticsPopups['user-topProfitableUser']
            )
        }

    }
    ///////////
    orders(){
        if(this.isCompare){
            statisticsPopup_so(this.isCompare,'so',this.data1.so,this.data2.so,this.date1,this.date2)
            statisticsPopup_co(this.isCompare,'co',this.data1.co,this.data2.co,this.date1,this.date2)
            statisticsPopup_income(this.isCompare,'so-',this.data1.so,this.data2.so,this.date1,this.date2)
            statisticsPopup_do(this.isCompare,'do',this.data1.do,this.data2.do,this.date1,this.date2)
            statisticsPopup_po(this.isCompare,'po',this.data1.po,this.data2.po,this.date1,this.date2)
            statisticsPopup_di(this.isCompare,'di',this.data1.di,this.data2.di,this.date1,this.date2)
        }else{
            statisticsPopup_so(this.isCompare,'so',this.data1.so,null,this.date1,null)
            statisticsPopup_co(this.isCompare,'co',this.data1.co,null,this.date1,null)
            statisticsPopup_income(this.isCompare,'so-',this.data1.so,null,this.date1,null)
            statisticsPopup_do(this.isCompare,'do',this.data1.do,null,this.date1,null)
            statisticsPopup_po(this.isCompare,'po',this.data1.po,null,this.date1,null)
            statisticsPopup_di(this.isCompare,'di',this.data1.di,null,this.date1,null)
        }
        $('.statisticsContainer[statisticsTab="orders"]').append(
            $('<div/>',{class:'none block-1024 fs102 m20',text:texts.statistics.smallScreen}),
            $('<div/>',{class:'row alnSH jstfyC wrap'}).append(
                $('<div/>',{class:'mT20 w100p pT20 row alnS jstfyS none-1024'}).append(
                    $('<div/>',{class:`statisticsGraphsContainer`}).append(
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.successfulOrdersGraph,key1:'so',key2:'orders'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders statisticsGraphsElem_selected',text:texts.statistics.successfulOrdersIncomeGraph,key1:'so',key2:'total'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.canceledOrdersGraph,key1:'co',key2:'orders'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.canceledOrdersIncomeGraph,key1:'co',key2:'total'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.deliveriedOrdersGraph,key1:'do',key2:'orders'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.deliveriedOrdersIncomeGraph,key1:'do',key2:'total'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.pickedupOrdersGraph,key1:'po',key2:'orders'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.pickedupOrdersIncomeGraph,key1:'po',key2:'total'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.dineinOrdersGraph,key1:'di',key2:'orders'}),
                        $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_orders',text:texts.statistics.dineinOrdersIncomeGraph,key1:'di',key2:'total'}),
                    ),
                    $('<div/>',{class:'w100p '}).append(

                        $('<div/>',{class:'statisticsGraphsOverview_orders'}),
                        $('<div/>',{class:'statisticsGraphContainer statisticsGrapOrders'})
                    )
                )
            )
        )

        if(this.period == 'day'){
            this.drawDayGraph($('.statisticsGrapOrders'));
            this.fillOrdersGraph_day('so','total',website.currency)
        }else if(this.period == 'month'){
            this.drawMonthGraph($('.statisticsGrapOrders'))
            this.fillOrdersGraph_month('so','total',website.currency)
        }else if(this.period == 'year'){
            this.drawYearGraph($('.statisticsGrapOrders'))
            this.fillOrdersGraph_year('so','total',website.currency)
        }
    }
    /////
    products(){
        if(this.data1.products.length == 0){
            $('.statisticsContainer[statisticsTab="products"]').append(
                $('<div/>',{class:'m10 fs102',text:texts.statistics.noAvailableData})
            )
            return;
        }
        this.products1_sum = $.map(this.data1.products, function(value, index) { value.id = index; return [value]; })
        this.products1_sum.sort((a,b)=>{return b.sum - a.sum})
        this.products1_total = $.map(this.data1.products, function(value, index) { value.id = index; return [value]; })
        this.products1_total.sort(function(a,b){return b.total  - a.total })



        $('.statisticsContainer[statisticsTab="products"]').append(
            $('<div/>',{class:'none block-1024 fs102 m20',text:texts.statistics.smallScreen}),
            $('<div/>',{class:'mT20 w100p pT20 row alnSH jstfyS none-1024'}).append(
                $('<div/>',{class:'mxw220'}).append(
                    $('<div/>',{class:'row alnC jstfyC mX5'}).append(
                        $('<div/>',{cat:'profites',class:'productsGraphsCatElem productsGraphsCatElem_selected',text:texts.statistics.income}),
                        $('<div/>',{cat:'ordered',class:'productsGraphsCatElem ',text:texts.statistics.ordered}),
                    ),
                    $('<div/>',{class:`statisticsGraphsContainer statisticsGraphsContainer_products rtl mT10`}),
                ),
                $('<div/>',{class:'w100p-20 mX10 mT40'}).append(
                    $('<div/>',{class:'statisticsGraphsOverview_Products'}),
                    $('<div/>',{class:'statisticsGraphContainer statisticsGrapProducts mY40'})
                )
            )
        )


        if(this.period == 'day'){
            this.drawDayGraph($('.statisticsGrapProducts'));
        }else if(this.period == 'month'){
            this.drawMonthGraph($('.statisticsGrapProducts'))
        }else if(this.period == 'year'){
            this.drawYearGraph($('.statisticsGrapProducts'))
        }

        this.setProductsGraphs();

    }
    /////////
    users(){
        if(this.data1.users.length == 0){
            $('.statisticsContainer[statisticsTab="users"]').append(
                $('<div/>',{class:'m10 fs102',text:texts.statistics.noAvailableData})
            )
            return;
        }
        this.users1_sum = $.map(this.data1.users, function(value, index) { value.id = index; return [value]; }).sort((a,b)=>{return b.so - a.so})
        this.users1_total = $.map(this.data1.users, function(value, index) { value.id = index; return [value]; }).sort(function(a,b){return b.so_total  - a.so_total })
        // this.users1_reviews = $.map(this.data1.users, function(value, index) { value.id = index; return [value]; }).sort(function(a,b){return b.rv  - a.rv })

        $('.statisticsContainer[statisticsTab="users"]').append(
            $('<div/>',{class:'none block-1024 fs102 m20',text:texts.statistics.smallScreen}),
            $('<div/>',{class:'mT20 w100p pT20 brdrT1 row alnSH jstfyS none-1024'}).append(
                $('<div/>',{class:'mxw220'}).append(
                    $('<div/>',{class:'row alnC jstfyC mX5'}).append(
                        $('<div/>',{cat:'profites',class:'usersGraphsCatElem usersGraphsCatElem_selected',text:texts.statistics.income}),
                        $('<div/>',{cat:'ordered',class:'usersGraphsCatElem ',text:texts.statistics.orders}),
                    ),
                    $('<div/>',{class:`statisticsGraphsContainer statisticsGraphsContainer_users rtl mT10 mxh700`}),
                ),
                $('<div/>',{class:'w100p-20 mX10 mT40'}).append(
                    $('<div/>',{class:'row alnSH jstfyC wrap'}).append(
                        $('<div/>',{class:' mY20 '}).append(
                            $('<div/>',{class:'row alnS jstfyS pX10'}).append(
                                $('<div/>',{class:'statisticsOrderTypeTag pointer popupPage ico-user',popupPage:'User'}),
                                $('<div/>',{class:'column alnS jstfyS'}).append(
                                    $('<div/>',{class:'fs108 bold statisticsUsers_userNum',}),
                                    $('<a/>',{class:'fs103 statisticsUsers_userName',}),
                                ),
                            ),
                        ),
                        $('<div/>',{class:'column alnC jstfyS pX10 brdrR1 brdrL1 mY20 statisticsUserDonut_soco'}),
                        $('<div/>',{class:'column alnC jstfyS pX10 brdrR1 brdrL1 mY20 statisticsUserDonut_services'}),
                        $('<div/>',{class:'column alnC jstfyS pX10 brdrR1 brdrL1 mY20 mnw200 statisticsUsers_userReviews'})
                    ),
                    $('<div/>',{class:'statisticsGraphContainer statisticsGrapUsers mY40'})
                )
            )
        )

        if(this.period == 'day'){
            this.drawDayGraph($('.statisticsGrapUsers'));
        }else if(this.period == 'month'){
            this.drawMonthGraph($('.statisticsGrapUsers'))
        }else if(this.period == 'year'){
            this.drawYearGraph($('.statisticsGrapUsers'))
        }

        this.setUsersGraphs();
    }
    //////////
    deliveries(){
        if(Object.keys(this.data1.deliveries).length == 0){
            $('.statisticsContainer[statisticsTab="deliveries"]').append(
                $('<div/>',{class:'m10 fs102',text:texts.statistics.noAvailableData})
            )
            return;
        }
        this.deliveries1_orders = $.map(this.data1.deliveries, function(value, index) { value.deliveryName = index; return [value]; }).sort((a,b)=>{return b.orders - a.orders})
        $('.statisticsContainer[statisticsTab="deliveries"]').append(
            $('<div/>',{class:'none block-1024 fs102 m20',text:texts.statistics.smallScreen}),
            $('<div/>',{class:'mT20 w100p pT20 brdrT1 row alnSH jstfyS none-1024'}).append(
                $('<div/>',{class:`statisticsGraphsContainer statisticsGraphsContainer_deliveries`}),
                $('<div/>',{class:'w100p '}).append(
                    $('<div/>',{class:'statisticsGraphsOverview_deliveries'}),
                    $('<div/>',{class:'statisticsGraphContainer statisticsGrapDeliveries'})
                )
            )
        )
        if(this.period == 'day'){
            this.drawDayGraph($('.statisticsGrapDeliveries'));
        }else if(this.period == 'month'){
            this.drawMonthGraph($('.statisticsGrapDeliveries'))
        }else if(this.period == 'year'){
            this.drawYearGraph($('.statisticsGrapDeliveries'))
        }
        for(const key in this.deliveries1_orders){
            $('.statisticsGraphsContainer_deliveries').append(
                $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_deliveries',key:this.deliveries1_orders[key].deliveryName,tooltip:this.deliveries1_orders[key].deliveryName.split('@')[0]}).append(
                    $('<div/>',{text:this.deliveries1_orders[key].deliveryName.split('@')[0],class:'ellipsis fs102'}),
                    $('<div/>',{text:texts.statistics.deliveryOrders+': '+bigInt(this.deliveries1_orders[key].orders),class:'fs09 mT3'})
                ),

            ).scrollTop(0)
        }
        $(`.statisticsGraphsElem_deliveries[key="${this.deliveries1_orders[0].deliveryName}"]`).addClass('statisticsGraphsElem_selected')
        this.setDeliveryGraph(this.deliveries1_orders[0].deliveryName)

    }
    ////////////
    /////orders
    SoCoDonut(container,so,co,statisticsPopup_so,statisticsPopup_co){
        fullPercent = so + co;
        if(fullPercent == 0){
            percent1 = 0;
            percent2 = 0;
            percent1_circle = 251;
            percent2_circle = 251;
            rotate1 =  - 180;

        }else{
            percent1 = (so / fullPercent ) * 100;
            percent2 = (co / fullPercent ) * 100;
            percent1_circle = (502 / 100) * percent2;
            percent2_circle = (502 / 100) * percent1;
            rotate1 = (((so / fullPercent)* 100 ) * 3.6) * - 1;

        }
        let percent1SW = 'strokeWidth9';
        let percent2SW = 'strokeWidth9';
        percent1 > percent2 ? percent1SW = 'strokeWidth11' : null ;
        percent1 > percent2 ? percent2SW = 'strokeWidth9' : null ;

        percent2 > percent1 ? percent2SW = 'strokeWidth11' : null ;
        percent2 > percent1 ? percent1SW = 'strokeWidth9' : null ;

        container.text('').append(
            $('<div/>',{class:'fs103 bold',text:texts.statistics.completeOrders}),
            $('<div/>',{class:'statisticsDonutOutside',html:`
                <svg height="200" width="200" >
                    <circle class="statisticsDonutStroke statisticsDonutStroke-so ${percent1SW}" cx="100" cy="100" r="80" stroke="var(--csso)" style="stroke-dashoffset: ${( percent1_circle)};transform:rotate(${rotate1}deg)"/>
                    <circle class="statisticsDonutStroke statisticsDonutStroke-co ${percent2SW}" cx="100" cy="100" r="80" stroke="var(--csco)" style="stroke-dashoffset: ${( percent2_circle)};"/>
                </svg>
                <div class="statisticsDonutInside">
                    <div class="fs4">${percent1.toFixed(0)}%</div>
                </div>
            `}),
            $('<div/>',{class:'column alnS jstfyS'}).append(
                $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:statisticsPopup_so,statisticsPopupTitle:texts.statistics.successfulOrders}).append(
                    $('<div/>',{class:'p6 bg-csso br3 mie-5'}),
                    $('<div/>',{class:'mie-10 fs102',text:texts.statistics.successfulOrders}),
                ),
                $('<div/>',{class:'row alnC jstfyS',statisticsPopup:statisticsPopup_co,statisticsPopupTitle:texts.statistics.canceledOrders}).append(
                    $('<div/>',{class:'p6 bg-csco br3 mie-5'}),
                    $('<div/>',{class:'mie-10 fs102',text:texts.statistics.canceledOrders}),
                )
            ),
        )
        container.find('.statisticsDonutStroke-so').attr('statisticsPopup',statisticsPopup_so).attr('statisticsPopupTitle',texts.statistics.successfulOrders);
        container.find('.statisticsDonutStroke-co').attr('statisticsPopup',statisticsPopup_co).attr('statisticsPopupTitle',texts.statistics.canceledOrders);
    }
    incomeDonut(container,total,items_total,tax,deliveryCost,service){
        fullPercent = items_total + tax + deliveryCost + service;
        let percentCircles = []
        if(fullPercent == 0){
            percent1 = 0;
            percent2 = 0;
            percent3 = 0;
            percent4 = 0;
            percent1_circle = 376.5;
            percent2_circle = 376.5;
            percent3_circle = 376.5;
            percent4_circle = 376.5;
            rotate3 =  - 90;
            rotate2 =  - 180;
            rotate1 = - 270;

            percentCircles = [
                {num:percent1,sort:1},
                {num:percent2,sort:2},
                {num:percent3,sort:3},
                {num:percent4,sort:4},
            ].sort((a,b) => a.num - b.num);
            percentCircles[0].class = 'strokeWidth9';
            percentCircles[1].class = 'strokeWidth9';
            percentCircles[2].class = 'strokeWidth9';
            percentCircles[3].class = 'strokeWidth9';

        }else{
            percent1 = (items_total / fullPercent ) * 100;
            percent2 = (tax / fullPercent ) * 100;
            percent3 = (deliveryCost / fullPercent ) * 100;
            percent4 = (service / fullPercent ) * 100;
            percent1_circle = (502 / 100) * (percent2 + percent3 + percent4);
            percent2_circle = (502 / 100) * (percent1 + percent3 + percent4);
            percent3_circle = (502 / 100) * (percent2 + percent1 + percent4);
            percent4_circle = (502 / 100) * (percent2 + percent1 + percent3);

            rotate1 = (((( tax + deliveryCost + service) / fullPercent)* 100 ) * 3.6) * - 1;
            rotate2 = ((((deliveryCost + service ) / fullPercent)* 100 ) * 3.6) * - 1;
            rotate3 = ((((service) / fullPercent)* 100 ) * 3.6) * - 1;

            percentCircles = [
                {num:percent1,sort:1},
                {num:percent2,sort:2},
                {num:percent3,sort:3},
                {num:percent4,sort:4},
            ].sort((a,b) => a.num - b.num);
            percentCircles[0].class = 'strokeWidth7';
            percentCircles[1].class = 'strokeWidth7';
            percentCircles[2].class = 'strokeWidth9';
            percentCircles[3].class = 'strokeWidth11';
            percentCircles.sort((a,b) => a.sort - b.sort);
        }



        let donutInsideFS = 'fs305';
        if(total > 9999999){donutInsideFS = 'fs09';}
        else if(total > 999999){donutInsideFS = 'fs105';}
        else if(total > 99999){donutInsideFS = 'fs2';}
        else if(total > 9999){donutInsideFS = 'fs205';}
        else if(total > 999){donutInsideFS = 'fs3';}

        container.append(
            $('<div/>',{class:'statisticsDonutOutside',html:`
            <svg height="200" width="200" >
                <circle class="statisticsDonutStroke statisticsDonutStroke-itemsTotal ${percentCircles[0].class}" cx="100" cy="100" r="80" stroke="var(--s-itemsTotal)" style="stroke-dashoffset: ${( percent1_circle)};"/>
                <circle class="statisticsDonutStroke statisticsDonutStroke-tax ${percentCircles[1].class}" cx="100" cy="100" r="80" stroke="var(--s-tax)" style="stroke-dashoffset: ${( percent2_circle)};transform:rotate(${rotate1}deg)"/>
                <circle class="statisticsDonutStroke statisticsDonutStroke-deliveryCost ${percentCircles[2].class}" cx="100" cy="100" r="80" stroke="var(--s-deliveryCost)" style="stroke-dashoffset: ${( percent3_circle)};transform:rotate(${rotate2}deg)"/>
                <circle class="statisticsDonutStroke statisticsDonutStroke-service ${percentCircles[3].class}" cx="100" cy="100" r="80" stroke="var(--s-service)" style="stroke-dashoffset: ${( percent4_circle)};transform:rotate(${rotate3}deg)"/>
            </svg>
            <div class="statisticsDonutInside">
                <div class="${donutInsideFS}">${website.currency+bigInt(total)}</div>
            </div>
            `}),
            $('<div/>',{class:'row alnS jstfySH'}).append(
                $('<div/>',{class:'column alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:'so-itemsTotal',statisticsPopupTitle:texts.statistics.itemsTotal}).append(
                        $('<div/>',{class:'p6 bg-itemsTotal br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.itemsTotal}),
                    ),
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:'so-tax',statisticsPopupTitle:texts.statistics.tax}).append(
                        $('<div/>',{class:'p6 bg-tax br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.tax}),
                    ),
                ),
                $('<div/>',{class:'column alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:'so-deliveryCost',statisticsPopupTitle:texts.statistics.deliveryCost}).append(
                        $('<div/>',{class:'p6 bg-deliveryCost br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.deliveryCost}),
                    ),
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:'so-service',statisticsPopupTitle:texts.statistics.service}).append(
                        $('<div/>',{class:'p6 bg-service br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.service}),
                    ),
                ),
            ),

        )
        container.find('.statisticsDonutStroke-itemsTotal').attr('statisticsPopup','so-itemsTotal').attr('statisticsPopupTitle',texts.statistics.itemsTotal);
        container.find('.statisticsDonutStroke-tax').attr('statisticsPopup','so-tax').attr('statisticsPopupTitle',texts.statistics.tax);
        container.find('.statisticsDonutStroke-deliveryCost').attr('statisticsPopup','so-deliveryCost').attr('statisticsPopupTitle',texts.statistics.deliveryCost);
        container.find('.statisticsDonutStroke-service').attr('statisticsPopup','so-service').attr('statisticsPopupTitle',texts.statistics.service);
    }
    servicesDonut(container,doo,po,di,statisticsPopup_do,statisticsPopup_po,statisticsPopup_di){
        fullPercent = doo + po + di;
        let percentCircles = []
        if(fullPercent == 0){
            percent1 = 0;
            percent2 = 0;
            percent3 = 0;
            percent1_circle = 334.666;
            percent2_circle = 334.666;
            percent3_circle = 334.666;
            rotate2 =  - 120;
            rotate1 = - 240;

            percentCircles = [
                {num:percent1,sort:1},
                {num:percent2,sort:2},
                {num:percent3,sort:3},
            ].sort((a,b) => a.num - b.num);
            percentCircles[0].class = 'strokeWidth9';
            percentCircles[1].class = 'strokeWidth9';
            percentCircles[2].class = 'strokeWidth9';
        }else{
            percent1 = (doo / fullPercent ) * 100;
            percent2 = (po / fullPercent ) * 100;
            percent3 = (di / fullPercent ) * 100;
            percent1_circle = (502 / 100) * (percent2 + percent3);
            percent2_circle = (502 / 100) * (percent1 + percent3);
            percent3_circle = (502 / 100) * (percent2 + percent1);
            rotate2 = ((((doo + di ) / fullPercent)* 100 ) * 3.6) * - 1;
            rotate1 = (((((doo + po) / fullPercent)* 100 ) * 3.6) * - 1) + rotate2;

            percentCircles = [
                {num:percent1,sort:1},
                {num:percent2,sort:2},
                {num:percent3,sort:3},
            ].sort((a,b) => a.num - b.num);
            percentCircles[0].class = 'strokeWidth7';
            percentCircles[1].class = 'strokeWidth9';
            percentCircles[2].class = 'strokeWidth11';
            percentCircles.sort((a,b) => a.sort - b.sort);
        }


        container.text('').append(
            $('<div/>',{class:'fs103 bold',text:texts.statistics.successfulOrdersGraph}),
            $('<div/>',{class:'statisticsDonutOutside',html:`
                <svg height="200" width="200" >
                    <circle class="statisticsDonutStroke statisticsDonutStroke-delivery ${percentCircles[0].class}" cx="100" cy="100" r="80" stroke="var(--cdelivery)" style="stroke-dashoffset: ${( percent1_circle )};transform:rotate(${rotate1}deg)"/>
                    <circle class="statisticsDonutStroke statisticsDonutStroke-pickup ${percentCircles[1].class}" cx="100" cy="100" r="80" stroke="var(--cpickup)" style="stroke-dashoffset: ${( percent2_circle )};"/>
                    <circle class="statisticsDonutStroke statisticsDonutStroke-dineIn ${percentCircles[2].class}" cx="100" cy="100" r="80" stroke="var(--cdineIn)" style="stroke-dashoffset: ${( percent3_circle )};transform:rotate(${rotate2}deg)"/>
                </svg>
                <div class="statisticsDonutInside">
                    <span class="tnw fs102 bold mY3">${texts.statistics.delivery} ${Math.round(percent1)}%</span>
                    <span class="tnw fs102 bold mY3">${texts.statistics.pickup} ${Math.round(percent2)}%</span>
                    <span class="tnw fs102 bold mY3">${texts.statistics.dineIn} ${Math.round(percent3)}%</span>
                </div>
            `}),
            $('<div/>',{class:'column alnS jstfySH'}).append(
                $('<div/>',{class:'column alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:statisticsPopup_do,statisticsPopupTitle:texts.statistics.deliveryOrders}).append(
                        $('<div/>',{class:'p6 bgc-delivery br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.deliveryOrders}),
                    ),
                ),
                $('<div/>',{class:'column alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:statisticsPopup_po,statisticsPopupTitle:texts.statistics.pickupOrders}).append(
                        $('<div/>',{class:'p6 bgc-pickup br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.pickupOrders}),
                    ),
                ),
                $('<div/>',{class:'column alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB5',statisticsPopup:statisticsPopup_di,statisticsPopupTitle:texts.statistics.dineInOrders}).append(
                        $('<div/>',{class:'p6 bgc-dineIn br3 mie-5'}),
                        $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.dineInOrders}),
                    ),
                ),
            ),

        )
        container.find('.statisticsDonutStroke-delivery').attr('statisticsPopup',statisticsPopup_do).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
        container.find('.statisticsDonutStroke-pickup').attr('statisticsPopup',statisticsPopup_po).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
        container.find('.statisticsDonutStroke-dineIn').attr('statisticsPopup',statisticsPopup_di).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
    }
    /////orders
    fillOrdersGraph_day(dataKey,dataKey2,symbol){
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            totals.push(this._data1[key][dataKey][dataKey2])
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                totals2.push(this._data2[key][dataKey][dataKey2])
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;

        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)
        for(const key in this._data1){
            let hour = this._data1[key].hour;
            let total = this._data1[key][dataKey][dataKey2];
            $('.statisticsGrapOrders').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`${dataKey}-${dataKey2}-${hour}`).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
            if(dataKey == 'so'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                statisticsPopup_so(
                    false,
                    `${dataKey}-${dataKey2}-${hour}`,
                    this._data1[key].so,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                    null
                );
            }else if(dataKey == 'co'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                statisticsPopup_co(
                    false,
                    `${dataKey}-${dataKey2}-${hour}`,
                    this._data1[key].co,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                    null
                );
            }else if(dataKey == 'do'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                statisticsPopup_do(
                    false,
                    `${dataKey}-${dataKey2}-${hour}`,
                    this._data1[key].do,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                    null
                );
            }else if(dataKey == 'po'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                statisticsPopup_po(
                    false,
                    `${dataKey}-${dataKey2}-${hour}`,
                    this._data1[key].po,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                    null
                );
            }else if(dataKey == 'di'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                statisticsPopup_di(
                    false,
                    `${dataKey}-${dataKey2}-${hour}`,
                    this._data1[key].di,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                    null
                );
            }
        }
        if(this.isCompare){
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                let hour = this._data2[key].hour;
                let total = this._data2[key][dataKey][dataKey2];
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock[hour="${hour}"]`).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%')
                if(dataKey == 'so'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                    statisticsPopup_so(
                        true,
                        `${dataKey}-${dataKey2}-${hour}`,
                        this._data1[key].so,
                        this._data2[key].so,
                        `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`,
                        );
                }else if(dataKey == 'co'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                    statisticsPopup_co(
                        true,
                        `${dataKey}-${dataKey2}-${hour}`,
                        this._data1[key].co,
                        this._data2[key].co,
                        `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`,
                        );
                }else if(dataKey == 'do'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                    statisticsPopup_do(
                        true,
                        `${dataKey}-${dataKey2}-${hour}`,
                        this._data1[key].do,
                        this._data2[key].do,
                        `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`,
                        );
                }else if(dataKey == 'po'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                    statisticsPopup_po(
                        true,
                        `${dataKey}-${dataKey2}-${hour}`,
                        this._data1[key].po,
                        this._data2[key].po,
                        `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`,
                        );
                }else if(dataKey == 'di'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                    statisticsPopup_di(
                        true,
                        `${dataKey}-${dataKey2}-${hour}`,
                        this._data1[key].di,
                        this._data2[key].di,
                        `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`,
                        );
                }
            }
        }else{
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').addClass('none')
        }
        this.drawOrdersGraphOverview(dataKey,dataKey2)

    }
    fillOrdersGraph_month(dataKey,dataKey2,symbol){
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            totals.push(this._data1[key][dataKey][dataKey2])
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                totals2.push(this._data2[key][dataKey][dataKey2])
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        if(this.isCompare){
            for(const key in this._data2){
                let day = this._data2[key].day;
                let total = this._data2[key][dataKey][dataKey2];
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`${dataKey}-${dataKey2}-${day}`).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%')
                if(dataKey == 'so'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                    statisticsPopup_so(
                        false,
                        `${dataKey}-${dataKey2}-${day}`,
                        this._data2[key].so,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,(parseInt(this._data2[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null,
                        'cs2','cs1'
                    );
                }else if(dataKey == 'co'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                    statisticsPopup_co(
                        false,
                        `${dataKey}-${dataKey2}-${day}`,
                        this._data2[key].co,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,(parseInt(this._data2[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null,
                        'cs2','cs1'

                    );
                }else if(dataKey == 'do'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                    statisticsPopup_do(
                        false,
                        `${dataKey}-${dataKey2}-${day}`,
                        this._data2[key].do,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,(parseInt(this._data2[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null,
                        'cs2','cs1'

                    );
                }else if(dataKey == 'po'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                    statisticsPopup_po(
                        false,
                        `${dataKey}-${dataKey2}-${day}`,
                        this._data2[key].po,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,(parseInt(this._data2[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null,
                        'cs2','cs1'

                    );
                }else if(dataKey == 'di'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                    statisticsPopup_di(
                        false,
                        `${dataKey}-${dataKey2}-${day}`,
                        this._data2[key].di,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,(parseInt(this._data2[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null,
                        'cs2','cs1'

                    );
                }
            }
        }

        for(const key in this._data1){
            let day = this._data1[key].day;
            let total = this._data1[key][dataKey][dataKey2];
            $('.statisticsGrapOrders').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`${dataKey}-${dataKey2}-${day}`).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
            if(dataKey == 'so'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                statisticsPopup_so(
                    false,
                    `${dataKey}-${dataKey2}-${day}`,
                    this._data1[key].so,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'co'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                statisticsPopup_co(
                    false,
                    `${dataKey}-${dataKey2}-${day}`,
                    this._data1[key].co,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'do'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                statisticsPopup_do(
                    false,
                    `${dataKey}-${dataKey2}-${day}`,
                    this._data1[key].do,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'po'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                statisticsPopup_po(
                    false,
                    `${dataKey}-${dataKey2}-${day}`,
                    this._data1[key].po,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'di'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                statisticsPopup_di(
                    false,
                    `${dataKey}-${dataKey2}-${day}`,
                    this._data1[key].di,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }

            if(this.isCompare){
                for(const key2 in this._data2){
                    if(this._data2[key2].day == day){
                        let day2 = this._data2[key2].day;
                        let total2 = this._data2[key2][dataKey][dataKey2];
                        $('.statisticsGrapOrders').find(`.statisticsGraphBlock[day="${day2}"]`).find('.statisticsGraphBlock_line2').css('height',((total2/heighestNum)*100)+'%');
                        if(dataKey == 'so'){
                        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                            statisticsPopup_so(
                                true,
                                `${dataKey}-${dataKey2}-${day}`,
                                this._data1[key].so,
                                this._data2[key2].so,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,(parseInt(this._data2[key2].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'co'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                            statisticsPopup_co(
                                true,
                                `${dataKey}-${dataKey2}-${day}`,
                                this._data1[key].co,
                                this._data2[key2].co,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,(parseInt(this._data2[key2].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'do'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                            statisticsPopup_do(
                                true,
                                `${dataKey}-${dataKey2}-${day}`,
                                this._data1[key].do,
                                this._data2[key2].do,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,(parseInt(this._data2[key2].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'po'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                            statisticsPopup_po(
                                true,
                                `${dataKey}-${dataKey2}-${day}`,
                                this._data1[key].po,
                                this._data2[key2].po,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,(parseInt(this._data2[key2].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'di'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                            statisticsPopup_di(
                                true,
                                `${dataKey}-${dataKey2}-${day}`,
                                this._data1[key].di,
                                this._data2[key2].di,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,(parseInt(this._data1[key].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,(parseInt(this._data2[key2].day)+1),0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }

                    }
                }
            }else{

            }
        }
        if(this.isCompare){
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').removeClass('none')
        }else{
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').addClass('none')
        }
        this.drawOrdersGraphOverview(dataKey,dataKey2)

    }
    fillOrdersGraph_year(dataKey,dataKey2,symbol){
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            totals.push(this._data1[key][dataKey][dataKey2])
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                totals2.push(this._data2[key][dataKey][dataKey2])
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapOrders').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        if(this.isCompare){
            for(const key in this._data2){
                let month = this._data2[key].month;
                let total = this._data2[key][dataKey][dataKey2];
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`${dataKey}-${dataKey2}-${month}`).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                if(dataKey == 'so'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                    statisticsPopup_so(
                        false,
                        `${dataKey}-${dataKey2}-${month}`,
                        this._data2[key].so,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null
                    );
                }else if(dataKey == 'co'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                    statisticsPopup_co(
                        false,
                        `${dataKey}-${dataKey2}-${month}`,
                        this._data2[key].co,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null
                    );
                }else if(dataKey == 'do'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                    statisticsPopup_do(
                        false,
                        `${dataKey}-${dataKey2}-${month}`,
                        this._data2[key].do,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null
                    );
                }else if(dataKey == 'po'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                    statisticsPopup_po(
                        false,
                        `${dataKey}-${dataKey2}-${month}`,
                        this._data2[key].po,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null
                    );
                }else if(dataKey == 'di'){
                    $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                    statisticsPopup_di(
                        false,
                        `${dataKey}-${dataKey2}-${month}`,
                        this._data2[key].di,
                        null,
                        `<div><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                        null
                    );
                }
            }
        }

        for(const key in this._data1){
            let month = this._data1[key].month;
            let total = this._data1[key][dataKey][dataKey2];
            $('.statisticsGrapOrders').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`${dataKey}-${dataKey2}-${month}`).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
            if(dataKey == 'so'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                statisticsPopup_so(
                    false,
                    `${dataKey}-${dataKey2}-${month}`,
                    this._data1[key].so,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'co'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                statisticsPopup_co(
                    false,
                    `${dataKey}-${dataKey2}-${month}`,
                    this._data1[key].co,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'do'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                statisticsPopup_do(
                    false,
                    `${dataKey}-${dataKey2}-${month}`,
                    this._data1[key].do,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'po'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                statisticsPopup_po(
                    false,
                    `${dataKey}-${dataKey2}-${month}`,
                    this._data1[key].po,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }else if(dataKey == 'di'){
                $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                statisticsPopup_di(
                    false,
                    `${dataKey}-${dataKey2}-${month}`,
                    this._data1[key].di,
                    null,
                    `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                    null
                );
            }

            if(this.isCompare){
                for(const key2 in this._data2){
                    if(this._data2[key2].month == month){
                        let month2 = this._data2[key2].month;
                        let total2 = this._data2[key2][dataKey][dataKey2];
                        $('.statisticsGrapOrders').find(`.statisticsGraphBlock[month="${month2}"]`).find('.statisticsGraphBlock_line2').css('height',((total2/heighestNum)*100)+'%');
                        if(dataKey == 'so'){
                        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.successfulOrders)
                            statisticsPopup_so(
                                true,
                                `${dataKey}-${dataKey2}-${month}`,
                                this._data1[key].so,
                                this._data2[key2].so,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'co'){
                        $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.canceledOrders)
                            statisticsPopup_co(
                                true,
                                `${dataKey}-${dataKey2}-${month}`,
                                this._data1[key].co,
                                this._data2[key2].co,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'do'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.deliveryOrders)
                            statisticsPopup_do(
                                true,
                                `${dataKey}-${dataKey2}-${month}`,
                                this._data1[key].do,
                                this._data2[key2].do,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'po'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.pickupOrders)
                            statisticsPopup_po(
                                true,
                                `${dataKey}-${dataKey2}-${month}`,
                                this._data1[key].po,
                                this._data2[key2].po,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }else if(dataKey == 'di'){
                            $('.statisticsGrapOrders').find(`.statisticsGraphBlock`).attr('statisticsPopupTitle',texts.statistics.dineInOrders)
                            statisticsPopup_di(
                                true,
                                `${dataKey}-${dataKey2}-${month}`,
                                this._data1[key].di,
                                this._data2[key2].di,
                                `<div><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                                `<div><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`,
                            );
                        }

                    }
                }
            }
        }

        if(this.isCompare){
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').removeClass('none')
        }else{
            $('.statisticsGrapOrders').find('.statisticsGraphBlock_line2').addClass('none')
        }

        this.drawOrdersGraphOverview(dataKey,dataKey2)
    }
    drawOrdersGraphOverview(dataKey,dataKey2){
        let data1 = this.data1[dataKey];
        let icon; let title; let number; let compare ='';
        this.isCompare ? compare = compareNums(this.data1[dataKey][dataKey2],this.data2[dataKey][dataKey2]): null ;
        switch(dataKey){
            case 'so':
                icon = 'ico-orders cG';
                dataKey2 == 'total' ? title = texts.statistics.successfulOrdersIncomeGraph : dataKey2 == 'orders' ?  title = texts.statistics.successfulOrdersGraph  : null;
                dataKey2 == 'total' ? number = website.currency+bigFloat(this.data1[dataKey][dataKey2]) : dataKey2 == 'orders' ?  number = bigInt(this.data1[dataKey][dataKey2])  : null;
            break;
            case 'co':
                icon = 'ico-no cR';
                dataKey2 == 'total' ? title = texts.statistics.canceledOrdersIncomeGraph : dataKey2 == 'orders' ?  title = texts.statistics.canceledOrdersGraph  : null;
                dataKey2 == 'total' ? number = website.currency+bigFloat(this.data1[dataKey][dataKey2]) : dataKey2 == 'orders' ?  number = bigInt(this.data1[dataKey][dataKey2])  : null;
                this.isCompare ? compare = compareNums(this.data1[dataKey][dataKey2],this.data2[dataKey][dataKey2],true): null ;
                break;
            case 'do':
                icon = 'ico-delivery c-delivery';
                dataKey2 == 'total' ? title = texts.statistics.deliveriedOrdersIncomeGraph : dataKey2 == 'orders' ?  title = texts.statistics.deliveriedOrdersGraph  : null;
                dataKey2 == 'total' ? number = website.currency+bigFloat(this.data1[dataKey][dataKey2]) : dataKey2 == 'orders' ?  number = bigInt(this.data1[dataKey][dataKey2])  : null;
            break;
            case 'po':
                icon = 'ico-pickup c-pickup';
                dataKey2 == 'total' ? title = texts.statistics.pickedupOrdersIncomeGraph : dataKey2 == 'orders' ?  title = texts.statistics.pickedupOrdersGraph  : null;
                dataKey2 == 'total' ? number = website.currency+bigFloat(this.data1[dataKey][dataKey2]) : dataKey2 == 'orders' ?  number = bigInt(this.data1[dataKey][dataKey2])  : null;
            break;
            case 'di':
                icon = 'ico-dineIn c-dineIn';
                dataKey2 == 'total' ? title = texts.statistics.dineinOrdersIncomeGraph : dataKey2 == 'orders' ?  title = texts.statistics.dineinOrdersGraph  : null;
                dataKey2 == 'total' ? number = website.currency+bigFloat(this.data1[dataKey][dataKey2]) : dataKey2 == 'orders' ?  number = bigInt(this.data1[dataKey][dataKey2])  : null;
            break;
            default:
                icon = '';
                title = '';
        }


        $('.statisticsContainer[statisticsTab="orders"]').find('.statisticsGraphsOverview_orders').text('').append(
            $('<div/>',{class:'row alnS jstfyS wFC mT20 mX40'}).append(
                $('<div/>',{class:`${icon} statisticsOrderTypeTag`}),
                $('<div/>',{class:'column alnS jstfyS'}).append(
                    $('<div/>',{class:'fs2 bold ',html:number+' '+compare}),
                    $('<a/>',{text:title,class:'fs105',statisticsPopup:dataKey,statisticsPopupTitle:title}),
                ),
            )

        )
    }
    ////////products
    productCard(isCompare,data,data2,date1,date2,cs1='cs1',cs2='cs2'){
        // if(typeof(data1) == 'undefined' && typeof(data2) == 'undefined'){return ''}

        if(typeof(data) == 'undefined'){
            data = {
                id:data2.id,
                sum:0,
                total:0,
                reviews:{
                    rv:0,
                    rv1:0,
                    rv2:0,
                    rv3:0,
                    rv4:0,
                    rv5:0,
                },
                options:{},
            }
            for(const key in data2.options){
                data.options[key] = {}
                let option = data2.options[key];
                for(const key2 in option){
                    let selection = option[key2];
                    data.options[key][key2] = 0;
                }
            }
        }
        if(typeof(data2) == 'undefined'){
            data2 = {
                id:data.id,
                sum:0,
                total:0,
                reviews:{
                    rv:0,
                    rv1:0,
                    rv2:0,
                    rv3:0,
                    rv4:0,
                    rv5:0,
                },
                options:{},
            }
            for(const key in data.options){
                data2.options[key] = {}
                let option = data.options[key];
                for(const key2 in option){
                    let selection = option[key2];
                    data2.options[key][key2] = 0;
                }
            }
        }
        let returnElems;
        let product = products.find(item=> item.name == data.id);
        let productNameElem;
        let productImg;
        let orderedTxt1;
        let orderedTxt2;
        data.sum == 1 ? orderedTxt1 = texts.statistics.time : orderedTxt1 = texts.statistics.times;

        if(typeof(product) === 'undefined'){
            productNameElem = $('<div/>',{text:data.id,class:'m5 mB10 fs103'});
            productImg = `./storage/imgs/cpanel/noimg.png`
        }else{
            productNameElem = $('<a/>',{text:product.name,class:'popupPage m5 mB10 fs103',popupPage:'Product',product:product.name});
            productImg = product.imgUrl
        }
        if(isCompare == 0){
            ///////////
            returnElems = $('<div/>',{class:'statisticsProductCard'}).append(
                $('<img/>',{src:productImg,class:'w100p h50 ofCover'}),
                productNameElem,
                $('<div/>',{class:`${cs1} fs101 bold alnsE mX5`,html:date1}),
                $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'productStatisticsCardCol1 column alnS jstfyS grow1'}).append(
                        $('<div/>',{class:'h20 row alnC jstfyS w100p-10 p5',text:texts.statistics.income}),
                        $('<div/>',{class:'h20 row alnC jstfyS brdrT1 w100p-10 p5',text:texts.statistics.ordered}),

                    ),
                    $('<div/>',{class:'productStatisticsCardCol2 column alnE jstfyS grow2'}).append(
                        $('<div/>',{class:'h20 row alnC jstfyE w100p-10 p5',text:website.currency+bigFloat(data.total)}),
                        $('<div/>',{class:'h20 row alnC jstfyE brdrT1 w100p-10 p5',text:bigInt(data.sum)+' '+orderedTxt1}),

                    )
                ),
            )

            for(const key in data.options){
                let optionTotalSelections = 0;
                for(const key2 in data.options[key]){
                    optionTotalSelections = optionTotalSelections + data.options[key][key2];
                }
                returnElems.find('.productStatisticsCardCol1').append(
                    $('<div/>',{text:key,class:'h20 row alnC jstfyS brdrT1 w100p-10 pX5 pT5 pB2'})
                )
                returnElems.find('.productStatisticsCardCol2').append(
                    $('<div/>',{text:'',class:'h20 row alnC jstfyE brdrT1 w100p-10 pX5 pT5 pB2'})
                )
                for(const key2 in data.options[key]){
                    returnElems.find('.productStatisticsCardCol1').append(
                        $('<div/>',{text:key2,class:'h15 row alnC jstfyS w100p-15 pX5 pY3 mis-5 fs09'})
                    )
                    returnElems.find('.productStatisticsCardCol2').append(
                        $('<div/>',{text:`${bigInt(data.options[key][key2])} (${Math.round((data.options[key][key2]/optionTotalSelections) * 100) }%)`,class:'h15 row alnC jstfyE w100p-10 pX5 pY3 fs09'})
                    )
                }
            }

            returnElems.find('.productStatisticsCardCol1').append(
                $('<div/>',{text:texts.statistics.reviews,class:'h15 row alnC jstfyS brdrT1 w100p-10 p5'}),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
            )
            returnElems.find('.productStatisticsCardCol2').append(
                $('<div/>',{text:data.reviews.rv,class:'h15 row alnC jstfyE brdrT1 w100p-10 p5'}),
                $('<div/>',{text:data.reviews.rv1,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:data.reviews.rv2,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:data.reviews.rv3,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:data.reviews.rv4,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:data.reviews.rv5,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
            )
        }else{
            let isData2;
            if(data2 == null){
                isData2 = false;
                orderedTxt2 = texts.statistics.times
            }else{
                isData2 = true;
                data2.sum == 1 ? orderedTxt2 = texts.statistics.time : orderedTxt2 = texts.statistics.times;
            }
            returnElems = $('<div/>',{class:'statisticsProductCard_compare'}).append(
                $('<img/>',{src:productImg,class:'w100p h50 ofCover'}),
                productNameElem,
                $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'productStatisticsCardCol1 column alnS jstfyS grow1'}).append(
                        $('<div/>',{class:'h20 row alnC jstfyS w100p-10 p5'}),
                        $('<div/>',{class:'h20 row alnC jstfyS w100p-10 p5',text:texts.statistics.income}),
                        $('<div/>',{class:'h20 row alnC jstfyS brdrT1 w100p-10 p5',text:texts.statistics.ordered}),

                    ),
                    $('<div/>',{class:'productStatisticsCardCol2 column alnE jstfyS grow2'}).append(
                        $('<div/>',{class:`h20 row alnC jstfyE w100p-80 pY5 pX40 tnw ${cs1} bold`,html:date1}),
                        $('<div/>',{class:'h20 row alnC jstfyE w100p-80 pY5 pX40 tnw',html:`<span class="mie-3">${website.currency+bigFloat(data.total)}</span> ${compareNums(data.total,isData2 ? data2.total : 0)}`}),
                        $('<div/>',{class:'h20 row alnC jstfyE brdrT1 w100p-80 pY5 pX40 tnw',html:`<span class="mie-3">${bigInt(data.sum)} ${orderedTxt1}</span> ${compareNums(data.sum,isData2 ? data2.sum : 0)}`}),
                    ),
                    $('<div/>',{class:'productStatisticsCardCol3 column alnE jstfyS grow2'}).append(
                        $('<div/>',{class:`h20 row alnC jstfyE w100p-10 p5 tnw ${cs2} bold`,html:date2}),
                        $('<div/>',{class:'h20 row alnC jstfyE w100p-10 p5 tnw',text:website.currency+bigFloat(isData2 ? data2.total : 0)}),
                        $('<div/>',{class:'h20 row alnC jstfyE brdrT1 w100p-10 p5 tnw',text:bigInt(isData2 ? data2.sum : 0)+' '+orderedTxt2}),

                    )
                ),
            )

            for(const key in data.options){
                let optionTotalSelections = 0;
                for(const key2 in data.options[key]){
                    optionTotalSelections = optionTotalSelections + data.options[key][key2];
                }
                returnElems.find('.productStatisticsCardCol1').append(
                    $('<div/>',{text:key,class:'h20 row alnC jstfyS brdrT1 w100p-10 pX5 pT5 pB2'})
                )
                returnElems.find('.productStatisticsCardCol2').append(
                    $('<div/>',{text:'',class:'h20 row alnC jstfyE brdrT1 w100p-10 pX5 pT5 pB2'})
                )
                returnElems.find('.productStatisticsCardCol3').append(
                    $('<div/>',{text:'',class:'h20 row alnC jstfyE brdrT1 w100p-10 pX5 pT5 pB2'})
                )
                for(const key2 in data.options[key]){
                    returnElems.find('.productStatisticsCardCol1').append(
                        $('<div/>',{text:key2,class:'h15 row alnC jstfyS w100p-15 pX5 pY3 mis-5 fs09'})
                    )
                    try{
                        returnElems.find('.productStatisticsCardCol2').append(
                            $('<div/>',{html:`<span class="mX3">${bigInt(data.options[key][key2])}</span> ${compareNums(data.options[key][key2],data2.options[key][key2])}`,class:'h15 row alnC jstfyE w100p-80 pY3 pX40 fs09 tnw'})
                        )
                    }catch{
                        returnElems.find('.productStatisticsCardCol2').append(
                            $('<div/>',{html:`<span class="mX3">${bigInt(data.options[key][key2])}</span> ${compareNums(data.options[key][key2],0)}`,class:'h15 row alnC jstfyE w100p-80 pY3 pX40 fs09 tnw'})
                        )
                    }

                    try{
                        returnElems.find('.productStatisticsCardCol3').append(
                            $('<div/>',{text:`${bigInt(data2.options[key][key2])}`,class:'h15 row alnC jstfyE w100p-10 pX5 pY3 fs09 tnw'})
                        )
                    }catch{
                        returnElems.find('.productStatisticsCardCol3').append(
                            $('<div/>',{text:`0`,class:'h15 row alnC jstfyE w100p-10 pX5 pY3 fs09 tnw'})
                        )
                    }

                }
            }

            returnElems.find('.productStatisticsCardCol1').append(
                $('<div/>',{text:texts.statistics.reviews,class:'h15 row alnC jstfyS brdrT1 w100p-10 p5'}),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
                $('<div/>',{class:'h15 row alnC jstfyS w100p-10 pX5 pY3'}).append(
                    $('<span/>',{class:'mis-5 fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                    $('<span/>',{class:'fs08 cStar ico-star'}),
                ),
            )
            returnElems.find('.productStatisticsCardCol2').append(
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv}</span>${isData2 ? compareNums(data.reviews.rv,data2.reviews.rv): compareNums(data.reviews.rv,0)}`,class:'h15 row alnC jstfyE brdrT1 w100p-80 pX40 pY5'}),
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv1}</span>`,class:'h15 row alnC jstfyE w100p-80 pX40 pY3'}),
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv2}</span>`,class:'h15 row alnC jstfyE w100p-80 pX40 pY3'}),
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv3}</span>`,class:'h15 row alnC jstfyE w100p-80 pX40 pY3'}),
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv4}</span>`,class:'h15 row alnC jstfyE w100p-80 pX40 pY3'}),
                $('<div/>',{html:`<span class="mie-3">${data.reviews.rv5}</span>`,class:'h15 row alnC jstfyE w100p-80 pX40 pY3'}),
            )

            returnElems.find('.productStatisticsCardCol3').append(
                $('<div/>',{text:isData2 ? data2.reviews.rv : 0,class:'h15 row alnC jstfyE brdrT1 w100p-10 p5'}),
                $('<div/>',{text:isData2 ? data2.reviews.rv1 : 0,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:isData2 ? data2.reviews.rv2 : 0,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:isData2 ? data2.reviews.rv3 : 0,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:isData2 ? data2.reviews.rv4 : 0,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
                $('<div/>',{text:isData2 ? data2.reviews.rv5 : 0,class:'h15 row alnC jstfyE w100p-10 pX5 pY3'}),
            )
        }
        return returnElems
    }
    setProductsGraphs(){
        $('.statisticsGraphsContainer_products').text('')
        if($('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected')){
            for(const key in this.products1_total){
                $('.statisticsGraphsContainer_products').append(
                    $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_products',key:this.products1_total[key].id,tooltip:this.products1_total[key].id}).append(
                        $('<div/>',{text:this.products1_total[key].id,class:'ellipsis fs102'}),
                        $('<div/>',{text:texts.statistics.income+': '+website.currency+bigInt(this.products1_total[key].total),class:'fs09 mT3'})
                    ),

                ).scrollTop(0)
            }
            $(`.statisticsGraphsElem[key="${this.products1_total[0].id}"]`).addClass('statisticsGraphsElem_selected')
            this.setProductGraph(this.products1_total[0].id)
        }
        if($('.productsGraphsCatElem[cat="ordered"]').hasClass('productsGraphsCatElem_selected')){
            for(const key in this.products1_sum){
                let orderedTxt1;
                let orderedTxt2;
                this.products1_sum[key].sum == 1 ? orderedTxt1 = texts.statistics.time : orderedTxt1 = texts.statistics.times;
                $('.statisticsGraphsContainer_products').append(
                    $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_products',key:this.products1_sum[key].id,tooltip:this.products1_sum[key].id}).append(
                        $('<div/>',{text:this.products1_sum[key].id,class:'ellipsis fs102'}),
                        $('<div/>',{text:texts.statistics.ordered+': '+bigInt(this.products1_sum[key].sum)+' '+orderedTxt1,class:'fs09 mT3'})
                    ),

                ).scrollTop(0)
            }
            $(`.statisticsGraphsElem[key="${this.products1_sum[0].id}"]`).addClass('statisticsGraphsElem_selected')
            this.setProductGraph(this.products1_sum[0].id)
        }

    }
    setProductGraph(productName){
        if(this.isCompare){
            window.statisticsPopups[productName] = this.productCard(1,this.data1.products[productName],this.data2.products[productName] ?? null,this.date1,this.date2)
        }else{
            window.statisticsPopups[productName] = this.productCard(0,this.data1.products[productName],null,this.date1,this.date2)
        }
        if(this.period == 'day'){
            this.fillProductGraph_day(productName)
        }else if(this.period == 'month'){
            this.fillProductGraph_month(productName)
        }else if(this.period == 'year'){
            this.fillProductGraph_year(productName)
        }
        //////////////
        let product = products.find(item=> item.name == productName);
        let productImg;
        let number;
        let compare = ''
        if(typeof(product) === 'undefined'){
            productImg = `./storage/imgs/cpanel/noimg.png`
        }else{
            productImg = product.imgUrl
        }
        if($('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected')){
            if(this.isCompare){
                if(typeof(this.data2.products[productName]) === 'undefined'){compare = compareNums(this.data1.products[productName].total,0)}
                else{compare = compareNums(this.data1.products[productName].total,this.data2.products[productName].total)}
            }
            number = website.currency+bigFloat(this.data1.products[productName].total)+' '+compare;
        }else if($('.productsGraphsCatElem[cat="ordered"]').hasClass('productsGraphsCatElem_selected')){
            if(this.isCompare){
                if(typeof(this.data2.products[productName]) === 'undefined'){compare = compareNums(this.data1.products[productName].sum,0)}
                else{compare = compareNums(this.data1.products[productName].sum,this.data2.products[productName].sum)}
            }
            number = bigInt(this.data1.products[productName].sum)+' '+compare;

        }
        $('.statisticsContainer[statisticsTab="products"]').find('.statisticsGraphsOverview_Products').text('').append(
            $('<div/>',{class:'row alnS jstfyS wFC mT20 mX40'}).append(
                $('<img/>',{class:'w50 h50 ofCover shdw1 br3',src:productImg}),
                $('<div/>',{class:'column alnS jstfyS mX10'}).append(
                    $('<div/>',{class:'fs2 bold ',html:number}),
                    $('<a/>',{statisticsPopup:productName,statisticsPopupTitle:productName,text:productName,class:'fs105'})
                )

            )
        )
    }
    fillProductGraph_day(productName){
        let symbol = '';
        let dataKey = 'sum';
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? dataKey = 'total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                totals.push(this._data1[key].products[productName][dataKey])
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    totals2.push(this._data2[key].products[productName][dataKey])
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapProducts').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                let hour = this._data1[key].hour;
                let total = this._data1[key].products[productName][dataKey];
                $('.statisticsGrapProducts').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`${productName}-${hour}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                if(this.isCompare){
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    window.statisticsPopups[`${productName}-${hour}`] = this.productCard(1,this._data1[key].products[productName],null,date1,date2)
                }else{
                    window.statisticsPopups[`${productName}-${hour}`] = this.productCard(0,this._data1[key].products[productName],null,date1)
                }
            }
        }

        if(this.isCompare){
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    let hour = this._data2[key].hour;
                    let total = this._data2[key].products[productName][dataKey];
                    $('.statisticsGrapProducts').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`${productName}-${hour}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    window.statisticsPopups[`${productName}-${hour}`] = this.productCard(1,this._data1[key].products[productName],this._data2[key].products[productName],date1,date2)
                }
            }
        }else{
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').addClass('none')

        }
    }
    fillProductGraph_month(productName){
        let symbol = '';
        let dataKey = 'sum';
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? dataKey = 'total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                totals.push(this._data1[key].products[productName][dataKey])
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    totals2.push(this._data2[key].products[productName][dataKey])
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapProducts').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)


        if(this.isCompare){
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    let day = this._data2[key].day;
                    let total = this._data2[key].products[productName][dataKey];
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapProducts').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`${productName}-${day}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    window.statisticsPopups[`${productName}-${day}`] = this.productCard(0,this._data2[key].products[productName],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').addClass('none')
        }


        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                let day = this._data1[key].day;
                let total = this._data1[key].products[productName][dataKey];
                $('.statisticsGrapProducts').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`${productName}-${day}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,this.data1.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                window.statisticsPopups[`${productName}-${day}`] = this.productCard(0,this._data1[key].products[productName],null,date1,null)
                if(this.isCompare){
                    for(const key2 in this._data2){
                        if(this._data2[key2].day == day && this._data2[key2].products.hasOwnProperty(productName)){
                            let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                            window.statisticsPopups[`${productName}-${day}`] = this.productCard(1,this._data1[key].products[productName],this._data2[key2].products[productName],date1,date2)
                        }
                    }
                }
            }
        }

    }
    fillProductGraph_year(productName){
        let symbol = '';
        let dataKey = 'sum';
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.productsGraphsCatElem[cat="profites"]').hasClass('productsGraphsCatElem_selected') ? dataKey = 'total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                totals.push(this._data1[key].products[productName][dataKey])
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    totals2.push(this._data2[key].products[productName][dataKey])
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapProducts').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapProducts').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        if(this.isCompare){
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].products.hasOwnProperty(productName)){
                    let month = this._data2[key].month;
                    let total = this._data2[key].products[productName][dataKey];
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapProducts').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`${productName}-${month}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    window.statisticsPopups[`${productName}-${month}`] = this.productCard(0,this._data2[key].products[productName],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapProducts').find('.statisticsGraphBlock_line2').addClass('none')
        }

        for(const key in this._data1){
            if(this._data1[key].products.hasOwnProperty(productName)){
                let month = this._data1[key].month;
                let total = this._data1[key].products[productName][dataKey];
                $('.statisticsGrapProducts').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`${productName}-${month}`).attr('statisticsPopupTitle',productName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                window.statisticsPopups[`${productName}-${month}`] = this.productCard(0,this._data1[key].products[productName],null,date1,null)
                if(this.isCompare){
                    for(const key2 in this._data2){
                        if(this._data2[key2].month == month && this._data2[key2].products.hasOwnProperty(productName)){
                            let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                            window.statisticsPopups[`${productName}-${month}`] = this.productCard(1,this._data1[key].products[productName],this._data2[key2].products[productName],date1,date2)
                        }
                    }
                }
            }
        }
    }
    ///users
    setUsersGraphs(){
        $('.statisticsGraphsContainer_users').text('')
        if($('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected')){
            for(const key in this.users1_total){
                $('.statisticsGraphsContainer_users').append(
                    $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_users',key:this.users1_total[key].id,tooltip:this.users1_total[key].userName}).append(
                        $('<div/>',{text:this.users1_total[key].userName,class:'ellipsis fs102'}),
                        $('<div/>',{text:texts.statistics.income+': '+website.currency+bigInt(this.users1_total[key].so_total),class:'fs09 mT3'})
                    ),

                ).scrollTop(0)
            }
            $(`.statisticsGraphsElem[key="${this.users1_total[0].id}"]`).addClass('statisticsGraphsElem_selected')
            this.setUserOverview(this.users1_total[0].id)
        }
        if($('.usersGraphsCatElem[cat="ordered"]').hasClass('usersGraphsCatElem_selected')){
            for(const key in this.users1_sum){
                $('.statisticsGraphsContainer_users').append(
                    $('<div/>',{class:'statisticsGraphsElem statisticsGraphsElem_users',key:this.users1_sum[key].id,tooltip:this.users1_sum[key].userName}).append(
                        $('<div/>',{text:this.users1_sum[key].userName,class:'ellipsis fs102'}),
                        $('<div/>',{text:texts.statistics.successfulOrders+': '+bigInt(this.users1_sum[key].so),class:'fs09 mT3'})
                    ),

                ).scrollTop(0)
            }
            $(`.statisticsGraphsElem[key="${this.users1_sum[0].id}"]`).addClass('statisticsGraphsElem_selected')
            this.setUserOverview(this.users1_sum[0].id)
        }

    }

    setUserOverview(userId){
        let userData = this.data1.users[userId];
        let user2Data = {
            id:userId,userName:userData.userName,
            so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
            co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
            do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
            po:0,po_itemsTotal:0,po_tax:0,po_total:0,
            di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
            rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
        }

        if(this.isCompare){
            user2Data = this.data2.users[userId];
            if(typeof(user2Data) === 'undefined'){
                user2Data = {
                    id:userId,userName:userData.userName,
                    so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
                    co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
                    do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
                    po:0,po_itemsTotal:0,po_tax:0,po_total:0,
                    di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
                    rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
                }
            }
            $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? $('.statisticsUsers_userNum').text('').append(`<span class="mie-5">${website.currency} ${bigFloat(userData.so_total)}</span><span>${compareNums(userData.so_total,user2Data.so_total)}</span>`) : $('.statisticsUsers_userNum').text('').append(`<span class="mie-5">${bigInt(userData.so)}</span><span>${compareNums(userData.so,user2Data.so)}</span>`);
            statisticsPopupUsers_so(this.isCompare,`user-${userData.id}-so`,userData,user2Data,this.date1,this.date2)
            statisticsPopupUsers_co(this.isCompare,`user-${userData.id}-co`,userData,user2Data,this.date1,this.date2)
            statisticsPopupUsers_do(this.isCompare,`user-${userData.id}-do`,userData,user2Data,this.date1,this.date2)
            statisticsPopupUsers_po(this.isCompare,`user-${userData.id}-po`,userData,user2Data,this.date1,this.date2)
            statisticsPopupUsers_di(this.isCompare,`user-${userData.id}-di`,userData,user2Data,this.date1,this.date2)
            $('.statisticsUsers_userReviews').text('').append(
                $('<div/>',{class:'fs103 bold mY10 pX10',html:`<span>${bigInt(userData.rv)}</span><span class="mX3">${texts.statistics.reviews}</span><span>${compareNums(userData.rv,user2Data.rv)}</span>`}),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',html:`<span class="mie-3">${userData.rv1}</span><span>${compareNums(userData.rv1,user2Data.rv1)}</span>`})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10 bgc-c3'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',html:`<span class="mie-3">${userData.rv2}</span><span>${compareNums(userData.rv2,user2Data.rv2)}</span>`})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',html:`<span class="mie-3">${userData.rv3}</span><span>${compareNums(userData.rv3,user2Data.rv3)}</span>`})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10 bgc-c3'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',html:`<span class="mie-3">${userData.rv4}</span><span>${compareNums(userData.rv4,user2Data.rv4)}</span>`})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',html:`<span class="mie-3">${userData.rv5}</span><span>${compareNums(userData.rv5,user2Data.rv5)}</span>`})
                ),

            )
        }else{
            $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? $('.statisticsUsers_userNum').text(website.currency+bigFloat(userData.so_total)) : $('.statisticsUsers_userNum').text(bigInt(userData.so));
            statisticsPopupUsers_so(this.isCompare,`user-${userData.id}-so`,userData,null,this.date1,null)
            statisticsPopupUsers_co(this.isCompare,`user-${userData.id}-co`,userData,null,this.date1,null)
            statisticsPopupUsers_do(this.isCompare,`user-${userData.id}-do`,userData,null,this.date1,null)
            statisticsPopupUsers_po(this.isCompare,`user-${userData.id}-po`,userData,null,this.date1,null)
            statisticsPopupUsers_di(this.isCompare,`user-${userData.id}-di`,userData,null,this.date1,null)
            $('.statisticsUsers_userReviews').text('').append(
                $('<div/>',{class:'fs103 bold mY10 pX10',text:texts.statistics.reviews}),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',text:bigInt(userData.rv1)})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10 bgc-c3'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',text:bigInt(userData.rv2)})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',text:bigInt(userData.rv3)})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10 bgc-c3'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',text:bigInt(userData.rv4)})
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfySB pY10 pX10'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS mie-10'}).append(
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                        $('<span/>',{class:'cStar ico-star'}),
                    ),
                    $('<div/>',{class:'',text:bigInt(userData.rv5)})
                ),

            )
        }

        this.SoCoDonut($('.statisticsUserDonut_soco'),userData.so,userData.co,`user-${userData.id}-so`,`user-${userData.id}-co`)
        this.servicesDonut($('.statisticsUserDonut_services'),userData.do,userData.po,userData.di,`user-${userData.id}-do`,`user-${userData.id}-po`,`user-${userData.id}-di`)
        if(this.period == 'day'){
            this.fillUserGraph_day(userData,user2Data);
        }else if(this.period == 'month'){
            this.fillUserGraph_month(userData,user2Data);
        }else if(this.period == 'year'){
            this.fillUserGraph_year(userData,user2Data);
        }

        statisticsPopupUsers(this.isCompare,userData.id,`user-${userData.id}`,userData,user2Data,this.date1,this.date2)

        $('.statisticsUsers_userName').attr('statisticsPopup',`user-${userData.id}`).attr('statisticsPopupTitle',userData.userName).text(userData.userName);
        $('.statisticsContainer[statisticsTab="users"]').find('.ico-user').attr('userId',userData.id)
    }
    fillUserGraph_day(userData,user2Data){
        let emptyUser = {
            id:userData.id,userName:userData.userName,
            so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
            co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
            do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
            po:0,po_itemsTotal:0,po_tax:0,po_total:0,
            di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
            rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
        }
        let symbol = '';
        let dataKey = 'so';
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? dataKey = 'so_total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                totals.push(this._data1[key].users[userData.id][dataKey]);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    totals2.push(this._data2[key].users[userData.id][dataKey]);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapUsers').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                let hour = this._data1[key].hour;
                let total = this._data1[key].users[userData.id][dataKey];
                $('.statisticsGrapUsers').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`user-${userData.id}-${hour}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                if(this.isCompare){
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    statisticsPopupUsers(1,userData.id,`user-${userData.id}-${hour}`,this._data1[key].users[userData.id],this._data2[key].users[userData.id] ?? emptyUser,date1,date2)
                }else{
                    statisticsPopupUsers(0,userData.id,`user-${userData.id}-${hour}`,this._data1[key].users[userData.id],null,date1,null)
                }
            }
        }

        if(this.isCompare){
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    let hour = this._data2[key].hour;
                    let total = this._data2[key].users[userData.id][dataKey];
                    $('.statisticsGrapUsers').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`user-${userData.id}-${hour}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    statisticsPopupUsers(1,userData.id,`user-${userData.id}-${hour}`,this._data1[key].users[userData.id]  ?? emptyUser,this._data2[key].users[userData.id] ?? emptyUser,date1,date2)
                }
            }
        }else{
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').addClass('none')

        }

    }
    fillUserGraph_month(userData,user2Data){
        let emptyUser = {
            id:userData.id,userName:userData.userName,
            so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
            co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
            do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
            po:0,po_itemsTotal:0,po_tax:0,po_total:0,
            di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
            rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
        }
        let symbol = '';
        let dataKey = 'so';
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? dataKey = 'so_total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                totals.push(this._data1[key].users[userData.id][dataKey]);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    totals2.push(this._data2[key].users[userData.id][dataKey]);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapUsers').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        if(this.isCompare){
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    let day = this._data2[key].day;
                    let total = this._data2[key].users[userData.id][dataKey];
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapUsers').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`user-${userData.id}-${day}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    statisticsPopupUsers(0,userData.id,`user-${userData.id}-${day}`,this._data2[key].users[userData.id],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').addClass('none')
        }

        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                let day = this._data1[key].day;
                let total = this._data1[key].users[userData.id][dataKey];
                $('.statisticsGrapUsers').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`user-${userData.id}-${day}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,this.data1.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                statisticsPopupUsers(0,userData.id,`user-${userData.id}-${day}`,this._data1[key].users[userData.id],null,date1,null)

                if(this.isCompare){
                    for(const key2 in this._data2){
                        let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                        if(this._data2[key2].day == day && this._data2[key2].users.hasOwnProperty(userData.id)){
                            statisticsPopupUsers(1,userData.id,`user-${userData.id}-${day}`,this._data1[key].users[userData.id],this._data2[key2].users[userData.id],date1,date2)
                        }
                    }
                }
            }
        }
    }
    fillUserGraph_year(userData,user2Data){
        let emptyUser = {
            id:userData.id,userName:userData.userName,
            so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
            co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
            do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
            po:0,po_itemsTotal:0,po_tax:0,po_total:0,
            di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
            rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
        }
        let symbol = '';
        let dataKey = 'so';
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? symbol = website.currency : null;
        $('.usersGraphsCatElem[cat="profites"]').hasClass('usersGraphsCatElem_selected') ? dataKey = 'so_total' : null;
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                totals.push(this._data1[key].users[userData.id][dataKey]);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    totals2.push(this._data2[key].users[userData.id][dataKey]);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(0).text(symbol+bigInt(heighestNum))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(1).text(symbol+bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapUsers').find('.statisticsGraphLeftContainer').children().eq(2).text(symbol+bigInt(heighestNum / 3))
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapUsers').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)
        if(this.isCompare){
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].users.hasOwnProperty(userData.id)){
                    let month = this._data2[key].month;
                    let total = this._data2[key].users[userData.id][dataKey];
                    let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapUsers').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`user-${userData.id}-${month}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    statisticsPopupUsers(0,userData.id,`user-${userData.id}-${month}`,this._data2[key].users[userData.id],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapUsers').find('.statisticsGraphBlock_line2').addClass('none')
        }

        for(const key in this._data1){
            if(this._data1[key].users.hasOwnProperty(userData.id)){
                let month = this._data1[key].month;
                let total = this._data1[key].users[userData.id][dataKey];
                $('.statisticsGrapUsers').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`user-${userData.id}-${month}`).attr('statisticsPopupTitle',userData.userName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                statisticsPopupUsers(0,userData.id,`user-${userData.id}-${month}`,this._data1[key].users[userData.id],null,date1,null)

                if(this.isCompare){
                    for(const key2 in this._data2){
                        if(this._data2[key2].month == month && this._data2[key2].users.hasOwnProperty(userData.id)){
                            let date2 = `<div class="taE"><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                            statisticsPopupUsers(1,userData.id,`user-${userData.id}-${month}`,this._data1[key].users[userData.id],this._data2[key2].users[userData.id],date1,date2)
                        }
                    }
                }
            }
        }

    }
    /////deliveries
    setDeliveryGraph(deliveryName){
        let data1 = this.data1.deliveries[deliveryName];
        let data2;
        if(typeof(data1) == 'undefined'){return;}
        if(this.isCompare){
            data2 = this.data2.deliveries[deliveryName];
            if(typeof(data2) == 'undefined'){data2 = {deliveryName:deliveryName,orders:0,time:0}}
        }

        let text11;let text12 = '';
        if(data1.orders == 1){
            text11 = `${data1.orders} ${texts.statistics.deliveredOrder} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }else{
            text11 = `${bigInt(data1.orders)} ${texts.statistics.deliveredOrders} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }
        if(data1.orders > 0 ){
            text12 = `${texts.statistics.avg} ${clacDeliveryTime(data1.time / data1.orders)} ${texts.statistics.perOrder}`
        }

        $('.statisticsContainer[statisticsTab="deliveries"]').find('.statisticsGraphsOverview_deliveries').text('').append(
            $('<div/>',{class:'row alnC jstfyS pX20 mY20'}).append(
                $('<div/>',{class:'statisticsOrderTypeTag pointer popupPage ico-delivery_accounts',popupPage:'Edit-Delivery-Account',deliveryaccount:deliveryName}),
                $('<div/>',{class:'column alnS jstfyS'}).append(
                    $('<a/>',{class:'fs104',text:deliveryName,statisticsPopup:`delivery-${deliveryName.split('@')[0]}`,statisticsPopupTitle:deliveryName.split('@')[0]}),
                    $('<div/>',{class:'fs09',text:text11}),
                    $('<div/>',{class:'fs09',text:text12}),
                ),
            )
        )

        if(this.isCompare){
            statisticsPopupDeliveries(1,`delivery-${deliveryName.split('@')[0]}`,data1,data2,this.date1,this.date2)
        }else{
            statisticsPopupDeliveries(0,`delivery-${deliveryName.split('@')[0]}`,data1,null,this.date1,null)
        }

        if(this.period == 'day'){
            this.fillDeliveryGraph_day(data1,data2);
        }else if(this.period == 'month'){
            this.fillDeliveryGraph_month(data1,data2);
        }else if(this.period == 'year'){
            this.fillDeliveryGraph_year(data1,data2)
        }

    }
    fillDeliveryGraph_day(data1,data2){
        let emptyData = {
            deliveryName:data1.deliveryName,
            orders:0,
            time:0,
        }
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                totals.push(this._data1[key].deliveries[data1.deliveryName].orders);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    totals2.push(this._data2[key].deliveries[data1.deliveryName].orders);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        heighestNum < 3 ? heighestNum = 3 : null;
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(0).text(bigInt(heighestNum))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(1).text(bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(2).text(bigInt(heighestNum / 3))
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                let hour = this._data1[key].hour;
                let total = this._data1[key].deliveries[data1.deliveryName].orders;
                $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${hour}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class=""><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                if(this.isCompare){
                    let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,parseInt(this._data1[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    statisticsPopupDeliveries(1,`delivery-${data1.deliveryName.split('@')[0]}-${hour}`,this._data1[key].deliveries[data1.deliveryName],this._data2[key].deliveries[data1.deliveryName] ?? emptyData,date1,date2)
                }else{
                    statisticsPopupDeliveries(0,`delivery-${data1.deliveryName.split('@')[0]}-${hour}`,this._data1[key].deliveries[data1.deliveryName],null,date1,null)
                }
            }
        }


        if(this.isCompare){
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    let hour = this._data2[key].hour;
                    let total = this._data2[key].deliveries[data1.deliveryName].orders;
                    $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[hour="${hour}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${hour}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    let date1 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date1}</div></div>`
                    let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour),0,0).toISOString(),'onlyTime')} - ${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,parseInt(this._data2[key].hour)+1,0,0).toISOString(),'onlyTime')}</div><div class="fs08">${this.date2}</div></div>`
                    statisticsPopupDeliveries(1,`delivery-${data1.deliveryName.split('@')[0]}-${hour}`,this._data1[key].deliveries[data1.deliveryName] ?? emptyData,this._data2[key].deliveries[data1.deliveryName],date1,date2)
                }
            }
        }else{
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').addClass('none')

        }

    }
    fillDeliveryGraph_month(data1,data2){
        let emptyData = {
            deliveryName:data1.deliveryName,
            orders:0,
            time:0,
        }
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                totals.push(this._data1[key].deliveries[data1.deliveryName].orders);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    totals2.push(this._data2[key].deliveries[data1.deliveryName].orders);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        heighestNum < 3 ? heighestNum = 3 : null;
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(0).text(bigInt(heighestNum))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(1).text(bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(2).text(bigInt(heighestNum / 3))
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)

        if(this.isCompare){
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    let day = this._data2[key].day;
                    let total = this._data2[key].deliveries[data1.deliveryName].orders;
                    let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,this._data2[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${day}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    statisticsPopupDeliveries(0,`delivery-${data1.deliveryName.split('@')[0]}-${day}`,this._data2[key].deliveries[data1.deliveryName],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').addClass('none')
        }

        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                let day = this._data1[key].day;
                let total = this._data1[key].deliveries[data1.deliveryName].orders;
                $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[day="${day}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${day}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class=""><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,this._data1[key].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,this.data1.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                statisticsPopupDeliveries(0,`delivery-${data1.deliveryName.split('@')[0]}-${day}`,this._data1[key].deliveries[data1.deliveryName],null,date1,null)

                if(this.isCompare){
                    for(const key2 in this._data2){
                        let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,this._data2[key2].day,0,0,0).toISOString(),'dayAndMonthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,this.data2.month - 1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                        if(this._data2[key2].day == day && this._data2[key2].deliveries.hasOwnProperty(data1.deliveryName)){
                            statisticsPopupDeliveries(1,`delivery-${data1.deliveryName.split('@')[0]}-${day}`,this._data1[key].deliveries[data1.deliveryName],this._data2[key2].deliveries[data1.deliveryName],date1,date2)

                        }
                    }
                }
            }
        }

    }

    fillDeliveryGraph_year(data1,data2){
        let emptyData = {
            deliveryName:data1.deliveryName,
            orders:0,
            time:0,
        }
        let totals = [];
        let heighestNum = 0;
        let totals2 = [];
        let heighestNum2 = 0;
        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                totals.push(this._data1[key].deliveries[data1.deliveryName].orders);
            }
        }
        heighestNum = Math.ceil(totals.sort((a,b) => b - a)[0]);
        if(this.isCompare){
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    totals2.push(this._data2[key].deliveries[data1.deliveryName].orders);
                }
            }
            heighestNum2 = Math.ceil(totals2.sort((a,b) => b - a)[0]);
        }
        heighestNum2 > heighestNum ? heighestNum = heighestNum2 : null;
        heighestNum < 3 ? heighestNum = 3 : null;
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(0).text(bigInt(heighestNum))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(1).text(bigInt((heighestNum / 3) * 2))
        $('.statisticsGrapDeliveries').find('.statisticsGraphLeftContainer').children().eq(2).text(bigInt(heighestNum / 3))
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line1').css('height',0)
        $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').css('height',0)
        $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock`).attr('statisticsPopup',null)
        if(this.isCompare){
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').removeClass('none')
            for(const key in this._data2){
                if(this._data2[key].deliveries.hasOwnProperty(data1.deliveryName)){
                    let month = this._data2[key].month;
                    let total = this._data2[key].deliveries[data1.deliveryName].orders;
                    let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key].year,this._data2[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                    $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${month}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line2').css('height',((total/heighestNum)*100)+'%');
                    statisticsPopupDeliveries(0,`delivery-${data1.deliveryName.split('@')[0]}-${month}`,this._data2[key].deliveries[data1.deliveryName],null,date2,null,'cs2','cs1')
                }
            }
        }else{
            $('.statisticsGrapDeliveries').find('.statisticsGraphBlock_line2').addClass('none')
        }

        for(const key in this._data1){
            if(this._data1[key].deliveries.hasOwnProperty(data1.deliveryName)){
                let month = this._data1[key].month;
                let total = this._data1[key].deliveries[data1.deliveryName].orders;
                $('.statisticsGrapDeliveries').find(`.statisticsGraphBlock[month="${month}"]`).attr('statisticsPopup',`delivery-${data1.deliveryName.split('@')[0]}-${month}`).attr('statisticsPopupTitle',data1.deliveryName).find('.statisticsGraphBlock_line1').css('height',((total/heighestNum)*100)+'%')
                let date1 = `<div class=""><div>${getDateAndTime2(new Date(this._data1[key].year,this._data1[key].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data1.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                statisticsPopupDeliveries(0,`delivery-${data1.deliveryName.split('@')[0]}-${month}`,this._data1[key].deliveries[data1.deliveryName],null,date1,null)

                if(this.isCompare){
                    for(const key2 in this._data2){
                        if(this._data2[key2].month == month && this._data2[key2].deliveries.hasOwnProperty(data1.deliveryName)){
                            let date2 = `<div class=""><div>${getDateAndTime2(new Date(this._data2[key2].year,this._data2[key2].month - 1,1,0,0,0).toISOString(),'monthShort')}</div><div class="fs08">${getDateAndTime2(new Date(this.data2.year,1,1,0,0,0).toISOString(),'onlyYear')}</div></div>`
                            statisticsPopupDeliveries(1,`delivery-${data1.deliveryName.split('@')[0]}-${month}`,this._data1[key].deliveries[data1.deliveryName],this._data2[key2].deliveries[data1.deliveryName],date1,date2)
                        }
                    }
                }
            }
        }

    }
}

statisticsDay = class extends statistics {
    constructor(data){
        // console.log(data)
        let date1 = getDateAndTime2(new Date(data.year1,data.month1 - 1,data.day1).toISOString(),'noTime')
        super(0,date1,null,data.statistics1_day[0],null,data.statistics1_hours,null,'day');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();
    }


}

statisticsDayCompare = class extends statistics {
    constructor(data){
        // console.log(data)
        let date1 = getDateAndTime2(new Date(data.year1,data.month1 - 1,data.day1).toISOString(),'noTime')
        let date2 = getDateAndTime2(new Date(data.year2,data.month2 - 1,data.day2).toISOString(),'noTime')
        super(1,date1,date2,data.statistics1_day[0],data.statistics2_day[0],data.statistics1_hours,data.statistics2_hours,'day');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();

    }
}

statisticsMonth = class extends statistics {
    constructor(data){
        // console.log(data)
        let date1 = getDateAndTime2(new Date(data.year1,data.month1 - 1,1).toISOString(),'monthAndYear');
        super(0,date1,null,data.statistics1_month[0],null,data.statistics1_days,null,'month');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();

    }
}

statisticsMonthCompare = class extends statistics {
    constructor(data){
        // console.log(data)
        let date1 = getDateAndTime2(new Date(data.year1,data.month1 - 1,1).toISOString(),'monthAndYear');
        let date2 = getDateAndTime2(new Date(data.year2,data.month2 - 1,1).toISOString(),'monthAndYear');
        super(1,date1,date2,data.statistics1_month[0],data.statistics2_month[0],data.statistics1_days,data.statistics2_days,'month');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();
    }
}

statisticsYear = class extends statistics {
    constructor(data){
        // console.log(data)
        collectedYearData = collectYearsData(data.statistics1_months)
        let date1 = getDateAndTime2(new Date(data.year1,0,1).toISOString(),'onlyYear');
        super(0,date1,null,collectedYearData.year,null,collectedYearData.months,null,'year');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();
    }
}

statisticsYearCompare = class extends statistics {
    constructor(data){
        // console.log(data)
        collectedYearData1 = collectYearsData(data.statistics1_months)
        collectedYearData2 = collectYearsData(data.statistics2_months)
        let date1 = getDateAndTime2(new Date(data.year1,0,1).toISOString(),'onlyYear');
        let date2 = getDateAndTime2(new Date(data.year2,0,1).toISOString(),'onlyYear');
        super(1,date1,date2,collectedYearData1.year,collectedYearData2.year,collectedYearData1.months,collectedYearData2.months,'year');
        this.orders();
        this.products();
        this.users();
        this.deliveries();
        this.overview();
    }
}

////////////////functions
clacDeliveryTime = function(time){
    if(time == 1){
        return Math.round(time)+' '+texts.statistics.minute
    }else if(time < 60){
        return Math.round(time)+' '+texts.statistics.minutes
    }else{
        let hourText;
        let minuteText;
        let num = time;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);

        if(rhours == 1){
            hourText = rhours+' '+texts.statistics.hour
        }else{hourText = rhours+' '+texts.statistics.hours}
        if(rminutes == 0){
            minuteText = '';
        }else if(rminutes == 1){
            minuteText = texts.statistics.and+' '+rminutes+' '+texts.statistics.minute
        }else{minuteText = texts.statistics.and+' '+rminutes+' '+texts.statistics.minutes}

        return hourText+' '+minuteText;
    }
}
compareNums = function(num1,num2,reverseColor=false){
    let percentage;
    if(reverseColor == true){upColor = 'var(--csco)';downColor = 'var(--csso)'}else{downColor = 'var(--csco)';upColor = 'var(--csso)'}
    if(num1 > num2){
        if(num2 == 0){
            percentage = 100
        }else{
            percentage = 100 - (( num2 / num1 ) * 100);
        }
        return `<span style="color:${upColor}">(${Math.ceil(percentage)}%)<span class="ico-up fs08 mis-2"></span></span>`;
    }else if(num1 < num2){
        if(num1 == 0){
            percentage = 100
        }else{
            percentage = 100 - (( num1 / num2 ) * 100);
        }
        return `<span style="color:${downColor};">(${Math.ceil(percentage)}%)<span class="ico-down fs08 mis-2"></span></span>`;
    }else if(num1 == num2){
        return `<span style="color:var(--cs1);">(0%)<span class="ico-right fs08 mis-2"></span></span>`;
    }
}
bigInt = function(num){
    return num.toLocaleString(undefined,{minimumFractionDigits: 0,maximumFractionDigits: 0})
}
bigFloat = function(num){
    return num.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})
}
//////////////
collectYearsData = function(data){
    let months = {};
    let monthsNum = 0;
    let year = {
        website_id:data[0].website_id,
        year:data[0].year,
        so:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        do:{orders:0,items_total:0,delivery:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        po:{orders:0,items_total:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        co:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        di:{orders:0,items_total:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        users:{},
        products:{},
        deliveries:{},
    };
    for(const month in data){
        if(data[month].month ==  getDateAndTime2('now','monthNum') - 1){
            monthsNum = data[month].month - 1;
        }else{
            monthsNum = 11;
        }
    }
    for(m=0;m<=monthsNum;m++){
        months[m] = {
            website_id:data[0].website_id,
            year:data[0].year,
            month:m+1,
            so:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
            do:{orders:0,items_total:0,delivery:0,tax:0,total:0,guestOrders:0,userOrders:0,},
            po:{orders:0,items_total:0,tax:0,total:0,guestOrders:0,userOrders:0,},
            co:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
            di:{orders:0,items_total:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
            users:{},
            products:{},
            deliveries:{},
        }
        // for(const key in data){
        //     if(data[key].month == m){
        //         months[m].isExist = true;
        //     }
        // }
    }
    // console.log(months)

    for(const mo in data){
        for(const mo2 in months){
            if(months[mo2].month == data[mo].month){
                months[mo2] = data[mo];
                // months[mo2].isExist = true;
            }
        }
    }
    for(const key in months){
        month = months[key];
        for(const key2 in month.users){
            user = month.users[key2];
            year.users[key2] = {
                userName:month.users[key2].userName,
                so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
                co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
                di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
                do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
                po:0,po_itemsTotal:0,po_tax:0,po_total:0,
                rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
            }
        }
        for(const key3 in month.deliveries){
            let delivery = month.deliveries[key3];
            year.deliveries[key3] = {orders:0,time:0};
        }
        for(const key4 in month.products){
            product = month.products[key4];
            if(!year.products.hasOwnProperty([key4])){year.products[key4] = {sum:0,total:0,reviews:{rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0},options:{}}}
            for(const key5 in product.options){
                option = product.options[key5];
                if(!year.products[key4].options.hasOwnProperty([key5])){year.products[key4].options[key5] = {}}
                for(const key6 in option){
                    selection = option[key6];
                    if(!year.products[key4].options[key5].hasOwnProperty([key6])){
                        year.products[key4].options[key5][key6] = 0;
                    }
                }
            }
        }

    }
    for(const key in months){
        month = months[key];
        year.so.orders = year.so.orders + month.so.orders;
        year.so.items_total = year.so.items_total + month.so.items_total;
        year.so.delivery = year.so.delivery + month.so.delivery;
        year.so.tax = year.so.tax + month.so.tax;
        year.so.service = year.so.service + month.so.service;
        year.so.total = year.so.total + month.so.total;
        year.so.guestOrders = year.so.guestOrders + month.so.guestOrders;
        year.so.userOrders = year.so.userOrders + month.so.userOrders;
        year.co.orders = year.co.orders + month.co.orders;
        year.co.items_total = year.co.items_total + month.co.items_total;
        year.co.delivery = year.co.delivery + month.co.delivery;
        year.co.tax = year.co.tax + month.co.tax;
        year.co.service = year.co.service + month.co.service;
        year.co.total = year.co.total + month.co.total;
        year.co.guestOrders = year.co.guestOrders + month.co.guestOrders;
        year.co.userOrders = year.co.userOrders + month.co.userOrders;
        year.do.orders = year.do.orders + month.do.orders;
        year.do.items_total = year.do.items_total + month.do.items_total;
        year.do.delivery = year.do.delivery + month.do.delivery;
        year.do.tax = year.do.tax + month.do.tax;
        year.do.total = year.do.total + month.do.total;
        year.do.guestOrders = year.do.guestOrders + month.do.guestOrders;
        year.do.userOrders = year.do.userOrders + month.do.userOrders;
        year.po.orders = year.po.orders + month.po.orders;
        year.po.items_total = year.po.items_total + month.po.items_total;
        year.po.tax = year.po.tax + month.po.tax;
        year.po.total = year.po.total + month.po.total;
        year.po.guestOrders = year.po.guestOrders + month.po.guestOrders;
        year.po.userOrders = year.po.userOrders + month.po.userOrders;
        year.di.orders = year.di.orders + month.di.orders;
        year.di.items_total = year.di.items_total + month.di.items_total;
        year.di.tax = year.di.tax + month.di.tax;
        year.di.service = year.di.service + month.di.service;
        year.di.total = year.di.total + month.di.total;
        year.di.guestOrders = year.di.guestOrders + month.di.guestOrders;
        year.di.userOrders = year.di.userOrders + month.di.userOrders;

        for(const key2 in month.users){
            user = month.users[key2];
            year.users[key2].so = year.users[key2].so + user.so;
            year.users[key2].so_delivery = year.users[key2].so_delivery + user.so_delivery;
            year.users[key2].so_itemsTotal = year.users[key2].so_itemsTotal + user.so_itemsTotal;
            year.users[key2].so_service = year.users[key2].so_service + user.so_service;
            year.users[key2].so_tax = year.users[key2].so_tax + user.so_tax;
            year.users[key2].so_total = year.users[key2].so_total + user.so_total;
            year.users[key2].co = year.users[key2].co + user.co;
            year.users[key2].co_delivery = year.users[key2].co_delivery + user.co_delivery;
            year.users[key2].co_itemsTotal = year.users[key2].co_itemsTotal + user.co_itemsTotal;
            year.users[key2].co_service = year.users[key2].co_service + user.co_service;
            year.users[key2].co_tax = year.users[key2].co_tax + user.co_tax;
            year.users[key2].co_total = year.users[key2].co_total + user.co_total;
            year.users[key2].di = year.users[key2].di + user.di;
            year.users[key2].di_itemsTotal = year.users[key2].di_itemsTotal + user.di_itemsTotal;
            year.users[key2].di_service = year.users[key2].di_service + user.di_service;
            year.users[key2].di_tax = year.users[key2].di_tax + user.di_tax;
            year.users[key2].di_total = year.users[key2].di_total + user.di_total;
            year.users[key2].do = year.users[key2].do + user.do;
            year.users[key2].do_delivery = year.users[key2].do_delivery + user.do_delivery;
            year.users[key2].do_itemsTotal = year.users[key2].do_itemsTotal + user.do_itemsTotal;
            year.users[key2].do_tax = year.users[key2].do_tax + user.do_tax;
            year.users[key2].do_total = year.users[key2].do_total + user.do_total;
            year.users[key2].po = year.users[key2].po + user.po;
            year.users[key2].po_itemsTotal = year.users[key2].po_itemsTotal + user.po_itemsTotal;
            year.users[key2].po_tax = year.users[key2].po_tax + user.po_tax;
            year.users[key2].po_total = year.users[key2].po_total + user.po_total;
            year.users[key2].rv = year.users[key2].rv + user.rv;
            year.users[key2].rv1 = year.users[key2].rv1 + user.rv1;
            year.users[key2].rv2 = year.users[key2].rv2 + user.rv2;
            year.users[key2].rv3 = year.users[key2].rv3 + user.rv3;
            year.users[key2].rv4 = year.users[key2].rv4 + user.rv4;
            year.users[key2].rv5 = year.users[key2].rv5 + user.rv5;
        }
        for(const key3 in month.deliveries){
            let delivery = month.deliveries[key3];
            year.deliveries[key3].orders = year.deliveries[key3].orders + delivery.orders;
            year.deliveries[key3].time = year.deliveries[key3].time + delivery.time;
        }
        for(const key4 in month.products){
            product = month.products[key4];
            year.products[key4].sum =  year.products[key4].sum + product.sum;
            year.products[key4].total =  year.products[key4].total + product.total;
            year.products[key4].reviews.rv =  year.products[key4].reviews.rv + product.reviews.rv;
            year.products[key4].reviews.rv1 =  year.products[key4].reviews.rv1 + product.reviews.rv1;
            year.products[key4].reviews.rv2 =  year.products[key4].reviews.rv2 + product.reviews.rv2;
            year.products[key4].reviews.rv3 =  year.products[key4].reviews.rv3 + product.reviews.rv3;
            year.products[key4].reviews.rv4 =  year.products[key4].reviews.rv4 + product.reviews.rv4;
            year.products[key4].reviews.rv5 =  year.products[key4].reviews.rv5 + product.reviews.rv5;
            for(const key5 in product.options){
                option = product.options[key5];
                for(const key6 in option){
                    selection = option[key6];
                    year.products[key4].options[key5][key6] = year.products[key4].options[key5][key6] + selection;
                }
            }
        }

    }
    return {months:months,year:year}

}
///////////
statisticsPopup_income = function(isCompare,key,data1,data2,date1,date2){
    if(isCompare){
        window.statisticsPopups[`${key}itemsTotal`] = $('<div/>',{class:'row alnS jstfyS'}).append(
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1 brdrR1'}).append(
                $('<div/>',{class:'cs1 mie-10 fs101 mY5 bold fs101',text:date1}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.itemsTotal}),
                $('<div/>',{class:'fs103 bold',html:website.currency+bigFloat(data1.items_total)+' '+compareNums(data1.items_total,data2.items_total)})
            ),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'cs2 mie-10 fs101 mY5 bold fs101',text:date2}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.itemsTotal}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data2.items_total)})
            ),
        )
        window.statisticsPopups[`${key}tax`] = $('<div/>',{class:'row alnS jstfyS'}).append(
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1 brdrR1'}).append(
                $('<div/>',{class:'cs1 mie-10 fs101 mY5 bold fs101',text:date1}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.tax}),
                $('<div/>',{class:'fs103 bold',html:website.currency+bigFloat(data1.tax)+' '+compareNums(data1.tax,data2.tax)})
            ),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'cs2 mie-10 fs101 mY5 bold fs101',text:date2}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.tax}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data2.tax)})
            ),
        )
        window.statisticsPopups[`${key}deliveryCost`] = $('<div/>',{class:'row alnS jstfyS'}).append(
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1 brdrR1'}).append(
                $('<div/>',{class:'cs1 mie-10 fs101 mY5 bold fs101',text:date1}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.deliveryCost}),
                $('<div/>',{class:'fs103 bold',html:website.currency+bigFloat(data1.delivery)+' '+compareNums(data1.delivery,data2.delivery)})
            ),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'cs2 mie-10 fs101 mY5 bold fs101',text:date2}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.deliveryCost}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data2.delivery)})
            ),
        )
        window.statisticsPopups[`${key}service`] = $('<div/>',{class:'row alnS jstfyS'}).append(
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1 brdrR1'}).append(
                $('<div/>',{class:'cs1 mie-10 fs101 mY5 bold fs101',text:date1}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.service}),
                $('<div/>',{class:'fs103 bold',html:website.currency+bigFloat(data1.service)+' '+compareNums(data1.service,data2.service)})
            ),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'cs2 mie-10 fs101 mY5 bold fs101',text:date2}),
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.service}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data2.service)})
            ),
        )
    }else{
        window.statisticsPopups[`${key}itemsTotal`] = $('<div/>',{class:''}).append(
            $('<div/>',{class:'cs1 fs101 m5 bold fs101',text:date1}),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.itemsTotal}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data1.items_total)})
            ),
        )
        window.statisticsPopups[`${key}tax`] = $('<div/>',{class:''}).append(
            $('<div/>',{class:'cs1 fs101 m5 bold fs101',text:date1}),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.tax}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data1.tax)})
            ),
        )
        window.statisticsPopups[`${key}deliveryCost`] = $('<div/>',{class:''}).append(
            $('<div/>',{class:'cs1 fs101 m5 bold fs101',text:date1}),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.deliveryCost}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data1.delivery)})
            ),
        )
        window.statisticsPopups[`${key}service`] = $('<div/>',{class:''}).append(
            $('<div/>',{class:'cs1 fs101 m5 bold fs101',text:date1}),
            $('<div/>',{class:'column alnS jstfyS p5 bgc-c1'}).append(
                $('<div/>',{class:'mie-20 fs101 mB3',text:texts.statistics.service}),
                $('<div/>',{class:'fs103 bold',text:website.currency+bigFloat(data1.service)})
            ),
        )
    }
}

statisticsPopup_so = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.successfulOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.orders)}</span> ${compareNums(data1.orders,data2.orders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.userOrders)}</span> ${compareNums(data1.userOrders,data2.userOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.guestOrders)}</span> ${compareNums(data1.guestOrders,data2.guestOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.items_total)}</span> ${compareNums(data1.items_total,data2.items_total)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.tax)}</span> ${compareNums(data1.tax,data2.tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.service)}</span> ${compareNums(data1.service,data2.service)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.delivery)}</span> ${compareNums(data1.delivery,data2.delivery)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.total)}</span> ${compareNums(data1.total,data2.total)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.successfulOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.total)}),

                )
            ),
        );

    }
}

statisticsPopup_co = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.canceledOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.total}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.orders)}</span> ${compareNums(data1.orders,data2.orders,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.userOrders)}</span> ${compareNums(data1.userOrders,data2.userOrders,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.guestOrders)}</span> ${compareNums(data1.guestOrders,data2.guestOrders,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.items_total)}</span> ${compareNums(data1.items_total,data2.items_total,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.tax)}</span> ${compareNums(data1.tax,data2.tax,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.service)}</span> ${compareNums(data1.service,data2.service,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.delivery)}</span> ${compareNums(data1.delivery,data2.delivery,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.total)}</span> ${compareNums(data1.total,data2.total,true)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.total)}),
                ),
            ),
        )

    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.canceledOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.total}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.total)}),
                ),
            ),
        );

    }


}
statisticsPopup_do = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.orders)}</span> ${compareNums(data1.orders,data2.orders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.userOrders)}</span> ${compareNums(data1.userOrders,data2.userOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.guestOrders)}</span> ${compareNums(data1.guestOrders,data2.guestOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.items_total)}</span> ${compareNums(data1.items_total,data2.items_total)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.tax)}</span> ${compareNums(data1.tax,data2.tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.delivery)}</span> ${compareNums(data1.delivery,data2.delivery)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.total)}</span> ${compareNums(data1.total,data2.total)}`}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.total)}),
                ),

            ),
        )

    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.total)}),
                ),
            ),
        );

    }
}
statisticsPopup_po = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.pickupOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.orders)}</span> ${compareNums(data1.orders,data2.orders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.userOrders)}</span> ${compareNums(data1.userOrders,data2.userOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.guestOrders)}</span> ${compareNums(data1.guestOrders,data2.guestOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.items_total)}</span> ${compareNums(data1.items_total,data2.items_total)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.tax)}</span> ${compareNums(data1.tax,data2.tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.total)}</span> ${compareNums(data1.total,data2.total)}`}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.total)}),
                ),
            ),
        )

    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.pickupOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.total)}),
                ),
            ),
        );

    }
}
statisticsPopup_di = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.dineInOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.orders)}</span> ${compareNums(data1.orders,data2.orders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.userOrders)}</span> ${compareNums(data1.userOrders,data2.userOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.guestOrders)}</span> ${compareNums(data1.guestOrders,data2.guestOrders)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.items_total)}</span> ${compareNums(data1.items_total,data2.items_total)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.tax)}</span> ${compareNums(data1.tax,data2.tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.service)}</span> ${compareNums(data1.service,data2.service)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.total)}</span> ${compareNums(data1.total,data2.total)}`}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.total)}),
                ),

            ),

        )

    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.dineInOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.orderedByUsers}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.orderedByGuests}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),
                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.orders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.userOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.guestOrders)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.items_total)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.total)}),
                ),
            ),
        );

    }
}
/////////////
statisticsPopupUsers_so = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.successfulOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.so)}</span> ${compareNums(data1.so,data2.so)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_itemsTotal)}</span> ${compareNums(data1.so_itemsTotal,data2.so_itemsTotal)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_tax)}</span> ${compareNums(data1.so_tax,data2.so_tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_service)}</span> ${compareNums(data1.so_service,data2.so_service)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_delivery)}</span> ${compareNums(data1.so_delivery,data2.so_delivery)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_total)}</span> ${compareNums(data1.so_total,data2.so_total)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.so)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.so_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.so_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.so_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.so_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.so_total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.successfulOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.so)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.so_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.so_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.so_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.so_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.so_total)}),

                )
            ),
        );

    }
}
statisticsPopupUsers_co = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.canceledOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.co)}</span> ${compareNums(data1.co,data2.co,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_itemsTotal)}</span> ${compareNums(data1.co_itemsTotal,data2.co_itemsTotal,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_tax)}</span> ${compareNums(data1.co_tax,data2.co_tax,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_service)}</span> ${compareNums(data1.co_service,data2.co_service,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_delivery)}</span> ${compareNums(data1.co_delivery,data2.co_delivery,true)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_total)}</span> ${compareNums(data1.co_total,data2.co_total,true)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.co)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.co_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.co_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.co_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.co_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.co_total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.canceledOrders}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.co)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.co_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.co_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.co_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.co_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.co_total)}),

                )
            ),
        );

    }
}
statisticsPopupUsers_do = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveriedOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.do)}</span> ${compareNums(data1.do,data2.do)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_itemsTotal)}</span> ${compareNums(data1.do_itemsTotal,data2.do_itemsTotal)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_tax)}</span> ${compareNums(data1.do_tax,data2.do_tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_delivery)}</span> ${compareNums(data1.do_delivery,data2.do_delivery)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_total)}</span> ${compareNums(data1.do_total,data2.do_total)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.do)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.do_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.do_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.do_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.do_total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.deliveriedOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.deliveryCost}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.do)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.do_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.do_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.do_delivery)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.do_total)}),

                )
            ),
        );

    }
}
statisticsPopupUsers_po = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.pickedupOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.po)}</span> ${compareNums(data1.po,data2.po)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_itemsTotal)}</span> ${compareNums(data1.po_itemsTotal,data2.po_itemsTotal)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_tax)}</span> ${compareNums(data1.po_tax,data2.po_tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_total)}</span> ${compareNums(data1.po_total,data2.po_total)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.po)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.po_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.po_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.po_total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.pickedupOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.po)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.po_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.po_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.po_total)}),

                )
            ),
        );

    }
}
statisticsPopupUsers_di = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.dineinOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.di)}</span> ${compareNums(data1.di,data2.di)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_itemsTotal)}</span> ${compareNums(data1.di_itemsTotal,data2.di_itemsTotal)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_tax)}</span> ${compareNums(data1.di_tax,data2.di_tax)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_service)}</span> ${compareNums(data1.di_service,data2.di_service)}`}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_total)}</span> ${compareNums(data1.di_total,data2.di_total)}`}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.di)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.di_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.di_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.di_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.di_total)}),

                )
            ),
        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:data1.id,text:data1.userName}),
            $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.dineinOrdersGraph}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.itemsTotal}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.tax}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3',text:texts.statistics.service}),
                    $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1',text:texts.statistics.totalIncome}),

                ),
                $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                    $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.di)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.di_itemsTotal)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.di_tax)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.di_service)}),
                    $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.di_total)}),

                )
            ),
        );

    }
}
statisticsPopupUsers = function(isCompare,userId,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:userId,text:data1.userName}),

            $('<div/>',{class:'row alnS jstfyS'}).append(
                $('<div/>',{class:'brdrR2-30 mie-5 pie-5'}).append(
                    $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 bold',text:texts.statistics.successfulOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10 brdrB2-30',text:texts.statistics.successfulOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR bold',text:texts.statistics.canceledOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10 brdrB2-30',text:texts.statistics.canceledOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cStar bold',text:texts.statistics.reviews}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),

                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.so)}</span> ${compareNums(data1.so,data2.so)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_itemsTotal)}</span> ${compareNums(data1.so_itemsTotal,data2.so_itemsTotal)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_tax)}</span> ${compareNums(data1.so_tax,data2.so_tax)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_service)}</span> ${compareNums(data1.so_service,data2.so_service)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_delivery)}</span> ${compareNums(data1.so_delivery,data2.so_delivery)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3 brdrB2-30',html:`<span class="mie-2">${website.currency+bigFloat(data1.so_total)}</span> ${compareNums(data1.so_total,data2.so_total)}`}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.co)}</span> ${compareNums(data1.co,data2.co,true)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_itemsTotal)}</span> ${compareNums(data1.co_itemsTotal,data2.co_itemsTotal,true)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_tax)}</span> ${compareNums(data1.co_tax,data2.co_tax,true)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_service)}</span> ${compareNums(data1.co_service,data2.co_service,true)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_delivery)}</span> ${compareNums(data1.co_delivery,data2.co_delivery,true)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3 brdrB2-30',html:`<span class="mie-2">${website.currency+bigFloat(data1.co_total)}</span> ${compareNums(data1.co_total,data2.co_total,true)}`}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.rv)}</span> ${compareNums(data1.rv,data2.rv)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.rv1)}</span>`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.rv2)}</span>`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.rv3)}</span>`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.rv4)}</span>`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${bigInt(data1.rv5)}</span>`}),

                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.so)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.so_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.so_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.so_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.so_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data2.so_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.co)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.co_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.co_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.co_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.co_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data2.co_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.rv)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.rv1)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.rv2)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.rv3)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.rv4)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data2.rv5)}),

                        )
                    ),
                ),
                $('<div/>',{class:''}).append(
                    $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery bold',text:texts.statistics.deliveriedOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-delivery pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-delivery pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery pis-10 brdrB2-30',text:texts.statistics.deliveriedOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-pickup bold',text:texts.statistics.pickedupOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-pickup pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-pickup pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-pickup pis-10 brdrB2-30',text:texts.statistics.pickedupOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn bold',text:texts.statistics.dineinOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-dineIn pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-dineIn pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn pis-10 brdrB2-30',text:texts.statistics.dineinOrdersIncomeGraph_users}),

                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.do)}</span> ${compareNums(data1.do,data2.do)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_itemsTotal)}</span> ${compareNums(data1.do_itemsTotal,data2.do_itemsTotal)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_tax)}</span> ${compareNums(data1.do_tax,data2.do_tax)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_delivery)}</span> ${compareNums(data1.do_delivery,data2.do_delivery)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 brdrB2-30',html:`<span class="mie-2">${website.currency+bigFloat(data1.do_total)}</span> ${compareNums(data1.do_total,data2.do_total)}`}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.po)}</span> ${compareNums(data1.po,data2.po)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_itemsTotal)}</span> ${compareNums(data1.po_itemsTotal,data2.po_itemsTotal)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_tax)}</span> ${compareNums(data1.po_tax,data2.po_tax)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3 brdrB2-30',html:`<span class="mie-2">${website.currency+bigFloat(data1.po_total)}</span> ${compareNums(data1.po_total,data2.po_total)}`}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${bigInt(data1.di)}</span> ${compareNums(data1.di,data2.di)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_itemsTotal)}</span> ${compareNums(data1.di_itemsTotal,data2.di_itemsTotal)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_tax)}</span> ${compareNums(data1.di_tax,data2.di_tax)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c3',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_service)}</span> ${compareNums(data1.di_service,data2.di_service)}`}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-25 p5 pie-20 bgc-c1 brdrB2-30',html:`<span class="mie-2">${website.currency+bigFloat(data1.di_total)}</span> ${compareNums(data1.di_total,data2.di_total)}`}),


                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs2}`,html:date2}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.do)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.do_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.do_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.do_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1 brdrB2-30',text:website.currency+bigFloat(data2.do_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.po)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.po_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.po_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data2.po_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data2.di)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.di_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data2.di_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data2.di_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1 brdrB2-30',text:website.currency+bigFloat(data2.di_total)}),

                        )
                    ),
                ),
            ),








        )
    }else{
        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer'}).append(
            $('<a/>',{class:'fs103 bold mX5 popupPage',popupPage:'User',userId:userId,text:data1.userName}),

            $('<div/>',{class:'row alnS jstfyS'}).append(
                $('<div/>',{class:'brdrR2-30 mie-5 pie-5'}).append(
                    $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 bold',text:texts.statistics.successfulOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 pis-10 brdrB2-30',text:texts.statistics.successfulOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR bold',text:texts.statistics.canceledOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10 brdrB2-30',text:texts.statistics.canceledOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cStar bold',text:texts.statistics.reviews}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 cR pis-10'}).append(
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                                $('<span/>',{class:'fs08 cStar ico-star'}),
                            ),

                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.so)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.so_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.so_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.so_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.so_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data1.so_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.co)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.co_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.co_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.co_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.co_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data1.co_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.rv)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.rv1)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.rv2)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.rv3)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.rv4)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:bigInt(data1.rv5)}),

                        )
                    ),
                ),
                $('<div/>',{class:''}).append(
                    $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 pB10',text:''}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery bold',text:texts.statistics.deliveriedOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-delivery pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-delivery pis-10',text:texts.statistics.deliveryCost}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-delivery pis-10 brdrB2-30',text:texts.statistics.deliveriedOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-pickup bold',text:texts.statistics.pickedupOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-pickup pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-pickup pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-pickup pis-10 brdrB2-30',text:texts.statistics.pickedupOrdersIncomeGraph_users}),

                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn bold',text:texts.statistics.dineinOrdersGraph}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-dineIn pis-10',text:texts.statistics.itemsTotal}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn pis-10',text:texts.statistics.tax}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c3 c-dineIn pis-10',text:texts.statistics.service}),
                            $('<div/>',{class:'h15 row alnC jstfyS w100p-25 p5 pie-20 bgc-c1 c-dineIn pis-10 brdrB2-30',text:texts.statistics.dineinOrdersIncomeGraph_users}),
                        ),
                        $('<div/>',{class:'column alnS jstfyS grow1'}).append(
                            $('<div/>',{class:`h15 row alnC jstfyE w100p-10 p5 bgc-c1 taE bold pB10 ${cs1}`,html:date1}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.do)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.do_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.do_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.do_delivery)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1 brdrB2-30',text:website.currency+bigFloat(data1.do_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.po)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.po_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.po_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3 brdrB2-30',text:website.currency+bigFloat(data1.po_total)}),

                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:bigInt(data1.di)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.di_itemsTotal)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1',text:website.currency+bigFloat(data1.di_tax)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c3',text:website.currency+bigFloat(data1.di_service)}),
                            $('<div/>',{class:'h15 row alnC jstfyE w100p-10 p5 bgc-c1 brdrB2-30',text:website.currency+bigFloat(data1.di_total)}),
                        )
                    ),
                ),
            ),
        );

    }
}
////////
statisticsPopupDeliveries = function(isCompare,key,data1,data2,date1,date2,cs1='cs1',cs2='cs2'){
    if(isCompare){
        let text11;let text12 = '';let text21; let text22 = '';
        if(data1.orders == 1){
            text11 = `${data1.orders} ${texts.statistics.deliveredOrder} ${compareNums(data1.orders,data2.orders)} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }else{
            text11 = `${bigInt(data1.orders)} ${texts.statistics.deliveredOrders} ${compareNums(data1.orders,data2.orders)} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }
        if(data1.orders > 0 ){
            text12 = `${texts.statistics.avg} ${clacDeliveryTime(data1.time / data1.orders)} ${texts.statistics.perOrder} ${data2.orders == 0 ? '' : compareNums((data1.time / data1.orders),(data2.time / data2.orders),true)}`
        }

        if(data2.orders == 1){
            text21 = `${data2.orders} ${texts.statistics.deliveredOrder} ${texts.statistics.in} ${clacDeliveryTime(data2.time)}`
        }else{
            text21 = `${bigInt(data2.orders)} ${texts.statistics.deliveredOrders} ${texts.statistics.in} ${clacDeliveryTime(data2.time)}`
        }
        if(data2.orders > 0 ){
            text22 = `${texts.statistics.avg} ${clacDeliveryTime(data2.time / data2.orders)} ${texts.statistics.perOrder}`
        }


        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer pX5'}).append(
            $('<div/>',{html:date1,class:`${cs1} m5 bold fs103`}),
            $('<div/>',{html:text11,class:'fs102 mX5'}),
            $('<div/>',{html:text12,class:'fs102 mX5'}),
            $('<div/>',{html:date2,class:`${cs2} m5 pT10 mT10 bold fs103 brdrT2-30 w100p-10`}),
            $('<div/>',{text:text21,class:'fs102 mX5'}),
            $('<div/>',{text:text22,class:'fs102 mX5 mB10'}),
        );
    }else{
        let text11;let text12 = '';
        if(data1.orders == 1){
            text11 = `${data1.orders} ${texts.statistics.deliveredOrder} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }else{
            text11 = `${bigInt(data1.orders)} ${texts.statistics.deliveredOrders} ${texts.statistics.in} ${clacDeliveryTime(data1.time)}`
        }
        if(data1.orders > 0 ){
            text12 = `${texts.statistics.avg} ${clacDeliveryTime(data1.time / data1.orders)} ${texts.statistics.perOrder}`
        }

        window.statisticsPopups[key] = $('<div/>',{class:'statisticsInfoContainer pX5'}).append(
            $('<div/>',{html:date1,class:`${cs1} m5 bold fs103`}),
            $('<div/>',{text:text11,class:'fs102 mX5'}),
            $('<div/>',{text:text12,class:'fs102 mX5 mB10'}),
        );
    }
}
