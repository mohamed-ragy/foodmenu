<div class="homeSearchResultsContainer none">
    <div class="homeSearchResults homeSearchResultsContainer_hidden">

    </div>
</div>
<div class="page none page_hidden" page="home">

    <div class="homeIntro">
        <div class="column alnC jstfyS">
            <div class="homeIntroTxt">{{ trans('help/help.homeIntroTxt') }}</div>
            <div class="homeSearchContainer">
                <div class="homeSearchLeft">
                    <div class="fs102 mie-5 ico-search"></div>
                    <div class="searchLoading loading_s vV"></div>
                </div>
                <input type="text" class="homeSearch" placeholder="{{ trans('help/help.searhPlaceHolder') }}">
                <div class="homeSearchRight" >
                    <div class="homeOpenSearchBtn bold w25 h25">/</div>
                </div>
            </div>
        </div>
    </div>
    <div class="homeCatsContainer">
        <a href="/{{ $lang }}/articles/getting-started" class="homeCatContainer openPage" page="cat" cat="getting-started">
            <div class="ico-rocket homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-rocket homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.gettingstarted') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.gettingstarted_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/basics" class="homeCatContainer openPage" page="cat" cat="basics">
            <div class="ico-basics homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-basics homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.basics') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.basics_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/security" class="homeCatContainer openPage" page="cat" cat="security">
            <div class="ico-security homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-security homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.security') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.security_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/ordering-system" class="homeCatContainer openPage" page="cat" cat="ordering-system">
            <div class="ico-orders homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-orders homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.orderingsystem') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.orderingsystem_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/statistics-and-analytics" class="homeCatContainer openPage" page="cat" cat="statistics-and-analytics">
            <div class="ico-statistics_and_analytics homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-statistics_and_analytics homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.statisticsandanalytics') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.statisticsandanalytics_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/billing-and-subscription" class="homeCatContainer openPage" page="cat" cat="billing-and-subscription">
            <div class="ico-plans homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-plans homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.billingandsubscription') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.billingandsubscription_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/products-and-categories" class="homeCatContainer openPage" page="cat" cat="products-and-categories">
            <div class="ico-products homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-products homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.productsandcategories') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.productsandcategories_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/website-users" class="homeCatContainer openPage" page="cat" cat="website-users">
            <div class="ico-users homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-users homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.websiteusers') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.websiteusers_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/website-design" class="homeCatContainer openPage" page="cat" cat="website-design">
            <div class="ico-design homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-design homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.websitedesign') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.websitedesign_des') }}</div>
        </a>
        <a href="/{{ $lang }}/articles/system-and-settings" class="homeCatContainer openPage" page="cat" cat="system-and-settings">
            <div class="ico-settings homeCatContainerIcon">
                <div class="homeCatContainerIcon_after"></div>
                <div class="ico-settings homeCatContainerIcon2"></div>
            </div>
            <div class="fs102 taS mT10 bold">{{ trans('help/help.cats.systemandsettings') }}</div>
            <div class="taS fs09">{{ trans('help/help.cats.systemandsettings_des') }}</div>
        </a>
    </div>
    <div class="homeBotSectionContainer">
        <div class="fs105 bold inter mB10 mX20 homeRecentlyViewedTitle">{{ trans('help/help.recentlyViewed') }}</div>
        <div class="row wrap w100p alnSH jstfyS homeRecentlyViewed"></div>
    </div>
    <div class="homeBotSectionContainer">
        <div class="fs105 bold inter mB10 mX20">{{ trans('help/help.featuredArticles') }}</div>
        <div class="row wrap w100p alnSH jstfyS homeFeaturedArticles"></div>
    </div>

</div>
