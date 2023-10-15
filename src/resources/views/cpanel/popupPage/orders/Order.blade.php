<div class="pageWrapper">
    <input type="hidden" class="popupPageHiddenTitle" cpPage="order_history" value="{{ trans('cpanel/cpanel.menu.order_history') }}" icon="orderHistory">{{-- this title and the icon set in the orders class after the order is loaded --}}
    <x-content-window title="" titleId="orderPage-windowTitle" helpId="159" windowId="Order" windowClass="orderPage-windowClass">
        <div class="mnw300 m10" id="orderWindowNotFound">{{ trans('cpanel/orders/orders.orderNotFound') }}</div>
        <div id="orderWindowContainer">
            <div class="row mX10 mY20 brdrB1">
                <div class="orderPageTab orderPageTab-d">
                    <span class="fs101 ico-details row alnBL jstfyC"></span>
                    <span class="mX5 none-720">{{ trans('cpanel/orders/orders.orderDetails') }}</span>
                </div>
                <div class="orderPageTab orderPageTab-l">
                    <span class="fs101 ico-cycle row alnBL jstfyC"></span>
                    <span class="mX5 none-720">{{ trans('cpanel/orders/orders.orderLifecycle') }}</span>
                </div>
                <div class="orderPageTab orderPageTab-i">
                    <span class="fs102 ico-orderItems row alnBL jstfyC"></span>
                    <span class="mX5 none-720">{{ trans('cpanel/orders/orders.orderItems') }}</span>
                </div>
            </div>
            <div id="orderPage-orderDetails" class="h0 ofH"></div>
            <div id="orderPage-orderLifecycle" class="h0 ofH"></div>
            <div id="orderPage-orderItems" class="h0 ofH relative">
                <div id="orderPage-orderItemsLoadingcover" class="absolute t0 l0 w100p h100p blur3 zx10 row alnC jstyfC none cursorLoading">
                    <div class="loading_L vV"></div>
                </div>
                <div class="btnContainer">
                    <button id="orderPage-addItemBtn" class="btn btn-cancel" id="orderPage-addItemBtn">{{ trans('cpanel/orders/orders.addItem') }}</button>
                </div>
                <div id="orderPage-orderItemsContainer" class="brdrT1"></div>
                <div id="orderPage-itemsLastModified" class="none mT10 fs08"></div>
                <div class="area" id="orderPage-orderCheckContainer">
                    <span class="areaTitle">{{ trans('cpanel/orders/orders.orderCheck') }}</span>
                    <div class="m5 w100p-10 shdw2 br1">
                        <div class="orderCheckElem column alnC jstfyC">
                            <div class="w100p row alnC jstfySB">
                                <div>
                                    <div>{{ trans('cpanel/orders/orders.discount') }}<span class="ico-warning cO mis-5 none" id="orderPage-discountNoSave"></span></div>
                                    <div id="orderPage-discountBy" class="fs08 none"></div>
                                </div>
                                <div class="row alnC jstfyE" id="orderPage-discount-incomplete">
                                    <input id="orderPage-discount" class="unset taE">
                                    <span>%</span>
                                    <span class="ico-edit pointer mis-5" id="orderPage-discountEdit"></span>
                                </div>
                                <div id="orderPage-discount-complete"></div>
                            </div>
                            <div class="row alnS jstfyE w100p none" id="orderPage-discountBtns">
                                <button class="btn btn-cancel btn_s" id="orderPage-discountCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                                <button class="btn btn_s" id="orderPage-discountSaveBtn">
                                    <div class="btnLoading_s"></div>
                                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                                </button>
                            </div>
                        </div>
                        <div class="orderCheckElem">
                            <div>{{ trans('cpanel/orders/orders.subTotal') }}</div>
                            <div class="column bold alnE jstfyS">
                                <div id="orderPage-itemsTotal"></div>
                                <div id="orderPage-discount_itemsTotal"></div>
                            </div>
                        </div>
                        <div class="orderCheckElem" id="orderPage-taxContainer">
                            <div>
                                <span>{{ trans('cpanel/orders/orders.tax') }}</span>
                                <span id="orderPage-taxPercent" class="fs08"></span>
                            </div>
                            <div id="orderPage-tax"></div>
                        </div>
                        <div class="orderCheckElem" id="orderPage-serviceContainer">
                            <div>
                                <span>{{ trans('cpanel/orders/orders.service') }}</span>
                                <span id="orderPage-servicePercent" class="fs08"></span>
                            </div>
                            <div id="orderPage-service"></div>
                        </div>
                        <div class="orderCheckElem column alnC jstfyC" id="orderPage-deliveryCostContainer">
                            <div class="w100p row alnC jstfySB">
                                <div>
                                    <div>{{ trans('cpanel/orders/orders.deliveryCost') }}<span class="ico-warning cO mis-5 none" id="orderPage-deliveryCostNoSave"></span></div>
                                    <div id="orderPage-deliveryCostEdited" class="fs08"></div>
                                </div>
                                <div class="row alnC jstfyE" id="orderPage-deliveryCost-incomplete">
                                    <input id="orderPage-deliveryCost" class="unset taE">
                                    <span class="ico-edit pointer mis-5" id="orderPage-deliveryCostEdit"></span>
                                </div>
                                <div id="orderPage-deliveryCost-complete"></div>
                            </div>
                            <div class="row alnS jstfyE w100p none" id="orderPage-deliveryCostBtns">
                                <button class="btn btn-cancel btn_s" id="orderPage-deliveryCostCancelBtn">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                                <button class="btn btn_s" id="orderPage-deliveryCostSaveBtn">
                                    <div class="btnLoading_s"></div>
                                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                                </button>
                            </div>
                        </div>

                        <div class="orderCheckElem brdrB0">
                            <div>{{ trans('cpanel/orders/orders.total') }}</div>
                                <div id="orderPage-total" class="bold"></div>
                        </div>
                    </div>
                    <div class="btnContainer">
                        <button class="btn btn-cancel order-printReceipt" id="orderPage-printReceipt">{{ trans('cpanel/orders/orders.printReceipt') }}</button>
                    </div>
                </div>
                <div class="area none" id="orderPage-orderItems_origianl">
                    <span class="areaTitle">{{ trans('cpanel/orders/orders.originalItems') }}</span>
                    <div id="orderPage-orderItems_origianlContainer" class="w100p brdrB1"></div>
                </div>
            </div>
        </div>



    </x-content-window>
</div>
