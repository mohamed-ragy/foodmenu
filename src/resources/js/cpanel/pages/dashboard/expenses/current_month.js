$('body').on('click','#addNewExpenses_fixed',function(e){
    showPopup('addNewExpenses',function(){
        $('.popupTitle').text(texts.dashboard.addNewExpenses);
        $('.popupBody').text('').append(
            drawInputText('','ico-edit','',texts.dashboard.expensesName,'addNewExpenses_fixed_name','text',texts.dashboard.expensesName,200,'clearVal','','',false,''),
            drawInputText('','ico-money','',texts.dashboard.expensesAmount,'addNewExpenses_fixed_amount','number',texts.dashboard.expensesAmount,200,'clearVal','','',false,''),
            $('<div/>',{class:'btnContainer mT20'}).append(
                $('<button/>',{class:'btn btn-cancel mie-10 popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn',id:'addNewExpenses_fixed_btn'}).append(
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.add}),
                    $('<div/>',{class:'btnLoading'})
                )
            )
        )
    })
})
$('body').on('click','#addNewExpenses_fixed_btn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#addNewExpenses_fixed_btn'))
    showBtnLoading($('#addNewExpenses_fixed'))
    let name = $('#addNewExpenses_fixed_name').val();
    let amount = $('#addNewExpenses_fixed_amount').val();
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            addNewExpenses_fixed:true,
            name:name,
            amount:amount,
        },success:function(r){
            hideBtnLoading($('#addNewExpenses_fixed_btn'))
            hideBtnLoading($('#addNewExpenses_fixed'))
            if(r.addNewExpenses_fixedStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.expenses.push({
                    id:website.expenses.length + 1,
                    name:name,
                    amount:amount
                });
                closePopup();
                draw_monthly_fixed_expenses();
            }else if(r.addNewExpenses_fixedStatus == 0){
                if(r.errors.name){
                    showAlert('error',r.errors.name[0],4000,true);
                    inputTextError($('#addNewExpenses_fixed_name'))
                }else if(r.errors.amount){
                    showAlert('error',r.errors.amount[0],4000,true);
                    inputTextError($('#addNewExpenses_fixed_amount'))
                }
            }else if(r.addNewExpenses_fixedStatus == 2){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('body').on('click','.delete_fixed_expense',function(e){
    let expense = website.expenses.find(item=>item.id == $(this).attr('expense'))
    showPopup('deleteExpenses',function(){
        $('.popupTitle').text(texts.dashboard.deleteExpenses);
        $('.popupBody').text('').append(
            $('<div/>',{class:'m10',html:texts.dashboard.deleteExpensesConfirm.replace(':expense:',`<b>${expense.name}</b>`)}),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-10',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn btn-delete',id:'delete_fixed_expense_confirm',expense:expense.id}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                )
            )
        )
    })
})
$('body').on('click','#delete_fixed_expense_confirm',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#delete_fixed_expense_confirm'))
    let expense_id = $(this).attr('expense');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_expense_fixed:true,
            expense_id:expense_id,
        },success:function(r){
            hideBtnLoading($('#delete_fixed_expense_confirm'))
            if(r.delete_expense_fixedStatus == 1){
                showAlert('success',r.msg,4000,true);
                closePopup();
                let new_expenses = [];
                let new_expense_id = 0;
                for(const key in website.expenses){
                    if(website.expenses[key].id != expense_id){
                        new_expense_id++;
                        new_expenses.push({
                            id:new_expense_id,
                            name:website.expenses[key].name,
                            amount:website.expenses[key].amount,
                        })
                    }
                }
                website.expenses = JSON.parse(JSON.stringify(new_expenses));
                draw_monthly_fixed_expenses();
            }else if(r.delete_expense_fixedStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }

    })
})
