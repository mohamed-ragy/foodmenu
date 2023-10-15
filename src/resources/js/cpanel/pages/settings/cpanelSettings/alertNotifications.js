


/////////////////////////alert notifications settings functinos/////////////////////

alertNotificationsNoSaveCheck = function(){
    if(
        settings.NewOrderAlerts == settings_temp.NewOrderAlerts &&
        settings.DeliveredOrderAlerts == settings_temp.DeliveredOrderAlerts &&
        settings.NewUserAlerts == settings_temp.NewUserAlerts &&
        settings.NewReviewAlerts == settings_temp.NewReviewAlerts &&
        settings.CanceledOrderAlerts == settings_temp.CanceledOrderAlerts &&
        settings.onlineUserAlert == settings_temp.onlineUserAlert &&
        settings.onlineGuestAlert == settings_temp.onlineGuestAlert
    ){
        $('.alertNotificationsNoSave').addClass('none');
        return true;
    }else{
        $('.alertNotificationsNoSave').removeClass('none');
        return false;

    }
}

//////////////////alert notifications settings//////////////////////////////

$('html,body').on('click','#cpanelSettings-NewOrderAlerts',function(e){
    e.stopImmediatePropagation();
    settings_temp.NewOrderAlerts = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-DeliveredOrderAlerts',function(e){
    e.stopImmediatePropagation();
    settings_temp.DeliveredOrderAlerts = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-NewUserAlerts',function(e){
    e.stopImmediatePropagation();
    settings_temp.NewUserAlerts = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-NewReviewAlerts',function(e){
    e.stopImmediatePropagation();
    settings_temp.NewReviewAlerts = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-CanceledOrderAlerts',function(e){
    e.stopImmediatePropagation();
    settings_temp.CanceledOrderAlerts = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-onlineUserAlert',function(e){
    e.stopImmediatePropagation();
    settings_temp.onlineUserAlert = $(this).prop('checked');
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-onlineGuestAlert',function(e){
    e.stopImmediatePropagation();
    settings_temp.onlineGuestAlert = $(this).prop('checked');
    control_panel_settings_unsave_check();
})

$('html,body').on('click','#cpanelSettings-alertNotificationsCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.NewOrderAlerts = settings.NewOrderAlerts;
    settings_temp.DeliveredOrderAlerts = settings.DeliveredOrderAlerts;
    settings_temp.NewUserAlerts = settings.NewUserAlerts;
    settings_temp.NewReviewAlerts = settings.NewReviewAlerts;
    settings_temp.CanceledOrderAlerts = settings.CanceledOrderAlerts;
    settings_temp.onlineUserAlert = settings.onlineUserAlert;
    settings_temp.onlineGuestAlert = settings.onlineGuestAlert;
    $('#cpanelSettings-NewOrderAlerts').prop('checked',settings.NewOrderAlerts);
    $('#cpanelSettings-DeliveredOrderAlerts').prop('checked',settings.DeliveredOrderAlerts);
    $('#cpanelSettings-NewUserAlerts').prop('checked',settings.NewUserAlerts);
    $('#cpanelSettings-NewReviewAlerts').prop('checked',settings.NewReviewAlerts);
    $('#cpanelSettings-CanceledOrderAlerts').prop('checked',settings.CanceledOrderAlerts);
    $('#cpanelSettings-onlineUserAlert').prop('checked',settings.onlineUserAlert);
    $('#cpanelSettings-onlineGuestAlert').prop('checked',settings.onlineGuestAlert);
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-alertNotificationsSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    let NewOrderAlerts;let DeliveredOrderAlerts;let NewUserAlerts;let NewReviewAlerts;let CanceledOrderAlerts;let onlineUserAlert;let onlineGuestAlert;
    showBtnLoading($('#cpanelSettings-alertNotificationsSaveBtn'))
    if($('#cpanelSettings-NewOrderAlerts').prop('checked')){NewOrderAlerts = 1}else{NewOrderAlerts = 0};
    if($('#cpanelSettings-DeliveredOrderAlerts').prop('checked')){DeliveredOrderAlerts = 1}else{DeliveredOrderAlerts = 0};
    if($('#cpanelSettings-NewUserAlerts').prop('checked')){NewUserAlerts = 1}else{NewUserAlerts = 0};
    if($('#cpanelSettings-NewReviewAlerts').prop('checked')){NewReviewAlerts = 1}else{NewReviewAlerts = 0};
    if($('#cpanelSettings-CanceledOrderAlerts').prop('checked')){CanceledOrderAlerts = 1}else{CanceledOrderAlerts = 0};
    if($('#cpanelSettings-onlineUserAlert').prop('checked')){onlineUserAlert = 1}else{onlineUserAlert = 0};
    if($('#cpanelSettings-onlineGuestAlert').prop('checked')){onlineGuestAlert = 1}else{onlineGuestAlert = 0};
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveAlertNotifications:true,
            NewOrderAlerts:NewOrderAlerts,
            DeliveredOrderAlerts:DeliveredOrderAlerts,
            NewUserAlerts:NewUserAlerts,
            NewReviewAlerts:NewReviewAlerts,
            CanceledOrderAlerts:CanceledOrderAlerts,
            onlineUserAlert:onlineUserAlert,
            onlineGuestAlert:onlineGuestAlert,
        },
        success:function(response){
            hideBtnLoading($('#cpanelSettings-alertNotificationsSaveBtn'))
            if(response.saveAlertNotificationsStatus == 1){
                showAlert('success',response.msg,4000,true);

                settings.NewOrderAlerts = NewOrderAlerts;
                settings.DeliveredOrderAlerts = DeliveredOrderAlerts;
                settings.NewUserAlerts = NewUserAlerts;
                settings.NewReviewAlerts = NewReviewAlerts;
                settings.CanceledOrderAlerts = CanceledOrderAlerts;
                settings.onlineUserAlert = onlineUserAlert;
                settings.onlineGuestAlert = onlineGuestAlert;
                settings_temp.NewOrderAlerts = NewOrderAlerts;
                settings_temp.DeliveredOrderAlerts = DeliveredOrderAlerts;
                settings_temp.NewUserAlerts = NewUserAlerts;
                settings_temp.NewReviewAlerts = NewReviewAlerts;
                settings_temp.CanceledOrderAlerts = CanceledOrderAlerts;
                settings_temp.onlineUserAlert = onlineUserAlert;
                settings_temp.onlineGuestAlert = onlineGuestAlert;
                control_panel_settings_unsave_check();
            }else if(response.saveAlertNotificationsStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})
