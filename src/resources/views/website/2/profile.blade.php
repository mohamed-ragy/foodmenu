<div class="page none" id="profilepage">
    <div class="profilePageMenu">
        <div class="userName p-10 bold fs-105"></div>
        <a class="profile profilePageElem" showText="authentication.profile"></a>
        <a class="changeEmail profilePageElem" showText="authentication.changeEmail"></a>
        <a class="changePassword profilePageElem" showText="authentication.changePassword"></a>
        <a class="orderHistory profilePageElem" showText="orders.ordersHistory"></a>
        <div class="logout profilePageElem" showText="authentication.logout"></div>
    </div>
    <div class="profilePageBody">
        <div  id="profilePage-profile" class="relative w-100p mnH-300 none">
            <div id="profile-Loading" class="loading none zx-5 "><div></div><div></div><div></div></div>
            <div class="column alnC jstfyC w-100p m-a">
                <div showtext="authentication.profile" class="popupContentTitle" id="profileTitle"></div>
                <div id="profileSuccess" showtext="authentication.profileSaved" class="cS taC mX-10 mT-20 none"></div>
                <div class="column alnC jstfyS w-100p m-a" id="profileContainer">
                    <div class="column alnS jstfyS">
                        <input type="text" id="profile-name" showPlaceholder="authentication.name" class="mX-5 mT-10 profileInput">
                        <div class="fs-08 mX-5 cE vH w-200 profileFail" id="profileFailname" >a</div>
                    </div>
                    <div class="column alnS jstfyS">
                        <input type="text" id="profile-phoneNumber" showPlaceholder="authentication.phoneNumber" class="mX-5 mT-10 profileInput">
                        <div class="fs-08 mX-5 cE vH w-200 profileFail" id="profileFailPhoneNumber" >a</div>
                    </div>
                    <div class="column alnC jstfyS w-100p">
                        <input  type="text" id="profile-address" showPlaceholder="authentication.address" class="mX-15 mT-10 w-100-40 profileInput">
                        <div class="fs-08 alnsS mX-10 w-100-20 cE vH profileFail" id="profileFailAddress" >a</div>
                    </div>
                    <div class="w-100-20 m-10 column jstfyC alnC">
                        <div class="fs-09 alnsS" showtext="authentication.mylocation"></div>
                        <div class="mB--40 mX-6 mT-10 row alnC jstfyC alnsE zx-2 profileMapBtnsContainer">
                            <button class="mX-3 p-4 row alnC jstfyC" Showtooltip="authentication.currentLocation" id="profile-mylocation"><span class="ic-myLocation"></span></button>
                            <button class="mX-3 p-4 row alnC jstfyC" Showtooltip="authentication.unsetLocation" id="profile-unsetLocation"><span class="ic-close"></span></button>
                        </div>
                        <div id="profile-location" class="zx-1 m-10 w-100-10 h-250" ></div>
                    </div>
                    <button showtext="authentication.save" id="profile-btn" class="mX-5 mY-10"></button>
                    <div id="profileFail" showtext="authentication.profileSaveFail" class="cE taC mX-10 mT-20 fs-09 vH"></div>
                </div>
            </div>

        </div>
        <div  id="profilePage-changeEmail" class="relative w-100p mnH-300 none">
            <div id="changeEmail-Loading" class="loading none zx-5"><div></div><div></div><div></div></div>
            <div class="column alnC jstfyC m-a">
                <div showtext="authentication.changeEmail" class="popupContentTitle" id="changeEmailTitle"></div>
                <div id="changeEmailSuccess" showtext="authentication.changeEmailSaved" class="cS taC mX-10 mT-20 none"></div>
                <div class="column alnC jstfyS" id="changeEmailContainer">
                    <div class="column alnC jstfyS mT-20">
                        <input type="text" id="changeEmail-email" showPlaceholder="authentication.newEmail" class="mX-5 mY-10">
                        <div id="changeEmailFail" class="fs-08 cE taC mX-5 w-200 vH">a</div>
                        <button showtext="authentication.save" id="changeEmail-btn" class="mX-5 mY-10"></button>
                    </div>
                </div>
            </div>
        </div>
        <div  id="profilePage-changePassword" class="relative w-100p mnH-300 none">
            <div id="changePassword-Loading" class="loading none zx-5"><div></div><div></div><div></div></div>
            <div class="column alnC jstfyC m-a">
                <div showtext="authentication.changePassword" class="popupContentTitle" id="changePasswordTitle"></div>
                <div id="changePasswordSuccess" showtext="authentication.changePasswordSaved" class="cS taC mX-10 mT-20 none"></div>
                <div class="column alnC jstfyS" id="changePasswordContainer">
                    <div class="column alnC jstfyS mT-20">
                        <input type="password" id="changePassword-password" showPlaceholder="authentication.newPassword" class="mX-5 mY-10">
                        <div id="changePasswordFail" class="fs-08 cE taC mX-5 w-200 vH">a</div>
                        <button showtext="authentication.save" id="changePassword-btn" class="mX-5 mY-10"></button>
                    </div>
                </div>
            </div>
        </div>
        <div  id="profilePage-ordersHistory" class="relative w-100p mnH-300 none">
            <div id="noOrderHistory" class="taC none" showText="orders.noOrdersInHistory"></div>
            <div class="column alnC w-100p jstfyS" id="orderHistoryContainer">

            </div>
            <div id="ordersHistory-Loading" class="loadingOrderHistory"><div></div><div></div><div></div></div>
        </div>
    </div>
</div>
