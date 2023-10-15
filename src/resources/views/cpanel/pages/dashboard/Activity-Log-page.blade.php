<div class="pageWrapper" id="activity_log-page">
    <input type="hidden" id="activity_log-title" value="{{ trans('cpanel/cpanel.menu.activity_log') }}" icon="activity_log">

    <x-content-window title="{{ trans('cpanel/dashboard/activityLog.activityLog') }}" helpId="197" windowClass="contentWindow_100p">

        <div class="area">
            <span class="areaTitle">{{ trans('cpanel/dashboard/activityLog.selectDay') }}</span>
            <div class="datePickerSelectedDateContainer wFC" datePickerContainer="datePicker-activityLog">
                <span class="ico-datePicker datePickerSelectedDateIcon"></span>
                <span class="datePickerSelectedDate"></span>
                <span class="ico-down mX10"></span>
            </div>
            <div class="datePickerContainer" id="datePicker-activityLog" todayActive="1" selectPeriod="month" selectBy="day">
                 <div class="datePickerMonthContainer">
                    <span  class="ico-left datePickerPrevMonthBtn fs103" datePickerContainer="datePicker-activityLog" ></span>
                    <span class="datePickerMonthNameContainer" month="" year="">
                        <span class="datePickerMonth fs103 mie-3" month=""></span>
                        <span class="datePickerYear fs102 mT10" year=""></span>
                    </span>
                    <span class="ico-right datePickerNextMonthBtn fs103" datePickerContainer="datePicker-activityLog" ></span>
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
                <button class="btn mX10 mY20 "  id="activityLog-datePicker-findBtn">
                    <div class="btnTxt">{{ trans('cpanel/dashboard/activityLog.findBtn') }}</div>
                    <div class="btnLoading"></div>
                </button>
            </div>

        </div>

        <span id="activityLog-noActivities" class="none m20">{{ trans('cpanel/dashboard/activityLog.noActivities') }}</span>
        <div id="activityLog-activityLogContainer" class="w100p"></div>
        <div id="activityLog-activityLogContainer_loading" class="w100p none">
            <div class="activityContainer_loading">
                <div class="cardLoading w30 h30 m10 br5"></div>
                <div class="cardLoading w80p mxw400 h8 br3"></div>
            </div>
            <div class="activityContainer_loading">
                <div class="cardLoading w30 h30 m10 br5"></div>
                <div class="cardLoading w80p mxw400 h8 br3"></div>
            </div>
            <div class="activityContainer_loading">
                <div class="cardLoading w30 h30 m10 br5"></div>
                <div class="cardLoading w80p mxw400 h8 br3"></div>
            </div>
            <div class="activityContainer_loading">
                <div class="cardLoading w30 h30 m10 br5"></div>
                <div class="cardLoading w80p mxw400 h8 br3"></div>
            </div>
        </div>

    </x-content-window>

</div>
