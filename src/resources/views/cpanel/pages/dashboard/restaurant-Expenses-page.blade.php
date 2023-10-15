<div id="restaurant_expenses-page" class="pageWrapper">
    <input type="hidden" id="restaurant_expenses-title" value="{{ trans('cpanel/cpanel.menu.restaurant_expenses') }}" icon="expenses">

    <div class="w100p row wrap alnSH jstfyS">
        <x-content-window title="{{ trans('cpanel/dashboard/restaurantExpenses.fixedExpenses') }}" helpId="190" windowClass="grow2" contentClass="">
            <div class="area" autoHelp="192">
                <span class="areaTitle">{{ trans('cpanel/dashboard/restaurantExpenses.addNewExpenses') }}</span>
                <x-input-text id="restaurantExpenses-fixedExpenses-AddName" title="{{ trans('cpanel/dashboard/restaurantExpenses.expensesName') }}" placeholder="{{ trans('cpanel/dashboard/restaurantExpenses.expensesName') }}" icon="ico-edit" />
                <x-input-text type="number" value="0.00" id="restaurantExpenses-fixedExpenses-addAmount" title="{{ trans('cpanel/dashboard/restaurantExpenses.expensesAmount') }}" placeholder="{{ trans('cpanel/dashboard/restaurantExpenses.expensesAmount') }}" icon="ico-money" />
                <div class="btnContainer">
                    <button class="btn" id="restaurantExpenses-addFixedExpensesBtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.add') }}</div>
                    </button>
                </div>
            </div>
            <div class="area" autoHelp="193">
                <span class="areaTitle">{{ trans('cpanel/dashboard/restaurantExpenses.fixedExpensesList') }}</span>
                <span id="restaurantExpenses-noFixedExpenses"class="m10">{{ trans('cpanel/dashboard/restaurantExpenses.noExpenses') }}</span>
                <div id="restaurantExpenses-fixedExpensesContainer" class="w100p"></div>
            </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/dashboard/restaurantExpenses.monthExpenses') }}" helpId="191" windowClass="grow2" contentClass="">
            <div class="area" autoHelp="192">
                <span class="areaTitle">{{ trans('cpanel/dashboard/restaurantExpenses.addNewExpenses') }}</span>
                <x-input-text id="restaurantExpenses-monthExpenses-AddName" title="{{ trans('cpanel/dashboard/restaurantExpenses.expensesName') }}" placeholder="{{ trans('cpanel/dashboard/restaurantExpenses.expensesName') }}" icon="ico-edit" />
                <x-input-text type="number" value="0.00" id="restaurantExpenses-monthExpenses-addAmount" title="{{ trans('cpanel/dashboard/restaurantExpenses.expensesAmount') }}" placeholder="{{ trans('cpanel/dashboard/restaurantExpenses.expensesAmount') }}" icon="ico-money" />
                <div class="btnContainer">
                    <button class="btn" id="restaurantExpenses-addMonthExpensesBtn">
                        <div class="btnLoading"></div>
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.add') }}</div>
                    </button>
                </div>
            </div>
            <div class="area" autoHelp="194">
                <span class="areaTitle">{{ trans('cpanel/dashboard/restaurantExpenses.monthExpensesList') }}</span>
                <span id="restaurantExpenses-noMonthExpenses" class="m10">{{ trans('cpanel/dashboard/restaurantExpenses.noExpenses') }}</span>
                <div id="restaurantExpenses-monthExpensesContainer" class="w100p"></div>
            </div>

        </x-content-window>
    </div>


</div>
