drawPage_category_list = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.category_list}),
            ),
            $('<div/>',{class:'btnContainer mB20'}).append(
                $('<button/>',{class:'btn btn-cancel popupPage',popupPage:'create_category',text:texts.products.createCategory})
            ),
        )
    )
}
// let gaga = '';

// for(i=5;i<=100;i=i+5){
//     gaga = gaga + `.w${i}p{width:${i}%}\n`
//     gaga = gaga + `.mxw${i}p{max-width:${i}%}\n`
//     gaga = gaga + `.mnw${i}p{min-width:${i}%}\n`
// }
// console.log(gaga)
// //
