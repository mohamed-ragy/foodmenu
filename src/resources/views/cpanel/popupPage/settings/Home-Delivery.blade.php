<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle" cpPage="home_delivery_settings" value="{{ trans('cpanel/cpanel.menu.home_delivery_settings') }}" icon="delivery">

    <x-content-window title="" titleId="delivery-wokringDayTitle" windowId="Delivery-WorkingDays" helpId="202" windowClass="contentWindow_100p">
        <label class="checkboxlabel_100p" autoHelp="226">
            <span class="mX5">{{ trans('cpanel/settings/homeDelivery.setAsWorkingDay') }}</span>
            <input id="delivery-setAsWorkingDay" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX5"></span>
        </label>

        <div class="area" autoHelp="229">
            <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</span>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/homeDelivery.working24Hours') }}</span>
                <input id="delivery-working24" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <div class="timePickerContainer timePickerContainer_100p DayCardWokringStatsAt">
                <span>{{ trans('cpanel/settings/homeDelivery.startsAt') }}</span>
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
                <span>{{ trans('cpanel/settings/homeDelivery.endsAt') }}</span>
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
                <div class="mX5 fs102">{{ trans('cpanel/settings/homeDelivery.copyWorkingHours') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="delivery-copyWorkingHoursDays" listId="delivery-copyWorkingHoursDays-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="delivery-copyWorkingHoursBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="area" autoHelp="232">
            <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}</span>
            <div class="numberPickerContainer_100p">
                <span>{{ trans('cpanel/settings/homeDelivery.discount') }}</span>
                <div class="numberPickerControls">
                    <span id="delivery-discountD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue">
                        <span class="mX2" id="delivery-discount"></span>
                        <span class="mX2" >%</span>
                    </span>
                    <span id="delivery-discountU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>
            <div class="timePickerContainer timePickerContainer_100p DayCardDiscountStatsAt">
                <span>{{ trans('cpanel/settings/homeDelivery.startsAt') }}</span>
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
                <span>{{ trans('cpanel/settings/homeDelivery.endsAt') }}</span>
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
                <div class="mX5 fs102">{{ trans('cpanel/settings/homeDelivery.copyScheduledDiscount') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="delivery-copyScheduledDiscount" listId="delivery-copyScheduledDiscount-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="delivery-copyScheduledDiscountBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button class="btn btn-cancel serviceDayKeepChanges">{{ trans('cpanel/cpanel.public.keepChanges') }}</button>
        </div>
    </x-content-window>

</div>
