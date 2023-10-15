let recentSearch = window.Cookies.get('helpRecentSearch');
// window.Cookies.remove('helpRecentSearch')
// console.log(recentSearch)
$('#helpSearchButton').on('click',function(){
    $('#helpSearchInput').val($('#helpSearchInput').val().replace('%*%',''));
    if(typeof recentSearch === 'undefined'){
        window.Cookies.set('helpRecentSearch', '%*%'+$('#helpSearchInput').val()+'%*%' , { expires: 9999999 })
    }else{

        recentSearch = recentSearch.replace('%*%'+$('#helpSearchInput').val()+'%*%','%*%');
        recentSearch = '%*%'+$('#helpSearchInput').val()+recentSearch
        window.Cookies.set('helpRecentSearch',recentSearch , { expires: 9999999 })
    }
    $('#helpHeaderSearchCard').submit();
});
$('#helpSearchInput').on('select focus input change',function(){
    let recentSearchArr = recentSearch.split('%*%');
    $('#helpSearchRecentContainer').text('')
    $('#helpSearchRecent').css({'width':'calc('+$('#helpSearchInput').width()+'px - 1em)','display':'block'});
    for(const key in recentSearchArr){
        if(recentSearchArr[key] != '' && recentSearchArr[key].match($('#helpSearchInput').val())){
            $('#helpSearchRecentContainer').append(
                $('<div/>',{
                    class:'helpSearchRecentElement',
                    searchTxt:recentSearchArr[key],
                }).append(
                    $('<span/>',{class:'ico-search',style:'margin-inline-end:.5em;color:var(--fm-placeholder);'}),
                    $('<span/>',{text:recentSearchArr[key],style:'flex-grow:3;color:var(--fm-placeholder);'}),
                    $('<div/>',{class:'ico-close flexRowNoWrap removehelpSearchRecentElement',searchTxt:recentSearchArr[key],style:'margin-inline-end:.25em;color:var(--fm-placeholder);font-size:.9em;'})
                ),
            )
        }
    }
    if($('#helpSearchRecentContainer').children().length == 0){
        $('#helpSearchRecent').hide();
    }
});
$('#helpSearchRecentContainer').on('click','.removehelpSearchRecentElement',function(e){
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).parent().remove();
    recentSearch = recentSearch.replace('%*%'+$(this).attr('searchTxt')+'%*%','%*%');
    // recentSearch = '%*%'+$('#helpSearchInput').val()+recentSearch
    window.Cookies.set('helpRecentSearch',recentSearch , { expires: 9999999 })
    if($('#helpSearchRecentContainer').children().length == 0){
        $('#helpSearchRecent').hide();

    }
})
$('#helpSearchRecentContainer').on('click','.helpSearchRecentElement',function(e){
    e.stopPropagation();
    console.log('sf')
    e.stopImmediatePropagation();
    $('#helpSearchInput').val($(this).attr('searchTxt'));
    $('#helpSearchButton').trigger('click');
})
$('#helpSearchInput').on('focusout',function(){
    if($('#helpSearchRecent:hover').length){return;}
    $('#helpSearchRecent').hide();
    $('#helpSearchRecentContainer').text('');
});

if(route == 'home.help.helpCat.tut'){
    let scrolling = true;
    $('#tutSections').children().eq(1).addClass('selectedTutSection');
    $('#body').on('click','.tutSection',function(e){
        scrolling = false;
        e.stopImmediatePropagation();
        $('.tutSection').removeClass('selectedTutSection')
        $(this).addClass('selectedTutSection');
        setTimeout(function(){
            scrolling = true;
        },200)
    });
    $('#body').on('scroll',function(e){
        if($('#body').scrollTop() == 0){
            $('.tutSection').removeClass('selectedTutSection')
            $('#tutSections').children().eq(1).addClass('selectedTutSection');
        }else{
            $('.tutSectionContainer').each(function(){
                if($(this).offset().top < $('#body').height() / 2 && scrolling == true){
                    $('.tutSection').removeClass('selectedTutSection')
                    $('#tutSection-'+$(this).attr('id')).addClass('selectedTutSection');
                    return;
                }
            });
        }
    });
    $('#body').on('click','.tutRateUp',function(e){
        e.stopImmediatePropagation();
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                tutRateUp:$(this).attr('tutId'),
            }
        })
        thisContainer = $(this).parent().parent();
        thisContainer.children().animate({'opacity':0},250)
        setTimeout(function(){
            thisContainer.children().first().text(thnxForRate);
            thisContainer.children().eq(1).remove();
            thisContainer.children().animate({'opacity':1},250)
            setTimeout(function(){
                thisContainer.fadeOut();
            },3000)
        },500);

    })
    $('#body').on('click','.tutRateDown',function(e){
        e.stopImmediatePropagation();
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                tutRateDown:$(this).attr('tutId'),
            }
        })
        thisContainer = $(this).parent().parent();
        thisContainer.children().animate({'opacity':0},250)
        setTimeout(function(){
            thisContainer.children().first().text(thnxForRate);
            thisContainer.children().eq(1).remove();
            thisContainer.children().animate({'opacity':1},250)
            setTimeout(function(){
                thisContainer.fadeOut();
            },3000)
        },500);
    });
    $('.sectionImg-60, .sectionImg-50, .sectionImg-40, .sectionImg-35, .sectionImg-30, .sectionImg-25, .sectionImg-20,  .sectionImg-15').on('click',function(e){
        e.stopImmediatePropagation();
        $('body').prepend(
            $('<div/>',{id:'imgPreviewContainer'}).append(
                $('<div/>',{
                    style:'display:flex;flex-direction:column;align-items:flex-end:justfy-content:center;'
                }).append(
                    $('<div/>',{class:'ico-close',style:'color:var(--fm-bg-1);text-align: end;margin-bottom:.2em;cursor:pointer;font-size:1.3em;'}),
                    $('<img/>',{src:$(this).attr('src'),class:'imgPreview'})
                )
            )
        )
        $('#imgPreviewContainer').animate({'opacity':'1'},250)
    })
    $(document).on('click','#imgPreviewContainer',function(){
        $(this).animate({'opacity':'0'},250);
        setTimeout(function(){
            $('#imgPreviewContainer').remove();
        },250)
    })
}
if(route == 'home.help.search'){
    if(results[0] != 'searchHome'){
        $('#helpSearchInput').val(q);
        let paginationNum = Math.ceil(count / 20);
        if(paginationNum == 1 ){
            $('.searchPaginationContainer').hide();
        }

        if(p != 1){
            $('.searchPaginationContainer').append(
                $('<span/>',{class:'paginationLink flexRowNoWrap',p:'prev'}).append(
                    $('<span/>',{class:'ico-left',style:'margin:0 .3em;'}),
                    $('<span/>',{text:prev}),
                ),
            )
        }
        for(let i=1;i<=paginationNum;i++){
            if(i == p){
                $('.searchPaginationContainer').append(
                    $('<span/>',{text:i,class:' paginationLink_selected',p:i}),
                )
            }else{
                $('.searchPaginationContainer').append(
                    $('<span/>',{text:i,class:'paginationLink',p:i}),
                )
            }
        }
        if(p != paginationNum){
            $('.searchPaginationContainer').append(
                $('<span/>',{class:'paginationLink flexRowNoWrap',p:'next'}).append(
                    $('<span/>',{text:next}),
                    $('<span/>',{class:'ico-right',style:'margin:0 .3em;'}),
                ),
            )
        }
        if(paginationNum > 10){
            $('.paginationLink').each(function(){
                if($(this).attr('p') > p + 4 || $(this).attr('p') < p - 4){
                    $(this).hide();
                }
            })
        }

        $('#body').on('click','.paginationLink',function(e){
            e.stopImmediatePropagation();
            if($(this).attr('p') == 'next'){
                let  nextp = parseInt($('.paginationLink_selected').attr('p')) + 1;
                let tabParam = new URLSearchParams(window.location.search)
                let qParam = tabParam.get('q')
                window.location.href = window.location.pathname+'?q='+qParam+'&p='+nextp;
            }else if($(this).attr('p') == 'prev'){
                let prevP = parseInt($('.paginationLink_selected').attr('p')) - 1;
                let tabParam = new URLSearchParams(window.location.search)
                let qParam = tabParam.get('q')
                window.location.href = window.location.pathname+'?q='+qParam+'&p='+prevP;
            }else{
                let tabParam = new URLSearchParams(window.location.search)
                let qParam = tabParam.get('q')

                window.location.href = window.location.pathname+'?q='+qParam+'&p='+$(this).attr('p');
            }

        })
        for(const key in results){
            result = results[key];
            result.html = result.html.replace(/<[^>]*>?/gm, '')
            let string = result.html;
            let stringLength = string.length;
            let finalString;
            let string1;
            let string2;
            let helpCat;
            string1 = string.substring(0, string.indexOf(q));
            // string2 = string.substring(string.indexOf(q) + 0);
            string2 = string.split(string1)[1]
            if(string1.length > 200){
                string1 = string1.slice(string1.length - 200,string1.length)
            }
            if(string2.length > 200 ){
                string2 = string2.slice(0,200)
            }
            finalString = string1+string2
            finalString = finalString.replaceAll(q,'<b>'+q+'</b>');

            switch(result.help_tuts.helpCat){
                case 0:helpCat = 'get-started';break;
                case 1:helpCat = 'basics';break;
                case 2:helpCat = 'security';break;
                case 3:helpCat = 'orders';break;
                case 4:helpCat = 'statistics';break;
                case 5:helpCat = 'Billing';break;
                case 6:helpCat = 'products-categories';break;
                case 7:helpCat = 'deliveryAccount';break;
                case 8:helpCat = 'users';break;
                case 9:helpCat = 'design';break;
                case 10:helpCat = 'settings';break;
            }
            $('#tutSearchTuts').append(
                $('<div/>',{
                    class:'tutSearchTut'
                }).append(
                    $('<a/>',{href:'/'+lang+'/help/'+helpCat+'/'+result.help_tuts.id+'#'+result.sort,text:result.title,class:'helpLinkTreeElement',style:'color:var(--fm-color-3);text-align:start;font-size:1.3em;margin:0;'}),
                    $('<div/>',{class:'flexRowNoWrap',style:'justify-content:flex-start;color:var(--fm-color-1);font-size:.8em;margin:.2em 0;'}).append(
                        $('<a/>',{class:'helpLinkTreeElement',href:'/'+lang+'/help/'+helpCat,text:helpCats[result.help_tuts.helpCat]}),
                        $('<span/>',{style:'color:var(--fm-placeholder);',text:'>'}),
                        $('<a/>',{class:'helpLinkTreeElement',href:'/'+lang+'/help/'+helpCat+'/'+result.help_tuts.id,text:result.help_tuts.title}),
                    ),
                    $('<div/>',{style:'font-size:.95em;user-select:text;'}).append(
                        '...'+finalString+'...'

                    ),

                )
            )
        }
    }else{
        $('#noSearchResaults').hide();
    }

}

/////////////htmleditor
function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }
$('.htmlPreviewCode').each(function(){
    $(this).html(
        $(this).text()
        .replace(/</gmi,'&lt;')
        .replace(/>/gmi,'&gt;')
        .replace(/&lt;/gmi,'<fmcode style="color:gray">&lt;')
        .replace(/&gt;/gmi,'&gt;</fmcode>')
    )
})




$('.htmlPreviewCode').on('input',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.htmlPreviewPreview').children().first().html($(this).text().replace( /<[^p br span div h1 h2 h3 b i u ul ol li /p /br /span /div /h1 /h2 /h3 /b /i /u /ul /ol /li].*?>/gi, '' ))



})
$('.htmlPreviewCode').on('focus focusout',function(e){
    e.stopImmediatePropagation();
    $(this).html($(this).text()
    .replace(/</gmi,'&lt;')
    .replace(/>/gmi,'&gt;')
    .replace(/&lt;/gmi,'<fmcode style="color:gray">&lt;')
    .replace(/&gt;/gmi,'&gt;</fmcode>')
    )
})
