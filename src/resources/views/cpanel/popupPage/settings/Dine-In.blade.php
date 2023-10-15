<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="dine_in_settings" value="{{ trans('cpanel/cpanel.menu.dine_in_settings') }}" icon="dineIn">

    <x-content-window  title="" titleId="dineIn-wokringDayTitle" windowId="DineIn-WorkingDays" helpId="202" windowClass="contentWindow_100p">

        <label class="checkboxlabel_100p" autoHelp="228">
            <span class="mX5">{{ trans('cpanel/settings/dineIn.setAsWorkingDay') }}</span>
            <input id="dineIn-setAsWorkingDay" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX5"></span>
        </label>
        <div class="area" autoHelp="231">
            <span class="areaTitle">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</span>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/dineIn.working24Hours') }}</span>
                <input id="dineIn-working24" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <div class="timePickerContainer timePickerContainer_100p DayCardWokringStatsAt">
                <span>{{ trans('cpanel/settings/dineIn.startsAt') }}</span>
                <div class="timePickerControls">
                    <div class="timePickerControlsHours">
                        <div class="timePickerHU ico-up"></div>
                        <div hour="" class="timePickerH"></div>
                        <div class="timePickerHD ico-down"></div>
                    </div>
                    <div class="fs2">:</div>
                    <div class="timePickerControlsMins">
                        <div class="timePickerMU ico-up"></div>
                        <div mins="" class="timePickerM"></div>
                        <div class="timePickerMD ico-down"></div>
                    </div>
                    <div class="timePickerControlsAMPM">
                        <div class="timePickerAMPMU ico-up"></div>
                        <div class="timePickerAMPM"></div>
                        <div class="timePickerAMPMD ico-down"></div>
                    </div>
                </div>
            </div>
            <div class="timePickerContainer timePickerContainer_100p DayCardWokringEndsAt">
                <span>{{ trans('cpanel/settings/dineIn.endsAt') }}</span>
                <div class="timePickerControls">
                    <div class="timePickerControlsHours">
                        <div class="timePickerHU ico-up"></div>
                        <div hour="" class="timePickerH"></div>
                        <div class="timePickerHD ico-down"></div>
                    </div>
                    <div class="fs2">:</div>
                    <div class="timePickerControlsMins">
                        <div class="timePickerMU ico-up"></div>
                        <div mins="" class="timePickerM"></div>
                        <div class="timePickerMD ico-down"></div>
                    </div>
                    <div class="timePickerControlsAMPM">
                        <div class="timePickerAMPMU ico-up"></div>
                        <div class="timePickerAMPM"></div>
                        <div class="timePickerAMPMD ico-down"></div>
                    </div>
                </div>
            </div>
            <div class="w100p column alnS jstfyS mT20">
                <div class="mX5 fs102">{{ trans('cpanel/settings/dineIn.copyWorkingHours') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="dineIn-copyWorkingHoursDays" listId="dineIn-copyWorkingHoursDays-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="dineIn-copyWorkingHoursBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="area" autoHelp="234">
            <span class="areaTitle">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}</span>
            <div class="numberPickerContainer_100p">
                <span>{{ trans('cpanel/settings/dineIn.discount') }}</span>
                <div class="numberPickerControls">
                    <span id="dineIn-discountD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue">
                        <span class="mX2" id="dineIn-discount"></span>
                        <span class="mX2" >%</span>
                    </span>
                    <span id="dineIn-discountU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>
            <div class="timePickerContainer timePickerContainer_100p DayCardDiscountStatsAt">
                <span>{{ trans('cpanel/settings/dineIn.startsAt') }}</span>
                <div class="timePickerControls">
                    <div class="timePickerControlsHours">
                        <div class="timePickerHU ico-up"></div>
                        <div hour="" class="timePickerH"></div>
                        <div class="timePickerHD ico-down"></div>
                    </div>
                    <div class="fs2">:</div>
                    <div class="timePickerControlsMins">
                        <div class="timePickerMU ico-up"></div>
                        <div mins="" class="timePickerM"></div>
                        <div class="timePickerMD ico-down"></div>
                    </div>
                    <div class="timePickerControlsAMPM">
                        <div class="timePickerAMPMU ico-up"></div>
                        <div class="timePickerAMPM"></div>
                        <div class="timePickerAMPMD ico-down"></div>
                    </div>
                </div>
            </div>
            <div class="timePickerContainer timePickerContainer_100p DayCardDiscountEndsAt">
                <span>{{ trans('cpanel/settings/dineIn.endsAt') }}</span>
                <div class="timePickerControls">
                    <div class="timePickerControlsHours">
                        <div class="timePickerHU ico-up"></div>
                        <div hour="" class="timePickerH"></div>
                        <div class="timePickerHD ico-down"></div>
                    </div>
                    <div class="fs2">:</div>
                    <div class="timePickerControlsMins">
                        <div class="timePickerMU ico-up"></div>
                        <div mins="" class="timePickerM"></div>
                        <div class="timePickerMD ico-down"></div>
                    </div>
                    <div class="timePickerControlsAMPM">
                        <div class="timePickerAMPMU ico-up"></div>
                        <div class="timePickerAMPM"></div>
                        <div class="timePickerAMPMD ico-down"></div>
                    </div>
                </div>
            </div>
            <div class="w100p column alnS jstfyS mT20">
                <div class="mX5 fs102">{{ trans('cpanel/settings/dineIn.copyScheduledDiscount') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="dineIn-copyScheduledDiscount" listId="dineIn-copyScheduledDiscount-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="dineIn-copyScheduledDiscountBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button class="btn btn-cancel serviceDayKeepChanges">{{ trans('cpanel/cpanel.public.keepChanges') }}</button>
        </div>

    </x-content-window>
</div>
