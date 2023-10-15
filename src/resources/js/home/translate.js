require("../bootstrap");
window.$ = require("jquery");
$(document).ready(function(){
    $('#addCat').trigger('click');
})
let space = '&nbsp;';
let s2 = '&nbsp;&nbsp;&nbsp;&nbsp;';
let s3 = s2+s2;
let s4 = s3+s2;
let s5 = s4+s2;
let s6 = s5+s2;
let s7 = s6+s2;
let s8 = s7+s2;
let s9 = s8+s2;
let s10 = s9+s2;
let s11 = s10+s2;

let cats = [];

$('html,body').on('click','.catHead',function(e){
    e.stopImmediatePropagation();
    $('.catHead').removeClass('catHead_selected')
    $('.cat').removeClass('cat_selected');
    $(this).addClass('catHead_selected');
    $(`.cat[catNum="${$(this).attr('catNum')}"]`).addClass('cat_selected')
})


$('#addCat').on('click',function(){
    let catNum = ($('.cat').length) + 1
    $('.catHead').removeClass('catHead_selected')
    $('#addCat').before(
        $('<div/>',{
            catNum:catNum,
            class:'catHead catHead_selected',
            text:'Category '+catNum
        })
    )
    $('.cat').removeClass('cat_selected');
    $('.cats').append(
        $('<div/>',{
            catNum:catNum,
            class:'cat cat_selected',
        }).append(
            $('<div/>',{

            }).append(
                $('<input/>',{
                    class:`catName`,
                    catNum:catNum,
                    placeholder:'Category Name',
                }),
                $('<button/>',{
                    class:'addProd',
                    catNum:catNum,
                    text:'+',
                    style:'padding:0px 5px;margin:5px;'
                }),
            ),

            $('<div/>',{
                class:'prodsContainer',
                catNum:catNum,
            })
        )
    )
})

$('html body').on('click','.addProd',function(e){
    e.stopImmediatePropagation();
    let prodNum = ($(`.prod[catNum="${$(this).attr('catNum')}"]`).length) + 1;
    $(`.prodsContainer[catNum="${$(this).attr('catNum')}"]`).append(
        $('<div/>',{
            class:'prod',
            catNum:$(this).attr('catNum'),
            prodNum:prodNum,
        }).append(
            $('<input/>',{
                class:`prodName`,
                prodNum:prodNum,
                catNum:$(this).attr('catNum'),
                placeholder:'Product Name',
            }),
            $('<input/>',{
                class:`prodPrice`,
                prodNum:prodNum,
                catNum:$(this).attr('catNum'),
                placeholder:'Price',
                style:'width:30px'
            }),
            $('<button/>',{
                class:'addOption',
                catNum:$(this).attr('catNum'),
                prodNum:prodNum,
                text:'+',
                style:'padding:0px 5px;margin:5px;'
            }),
            $('<div/>',{
                class:'optionsContainer',
                catNum:$(this).attr('catNum'),
                prodNum:prodNum,
            })
        )
    )
    // thisAddOption.trigger('click');
})

$('html,body').on('click','.addOption',function(e){
    e.stopImmediatePropagation();
    let optionNum = ($(`.option[catNum="${$(this).attr('catNum')}"][prodNum="${$(this).attr('prodNum')}"]`).length) + 1;
    $(`.optionsContainer[catNum="${$(this).attr('catNum')}"][prodNum="${$(this).attr('prodNum')}"]`).append(
        $('<div/>',{
            class:'option',
            catNum:$(this).attr('catNum'),
            optionNum:optionNum,
            prodNum:$(this).attr('prodNum'),
            catNum:$(this).attr('catNum'),
        }).append(
            $('<input/>',{
                class:`optionName`,
                optionNum:optionNum,
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
                placeholder:'Option Name',
            }),
            $('<button/>',{
                class:'addSelection',
                optionNum:optionNum,
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
                text:'+',
                style:'padding:0px 5px;margin:5px;'
            }),
            $('<div/>',{
                class:'selectionsContainer',
                optionNum:optionNum,
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
            })
        )

    )
});

$('html,body').on('click','.addSelection',function(e){
    e.stopImmediatePropagation();
    let selectionNum = ($(`.selection[catNum="${$(this).attr('catNum')}"][prodNum="${$(this).attr('prodNum')}"][optionNum="${$(this).attr('optionNum')}"]`).length) + 1;
    $(`.selectionsContainer[catNum="${$(this).attr('catNum')}"][prodNum="${$(this).attr('prodNum')}"][optionNum="${$(this).attr('optionNum')}"]`).append(
        $('<div/>',{
            class:'selection',
            selectionNum:selectionNum,
            optionNum:$(this).attr('optionNum'),
            prodNum:$(this).attr('prodNum'),
            catNum:$(this).attr('catNum'),
        }).append(
            $('<input/>',{
                class:`selectionName`,
                selectionNum:selectionNum,
                optionNum:$(this).attr('optionNum'),
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
                placeholder:'Selection Name',
            }),
            $('<input/>',{
                class:`selectionPrice`,
                selectionNum:selectionNum,
                optionNum:$(this).attr('optionNum'),
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
                placeholder:'price',
                style:'width:30px'
            }),
            $('<input/>',{
                type:'checkbox',
                class:'selectionIsDefault',
                selectionNum:selectionNum,
                optionNum:$(this).attr('optionNum'),
                prodNum:$(this).attr('prodNum'),
                catNum:$(this).attr('catNum'),
            })
        )

    )
})


$('html,body').on('click','.selectionIsDefault',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.selectionsContainer').find('.selectionIsDefault').prop('checked',false)
    $(this).prop('checked',true);
})
$('#engez').on('click',function(){
    $('html,body').animate({'scrollTop':$(window).height()},500)
    $('#output').text('');
    drawTop();
    drawRestaurantNames().then(()=>{
        scroll();
        drawintro().then(()=>{
            $('#output').append(
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'white',text:`$categories`}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'='}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'blue',text:'['}),
                )
            )
            drawCats().then(()=>{
                $('#output').append(
                    $('<div/>',{
                        class:'line',
                    }).append(
                        $('<span/>',{html:s3}),
                        $('<span/>',{class:'blue',text:']'}),
                        $('<span/>',{class:'gray',text:';'}),
                    )
                )
                scroll();
                drawBot();
                scroll();

            })
        })
    });
})
$('#copy').on('click',function(){
    let r = document.createRange();
    r.selectNode(document.getElementById('output'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
})
function drawCat(catNum,catName_en,catName,names){
    let domain = $('#DomainName').val();
    $('#output').append(
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s4}),
            $('<span/>',{class:'yellow',text:'['}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:catName}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"imgUrl"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:`imgs/demo/${domain}/cat${catNum}.webp`}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"thumbnailUrl"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:`imgs/demo/${domain}/cat${catNum}_thumbnail.webp`}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_en"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:catName_en}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ar"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ar}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_fr"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.fr}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_it"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.it}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_de"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.de}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_es"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.es}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ua"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ua}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"products"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'violet',text:'['}),
        ),
        $('<div/>',{
            class:'line',
            id:'products-'+catNum,
        }).append(
            $('<span/>',{html:s5}),
            $('<span/>',{class:'violet',text:']'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s4}),
            $('<span/>',{class:'yellow',text:'],'}),
        )
    )
    scroll();
}
function drrawProduct(catNum,prodNum,prodName,prodName_en,prodPrice,names){
    let domain = $('#DomainName').val();
    $('#products-'+catNum).before(
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s6}),
            $('<span/>',{class:'blue',text:'['}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:prodName}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"price"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'lightblue2',text:prodPrice+','}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"imgUrl"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:`imgs/demo/${domain}/cat${catNum}_prod${prodNum}.webp`}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"thumbnailUrl"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:`imgs/demo/${domain}/cat${catNum}_prod${prodNum}_thumbnail.webp`}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_en"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:prodName_en}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ar"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ar}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_fr"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.fr}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_it"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.it}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_de"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.de}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_es"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.es}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ua"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ua}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"options"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'yellow',text:'['}),
        ),
        $('<div/>',{
            class:'line',
            id:`options-${catNum}-${prodNum}`
        }).append(
            $('<span/>',{html:s7}),
            $('<span/>',{class:'yellow',text:']'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s6}),
            $('<span/>',{class:'blue',text:'],'}),
        )
    )
    scroll();

}
function drrawOption(catNum,prodNum,optionNum,optionName,optionName_en,names){
    let domain = $('#DomainName').val();
    $('#options-'+catNum+'-'+prodNum).before(
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s8}),
            $('<span/>',{class:'violet',text:'['}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:optionName}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_en"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:optionName_en}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ar"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ar}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_fr"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.fr}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_it"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.it}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_de"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.de}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_es"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.es}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ua"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ua}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"selections"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'blue',text:'['}),
        ),
        $('<div/>',{
            class:'line',
            id:`selections-${catNum}-${prodNum}-${optionNum}`
        }).append(
            $('<span/>',{html:s9}),
            $('<span/>',{class:'blue',text:']'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s8}),
            $('<span/>',{class:'violet',text:'],'}),
        ),
    );
}
function drrawSelection(catNum,prodNum,optionNum,selectionNum,selectionName,selectionName_en,selectionPrice,selectionIsDefault,names){
    $(`#selections-${catNum}-${prodNum}-${optionNum}`).before(
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s10}),
            $('<span/>',{class:'yellow',text:'['}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:selectionName}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"price"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'lightblue2',text:selectionPrice+','}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"isDefault"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'lightblue2',text:selectionIsDefault+','}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_en"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:selectionName_en}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ar"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ar}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_fr"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.fr}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_it"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.it}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_de"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.de}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_es"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.es}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s11}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:"name_ua"}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'=>'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'gray',text:"'"}),
            $('<span/>',{class:'blue2',text:names.ua}),
            $('<span/>',{class:'gray',text:"',"}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s10}),
            $('<span/>',{class:'yellow',text:'],'}),
        ),
    )
}
async function drawCats(){
    return new Promise(function (resolve, reject) {
        let catsPromises = [];
        let domain = $('#DomainName').val();
        $('.cat').each(function(){
            let catD = new $.Deferred;
            let catNum = $(this).attr('catNum');
            let catName_en = $(this).find('.catName').val();
            let catName = $(this).find('.catName').val().replaceAll(' ','-').toLowerCase();
            translate(catName_en).then(names=>{
                catD.resolve([catNum,catName_en,catName,names]);
            })
            catsPromises.push(catD.promise());
        });

        $.when.apply($, catsPromises).done(function(){
            for(let i=0, length=arguments.length; i < length; i++){
                let catNum = arguments[i][0];
                let catName_en = arguments[i][1];
                let catName = arguments[i][2];
                let names = arguments[i][3];
                drawCat(catNum,catName_en,catName,names)
                let prodsPromises = [];
                $(`.prod[catNum="${catNum}"]`).each(function(){
                    let prodD = new $.Deferred;
                    let prodNum = $(this).attr('prodNum');
                    let prodName = $(this).find('.prodName').val().replaceAll(' ','-').toLowerCase();
                    let prodName_en = $(this).find('.prodName').val();
                    let prodPrice = $(this).find('.prodPrice').val();
                    translate(prodName_en).then(names=>{
                        prodD.resolve([prodNum,prodName,prodName_en,prodPrice,names]);
                    })
                    prodsPromises.push(prodD.promise());
                })
                $.when.apply($, prodsPromises).done(function(){
                    for(let i=0, length=arguments.length; i < length; i++){
                        let prodNum = arguments[i][0];
                        let prodName = arguments[i][1];
                        let prodName_en = arguments[i][2];
                        let prodPrice = arguments[i][3];
                        let names = arguments[i][4];
                        drrawProduct(catNum,prodNum,prodName,prodName_en,prodPrice,names)
                        let optionsPromises = [];
                        $(`.option[catNum="${catNum}"][prodNum="${prodNum}"]`).each(function(){
                            let optionD = new $.Deferred;
                            let optionNum = $(this).attr('optionNum');
                            let optionName = $(this).find('.optionName').val().replaceAll(' ','-').toLowerCase();
                            let optionName_en = $(this).find('.optionName').val();
                            translate(optionName_en).then(names=>{
                                optionD.resolve([optionNum,optionName,optionName_en,names]);
                            })
                            optionsPromises.push(optionD.promise());
                        })
                        $.when.apply($,optionsPromises).done(function(){
                            for(let i=0,length=arguments.length; i < length; i++){
                                let optionNum = arguments[i][0];
                                let optionName = arguments[i][1];
                                let optionName_en = arguments[i][2];
                                let names = arguments[i][3];
                                drrawOption(catNum,prodNum,optionNum,optionName,optionName_en,names);
                                let selectionsPromises = [];
                                $(`.selection[catNum="${catNum}"][prodNum="${prodNum}"][optionNum="${optionNum}"]`).each(function(){
                                    let selectionD = new $.Deferred;
                                    let selectionNum = $(this).attr('selectionNum');
                                    let selectionName = $(this).find('.selectionName').val().replaceAll(' ','-').toLowerCase();
                                    let selectionName_en = $(this).find('.selectionName').val();
                                    let selectionPrice = $(this).find('.selectionPrice').val();
                                    let selectionIsDefault = $(this).find('.selectionIsDefault').prop('checked') ? 'true' : 'false';
                                    translate(selectionName_en).then(names=>{
                                        selectionD.resolve([selectionNum,selectionName,selectionName_en,selectionPrice,selectionIsDefault,names]);
                                    })
                                    selectionsPromises.push(selectionD.promise());
                                });
                                $.when.apply($,selectionsPromises).done(function(){
                                    for(let i=0,length=arguments.length; i < length; i++){
                                        let selectionNum = arguments[i][0];
                                        let selectionName = arguments[i][1];
                                        let selectionName_en = arguments[i][2];
                                        let selectionPrice = arguments[i][3];
                                        let selectionIsDefault = arguments[i][4];
                                        let names = arguments[i][5];
                                        drrawSelection(catNum,prodNum,optionNum,selectionNum,selectionName,selectionName_en,selectionPrice,selectionIsDefault,names);
                                    }
                                })
                            }
                        })
                    }
                });
                scroll();
                if(catNum == $('.cat').length){
                    return resolve();
                }
            }

        });
    });
}





async function drawRestaurantNames(){
    return new Promise(function (resolve, reject) {
        let domain = $('#DomainName').val();
        translate($('#websiteName').val()).then(restaurantNames=>{
            $('#output').append(
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'white',text:`$${domain}`}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'='}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'new'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'lightblue',text:'stdClass'}),
                    $('<span/>',{class:'blue',text:'()'}),
                    $('<span/>',{class:'gray',text:';'}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'white',text:`$${domain}`}),
                    $('<span/>',{class:'red',text:'->'}),
                    $('<span/>',{class:'lightblue2',text:'domainName'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'='}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:domain.toLowerCase()}),
                    $('<span/>',{class:'gray',text:"';"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'white',text:`$${domain}`}),
                    $('<span/>',{class:'red',text:'->'}),
                    $('<span/>',{class:'lightblue2',text:'website_names'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'='}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'blue',text:'['}),
                ),

                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'en'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:$('#websiteName').val()}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ar'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.ar}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'fr'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.fr}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'de'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.de}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'it'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.it}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'es'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.es}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ua'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:restaurantNames.ua}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ru'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:''}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),

                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'blue',text:']'}),
                    $('<span/>',{class:'gray',text:";"}),
                ),
            )
            return resolve();
        });
    });


}
async function drawintro(){
    return new Promise(function (resolve, reject) {
        let domain = $('#DomainName').val();
        // let intro = $('#intro').val();
        translate($('#intro').val()).then(intro=>{
            $('#output').append(
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'white',text:`$${domain}`}),
                    $('<span/>',{class:'red',text:'->'}),
                    $('<span/>',{class:'lightblue2',text:'intro'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'='}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'blue',text:'['}),
                ),

                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'en'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:$('#intro').val()}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ar'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.ar}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'fr'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.fr}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'de'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.de}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'it'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.it}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'es'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.es}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ua'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:intro.ua}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),
                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s4}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:'ru'}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'red',text:'=>'}),
                    $('<span/>',{html:space}),
                    $('<span/>',{class:'gray',text:"'"}),
                    $('<span/>',{class:'blue2',text:''}),
                    $('<span/>',{class:'gray',text:"',"}),
                ),

                $('<div/>',{
                    class:'line',
                }).append(
                    $('<span/>',{html:s3}),
                    $('<span/>',{class:'blue',text:']'}),
                    $('<span/>',{class:'gray',text:";"}),
                ),
            )
            return resolve();
        });
    });


}

function scroll () {
    $('#output').scrollTop(99999999)
}
function drawTop(){
    $('#output').append(
        $('<div/>',{
            class:'line gray',
            text:'<?php',
        }),
        $('<div>',{html:'<br>'}),
        $('<div/>',{class:'line',
        }).append(
            $('<span/>',{class:'red',text:'namespace'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'white',text:'Database'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'white',text:'Seeders'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'white',text:'demo'}),
            $('<span/>',{class:'gray',text:';'}),
        ),
        $('<div>',{html:'<br>'}),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{class:'red',text:'use'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'white',text:'App'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'white',text:'Models'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'lightblue',text:'demo'}),
            $('<span/>',{class:'gray',text:';'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{class:'red',text:'use'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'white',text:'Illuminate'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'white',text:'Database'}),
            $('<span/>',{class:'gray',text:'\\'}),
            $('<span/>',{class:'lightblue',text:'Seeder'}),
            $('<span/>',{class:'gray',text:';'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{class:'red',text:'use'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'lightblue',text:'stdClass'}),
            $('<span/>',{class:'gray',text:';'}),
        ),
        $('<div>',{html:'<br>'}),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{class:'lightblue',text:'class'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'white',text:$('#DomainName').val()}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'red',text:'extends'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'white',text:'Seeder'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{class:'yellow',text:'{'}),
        ),
        $('<div>',{html:'<br>'}),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s2}),
            $('<span/>',{class:'red',text:'public'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'lightblue',text:'function'}),
            $('<span/>',{html:space}),
            $('<span/>',{class:'violet',text:'run()'}),
            $('<span/>',{html:space}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s2}),
            $('<span/>',{class:'violet',text:'{'}),
        )
    )
}
function drawBot(){
    let domain = $('#DomainName').val();
    $('#output').append(
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s3}),
            $('<span/>',{class:'lightblue',text:'demo'}),
            $('<span/>',{class:'red',text:'::'}),
            $('<span/>',{class:'violet',text:'website'}),
            $('<span/>',{class:'blue',text:'('}),
            $('<span/>',{class:'white',text:`$${domain}`}),
            $('<span/>',{class:'gray',text:','}),
            $('<span/>',{class:'white',text:`$categories`}),
            $('<span/>',{class:'blue',text:')'}),
            $('<span/>',{class:'gray',text:';'}),
        ),
        $('<div/>',{
            class:'line',
        }).append(
            $('<span/>',{html:s2}),
            $('<span/>',{class:'violet',text:'}'}),
        ),
        $('<div>',{html:'<br>'}),
        $('<span/>',{class:'yellow',text:'}'}),
    )
}
async function translate(txt){
    return new Promise(function (resolve, reject) {
        let translation = {};
        $.ajax({
            url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
            type: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data:JSON.stringify({
                "q": txt,
                "source":"en",
                "target": "ar",
                "format": "text"
            }),success:function(r){
                translation.ar = r.data.translations[0].translatedText.replaceAll("'","\\'").replace('رقم','لا');
                $.ajax({
                    url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
                    type: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    data:JSON.stringify({
                        "q": txt,
                        "source":"en",
                        "target": "fr",
                        "format": "text"
                    }),success:function(r){
                        translation.fr = r.data.translations[0].translatedText.replaceAll("'","\\'");;
                        $.ajax({
                            url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
                            type: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            data:JSON.stringify({
                                "q": txt,
                                "source":"en",
                                "target": "de",
                                "format": "text"
                            }),success:function(r){
                                translation.de = r.data.translations[0].translatedText.replaceAll("'","\\'");;

                                $.ajax({
                                    url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
                                    type: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    data:JSON.stringify({
                                        "q": txt,
                                        "source":"en",
                                        "target": "it",
                                        "format": "text"
                                    }),success:function(r){
                                        translation.it = r.data.translations[0].translatedText.replaceAll("'","\\'");;
                                        $.ajax({
                                            url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
                                            type: 'POST',
                                            headers: {
                                                "Content-Type": "application/json",
                                                Accept: "application/json"
                                            },
                                            data:JSON.stringify({
                                                "q": txt,
                                                "source":"en",
                                                "target": "es",
                                                "format": "text"
                                            }),success:function(r){
                                                translation.es = r.data.translations[0].translatedText.replaceAll("'","\\'");;

                                                $.ajax({
                                                    url:'https://www.googleapis.com/language/translate/v2/?key=AIzaSyAqfkLWRFR5_GMp91i8gcnja0ZCRSfIWKs',
                                                    type: 'POST',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        Accept: "application/json"
                                                    },
                                                    data:JSON.stringify({
                                                        "q": txt,
                                                        "source":"en",
                                                        "target": "uk",
                                                        "format": "text"
                                                    }),success:function(r){
                                                        translation.ua = r.data.translations[0].translatedText.replaceAll("'","\\'");


                                                    }
                                                }).done(function(){
                                                    resolve(translation);
                                                })

                                            }
                                        })

                                    }
                                })

                            }
                        })

                    }
                })

            }
        })

    });


}
