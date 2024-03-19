<footer>
    <div class="footerS1 column alnC jstfyC  mX-60 mB-40">
        <div class="restaurantName bold font2 fs-2"></div>
        <div class="row wrap alnC jstfyC mT-5">
            <a target="_blank" soIcon="facebook" class="footerSOIcon ic-facebook"></a>
            <a target="_blank" soIcon="twitter" class="footerSOIcon ic-twitter"></a>
            <a target="_blank" soIcon="linkedin" class="footerSOIcon ic-linkedin"></a>
            <a target="_blank" soIcon="instagram" class="footerSOIcon ic-instagram"></a>
            <a target="_blank" soIcon="youtube" class="footerSOIcon ic-youtube"></a>
        </div>
        <div class="row alnC jstfyC lang pointer mT-20">
            <img class="footerLangFlag" alt="lang"/>
            <span class="footerLangName"></span>
        </div>
    </div>
    <div class="footerS2 mX-40 row wrap alnS jstfyS">
        <div class="column alnS jstfyS mT-5 mB-20 mX-30">
            <div class="bold font2 mB-5" showText="other.otherLinks"></div>
            <a class="footerLink home" showText="other.homePage" href=""></a>
            <a class="footerLink allProducts" showText="other.allProducts" href=""></a>
            <a class="footerLink aboutus" showText="other.aboutUs" ></a>
            <a class="footerLink privacyPolicy" showText="other.privacypolicy" href=""></a>
        </div>
        <div class="column alnS jstfyS mT-5 mB-20 mX-30">
            <div class="bold font2 mB-5" showText="other.foodmenu"></div>
            @foreach ($website->categories as $category)
            <a class="category categoryLink footerLink" categoryId="{{ $category->id }}"></a>
            @endforeach
        </div>
        <div class="column alnS jstfyS mT-5 mB-20 mX-30">
            <div class="bold font2 mB-5" showText="other.account"></div>
            @if(Auth::guard('user')->check())
            <a class="footerLink profile" showText="authentication.profile"></a>
            <a class="footerLink changeEmail" showText="authentication.changeEmail"></a>
            <a class="footerLink changePassword" showText="authentication.changePassword"></a>
            <a class="footerLink orderHistory" showText="orders.ordersHistory"></a>
            <div class="footerLink logout" showText="authentication.logout"></div>

            @else
            <div class="footerLink pointer login" showText="authentication.login"></div>
            <div class="footerLink pointer signup" showText="authentication.signup"></div>
            @endif
            <div class="footerLink pointer trackOrder" showText="orders.trackMyOrder"></div>
        </div>

    </div>
    <div class="footerS3 mX-40 column alnS jstfyS">
        <div class="column alnS jstfyS mT-5 mB-10 restaurantPhoneNumbers">
            <div class="bold font2 mB-5" showText="other.phone"></div>
            <div id="footerPhoneNumbersContainer"></div>
        </div>
        <div class="column alnS jstfyS mT-5 mB-10 w-300 restaurantAddress">
            <div class="bold font2 mB-5" showText="other.address"></div>
            <div id="footerAddressContainer"></div>
        </div>
        <div class="column alnS jstfyS mT-5 mB-10 restaurantEmail">
            <div class="bold font2 mB-5" showText="other.restaurantEmail"></div>
            <div id="footerEmailContainer"></div>
        </div>
    </div>
    <div  class="fs-07 mT-30 mB-10" style="flex-basis: 100%;" >
        <span id="copyRightsNotice"></span>
        <a  href="{{ env('APP_URL') }}" target="_blank" class="mX-2 pointer a-unset"  tooltip="{{ trans('home/home.homeDescription') }}">{{ trans('cpanel/cpanel.public.poweredByFoodMenu') }}</a>
    </div>
</footer>
