scrollToDiv = function(container,div,animationTime=500,space=50,callback=()=>{}){
    container.stop();
    container.animate({
        'scrollTop':div.offset().top - space - container.offset().top + container.scrollTop(),
    },animationTime,'swing');
    setTimeout(function(){
        callback();
    },animationTime + 50)
}
scrollToDivLeft = function(container,div,animationTime=500,space=50,callback=()=>{}){
    container.stop();
    container.animate({
        'scrollLeft':div.offset().left - space - container.offset().left + container.scrollLeft(),
    },animationTime,'swing');
    setTimeout(function(){
        callback();
    },animationTime + 50)
}
scrollToDivRight = function(container,div,animationTime=500,space=50,callback=()=>{}){
    container.stop();
    container.animate({
        'scrollLeft':div.offset().left + space - container.offset().left - container.width() + div.width() + container.scrollLeft(),
    },animationTime,'swing');
    setTimeout(function(){
        callback();
    },animationTime + 50)
}
