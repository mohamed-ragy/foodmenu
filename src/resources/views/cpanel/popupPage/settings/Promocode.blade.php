<div class="pageWrapper" >
    <input type="hidden" class="popupPageHiddenTitle"  cpPage="promo_codes" value="{{ trans('cpanel/cpanel.menu.promo_codes') }}" icon="promocode">

    <x-content-window windowId="Create-Promocode" title="{{ trans('cpanel/settings/promocodes.createPromoCode') }}" helpId="220">
        <div class="area " autoHelp="222">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeBasicInfo') }}</span>
            <x-input-text type="text" id="createPromocode-codeInput" icon="ico-promo_codes" placeholder="{{ trans('cpanel/settings/promocodes.code') }}" />

            <div class="numberPickerContainer_100p">
                <span>{{ trans('cpanel/settings/promocodes.discount') }}</span>
                <div class="numberPickerControls">
                    <span class="numberPickerArrow ico-left" id="createPromocode-discountD"></span>
                    <span class="numberPickerValue">
                        <span id="createPromocode-discount"></span>
                        <span>%</span>
                    </span>
                    <span class="numberPickerArrow ico-right" id="createPromocode-discountU"></span>
                </div>
            </div>
        </div>

        <div class="area  column alnC jstfyS" autoHelp="223">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeexpiry') }}</span>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isExpire') }}</span>
                <input id="createPromocode-isExpire" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <div class="datePickerSelectedDateContainer datePicker-promocodesContainer_hide" id="datePicker-promocodesContainer" datePickerContainer="datePicker-promocodes">
                <span class="ico-datePicker datePickerSelectedDateIcon"></span><span class="datePickerSelectedDate"></span><span class="ico-down mX10"></span>
            </div>
            <div class="datePickerContainer" id="datePicker-promocodes" todayActive="0" selectPeriod="month" selectBy="day" datePickerType="future">
                <div class="datePickerMonthContainer">
                    <span class="ico-left datePickerPrevMonthBtn" datePickerContainer="datePicker-promocodes" ></span>
                    <span class="datePickerMonthNameContainer" month="" year="">
                        <span class="datePickerMonth fs103 mX3" month=""></span>
                        <span class="datePickerYear fs102 mT10" year=""></span>
                    </span>
                    <span class="ico-right datePickerNextMonthBtn" datePickerContainer="datePicker-promocodes" ></span>
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
        </div>

        <div class="area " autoHelp="224">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.OrderTotalLimits') }}</span>
            <x-input-text type="number" id="createPromocode-minimum" icon="ico-money" placeholder="{{ trans('cpanel/settings/promocodes.minimum') }}" />
            <x-input-text type="number" id="createPromocode-cap" icon="ico-money" placeholder="{{ trans('cpanel/settings/promocodes.cap') }}" />
        </div>

        <div class="area " autoHelp="225">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeSettings') }}</span>

            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isOneUse') }}</span>
                <input id="createPromocode-isOneUse" type="checkbox" class="checkbox" name="checkbox">
                <span></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isDelivery') }}</span>
                <input id="createPromocode-isDelivery" type="checkbox" class="checkbox" name="checkbox">
                <span></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isPickup') }}</span>
                <input id="createPromocode-isPickup" type="checkbox" class="checkbox" name="checkbox">
                <span></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isGuest') }}</span>
                <input id="createPromocode-isGuest" type="checkbox" class="checkbox" name="checkbox">
                <span></span>
            </label>
        </div>

        <div class="btnContainer ">
            <button id="createPromocode-createBtn" class="btn">{{ trans('cpanel/cpanel.public.create') }}</button>
        </div>

    </x-content-window>
    <x-content-window windowId="Edit-Promocode" title="{{ trans('cpanel/settings/promocodes.editPromocode') }}" helpId="221" noSaveId="editPromocode-NoSave">
        <input type="hidden" id="editPromocodeHiddenId" >
        <div class="m20 none" id="settings-editPromocode-promocodeNotFound">{{ trans('cpanel/settings/promocodes.promocodeNotFound') }}</div>
        <div class="EditPromocodeLoadingContainer column alnS jstfyS mY20 w300">
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
        </div>
        <div class="EditPromocodeLoadingContainer column alnS jstfyS mY20 w300">
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
        </div>
        <div class="EditPromocodeLoadingContainer column alnS jstfyS mY20 w300">
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
        </div>
        <div class="EditPromocodeLoadingContainer column alnS jstfyS mY20 w300">
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
            <div class="cardLoading editPromocode_loading1"></div>
            <div class="cardLoading editPromocode_loading2"></div>
        </div>
        <div class="area promocodeContent none" autoHelp="222">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeBasicInfo') }}</span>

            <x-input-text type="text" id="editPromocode-codeInput" icon="ico-promo_codes" placeholder="{{ trans('cpanel/settings/promocodes.code') }}" />

            <div class="numberPickerContainer_100p">
                <span>{{ trans('cpanel/settings/promocodes.discount') }}</span>
                <div class="numberPickerControls">
                    <span class="numberPickerArrow ico-left" id="editPromocode-discountD"></span>
                    <span class="numberPickerValue">
                        <span id="editPromocode-discount"></span>
                        <span>%</span>
                    </span>
                    <span class="numberPickerArrow ico-right" id="editPromocode-discountU"></span>
                </div>
            </div>
        </div>

        <div class="area column alnC jstfyS promocodeContent none" autoHelp="223">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeexpiry') }}</span>

            <label class="checkboxlabel_100p">
                <span class="mX5">{{ trans('cpanel/settings/promocodes.isExpire') }}</span>
                <input id="editPromocode-isExpire" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>

            <div class="datePickerSelectedDateContainer datePicker-promocodesContainer_hide" id="datePicker-editpromocodesContainer" datePickerContainer="datePicker-editpromocodes">
                <span class="ico-datePicker datePickerSelectedDateIcon"></span><span class="datePickerSelectedDate"></span><span class="ico-down mX10"></span>
            </div>
            <div class="datePickerContainer" id="datePicker-editpromocodes" todayActive="0" selectPeriod="month" selectBy="day" datePickerType="future">
                <div class="datePickerMonthContainer">
                    <span class="ico-left datePickerPrevMonthBtn" datePickerContainer="datePicker-editpromocodes" ></span>
                    <span class="datePickerMonthNameContainer" month="" year="">
                        <span class="datePickerMonth fs103 mX3" month=""></span>
                        <span class="datePickerYear fs102 mT10" year=""></span>
                    </span>
                    <span class="ico-right datePickerNextMonthBtn" datePickerContainer="datePicker-editpromocodes" ></span>
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
        </div>

        <div class="area promocodeContent none" autoHelp="224">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.OrderTotalLimits') }}</span>
            <x-input-text type="number" id="editPromocode-minimum" icon="ico-money" placeholder="{{ trans('cpanel/settings/promocodes.minimum') }}" />
            <x-input-text type="number" id="editPromocode-cap" icon="ico-money" placeholder="{{ trans('cpanel/settings/promocodes.cap') }}" />
        </div>

        <div class="area promocodeContent none" autoHelp="225">
            <span class="areaTitle">{{ trans('cpanel/settings/promocodes.codeSettings') }}</span>
            <label class="checkboxlabel_100p">
                <span class="mX5" style>{{ trans('cpanel/settings/promocodes.isOneUse') }}</span>
                <input id="editPromocode-isOneUse" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5" style>{{ trans('cpanel/settings/promocodes.isDelivery') }}</span>
                <input id="editPromocode-isDelivery" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5" style>{{ trans('cpanel/settings/promocodes.isPickup') }}</span>
                <input id="editPromocode-isPickup" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
            <label class="checkboxlabel_100p">
                <span class="mX5" style>{{ trans('cpanel/settings/promocodes.isGuest') }}</span>
                <input id="editPromocode-isGuest" type="checkbox" class="checkbox" name="checkbox">
                <span class="mX5"></span>
            </label>
        </div>

        <div class="btnContainer promocodeContent none">
            <button id="editPromocode-CancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="editPromocode-SaveBtn" class="btn">
                <span class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</span>
                <span class="btnLoading"></span>
            </button>
        </div>
    </x-content-window>
</div>
