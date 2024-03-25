showProfilePage = (elem=null) => {
    if(!loginCheck){
        return;
    }
    $('.profilePageElem').removeClass('profilePageElem_show')
    if(elem == null || elem == 'profile'){
        $('.profilePageElem.profile').addClass('profilePageElem_show')
        $('.profilePageBody').children().addClass('none')
        $('#profilePage-profile').removeClass('none')
        resetUserProfile();
    }else if(elem == 'changeEmail'){
        $('.profilePageElem.changeEmail').addClass('profilePageElem_show')
        $('.profilePageBody').children().addClass('none')
        $('#profilePage-changeEmail').removeClass('none')
    }else if(elem == 'changePassword'){
        $('.profilePageElem.changePassword').addClass('profilePageElem_show')
        $('.profilePageBody').children().addClass('none')
        $('#profilePage-changePassword').removeClass('none')
    }else if(elem == 'orderHistory'){
        $('.profilePageElem.orderHistory').addClass('profilePageElem_show')
        $('.profilePageBody').children().addClass('none')
        $('#profilePage-ordersHistory').removeClass('none')
    }

}
