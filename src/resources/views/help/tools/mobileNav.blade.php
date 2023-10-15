<div class="mobileNav mobileNav_hidden">
    <div class="mobileNavSearchContainer">
        <div class="mobileNavSearchLeft">
            <div class="fs102 mie-5 ico-search"></div>
            <div class="searchLoading loading_s vV"></div>
        </div>
        <input type="text" class="mobileNavSearch" placeholder="{{ trans('help/help.searhPlaceHolder') }}">
        <div class="mobileNavSearchRight">
            <div class="mobileNavOpenSearchBtn ico-down w25 h25"></div>
        </div>
    </div>
    <div class="mobileNavSearchResultsContainer mobileNavSearchResultsContainer_hidden">
        <div class="mobileNavSearchResults ">

        </div>
    </div>
    <div class="mobileNav_Body">
        <a class="navGroup openPage" page="cat" cat="getting-started" href="/{{ $lang }}/articles/getting-started">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.gettingstarted') }}</div>
            </div>
            <ul class="navArticles" cat="getting-started"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="basics" href="/{{ $lang }}/articles/basics">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.basics') }}</div>
            </div>
            <ul class="navArticles" cat="basics"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="security" href="/{{ $lang }}/articles/security">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.security') }}</div>
            </div>
            <ul class="navArticles" cat="security"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="ordering-system" href="/{{ $lang }}/articles/ordering-system">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.orderingsystem') }}</div>
            </div>
            <ul class="navArticles" cat="ordering-system"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="statistics-and-analytics" href="/{{ $lang }}/articles/statistics-and-analytics">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.statisticsandanalytics') }}</div>
            </div>
            <ul class="navArticles" cat="statistics-and-analytics"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="billing-and-subscription" href="/{{ $lang }}/articles/billing-and-subscription">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.billingandsubscription') }}</div>
            </div>
            <ul class="navArticles" cat="billing-and-subscription"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="products-and-categories" href="/{{ $lang }}/articles/products-and-categories">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.productsandcategories') }}</div>
            </div>
            <ul class="navArticles" cat="products-and-categories"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="website-users" href="/{{ $lang }}/articles/website-users">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.websiteusers') }}</div>
            </div>
            <ul class="navArticles" cat="website-users"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="website-design" href="/{{ $lang }}/articles/website-design">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.websitedesign') }}</div>
            </div>
            <ul class="navArticles" cat="website-design"></ul>
        </a>
        <a class="navGroup openPage" page="cat" cat="system-and-settings" href="/{{ $lang }}/articles/system-and-settings">
            <div class="navGroupHead">
                <div class="ico-right navGroupHeadArrow"></div>
                <div class="navGroupHeadName">{{ trans('help/help.cats.systemandsettings') }}</div>
            </div>
            <ul class="navArticles" cat="system-and-settings"></ul>
        </a>
    </div>
</div>
