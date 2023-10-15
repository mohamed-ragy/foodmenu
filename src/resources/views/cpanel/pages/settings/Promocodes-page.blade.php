<div class="pageWrapper" id="promo_codes-page">
    <input type="hidden" id="promo_codes-title" value="{{ trans('cpanel/cpanel.menu.promo_codes') }}" icon="promocode" />
    <x-content-window  title="{{ trans('cpanel/settings/promocodes.promocodes') }}" windowClass="contentWindow_100p" helpId="218">
        <div class="btnContainer">
            <button class="btn btn-cancel popupPage" popupPage="Create-Promocode">{{ trans('cpanel/settings/promocodes.createPromoCode') }}</button>
        </div>
        <div id="promoCodesLoadingContainer" class=" column alnSH jstfyC w100p-20 m10">
            <div class="pomocodeCardContainer_loading">
                <div class="cardLoading pomocodeCard_loading1"></div>
                <div class="w100p">
                    <div class="cardLoading pomocodeCard_loading2"></div>
                    <div class="cardLoading pomocodeCard_loading3"></div>
                </div>
            </div>
            <div class="pomocodeCardContainer_loading">
                <div class="cardLoading pomocodeCard_loading1"></div>
                <div class="w100p">
                    <div class="cardLoading pomocodeCard_loading2"></div>
                    <div class="cardLoading pomocodeCard_loading3"></div>
                </div>
            </div>
            <div class="pomocodeCardContainer_loading">
                <div class="cardLoading pomocodeCard_loading1"></div>
                <div class="w100p">
                    <div class="cardLoading pomocodeCard_loading2"></div>
                    <div class="cardLoading pomocodeCard_loading3"></div>
                </div>
            </div>
        </div>
        <div id="promocodes-noPromocodes" class="none">{{ trans('cpanel/settings/promocodes.noPromocodes') }}</div>
        <div id="promocodes-promocodesContainer"></div>

    </x-content-window>
</div>
