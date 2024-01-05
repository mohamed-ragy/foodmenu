$('html,body').on('click','#addNewExpenses_current',function(e){
    e.stopImmediatePropagation();
    showPopup('addNewExpenses',function(){
        $('.popupTitle').text(texts.dashboard.addNewExpenses);
        $('.popupBody').text('').append(
            drawInputText('','ico-edit','',texts.dashboard.expensesName,'addNewExpenses_current_name','text',texts.dashboard.expensesName,200,'clearVal','','',false,''),
            drawInputText('','ico-money','',texts.dashboard.expensesAmount,'addNewExpenses_current_amount','number',texts.dashboard.expensesAmount,200,'clearVal','','',false,''),
            $('<div/>',{class:'btnContainer mT20'}).append(
                $('<button/>',{class:'btn btn-cancel mie-10 popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn',id:'addNewExpenses_current_btn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.add}),
                    $('<div/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('html,body').on('click','#addNewExpenses_current_btn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#addNewExpenses_current_btn'))
    showBtnLoading($('#addNewExpenses_current'))
    let name = $('#addNewExpenses_current_name').val();
    let amount = $('#addNewExpenses_current_amount').val();
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            addNewExpenses_current:true,
            name:name,
            amount:amount,
        },success:function(r){
            hideBtnLoading($('#addNewExpenses_current_btn'))
            hideBtnLoading($('#addNewExpenses_current'))
            if(r.addNewExpenses_currentStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.month_expenses.push({
                    id:website.month_expenses.length + 1,
                    name:name,
                    amount:amount
                });
                closePopup();
                draw_current_month_expenses();
            }else if(r.addNewExpenses_currentStatus == 0){
                if(r.errors.name){
                    showAlert('error',r.errors.name[0],4000,true);
                    inputTextError($('#addNewExpenses_current_name'))
                }else if(r.errors.amount){
                    showAlert('error',r.errors.amount[0],4000,true);
                    inputTextError($('#addNewExpenses_current_amount'))
                }
            }else if(r.addNewExpenses_currentStatus == 2){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('html,body').on('click','.delete_current_expense',function(e){
    e.stopImmediatePropagation();
    let expense = website.month_expenses.find(item=>item.id == $(this).attr('expense'))
    showPopup('deleteExpenses',function(){
        $('.popupTitle').text(texts.dashboard.deleteExpenses);
        $('.popupBody').text('').append(
            $('<div/>',{class:'m10',html:texts.dashboard.deleteExpensesConfirm.replace(':expense:',`<b>${expense.name}</b>`)}),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-10',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn btn-delete',id:'delete_current_expense_confirm',expense:expense.id}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                )
            )
        )
    })
})
$('html,body').on('click','#delete_current_expense_confirm',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#delete_current_expense_confirm'))
    let expense_id = $(this).attr('expense');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_expense_current:true,
            expense_id:expense_id,
        },success:function(r){
            hideBtnLoading($('#delete_current_expense_confirm'))
            if(r.delete_expense_currentStatus == 1){
                showAlert('success',r.msg,4000,true);
                closePopup();
                let new_expenses = [];
                let new_expense_id = 0;
                for(const key in website.month_expenses){
                    if(website.month_expenses[key].id != expense_id){
                        new_expense_id++;
                        new_expenses.push({
                            id:new_expense_id,
                            name:website.month_expenses[key].name,
                            amount:website.month_expenses[key].amount,
                        })
                    }
                }
                website.month_expenses = JSON.parse(JSON.stringify(new_expenses));
                draw_current_month_expenses();
            }else if(r.delete_expense_currentStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }

    })
})
