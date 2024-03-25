$('html,body').on('click','.phoneNumberCall',function(e){
    window.location.href = 'tel:'+$(this).attr('phoneNumber');
})
is_mapDrawn = false;
drawMap = () => {
    if(website.lat == '0' && website.lng == '0'){
        $('#restaurantLocationMap').addClass('none')
        return;
    }
    if(is_mapDrawn == true){
    map.setView(new L.LatLng(parseFloat(website.lat),parseFloat(website.lng)),18);
    setTimeout(() => {
        map.flyTo([parseFloat(website.lat) + 0.0025,parseFloat(website.lng)], 15, {
            animate: true,
            duration: 1
        });
    },1000)
    return;
    }
    is_mapDrawn = true;
    const myIcon = L.icon({
        iconUrl: '/storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
     });

    //  if(website.address == null ){websiteMapAdress = ''}else{websiteMapAdress = website.address}
     const contentString =
     `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;max-height:10em;">
         <img src="`+websiteLogo+`" alt="" style="width:auto;height:50px;object-fit:cover;"/>
         <span style="font-size:1.3em;margin:0;padding:5px 0;font-weight:bold">`+website.restaurantName+`</span>
         <span style="margin:0;">`+website.address+`</span>
     </div>`;
     websiteLocation = [parseFloat(website.lat),parseFloat(website.lng)];
    map = L.map('restaurantLocationMap').setView(websiteLocation, 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(map);
    // websiteLocationMarker
    websiteLocationMarker = L.marker(websiteLocation,{icon: myIcon}).addTo(map);
    setTimeout(() => {
        websiteLocationMarker.bindPopup(contentString).openPopup();
        map.flyTo([parseFloat(website.lat) + 0.0025,parseFloat(website.lng)], 15, {
            animate: true,
            duration: 1
        });

    },1000)
    setTimeout(() => {
        map.invalidateSize();
     }, 500);
}


if(
    website.facebookLink == null || website.facebookLink == '' &&
    website.youtubeLink == null || website.youtubeLink == '' &&
    website.linkedinLink == null || website.linkedinLink == '' &&
    website.twitterLink == null || website.twitterLink == '' &&
    website.instagramLink == null || website.instagramLink == ''){
    $('#aboutusFollowusContainer').addClass('none')
}

if(
    !website.facebookLink &&
    !website.youtubeLink &&
    !website.linkedinLink &&
    !website.twitterLink &&
    !website.instagramLink &&
    website.phoneNumbers.length == 0 &&
    !website.address &&
    !website.restaurantEmail
){
    $('#aboutusContactusContainer').addClass('none')
}

!website.useDelivery ? $('#aboutusDeliveryWorkingHoursContainer').addClass('none') : null;
!website.usePickup ? $('#aboutusPickupWorkingHoursContainer').addClass('none') : null;
!website.dineinWorkingHours ? $('#aboutusDineinWorkingHoursContainer').addClass('none') : null;

$(document).ready(()=>{
    if(website.phoneNumbers.length > 0){
        for(const key in website.phoneNumbers){
            const phoneNumber = website.phoneNumbers[key];
            $('#aboutusPhoneNumbersContainer').append(
                drawAboutusPhoneNumber(phoneNumber)
            )
            $('#footerPhoneNumbersContainer').append(
                drawFooterPhoneNumbers(phoneNumber)
            )
        }
    }

    if(website.address != null && website.address != ''){
        $('#aboutusAddressContainer').append(
            drawAboutusAddress(website.address)
        )
        $('#footerAddressContainer').append(
            drawFooterAddress(website.address)
        )
    }

    if(website.restaurantEmail != null && website.restaurantEmail != ''){
        $('#aboutusrestaurantEmailContainer').append(
            drawAboutusRestaurantEmail(website.restaurantEmail)
        )
        $('#footerEmailContainer').append(
            drawFooterRestaurantEmail(website.restaurantEmail)
        )
    }

    if(website.useDelivery){
        for(const key in website.workingDays_delivery){
            let element = website.workingDays_delivery[key];
            if(element.working){
                let happyHourClass ='none'
                let happyHourToolTip = `<div class="column alnC jstfyC">
                    <div><span class="bold">${texts.other.happyHour}</span> ${element.discount}% ${texts.other.discount}</div>
                    <div>${texts.other.from} ${translateFloatToTime(element.Dfrom)} ${texts.other.to} ${translateFloatToTime(element.Dto)}</div>
                </div>`
                element.discount > 0 ? happyHourClass = '' : null;
                $('#aboutusDeliveryWorkingHours').append(
                    drawAboutusWorkingHour(key,element,happyHourClass,happyHourToolTip)

                )
            }
        }
    }
    if(website.usePickup){
        let pickupWorkingHoursClass = 'workingHoursElem';
        for(const key in website.workingDays_pickup){
            let element = website.workingDays_pickup[key];
            if(element.working){
                let happyHourClass ='none'
                let happyHourToolTip = `<div class="column alnC jstfyC">
                    <div><span class="bold">${texts.other.happyHour}</span> ${element.discount}% ${texts.other.discount}</div>
                    <div>${texts.other.from} ${translateFloatToTime(element.Dfrom)} ${texts.other.to} ${translateFloatToTime(element.Dto)}</div>
                </div>`
                element.discount > 0 ? happyHourClass = '' : null;
                pickupWorkingHoursClass == 'workingHoursElem' ? pickupWorkingHoursClass = 'workingHoursElem_' : pickupWorkingHoursClass = 'workingHoursElem';
                $('#aboutusPickupWorkingHours').append(
                    drawAboutusWorkingHour(key,element,happyHourClass,happyHourToolTip)
                )
            }
        }
    }

    if(website.dineinWorkingHours){
        let dineinWorkingHoursClass = 'workingHoursElem';
        for(const key in website.workingDays_dinein){
            let element = website.workingDays_dinein[key];
            if(element.working){
                let happyHourClass ='none'
                let happyHourToolTip = `<div class="column alnC jstfyC">
                    <div><span class="bold">${texts.other.happyHour}</span> ${element.discount}% ${texts.other.discount}</div>
                    <div>${texts.other.from} ${translateFloatToTime(element.Dfrom)} ${texts.other.to} ${translateFloatToTime(element.Dto)}</div>
                </div>`
                element.discount > 0 ? happyHourClass = '' : null;
                dineinWorkingHoursClass == 'workingHoursElem' ? dineinWorkingHoursClass = 'workingHoursElem_' : dineinWorkingHoursClass = 'workingHoursElem';
                $('#aboutusDineinWorkingHours').append(
                    drawAboutusWorkingHour(key,element,happyHourClass,happyHourToolTip)
                )
            }
        }
    }
})
