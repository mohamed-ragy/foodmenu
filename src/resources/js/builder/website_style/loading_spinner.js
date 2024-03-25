set_loading_spinner_settings = function(){
    set_loading_spinner_vars();
    draw_loading_spinner_preview();
}
draw_loading_spinner = function(){
    $('#loading_spinner').addClass('w400 h800').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'inter fs1 bold',text:texts.website_style.loading_spinner}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.loading_spinner_des}),
        $('<div/>',{class:'w100p mB40',id:'loading_spinner_settings'}).append(
            $('<div/>',{class:`loading_spinner_preview body_color_theme`}),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.colors}),
                 $('<div/>',{class:'row alnC jstfyE'}).append(
                    $('<div/>',{class:'color_s_circle color_select',style:`background-color:var(--loading_spinner_c1)`,key_tree:'loading_spinner.colors',key:'loading_spinner_c1'}).append(
                        $('<input/>',{class:'color_select_input vH absolute',type:'color'}),
                    ),
                    $('<div/>',{class:'color_s_circle color_select',style:`background-color:var(--loading_spinner_c2)`,key_tree:'loading_spinner.colors',key:'loading_spinner_c2'}).append(
                        $('<input/>',{class:'color_select_input vH absolute',type:'color'}),
                    ),
                ),
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
            $('<div/>',{class:`loading_spinner_select body_color_theme`,key:key}).append(
                window.loading_spinners[key].elem.replace(':size:','M')
            )
        )
    }
}
$('html,body').on('click','.loading_spinner_select',function(e){
    e.stopImmediatePropagation();
    window.template.loading_spinner.key = $(this).attr('key');
    let spinner = window.loading_spinners[window.template.loading_spinner.key];
    window.template.loading_spinner.elem = spinner.elem;

    draw_loading_spinner_preview();
    new_action();

})
