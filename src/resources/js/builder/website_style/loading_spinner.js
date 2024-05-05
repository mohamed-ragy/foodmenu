draw_loading_spinner = function(){
    $('#loading_spinner').find('.editor_popup_title').text(texts.website_style.loading_spinner)
    $('#loading_spinner').addClass('w400 h800').find('.editor_popup_body').text('').append(
        // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.loading_spinner}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.loading_spinner_des}),
        $('<div/>',{class:'w100p mB40',id:'loading_spinner_settings'}).append(
            $('<div/>',{class:`loading_spinner_preview body_color_theme`}),
            $('<div/>',{class:'editor_popup_row'}).append(
                $('<div/>',{text:texts.styling.colors}),
                 $('<div/>',{class:'row alnC jstfyE loading_spinner_colors_container'}),
            ),
            $('<div/>',{class:'fs1 bold mB5 mT40',text:texts.website_style.select_spinner}),
            $('<div/>',{class:'loading_spinners_container row alnC jstfyC wrap'}).append(
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
                $('<div/>',{class:'w40p'}).append($('<div/>',{class:'mXa mY15 w50 h50 cardLoading br50p'})),
            )
        )
    )
    draw_loading_spinner_colors_selectors();
    draw_loading_spinner_preview();

}
draw_loading_spinner_colors_selectors = function(){
    $('.loading_spinner_colors_container').text('')
    for(const key in window.template.loading_spinner.colors){
        $('.loading_spinner_colors_container').append(
            draw_color_picker({
                keys_arr:[{key_tree:`loading_spinner.colors`,key:key}],
                name:null,
            }),
        )
    }
}
draw_loading_spinner_preview = function(){

    $('.loading_spinner_preview').text('').append(
        window.template.loading_spinner.elem.replace(':size:','M')
    )
    $('.loading_spinner_container').each(function(){
        $(this).text('').append(
            window.template.loading_spinner.elem.replace(':size:',$(this).attr('size'))
        )
    })
}

get_loading_spinners = function(){
    if(window.loading_spinners.length == 0){
        $.ajax({
            url:'api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                get_loading_spinners:true,
            },success:function(r){
                window.loading_spinners = r.loading_spinners;
                draw_loading_spinner_preview();
                draw_loading_spinners();
            }
        })
    }else{
        draw_loading_spinner_preview();
        draw_loading_spinners();
    }
}
draw_loading_spinners = function(){
    $('.loading_spinners_container').text('')
    for(const key in window.loading_spinners){
        $('.loading_spinners_container').append(
            $('<div/>',{class:`loading_spinner_select`,key:key}).append(
                window.loading_spinners[key].elem.replace(':size:','M')
            )
        )
    }
}
$('body').on('click','.loading_spinner_select',function(e){
    //e.stopImmediatePropagation();
    window.template.loading_spinner.key = $(this).attr('key');
    let spinner = window.loading_spinners[window.template.loading_spinner.key];
    window.template.loading_spinner.elem = spinner.elem;
    new_spinner_colors = {};
    for(x=1;x<=spinner.colors;x++){
        new_spinner_colors[`loading_spinner_c${x}`] = window.template.loading_spinner.colors[`loading_spinner_c${x}`] ?? 'rgba(200,200,200,1)';
    }
    window.template.loading_spinner.colors = JSON.parse(JSON.stringify(new_spinner_colors));
    set_loading_spinner_vars();
    draw_loading_spinner_preview();
    draw_loading_spinner_colors_selectors();
    new_action();

})
