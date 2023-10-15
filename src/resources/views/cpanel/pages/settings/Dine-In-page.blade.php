<div class="pageWrapper" id="dine_in_settings-page">
    <input type="hidden" id="dine_in_settings-title" value="{{ trans('cpanel/cpanel.menu.dine_in_settings') }}" icon="dineinSettings" />
    <x-content-window title="{{ trans('cpanel/settings/dineIn.dineInSettings') }}" windowClass="contentWindow_100p" helpId="15" noSaveId="dineIn-settingsNoSave">

        <div class="w100p row wrap alnSH jstfyC">
            <div class="area wA grow1 column alnSH" autoHelp="14">
                <span class="areaTitle" id="dineIn-taxCostTitle">{{ trans('cpanel/settings/dineIn.dineInTaxCost') }}</span>
                <span class="areaTitle" id="dineIn-taxPercentageTitle">{{ trans('cpanel/settings/dineIn.dineInTaxPercentage') }}</span>
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS" >{{ trans('cpanel/settings/dineIn.useFixedCost') }}</span>
                    <input id="dineIn-useDineInTaxCost" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <div id="dineIn-taxPercentageContainer">
                    <x-input-text containerClass="wA" class="inputText_100p" type="number" id="dineIn-dineInTaxPercentage" icon="ico-percent" value="" placeholder="{{ trans('cpanel/settings/dineIn.dineInTaxPercentage') }}" />
                </div>
                <div id="dineIn-taxCostContainer">
                    <x-input-text containerClass="wA" class="inputText_100p" type="number" id="dineIn-dineInTaxCost" icon="ico-money" value="" placeholder="{{ trans('cpanel/settings/dineIn.dineInTaxCost') }}" />
                </div>
            </div>
            <div class="area wA grow1 column alnSH" autoHelp="13">
                <span class="areaTitle" id="dineIn-serviceCostTitle">{{ trans('cpanel/settings/dineIn.dineInServiceCost') }}</span>
                <span class="areaTitle" id="dineIn-servicePercentageTitle">{{ trans('cpanel/settings/dineIn.dineInServicePercentage') }}</span>
                <label class="checkboxlabel checkboxlabel_100p">
                    <span class="mX5 taS" >{{ trans('cpanel/settings/dineIn.useFixedCost') }}</span>
                    <input id="dineIn-useDineInServiceCost" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <div id="dineIn-servicePercentageContainer">
                    <x-input-text containerClass="wA" class="inputText_100p" type="number" id="dineIn-servicePercentage" icon="ico-percent" value="" placeholder="{{ trans('cpanel/settings/dineIn.dineInServicePercentage') }}" />
                </div>
                <div id="dineIn-serviceCostContainer">
                    <x-input-text containerClass="wA" class="inputText_100p" type="number" id="dineIn-serviceCost" icon="ico-money" value="" placeholder="{{ trans('cpanel/settings/dineIn.dineInServiceCost') }}" />
                </div>
            </div>
        </div>


        <div class="area row wrap alnSH jstfyC"  id="dineIn-workingDaysContainer" autoHelp="172" >
            <span class="areaTitle">{{ trans('cpanel/settings/dineIn.receiveDineinOrdersDays') }}</span>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="sunday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.sunday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="monday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.monday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="tuesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.tuesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="wednesday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.wednesday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="thursday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.thursday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="friday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.friday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>
            <div class="dayCard popupPage" popupPage="DineIn-WorkingDays" day="saturday">
                <div class="row alnC jstfyC mB10">
                    <div class="dayCardStatus"></div>
                    <div class="bold fs102">{{ trans('cpanel/cpanel.public.saturday') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.receiveDineinOrders') }}</div>
                    <div class="tnw fs09 DayCardWorkingHours">
                        <span class="workingHoursFrom"></span>
                        <span>-</span>
                        <span class="workingHoursTo"></span>
                    </div>
                    <div class="DayCardWorking24 none">{{ trans('cpanel/settings/dineIn.24Hours') }}</div>
                </div>
                <div class="mX10 mB5 w100p-20 column alnS jstfyS DayCardscheduledDiscounts">
                    <div class=" bold tnw">{{ trans('cpanel/settings/dineIn.scheduledDiscount') }}<span class="mX3 fs09 dayCardDiscount"></span></div>
                    <div class="tnw fs09 ">
                        <span class="dayCardDiscountFrom"></span>
                        <span>-</span>
                        <span class="dayCardDiscountTo"></span>
                    </div>
                </div>
            </div>

        </div>


        <div class="btnContainer">
            <button id="dineIn-dineInSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="dineIn-dineInSettingsSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>
    </x-content-window>
</div>
