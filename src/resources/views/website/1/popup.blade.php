<div class="popupWindowCover none">
    <div class="popup">
        <div id="popupClose" class="ic-close "></div>

        <div id="collectReviews-Loading" class="loading none zx-5"></div>
        <div  id="collectReviews-popup" class="popupContent  w-600">
            <div class="column alnC jstfyC m-a">
                <div showtext="reviews.collectReviewsTitle" class="popupContentTitle collectReviewsTitle"></div>
                <div class="cE collectReviewsError none fs-08"></div>
                <div class="collectReviewsContainer w-100p"></div>
            </div>
            <button id="collectReviews-Btn">
                <span class="mX-2" showText="reviews.postReview"></span>
            </button>
        </div>

        <div  id="language-popup" class="popupContent">
            <div class="column alnC jstfyC m-a">
                <div showtext="other.selectLanguage" class="popupContentTitle"></div>
                <div id="langSelectContainer" class="m-10 column alnS jstfyC"></div>
            </div>
        </div>

        <div  id="login-popup" class="popupContent">
            <div id="login-Loading" class="loading none zx-5"></div>
            <div class="column alnC jstfyC m-a">
                <div showtext="authentication.login" class="popupContentTitle"></div>
                <div id="signupSuccess" class="taC fs-08 cS vH"></div>
                <div id="loginFail" showtext="authentication.loginFail" class="taC fs-08 cE vH"></div>
                <div id="loginWarning" class="taC fs-08 cW vh"></div>
                <div class="column alnS jstfyS">
                    <input type="text" id="login-email" showPlaceholder="authentication.email" class="mX-5 mY-10 loginInput">
                </div>
                <div class="column alnS jstfyS">
                    <input type="password" id="login-password" showPlaceholder="authentication.password" class="mX-5 mY-10 loginInput">
                    <div class="row alnsS alnBL pointer jstfyC mX-5 fs-08 mB-5 rememberme">
                        <span class="ic-check0"></span> <span class="mX-5" showtext="authentication.rememberMe"></span>
                    </div>
                </div>
                <button showtext="authentication.login" id="login-btn" class="mX-5 mY-20"></button>
                <div class="fs-08 mY-10 column alnC jstfyC">
                    <div class="pointer hvr-ul forgetPassword" showtext="authentication.forgetPasswordQ"></div>
                    <div class="pointer hvr-ul signup" showtext="authentication.dontHaveAccountQ"></div>
                </div>
            </div>
        </div>

        <div  id="signup-popup" class="popupContent">
            <div id="signup-Loading" class="loading none zx-5"></div>
            <div class="column alnC jstfyC m-a w-100p">
                <div showtext="authentication.signup" class="popupContentTitle"></div>
                <div class="column alnS jstfyS">
                    <input type="text" id="signup-email" showPlaceholder="authentication.email" class="mX-5 mT-10 sigupInput">
                    <div class="fs-08 mX-5 cE vH w-200 signupFail" id="signupFailEmail" >a</div>
                </div>
                <div class="column alnS jstfyS">
                    <input type="password" id="signup-password" showPlaceholder="authentication.password" class="mX-5 mT-10 sigupInput">
                    <div class="fs-08 mX-5 cE vH w-200 signupFail" id="signupFailPassword" >a</div>
                </div>
                <div class="column alnS jstfyS">
                    <input type="text" id="signup-name" showPlaceholder="authentication.name" class="mX-5 mT-10 sigupInput">
                    <div class="fs-08 mX-5 cE vH w-200 signupFail" id="signupFailname" >a</div>
                </div>
                <div class="column alnS jstfyS">
                    <input type="text" id="signup-phoneNumber" showPlaceholder="authentication.phoneNumber" class="mX-5 mT-10 sigupInput">
                    <div class="fs-08 mX-5 cE vH w-200 signupFail" id="signupFailPhoneNumber" >a</div>
                </div>
                <div class="column alnC jstfyS w-100p">
                    <input  type="text" id="signup-address" showPlaceholder="authentication.address" class="mX-15 mT-10 w-100-40 sigupInput">
                    <div class="fs-08 alnsS mX-10 w-100-20 cE vH signupFail" id="signupFailAddress" >a</div>
                </div>
                <div class="column alnC jstfyC mT-10 privacyPolicyHideShow">
                    <div class=" row alnBL jstfyC mX-5 fs-08 mB-5">
                        <span  id="signup-privacyPolicy" class="pointer">
                            <span class="ic-check0 mX-5"></span>
                            <span showtext="other.agreeWith"></span>
                        </span>
                            &ThinSpace;<a showtext="other.privacypolicy" target="_blank" class="ul privacyPolicy"></a>
                    </div>
                    <div class="fs-08 mX-5 cE vH signupFail" showtext="authentication.privacypolicyError" id="signupFailPrivacypolicy" ></div>
                </div>

                <button showtext="authentication.signup" id="signup-btn" class="mX-5 mY-10"></button>
                <div class="fs-08 mY-10 column alnC jstfyC">
                    <div class="pointer hvr-ul login" showtext="authentication.haveAccountLogin"></div>
                </div>
            </div>
        </div>

        <div id="forgetPassword-Loading" class="loading none zx-5"></div>
        <div  id="forgetPassword-popup" class="popupContent">
            <div class="column alnC jstfyS m-a">
                <div showtext="authentication.emailForResetPassword" id="forgetPassword-title" class="mB-5 fs-09"></div>
                <input type="text" id="forgetPassword-email" showPlaceholder="authentication.email" class="mX-5 mY-10 ">
                <button showtext="authentication.resetPassword" id="forgetPassword-btn" class="mX-5 mY-10"></button>
                <div id="forgetPasswordSuccess" showtext="authentication.resetPasswordemailSent" class="forgetPasswordResponse fs-09 cS taC mX-5 vH none"></div>
                <div id="forgetPasswordFail" class="forgetPasswordResponse fs-08 cE taC mX-5 vH">a</div>
            </div>
        </div>

        <div id="createNewPassword-Loading" class="loading none zx-5"></div>
        <div  id="createNewPassword-popup" class="popupContent">
            {{-- <div id="createNewPasswordFail" class="fs-09 cE taC mX-5  mT-20"></div> --}}
            <div class="column alnC jstfyS none m-a" id="createNewPasswordContainer">
                <div class="column alnC jstfyS ">
                    <input type="password" id="createNewPassword-password" showPlaceholder="authentication.newPassword" class="mX-5 mY-10">
                    <div id="createNewPasswordFail" class="fs-08 cE taC mX-5 vH w-200">a</div>
                    <button showtext="authentication.createNewPassword" id="createNewPassword-btn" class="mX-5 mY-10"></button>
                </div>
            </div>

        </div>

        <div id="cart-Loading" class="loading none  zx-5"></div>
        <div  id="cart-popup" class="popupContent w-600">
            <div class="column alnC w-100p jstfyS">
                <div class="popupContentTitle">
                    <span  showText="orders.cart"></span>

                </div>
                <div id="cartItemsContainer"></div>
                {{-- <div class="w-100-20 m-10" id="cartFooterContainer"> --}}
                    <button class="cartPlaceOrderBtn">
                        <span class="mX-2" showText="orders.placeOrder"></span>
                        <span class="mX-2" id="cartTotal"></span>
                    </button>
                {{-- </div> --}}
            </div>
        </div>

        <div id="addToCart-Loading" class="loading none zx-5"></div>
        <div  id="addToCart-popup" class="popupContent">
            <div class="column alnC w-100p jstfyC m-a">
                <div id="addToCart-productName" class="popupContentTitle mX-10"></div>
                <div id="addToCart-optionsQtyContainer">
                    <div id="addToCartOptionsContainer" class="w-100p"></div>

                    <div class="addToCartOptionContainer">
                        <div class="addToCartOptionQty">
                            <div showText="orders.quantity" class="mX-5"></div>
                            <div class="addToCartQtyContainer">
                                <div class="addToCartQtyBtn addToCartMinus"><span class="ic-minus"></span></div>
                                <input  id="addToCartQty" value="1" readonly>
                                <div class="addToCartQtyBtn addToCartPlus"><span class="ic-plus"></span></div>
                            </div>
                        </div>
                    </div>

                    <textarea id="addToCartItemNotice" maxlength="150" rows="3" showPlaceholder="orders.itemNotice"></textarea>
                </div>
                <button id="addToCart-btn">
                    <span class="mX-2"  showtext="orders.addToCart" ></span>
                    <span class="mX-2" id="addToCartPrice"></span>
                </button>
            </div>

        </div>

        <div id="placeOrder-Loading" class="loading none zx-5"></div>
        <div  id="placeOrder-popup" class="popupContent  w-600">
            <div id="placeOrder-orderTypeContainer">
                <div class="placeOrder-howReceiveOrder" showText="orders.howReceiveOrder"></div>
                <div class="row wrap w-100p alnC jstfyC">
                    <div class="placeOrder-orderType" orderType="delivery">
                        <div class="ic-delivery fs-2 m-5"></div>
                        <div showText="orders.homeDelivery"></div>
                    </div>
                    <div class="placeOrder-orderType" orderType="pickup">
                        <div class="ic-pickup fs-2 m-5"></div>
                        <div showText="orders.orderPickup"></div>
                    </div>
                </div>
            </div>
            <div class="placeOrderWarningContainer cW none column alnC justfyC mY-20 w-100-40 mX-20">
                <div class="ic-warning fs-2 mB-5"></div>
                <div id="placeOrderWarning" class="mX-20 taC"></div>
            </div>
            <div class="placeOrderSucessContainer cS none column alnC justfyC mY-20 w-100-40 mX-20">
                <div class="ic-sucess fs-3 mB-10"></div>
                <div id="placeOrderSucess" class="mX-20 taC"></div>
                <button id="placeOrder-trackOrderBtn" class="trackOrder mT-20" orderId="" showText="orders.trackOrder"></button>
            </div>
            <div class="placeOrderErrorContainer cE none column alnC justfyC mY-20 w-100-40 mX-20">
                <div class="ic-error fs-3 mB-10"></div>
                <div id="placeOrderError" class="mX-20 taC"></div>
            </div>
            <div class="placeOrder-orderDetails" id="placeOrderContactInfoContainer">
                <span class="placeOrder-orderDetailsTitle" showText="orders.contactInfo"></span>
                <div class="column alnS jstfyS">
                    <input type="text" id="placeOrder-phoneNumber" showPlaceholder="orders.youPhoneNumber" class="placeOrderInput mX-5 mT-5 ">
                    <div class="fs-08 mX-5 cE vH w-200 placeOrderFail" id="placeOrderFailPhoneNumber" >a</div>
                </div>
                <div class="column alnC jstfyS w-100p deliveryElem">
                    <input  type="text" id="placeOrder-address" showPlaceholder="orders.yourAddress" class="placeOrderInput mX-15 mT-5 w-100-40 ">
                    <div class="fs-08 alnsS mX-10 w-100-20 cE vH placeOrderFail" id="placeOrderFailAddress" >a</div>
                </div>
                <div class="w-100-20 m-10 column jstfyC alnC deliveryElem">
                    <div class="fs-08 alnsS mX-10" showtext="orders.orderLocation"></div>
                    <div class="mB--40 mX-10 mT-10 row alnC jstfyC alnsE zx-2 profileMapBtnsContainer">
                        <button class="mX-3 p-5 row alnC jstfyC" Showtooltip="authentication.currentLocation" id="placeOrder-mylocation"><span class="ic-myLocation"></span></button>
                        <button class="mX-3 p-5 row alnC jstfyC" Showtooltip="authentication.unsetLocation" id="placeOrder-unsetLocation"><span class="ic-close"></span></button>
                    </div>
                    <div id="placeOrder-location" class="zx-1 m-10 w-100-20 h-250" ></div>
                </div>
            </div>
            <div class="placeOrder-orderDetails" id="paymentMethodContainer">
                <span class="placeOrder-orderDetailsTitle" showText="orders.paymentMethod"></span>
                <div class="fs-08 mX-10 cE vH w-100-20 alnsC placeOrderFail" id="placeOrderFailPaymentMethod" >a</div>
                <div class="w-100p row wrap alnC jstfyC deliveryElem">
                    <div class="paymentMethod" paymentMethod="cashOnDelivery">
                        <span showText="orders.cashOnDelivery"></span>
                        <span class="ic-check0 paymentMethodIcoCheck"></span>
                    </div>
                    <div class="paymentMethod" paymentMethod="cardOnDelivery">
                        <span showText="orders.cardOnDelivery"></span>
                        <span class="ic-check0 paymentMethodIcoCheck"></span>
                    </div>
                    </div>
                    <div class="w-100p row wrap alnC jstfyC pickupElem">
                    <div class="paymentMethod" paymentMethod="cashOnPickup">
                        <span showText="orders.cashOnPickup"></span>
                        <span class="ic-check0 paymentMethodIcoCheck"></span>
                    </div>
                    <div class="paymentMethod" paymentMethod="cardOnPickup">
                        <span showText="orders.cardOnPickup"></span>
                        <span class="ic-check0 paymentMethodIcoCheck"></span>
                    </div>
                </div>
            </div>
            <div class="placeOrder-orderDetails" id="placeOrderReceiptContainerContainer">
                <span class="placeOrder-orderDetailsTitle" showText="orders.orderReceipt"></span>
                <div class="fs-08 mX-10 cE vH w-100-20 alnsC placeOrderFail" id="placeOrderFailReceipt" >a</div>
                <div class=" mX-5 alnsE alnsC-400 column alnE jstfyC">
                    <div class="havePromocode pointer ul c1 alnsE fs-09 alnsC-400 " showText="orders.havePromocode"></div>
                    <div class="row column-400 alnSH alnsC-400  jstfyC promocodeForm none">
                        <div id="promocode-Loading" class="loadingPromocode none zx-5"></div>
                        <input showPlaceholder="orders.promoCode" class="" type="text" name="" id="promocodeCode">
                        <button class="" showText="orders.apply" id="promocodeApplyBtn"></button>
                        <div class="promocodeApplied none"></div>
                    </div>
                    <div class="w-300 w-200-400 fs-08 cE vH alnsS placeOrderFail" id="placeOrderFailPromocode" >a</div>
                </div>
                <div  id="placeOrderReceiptContainer"></div>

            </div>
            <div class="placeOrder-orderDetails">
                <span class="placeOrder-orderDetailsTitle" showText="orders.orderNotice"></span>
                <textarea id="placeOrder-orderNotice" maxlength="150" class="mX-15 w-100-40" rows="5" showPlaceholder="orders.orderNoticePlaceholder"></textarea>
            </div>
            <button id="PlaceOrder-Btn">
                <span class="mX-2" showText="orders.placeOrder"></span>
                <span class="mX-2" id="placeOrderTotal"></span>
            </button>
        </div>

        <div id="trackOrder-Loading" class="loading none  zx-5"></div>
        <div  id="trackOrder-popup" class="popupContent  w-600">
            <div class="column alnC w-100p jstfyS">
                <div showtext="orders.wrongOrderNumber" class="trackOrderWrongNumber taC fs-08 cE mB-5 vH"></div>
                <input showPlaceholder="orders.orderNumber" id="trackOrderNumber" type="text"/>
                <button id="trackOrderBtn" showText="orders.findOrder" class="mY-20"></button>
                <div class="trackOrderContainer none"></div>
            </div>
        </div>

        <div id="deleteChatMsg-Loading" class="loading none zx-5"></div>
        <div  id="deleteChatMsg-popup" class="popupContent">
            <div showText="liveChat.deleteConfirmMsg" class="mX-5 taC mY-20"></div>
                <div class="liveChatUserMsg  alnsC m-a ">
                    <div class="liveChatUserMsgText"></div>
                    <div class="liveChatUserMsgInfo">
                        <div class="mX-5"></div>
                        <div></div>
                    </div>
                </div>
            <div class="mT-20 row alnC jstfyC">
                <button showText="liveChat.deleteMsg" class="mX-10 bgcE btn_error" id="deleteChatMsg-delete"></button>
                <button showText="liveChat.cancelDeleteMsg" class="mX-10" id="deleteChatMsg-cancel"></button>
            </div>

        </div>
        <div  id="cookiesMsg-popup" class="popupContent">
            <div class="column alnC jstfyC">
                <div showText="other.cookiesMsg" class="mX-10 taC mY-20"></div>
                <button showText="other.cookiesMsgBtn" class="mX-10" id="cookiesMsg-agreeBtn"></button>
            </div>

        </div>
        <img class="popupImg" >
    </div>
</div>
