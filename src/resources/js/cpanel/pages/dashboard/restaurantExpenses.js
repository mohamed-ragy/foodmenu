drawRestaurantFixedExpenses = function(){
    if(!account.is_master){return;}
    $('#restaurantExpenses-fixedExpensesContainer').text('');
    if(website.expenses.length > 0){
        $('#restaurantExpenses-noFixedExpenses').addClass('none');
        let fixedExpensesTotal = 0;
        for(const key in website.expenses){
            let expenses = website.expenses[key];
            fixedExpensesTotal = fixedExpensesTotal + parseFloat(expenses.amount);
            $('#restaurantExpenses-fixedExpensesContainer').append(
                $('<div/>',{
                    class:'row alnC jstfyC restaurantFixedExpensesContainer',
                    expensesName:expenses.name,
                    amount:expenses.amount,
                }).append(
                    $('<div/>',{class:'restaurantExpensesContainer'}).append(
                        $('<span/>',{class:'taS',text:expenses.name}),
                        $('<span/>',{class:'taE',text:website.currency+expenses.amount}),
                    ),
                    $('<div/>',{class:'deleteExpenses ico-delete',tooltip:texts.cpanel.public.delete}),
                    $('<div/>',{class:'loading deleteExpensesLoading mX5 none'})
                )
            )
        }
        $('#restaurantExpenses-fixedExpensesContainer').append(
            $('<div/>',{
                class:'flexRowNoWrap'
            }).append(
                $('<div/>',{class:'restaurantExpensesContainer'}).append(
                    $('<span/>',{class:'taS bold',text:texts.restaurantExpenses.total}),
                    $('<span/>',{class:'taE bold',text:website.currency+fixedExpensesTotal.toFixed(2)}),
                ),
                $('<div/>',{class:'deleteExpenses ico-delete vH',tooltip:texts.cpanel.public.delete}),
            )
        )
    }else{
        $('#restaurantExpenses-noFixedExpenses').removeClass('none');
    }
}
drawRestaurantFixedExpenses();
$('#restaurantExpenses-fixedExpenses-addAmount').on('change',function(){
    if($(this).val() == ''){$(this).val(0.00)}
    if($(this).val() == '0'){$(this).val(0.00)}
    $(this).val(parseFloat($(this).val()).toFixed(2));
})
$('#restaurantExpenses-addFixedExpensesBtn').on('click',function(){
    if($('#restaurantExpenses-fixedExpenses-AddName').val() == ''){
        showAlert('error',texts.restaurantExpenses.expenseNameRequired,4000,true);
        $('#restaurantExpenses-fixedExpenses-AddName').select();
        $('#itidashboard-restaurantExpenses-fixedExpenses-AddName').addClass('inputTextError');
        setTimeout(function(){
            $('#itidashboard-restaurantExpenses-fixedExpenses-AddName').removeClass('inputTextError');
        },4000)
        return;
    }else if($('#restaurantExpenses-fixedExpenses-addAmount').val() == ''){
        showAlert('error',texts.restaurantExpenses.expenseAmountRequired,4000,true);
        $('#restaurantExpenses-fixedExpenses-addAmount').select();
        $('#itidashboard-restaurantExpenses-fixedExpenses-addAmount').addClass('inputTextError');
        setTimeout(function(){
            $('#itidashboard-restaurantExpenses-fixedExpenses-addAmount').removeClass('inputTextError');
        },4000)
        return;
    }else{
        showBtnLoading($('#restaurantExpenses-addFixedExpensesBtn'))
        $.ajax({
            url:'dashboard',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                addRestaurantExpenses:true,
                expensesName:$('#restaurantExpenses-fixedExpenses-AddName').val(),
                expensesAmount:$('#restaurantExpenses-fixedExpenses-addAmount').val(),
            }
            ,success:function(response){
                hideBtnLoading($('#restaurantExpenses-addFixedExpensesBtn'))
                if(response.addRestaurantExpensesStatus == 0){
                    if(response.errors.expensesName){
                        showAlert('error',response.errors.expensesName[0],4000,true);
                        $('#restaurantExpenses-fixedExpenses-AddName').select();
                        $('#itidashboard-restaurantExpenses-fixedExpenses-AddName').addClass('inputTextError');
                        setTimeout(function(){
                            $('#itidashboard-restaurantExpenses-fixedExpenses-AddName').removeClass('inputTextError');
                        },4000)
                    }else if(response.errors.expensesAmount){
                        showAlert('error',response.errors.expensesAmount[0],4000,true);
                        $('#restaurantExpenses-fixedExpenses-addAmount').select();
                        $('#itidashboard-restaurantExpenses-fixedExpenses-addAmount').addClass('inputTextError');
                        setTimeout(function(){
                            $('#itidashboard-restaurantExpenses-fixedExpenses-addAmount').removeClass('inputTextError');
                        },4000)
                    }
                }else if(response.addRestaurantExpensesStatus == 2){
                    showAlert('error',response.msg,4000,true);
                }else if(response.addRestaurantExpensesStatus == 1){
                    showAlert('success',response.msg,4000,true);
                    website.expenses = response.restaurantFixedExpenses;
                    drawRestaurantFixedExpenses();
                    $('#restaurantExpenses-fixedExpenses-AddName').val('');
                    $('#restaurantExpenses-fixedExpenses-addAmount').val('0.00');
                }
            }
        })
    }
})
$('#restaurantExpenses-fixedExpensesContainer').on('click','.deleteExpenses',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.deleteExpenses').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }
    $(this).closest('.restaurantFixedExpensesContainer').find('.deleteExpensesLoading').removeClass('none').css('visibility','visible');
    $(this).closest('.restaurantFixedExpensesContainer').find('.deleteExpenses').addClass('none');
    let expensesName = $(this).parent().attr('expensesname');
    let expensesAmount = $(this).parent().attr('amount');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteRestaurantExpenses:true,
            expensesName:expensesName,
            expensesAmount:expensesAmount,

        },success:function(response){
            $(this).closest('.restaurantFixedExpensesContainer').find('.deleteExpensesLoading').addClass('none').css('visibility','hidden');
            $(this).closest('.restaurantFixedExpensesContainer').find('.deleteExpenses').removeClass('none');
            if(response.deleteRestaurantExpensesStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.expenses = response.restaurantExpenses;
                drawRestaurantFixedExpenses();
            }else if(response.deleteRestaurantExpensesStatus == 0){
                showAlert('error',response.msg,4000,true);
                drawRestaurantFixedExpenses();
            }
        }
    })

})
//////////////////////////////////////////
drawRestaurantMonthExpenses = function(){
    if(!account.is_master){return;}
    $('#restaurantExpenses-monthExpensesContainer').text('');
    if(website.month_expenses.length > 0){
        $('#restaurantExpenses-noMonthExpenses').addClass('none');
        let monthExpensesTotal = 0;
        for(const key in website.month_expenses){
            let expenses = website.month_expenses[key];
            monthExpensesTotal = monthExpensesTotal + parseFloat(expenses.amount);
            $('#restaurantExpenses-monthExpensesContainer').append(
                $('<div/>',{
                    class:'row alnC jstfyC restaurantMonthExpensesContainer',
                    expensesName:expenses.name,
                    amount:expenses.amount,
                }).append(
                    $('<div/>',{class:'restaurantExpensesContainer'}).append(
                        $('<span/>',{class:'taS',text:expenses.name}),
                        $('<span/>',{class:'taE',text:website.currency+expenses.amount}),
                    ),
                    $('<div/>',{class:'deleteMonthExpenses ico-delete',tooltip:texts.cpanel.public.delete}),
                    $('<div/>',{class:'loading deleteExpensesLoading mX5 none'})

                )
            )
        }
        $('#restaurantExpenses-monthExpensesContainer').append(
            $('<div/>',{
                class:'flexRowNoWrap'
            }).append(
                $('<div/>',{class:'restaurantExpensesContainer'}).append(
                    $('<span/>',{class:'taS bold',text:texts.restaurantExpenses.total}),
                    $('<span/>',{class:'taE bold',text:website.currency+monthExpensesTotal.toFixed(2)}),
                ),
                $('<div/>',{class:'deleteMonthExpenses ico-delete vH',tooltip:texts.cpanel.public.delete}),
            )
        )
    }else{
        $('#restaurantExpenses-noMonthExpenses').removeClass('none');
    }
}
drawRestaurantMonthExpenses();
$('#restaurantExpenses-monthExpenses-addAmount').on('change',function(){
    if($(this).val() == ''){$(this).val(0.00)}
    if($(this).val() == '0'){$(this).val(0.00)}
    $(this).val(parseFloat($(this).val()).toFixed(2));
})
$('#restaurantExpenses-addMonthExpensesBtn').on('click',function(){
    if($('#restaurantExpenses-monthExpenses-AddName').val() == ''){
        showAlert('error',texts.restaurantExpenses.expenseNameRequired,4000,true);
        $('#restaurantExpenses-monthExpenses-AddName').select();
        $('#itidashboard-restaurantExpenses-monthExpenses-AddName').addClass('inputTextError');
        setTimeout(function(){
            $('#itidashboard-restaurantExpenses-monthExpenses-AddName').removeClass('inputTextError');
        },4000)
        return;
    }else if($('#restaurantExpenses-monthExpenses-addAmount').val() == ''){
        showAlert('error',texts.restaurantExpenses.expenseAmountRequired,4000,true);
        $('#restaurantExpenses-monthExpenses-addAmount').select();
        $('#itidashboard-restaurantExpenses-monthExpenses-addAmount').addClass('inputTextError');
        setTimeout(function(){
            $('#itidashboard-restaurantExpenses-monthExpenses-addAmount').removeClass('inputTextError');
        },4000)
        return;
    }else{
        showBtnLoading($('#restaurantExpenses-addMonthExpensesBtn'));
        $.ajax({
            url:'dashboard',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                addRestaurantMonthExpenses:true,
                expensesName:$('#restaurantExpenses-monthExpenses-AddName').val(),
                expensesAmount:$('#restaurantExpenses-monthExpenses-addAmount').val(),
            }
            ,success:function(response){
                hideBtnLoading($('#restaurantExpenses-addMonthExpensesBtn'));
                if(response.addRestaurantMonthExpensesStatus == 0){
                    if(response.errors.expensesName){
                        showAlert('error',response.errors.expensesName[0],4000,true);
                        $('#restaurantExpenses-monthExpenses-AddName').select();
                        $('#itidashboard-restaurantExpenses-monthExpenses-AddName').addClass('inputTextError');
                        setTimeout(function(){
                            $('#itidashboard-restaurantExpenses-monthExpenses-AddName').removeClass('inputTextError');
                        },4000)
                    }else if(response.errors.expensesAmount){
                        showAlert('error',response.errors.expensesAmount[0],4000,true);
                        $('#restaurantExpenses-monthExpenses-addAmount').select();
                        $('#itidashboard-restaurantExpenses-monthExpenses-addAmount').addClass('inputTextError');
                        setTimeout(function(){
                            $('#itidashboard-restaurantExpenses-monthExpenses-addAmount').removeClass('inputTextError');
                        },4000)
                    }
                }else if(response.addRestaurantMonthExpensesStatus == 2){
                    showAlert('error',response.msg,4000,true);
                }else if(response.addRestaurantMonthExpensesStatus == 1){
                    showAlert('success',response.msg,4000,true);
                    website.month_expenses = response.restaurantMonthExpenses;
                    drawRestaurantMonthExpenses();
                    $('#restaurantExpenses-monthExpenses-AddName').val('');
                    $('#restaurantExpenses-monthExpenses-addAmount').val('0.00');
                }
            }
        })
    }
})
$('#restaurantExpenses-monthExpensesContainer').on('click','.deleteMonthExpenses',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.deleteExpenses').attr('tooltip',null).removeClass('confirm-btn');
        $(this).attr('tooltip',texts.cpanel.public.clickToConfirm).addClass('confirm-btn');
            updateToolTip();
            return;
    }else{
        $(this).attr('tooltip',null).removeClass('confirm-btn');
        updateToolTip();
    }

    $(this).closest('.restaurantMonthExpensesContainer').find('.deleteExpensesLoading').removeClass('none').css('visibility','visible');
    $(this).closest('.restaurantMonthExpensesContainer').find('.deleteMonthExpenses').addClass('none');
    let expensesName = $(this).parent().attr('expensesname');
    let expensesAmount = $(this).parent().attr('amount');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteRestaurantMonthExpenses:true,
            expensesName:expensesName,
            expensesAmount:expensesAmount,
        }
        ,success:function(response){
            $(this).closest('.restaurantMonthExpensesContainer').find('.deleteExpensesLoading').addClass('none').css('visibility','hidden');
            $(this).closest('.restaurantMonthExpensesContainer').find('.deleteMonthExpenses').removeClass('none');
            if(response.deleteRestaurantMonthExpensesStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.month_expenses = response.rstaurantMonthExpenses;
                drawRestaurantMonthExpenses();
            }else if(response.deleteRestaurantMonthExpensesStatus == 0){
                showAlert('error',response.msg,4000,true);
                drawRestaurantMonthExpenses();
            }
        }
    })

})
