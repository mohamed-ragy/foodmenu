<div class="pageWrapper" id="order_history-page">
    <input type="hidden" id="order_history-title" value="{{ trans('cpanel/cpanel.menu.order_history') }}" icon="orderHistory">
    <x-content-window title="{{ trans('cpanel/orders/orders.orderHistory') }}" helpId="165" windowClass="contentWindow_100p">
        <div class="area" autoHelp="166">
            <span class="areaTitle">{{ trans('cpanel/orders/orders.findOrders') }}</span>
            <div class="mX10 mB5 pT10 mT20 fs101">{{ trans('cpanel/orders/orders.orderStatus') }}</div>
            <div class="row wrap alnC jstfyS w100p-20 mB20 mX10">
                <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="dineIn">
                    <div class="ico-check1 mX5"></div>
                    <div>{{ trans('cpanel/orders/orders.dinedIn') }}</div>
                </div>
                <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="delivered">
                    <div class="ico-check1 mX5"></div>
                    <div>{{ trans('cpanel/orders/orders.delivered') }}</div>
                </div>
                <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="pickedUp">
                    <div class="ico-check1 mX5"></div>
                    <div>{{ trans('cpanel/orders/orders.pickedUp') }}</div>
                </div>
                <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="canceled">
                    <div class="ico-check1 mX5"></div>
                    <div>{{ trans('cpanel/orders/orders.canceled') }}</div>
                </div>
            </div>

            <div class="orderHistoryMoreFiltersContainer">
                <div class="mX10 mB5 pT10 mT20 fs101 brdrT1">{{ trans('cpanel/orders/orders.placedFor') }}</div>
                <div class="row wrap alnC jstfyS w100p-20 mB10 mX10">
                    <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="users">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/cpanel.public.users') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer orderHistoryFilterCheck" filter="guests">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/cpanel.public.guests') }}</div>
                    </div>
                </div>
                <x-input-list id="orderHistory-selectUser" listId="orderHistory-selectUserList" class="findUser" listClass="findUserList" listLoading="no" icon="ico-users" placeholder="{{ trans('cpanel/cpanel.public.findUser') }}" />
                <div class="mX10 mB5 pT10 mT20 fs101 brdrT1">{{ trans('cpanel/orders/orders.orderNumber') }}</div>
                <x-input-text id="orderHistory-orderNumber" icon="ico-hashtag" placeholder="{{ trans('cpanel/orders/orders.orderNumber') }}" />
            </div>
            <div class="btnContainer">
                <button class="btn btn-cancel" id="orderHistoryMoreFilters">{{ trans('cpanel/orders/orders.moreFilters') }}</button>
                <button class="btn" id="orderHistory-FindBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.find') }}</div>
                </button>
            </div>
        </div>
        <div id="orderHistory-orderListNoOrders" class="none">{{ trans('cpanel/orders/orders.noOrders') }}</div>
        <div id="orderHistory-orderListContainer" class="w100p"></div>
        <div class="w100p none" id="orderHistory-orderListContainer_loading">
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

