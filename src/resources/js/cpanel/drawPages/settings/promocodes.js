drawPage_promo_codes = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.promo_codes}),
                $('<span/>',{class:'ico-help help-icon',helpId:'promo_codes'})
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_promo_code',text:texts.settings.createPromocode})
            ),
            $('<div/>',{class:'m10 fs1 none',id:'noPromocodes',text:texts.settings.noPromocodes}),
            $('<div/>',{class:'w100p overflowX-A'}).append(
                $('<table/>',{id:'promocodesTable',class:'',autoHelp:'promo_codes_list'}).append(
                    $(`<colgroup><col span="1" style="width: 100%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"><col span="1" style="width: 1%;"></colgroup>`),
                    $('<tr/>',{class:'trHead'}).append(
                        $('<th/>',{class:'tnw taS vaM',text:texts.settings.code}),
                        $('<th/>',{class:'tnw taS vaM',text:texts.settings.created}),
                        $('<th/>',{class:'tnw taC vaM',text:texts.settings.active}),
                        $('<th/>',{class:'tnw taC vaM',text:''})
                    )
                ),
            )

        )
    )
    for(i=1;i<=5;i++){
        $('#promocodesTable').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{class:'taC'}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w400 w150-720'})),
                $('<td/>',{class:'taS'}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{class:'taC'}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
                $('<td/>',{class:'taC'}).append($('<div/>',{class:'cardLoading h10 mY5 br5 w50'})),
            )
        )
    }
    getPromocodes();
}
drawPopupPage_create_promo_code = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.create_promo_code}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').addClass('w500 mxw100p-40 p20').append(
        $('<div/>',{class:'area',autoHelp:'create_promo_code_basic_info'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeBasicInfo}),
            drawInputText('','ico-promo_codes','',texts.settings.code,'createPromocode-codeInput','text',texts.settings.code,50,'clearVal','mX10 w100p-20','',false),
            $('<div/>',{class:'numberPickerContainer_100p mT10 brdrT0'}).append(
                $('<span/>',{text:texts.settings.discount}),
                $('<div/>',{class:'numberPickerControls'}).append(
                    $('<span/>',{class:'numberPickerArrow ico-left ',id:'createPromocode-discountD'}),
                    $('<span/>',{class:'numberPickerValue'}).append(
                        $('<span/>',{id:'createPromocode-discount',text:'1'}),
                        $('<span/>',{text:'%'}),
                    ),
                    $('<span/>',{class:'numberPickerArrow ico-right ',id:'createPromocode-discountU'}),
                )
            ),
        ),
        $('<div/>',{class:'area column alnC jstfyS mT40',autoHelp:'promo_code_expiration'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeexpiry}),
            drawSwitchBtn('',texts.settings.isExpire,'createPromocode-isExpire','checkboxlabel_100p mT10 brdrT0'),
            $('<div/>',{class:'datePickerContainerWrapper_100p none'}).append(
                $('<div/>',{class:'fs09',text:texts.settings.expireAt}),
                $('<div/>',{class:'datePickerSelectedDateContainer',id:'datePicker-promocodesContainer',datePickerContainer:'datePicker-promocodes'}).append(
                    $('<span/>',{class:'ico-datePicker datePickerSelectedDateIcon'}),
                    $('<span/>',{class:'datePickerSelectedDate'}),
                    $('<span/>',{class:'ico-down mX10'})
                )
            ),
            $('<div/>',{class:'datePickerContainer',id:'datePicker-promocodes',todayActive:'0',selectPeriod:'month',selectBy:'day',datePickerType:'future'}).append(
                $('<div/>',{class:'datePickerMonthContainer'}).append(
                    $('<span/>',{class:'ico-left datePickerPrevMonthBtn',datePickerContainer:'datePicker-promocodes'}),
                    $('<span/>',{class:'datePickerMonthNameContainer',month:'',year:''}).append(
                        $('<span/>',{class:'datePickerMonth fs1 mX3',month:''}),
                        $('<span/>',{class:'datePickerYear fs09 mT10',year:''})
                    ),
                    $('<span/>',{class:'ico-right datePickerNextMonthBtn',datePickerContainer:'datePicker-promocodes'}),
                ),
                $('<div/>',{class:'datePickerDaysContainer'}).append(
                    $('<div/>',{class:'datePickerWeekDaysNames'}).append(
                        $('<span/>',{class:'datePickerDayName',text:'Su'}),
                        $('<span/>',{class:'datePickerDayName',text:'Mo'}),
                        $('<span/>',{class:'datePickerDayName',text:'Tu'}),
                        $('<span/>',{class:'datePickerDayName',text:'We'}),
                        $('<span/>',{class:'datePickerDayName',text:'Th'}),
                        $('<span/>',{class:'datePickerDayName',text:'Fr'}),
                        $('<span/>',{class:'datePickerDayName',text:'Sa'}),
                    ),
                    $('<div/>',{class:'datePickerWeekDays'})
                )
            )
        ),
        $('<div/>',{class:'area mT40',autoHelp:'promo_code_limitations'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.OrderTotalLimits}),
            drawInputText('','ico-money','',texts.settings.minimum,'createPromocode-minimum','number',texts.settings.minimum,50,'clearVal','w100p-20 mX10','',false),
            drawInputText('','ico-money','',texts.settings.cap,'createPromocode-cap','number',texts.settings.cap,50,'clearVal','w100p-20 mX10','',false)
        ),
        $('<div/>',{class:'area mT40',autoHelp:'promo_code_settings'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeSettings}),
            drawSwitchBtn('',texts.settings.isOneUse,'createPromocode-isOneUse','checkboxlabel_100p mT10 brdrT0'),
            drawSwitchBtn('',texts.settings.isGuest,'createPromocode-isGuest','checkboxlabel_100p'),
            drawSwitchBtn('',texts.settings.isDelivery,'createPromocode-isDelivery','checkboxlabel_100p'),
            drawSwitchBtn('',texts.settings.isPickup,'createPromocode-isPickup','checkboxlabel_100p'),
        ),
        $('<div/>',{class:'btnContainer mT40'}).append(
            $('<button/>',{class:'btn',id:'createPromocode-createBtn'}).append(
                $('<div/>',{class:'btnTxt',text:texts.cpanel.public.create}),
                $('<div/>',{class:'btnLoading'})
            )
        )

    )
    $('#createPromocode-isOneUse').prop('checked',true)
    $('#createPromocode-isDelivery').prop('checked',true)
    $('#createPromocode-isPickup').prop('checked',true)
    for(i=1;i<=42;i++){
        $('.datePickerWeekDays').append(
            $('<span/>',{class:'datePickerDay',dayNum:i})
        )
    }
    drawdatePicker($('#datePicker-promocodes'),true)
}
drawPopupPage_manage_promo_code_loading = function(){
    $('#popupPageTitle').text('').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.manage_promo_code}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').addClass('w500 mxw100p-40 p20').append(
        $('<div/>',{class:'colum alnS sjtfyS mB20'}).append(
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
        ),
        $('<div/>',{class:'colum alnS sjtfyS mY20'}).append(
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w80p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w80p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w80p br5 h8'}),
        ),
        $('<div/>',{class:'colum alnS sjtfyS mY20'}).append(
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w60p br5 h8'}),
            $('<div/>',{class:'cardLoading m10 w70p br5 h8'}),
        ),
    )
}
drawPopupPage_manage_promo_code=function(promocode){
    $('#popupPageTitle').text('').append(
        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:`editPromocodeNoSave-${promocode.id} ico-warning unsaved none mie-5 mis-5 fs1 `}),
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.manage_promo_code}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('w500 mxw100p-40 p20').append(
        $('<div/>',{class:'area',autoHelp:'manage_promo_code_basic_info'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeBasicInfo}),
            drawInputText('','ico-promo_codes','',texts.settings.code,'editPromocode-codeInput','text',texts.settings.code,50,'copy','mX10 w100p-20',promocode.code,true),
            $('<div/>',{class:'numberPickerContainer_100p mT10 brdrT0'}).append(
                $('<span/>',{text:texts.settings.discount}),
                $('<div/>',{class:'numberPickerControls'}).append(
                    $('<span/>',{class:'numberPickerArrow ico-left',id:'editPromocode-discountD'}),
                    $('<span/>',{class:'numberPickerValue'}).append(
                        $('<span/>',{id:'editPromocode-discount',text:parseInt(promocode.discount)}),
                        $('<span/>',{text:'%'}),
                    ),
                    $('<span/>',{class:'numberPickerArrow ico-right',id:'editPromocode-discountU'}),
                )
            ),
        ),
        $('<div/>',{class:'area column alnC jstfyS mT40',autoHelp:'promo_code_expiration'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeexpiry}),
            drawSwitchBtn('',texts.settings.isExpire,'editPromocode-isExpire','checkboxlabel_100p mT10 brdrT0'),
            $('<div/>',{class:'datePickerContainerWrapper_100p none'}).append(
                $('<div/>',{class:'fs09',text:texts.settings.expireAt}),
                $('<div/>',{class:'datePickerSelectedDateContainer',id:'datePicker-editPromocodesContainer',datePickerContainer:'datePicker-editPromocodes'}).append(
                    $('<span/>',{class:'ico-datePicker datePickerSelectedDateIcon'}),
                    $('<span/>',{class:'datePickerSelectedDate'}),
                    $('<span/>',{class:'ico-down mX10'})
                )
            ),
            $('<div/>',{class:'datePickerContainer',id:'datePicker-editPromocodes',todayActive:'0',selectPeriod:'month',selectBy:'day',datePickerType:'future'}).append(
                $('<div/>',{class:'datePickerMonthContainer'}).append(
                    $('<span/>',{class:'ico-left datePickerPrevMonthBtn',datePickerContainer:'datePicker-editPromocodes'}),
                    $('<span/>',{class:'datePickerMonthNameContainer',month:'',year:''}).append(
                        $('<span/>',{class:'datePickerMonth fs1 mX3',month:''}),
                        $('<span/>',{class:'datePickerYear fs09 mT10',year:''})
                    ),
                    $('<span/>',{class:'ico-right datePickerNextMonthBtn',datePickerContainer:'datePicker-editPromocodes'}),
                ),
                $('<div/>',{class:'datePickerDaysContainer'}).append(
                    $('<div/>',{class:'datePickerWeekDaysNames'}).append(
                        $('<span/>',{class:'datePickerDayName',text:'Su'}),
                        $('<span/>',{class:'datePickerDayName',text:'Mo'}),
                        $('<span/>',{class:'datePickerDayName',text:'Tu'}),
                        $('<span/>',{class:'datePickerDayName',text:'We'}),
                        $('<span/>',{class:'datePickerDayName',text:'Th'}),
                        $('<span/>',{class:'datePickerDayName',text:'Fr'}),
                        $('<span/>',{class:'datePickerDayName',text:'Sa'}),
                    ),
                    $('<div/>',{class:'datePickerWeekDays'})
                )
            )
        ),
        $('<div/>',{class:'area mT40',autoHelp:'promo_code_limitations'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.OrderTotalLimits}),
            drawInputText('','ico-money','',texts.settings.minimum,'editPromocode-minimum','number',texts.settings.minimum,50,'clearVal','w100p-20 mX10',parseFloat(promocode.minimum).toFixed(2),false),
            drawInputText('','ico-money','',texts.settings.cap,'editPromocode-cap','number',texts.settings.cap,50,'clearVal','w100p-20 mX10',parseFloat(promocode.cap).toFixed(2),false)
        ),
        $('<div/>',{class:'area mT40',autoHelp:'promo_code_settings'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.codeSettings}),
            drawSwitchBtn('',texts.settings.isOneUse,'editPromocode-isOneUse','checkboxlabel_100p mT10 brdrT0'),
            drawSwitchBtn('',texts.settings.isGuest,'editPromocode-isGuest','checkboxlabel_100p'),
            drawSwitchBtn('',texts.settings.isDelivery,'editPromocode-isDelivery','checkboxlabel_100p'),
            drawSwitchBtn('',texts.settings.isPickup,'editPromocode-isPickup','checkboxlabel_100p'),
        ),
        drawSaveCancelBtns('editPromocode_saveBtn','editPromocode_cancelBtn','mT40')
    )
    for(i=1;i<=42;i++){
        $('.datePickerWeekDays').append(
            $('<span/>',{class:'datePickerDay datePickerDay_editPromocode',dayNum:i})
        )
    }
    drawdatePicker($('#datePicker-editPromocodes'),true)
    if(promocode.is_expires == true){
        $('#editPromocode-isExpire').prop('checked',true);
        $('#datePicker-editPromocodesContainer').parent().removeClass('none');
        setdatePicker(
            $('#datePicker-editPromocodes'),
            promocode.year,promocode.month - 1,promocode.day
        )
    }
    promocode.is_oneUse == 1 ? $('#editPromocode-isOneUse').prop('checked',true) : null;
    promocode.is_delivery == 1 ? $('#editPromocode-isDelivery').prop('checked',true) : null;
    promocode.is_pickup == 1 ? $('#editPromocode-isPickup').prop('checked',true) : null;
    promocode.is_guest == 1 ? $('#editPromocode-isGuest').prop('checked',true) : null;
    promo_codes_unsave_check();
}
