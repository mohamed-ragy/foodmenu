get_statistics_Dates = function(){
    let date1 = '';  let date2 = '';
    if(window.page.period == 'day'){
        date1 = getDate(Date.parse(new Date(window.page.year1,parseInt(window.page.month1) - 1,window.page.day1,10))/1000).date.restaurant;
        if(window.page.compare == 1){
            date2 = getDate(Date.parse(new Date(window.page.year2,parseInt(window.page.month2) - 1,window.page.day2,10))/1000).date.restaurant;
        }
    }else if(window.page.period == 'month'){
        date1 = getDate(Date.parse(new Date(window.page.year1,parseInt(window.page.month1) - 1,2,10))/1000).month_year.restaurant;
        if(window.page.compare == 1){
            date2 = getDate(Date.parse(new Date(window.page.year2,parseInt(window.page.month2) - 1,2,10))/1000).month_year.restaurant;
        }
    }else if(window.page.period == 'year'){
        date1 = getDate(Date.parse(new Date(window.page.year1,parseInt(window.page.month1)- 1,2,10))/1000).year.restaurant;
        if(window.page.compare == 1){
            date2 = getDate(Date.parse(new Date(window.page.year2,parseInt(window.page.month2)- 1,2,10))/1000).year.restaurant;
        }
    }
    return{
        date1:date1,
        date2:date2,
    }
}
///
calc_statistics = function(r){
    if(r.statistics1 == null ){return;}
    if(window.page.compare == 1 && r.statistics2 == null){return;}
    if(window.page.period == 'year'){
        let calc_statistics_year_s1 = calc_statistics_year(r.statistics1)
        window.statistics.s1 = calc_statistics_year_s1.year;
        window.statistics.s1_ = calc_statistics_year_s1.months;
    }else{
        window.statistics.s1 = r.statistics1;
        window.statistics.s1_ = r.statistics1_;
    }

    window.page.period == 'day' ? window.statistics.date1 = getDate(Date.parse(new Date(r.statistics1.year,r.statistics1.month - 1,r.statistics1.day,10,10)) / 1000).date.restaurant
    : window.page.period == 'month' ? window.statistics.date1 = getDate(Date.parse(new Date(r.statistics1.year,r.statistics1.month - 1,1,10,10)) / 1000).month_year.restaurant
    : window.page.period == 'year' ? window.statistics.date1 = getDate(Date.parse(new Date(r.statistics1[0].year,1,1,10,10)) / 1000).year.restaurant
    : null


    window.statistics.s1_orders = (window.statistics.s1.so.orders + window.statistics.s1.co.orders)
    if(window.statistics.s1.co.orders == 0){
        window.statistics.s1_so_percent = 0;
        window.statistics.s1_co_percent = 0;
    }else{
        window.statistics.s1_so_percent = Math.round((window.statistics.s1.so.orders / window.statistics.s1_orders ) * 100);
        window.statistics.s1_co_percent = Math.round((window.statistics.s1.co.orders / window.statistics.s1_orders ) * 100);
    }

    window.statistics.s1_so_percent + window.statistics.s1_co_percent == 101 ? window.statistics.s1_co_percent = window.statistics.s1_co_percent - 1 : null;
    window.statistics.s1_so_percent + window.statistics.s1_co_percent == 99 ? window.statistics.s1_so_percent = window.statistics.s1_so_percent + 1 : null;

    if(window.statistics.s1.so.orders == 0){
        window.statistics.s1_do_percent = 0;
        window.statistics.s1_po_percent = 0;
        window.statistics.s1_di_percent = 0;
    }else{
        window.statistics.s1_do_percent = Math.round((window.statistics.s1.do.orders/window.statistics.s1.so.orders) * 100);
        window.statistics.s1_po_percent = Math.round((window.statistics.s1.po.orders/window.statistics.s1.so.orders) * 100);
        window.statistics.s1_di_percent = Math.round((window.statistics.s1.di.orders/window.statistics.s1.so.orders) * 100);
    }

    window.statistics.s1_do_percent + window.statistics.s1_po_percent + window.statistics.s1_di_percent == 101 ? window.statistics.s1_do_percent = window.statistics.s1_do_percent - 1 : null;
    window.statistics.s1_do_percent + window.statistics.s1_po_percent + window.statistics.s1_di_percent == 99 ? window.statistics.s1_do_percent = window.statistics.s1_do_percent + 1 : null;

    if(window.page.compare == 1){
        if(window.page.period == 'year'){
            let calc_statistics_year_s2 = calc_statistics_year(r.statistics2)
            window.statistics.s2 = calc_statistics_year_s2.year;
            window.statistics.s2_ = calc_statistics_year_s2.months;
        }else{
            window.statistics.s2 = r.statistics2;
            window.statistics.s2_ = r.statistics2_;
        }


        window.page.period == 'day' ? window.statistics.date2 = getDate(Date.parse(new Date(r.statistics2.year,r.statistics2.month -1,r.statistics2.day,10,10)) / 1000).date.restaurant
        : window.page.period == 'month' ? window.statistics.date2 = getDate(Date.parse(new Date(r.statistics2.year,r.statistics2.month -1,1,10,10)) / 1000).month_year.restaurant
        : window.page.period == 'year' ? window.statistics.date2 = getDate(Date.parse(new Date(r.statistics2[0].year,1,1,10,10)) / 1000).year.restaurant
        : null
        window.statistics.s2_orders = (window.statistics.s2.so.orders + window.statistics.s2.co.orders);
        if(window.statistics.s2_orders == 0){
            window.statistics.s2_so_percent = 0;
            window.statistics.s2_co_percent = 0;
        }else{
            window.statistics.s2_so_percent = Math.round((window.statistics.s2.so.orders / window.statistics.s2_orders ) * 100);
            window.statistics.s2_co_percent = Math.round((window.statistics.s2.co.orders / window.statistics.s2_orders ) * 100);
        }

        window.statistics.s2_so_percent + window.statistics.s2_co_percent == 101 ? window.statistics.s2_co_percent = window.statistics.s2_co_percent - 1 : null;
        window.statistics.s2_so_percent + window.statistics.s2_co_percent == 99 ? window.statistics.s2_so_percent = window.statistics.s2_so_percent + 1 : null;

        if(window.statistics.s2.so.orders == 0){
            window.statistics.s2_do_percent = 0;
            window.statistics.s2_po_percent = 0;
            window.statistics.s2_di_percent = 0;
        }else{
            window.statistics.s2_do_percent = Math.round((window.statistics.s2.do.orders/window.statistics.s2.so.orders) * 100);
            window.statistics.s2_po_percent = Math.round((window.statistics.s2.po.orders/window.statistics.s2.so.orders) * 100);
            window.statistics.s2_di_percent = Math.round((window.statistics.s2.di.orders/window.statistics.s2.so.orders) * 100);
        }

        window.statistics.s2_do_percent + window.statistics.s2_po_percent + window.statistics.s2_di_percent == 101 ? window.statistics.s2_do_percent = window.statistics.s2_do_percent - 1 : null;
        window.statistics.s2_do_percent + window.statistics.s2_po_percent + window.statistics.s2_di_percent == 99 ? window.statistics.s2_do_percent = window.statistics.s2_do_percent + 1 : null;
    }
}
calc_statistics_year = function(data){
    let months = [];
    let year = {
        website_id:data[0].website_id,
        year:data[0].year,
        so:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        do:{orders:0,items_total:0,delivery:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        po:{orders:0,items_total:0,tax:0,total:0,guestOrders:0,userOrders:0,},
        co:{orders:0,items_total:0,delivery:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        di:{orders:0,items_total:0,tax:0,service:0,total:0,guestOrders:0,userOrders:0,},
        users:{},
        products:{},
        deliveries:{},
    };
    for(const key in data){
        let month = data[key];
        for(const key2 in month.users){
            user = month.users[key2];
            year.users[key2] = {
                userName:month.users[key2].userName,
                so:0,so_delivery:0,so_itemsTotal:0,so_service:0,so_tax:0,so_total:0,
                co:0,co_delivery:0,co_itemsTotal:0,co_service:0,co_tax:0,co_total:0,
                di:0,di_itemsTotal:0,di_service:0,di_tax:0,di_total:0,
                do:0,do_delivery:0,do_itemsTotal:0,do_tax:0,do_total:0,
                po:0,po_itemsTotal:0,po_tax:0,po_total:0,
                rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0,
            }
        }
        for(const key3 in month.deliveries){
            let delivery = month.deliveries[key3];
            year.deliveries[key3] = {id:delivery.id,orders:0,time:0,avgPerOrder:0};
        }
        for(const key4 in month.products){
            product = month.products[key4];
            if(!year.products.hasOwnProperty([key4])){year.products[key4] = {sum:0,total:0,reviews:{rv:0,rv1:0,rv2:0,rv3:0,rv4:0,rv5:0},options:{}}}
            for(const key5 in product.options){
                option = product.options[key5];
                if(!year.products[key4].options.hasOwnProperty([key5])){year.products[key4].options[key5] = {}}
                for(const key6 in option){
                    selection = option[key6];
                    if(!year.products[key4].options[key5].hasOwnProperty([key6])){
                        year.products[key4].options[key5][key6] = 0;
                    }
                }
            }
        }

    }
    for(const key in data){
        let month = data[key];
        months.push(month);
        year.so.orders = year.so.orders + month.so.orders;
        year.so.items_total = year.so.items_total + month.so.items_total;
        year.so.delivery = year.so.delivery + month.so.delivery;
        year.so.tax = year.so.tax + month.so.tax;
        year.so.service = year.so.service + month.so.service;
        year.so.total = year.so.total + month.so.total;
        year.so.guestOrders = year.so.guestOrders + month.so.guestOrders;
        year.so.userOrders = year.so.userOrders + month.so.userOrders;
        year.co.orders = year.co.orders + month.co.orders;
        year.co.items_total = year.co.items_total + month.co.items_total;
        year.co.delivery = year.co.delivery + month.co.delivery;
        year.co.tax = year.co.tax + month.co.tax;
        year.co.service = year.co.service + month.co.service;
        year.co.total = year.co.total + month.co.total;
        year.co.guestOrders = year.co.guestOrders + month.co.guestOrders;
        year.co.userOrders = year.co.userOrders + month.co.userOrders;
        year.do.orders = year.do.orders + month.do.orders;
        year.do.items_total = year.do.items_total + month.do.items_total;
        year.do.delivery = year.do.delivery + month.do.delivery;
        year.do.tax = year.do.tax + month.do.tax;
        year.do.total = year.do.total + month.do.total;
        year.do.guestOrders = year.do.guestOrders + month.do.guestOrders;
        year.do.userOrders = year.do.userOrders + month.do.userOrders;
        year.po.orders = year.po.orders + month.po.orders;
        year.po.items_total = year.po.items_total + month.po.items_total;
        year.po.tax = year.po.tax + month.po.tax;
        year.po.total = year.po.total + month.po.total;
        year.po.guestOrders = year.po.guestOrders + month.po.guestOrders;
        year.po.userOrders = year.po.userOrders + month.po.userOrders;
        year.di.orders = year.di.orders + month.di.orders;
        year.di.items_total = year.di.items_total + month.di.items_total;
        year.di.tax = year.di.tax + month.di.tax;
        year.di.service = year.di.service + month.di.service;
        year.di.total = year.di.total + month.di.total;
        year.di.guestOrders = year.di.guestOrders + month.di.guestOrders;
        year.di.userOrders = year.di.userOrders + month.di.userOrders;

        for(const key2 in month.users){
            user = month.users[key2];
            year.users[key2].so = year.users[key2].so + user.so;
            year.users[key2].so_delivery = year.users[key2].so_delivery + user.so_delivery;
            year.users[key2].so_itemsTotal = year.users[key2].so_itemsTotal + user.so_itemsTotal;
            year.users[key2].so_service = year.users[key2].so_service + user.so_service;
            year.users[key2].so_tax = year.users[key2].so_tax + user.so_tax;
            year.users[key2].so_total = year.users[key2].so_total + user.so_total;
            year.users[key2].co = year.users[key2].co + user.co;
            year.users[key2].co_delivery = year.users[key2].co_delivery + user.co_delivery;
            year.users[key2].co_itemsTotal = year.users[key2].co_itemsTotal + user.co_itemsTotal;
            year.users[key2].co_service = year.users[key2].co_service + user.co_service;
            year.users[key2].co_tax = year.users[key2].co_tax + user.co_tax;
            year.users[key2].co_total = year.users[key2].co_total + user.co_total;
            year.users[key2].di = year.users[key2].di + user.di;
            year.users[key2].di_itemsTotal = year.users[key2].di_itemsTotal + user.di_itemsTotal;
            year.users[key2].di_service = year.users[key2].di_service + user.di_service;
            year.users[key2].di_tax = year.users[key2].di_tax + user.di_tax;
            year.users[key2].di_total = year.users[key2].di_total + user.di_total;
            year.users[key2].do = year.users[key2].do + user.do;
            year.users[key2].do_delivery = year.users[key2].do_delivery + user.do_delivery;
            year.users[key2].do_itemsTotal = year.users[key2].do_itemsTotal + user.do_itemsTotal;
            year.users[key2].do_tax = year.users[key2].do_tax + user.do_tax;
            year.users[key2].do_total = year.users[key2].do_total + user.do_total;
            year.users[key2].po = year.users[key2].po + user.po;
            year.users[key2].po_itemsTotal = year.users[key2].po_itemsTotal + user.po_itemsTotal;
            year.users[key2].po_tax = year.users[key2].po_tax + user.po_tax;
            year.users[key2].po_total = year.users[key2].po_total + user.po_total;
            year.users[key2].rv = year.users[key2].rv + user.rv;
            year.users[key2].rv1 = year.users[key2].rv1 + user.rv1;
            year.users[key2].rv2 = year.users[key2].rv2 + user.rv2;
            year.users[key2].rv3 = year.users[key2].rv3 + user.rv3;
            year.users[key2].rv4 = year.users[key2].rv4 + user.rv4;
            year.users[key2].rv5 = year.users[key2].rv5 + user.rv5;
        }
        for(const key3 in month.deliveries){
            let delivery = month.deliveries[key3];
            year.deliveries[key3].orders = year.deliveries[key3].orders + delivery.orders;
            year.deliveries[key3].time = year.deliveries[key3].time + delivery.time;
            year.deliveries[key3].avgPerOrder = year.deliveries[key3].time + year.deliveries[key3].orders;
        }
        for(const key4 in month.products){
            product = month.products[key4];
            year.products[key4].sum =  year.products[key4].sum + product.sum;
            year.products[key4].total =  year.products[key4].total + product.total;
            year.products[key4].reviews.rv =  year.products[key4].reviews.rv + product.reviews.rv;
            year.products[key4].reviews.rv1 =  year.products[key4].reviews.rv1 + product.reviews.rv1;
            year.products[key4].reviews.rv2 =  year.products[key4].reviews.rv2 + product.reviews.rv2;
            year.products[key4].reviews.rv3 =  year.products[key4].reviews.rv3 + product.reviews.rv3;
            year.products[key4].reviews.rv4 =  year.products[key4].reviews.rv4 + product.reviews.rv4;
            year.products[key4].reviews.rv5 =  year.products[key4].reviews.rv5 + product.reviews.rv5;
            for(const key5 in product.options){
                option = product.options[key5];
                for(const key6 in option){
                    selection = option[key6];
                    year.products[key4].options[key5][key6] = year.products[key4].options[key5][key6] + selection;
                }
            }
        }

    }
    return {year:year,months:months}
}
//
get_statistics_top_products = function(products,sort_key,sort){
    let top_products = [];
    for(const key in products){
        top_products.push({
            name:key,
            sum:products[key].sum,
            reviews_sum:products[key].reviews.rv,
            total:products[key].total,
            options:products[key].options,
            reviews:products[key].reviews,
        });
    }
    if(sort_key == 'name'){
        if(sort == 'desc'){
            top_products.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameB.localeCompare(nameA);
            })
        }else if(sort == 'asc'){
            top_products.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameA.localeCompare(nameB);
            })
        }
    }else{
        if(sort == 'desc'){
            top_products.sort((a,b)=>{return b[sort_key] - a[sort_key]})
        }else if(sort == 'asc'){
            top_products.sort((a,b)=>{return a[sort_key] - b[sort_key]})
        }
    }

    return top_products;
}
get_statistics_top_users = function(users,sort_key,sort){
    let top_users = [];
    for(const key in users){
        top_users.push({
            id:key,
            name:users[key].userName,
            so:users[key].so,
            so_delivery:users[key].so_delivery,
            so_itemsTotal:users[key].so_itemsTotal,
            so_service:users[key].so_service,
            so_tax:users[key].so_tax,
            so_total:users[key].so_total,
            co:users[key].co,
            co_delivery:users[key].co_delivery,
            co_itemsTotal:users[key].co_itemsTotal,
            co_service:users[key].co_service,
            co_tax:users[key].co_tax,
            co_total:users[key].co_total,
            do:users[key].do,
            do_delivery:users[key].do_delivery,
            do_itemsTotal:users[key].do_itemsTotal,
            do_tax:users[key].do_tax,
            do_total:users[key].do_total,
            po:users[key].po,
            po_itemsTotal:users[key].po_itemsTotal,
            po_tax:users[key].po_tax,
            po_total:users[key].po_total,
            di:users[key].di,
            di_itemsTotal:users[key].di_itemsTotal,
            di_service:users[key].di_service,
            di_tax:users[key].di_tax,
            di_total:users[key].di_total,
            rv:users[key].rv,
            rv1:users[key].rv1,
            rv2:users[key].rv2,
            rv3:users[key].rv3,
            rv4:users[key].rv4,
            rv5:users[key].rv5,
        })
    }

    if(sort_key == 'name'){
        if(sort == 'desc'){
            top_users.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameB.localeCompare(nameA);
            })
        }else if(sort == 'asc'){
            top_users.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameA.localeCompare(nameB);
            })
        }
    }else{
        if(sort == 'desc'){
            top_users.sort((a,b)=>{return b[sort_key] - a[sort_key]})
        }else if(sort == 'asc'){
            top_users.sort((a,b)=>{return a[sort_key] - b[sort_key]})
        }
    }

    return top_users;
}
get_statistics_top_deliveries = function(deliveries,sort_key,sort){
    let top_deliveries = [];
    for(const key in deliveries){
        top_deliveries.push({
            name:key,
            id:deliveries[key].id,
            orders:deliveries[key].orders,
            time:deliveries[key].time,
            avgPerOrder:deliveries[key].avgPerOrder
        })
    }

    if(sort_key == 'name'){
        if(sort == 'desc'){
            top_deliveries.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameB.localeCompare(nameA);
            })
        }else if(sort == 'asc'){
            top_deliveries.sort((a,b)=>{
                let nameA = a.name != null ? a.name.toLowerCase() : 'zz';
                let nameB = b.name != null ? b.name.toLowerCase() : 'zz';
                return nameA.localeCompare(nameB);
            })
        }
    }else{
        if(sort == 'desc'){
            top_deliveries.sort((a,b)=>{return b[sort_key] - a[sort_key]})
        }else if(sort == 'asc'){
            top_deliveries.sort((a,b)=>{return a[sort_key] - b[sort_key]})
        }
    }

    return top_deliveries;
}
//
compareNums = function(num1,num2,name,reverseColor=false,reverceDates){
    let percentage;
    let arrowClassUp = 'statistics-ArrowGreen'; let arrowClassDown = 'statistics-ArrowRed'
    if(reverseColor == true){arrowClassUp = 'statistics-ArrowRed';arrowClassDown = 'statistics-ArrowGreen'}else{arrowClassDown = 'statistics-ArrowRed';arrowClassUp = 'statistics-ArrowGreen'}
    if(num1 > num2){
        if(num2 == 0){
            percentage = 100
        }else{
            percentage = 100 - (( num2 / num1 ) * 100);
        }
        if(name == null){
            return `<span class="${arrowClassUp}">(${Math.ceil(percentage)}%)<span class="ico-up fs08 mis-2"></span></span>`;
        }else{
            return `<span tooltip="${texts.dashboard.arrowUpTooltip.replaceAll(':name:',name).replaceAll(':date1:',!reverceDates ? window.statistics.date1 : window.statistics.date2).replaceAll(':date2:',!reverceDates ? window.statistics.date2 : window.statistics.date1).replaceAll(':percent:',Math.ceil(percentage))}" class="${arrowClassUp}">(${Math.ceil(percentage)}%)<span class="ico-up fs08 mis-2"></span></span>`;
        }
    }else if(num1 < num2){
        if(num1 == 0){
            percentage = 100
        }else{
            percentage = 100 - (( num1 / num2 ) * 100);
        }
        if(name == null){
            return `<span class="${arrowClassDown}">(${Math.ceil(percentage)}%)<span class="ico-down fs08 mis-2"></span></span>`;
        }else{
            return `<span tooltip="${texts.dashboard.arrowDownTooltip.replaceAll(':name:',name).replaceAll(':date1:',!reverceDates ? window.statistics.date1 : window.statistics.date2).replaceAll(':date2:',!reverceDates ? window.statistics.date2 : window.statistics.date1).replaceAll(':percent:',Math.ceil(percentage))}" class="${arrowClassDown}">(${Math.ceil(percentage)}%)<span class="ico-down fs08 mis-2"></span></span>`;
        }
    }else if(num1 == num2){
        if(name == null){
            return `<span class="statistics-ArrowBlue">(0%)<span class="ico-right fs08 mis-2"></span></span>`;
        }else{
            return `<span tooltip="${texts.dashboard.arrowRightTooltip.replaceAll(':name:',name).replaceAll(':date1:',!reverceDates ? window.statistics.date1 : window.statistics.date2).replaceAll(':date2:',!reverceDates ? window.statistics.date2 : window.statistics.date1)}" class="statistics-ArrowBlue">(0%)<span class="ico-right fs08 mis-2"></span></span>`;
        }
    }
}
//
getGraphHighestNumber_orders = function(x,y,s1_,s2_){
    let heighestNum = 0;
    for(const key in s1_){
        if(x == 'orders'){
            s1_[key][y].orders > heighestNum ? heighestNum = s1_[key][y].orders : null;
        }else if(x == 'income'){
            s1_[key][y].total > heighestNum ? heighestNum = s1_[key][y].total : null;
        }
    }
    for(const key in s2_){
        if(x == 'orders'){
            s2_[key][y].orders > heighestNum ? heighestNum = s2_[key][y].orders : null;
        }else if(x == 'income'){
            s2_[key][y].total > heighestNum ? heighestNum = s2_[key][y].total : null;
        }
    }
    if(heighestNum == 0){heighestNum=1}else{
        heighestNum = heighestNum + (heighestNum / 4)
    }
    heighestNum = Math.ceil(heighestNum / 4) * 4

    return heighestNum;
}
getGraphHighestNumber_product = function(product_name,x,s1_,s2_){
    let heighestNum = 0;
    for(const key in s1_){
        if(typeof(s1_[key].products[product_name]) !== 'undefined'){
            if(x == 'orders'){
                s1_[key].products[product_name].sum > heighestNum ? heighestNum = s1_[key].products[product_name].sum : null;
            }else if(x == 'income'){
                s1_[key].products[product_name].total > heighestNum ? heighestNum = s1_[key].products[product_name].total : null;
            }
        }

    }
    for(const key in s2_){
        if(typeof(s2_[key].products[product_name]) !== 'undefined'){
            if(x == 'orders'){
                s2_[key].products[product_name].sum > heighestNum ? heighestNum = s2_[key].products[product_name].sum : null;
            }else if(x == 'income'){
                s2_[key].products[product_name].total > heighestNum ? heighestNum = s2_[key].products[product_name].total : null;
            }
        }
    }
    if(heighestNum == 0){heighestNum=1}else{
        heighestNum = heighestNum + (heighestNum / 4)
    }
    heighestNum = Math.ceil(heighestNum / 4) * 4

    return heighestNum;
}
getGraphHighestNumber_user = function(user_id,x,s1_,s2_){
    let heighestNum = 0;
    for(const key in s1_){
        if(typeof(s1_[key].users[user_id]) !== 'undefined'){
            s1_[key].users[user_id][x] > heighestNum ? heighestNum = s1_[key].users[user_id][x] : null;
        }

    }
    for(const key in s2_){
        if(typeof(s2_[key].users[user_id]) !== 'undefined'){
            s2_[key].users[user_id][x] > heighestNum ? heighestNum = s2_[key].users[user_id][x] : null;
        }
    }
    if(heighestNum == 0){heighestNum=1}else{
        heighestNum = heighestNum + (heighestNum / 4)
    }
    heighestNum = Math.ceil(heighestNum / 4) * 4

    return heighestNum;
}
getGraphHighestNumber_delivery = function(delivery_name,x,s1_,s2_){
    let heighestNum = 0;
    for(const key in s1_){
        if(typeof(s1_[key].deliveries[delivery_name]) !== 'undefined'){
            s1_[key].deliveries[delivery_name][x] > heighestNum ? heighestNum = s1_[key].deliveries[delivery_name][x] : null;
        }

    }
    for(const key in s2_){
        if(typeof(s2_[key].deliveries[delivery_name]) !== 'undefined'){
            s2_[key].deliveries[delivery_name][x] > heighestNum ? heighestNum = s2_[key].deliveries[delivery_name][x] : null;
        }
    }
    if(heighestNum == 0){heighestNum=1}else{
        heighestNum = heighestNum + (heighestNum / 4)
    }
    heighestNum = Math.ceil(heighestNum / 4) * 4

    return heighestNum;
}
//
minsToTime = function(time){
    time = time / 60;
    if(time == 1){
        return Math.round(time)+texts.dashboard.min
    }else if(time < 60){
        return Math.round(time)+texts.dashboard.min
    }else{
        let hourText;
        let minuteText;
        let num = time;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);

        if(rhours == 1){
            hourText = bigInt(rhours)+texts.dashboard.hour
        }else{hourText = bigInt(rhours)+texts.dashboard.hour}
        if(rminutes == 0){
            minuteText = '';
        }else if(rminutes == 1){
            minuteText = texts.cpanel.public.and+' '+rminutes+texts.dashboard.min
        }else{minuteText = texts.cpanel.public.and+' '+rminutes+texts.dashboard.min}

        return hourText+' '+minuteText;
    }
}
//
