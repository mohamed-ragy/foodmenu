<div class="pageWrapper" id="home-page">
    <input type="hidden"  id="home-title" value="{{ trans('cpanel/cpanel.menu.home') }}" icon="home">
    <div id="home-welcomeWindowTitle" class="fs2 fs105-1024 m10"></div>

    <div class="w100p row wrap alnSH jstfyS">

        <x-content-window titleClass=" fs103" title="{!! trans('cpanel/dashboard/home.todayLiveIncome') !!}" windowClass="grow1 authority_master">
            <div class="m10 column alnC jstfyC">
                <div class="homeSmallCard2 cG fs09">
                    <span class="ico-money homeSmallCardIcon2 cG"></span>
                    <span class="homeSmallCardBody2">
                        <div class="cardLoading w100 h20 mY10 br5 ordersHomePageInfoLoading"></div>
                        <span class="homeWelcomeOrderNumber2 none ordersHomePageInfoIcon" id="home-todayIncome">0</span>
                        <span class="bold fs105">{{ trans('cpanel/dashboard/home.todayIncome') }}</span>
                    </span>
                </div>
                <div class="m10 w100p-20 row wrap alnC jstfyC">

                    <div class="homeSmallCard2 c-delivery ">
                        <span class="ico-delivery homeSmallCardIcon2 c-delivery t-20"></span>
                        <span class="homeSmallCardBody2">
                            <div class="cardLoading w100 h20 mY10 br5 ordersHomePageInfoLoading"></div>
                            <span class="homeWelcomeOrderNumber2 none  ordersHomePageInfoIcon" id="home-todayDeliveryuIncome">0</span>
                            <span class="bold fs105">{{ trans('cpanel/dashboard/home.homeDelivery') }}</span>
                        </span>
                    </div>
                    <div class="homeSmallCard2 c-pickup ">
                        <span class="ico-pickup homeSmallCardIcon2 c-pickup"></span>
                        <span class="homeSmallCardBody2">
                            <div class="cardLoading w100 h20 mY10 br5 ordersHomePageInfoLoading"></div>
                            <span class="homeWelcomeOrderNumber2 none ordersHomePageInfoIcon" id="home-todayPickupuIncome">0</span>
                            <span class="bold fs105">{{ trans('cpanel/dashboard/home.pickup') }}</span>
                        </span>
                    </div>
                    <div class="homeSmallCard2 c-dineIn ">
                        <span class="ico-dineIn homeSmallCardIcon2 c-dineIn"></span>
                        <span class="homeSmallCardBody2">
                            <div class="cardLoading w100 h20 mY10 br5 ordersHomePageInfoLoading"></div>
                            <span class="homeWelcomeOrderNumber2 none ordersHomePageInfoIcon" id="home-todayDineInIncome">0</span>
                            <span class="bold fs105">{{ trans('cpanel/dashboard/home.dineIn') }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </x-content-window>

        <x-content-window titleClass=" fs103" title="{{ trans('cpanel/dashboard/home.ordersCompleted') }}" windowClass="grow1 authority_master" >
            <div class="w100p row wrap alnSH jstfyS">
                <div class="area wA grow1 mnw300 column alnC jstfyC">
                    <div class="areaTitle">{{ trans('cpanel/dashboard/home.successfullVsCanceled') }}</div>
                    <div class="m10 w100p-20 column alnS jstfyS" id="home-todaySuccessfullOrders">
                        <div class="homePrograssBarContainer">
                            <div class="homePrograssBarIcon ico-check cG"></div>
                            <div class="homePrograssBar">
                                <div class="homePrograssBarInside bgcG"></div>
                            </div>
                            <div class="homePrograssBarInfo ordersHomePageInfoIcon none  ico-info"></div>
                            <div class="loading_s vV ordersHomePageInfoLoading"></div>
                        </div>
                    </div>
                    <div class="m10 w100p-20 column alnS jstfyS" id="home-todayCanceledOrders">
                        <div class="homePrograssBarContainer">
                            <div class="homePrograssBarIcon ico-no cR"></div>
                            <div class="homePrograssBar">
                                <div class="homePrograssBarInside bgcR"></div>
                            </div>
                            <div class="homePrograssBarInfo ordersHomePageInfoIcon none ico-info"></div>
                            <div class="loading_s vV ordersHomePageInfoLoading"></div>
                        </div>
                    </div>
                </div>
                <div class="area wA grow1 mnw300">
                    <div class="areaTitle">{{ trans('cpanel/dashboard/home.successfullOrders') }}</div>
                    <div class="m10 w100p-20 column alnS jstfyS" id="home-todayDeliveredOrders">
                        <div class="homePrograssBarContainer">
                            <div class="homePrograssBarIcon ico-delivery c-delivery"></div>
                            <div class="homePrograssBar">
                                <div class="homePrograssBarInside bgc-delivery"></div>
                            </div>
                            <div class="homePrograssBarInfo ordersHomePageInfoIcon none ico-info"></div>
                            <div class="loading_s vV ordersHomePageInfoLoading"></div>
                        </div>
                    </div>
                    <div class="m10 w100p-20 column alnS jstfyS" id="home-todayPickupedOrders">
                        <div class="homePrograssBarContainer">
                            <div class="homePrograssBarIcon ico-pickup c-pickup"></div>
                            <div class="homePrograssBar">
                                <div class="homePrograssBarInside bgc-pickup"></div>
                            </div>
                            <div class="homePrograssBarInfo ordersHomePageInfoIcon none ico-info"></div>
                            <div class="loading_s vV ordersHomePageInfoLoading"></div>
                        </div>
                    </div>
                    <div class="m10 w100p-20 column alnS jstfyS" id="home-todayDinedOrders">
                        <div class="homePrograssBarContainer">
                            <div class="homePrograssBarIcon ico-dineIn c-dineIn"></div>
                            <div class="homePrograssBar">
                                <div class="homePrograssBarInside bgc-dineIn"></div>
                            </div>
                            <div class="homePrograssBarInfo ordersHomePageInfoIcon none ico-info"></div>
                            <div class="loading_s vV ordersHomePageInfoLoading"></div>
                        </div>
                    </div>
                </div>
            </div>


        </x-content-window>
    </div>

    <div class="w100p row wrap alnSH jstfyS none" id=home-productsOrderedWindows>
        <x-content-window title="{{ trans('cpanel/dashboard/home.productsOrdered') }}" titleClass="fs103" windowClass="authority_master grow1  mnw300" >
            <div class="home-productsOrderedTableContainer">
                <table class="w100p home-productsOrderedTable">
                    <tbody class="w100p" ></tbody>

                </table>
            </div>

        </x-content-window>
        {{-- <x-content-window title="{!! trans('cpanel/dashboard/home.productsNotOrdered') !!}" titleClass="fs103" windowClass="authority_master grow1 basis0 mnw300" >
            <div class="home-productsNotOrderedContainer ">

            </div>

        </x-content-window> --}}
    </div>

    <x-content-window title="{!! trans('cpanel/dashboard/home.shareYourProducts') !!}" titleClass="fs103" windowId="home-shareYourProductsWindow" windowClass="authority_1 contentWindow_100p" >
        <div  id="home-shareYourProductsContainer">
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
            <div class="cardLoading w200 h100 m10 br5"></div>
        </div>
    </x-content-window>

    <x-content-window titleClass=" fs103" title="{!! trans('cpanel/dashboard/home.incompleteOrders') !!}"  windowClass="contentWindow_100p authority_0" >
        <div class="100p row wrap alnC jstfyC mB20">
            <div class="homeSmallCard bgcR cRtxt w200 cpPage" cpPage="incomplete_orders" orderstatus="pending">
                <span class="ico-pending homeSmallCardIcon cRtxt"></span>
                <span class="homeSmallCardBody">
                    <span class="homeWelcomeOrderNumber pendingOrdersSum"></span>
                    <span class="bold">{{ trans('cpanel/dashboard/home.pendingOrders') }}</span>
                </span>
            </div>
            <div class="homeSmallCard bgcO cOtxt w200 cpPage" cpPage="incomplete_orders" orderstatus="accepted">
                <span class="ico-accepted homeSmallCardIcon cOtxt"></span>
                <span class="homeSmallCardBody">
                    <span class="homeWelcomeOrderNumber acceptedOrdersSum"></span>
                    <span class="bold">{{ trans('cpanel/dashboard/home.acceptedOrders') }}</span>
                </span>
            </div>
            <div class="homeSmallCard bgc-delivery c-deliveryt w200 cpPage" cpPage="incomplete_orders" orderstatus="outForDelivery">
                <span class="ico-delivery homeSmallCardIcon c-deliveryt t-25"></span>
                <span class="homeSmallCardBody">
                    <span class="homeWelcomeOrderNumber withDeliveryOrdersSum"></span>
                    <span class="bold">{{ trans('cpanel/dashboard/home.withDeliveryOrders') }}</span>
                </span>
            </div>
            <div class="homeSmallCard bgc-pickup c-pickupt w200 cpPage" cpPage="incomplete_orders" orderstatus="readyForPickup">
                <span class="ico-pickup homeSmallCardIcon c-pickupt"></span>
                <span class="homeSmallCardBody">
                    <span class="homeWelcomeOrderNumber readyForPickupOrdersSum"></span>
                    <span class="bold">{{ trans('cpanel/dashboard/home.readyForPickupOrders') }}</span>
                </span>
            </div>
            <div class="homeSmallCard bgc-dineIn c-dineInt w200 cpPage" cpPage="incomplete_orders" orderstatus="diningIn">
                <span class="ico-dineIn homeSmallCardIcon c-dineInt"></span>
                <span class="homeSmallCardBody">
                    <span class="homeWelcomeOrderNumber diningInOrdersSum"></span>
                    <span class="bold">{{ trans('cpanel/dashboard/home.dininginOrders') }}</span>
                </span>
            </div>
        </div>
    </x-content-window>

    <div class="w100p row wrap alnSH jstfyS">
        <x-content-window titleClass=" fs103" title="{!! trans('cpanel/dashboard/home.liveActivityLog') !!}" windowClass="authority_master grow1 mnw300" >
            <div id="home-liveActivity"></div>
        </x-content-window>
        <div class="grow1">
            <x-content-window titleClass=" fs103" title="{{ trans('cpanel/dashboard/home.myStaff') }}" windowClass="authority_master " >
                <div class="w100p row wrap alnSH jstfySH">
                    <div class="area wA grow1">
                        <div class="areaTitle">{{ trans('cpanel/dashboard/home.subAccounts') }}</div>
                        <div id="home-noSubAccounts">
                            <span>{{ trans('cpanel/dashboard/home.noSubAccounts1') }}</span>
                            <a class="mis-3 popupPage" popupPage="Create-Sub-Account">{{ trans('cpanel/dashboard/home.noSubAccounts2') }}</a>
                        </div>
                        <div id="home-subAccounts" class="w100p"></div>
                    </div>
                    <div class="area wA grow1">
                        <div class="areaTitle">{{ trans('cpanel/dashboard/home.deliveries') }}</div>
                        <div id="home-nodeliveryAccounts">
                            <span>{{ trans('cpanel/dashboard/home.nodeliveries1') }}</span>
                            <a class="mis-3 cpPage" cpPage="delivery_accounts">{{ trans('cpanel/dashboard/home.nodeliveries2') }}</a>
                        </div>
                        <div id="home-deliveryAccounts" class="w100p"></div>
                    </div>
                </div>
            </x-content-window>
            <x-content-window title="{{ trans('cpanel/dashboard/home.websiteVisitors') }}" windowClass=" authority_2" >
                <div class="column alnS jstfyS">
                    <div class="m5 w100p-10 row alnC jstfySB">
                        <div class="row alnC jstfyC mY10">
                            <div class="ico-user fs105"></div>
                            <div class="fs103 bold mX3">{{ trans('cpanel/dashboard/home.users') }}</div>
                        </div>
                        <div class="fs103 bold onlineUsersSum_users">0</div>
                    </div>
                    <div class="m5 w100p-10 row alnC jstfySB">
                        <div class="row alnC jstfyC mY10">
                            <div class="ico-guest fs105"></div>
                            <div class="fs103 bold mX3">{{ trans('cpanel/dashboard/home.guests') }}</div>
                        </div>
                        <div class="onlineUsersSum_guests fs103 bold">0</div>
                    </div>
                    <a class="alnsE cpPage mT10" cpPage="online_users">{{ trans('cpanel/dashboard/home.moreDetails') }}</a>
                </div>
            </x-content-window>
        </div>
    </div>



</div>
