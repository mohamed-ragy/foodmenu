<nav>
    <div class="nav">
        <div class="announcement">
            <div class="announcementTxtContainer"><div class="announcementTxt"></div></div>
            <div class="ic-close announcementClose" showTooltip="other.close"></div>
        </div>
        <a class="a-unset pointer mX-10 row alnC jstfyC home" href="">
            <img class="h-30 " src="{{ $websiteLogo }}" alt="">
            <div class="font2 fs-103 restaurantName mX-5"></div>
        </a>
        <div class="alnC jstfyC mX-10 navElems">
            <a class="navElem home" href="" showText="other.homePage"></a>
            <div class="navElem navFoodmenu" showText="other.foodmenu"></div>
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
    <div class="ic-close navMobileClose p-10 sticky pointer alnsE top-5"></div>
    <a class="mobileNavElem bold home" href="" showText="other.homePage"></a>
    <div class="mobileNavElem bold mobileNavCategories mobileNavFoodmenu" showText="other.foodmenu"></div>
    <div class="mobileNavBodyElemGroup mobileNavBodyCategoriesMenu">
        @foreach ($website->categories as $category)
        <a class="mobileNavElem category categoryLink" categoryId="{{ $category->id }}"></a>
        @endforeach
    </div>
    @if (Auth::guard('user')->check())
    <div class="mobileNavElem bold userName mobileNavUser"></div>
    <div class="mobileNavBodyElemGroup mobileNavBodyUserMenu">
        <a class="mobileNavElem profile " showText="authentication.profile"></a>
        <a class="mobileNavElem changeEmail " showText="authentication.changeEmail"></a>
        <a class="mobileNavElem changePassword " showText="authentication.changePassword"></a>
        <a class="mobileNavElem orderHistory " showText="orders.ordersHistory"></a>
        <div class="mobileNavElem trackOrder" showText="orders.trackOrder"></div>
        <div class="mobileNavElem logout" showText="authentication.logout"></div>
    </div>

    @else
    <div class="mobileNavElem bold login" showText="authentication.login"></div>
    <div class="mobileNavElem bold signup" showText="authentication.signup"></div>
    @endif
    <a class="mobileNavElem bold aboutus" showText="other.aboutUs"></a>
</div>
