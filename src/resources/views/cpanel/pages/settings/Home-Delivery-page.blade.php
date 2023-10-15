<div class="pageWrapper" id="home_delivery_settings-page">
    <input type="hidden" id="home_delivery_settings-title" value="{{ trans('cpanel/cpanel.menu.home_delivery_settings') }}" icon="deliverySettings" />
    <x-content-window title="{{ trans('cpanel/settings/homeDelivery.deliverSettings') }}" helpId="28" windowClass="contentWindow_100p" noSaveId="delivery-deliverSettingsNoSave">

        <div class="w100p row wrap alnSH jstfyC">

            <div class="area wA grow1 column alnSH" autoHelp="19">
                <span class="areaTitle" id="delivery-deliveryTaxCostTitle">{{ trans('cpanel/settings/homeDelivery.deliveryTaxCost') }}</span>
                <span class="areaTitle" id="delivery-deliveryTaxPercentageTitle">{{ trans('cpanel/settings/homeDelivery.deliveryTaxPercentage') }}</span>

                <div id="delivery-deliveryTaxCostContainer">
                    <x-input-text type="number" containerClass="wA" class="inputText_100p" id="delivery-deliveryTaxCost" icon="ico-money" value="" placeholder="{{ trans('cpanel/settings/homeDelivery.deliveryTaxCost') }}" />
                </div>
                <div id="delivery-deliveryTaxPercentageContainer">
                    <x-input-text type="number" containerClass="wA" class="inputText_100p" id="delivery-deliveryTaxPercentage" icon="ico-percent" value="" placeholder="{{ trans('cpanel/settings/homeDelivery.deliveryTaxPercentage') }}" />
                </div>
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS" >{{ trans('cpanel/settings/homeDelivery.useFixedCost') }}</span>
                    <input id="delivery-useDeliveryTaxCost" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
            </div>

            <div class="area wA grow1 column alnSH" autoHelp="20">
                <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.deliveryCost') }}</span>
                <x-input-text type="number" containerClass="wA" class="inputText_100p" id="delivery-deliveryCost" icon="ico-money" placeholder="{{ trans('cpanel/settings/homeDelivery.deliveryCost') }}" />
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS">{{ trans('cpanel/settings/homeDelivery.DeliveryCanChangeMsg') }}</span>
                    <input id="delivery-showDeliveryCanChangeMsg" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
            </div>

        </div>

        <div class="w100p row wrap alnSH jstfyC">

            <div class="area wA grow1 column alnSH" autoHelp="22">
                <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.deliveryMinimumCharge') }}</span>

                <x-input-text containerClass="wA" class="inputText_100p" type="number" id="delivery-deliveryMinimumCharge" icon="ico-money" placeholder="{{ trans('cpanel/settings/homeDelivery.deliveryMinimumCharge') }}" />

                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS">{{ trans('cpanel/settings/homeDelivery.deliveryMinimumChargeIncludes') }}</span>
                    <input id="delivery-deliveryMinimumChargeIncludes" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
            </div>

            <div class="area wA grow1 column alnSH" autoHelp="198">
                <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.paymentMethod') }}</span>

                <div class="w100p column alnC jstfyC">
                    <div class="paymentMethodCard" id="delivery-cashOnDelivery">
                        <span class="ico-money mX5 fs104"></span>
                        <span class="m5">{{ trans('cpanel/settings/homeDelivery.cashOnDelivery') }}</span>
                        <span class="ico-check0 paymentMethodCheck"></span>
                    </div>
                    <div class="paymentMethodCard" id="delivery-cardOnDelivery">
                        <span class="ico-money mX5 fs104"></span>
                        <span class="m5">{{ trans('cpanel/settings/homeDelivery.cardOnDelivery') }}</span>
                        <span class="ico-check0 paymentMethodCheck"></span>
                    </div>
                </div>
            </div>

            <div class="area wA grow1 column alnSH" autoHelp="24">
                <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.averageDeliveryTime') }}</span>
                <div class="numberPickerControls w100p-20 mX10 mA">
                    <span id="delivery-deliveryTimeD" class="numberPickerArrow ico-left"></span>
                    <span class="numberPickerValue w200">
                        <span class="mX2" id="delivery-deliveryTime" deliveryTime=""></span>
                        <span class="mX2" id="delivery-deliveryTimeText"></span>
                    </span>
                    <span id="delivery-deliveryTimeU" class="numberPickerArrow ico-right"></span>
                </div>
            </div>

        </div>

        <div class="area row wrap alnSH jstfyC"  id="delivery-workingDaysContainer" autoHelp="autoHelp-settings-homeDelivery-workingDays" >
            <span class="areaTitle">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrdersDays') }}</span>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="sunday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.sunday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="monday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.monday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="tuesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.tuesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="wednesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.wednesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="thursday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.thursday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="friday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.friday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="Delivery-WorkingDays" day="saturday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.saturday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.receiveDeliveryOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/homeDelivery.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/homeDelivery.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>

        </div>

        <div class="btnContainer">
            <button id="homeDelivery-deliverSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="homeDelivery-deliverSettingsSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>

    </x-content-window>

</div>
