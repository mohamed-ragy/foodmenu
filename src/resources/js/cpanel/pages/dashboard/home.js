
$('#home-welcomeWindowTitle').text(texts.home.welcome+' '+account.name.split(' ')[0]);

require('./home/orders.js') //done

setInterval(() => {
    const timeNow = new Date();
    let hours = timeNow.toLocaleTimeString(account.language, {hour:'numeric',hour12 :false,timeZone:website.timeZone });
    let minutes = timeNow.toLocaleTimeString(account.language, {minute:'numeric',hour12 :false,timeZone:website.timeZone });
    if(hours == 0 && minutes == 2 || hours == 24 && minutes == 2){
        console.log('new day')
        website.todayOrders = [];
        drawTodayHomeOrders();
    }
}, 60000);


////////////////
