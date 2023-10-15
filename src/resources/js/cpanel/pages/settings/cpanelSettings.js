require('./cpanelSettings/view.js')//done
require('./cpanelSettings/guideMode.js')//done
require('./cpanelSettings/controlSettings.js')//done
require('./cpanelSettings/alertNotifications.js')//done
require('./cpanelSettings/alertsTones.js')//done
//////////load settings
// load settings in the cpanel.js file
loadViewSettings();
loadGuideModeSettings();

$(window).on('resize',function(){
    loadGuideModeSettings();
    loadViewSettings();
    control_panel_settings_unsave_check();
})

getAlertsTones = function(){
    $('.alertSelectToneContainerTones').append(
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
        $('<div/>',{class:'alertToneCard_loading'}).append(
            $('<div/>',{class:'cardLoading w100p h10 br5'})
        ),
    )
    if(window.alertsTonesFirstLoad == false){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getAlertsTones:true,
            },success:function(r){
                window.alertsTonesFirstLoad = true;
                window.alertTones = r.alertsTones;
                for(const key in window.alertTones){
                    apendAlertCard($('#alertSelectToneContainerTones-info'),window.alertTones[key],'infoAlertToneCard')
                    apendAlertCard($('#alertSelectToneContainerTones-error'),window.alertTones[key],'errorAlertToneCard')
                    apendAlertCard($('#alertSelectToneContainerTones-success'),window.alertTones[key],'successAlertToneCard')
                    apendAlertCard($('#alertSelectToneContainerTones-warning'),window.alertTones[key],'warningAlertToneCard')
                    apendAlertCard($('#alertSelectToneContainerTones-chat'),window.alertTones[key],'newMsgAlertToneCard')
                    $('.alertToneCard_loading').hide();
                    setAlertsTones();
                }
            }
        })
    }else{
        for(const key in window.alertTones){
            apendAlertCard($('#alertSelectToneContainerTones-info'),window.alertTones[key],'infoAlertToneCard')
            apendAlertCard($('#alertSelectToneContainerTones-error'),window.alertTones[key],'errorAlertToneCard')
            apendAlertCard($('#alertSelectToneContainerTones-success'),window.alertTones[key],'successAlertToneCard')
            apendAlertCard($('#alertSelectToneContainerTones-warning'),window.alertTones[key],'warningAlertToneCard')
            apendAlertCard($('#alertSelectToneContainerTones-chat'),window.alertTones[key],'newMsgAlertToneCard')
            $('.alertToneCard_loading').hide();
            setAlertsTones();
        }
    }


}







