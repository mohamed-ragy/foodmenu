drawStatisticsGraph = function(id,h,w,type,heighestNum){
    let graph = `<svg id="${id}" width="${w}" height="${h + 30}" class="ofV">`;
    graph = graph + `
    <line x1="50" y1="${h}" x2="${w}" y2="${h}" stroke="var(--white-10)" stroke-width="1" />
    <text text-anchor="end" dominant-baseline="middle" x="40" y="${(h/4)*3}" class="fs07 taE">${type == 'income' ? website.currency : ''}${bigFloat(heighestNum/4)}</text>

    <line x1="50" y1="${h/4}" x2="${w}" y2="${h/4}" stroke="var(--white-5)" stroke-width="1" />
    <text text-anchor="end" dominant-baseline="middle" x="40" y="${(h/2)}" class="fs07 taE">${type == 'income' ? website.currency : ''}${bigFloat(heighestNum/2)}</text>

    <line x1="50" y1="${(h/4)*2}" x2="${w}" y2="${(h/4)*2}" stroke="var(--white-5)" stroke-width="1" />
    <text text-anchor="end" dominant-baseline="middle" x="40" y="${(h/4)}" class="fs07 taE">${type == 'income' ? website.currency : ''}${bigFloat((heighestNum/4)*3)}</text>

    <line x1="50" y1="${(h/4)*3}" x2="${w}" y2="${(h/4)*3}" stroke="var(--white-5)" stroke-width="1" />
    `;
    w = w - 50;
    if(window.page.period == 'day'){
        for(x=0;x<23;x++){
            if(x == 0 || x == 4 || x == 8 || x == 12 ||  x == 16 || x == 20){
                graph = graph + `
                    <line x1="${(w/23)*x+50}" y1="0" x2="${(w/23)*x+50}" y2="${h+30}" stroke="var(--white-5)" stroke-width="1" />
                    <text text-anchor="start" dominant-baseline="start" x="${(w/23)*x+50+5}" y="${h+30}" class="fs07 taE">${floatToTime(x,0)[0]}:${floatToTime(x,0)[1]}${floatToTime(x,0)[2]}</text>
                `;
            }else{
                graph = graph + `
                    <line x1="${(w/23)*x+50}" y1="0" x2="${(w/23)*x+50}" y2="${h}" stroke="var(--white-3)" stroke-width="1" />
                `;
            }
        }
    }else if(window.page.period == 'month'){
        let numDays1 = new Date(window.page.year1, window.page.month1, 0).getDate();
        let numDays2 = new Date(window.page.year2, window.page.month2, 0).getDate();
        let numDays = numDays1 - 1;
        if(window.page.compare == 1 && numDays2 > numDays1){numDays = numDays2 - 1}
        for(x=0;x<numDays;x++){
            if(x == 0 || x == 5 || x == 10 || x == 15 || x == 20 ||  x == 25){
                graph = graph + `
                    <line x1="${(w/numDays)*x+50}" y1="0" x2="${(w/numDays)*x+50}" y2="${h+30}" stroke="var(--white-5)" stroke-width="1" />
                    <text text-anchor="start" dominant-baseline="start" x="${(w/numDays)*x+50+5}" y="${h+30}" class="fs07 taE">${getDate(Date.parse(new Date(window.page.year1,window.page.month1 - 1,x + 1,10,10,10))/1000).month_day_short.local}</text>
                `;
                if(window.page.compare == 1){
                    graph = graph + `
                    <text text-anchor="start" dominant-baseline="start" x="${(w/numDays)*x+50+5}" y="${h+45}" class="fs07 taE">${getDate(Date.parse(new Date(window.page.year2,window.page.month2 - 1,x + 1,10,10,10))/1000).month_day_short.local}</text>
                `;
                }
            }else{
                graph = graph + `
                    <line x1="${(w/numDays)*x+50}" y1="0" x2="${(w/numDays)*x+50}" y2="${h}" stroke="var(--white-3)" stroke-width="1" />
                `;
            }
        }
    }else if(window.page.period == 'year'){
        for(x=0;x<11;x++){
            if(x == 0 || x == 3 || x == 6 || x == 9){
                graph = graph + `
                    <line x1="${(w/11)*x+50}" y1="0" x2="${(w/11)*x+50}" y2="${h+30}" stroke="var(--white-5)" stroke-width="1" />
                    <text text-anchor="start" dominant-baseline="start" x="${(w/11)*x+50+5}" y="${h+30}" class="fs07 taE">${getDate(Date.parse(new Date(window.page.year1,x,1,10,10,10))/1000).month_short.local}</text>
                `;
            }else{
                graph = graph + `
                    <line x1="${(w/11)*x+50}" y1="0" x2="${(w/11)*x+50}" y2="${h}" stroke="var(--white-3)" stroke-width="1" />
                `;
            }
        }
    }

    return graph;
}
fillStatisticsGraph_orders = function(id,h,w,ordersKey,ordersKey2,heighestNum){

    w = w - 50;
    let path = `M 50 ${h} L `;
    let path2 = `M 50 ${h} L `;
    $(`#${id}`).find('.statisticsGraph_circle').remove();
    let pathHtml = $(`#${id}`).html();

    if(window.page.period == 'day'){
        for(const key in window.statistics.s1_){
            let s = window.statistics.s1_[key];let s2;
            let heightPercent = (s[ordersKey][ordersKey2]/heighestNum)*100;
            let heightPercent2 = 0 ;
            let date1 = ''; let date2 ='';
            path = path + ` ${(w/23)*s.hour+50} ${h - ((heightPercent/100)*h)}, `
            date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,s.hour,0,10,10))/1000).date_time.local;
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.hour == s.hour);
                date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,s2.day,s2.hour,0,10,10))/1000).date_time.local;
                heightPercent2 = (s2[ordersKey][ordersKey2]/heighestNum)*100;
                path2 = path2 + `${(w/23)*s2.hour+50} ${h - ((heightPercent2/100)*h)},`
                pathHtml = pathHtml + `<circle key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s2.hour+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
            }
            pathHtml = pathHtml + `<circle  key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s.hour+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`


        }
    }else if(window.page.period == 'month'){
        let numDays1 = new Date(window.page.year1, window.page.month1, 0).getDate();
        let numDays2 = new Date(window.page.year2, window.page.month2, 0).getDate();
        let numDays = numDays1 - 1;
        if(window.page.compare == 1 && numDays2 > numDays1){numDays = numDays2 - 1}
        for(x=0;x<=numDays;x++){
            let s = window.statistics.s1_.find(item=>item.day == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,1,0,10,10))/1000).date.local;
            }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.day == x+1);
                if(typeof(s2) !== 'undefined'){
                    date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,s2.day,1,0,10,10))/1000).date.local;
                    heightPercent2 = (s2[ordersKey][ordersKey2]/heighestNum)*100;
                    path2 = path2 + ` ${(w/numDays)*(s2.day - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                    if(typeof(s) !== 'undefined'){
                        pathHtml = pathHtml + `<circle key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml + `<circle key1="orders" key2="${ordersKey}" key3="null" key4="${s2._id}" key5="null" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                    }
                }else{
                    path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }

            if(typeof(s) !== 'undefined'){
                heightPercent = (s[ordersKey][ordersKey2]/heighestNum)*100;
                path = path + ` ${(w/numDays)*(s.day - 1)+50} ${h - ((heightPercent/100)*h)}, `
                if(typeof(s2) !== 'undefined'){
                    pathHtml = pathHtml + `<circle key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                }else{
                    pathHtml = pathHtml + `<circle key1="orders" key2="${ordersKey}" key3="${s._id}" key4="" key5="${date1}" key6="" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                }
            }else{
                path = path + ` ${(w/numDays)*(x)+50} ${h}, `

            }

        }
    }else if(window.page.period == 'year'){
        for(x=0;x<=11;x++){
            let s = window.statistics.s1_.find(item=>item.month == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(s.year,s.month - 1,1,1,0,10,10))/1000).month_year.local;
            }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.month == x+1);
                if(typeof(s2) !== 'undefined'){
                    date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,1,1,0,10,10))/1000).month_year.local;
                    heightPercent2 = (s2[ordersKey][ordersKey2]/heighestNum)*100;
                    path2 = path2 + ` ${(w/11)*(s2.month - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                    if(typeof(s) !== 'undefined'){
                        pathHtml = pathHtml  + `<circle key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml  + `<circle key1="orders" key2="${ordersKey}" key3="null" key4="${s2._id}" key5="null" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                    }
                }else{
                    path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                }
            }
            if(typeof(s) !== 'undefined'){
                heightPercent = (s[ordersKey][ordersKey2]/heighestNum)*100;
                path = path + ` ${(w/11)*(s.month - 1)+50} ${h - ((heightPercent/100)*h)}, `
                if(typeof(s2) !== 'undefined'){
                    pathHtml = pathHtml  + `<circle  key1="orders" key2="${ordersKey}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                }else{
                    pathHtml = pathHtml  + `<circle  key1="orders" key2="${ordersKey}" key3="${s._id}" key4="" key5="${date1}" key6="" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                }

            }else{
                path = path + ` ${(w/11)*(x)+50} ${h}, `

            }
        }
    }

    if($(`#${id}`).find('.statisticsGraph_path1').length == 0){
        pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path1" d="${path} ${w+50},${h}" fill="var(--cs1-30)" stroke="var(--cs1-70)" stroke-width="2" />`
        $(`#${id}`).html(pathHtml )
    }else{
        $(`#${id}`).html(pathHtml )
        setTimeout(function(){
            $(`#${id}`).find('.statisticsGraph_path1').attr('d',`${path} ${w+50},${h}`)
        },1)
    }

    if(window.page.compare == 1){
        if($(`#${id}`).find('.statisticsGraph_path2').length == 0){
            pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path2" d="${path2} ${w+50},${h}" fill="var(--cs2-30)" stroke="var(--cs2-70)" stroke-width="2" />`
            $(`#${id}`).html(pathHtml )
        }else{
            $(`#${id}`).html(pathHtml )
            setTimeout(function(){
                $(`#${id}`).find('.statisticsGraph_path2').attr('d',`${path2} ${w+50},${h}`)
            },1)
        }
    }


}
fillStatisticsGraph_product = function(id,h,w,obj_key,obj_key2,heighestNum){

    w = w - 50;
    let path = `M 50 ${h} L `;
    let path2 = `M 50 ${h} L `;
    $(`#${id}`).find('.statisticsGraph_circle').remove();
    let pathHtml = $(`#${id}`).html();

    if(window.page.period == 'day'){
        for(const key in window.statistics.s1_){
            let s = window.statistics.s1_[key];let s2;
            let heightPercent = 0;
            let heightPercent2 = 0 ;
            let date1 = ''; let date2 ='';
            date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,s.hour,0,10,10))/1000).date_time.local;

            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.hour == s.hour);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,window.statistics.s2.month - 1,window.statistics.s2.day,s.hour,0,10,10))/1000).date_time.local;
                if(typeof(s2.products[obj_key]) !== 'undefined'){
                    heightPercent2 = (s2.products[obj_key][obj_key2]/heighestNum)*100;
                    path2 = path2 + `${(w/23)*s2.hour+50} ${h - ((heightPercent2/100)*h)},`
                    pathHtml = pathHtml + `<circle key1="product" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s2.hour+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                }else{
                    path2 = path2 + ` ${(w/23)*s.hour+50} ${h}, `

                }
            }

            if(typeof(s.products[obj_key]) !== 'undefined'){
                heightPercent = (s.products[obj_key][obj_key2]/heighestNum)*100;
                path = path + ` ${(w/23)*s.hour+50} ${h - ((heightPercent/100)*h)}, `
                pathHtml = pathHtml + `<circle  key1="product" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s.hour+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
            }else{
                path = path + ` ${(w/23)*s.hour+50} ${h}, `
            }
        }
    }else if(window.page.period == 'month'){
        let numDays1 = new Date(window.page.year1, window.page.month1, 0).getDate();
        let numDays2 = new Date(window.page.year2, window.page.month2, 0).getDate();
        let numDays = numDays1 - 1;
        if(window.page.compare == 1 && numDays2 > numDays1){numDays = numDays2 - 1}
        for(x=0;x<=numDays;x++){
            let s = window.statistics.s1_.find(item=>item.day == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,1,0,10,10))/1000).date.local;
            }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.day == x+1);
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.products[obj_key]) !== 'undefined'){
                        date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,s2.day,1,0,10,10))/1000).date.local;
                        heightPercent2 = (s2.products[obj_key][obj_key2]/heighestNum)*100;
                        path2 = path2 + ` ${(w/numDays)*(s2.day - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                        if(typeof(s) !== 'undefined'){
                            pathHtml = pathHtml + `<circle key1="product" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml + `<circle key1="product" key2="${obj_key}" key3="null" key4="${s2._id}" key5="" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }
                    }else{
                        path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }

            if(typeof(s) !== 'undefined'){
                if(typeof(s.products[obj_key]) !== 'undefined'){
                    heightPercent = (s.products[obj_key][obj_key2]/heighestNum)*100;
                    path = path + ` ${(w/numDays)*(s.day - 1)+50} ${h - ((heightPercent/100)*h)}, `
                    if(typeof(s2) !== 'undefined'){
                        pathHtml = pathHtml + `<circle key1="product" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml + `<circle key1="product" key2="${obj_key}" key3="${s._id}" key4="" key5="${date1}" key6="" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }
                }else{
                    path = path + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }else{
                path = path + ` ${(w/numDays)*(x)+50} ${h}, `

            }

        }
    }else if(window.page.period == 'year'){
        for(x=0;x<=11;x++){
            let s = window.statistics.s1_.find(item=>item.month == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            // if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(window.statistics.s1.year,x,1,1,0,10,10))/1000).month_year.local;
            // }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.month == x+1);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,x,1,1,0,10,10))/1000).month_year.local;
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.products[obj_key]) !== 'undefined'){
                        heightPercent2 = (s2.products[obj_key][obj_key2]/heighestNum)*100;
                        path2 = path2 + ` ${(w/11)*(s2.month - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                        if(typeof(s) !== 'undefined'){
                            pathHtml = pathHtml  + `<circle key1="product" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml  + `<circle key1="product" key2="${obj_key}" key3="" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }
                    }else{
                        path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                }
            }
            if(typeof(s) !== 'undefined'){
                if(typeof(s.products[obj_key]) !== 'undefined'){
                    heightPercent = (s.products[obj_key][obj_key2]/heighestNum)*100;
                    path = path + ` ${(w/11)*(s.month - 1)+50} ${h - ((heightPercent/100)*h)}, `
                    if(typeof(s2) !== 'undefined'){
                        pathHtml = pathHtml  + `<circle  key1="product" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml  + `<circle  key1="product" key2="${obj_key}" key3="${s._id}" key4="" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }
                }else{
                    path = path + ` ${(w/11)*(x)+50} ${h}, `
                }
            }else{
                path = path + ` ${(w/11)*(x)+50} ${h}, `

            }
        }
    }

    if($(`#${id}`).find('.statisticsGraph_path1').length == 0){
        pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path1" d="${path} ${w+50},${h}" fill="var(--cs1-30)" stroke="var(--cs1-70)" stroke-width="2" />`
        $(`#${id}`).html(pathHtml )
    }else{
        $(`#${id}`).html(pathHtml )
        setTimeout(function(){
            $(`#${id}`).find('.statisticsGraph_path1').attr('d',`${path} ${w+50},${h}`)
        },1)
    }

    if(window.page.compare == 1){
        if($(`#${id}`).find('.statisticsGraph_path2').length == 0){
            pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path2" d="${path2} ${w+50},${h}" fill="var(--cs2-30)" stroke="var(--cs2-70)" stroke-width="2" />`
            $(`#${id}`).html(pathHtml )
        }else{
            $(`#${id}`).html(pathHtml )
            setTimeout(function(){
                $(`#${id}`).find('.statisticsGraph_path2').attr('d',`${path2} ${w+50},${h}`)
            },1)
        }
    }


}
fillStatisticsGraph_user_orders = function(id,h,w,obj_key,user_id,heighestNum){
    w = w - 50;
    let path = `M 50 ${h} L `;
    let path2 = `M 50 ${h} L `;
    $(`#${id}`).find('.statisticsGraph_circle').remove();
    let pathHtml = $(`#${id}`).html();

    if(window.page.period == 'day'){
        for(const key in window.statistics.s1_){
            let s = window.statistics.s1_[key];let s2;
            let heightPercent = 0;
            let heightPercent2 = 0 ;
            let date1 = ''; let date2 ='';
            date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,s.hour,0,10,10))/1000).date_time.local;

            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.hour == s.hour);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,window.statistics.s2.month - 1,window.statistics.s2.day,s.hour,0,10,10))/1000).date_time.local;
                if(typeof(s2.users[user_id]) !== 'undefined'){
                    if(s2.users[user_id][obj_key] > 0){
                        heightPercent2 = (s2.users[user_id][obj_key]/heighestNum)*100;
                        path2 = path2 + `${(w/23)*s2.hour+50} ${h - ((heightPercent2/100)*h)},`
                        pathHtml = pathHtml + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s2.hour+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                    }else{
                        path2 = path2 + ` ${(w/23)*s.hour+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/23)*s.hour+50} ${h}, `
                }
            }

            if(typeof(s.users[user_id]) !== 'undefined'){
                if(s.users[user_id][obj_key] > 0){
                    heightPercent = (s.users[user_id][obj_key]/heighestNum)*100;
                    path = path + ` ${(w/23)*s.hour+50} ${h - ((heightPercent/100)*h)}, `
                    pathHtml = pathHtml + `<circle  key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s.hour+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                }else{
                    path = path + ` ${(w/23)*s.hour+50} ${h}, `
                }
            }else{
                path = path + ` ${(w/23)*s.hour+50} ${h}, `
            }
        }
    }else if(window.page.period == 'month'){
        let numDays1 = new Date(window.page.year1, window.page.month1, 0).getDate();
        let numDays2 = new Date(window.page.year2, window.page.month2, 0).getDate();
        let numDays = numDays1 - 1;
        if(window.page.compare == 1 && numDays2 > numDays1){numDays = numDays2 - 1}
        for(x=0;x<=numDays;x++){
            let s = window.statistics.s1_.find(item=>item.day == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,1,0,10,10))/1000).date.local;
            }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.day == x+1);
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.users[user_id]) !== 'undefined'){
                        if(s2.users[user_id][obj_key] > 0){
                            date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,s2.day,1,0,10,10))/1000).date.local;
                            heightPercent2 = (s2.users[user_id][obj_key]/heighestNum)*100;
                            path2 = path2 + ` ${(w/numDays)*(s2.day - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                            if(typeof(s) !== 'undefined'){
                                pathHtml = pathHtml + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                            }else{
                                pathHtml = pathHtml + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="null" key4="${s2._id}" key5="" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                            }
                        }else{
                            path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                        }
                    }else{
                        path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }

            if(typeof(s) !== 'undefined'){
                if(typeof(s.users[user_id]) !== 'undefined'){
                    if(s.users[user_id][obj_key] > 0){
                        heightPercent = (s.users[user_id][obj_key]/heighestNum)*100;
                        path = path + ` ${(w/numDays)*(s.day - 1)+50} ${h - ((heightPercent/100)*h)}, `
                        if(typeof(s2) !== 'undefined'){
                            pathHtml = pathHtml + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="" key5="${date1}" key6="" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                        }
                    }else{
                        path = path + ` ${(w/numDays)*(x)+50} ${h}, `
                    }
                }else{
                    path = path + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }else{
                path = path + ` ${(w/numDays)*(x)+50} ${h}, `

            }

        }
    }else if(window.page.period == 'year'){
        for(x=0;x<=11;x++){
            let s = window.statistics.s1_.find(item=>item.month == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            // if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(window.statistics.s1.year,x,1,1,0,10,10))/1000).month_year.local;
            // }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.month == x+1);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,x,1,1,0,10,10))/1000).month_year.local;
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.users[user_id]) !== 'undefined'){
                        if(s2.users[user_id][obj_key] > 0){
                            heightPercent2 = (s2.users[user_id][obj_key]/heighestNum)*100;
                            path2 = path2 + ` ${(w/11)*(s2.month - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                            if(typeof(s) !== 'undefined'){
                                pathHtml = pathHtml  + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                            }else{
                                pathHtml = pathHtml  + `<circle key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                            }
                        }else{
                            path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                        }
                    }else{
                        path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                }
            }
            if(typeof(s) !== 'undefined'){
                if(typeof(s.users[user_id]) !== 'undefined'){
                    if(s.users[user_id][obj_key] > 0){
                        heightPercent = (s.users[user_id][obj_key]/heighestNum)*100;
                        path = path + ` ${(w/11)*(s.month - 1)+50} ${h - ((heightPercent/100)*h)}, `
                        if(typeof(s2) !== 'undefined'){
                            pathHtml = pathHtml  + `<circle  key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml  + `<circle  key1="user_${obj_key.replace('_total','')}" key2="${user_id}" key3="${s._id}" key4="" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                        }
                    }else{
                        path = path + ` ${(w/11)*(x)+50} ${h}, `
                    }
                }else{
                    path = path + ` ${(w/11)*(x)+50} ${h}, `
                }
            }else{
                path = path + ` ${(w/11)*(x)+50} ${h}, `

            }
        }
    }

    if($(`#${id}`).find('.statisticsGraph_path1').length == 0){
        pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path1" d="${path} ${w+50},${h}" fill="var(--cs1-30)" stroke="var(--cs1-70)" stroke-width="2" />`
        $(`#${id}`).html(pathHtml )
    }else{
        $(`#${id}`).html(pathHtml )
        setTimeout(function(){
            $(`#${id}`).find('.statisticsGraph_path1').attr('d',`${path} ${w+50},${h}`)
        },1)
    }

    if(window.page.compare == 1){
        if($(`#${id}`).find('.statisticsGraph_path2').length == 0){
            pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path2" d="${path2} ${w+50},${h}" fill="var(--cs2-30)" stroke="var(--cs2-70)" stroke-width="2" />`
            $(`#${id}`).html(pathHtml )
        }else{
            $(`#${id}`).html(pathHtml )
            setTimeout(function(){
                $(`#${id}`).find('.statisticsGraph_path2').attr('d',`${path2} ${w+50},${h}`)
            },1)
        }
    }
}
fillStatisticsGraph_delivery = function(id,h,w,obj_key,obj_key2,heighestNum){
    w = w - 50;
    let path = `M 50 ${h} L `;
    let path2 = `M 50 ${h} L `;
    $(`#${id}`).find('.statisticsGraph_circle').remove();
    let pathHtml = $(`#${id}`).html();

    if(window.page.period == 'day'){
        for(const key in window.statistics.s1_){
            let s = window.statistics.s1_[key];let s2;
            let heightPercent = 0;
            let heightPercent2 = 0 ;
            let date1 = ''; let date2 ='';
            date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,s.hour,0,10,10))/1000).date_time.local;

            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.hour == s.hour);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,window.statistics.s2.month - 1,window.statistics.s2.day,s.hour,0,10,10))/1000).date_time.local;
                if(typeof(s2.deliveries[obj_key]) !== 'undefined'){
                    heightPercent2 = (s2.deliveries[obj_key][obj_key2]/heighestNum)*100;
                    path2 = path2 + `${(w/23)*s2.hour+50} ${h - ((heightPercent2/100)*h)},`
                    pathHtml = pathHtml + `<circle key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s2.hour+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                }else{
                    path2 = path2 + ` ${(w/23)*s.hour+50} ${h}, `

                }
            }

            if(typeof(s.deliveries[obj_key]) !== 'undefined'){
                heightPercent = (s.deliveries[obj_key][obj_key2]/heighestNum)*100;
                path = path + ` ${(w/23)*s.hour+50} ${h - ((heightPercent/100)*h)}, `
                pathHtml = pathHtml + `<circle  key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle " cx="${(w/23)*s.hour+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
            }else{
                path = path + ` ${(w/23)*s.hour+50} ${h}, `
            }
        }
    }else if(window.page.period == 'month'){
        let numDays1 = new Date(window.page.year1, window.page.month1, 0).getDate();
        let numDays2 = new Date(window.page.year2, window.page.month2, 0).getDate();
        let numDays = numDays1 - 1;
        if(window.page.compare == 1 && numDays2 > numDays1){numDays = numDays2 - 1}
        for(x=0;x<=numDays;x++){
            let s = window.statistics.s1_.find(item=>item.day == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            if(typeof(s) !== 'undefined'){
                date1 = getDate(Date.parse(new Date(s.year,s.month - 1,s.day,1,0,10,10))/1000).date.local;
            }
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.day == x+1);
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.deliveries[obj_key]) !== 'undefined'){
                        date2 = getDate(Date.parse(new Date(s2.year,s2.month - 1,s2.day,1,0,10,10))/1000).date.local;
                        heightPercent2 = (s2.deliveries[obj_key][obj_key2]/heighestNum)*100;
                        path2 = path2 + ` ${(w/numDays)*(s2.day - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                        if(typeof(s) !== 'undefined'){
                            pathHtml = pathHtml + `<circle key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml + `<circle key1="delivery" key2="${obj_key}" key3="null" key4="${s2._id}" key5="" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.day}" cx="${(w/numDays)*(s2.day - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }
                    }else{
                        path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }

            if(typeof(s) !== 'undefined'){
                if(typeof(s.deliveries[obj_key]) !== 'undefined'){
                    heightPercent = (s.deliveries[obj_key][obj_key2]/heighestNum)*100;
                    path = path + ` ${(w/numDays)*(s.day - 1)+50} ${h - ((heightPercent/100)*h)}, `
                    if(typeof(s2) !== 'undefined'){
                        pathHtml = pathHtml + `<circle key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml + `<circle key1="delivery" key2="${obj_key}" key3="${s._id}" key4="" key5="${date1}" key6="" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.day}" cx="${(w/numDays)*(s.day - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }
                }else{
                    path = path + ` ${(w/numDays)*(x)+50} ${h}, `
                }

            }else{
                path = path + ` ${(w/numDays)*(x)+50} ${h}, `

            }

        }
    }else if(window.page.period == 'year'){
        for(x=0;x<=11;x++){
            let s = window.statistics.s1_.find(item=>item.month == x+1);
            let s2;
            let heightPercent = 0;
            let heightPercent2 = 0;
            let date1 = ''; let date2 ='';
            date1 = getDate(Date.parse(new Date(window.statistics.s1.year,x,1,1,0,10,10))/1000).month_year.local;
            if(window.page.compare == 1){
                s2 = window.statistics.s2_.find(item=>item.month == x+1);
                date2 = getDate(Date.parse(new Date(window.statistics.s2.year,x,1,1,0,10,10))/1000).month_year.local;
                if(typeof(s2) !== 'undefined'){
                    if(typeof(s2.deliveries[obj_key]) !== 'undefined'){
                        heightPercent2 = (s2.deliveries[obj_key][obj_key2]/heighestNum)*100;
                        path2 = path2 + ` ${(w/11)*(s2.month - 1)+50} ${h - ((heightPercent2/100)*h)}, `
                        if(typeof(s) !== 'undefined'){
                            pathHtml = pathHtml  + `<circle key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }else{
                            pathHtml = pathHtml  + `<circle key1="delivery" key2="${obj_key}" key3="null" key4="${s2._id}" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle2_${s2.month}" cx="${(w/11)*(s2.month - 1)+50}" cy="${h - ((heightPercent2/100)*h)}" r="4" fill="transparent" stroke="var(--cs2-70)" stroke-width="2" />`
                        }
                    }else{
                        path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                    }
                }else{
                    path2 = path2 + ` ${(w/11)*(x)+50} ${h}, `
                }
            }
            if(typeof(s) !== 'undefined'){
                if(typeof(s.deliveries[obj_key]) !== 'undefined'){
                    heightPercent = (s.deliveries[obj_key][obj_key2]/heighestNum)*100;
                    path = path + ` ${(w/11)*(s.month - 1)+50} ${h - ((heightPercent/100)*h)}, `
                    if(typeof(s2) !== 'undefined'){
                        pathHtml = pathHtml  + `<circle  key1="delivery" key2="${obj_key}" key3="${s._id}" key4="${window.page.compare == 1 ? s2._id : ''}" key5="${date1}" key6="${window.page.compare == 1 ? date2 : ''}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }else{
                        pathHtml = pathHtml  + `<circle  key1="delivery" key2="${obj_key}" key3="${s._id}" key4="" key5="${date1}" key6="${date2}" class="statisticspopup statisticsGraph_circle statisticsGraph_circle1_${s.month}" cx="${(w/11)*(s.month - 1)+50}" cy="${h - ((heightPercent/100)*h)}" r="4" fill="transparent" stroke="var(--cs1-70)" stroke-width="2" />`
                    }
                }else{
                    path = path + ` ${(w/11)*(x)+50} ${h}, `
                }
            }else{
                path = path + ` ${(w/11)*(x)+50} ${h}, `

            }
        }
    }

    if($(`#${id}`).find('.statisticsGraph_path1').length == 0){
        pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path1" d="${path} ${w+50},${h}" fill="var(--cs1-30)" stroke="var(--cs1-70)" stroke-width="2" />`
        $(`#${id}`).html(pathHtml )
    }else{
        $(`#${id}`).html(pathHtml )
        setTimeout(function(){
            $(`#${id}`).find('.statisticsGraph_path1').attr('d',`${path} ${w+50},${h}`)
        },1)
    }

    if(window.page.compare == 1){
        if($(`#${id}`).find('.statisticsGraph_path2').length == 0){
            pathHtml = pathHtml + `<path class="statisticsGraph_path statisticsGraph_path2" d="${path2} ${w+50},${h}" fill="var(--cs2-30)" stroke="var(--cs2-70)" stroke-width="2" />`
            $(`#${id}`).html(pathHtml )
        }else{
            $(`#${id}`).html(pathHtml )
            setTimeout(function(){
                $(`#${id}`).find('.statisticsGraph_path2').attr('d',`${path2} ${w+50},${h}`)
            },1)
        }
    }


}
