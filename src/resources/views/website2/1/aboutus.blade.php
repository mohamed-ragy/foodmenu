<div class="page none " id="aboutus">
    <div class="column alnC jstfyC m-a w-100-20 mX-10">
        <div class="mY-20 w-100p">
            <div  class="font2 taC w-100p fs-205 restaurantName"></div>
            <div class="mY-5 mB-10 w-100p taC">{{ $website->websiteDescriptions[$lang] }}</div>
        </div>

        <div id="restaurantLocationMap" class="w-100-20 mY-20 mX-10 h-300"></div>

        <div class=" aboutuseSecContainer" id="aboutusContactusContainer">
            <div showText="other.contactUs" class="aboutuseSecTitle"></div>
            <div id="aboutusPhoneNumbersContainer" class="mX-20 restaurantPhoneNumbers">
                <div showText="other.phone" class="bold mT-5"></div>
            </div>
            <div id="aboutusAddressContainer" class="mX-20 restaurantAddress">
                <div showText="other.address" class="bold mT-5"></div>
            </div>
            <div id="aboutusrestaurantEmailContainer" class="mX-20 restaurantEmail">
                <div showText="other.restaurantEmail" class="bold mT-5"></div>
            </div>
            <div id="aboutusFollowusContainer" class="mX-20">
                <div showText="other.followUsOn" class="bold mT-5"></div>
                <div class="w-100 row wrap alnS jstfyS">
                    <a target="_blank" soIcon="facebook" class="aboutusSOIcon ic-facebook"></a>
                    <a target="_blank" soIcon="twitter" class="aboutusSOIcon ic-twitter"></a>
                    <a target="_blank" soIcon="linkedin" class="aboutusSOIcon ic-linkedin"></a>
                    <a target="_blank" soIcon="instagram" class="aboutusSOIcon ic-instagram"></a>
                    <a target="_blank" soIcon="youtube" class="aboutusSOIcon ic-youtube"></a>
                </div>
            </div>
        </div>

        <div class=" aboutuseSecContainer" id="aboutusDeliveryWorkingHoursContainer">
            <div showText="other.deliveryWorkingHours" class="aboutuseSecTitle"></div>
            <div id="aboutusDeliveryWorkingHours" class="workingHoursContainer"></div>

        </div>

        <div class=" aboutuseSecContainer" id="aboutusPickupWorkingHoursContainer">
            <div showText="other.pickupWorkingHours" class="aboutuseSecTitle"></div>
            <div id="aboutusPickupWorkingHours" class="workingHoursContainer"></div>
        </div>

        <div class=" aboutuseSecContainer" id="aboutusDineinWorkingHoursContainer">
            <div showText="other.dineinWorkingHours" class="aboutuseSecTitle"></div>
            <div id="aboutusDineinWorkingHours" class="workingHoursContainer"></div>

        </div>
    </div>
</div>
