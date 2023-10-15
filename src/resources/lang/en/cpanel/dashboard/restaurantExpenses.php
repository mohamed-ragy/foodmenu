<?php
return [

    ////////////////////tools////////////////
    'title' => 'Restaurant Expenses',
    'fixedExpenses' => 'Monthly Fixed Expenses',
    'monthExpenses' => 'Current Month Variable Expenses',
    'addNewExpenses' => 'Add New Expenses',
    'expensesName' => 'Expense name',
    'expensesAmount' => 'Expense Amount',
    'fixedExpensesList' => 'Fixed Expenses List',
    'monthExpensesList' => 'Current Month Expenses List',
    'noExpenses' => 'You havn\'t added any expenses yet.',
    'total' => 'Total',
    ///////////////////responses///////////////
    'expenseNameRequired' => 'Please enter an expense name.',
    'expenseAmountRequired' => 'Please enter the amount of the expense.',
    'expensesNameMax' => 'The expense name can\'t be more than 20 characters.',
    'expenseAmountMax' => 'The expense amount can\'t be more than 20 characters.',
    'addExpensesaddes' => 'The expense has been added successfully.',
    'addExpensesaddesFail' => 'Unknown Error Occurred! Failed to add the expense.',
    'expensesDeleted' => 'The expense has been deleted successfully.',
    'expensesDeleteFail' => 'Unknown Error Occurred! Failed to delete the expense.',
    //////////////autoHelp/////////////////////
    'autoHelp-fixedExpensesWindow' => 'Monthly Fixed Expenses Window',
    'autoHelp-fixedExpensesWindow-1' => '- In this window, you can add your restaurant\'s monthly fixed expenses, which are the types of expenses you pay every month on a regular basis, such as salaries.',
    'autoHelp-fixedExpensesWindow-2' => '- These expenses you enter are used in generating your monthly financial reports. You can enter these fixed expenses manually using the provided input boxes, and they will recur each month on your financial reports until you remove them.',

    'autoHelp-monthExpensesWindow' => 'Current Month Variable Expenses Window',
    'autoHelp-monthExpensesWindow-1' => '- In this window, you can add the variable expenses for the current month. These types of expenses vary from one month to another, which is why you have to enter your variable expenses each month, such as food ingredients, which vary from one month to another depending on the number of orders you have completed.',
    'autoHelp-monthExpensesWindow-2' => '- Variable expenses can be entered at any time during the month and are used to generate financial reports at the end of each month. The system removes these expenses from the list at the start of each month. However, you can review these expenses in the monthly financial reports whenever you need them.',

    'autoHelp-addExpenses' => 'Add New Expenses',
    'autoHelp-addExpenses-1' => '- In this area, you can add your fixed expenses to the list by entering the expense name and amount. Then, click on the <b>Add</b> button.',

    'autoHelp-fixedExpensesList' => 'Fixed Expenses List',
    'autoHelp-fixedExpensesList-1' => '- In this area, you will find all fixed expenses added to the list with their total amount.',
    'autoHelp-fixedExpensesList-2' => '- Next to each item in the list, you will find the icon <span class="ico-delete"></span> to remove this item from the list.',

    'autoHelp-monthExpensesList' => 'Current Month Expenses List',
    'autoHelp-monthExpensesList-1' => '- In this area, you will find a list of all the variable expenses for the current month, along with their total amount.',
    'autoHelp-monthExpensesList-2' => '- Next to each item in the list, you will find the icon <span class="ico-delete"></span> to remove this item from the list.',
];
