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

// incomeDonut = function(container,total,items_total,tax,deliveryCost,service){
//     fullPercent = items_total + tax + deliveryCost + service;
//     let percentCircles = []
//     if(fullPercent == 0){
//         percent1 = 0;
//         percent2 = 0;
//         percent3 = 0;
//         percent4 = 0;
//         percent1_circle = 376.5;
//         percent2_circle = 376.5;
//         percent3_circle = 376.5;
//         percent4_circle = 376.5;
//         rotate3 =  - 90;
//         rotate2 =  - 180;
//         rotate1 = - 270;

//         percentCircles = [
//             {num:percent1,sort:1},
//             {num:percent2,sort:2},
//             {num:percent3,sort:3},
//             {num:percent4,sort:4},
//         ].sort((a,b) => a.num - b.num);
//         percentCircles[0].class = 'strokeWidth45';
//         percentCircles[1].class = 'strokeWidth45';
//         percentCircles[2].class = 'strokeWidth45';
//         percentCircles[3].class = 'strokeWidth45';

//     }else{
//         percent1 = (items_total / fullPercent ) * 100;
//         percent2 = (tax / fullPercent ) * 100;
//         percent3 = (deliveryCost / fullPercent ) * 100;
//         percent4 = (service / fullPercent ) * 100;
//         percent1_circle = (376.5 / 100) * (percent2 + percent3 + percent4);
//         percent2_circle = (376.5 / 100) * (percent1 + percent3 + percent4);
//         percent3_circle = (376.5 / 100) * (percent2 + percent1 + percent4);
//         percent4_circle = (376.5 / 100) * (percent2 + percent1 + percent3);

//         rotate1 = (((( tax + deliveryCost + service) / fullPercent)* 100 ) * 3.6) * - 1;
//         rotate2 = ((((deliveryCost + service ) / fullPercent)* 100 ) * 3.6) * - 1;
//         rotate3 = ((((service) / fullPercent)* 100 ) * 3.6) * - 1;

//         percentCircles = [
//             {num:percent1,sort:1},
//             {num:percent2,sort:2},
//             {num:percent3,sort:3},
//             {num:percent4,sort:4},
//         ].sort((a,b) => a.num - b.num);
//         percentCircles[0].class = 'strokeWidth40';
//         percentCircles[1].class = 'strokeWidth40';
//         percentCircles[2].class = 'strokeWidth45';
//         percentCircles[3].class = 'strokeWidth50';
//         percentCircles.sort((a,b) => a.sort - b.sort);
//     }



//     let donutInsideFS = 'fs305';
//     if(total > 9999999){donutInsideFS = 'fs09';}
//     else if(total > 999999){donutInsideFS = 'fs105';}
//     else if(total > 99999){donutInsideFS = 'fs2';}
//     else if(total > 9999){donutInsideFS = 'fs205';}
//     else if(total > 999){donutInsideFS = 'fs3';}

//     container.append(
//         $('<div/>',{class:'statisticsDonutOutside',html:`
//         <svg height="200" width="200" >
//             <circle class="statisticsDonutStroke statisticsDonutStroke-itemsTotal ${percentCircles[0].class}" cx="100" cy="100" r="60" stroke="var(--s-itemsTotal)" style="stroke-dashoffset: ${( percent1_circle)};"/>
//             <circle class="statisticsDonutStroke statisticsDonutStroke-tax ${percentCircles[1].class}" cx="100" cy="100" r="60" stroke="var(--s-tax)" style="stroke-dashoffset: ${( percent2_circle)};transform:rotate(${rotate1}deg)"/>
//             <circle class="statisticsDonutStroke statisticsDonutStroke-deliveryCost ${percentCircles[2].class}" cx="100" cy="100" r="60" stroke="var(--s-deliveryCost)" style="stroke-dashoffset: ${( percent3_circle)};transform:rotate(${rotate2}deg)"/>
//             <circle class="statisticsDonutStroke statisticsDonutStroke-service ${percentCircles[3].class}" cx="100" cy="100" r="60" stroke="var(--s-service)" style="stroke-dashoffset: ${( percent4_circle)};transform:rotate(${rotate3}deg)"/>
//         </svg>
//         `}),
//         // $('<div/>',{class:'row alnS jstfySH'}).append(
//         //     $('<div/>',{class:'column alnS jstfyS w100p'}).append(
//         //         $('<div/>',{class:'row alnC jstfyS mB5',statisticspopup:'so-itemsTotal',statisticspopupTitle:texts.statistics.itemsTotal}).append(
//         //             $('<div/>',{class:'p6 bg-itemsTotal br3 mie-5'}),
//         //             $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.itemsTotal}),
//         //         ),
//         //         $('<div/>',{class:'row alnC jstfyS mB5',statisticspopup:'so-tax',statisticspopupTitle:texts.statistics.tax}).append(
//         //             $('<div/>',{class:'p6 bg-tax br3 mie-5'}),
//         //             $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.tax}),
//         //         ),
//         //     ),
//         //     $('<div/>',{class:'column alnS jstfyS w100p'}).append(
//         //         $('<div/>',{class:'row alnC jstfyS mB5',statisticspopup:'so-deliveryCost',statisticspopupTitle:texts.statistics.deliveryCost}).append(
//         //             $('<div/>',{class:'p6 bg-deliveryCost br3 mie-5'}),
//         //             $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.deliveryCost}),
//         //         ),
//         //         $('<div/>',{class:'row alnC jstfyS mB5',statisticspopup:'so-service',statisticspopupTitle:texts.statistics.service}).append(
//         //             $('<div/>',{class:'p6 bg-service br3 mie-5'}),
//         //             $('<div/>',{class:'mie-10 fs102 tnw',text:texts.statistics.service}),
//         //         ),
//         //     ),
//         // ),

//     )
// }
