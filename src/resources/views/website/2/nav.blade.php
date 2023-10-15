<nav>
    <div class="nav">
        <div class="announcement">
            <div class="announcementTxtContainer"><div class="announcementTxt"></div></div>
            <div class="ic-close announcementClose" showTooltip="other.close"></div>
        </div>
        <a class="a-unset pointer mX-10 row alnC jstfyC c1 home" href="">
            <img class="h-40 h-30-1024" src="{{ $websiteLogo }}" alt="">
            <div class="font2 fs-205 fs-105-1024 restaurantName bold mX-5"></div>
        </a>
        <div class="alnC jstfyS mX-10 navElems">
            {{-- <a class="navElem home" href="" showText="other.homePage"></a> --}}
            <div class="navElem navFoodmenu" showText="other.foodmenu"></div>
            <div class="navElem trackOrder" showText="orders.trackOrder"></div>
            <a class="navElem aboutus" showText="other.aboutUs" href=""></a>
            @if (Auth::guard('user')->check())
                <div class="navElem userName navUser"></div>
            @else
            <div class="navElem login" showText="authentication.login"></div>
            <div class="navElem signup" showText="authentication.signup"></div>
            @endif
        </div>
        <div class="mobileNavElems">
            <div class="navMobile pointer mX-10 fs-105 ic-menu"></div>
        </div>
    </div>
    <div class="navUserMenu none">
        <a class="navUserMenuElem  profile" showText="authentication.profile"></a>
        <a class="navUserMenuElem  changeEmail" showText="authentication.changeEmail"></a>
        <a class="navUserMenuElem  changePassword" showText="authentication.changePassword"></a>
        <a class="navUserMenuElem  orderHistory" showText="orders.ordersHistory"></a>
        <div class="navUserMenuElem trackOrder" showText="orders.trackOrder"></div>
        <div class="navUserMenuElem logout" showText="authentication.logout"></div>
    </div>
    <div class="navFoodmenuMenu none">
        @foreach ($website->categories as $category)
            <a class="navFoodmenuElem category categoryLink" categoryId="{{ $category->id }}"></a>
        @endforeach
    </div>

</nav>


<div class="navMobileBody">
    <a class="mobileNavElem bold home" href="" showText="other.homePage"></a>
    <div class="mobileNavElem pY-0" >
        <div showText="other.foodmenu" class="bold mobileNavCategories mobileNavFoodmenu mY-10"></div>
        <div class="mobileNavBodyElemGroup mobileNavBodyCategoriesMenu">
            @foreach ($website->categories as $category)
            <a class="mobileNavGroupElem category categoryLink" categoryId="{{ $category->id }}"></a>
            @endforeach
        </div>
    </div>

    @if (Auth::guard('user')->check())
    <div class="mobileNavElem pY-0">
        <div class="bold userName mobileNavUser mY-10"></div>
        <div class="mobileNavBodyElemGroup mobileNavBodyUserMenu">
            <a class="mobileNavGroupElem profile " showText="authentication.profile"></a>
            <a class="mobileNavGroupElem changeEmail " showText="authentication.changeEmail"></a>
            <a class="mobileNavGroupElem changePassword " showText="authentication.changePassword"></a>
            <a class="mobileNavGroupElem orderHistory " showText="orders.ordersHistory"></a>
            <div class="mobileNavGroupElem trackOrder" showText="orders.trackOrder"></div>
            <div class="mobileNavGroupElem logout" showText="authentication.logout"></div>
        </div>
    </div>

    @else
    <div class="mobileNavElem bold login" showText="authentication.login"></div>
    <div class="mobileNavElem bold signup" showText="authentication.signup"></div>
    @endif
    <div class="mobileNavElem bold trackOrder" showText="orders.trackOrder"></div>
    <a class="mobileNavElem bold aboutus" showText="other.aboutUs"></a>
    <div class="mobileNavElem row alnC jstfyC lang">
        <img class="footerLangFlag" alt="lang"/>
        <span class="footerLangName"></span>
    </div>
</div>
