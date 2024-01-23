<script>
    let account = {!! $account !!};
    let website = {!! $website !!};
    let settings = {!! $settings !!};
    let foodMenuData = {!! $foodMenuData !!};
    let texts = {!! $texts !!};
    let autoHelp_text = {!! $autoHelp_text !!}
    texts = {
        cpanel:{!! json_encode(trans('cpanel/cpanel')) !!},
        support:{!! json_encode(trans('cpanel/support/texts')) !!},
        settings:{!! json_encode(trans('cpanel/settings/texts')) !!},
        users:{!! json_encode(trans('cpanel/users/texts')) !!},
        staff:{!! json_encode(trans('cpanel/staff/texts')) !!},
        products:{!! json_encode(trans('cpanel/products/texts')) !!},
        design:{!! json_encode(trans('cpanel/design/texts')) !!},
        orders:{!! json_encode(trans('cpanel/orders/texts')) !!},
        security:{!! json_encode(trans('cpanel/security/texts')) !!},
        dashboard:{!! json_encode(trans('cpanel/dashboard/texts')) !!},
        activity_log:{!! json_encode(trans('cpanel/dashboard/activity_log')) !!},
        // statistics:{

        //     "noAvailableData":"{!! trans('cpanel/dashboard/statistics.noAvailableData') !!}",
        //     "smallScreen":"{!! trans('cpanel/dashboard/statistics.smallScreen') !!}",

        //     "deliveredOrders":"{!! trans('cpanel/dashboard/statistics.deliveredOrders') !!}",
        //     "deliveredOrder":"{!! trans('cpanel/dashboard/statistics.deliveredOrder') !!}",
        //     "minute":"{!! trans('cpanel/dashboard/statistics.minute') !!}",
        //     "minutes":"{!! trans('cpanel/dashboard/statistics.minutes') !!}",
        //     "hour":"{!! trans('cpanel/dashboard/statistics.hour') !!}",
        //     "hours":"{!! trans('cpanel/dashboard/statistics.hours') !!}",
        //     "in":"{!! trans('cpanel/dashboard/statistics.in') !!}",
        //     "and":"{!! trans('cpanel/dashboard/statistics.and') !!}",
        //     "avg":"{!! trans('cpanel/dashboard/statistics.avg') !!}",
        //     "perOrder":"{!! trans('cpanel/dashboard/statistics.perOrder') !!}",
        //     ///////////////////
        //     "periodSelectedHasNoArchive":"{!! trans('cpanel/dashboard/statistics.periodSelectedHasNoArchive') !!}",
        //     "periodSelectedHasNoArchive2":"{!! trans('cpanel/dashboard/statistics.periodSelectedHasNoArchive2') !!}",
        //     "dataloaded":"{!! trans('cpanel/dashboard/statistics.dataloaded') !!}",

        //     "completeOrders":"{!! trans('cpanel/dashboard/statistics.completeOrders') !!}",
        //     "successfulIncom":"{!! trans('cpanel/dashboard/statistics.successfulIncom') !!}",
        //     "successfulOrders":"{!! trans('cpanel/dashboard/statistics.successfulOrders') !!}",
        //     "canceledOrders":"{!! trans('cpanel/dashboard/statistics.canceledOrders') !!}",


        //     "totalIncome":"{!! trans('cpanel/dashboard/statistics.totalIncome') !!}",
        //     "itemsTotal":"{!! trans('cpanel/dashboard/statistics.itemsTotal') !!}",
        //     "deliveryCost":"{!! trans('cpanel/dashboard/statistics.deliveryCost') !!}",
        //     "tax":"{!! trans('cpanel/dashboard/statistics.tax') !!}",
        //     "service":"{!! trans('cpanel/dashboard/statistics.service') !!}",
        //     "total":"{!! trans('cpanel/dashboard/statistics.total') !!}",
        //     "income":"{!! trans('cpanel/dashboard/statistics.income') !!}",
        //     "orderedByUsers":"{!! trans('cpanel/dashboard/statistics.orderedByUsers') !!}",
        //     "orderedByGuests":"{!! trans('cpanel/dashboard/statistics.orderedByGuests') !!}",

        //     "delivery":"{!! trans('cpanel/dashboard/statistics.delivery') !!}",
        //     "pickup":"{!! trans('cpanel/dashboard/statistics.pickup') !!}",
        //     "dineIn":"{!! trans('cpanel/dashboard/statistics.dineIn') !!}",

        //     "deliveryOrders":"{!! trans('cpanel/dashboard/statistics.deliveryOrders') !!}",
        //     "pickupOrders":"{!! trans('cpanel/dashboard/statistics.pickupOrders') !!}",
        //     "dineInOrders":"{!! trans('cpanel/dashboard/statistics.dineInOrders') !!}",

        //     "successfulOrdersGraph":"{!! trans('cpanel/dashboard/statistics.successfulOrdersGraph') !!}",
        //     "canceledOrdersGraph":"{!! trans('cpanel/dashboard/statistics.canceledOrdersGraph') !!}",
        //     "deliveriedOrdersGraph":"{!! trans('cpanel/dashboard/statistics.deliveriedOrdersGraph') !!}",
        //     "pickedupOrdersGraph":"{!! trans('cpanel/dashboard/statistics.pickedupOrdersGraph') !!}",
        //     "dineinOrdersGraph":"{!! trans('cpanel/dashboard/statistics.dineinOrdersGraph') !!}",

        //     "successfulOrdersIncomeGraph":"{!! trans('cpanel/dashboard/statistics.successfulOrdersIncomeGraph') !!}",
        //     "canceledOrdersIncomeGraph":"{!! trans('cpanel/dashboard/statistics.canceledOrdersIncomeGraph') !!}",
        //     "deliveriedOrdersIncomeGraph":"{!! trans('cpanel/dashboard/statistics.deliveriedOrdersIncomeGraph') !!}",
        //     "pickedupOrdersIncomeGraph":"{!! trans('cpanel/dashboard/statistics.pickedupOrdersIncomeGraph') !!}",
        //     "dineinOrdersIncomeGraph":"{!! trans('cpanel/dashboard/statistics.dineinOrdersIncomeGraph') !!}",

        //     "successfulOrdersIncomeGraph_users":"{!! trans('cpanel/dashboard/statistics.successfulOrdersIncomeGraph_users') !!}",
        //     "canceledOrdersIncomeGraph_users":"{!! trans('cpanel/dashboard/statistics.canceledOrdersIncomeGraph_users') !!}",
        //     "deliveriedOrdersIncomeGraph_users":"{!! trans('cpanel/dashboard/statistics.deliveriedOrdersIncomeGraph_users') !!}",
        //     "pickedupOrdersIncomeGraph_users":"{!! trans('cpanel/dashboard/statistics.pickedupOrdersIncomeGraph_users') !!}",
        //     "dineinOrdersIncomeGraph_users":"{!! trans('cpanel/dashboard/statistics.dineinOrdersIncomeGraph_users') !!}",

        //     "topOrderedProduct":"{!! trans('cpanel/dashboard/statistics.topOrderedProduct') !!}",
        //     "topProfitableProduct":"{!! trans('cpanel/dashboard/statistics.topProfitableProduct') !!}",
        //     "topProfitableProducts":"{!! trans('cpanel/dashboard/statistics.topProfitableProducts') !!}",
        //     "topProfitableUser":"{!! trans('cpanel/dashboard/statistics.topProfitableUser') !!}",
        //     "topProfitableUsers":"{!! trans('cpanel/dashboard/statistics.topProfitableUsers') !!}",
        //     "topProfitableUser":"{!! trans('cpanel/dashboard/statistics.topProfitableUser') !!}",

        //     "times":"{!! trans('cpanel/dashboard/statistics.times') !!}",
        //     "time":"{!! trans('cpanel/dashboard/statistics.time') !!}",
        //     "ordered":"{!! trans('cpanel/dashboard/statistics.ordered') !!}",
        //     "profites":"{!! trans('cpanel/dashboard/statistics.profites') !!}",

        //     "reviews":"{!! trans('cpanel/dashboard/statistics.reviews') !!}",


        //     "orders":"{!! trans('cpanel/dashboard/statistics.orders') !!}",
        //     "dataloaded":"{!! trans('cpanel/dashboard/statistics.dataloaded') !!}",


        // },

        home:{
            "welcome":"{!! trans('cpanel/dashboard/home.welcome') !!}",
            "noProducts1":"{!! trans('cpanel/dashboard/home.noProducts1') !!}",
            "noProducts2":"{!! trans('cpanel/dashboard/home.noProducts2') !!}",
            "product":"{!! trans('cpanel/dashboard/home.product') !!}",
            "ordered":"{!! trans('cpanel/dashboard/home.ordered') !!}",
            "income":"{!! trans('cpanel/dashboard/home.income') !!}",
            "delivered":"{!! trans('cpanel/dashboard/home.delivered') !!}",
            "orderToday":"{!! trans('cpanel/dashboard/home.orderToday') !!}",
            "ordersToday":"{!! trans('cpanel/dashboard/home.ordersToday') !!}",
            "noNotOrderedProducts":"{!! trans('cpanel/dashboard/home.noNotOrderedProducts') !!}",

        },
        templates:{
            "apply":"{!! trans('cpanel/design/Templates.apply') !!}",
            "livePreview":"{!! trans('cpanel/design/Templates.livePreview') !!}",
            "imgsTrans":"{!! trans('cpanel/design/Templates.imgsTrans') !!}",

            "pizzeria":"{!! trans('cpanel/design/Templates.pizzeria') !!}",
            "americanDiner":"{!! trans('cpanel/design/Templates.americanDiner') !!}",
            "casualDining":"{!! trans('cpanel/design/Templates.casualDining') !!}",
            "fineDining":"{!! trans('cpanel/design/Templates.fineDining') !!}",
            "italian":"{!! trans('cpanel/design/Templates.italian') !!}",
            "burgers":"{!! trans('cpanel/design/Templates.burgers') !!}",
            "sandwiches":"{!! trans('cpanel/design/Templates.sandwiches') !!}",
            "donuts":"{!! trans('cpanel/design/Templates.donuts') !!}",
            "patisserie":"{!! trans('cpanel/design/Templates.patisserie') !!}",
            "desserts":"{!! trans('cpanel/design/Templates.desserts') !!}",
            "fastFood":"{!! trans('cpanel/design/Templates.fastFood') !!}",
            "vegan":"{!! trans('cpanel/design/Templates.vegan') !!}",
            "mexican":"{!! trans('cpanel/design/Templates.mexican') !!}",
            "vegetarian":"{!! trans('cpanel/design/Templates.vegetarian') !!}",
            "mediterranean":"{!! trans('cpanel/design/Templates.mediterranean') !!}",
            "asian":"{!! trans('cpanel/design/Templates.asian') !!}",
            "indian":"{!! trans('cpanel/design/Templates.indian') !!}",
            "steakhouse":"{!! trans('cpanel/design/Templates.steakhouse') !!}",
            "chinese":"{!! trans('cpanel/design/Templates.chinese') !!}",
            "sushiBar":"{!! trans('cpanel/design/Templates.sushiBar') !!}",
            "friedChicken":"{!! trans('cpanel/design/Templates.friedChicken') !!}",
            "seafood":"{!! trans('cpanel/design/Templates.seafood') !!}",
            "icecream":"{!! trans('cpanel/design/Templates.icecream') !!}",
        },
        homePageSections:{
            "intro":"{!! trans('cpanel/design/homePageSections.intro') !!}",
            "info":"{!! trans('cpanel/design/homePageSections.info') !!}",
            "ourStory":"{!! trans('cpanel/design/homePageSections.ourStory') !!}",
            "slideShow":"{!! trans('cpanel/design/homePageSections.slideShow') !!}",
            "gallery":"{!! trans('cpanel/design/homePageSections.gallery') !!}",

            "galleryNoImgs":"{!! trans('cpanel/design/homePageSections.galleryNoImgs') !!}",

            "selectImg":"{!! trans('cpanel/design/homePageSections.selectImg') !!}",

            "slideShowNoContent":"{!! trans('cpanel/design/homePageSections.slideShowNoContent') !!}",
            "openInNewTab":"{!! trans('cpanel/design/homePageSections.openInNewTab') !!}",
            "openInSameTab":"{!! trans('cpanel/design/homePageSections.openInSameTab') !!}",
            "slideShow":"{!! trans('cpanel/design/homePageSections.slideShow') !!}",
            "slideShowNoImg":"{!! trans('cpanel/design/homePageSections.slideShowNoImg') !!}",
            "slideShowTitle":"{!! trans('cpanel/design/homePageSections.slideShowTitle') !!}",
            "slideShowDes":"{!! trans('cpanel/design/homePageSections.slideShowDes') !!}",
            "slideShowLink":"{!! trans('cpanel/design/homePageSections.slideShowLink') !!}",
            "slideShowImgInfoChanged":"{!! trans('cpanel/design/homePageSections.slideShowImgInfoChanged') !!}",

            "intro":"{!! trans('cpanel/design/homePageSections.intro') !!}",
            "selectHomePageIntroImgImg":"{!! trans('cpanel/design/homePageSections.selectHomePageIntroImgImg') !!}",
            "templateIntroImg":"{!! trans('cpanel/design/homePageSections.templateIntroImg') !!}",

            "ourStory":"{!! trans('cpanel/design/homePageSections.ourStory') !!}",
            "selectHomePageInfoImgImg":"{!! trans('cpanel/design/homePageSections.selectHomePageInfoImgImg') !!}",
            "templateInfoImg":"{!! trans('cpanel/design/homePageSections.templateInfoImg') !!}",

            "info":"{!! trans('cpanel/design/homePageSections.info') !!}",
            "selectHomePageOurStoryImgImg":"{!! trans('cpanel/design/homePageSections.selectHomePageOurStoryImgImg') !!}",
            "templateOurStoryImg":"{!! trans('cpanel/design/homePageSections.templateOurStoryImg') !!}",
        },
    }

    </script>




