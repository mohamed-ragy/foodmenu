servicesDonut = function(container,doo,po,di){
    fullPercent = doo + po + di;
    let percentCircles = []
    if(fullPercent == 0){
        percent1 = 0;
        percent2 = 0;
        percent3 = 0;
        percent1_circle = 376.5 / 1.5;
        percent2_circle = 376.5 / 1.5;
        percent3_circle = 376.5 / 1.5;
        rotate2 =  - 120;
        rotate1 = - 240;

        percentCircles = [
            {num:percent1,sort:1},
            {num:percent2,sort:2},
            {num:percent3,sort:3},
        ].sort((a,b) => a.num - b.num);
        percentCircles[0].class = 'strokeWidth45';
        percentCircles[1].class = 'strokeWidth45';
        percentCircles[2].class = 'strokeWidth45';
    }else{
        percent1 = (doo / fullPercent ) * 100;
        percent2 = (po / fullPercent ) * 100;
        percent3 = (di / fullPercent ) * 100;
        percent1_circle = (376.5 / 100) * (percent2 + percent3);
        percent2_circle = (376.5 / 100) * (percent1 + percent3);
        percent3_circle = (376.5 / 100) * (percent2 + percent1);
        rotate2 = ((((doo + di ) / fullPercent)* 100 ) * 3.6) * - 1;
        rotate1 = (((((doo + po) / fullPercent)* 100 ) * 3.6) * - 1) + rotate2;

        percentCircles = [
            {num:percent1,sort:1},
            {num:percent2,sort:2},
            {num:percent3,sort:3},
        ].sort((a,b) => a.num - b.num);
        percentCircles[0].class = 'strokeWidth40';
        percentCircles[1].class = 'strokeWidth45';
        percentCircles[2].class = 'strokeWidth50';
        percentCircles.sort((a,b) => a.sort - b.sort);
    }


    container.text('').append(
        $('<div/>',{class:'statisticsDonutOutside',html:`
            <svg height="200" width="200" >
                <circle class="statisticsDonutStroke statisticspopup statisticsDonutStroke-delivery ${percentCircles[0].class}" cx="100" cy="100" r="60" stroke="var(--cdelivery)" style="stroke-dashoffset: ${( percent1_circle )};transform:rotate(${rotate1}deg)"/>
                <circle class="statisticsDonutStroke statisticspopup statisticsDonutStroke-pickup ${percentCircles[1].class}" cx="100" cy="100" r="60" stroke="var(--cpickup)" style="stroke-dashoffset: ${( percent2_circle )};"/>
                <circle class="statisticsDonutStroke statisticspopup statisticsDonutStroke-dineIn ${percentCircles[2].class}" cx="100" cy="100" r="60" stroke="var(--cdineIn)" style="stroke-dashoffset: ${( percent3_circle )};transform:rotate(${rotate2}deg)"/>
            </svg>

        `}),
    )
    container.find('.statisticsDonutStroke-delivery').attr('key1','orders')
    container.find('.statisticsDonutStroke-delivery').attr('key2','do')
    container.find('.statisticsDonutStroke-delivery').attr('key3',window.statistics.s1._id)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-delivery').attr('key4',window.statistics.s2._id) : null;
    container.find('.statisticsDonutStroke-delivery').attr('key5',window.statistics.date1)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-delivery').attr('key6',window.statistics.date2) : null;


    container.find('.statisticsDonutStroke-pickup').attr('key1','orders')
    container.find('.statisticsDonutStroke-pickup').attr('key2','po')
    container.find('.statisticsDonutStroke-pickup').attr('key3',window.statistics.s1._id)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-pickup').attr('key4',window.statistics.s2._id) : null;
    container.find('.statisticsDonutStroke-pickup').attr('key5',window.statistics.date1)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-pickup').attr('key6',window.statistics.date2) : null;


    container.find('.statisticsDonutStroke-dineIn').attr('key1','orders')
    container.find('.statisticsDonutStroke-dineIn').attr('key2','di')
    container.find('.statisticsDonutStroke-dineIn').attr('key3',window.statistics.s1._id)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-dineIn').attr('key4',window.statistics.s2._id) : null;
    container.find('.statisticsDonutStroke-dineIn').attr('key5',window.statistics.date1)
    window.page.compare == 1 ? container.find('.statisticsDonutStroke-dineIn').attr('key6',window.statistics.date2) : null;


}
