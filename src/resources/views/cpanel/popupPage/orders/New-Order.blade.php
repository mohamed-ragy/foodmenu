<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="incomplete_orders" value="{{ trans('cpanel/cpanel.menu.incomplete_orders') }}" icon="orders">
    <x-content-window title="{{ trans('cpanel/orders/orders.placeNewOrder') }}" helpId="151" windowId="New-Order" >

        <div class="row mX10 mY20 brdrB1">
            <div class="placeOrderTab placeOrderTab-d">
                <span class="fs101 ico-details row alnBL jstfyC"></span>
                <span class="mX5">{{ trans('cpanel/orders/orders.orderDetails') }}</span>
            </div>
            <div class="placeOrderTab placeOrderTab-i">
                <span class="fs102 ico-orderItems row alnBL jstfyC"></span>
                <span class="mX5">{{ trans('cpanel/orders/orders.orderItems') }}</span>
            </div>
        </div>
        <div id="placeOrder-orderDetails" class="h0 ofH">
            <div class="column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3" autoHelp="152">
                <div class="fs101 pY10 pX5 w100p-10 bgc-c3 bold">{{ trans('cpanel/orders/orders.orderType') }}</div>
                <div class="placeOrderTypeCard" orderType="dineIn">
                    <div class="ico-dineIn c-dineIn mX5 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.dineIn') }}</div>
                    <div class="ico-check0 placeOrderTypeCheck mX5"></div>
                </div>
                <div class="placeOrderTypeCard" orderType="delivery">
                    <div class="ico-delivery c-delivery mX5 fs102 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.delivery') }}</div>
                    <div class="ico-check0 placeOrderTypeCheck mX5"></div>
                </div>
                <div class="placeOrderTypeCard" orderType="pickup" >
                    <div class="ico-pickup c-pickup mX5 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.pickup') }}</div>
                    <div class="ico-check0 placeOrderTypeCheck mX5"></div>
                </div>
            </div>
            <div class="column w100p-20 mX10 alnS jstfyS ofH brdr1 brdrT0 br3 mT20" id="placeOrder-paymentMethodContainer"  autoHelp="153">
                <div class="fs101 pY10 pX5 w100p-10 bgc-c3 bold">{{ trans('cpanel/orders/orders.paymentMethod') }}</div>
                <div class="placeOrderPaymentMethodCard" paymentMethod="cashOnDelivery">
                    <div class="ico-money mX5 fs102 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.cashOnDelivery') }}</div>
                    <div class="ico-check0 placeOrderPaymentMethodCheck mX5"></div>
                </div>
                <div class="placeOrderPaymentMethodCard" paymentMethod="cardOnDelivery">
                    <div class="ico-card mX5 fs102 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.cardOnDelivery') }}</div>
                    <div class="ico-check0 placeOrderPaymentMethodCheck mX5"></div>
                </div>
                <div class="placeOrderPaymentMethodCard" paymentMethod="cashOnPickup">
                    <div class="ico-money mX5 fs102 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.cashOnPickup') }}</div>
                    <div class="ico-check0 placeOrderPaymentMethodCheck mX5"></div>
                </div>
                <div class="placeOrderPaymentMethodCard" paymentMethod="cardOnPickup">
                    <div class="ico-card mX5 fs102 row alnC jstfyC"></div>
                    <div class="mie-10 fs101 grow2">{{ trans('cpanel/orders/orders.cardOnPickup') }}</div>
                    <div class="ico-check0 placeOrderPaymentMethodCheck mX5"></div>
                </div>
            </div>

            <div class="area" autoHelp="154">
                <span class="areaTitle">{{ trans('cpanel/orders/orders.placeOrderFor') }}</span>
                <div class="row w100p alnS jstfyS ofH  br3">
                    <div class="placeOrderPlaceForCard" visitor="guest">
                        <div class="ico-guest mX5 fs102 row alnC jstfyC"></div>
                        <div class="mie-10 fs101 grow2">{{ trans('cpanel/cpanel.public.guest') }}</div>
                        <div class="ico-check0 placeOrderPlaceForCheck mX5"></div>
                    </div>
                    <div class="placeOrderPlaceForCard" visitor="user">
                        <div class="ico-user mX5 fs102 row alnC jstfyC"></div>
                        <div class="mie-10 fs101 grow2">{{ trans('cpanel/cpanel.public.user') }}</div>
                        <div class="ico-check0 placeOrderPlaceForCheck mX5"></div>
                    </div>
                </div>
                <div class="w100p">
                    <x-input-list id="placeOrder-usersListInput" listId="placeOrder-usersList" listLoading="no" class="findUser" listClass="findUserList"  icon="ico-users" placeholder="{{ trans('cpanel/orders/orders.findUser') }}" />
                </div>
                <x-input-text id="placeOrder-userPhoneNumber" icon="ico-phone_number" placeholder="{{ trans('cpanel/orders/orders.phoneNumber') }}" />
                <x-input-text id="placeOrder-userAddress" icon="ico-address" placeholder="{{ trans('cpanel/orders/orders.address') }}"  />
                <div class="w100p-20 mX10 mT5 row alnC jstfyE">
                    <a id="placeOrder-addLocation"></a>
                </div>
                <div class="m10 w100p-20 zx1 relative h0 ofH" id="placeOrder-userLocationContainer">
                    <div class=" w100p h200" id="placeOrder-userLocation"></div>
                    {{-- <div class="btnContainer">
                        <button class="btn btn-cancel" id="placeOrder-unsetLocation">{{ trans('cpanel/users/createNewUser.userUnsetLocation') }}</button>
                    </div> --}}
                </div>
            </div>
            <x-textarea id="placeOrder-notice" icon="ico-description" autoHelp="155" maxLength="150" title="{{ trans('cpanel/orders/orders.orderNotice') }}" />
        </div>
        <div id="placeOrder-orderItems" class="h0 ofH">
            <div class="btnContainer">
                <button class="btn btn-cancel" id="placeOrder-addItemBtn">{{ trans('cpanel/orders/orders.addItem') }}</button>
            </div>
            <div id="placeOrder-itemsContainer" autoHelp="156" class="brdrT1"></div>
            <div class="area" autoHelp="157">
                <span class="areaTitle">{{ trans('cpanel/orders/orders.orderCheck') }}</span>
                <div class="m5 w100p-10 shdw2 br1">
                    <div class="orderCheckElem">
                        <div>
                            <div id="placeOrder-discountTxt">{{ trans('cpanel/orders/orders.discount') }}</div>
                        </div>
                        <div class="row alnC jstfyE">
                            <input id="placeOrder-discount" class="unset taE">
                            <span>%</span>
                            <span class="ico-edit pointer mis-5" id="placeOrder-discountEdit"></span>
                        </div>
                    </div>
                    <div class="orderCheckElem">
                        <div>{{ trans('cpanel/orders/orders.subTotal') }}</div>
                        <div class="column bold alnE jstfyS">
                            <div id="placeOrder-itemsTotal"></div>
                            <div id="placeOrder-discount_itemsTotal"></div>
                        </div>
                    </div>
                    <div class="orderCheckElem" id="placeOrder-taxContainer">
                        <div>
                            <span>{{ trans('cpanel/orders/orders.tax') }}</span>
                            <span id="placeOrder-taxPercent" class="fs08"></span>
                        </div>
                        <div id="placeOrder-tax"></div>
                    </div>
                    <div class="orderCheckElem" id="placeOrder-serviceContainer">
                        <div>
                            <span>{{ trans('cpanel/orders/orders.service') }}</span>
                            <span id="placeOrder-servicePercent" class="fs08"></span>
                        </div>
                        <div id="placeOrder-service"></div>
                    </div>
                    <div class="orderCheckElem" id="placeOrder-deliveryCostContainer">
                        <div>{{ trans('cpanel/orders/orders.deliveryCost') }}</div>
                        <div class="row alnC jstfyE">
                            <input id="placeOrder-deliveryCost" class="unset taE">
                            <span class="ico-edit pointer mis-5" id="placeOrder-deliveryCostEdit"></span>
                        </div>
                    </div>
                    <div class="orderCheckElem brdrB0">
                        <div>{{ trans('cpanel/orders/orders.total') }}</div>
                        <div id="placeOrder-total" class="bold"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btnContainer">
            <button class="btn btn-cancel" id="placeOrder-cancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button class="btn" id="placeOrder-placeBtn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/orders/orders.placeOrder') }}</div>
            </button>
        </div>
    </x-content-window>
</div>
