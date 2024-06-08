play_page_transition = function(elem,animation,duration){
    elem.removeClass(`${animation}_in`)
    elem.addClass(`${animation}_out`)
    // $('#website').css('overflow-x','hidden');
    setTimeout(()=>{
        elem.removeClass(`${animation}_out`).addClass(`${animation}_in`)
        setTimeout(()=>{
            // $('#website').css('overflow-x','');
            elem.removeClass(`${animation}_in`)
        },duration.replace('ms',''))
    },duration.replace('ms','') - 100)
}
