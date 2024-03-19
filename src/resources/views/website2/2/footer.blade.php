<footer>
    <div class="column alnS jstfyS w-1024 mxW-100p">
        <div class="footerLinksContainer">
            <a class="footerLink home" showText="other.homePage" href=""></a>
            <span class="footerLinkSplit">|</span>
            <a class="footerLink allProducts" showText="other.allProducts" href=""></a>
            <span class="footerLinkSplit">|</span>
            <a class="footerLink aboutus" showText="other.aboutUs" ></a>
            <span class="footerLinkSplit privacyPolicy">|</span>
            <a class="footerLink privacyPolicy" showText="other.privacypolicy" href=""></a>
        </div>
        <div class="footerLinksContainer footerLinksContainerCats">
            @foreach ($website->categories as $category)
            <a class="category categoryLink footerLink" categoryId="{{ $category->id }}"></a>
            <span class="footerLinkSplit">|</span>
            @endforeach
        </div>
        <div class="footerLinksContainer">
            @if(Auth::guard('user')->check())
            <a class="footerLink profile" showText="authentication.profile"></a>
            <span class="footerLinkSplit">|</span>
            <a class="footerLink changeEmail" showText="authentication.changeEmail"></a>
            <span class="footerLinkSplit">|</span>
            <a class="footerLink changePassword" showText="authentication.changePassword"></a>
            <span class="footerLinkSplit">|</span>
            <a class="footerLink orderHistory" showText="orders.ordersHistory"></a>
            <span class="footerLinkSplit">|</span>
            <div class="footerLink logout pointer" showText="authentication.logout"></div>
            <span class="footerLinkSplit">|</span>

            @else
            <div class="footerLink pointer login" showText="authentication.login"></div>
            <span class="footerLinkSplit">|</span>
            <div class="footerLink pointer signup" showText="authentication.signup"></div>
            <span class="footerLinkSplit">|</span>
            @endif
            <div class="footerLink pointer trackOrder" showText="orders.trackMyOrder"></div>
        </div>
        <div class="footerEmailContainer2">
            <div id="footerPhoneNumbersContainer"></div>
            <div id="footerAddressContainer"></div>
            <div id="footerEmailContainer"></div>
            <div class="row wrap alnS jstfyS mY-10 mX-7">
                <a target="_blank" soIcon="facebook" class="footerSOIcon ic-facebook"></a>
                <a target="_blank" soIcon="twitter" class="footerSOIcon ic-twitter"></a>
                <a target="_blank" soIcon="linkedin" class="footerSOIcon ic-linkedin"></a>
                <a target="_blank" soIcon="instagram" class="footerSOIcon ic-instagram"></a>
                <a target="_blank" soIcon="youtube" class="footerSOIcon ic-youtube"></a>
            </div>
        </div>
        <div class="row alnC jstfyC alnsE lang pointer mT-20">
            <img class="footerLangFlag" alt="lang"/>
            <span class="footerLangName"></span>
        </div>
    </div>

    <div  class="fs-07 mT-100 mB-10" >
        <span id="copyRightsNotice"></span>
        <a  href="{{ env('APP_URL') }}" target="_blank" class="mX-2 pointer a-unset"  tooltip="{{ trans('home/home.homeDescription') }}">{{ trans('cpanel/cpanel.public.poweredByFoodMenu') }}</a>
    </div>
</footer>
