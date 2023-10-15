<div class="pageWrapper" id="order_pickup_settings-page">
    <input type="hidden" id="order_pickup_settings-title" value="{{ trans('cpanel/cpanel.menu.order_pickup_settings') }}" icon="pickupSettings"/>
    <x-content-window title="{{ trans('cpanel/settings/orderPickup.pickupSettings') }}" helpId="27" windowClass="contentWindow_100p" noSaveId="orderPickup-settingsNoSave">

        <div class="w100p row wrap alnSH jstfyC">

            <div class="area wA grow1 column alnSH" autoHelp="18">
                <span class="areaTitle" id="orderPickup-pickupTaxCostTitle">{{ trans('cpanel/settings/orderPickup.pickupTaxCost') }}</span>
                <span class="areaTitle" id="orderPickup-pickupTaxPercentageTitle">{{ trans('cpanel/settings/orderPickup.pickupTaxPercentage') }}</span>

                <div id="orderPickup-pickupTaxPercentageContainer">
                    <x-input-text type="number" containerClass="wA" class="inputText_100p" id="orderPickup-pickupTaxPercentage" icon="ico-percent" value="" placeholder="{{ trans('cpanel/settings/orderPickup.pickupTaxPercentage') }}" />
                </div>
                <div id="orderPickup-pickupTaxCostContainer">
                    <x-input-text type="number" containerClass="wA" class="inputText_100p" id="orderPickup-pickupTaxCost" icon="ico-money" value="" placeholder="{{ trans('cpanel/settings/orderPickup.pickupTaxCost') }}" />
                </div>
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS">{{ trans('cpanel/settings/orderPickup.useFixedCost') }}</span>
                    <input id="orderPickup-usePickupTaxCost" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
            </div>

            <div class="area wA grow1 column alnSH" autoHelp="21">
                <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.pickupMinimumCharge') }}</span>

                <x-input-text type="number" containerClass="wA" class="inputText_100p" id="orderPickup-pickupMinimumCharge" icon="ico-money" value="" placeholder="{{ trans('cpanel/settings/orderPickup.pickupMinimumCharge') }}" />
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS">{{ trans('cpanel/settings/orderPickup.pickupMinimumChargeIncludes') }}</span>
                    <input id="orderPickup-pickupMinimumChargeIncludes" type="checkbox" class="checkbox" name="checkbox">
                    <span  class="mX5"></span>
                </label>
            </div>

        </div>

        <div class="w100p row wrap alnSH jstfyC">

            <div class="area wA grow1 column alnSH" autoHelp="199">
                <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.paymentMethod') }}</span>
                <div class="w100p column alnC jstfyC">
                    <div class="paymentMethodCard" id="orderPickup-cashOnPickup">
                        <span class="ico-money mX5 fs104"></span>
                        <span class="m5">{{ trans('cpanel/settings/orderPickup.cashOnPickup') }}</span>
                        <span class="ico-check0 paymentMethodCheck"></span>
                    </div>
                    <div class="paymentMethodCard" id="orderPickup-cardOnPickup">
                        <span class="ico-card mX5 fs104"></span>
                        <span class="m5">{{ trans('cpanel/settings/orderPickup.cardOnPickup') }}</span>
                        <span class="ico-check0 paymentMethodCheck"></span>
                    </div>
                </div>
            </div>

            <div class="area wA grow1 column alnSH"  autoHelp="23">
                <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.averagePickupTime') }}</span>
                <div class="numberPickerControls w100p-20 mX10 mA">
                    <span id="orderPickup-pickupTimeD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue w200">
                        <span class="mX2" id="orderPickup-pickupTime" pickupTime=""></span>
                        <span class="mX2" id="orderPickup-pickupTimeText"></span>
                    </span>
                    <span id="orderPickup-pickupTimeU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>

        </div>


        <div class="area row wrap alnSH jstfyC"  id="pickup-workingDaysContainer" autoHelp="26" >
            <span class="areaTitle">{{ trans('cpanel/settings/orderPickup.receivePickupOrdersDays') }}</span>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="sunday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.sunday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="monday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.monday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="tuesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.tuesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="wednesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.wednesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="thursday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.thursday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="friday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.friday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Pickup-WorkingDays" day="saturday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.saturday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.receivePickupOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/orderPickup.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/orderPickup.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>

        </div>

        <div class="btnContainer">
            <button id="orderPickup-pickupSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="orderPickup-pickupSettingsSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>

    </x-content-window>
</div>
