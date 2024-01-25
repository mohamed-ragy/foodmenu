drawPage_restaurant_expenses = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'monthly_fixed_expenses',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{text:texts.dashboard.fixedExpenses})
                    ),
                    $('<div/>',{tab:'current_month_expenses',class:'pageTab'}).append(
                        $('<span/>',{text:texts.dashboard.monthExpenses})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'monthly_fixed_expenses'}).append(
                $('<div/>',{class:'btnContainer mB40'}).append(
                    $('<button/>',{class:'btn btn-cancel',id:'addNewExpenses_fixed',text:texts.dashboard.addNewExpenses})
                ),
                $('<div/>',{class:'w100p overflowX-A'}).append(
                    $('<table/>',{class:'w100p',id:'monthly_fixed_expenses',autoHelp:'monthly_fixed_expenses'})
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'current_month_expenses'}).append(
                $('<div/>',{class:'btnContainer mB40'}).append(
                    $('<button/>',{class:'btn btn-cancel',id:'addNewExpenses_current',text:texts.dashboard.addNewExpenses})
                ),
                $('<div/>',{class:'w100p overflowX-A'}).append(
                    $('<table/>',{class:'w100p',id:'current_month_expenses',autoHelp:'current_month_variable_expenses'})
                )
            )
        )
    )
    draw_monthly_fixed_expenses();
    draw_current_month_expenses();
}

draw_monthly_fixed_expenses = function(){
    $('#monthly_fixed_expenses').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{text:texts.dashboard.expensesName,class:'fs08 tnw taS vaM w100p'}),
            $('<th/>',{text:texts.dashboard.expensesAmount,class:'fs08 tnw taS vaM'}),
            $('<th/>',{text:'',class:'fs08 tnw taC vaM'}),
        )
    )
    website.expenses.length == 0 ? $('#monthly_fixed_expenses').append($('<div/>',{class:'m10',text:texts.dashboard.noExpenses})) : null ;
    let total = parseFloat(0);
    for(const key in website.expenses){
        let expense = website.expenses[key];
        total = total + parseFloat(expense.amount)
        $('#monthly_fixed_expenses').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{text:expense.name,class:'fs09 tnw taS vaM w100p'}),
                $('<td/>',{text:bigFloat(expense.amount),class:'fs09 tnw taS vaM'}),
                $('<td/>',{text:'',class:' tnw taC vaM'}).append(
                    $('<button/>',{class:'btn_table ico-delete delete_fixed_expense',expense:expense.id,tooltip:texts.cpanel.public.delete})
                ),
            )
        )
    }
    if(website.expenses.length > 0){
        $('#monthly_fixed_expenses').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{text:texts.dashboard.total,class:'brdrT1_w3 bold fs09 tnw taS vaM w100p'}),
                $('<td/>',{text:`${website.currency}${bigFloat(total)}`,class:'brdrT1_w3 bold fs09 tnw taS vaM'}),
            )
        )
    }

}
draw_current_month_expenses = function(){
    $('#current_month_expenses').text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{text:texts.dashboard.expensesName,class:'fs08 tnw taS vaM w100p'}),
            $('<th/>',{text:texts.dashboard.expensesAmount,class:'fs08 tnw taS vaM'}),
            $('<th/>',{text:'',class:'fs08 tnw taC vaM'}),
        )
    )
    website.month_expenses.length == 0 ? $('#current_month_expenses').append($('<div/>',{class:'m10',text:texts.dashboard.noExpenses})) : null ;
    let total = parseFloat(0);
    for(const key in website.month_expenses){
        let expense = website.month_expenses[key];
        total = total + parseFloat(expense.amount)
        $('#current_month_expenses').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{text:expense.name,class:'fs09 tnw taS vaM w100p'}),
                $('<td/>',{text:bigFloat(expense.amount),class:'fs09 tnw taS vaM'}),
                $('<td/>',{text:'',class:' tnw taC vaM'}).append(
                    $('<button/>',{class:'btn_table ico-delete delete_current_expense',expense:expense.id,tooltip:texts.cpanel.public.delete})
                ),
            )
        )
    }
    if(website.month_expenses.length > 0 ){
        $('#current_month_expenses').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{text:texts.dashboard.total,class:'brdrT1_w3 bold fs09 tnw taS vaM w100p'}),
                $('<td/>',{text:`${website.currency}${bigFloat(total)}`,class:'brdrT1_w3 bold fs09 tnw taS vaM'}),
            )
        )
    }

}

//
