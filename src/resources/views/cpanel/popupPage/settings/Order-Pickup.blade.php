<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="order_pickup_settings" value="{{ trans('cpanel/cpanel.menu.order_pickup_settings')  }}" icon="pickup">
    <x-content-window  title="" titleId="pickup-wokringDayTitle" windowId="Pickup-WorkingDays" helpId="202" windowClass="contentWindow_100p">
        <label class="checkboxlabel_100p"  autoHelp="227">
            <span class="mX5">{{ trans('cpanel/settings/orderPickup.setAsWorkingDay') }}</span>
            <input id="pickup-setAsWorkingDay" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX5"></span>
        </label>

        <div class="area" autoHelp="230">
            <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</span>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/orderPickup.working24Hours') }}</span>
                <input id="pickup-working24" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <div class="timePickerContainer timePickerContainer_100p DayCardWokringStatsAt">
                <span>{{ trans('cpanel/settings/orderPickup.startsAt') }}</span>
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
                <span>{{ trans('cpanel/settings/orderPickup.endsAt') }}</span>
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
                <div class="mX5 fs102">{{ trans('cpanel/settings/orderPickup.copyWorkingHours') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="pickup-copyWorkingHoursDays" listId="pickup-copyWorkingHoursDays-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="pickup-copyWorkingHoursBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="area" autoHelp="233">
            <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}</span>
            <div class="numberPickerContainer_100p">
                <span>{{ trans('cpanel/settings/orderPickup.discount') }}</span>
                <div class="numberPickerControls">
                    <span id="pickup-discountD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue">
                        <span class="mX2" id="pickup-discount"></span>
                        <span class="mX2" >%</span>
                    </span>
                    <span id="pickup-discountU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>
            <div class="timePickerContainer timePickerContainer_100p DayCardDiscountStatsAt">
                <span>{{ trans('cpanel/settings/orderPickup.startsAt') }}</span>
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
                <span>{{ trans('cpanel/settings/orderPickup.endsAt') }}</span>
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
                <div class="mX5 fs102">{{ trans('cpanel/settings/orderPickup.copyScheduledDiscount') }}</div>
                <div class="w100p row wrap alnC jstfyS">
                    <x-input-list id="pickup-copyScheduledDiscount" listId="pickup-copyScheduledDiscount-list" icon="ico-datePicker" />
                    <button class="btn btn-cancel mX10" id="pickup-copyScheduledDiscountBtn">{{ trans('cpanel/cpanel.public.copy') }}</button>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button class="btn btn-cancel serviceDayKeepChanges">{{ trans('cpanel/cpanel.public.keepChanges') }}</button>
        </div>
    </x-content-window>

</div>
