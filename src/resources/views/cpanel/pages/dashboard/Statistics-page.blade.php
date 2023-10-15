<div class="pageWrapper" id="statistics_and_analytics-page">
    <input type="hidden"  id="statistics_and_analytics-title" value="{{ trans('cpanel/cpanel.menu.statistics_and_analytics') }}" icon="statistics_and_analytics">
    <x-content-window title="{{ trans('cpanel/dashboard/statistics.statisticsPeriod') }}" helpId="" windowClass="contentWindow_100p">

        <div class="row wrap alnC jstfyS mX15 mT20 fs101">
            <div class="statisticsPeriodTypeCard mie-40 pointer" period="day">
                <span class="statisticsPeriodTypeCardCheck ico-check1"></span>
                <span class="mX2">{{ trans('cpanel/dashboard/statistics.aDay') }}</span>
            </div>
            <div class="statisticsPeriodTypeCard mie-40 pointer" period="month">
                <span class="statisticsPeriodTypeCardCheck ico-check0"></span>
                <span class="mX2">{{ trans('cpanel/dashboard/statistics.aMonth') }}</span>
            </div>
            <div class="statisticsPeriodTypeCard mie-40 pointer" period="year">
                <span class="statisticsPeriodTypeCardCheck ico-check0"></span>
                <span class="mX2">{{ trans('cpanel/dashboard/statistics.aYear') }}</span>
            </div>
        </div>

        <div class="row wrap alnC jstfyS mY10">
            <div class="datePickerSelectedDateContainer" datePickerContainer="datePicker-statistics">
                <span class="ico-datePicker datePickerSelectedDateIcon"></span><span class="datePickerSelectedDate"></span><span class="ico-down mX10"></span>
            </div>
            <div id="statisticsCompareCheckBox" class="pointer fs101">
                <span class="statisticsCompareCheck ico-check0"></span>
                <span class="mX2">{{ trans('cpanel/dashboard/statistics.compare') }}</span>
            </div>
        </div>
        <div class="wFC">
            <div class="datePickerSelectedDateContainer none" datePickerContainer="datePicker-statistics2">
                <span class="ico-datePicker datePickerSelectedDateIcon"></span><span class="datePickerSelectedDate"></span><span class="ico-down mX10"></span>
            </div>
        </div>

        <div class="datePickerContainer" id="datePicker-statistics" todayActive="0" selectPeriod="month"  selectBy="day">
            <div class="datePickerMonthContainer">
                <span class="ico-left datePickerPrevMonthBtn fs103" datePickerContainer="datePicker-statistics" ></span>
                <span class="datePickerMonthNameContainer" month="" year="">
                    <span class="datePickerMonth fs103 mie-3" month=""></span>
                    <span class="datePickerYear fs102 mT10" year=""></span>
                </span>
                <span class="ico-right datePickerNextMonthBtn fs103" datePickerContainer="datePicker-statistics" ></span>
            </div>
            <div class="datePickerDaysContainer">
                <div class="datePickerWeekDaysNames">
                    <span class="datePickerDayName">Su</span>
                    <span class="datePickerDayName">Mo</span>
                    <span class="datePickerDayName">Tu</span>
                    <span class="datePickerDayName">We</span>
                    <span class="datePickerDayName">Th</span>
                    <span class="datePickerDayName">Fr</span>
                    <span class="datePickerDayName">Sa</span>
                </div>
                <div class="datePickerWeekDays">
                    <span class="datePickerDay" dayNum="1"></span>
                    <span class="datePickerDay" dayNum="2"></span>
                    <span class="datePickerDay" dayNum="3"></span>
                    <span class="datePickerDay" dayNum="4"></span>
                    <span class="datePickerDay" dayNum="5"></span>
                    <span class="datePickerDay" dayNum="6"></span>
                    <span class="datePickerDay" dayNum="7"></span>
                    <span class="datePickerDay" dayNum="8"></span>
                    <span class="datePickerDay" dayNum="9"></span>
                    <span class="datePickerDay" dayNum="10"></span>
                    <span class="datePickerDay" dayNum="11"></span>
                    <span class="datePickerDay" dayNum="12"></span>
                    <span class="datePickerDay" dayNum="13"></span>
                    <span class="datePickerDay" dayNum="14"></span>
                    <span class="datePickerDay" dayNum="15"></span>
                    <span class="datePickerDay" dayNum="16"></span>
                    <span class="datePickerDay" dayNum="17"></span>
                    <span class="datePickerDay" dayNum="18"></span>
                    <span class="datePickerDay" dayNum="19"></span>
                    <span class="datePickerDay" dayNum="20"></span>
                    <span class="datePickerDay" dayNum="21"></span>
                    <span class="datePickerDay" dayNum="22"></span>
                    <span class="datePickerDay" dayNum="23"></span>
                    <span class="datePickerDay" dayNum="24"></span>
                    <span class="datePickerDay" dayNum="25"></span>
                    <span class="datePickerDay" dayNum="26"></span>
                    <span class="datePickerDay" dayNum="27"></span>
                    <span class="datePickerDay" dayNum="28"></span>
                    <span class="datePickerDay" dayNum="29"></span>
                    <span class="datePickerDay" dayNum="30"></span>
                    <span class="datePickerDay" dayNum="31"></span>
                    <span class="datePickerDay" dayNum="32"></span>
                    <span class="datePickerDay" dayNum="33"></span>
                    <span class="datePickerDay" dayNum="34"></span>
                    <span class="datePickerDay" dayNum="35"></span>
                    <span class="datePickerDay" dayNum="36"></span>
                    <span class="datePickerDay" dayNum="37"></span>
                    <span class="datePickerDay" dayNum="38"></span>
                    <span class="datePickerDay" dayNum="39"></span>
                    <span class="datePickerDay" dayNum="40"></span>
                    <span class="datePickerDay" dayNum="41"></span>
                    <span class="datePickerDay" dayNum="42"></span>
                </div>
            </div>
        </div>
        <div class="datePickerContainer" id="datePicker-statistics2" todayActive="0" selectPeriod="month"  selectBy="day">
            <div class="datePickerMonthContainer">
                <span class="ico-left datePickerPrevMonthBtn fs103" datePickerContainer="datePicker-statistics2" ></span>
                <span class="datePickerMonthNameContainer" month="" year="">
                    <span class="datePickerMonth fs103 mie-3" month=""></span>
                    <span class="datePickerYear fs102 mT10" year=""></span>
                </span>
                <span class="ico-right datePickerNextMonthBtn fs103" datePickerContainer="datePicker-statistics2" ></span>
            </div>
            <div class="datePickerDaysContainer">
                <div class="datePickerWeekDaysNames">
                    <span class="datePickerDayName">Su</span>
                    <span class="datePickerDayName">Mo</span>
                    <span class="datePickerDayName">Tu</span>
                    <span class="datePickerDayName">We</span>
                    <span class="datePickerDayName">Th</span>
                    <span class="datePickerDayName">Fr</span>
                    <span class="datePickerDayName">Sa</span>
                </div>
                <div class="datePickerWeekDays">
                    <span class="datePickerDay" dayNum="1"></span>
                    <span class="datePickerDay" dayNum="2"></span>
                    <span class="datePickerDay" dayNum="3"></span>
                    <span class="datePickerDay" dayNum="4"></span>
                    <span class="datePickerDay" dayNum="5"></span>
                    <span class="datePickerDay" dayNum="6"></span>
                    <span class="datePickerDay" dayNum="7"></span>
                    <span class="datePickerDay" dayNum="8"></span>
                    <span class="datePickerDay" dayNum="9"></span>
                    <span class="datePickerDay" dayNum="10"></span>
                    <span class="datePickerDay" dayNum="11"></span>
                    <span class="datePickerDay" dayNum="12"></span>
                    <span class="datePickerDay" dayNum="13"></span>
                    <span class="datePickerDay" dayNum="14"></span>
                    <span class="datePickerDay" dayNum="15"></span>
                    <span class="datePickerDay" dayNum="16"></span>
                    <span class="datePickerDay" dayNum="17"></span>
                    <span class="datePickerDay" dayNum="18"></span>
                    <span class="datePickerDay" dayNum="19"></span>
                    <span class="datePickerDay" dayNum="20"></span>
                    <span class="datePickerDay" dayNum="21"></span>
                    <span class="datePickerDay" dayNum="22"></span>
                    <span class="datePickerDay" dayNum="23"></span>
                    <span class="datePickerDay" dayNum="24"></span>
                    <span class="datePickerDay" dayNum="25"></span>
                    <span class="datePickerDay" dayNum="26"></span>
                    <span class="datePickerDay" dayNum="27"></span>
                    <span class="datePickerDay" dayNum="28"></span>
                    <span class="datePickerDay" dayNum="29"></span>
                    <span class="datePickerDay" dayNum="30"></span>
                    <span class="datePickerDay" dayNum="31"></span>
                    <span class="datePickerDay" dayNum="32"></span>
                    <span class="datePickerDay" dayNum="33"></span>
                    <span class="datePickerDay" dayNum="34"></span>
                    <span class="datePickerDay" dayNum="35"></span>
                    <span class="datePickerDay" dayNum="36"></span>
                    <span class="datePickerDay" dayNum="37"></span>
                    <span class="datePickerDay" dayNum="38"></span>
                    <span class="datePickerDay" dayNum="39"></span>
                    <span class="datePickerDay" dayNum="40"></span>
                    <span class="datePickerDay" dayNum="41"></span>
                    <span class="datePickerDay" dayNum="42"></span>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button class="btn" id="statistics-loadStatisticsBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.find') }}</div>
            </button>
        </div>
    </x-content-window>
    <x-content-window title="" windowClass="contentWindow_100p none" windowId="StatisticsWindowContainer" >
        <div id="StatisticsWindowDate" class="mB10 wFC fs105 fs1-1024 w100p-40 mX20 taE"></div>
        <div class="row w100p mY20 brdrB1">
            <div statisticsTab="overview" class="statisticsTabElem statisticsTabElem_selected">
                <span class="ico-statistics_and_analytics mie-3"></span>
                <span class="none-420">{{ trans('cpanel/dashboard/statistics.overview') }}</span>
            </div>
            <div statisticsTab="orders" class="statisticsTabElem">
                <span class="ico-orders mie-3"></span>
                <span class="none-420">{{ trans('cpanel/dashboard/statistics.orders') }}</span>
            </div>
            <div statisticsTab="products" class="statisticsTabElem">
                <span class="ico-products mie-3"></span>
                <span class="none-420">{{ trans('cpanel/dashboard/statistics.products') }}</span>
            </div>
            <div statisticsTab="users" class="statisticsTabElem">
                <span class="ico-users mie-3"></span>
                <span class="none-420">{{ trans('cpanel/dashboard/statistics.users') }}</span>
            </div>
            <div statisticsTab="deliveries" class="statisticsTabElem">
                <span class="ico-delivery_accounts mie-3"></span>
                <span class="none-420">{{ trans('cpanel/dashboard/statistics.deliveries') }}</span>
            </div>
        </div>
        <div class="statisticsContainer w100p" statisticsTab="overview"></div>
        <div class="statisticsContainer w100p none" statisticsTab="orders"></div>
        <div class="statisticsContainer w100p none" statisticsTab="products"></div>
        <div class="statisticsContainer w100p none" statisticsTab="users"></div>
        <div class="statisticsContainer w100p none" statisticsTab="deliveries"></div>
    </x-content-window>
</div>
