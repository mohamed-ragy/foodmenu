

require('./home/orders.js') //done
require('./home/websiteSwitch.js');//done
require('./home/qrCode.js');//done
require('./home/info.js');//done

setInterval(() => {
    const timeNow = new Date();
    let hours = timeNow.toLocaleTimeString(account.language, {hour:'numeric',hour12 :false,timeZone:website.timeZone });
    let minutes = timeNow.toLocaleTimeString(account.language, {minute:'numeric',hour12 :false,timeZone:website.timeZone });
    if(hours == 0 && minutes == 0 || hours == 24 && minutes == 0){
        console.log('new day')
        website.todayOrders = [];
        drawTodayHomeOrders();
    }
}, 10000);


////////////////
