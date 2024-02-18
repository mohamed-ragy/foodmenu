//////////signup
$('html,body').on('click','.signup',(e) => {
    e.stopImmediatePropagation();
    $('.signupFail').addClass('vH');
    $('#signupFailPrivacypolicy').addClass('vH');
    $('.sigupInput').removeClass('inputError')
    $('#signup-privacyPolicy').children().each((i,elem) => {
        $(elem).hasClass('ic-check1') ? $(elem).removeClass('ic-check1').addClass('ic-check0') : null;
    })
    $('.sigupInput').val('');
    showPopup($('#signup-popup'),$('#signup-email'));
})
$('html,body').on('keypress','.sigupInput',(e) => {
    e.which == 13 ? $('#signup-btn').trigger('click') : null;
})
$('#signup-privacyPolicy').on('click',(e) => {
    $('#signup-privacyPolicy').children().each((i,elem) => {
        if($(elem).hasClass('ic-check0')){
            $(elem).removeClass('ic-check0').addClass('ic-check1');
        }else if($(elem).hasClass('ic-check1')){
            $(elem).removeClass('ic-check1').addClass('ic-check0');
        }
    });
})
$('#signup-btn').on('click',(e) => {
    let privacyPolicyCheck = 0;
    if(website.privacyPolicy == '' || website.privacyPolicy == null){
        privacyPolicyCheck = 1;
    }else{
        $('#signup-privacyPolicy').children().each((i,elem) => {
            if($(elem).hasClass('ic-check1')){
                privacyPolicyCheck = 1;
            }
        })
    }

    showLoading($('#signup-Loading'))
    $('.signupFail').addClass('vH');
    $('#signupFailPrivacypolicy').addClass('vH');
    $('.sigupInput').removeClass('inputError');
    $.ajax({
        url:'/user/singup',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            email:$('#signup-email').val(),
            password:$('#signup-password').val(),
            name:$('#signup-name').val(),
            phoneNumber:$('#signup-phoneNumber').val(),
            address:$('#signup-address').val(),
            privacyPolicyCheck:privacyPolicyCheck,
        },
        success:(response) => {
            hideLoading($('#signup-Loading'))
            if(response.signupstats == 0){
                if(response.error.address){
                    $('#signupFailAddress').text(texts.authentication[response.error.address[0]])
                    $('#signupFailAddress').removeClass('vH');
                    $('#signup-address').addClass('inputError');
                    $('#signup-address').focus();
                }else{
                    $('#signupFailAddress').addClass('vH');
                    $('#signup-address').removeClass('inputError');
                }
                if(response.error.phoneNumber){
                    $('#signupFailPhoneNumber').text(texts.authentication[response.error.phoneNumber[0]])
                    $('#signupFailPhoneNumber').removeClass('vH');
                    $('#signup-phoneNumber').addClass('inputError');
                    $('#signup-phoneNumber').focus();
                }else{
                    $('#signupFailPhoneNumber').addClass('vH');
                    $('#signup-phoneNumber').removeClass('inputError');
                }
                if(response.error.name){
                    $('#signupFailname').text(texts.authentication[response.error.name[0]])
                    $('#signupFailname').removeClass('vH');
                    $('#signup-name').addClass('inputError');
                    $('#signup-name').focus();
                }else{
                    $('#signupFailname').addClass('vH');
                    $('#signup-name').removeClass('inputError');
                }
                if(response.error.password){
                    $('#signupFailPassword').text(texts.authentication[response.error.password[0]])
                    $('#signupFailPassword').removeClass('vH');
                    $('#signup-password').addClass('inputError');
                    $('#signup-password').focus();
                }else{
                    $('#signupFailPassword').addClass('vH');
                    $('#signup-password').removeClass('inputError');
                }
                if(response.error.email){
                    $('#signupFailEmail').text(texts.authentication[response.error.email[0]])
                    $('#signupFailEmail').removeClass('vH');
                    $('#signup-email').addClass('inputError');
                    $('#signup-email').focus();
                }else{
                    $('#signupFailEmail').addClass('vH');
                    $('#signup-email').removeClass('inputError');
                }
                if(response.error.privacyPolicy){
                    $('#signupFailPrivacypolicy').removeClass('vH');
                }else{
                    $('#signupFailPrivacypolicy').addClass('vH');
                }
            }else if(response.signupstats == 1){
                $('.signupFail').addClass('vH');
                $('#loginFail').addClass('vH');
                $('.sigupInput').removeClass('inputError');
                $('#signupSuccess').text(texts.authentication.accountCreated)
                showPopup($('#login-popup'),$('#login-email'),() => {
                    $('#signupSuccess').removeClass('vH')
                    $('#login-email').val($('#signup-email').val())
                    $('.sigupInput').val('');
                })
            }
        }
    });
})
$('#signup-phoneNumber').on('input change',() => {
    $('#signup-phoneNumber').val($('#signup-phoneNumber').val().replace( /[^\d+() -]/, '' ));
});
////logout
$('html,body').on('click','.logout',(e) => {
    e.stopImmediatePropagation();
    userStatus({'status': 'user_loggingOut'});
    window.location.href = '/user/logout'
});
/////////////login
$('html,body').on('click','.login',(e) => {
    e.stopImmediatePropagation();
    $('#loginFail').addClass('vH');
    $('#signupSuccess').addClass('vH');
    $('#loginWarning').addClass('vH');
    $('.rememberme').children().each((i,elem) => {
        $(elem).hasClass('ic-check1') ? $(elem).removeClass('ic-check1').addClass('ic-check0') : null;
    })
    $('.loginInput').removeClass('inputError')
    $('.loginInput').val('')
    showPopup($('#login-popup'),$('#login-email'))

});
$('#login-email,#login-password').keypress((e) => {
    e.which == 13 ?  $('#login-btn').trigger('click') : null;
})
$('html,body').on('click','.rememberme',(e) => {
    e.stopImmediatePropagation();
    $('.rememberme').children().each((i,elem) => {
        $(elem).hasClass('ic-check0') ? $(elem).removeClass('ic-check0').addClass('ic-check1') : $(elem).hasClass('ic-check1') ? $(elem).removeClass('ic-check1').addClass('ic-check0') : null;
    })
});
$('#login-btn').on('click',(e) => {
    showLoading($('#login-Loading'))
    $('.loginInput').removeClass('inputError')
    $('#loginFail').addClass('vH')
    $('#signupSuccess').addClass('vH')
    $('#loginWarning').addClass('vH')
    let loginCart = null;
    if(window.loginWithCart == true){
        if(typeof Cookies.get('cart') !== 'undefined'){
            loginCart = Cookies.get('cart');
        }
    }
    let rememberMe = 0;
    $('.rememberme').children().each((i,elem) => {
        if($(elem).hasClass('ic-check1')){
            rememberMe = 1;
        }
    })
    $.ajax({
        url:'/user/login',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            email:$('#login-email').val(),
            password:$('#login-password').val(),
            remember:rememberMe,
            loginCart:loginCart,
        },
        success:(response) => {
            if(response.loginStats == 1){
                $('#loginFail').addClass('vH')
                $('#login-email').removeClass('inputError')
                $('#login-password').removeClass('inputError')
                userStatus({'status': 'user_loggingOut'});
                window.location = window.location.href.split("?")[0];
            }else if(response.loginStats == 0){
                hideLoading($('#login-Loading'))
                $('#loginFail').removeClass('vH')
                $('#loginFail').text(texts.authentication.loginFail)
                $('#login-email').addClass('inputError')
                $('#login-password').addClass('inputError')
                $('#login-email').focus();
            }else if(response.loginStats == 2){
                hideLoading($('#login-Loading'))
                $('#loginFail').removeClass('vH')
                $('#loginFail').text(texts.authentication.userBanned)
                $('#login-email').addClass('inputError')
            }
        }
    })
})

////forgetPassword
let forgetPasswordLinkSent = false;
$('.forgetPassword').on('click',(e) => {
    $('#forgetPasswordFail').addClass('vH');
    $('#forgetPassword-email').removeClass('inputError')
    $('.forgetPasswordResponse').addClass('vH');
    showPopup($('#forgetPassword-popup'),$('#forgetPassword-email'))
    if(forgetPasswordLinkSent == true){
        $('#forgetPasswordSuccess').removeClass('none vH');
    }
})

$('#forgetPassword-btn').on('click',() => {
    showLoading($('#forgetPassword-Loading'))
    $('.forgetPasswordResponse').addClass('vH');
    $('#forgetPassword-email').removeClass('inputError')
    $.ajax({
        url:'/user/recoverpassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            recoverPassword:true,
            email:$('#forgetPassword-email').val(),
        },
        success:(response) => {
            hideLoading($('#forgetPassword-Loading'))
            if(response.recoverPasswordStatus == 1){
                $('#forgetPasswordFail').hide();
                $('#forgetPassword-btn').hide();
                $('#forgetPassword-email').hide();
                $('#forgetPassword-title').hide();
                $('#forgetPasswordSuccess').removeClass('none vH');
                forgetPasswordLinkSent = true;
            }else if(response.recoverPasswordStatus == 0){
                $('#forgetPasswordFail').text(texts.other.unknownError);
                $('#forgetPasswordFail').removeClass('vH');
                $('#forgetPasswordSuccess').addClass('vH');
            }else if(response.recoverPasswordStatus == 2){
                $('#forgetPasswordFail').text(texts.authentication.wait10mins);
                $('#forgetPasswordFail').removeClass('vH');
                $('#forgetPasswordSuccess').addClass('vH');
            }else if(response.recoverPasswordStatus == 3){
                $('#forgetPassword-email').addClass('inputError')
                $('#forgetPassword-email').focus();
                $('#forgetPasswordFail').text(texts.authentication.wrongEmail);
                $('#forgetPasswordFail').removeClass('vH');
                $('#forgetPasswordSuccess').addClass('vH');
            }
        }
    });
})
$('#forgetPassword-email').on('keypress',function(e){
    e.which == 13 ? $('#forgetPassword-btn').trigger('click') : null;
})
////create New Password
let recoverPasswordToken = '';
$(document).ready(() => {
    let url = new URL(window.location.href);
    if( url.searchParams.has("recoverPassword") && loginCheck == false){
        recoverPasswordToken = url.searchParams.get("recoverPassword");
        showPopup($('#createNewPassword-popup'))
        showLoading($('#createNewPassword-Loading'))
        $.ajax({
            url:'/user/recoverpassword',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                recoverPasswordTokenCheck:recoverPasswordToken,
            },
            success:(response) => {
                hideLoading($('#createNewPassword-Loading'))
                if(response.recoverPasswordTokenCheckStatus == 1){
                    $('#createNewPasswordContainer').removeClass('none')
                    $('#createNewPassword-password').focus();
                }else if(response.recoverPasswordTokenCheckStatus == 0){
                    $('#createNewPasswordFail').text(texts.authentication.expiredRecoverPasswordToken)
                }else if(response.recoverPasswordTokenCheckStatus == 2){
                    $('#createNewPasswordFail').text(texts.authentication.wrongRecoverPasswordToken)
                }
            }
        })
    }
})
$('#createNewPassword-btn').on('click',() => {
    $('#createNewPassword-password').removeClass('inputError')
    showLoading($('#createNewPassword-Loading'))
    $('#createNewPasswordFail').addClass('vH')
    $.ajax({
        url:'/user/recoverpassword',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createNewPassword:true,
            recoverPasswordToken:recoverPasswordToken,
            newPassword:$('#createNewPassword-password').val(),
        },
        success:(response) => {
            hideLoading($('#createNewPassword-Loading'))
            if(response.createNewPasswordStatus == 1){
                $('#createNewPasswordFail').addClass('vH')
                $('#signupSuccess').removeClass('vH')
                $('#signupSuccess').text(texts.authentication.passwordChanged)
                showPopup($('#login-popup'),$('#login-email'))
            }else if(response.createNewPasswordStatus == 0){
                $('#createNewPasswordContainer').addClass('none')
                $('#createNewPasswordFail').text(texts.authentication.expiredRecoverPasswordToken)
            }else if(response.createNewPasswordStatus == 2){
                $('#createNewPassword-password').val('');
                $('#createNewPasswordFail').text(texts.authentication[response.error.newPassword[0]])
                $('#createNewPassword-password').addClass('inputError')
                $('#createNewPasswordFail').removeClass('vH')
            }else if(response.createNewPasswordStatus == 3){
                $('#createNewPasswordFail').text(texts.other.unknownError)
                $('#createNewPasswordFail').removeClass('vH')
            }else if(response.createNewPasswordStatus == 4){
                $('#createNewPasswordFail').text(texts.authentication.wrongRecoverPasswordToken)
                $('#createNewPasswordFail').removeClass('vH')
            }
        }
    });
})
$('#createNewPassword-password').on('keypress',(e) => {
    e.which == 13 ? ('#createNewPassword-btn').trigger('click') :null;
})


///////profile
let userLocationMap;
userLocationMap = L.map('profile-location').setView([0,0],2);
const userLocationMapIcon = L.icon({
    iconUrl: '/storage/imgs/marker-icon.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
        ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
}).addTo(userLocationMap);
let userLocationMapMarker = L.marker([0,0],{icon: userLocationMapIcon}).addTo(userLocationMap);
userLocationMap.on('click',(e) => {
    userLocationMapMarker.setLatLng(e.latlng);
    userLocationMap.addLayer(userLocationMapMarker)
});

$('#profile-mylocation').on('click',() => {
    navigator.geolocation.getCurrentPosition((pos) => {
        userLocationMap.flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
            animate: true,
            duration: 1
        });
        userLocationMapMarker.setLatLng([pos.coords.latitude,pos.coords.longitude]);
    });
    userLocationMap.addLayer(userLocationMapMarker)
})
$('#profile-unsetLocation').on('click',() => {
    userLocationMap.flyTo([0,0], 2, {
        animate: true,
        duration: 1
    });
    userLocationMapMarker.setLatLng([0,0]);
    userLocationMap.removeLayer(userLocationMapMarker)
})


if(user.lat != 0 || user.lng != 0){
    userLocationMap.addLayer(userLocationMapMarker)
    userLocationMapMarker.setLatLng([user.lat,user.lng,15]);
    userLocationMap.flyTo([user.lat,user.lng], 15, {
        animate: false,
        duration: 1
    });
}

resetUserProfile = () =>{
    $('#profile-name').val(user.name);
    $('#profile-phoneNumber').val(user.phoneNumber);
    $('#profile-address').val(user.address);
    $('.profileFail').addClass('vH');
    $('#profileFail').addClass('vH');
    $('#profileSuccess').addClass('none');
    $('.profileInput').removeClass('inputError');
    $('#profileContainer').removeClass('none');
    $('#profileTitle').removeClass('none');
    if(user.lat != 0 || user.lng != 0){
        userLocationMap.addLayer(userLocationMapMarker)
        userLocationMapMarker.setLatLng([user.lat,user.lng,15]);
        userLocationMap.flyTo([user.lat,user.lng], 15, {
            animate: false,
            duration: 1
        });
    }else{
        userLocationMap.removeLayer(userLocationMapMarker)
        userLocationMapMarker.setLatLng([user.lat,user.lng,2]);
        userLocationMap.flyTo([user.lat,user.lng], 2, {
            animate: false,
            duration: 1
        });
    }
    setTimeout(()=>{
        userLocationMap.invalidateSize();
    },500)
}
$('html,body').on('click','.profile',(e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    navMobileClose()
    hidePopup();
    userStatus({'status': 'user_manageProfile'});
    resetUserProfile();
    if($('#profilepage').hasClass('none')){
        switchPage($('#profilepage'),showProfilePage('profile'))
        window.history.pushState({'page':'profile'},``, `https://${website.url}/${lang}/profile`);
        document.title = user.name+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
    }else{
        showProfilePage('profile')
        currentPage();
    }

})
$('#profile-name, #profile-phoneNumber, #profile-address').on('keypress',(e) => {
    e.which == 13 ? $('#profile-btn').trigger('click') : null;
})
$('#profile-btn').on('click',() => {
    showLoading($('#profile-Loading'))
    $('.profileFail').addClass('vH');
    $('#profileFail').addClass('vH');
    $('.profileInput').removeClass('inputError');
    $.ajax({
        url:'/user/editProfile',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            editProfile:true,
            name:$('#profile-name').val(),
            phoneNumber:$('#profile-phoneNumber').val(),
            address:$('#profile-address').val(),
            lat:userLocationMapMarker.getLatLng().lat,
            lng:userLocationMapMarker.getLatLng().lng,
        },success:(response) => {
            hideLoading($('#profile-Loading'))
            if(response.saveProfileStatus == 1){
                user.lat = userLocationMapMarker.getLatLng().lat;
                user.lng = userLocationMapMarker.getLatLng().lng;
                user.name = $('#profile-name').val();
                user.phoneNumber = $('#profile-phoneNumber').val();
                user.address = $('#profile-address').val();
                $('#profileContainer').addClass('none');
                $('#profileTitle').addClass('none');
                $('#profileSuccess').removeClass('none')
            }else if(response.saveProfileStatus == 2){
                $('.profileFail').addClass('vH');
                $('#profileFail').removeClass('vH');
            }else if(response.saveProfileStatus == 0){
                    if(response.error.name){
                        $('#profileFailname').removeClass('vH');
                        $('#profileFailname').text(texts.authentication[response.error.name[0]]);
                        $('#profile-name').addClass('inputError');
                    }
                    if(response.error.phoneNumber){
                        $('#profileFailPhoneNumber').removeClass('vH');
                        $('#profileFailPhoneNumber').text(texts.authentication[response.error.phoneNumber[0]]);
                        $('#profile-phoneNumber').addClass('inputError');
                    }
                    if(response.error.address){
                        $('#profileFailAddress').removeClass('vH');
                        $('#profileFailAddress').text(texts.authentication[response.error.address[0]]);
                        $('#profile-address').addClass('inputError');
                    }
            }
        }

    });
})
$('#profile-phoneNumber').on('input change',() => {
    $('#profile-phoneNumber').val($('#profile-phoneNumber').val().replace( /[^\d+() -]/, '' ));
});
//////change email
$('html,body').on('click','.changeEmail',(e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    navMobileClose()
    hidePopup();
    $('#changeEmailFail').addClass('vH');
    $('#changeEmailSuccess').addClass('none');
    $('#changeEmail-email').val(user.email)
    $('#changeEmailTitle').removeClass('none');
    $('#changeEmail-email').removeClass('inputError')
    $('#changeEmailContainer').removeClass('none');
    if($('#profilepage').hasClass('none')){
        switchPage($('#profilepage'),showProfilePage('changeEmail'))
        window.history.pushState({'page':'profile'},``, `https://${website.url}/${lang}/profile`);
        document.title = user.name+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])

    }else{
        showProfilePage('changeEmail')
        currentPage();
    }

    userStatus({'status': 'user_changeEmail'});
})
$('#changeEmail-email').on('keypress',(e) => {
    e.which == 13 ? $('#changeEmail-btn').trigger('click') : null;
})
$('#changeEmail-btn').on('click',() => {
    showLoading($('#changeEmail-Loading'))
    $('#changeEmailFail').addClass('vH');
    $('#changeEmail-email').removeClass('inputError')

    if($('#changeEmail-email').val() == user.email){
        hideLoading($('#changeEmail-Loading'))
        $('#changeEmailTitle').addClass('none');
        $('#changeEmailContainer').addClass('none');
        $('#changeEmailSuccess').removeClass('none');
        $('#changeEmailSuccess').text(texts.authentication.changeEmailSaved)
        return;
    }
    $.ajax({
        url:'/user/editProfile',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeEmail:true,
            newEmail:$('#changeEmail-email').val(),
        },
        success:(response) => {
            hideLoading($('#changeEmail-Loading'))
            if(response.changeEmailStatus == 1){
                $('#changeEmailTitle').addClass('none');
                $('#changeEmailContainer').addClass('none');
                $('#changeEmailSuccess').removeClass('none');
                $('#changeEmailSuccess').text(texts.authentication.changeEmailSaved)
                user.email = $('#changeEmail-email').val();
            }else if(response.changeEmailStatus == 0){
                $('#changeEmailFail').removeClass('vH');
                $('#changeEmailFail').text(texts.authentication[response.error.newEmail[0]])
                $('#changeEmail-email').addClass('inputError')
                $('#changeEmail-email').focus();
            }else if(response.changeEmailStatus == 2){
                $('#changeEmailFail').removeClass('vH');
                $('#changeEmailFail').text(texts.authentication.emailUnique)
                $('#changeEmail-email').addClass('inputError')
                $('#changeEmail-email').focus();
            }else if(response.changeEmailStatus == 3){
                $('#changeEmailFail').removeClass('vH');
                $('#changeEmailFail').text(texts.authentication.changeEmailSaveFail)
                $('#changeEmail-email').addClass('inputError')
                $('#changeEmail-email').focus();
            }

        }
    });
})

/////change password
$('html,body').on('click','.changePassword',(e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    navMobileClose()
    hidePopup();
    $('#changePasswordContainer').removeClass('none');
    $('#changePasswordTitle').removeClass('none');
    $('#changePasswordFail').addClass('vH');
    $('#changePasswordSuccess').addClass('none');
    $('#changePassword-password').removeClass('inputError');
    $('#changePassword-password').val('')
    // showPopup($('#changePassword-popup'),$('#changePassword-password'))
    showProfilePage('changePassword')
    if($('#profilepage').hasClass('none')){
        switchPage($('#profilepage'),showProfilePage('changePassword'))
        window.history.pushState({'page':'profile'},``, `https://${website.url}/${lang}/profile`);
        document.title = user.name+' | '+website.restaurantName
        $('meta[name="description"]').attr('content',website.websiteDescriptions[lang])
        console.log(website.websiteDescriptions[lang])
    }else{
        showProfilePage('changePassword')
        currentPage();
    }
    userStatus({'status': 'user_changePassword'});
})
$('#changePassword-password').on('keypress',(e) => {
    e.which == 13 ? $('#changePassword-btn').trigger('click') : null;
})
$('#changePassword-btn').on('click',() => {
    showLoading($('#changePassword-Loading'))
    $('#changePasswordFail').addClass('vH');
    $('#changePassword-password').removeClass('inputError');
    $.ajax({
        url:'/user/editProfile',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePassword:true,
            newPassword:$('#changePassword-password').val(),
        },
        success:(response) => {
            hideLoading($('#changePassword-Loading'))
            if(response.changePasswordStatus == 1){
                $('#changePasswordContainer').addClass('none');
                $('#changePasswordTitle').addClass('none');
                $('#changePasswordSuccess').removeClass('none');
                $('#changePassword-password').val('')
            }else if(response.changePasswordStatus == 0){
                $('#changePasswordFail').removeClass('vH');
                $('#changePasswordFail').text(texts.authentication[response.error.newPassword[0]]);
                $('#changePassword-password').addClass('inputError');
                $('#changePassword-password').val('')
                $('#changePassword-password').focus()
            }else if(response.changePasswordStatus == 2){
                $('#changePasswordFail').removeClass('vH');
                $('#changePasswordFail').text(texts.authentication.changePasswordSaveFail);
                $('#changePassword-password').addClass('inputError');
                $('#changePassword-password').val('')
            }
        }
    });
});
