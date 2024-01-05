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
