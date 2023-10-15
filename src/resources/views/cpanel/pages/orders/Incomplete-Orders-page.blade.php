<div class="pageWrapper" id="incomplete_orders-page">
    <input type="hidden" id="incomplete_orders-title" value="{{ trans('cpanel/cpanel.menu.incomplete_orders') }}" icon="orders">
    <x-content-window title="{{ trans('cpanel/orders/orders.incompleteOrdersList') }}" helpId="149" windowClass="contentWindow_100p">
        <div class="btnContainer">
            <button class="btn btn-cancel popupPage" popupPage="New-Order">{{ trans('cpanel/orders/orders.newOrder') }}</button>
        </div>
        <div class="row mX10 mY20 brdrB1">
            <div class="IncompleteOrderTypeElem cpPage IncompleteOrderTypeElem_selected" cpPage="incomplete_orders" orderStatus="all">
                <div class="ico-orders"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.all') }}</div>
                <div class="mX2"></div>
                <div class="incompleteOrdersSum">0</div>
            </div>
            <div class="IncompleteOrderTypeElem cpPage" cpPage="incomplete_orders" orderStatus="pending">
                <div class="ico-pending"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.pending') }}</div>
                <div class="mX2"></div>
                <div class="pendingOrdersSum">0</div>
            </div>
            <div class="IncompleteOrderTypeElem cpPage" cpPage="incomplete_orders" orderStatus="accepted">
                <div class="ico-accepted"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.accepted') }}</div>
                <div class="mX2"></div>
                <div class="acceptedOrdersSum">0</div>
            </div>
            <div class="IncompleteOrderTypeElem cpPage" cpPage="incomplete_orders" orderStatus="outForDelivery">
                <div class="ico-delivery fs102"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.withDelivery') }}</div>
                <div class="mX2"></div>
                <div class="withDeliveryOrdersSum">0</div>
            </div>
            <div class="IncompleteOrderTypeElem cpPage" cpPage="incomplete_orders" orderStatus="readyForPickup">
                <div class="ico-pickup"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.readyForPickup') }}</div>
                <div class="mX2"></div>
                <div class="readyForPickupOrdersSum">0</div>
            </div>
            <div class="IncompleteOrderTypeElem cpPage" cpPage="incomplete_orders" orderStatus="diningIn">
                <div class="ico-dineIn fs101"></div>
                <div class="mX2"></div>
                <div class="ellipsis tnw none-1280">{{ trans('cpanel/orders/orders.diningIn') }}</div>
                <div class="mX2"></div>
                <div class="diningInOrdersSum">0</div>
            </div>
        </div>
        <div id="orders-incompleteOrdersContainer" autoHelp="158" class="w100p">
            <table class="ordersListTable mT0">
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
                <tr class="orderRow">
                    <td>
                        <div class="row alnS jstfyS">
                            <div class="orderRowTypeTag w15 h15 cardLoading"></div>
                            <div>
                                <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                                <div class="cardLoading w100 h5 mX10 mY3 br3"></div>
                            </div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="orderRowStatusTag cardLoading w70 h10 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyS">
                            <div class="orderRowItemImg cardLoading"></div>
                            <div class="orderRowItemImg cardLoading"></div>
                        </div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w70 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="cardLoading w50 h5 mX10 mY3 br3"></div>
                    </td>
                    <td class="none-720">
                        <div class="row alnC jstfyE">
                            <div class="cardLoading w20 h20 br3 mX2"></div>
                            <div class="cardLoading w20 h20 br3"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </x-content-window>
</div>
