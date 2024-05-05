window.colors = []
random_color = function() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgba(${red},${green},${blue},1)`;
  }
for(i=0;i<=100;i++){
    window.colors.push({
        color_theme_1:{
            bg:random_color(),
            txt:random_color(),
            a:random_color(),
            a_hover:random_color(),
            star:random_color(),
            success:random_color(),
            error:random_color(),
            warning:random_color(),
        },
        color_theme_2:{
            bg:random_color(),
            txt:random_color(),
            a:random_color(),
            a_hover:random_color(),
            star:random_color(),
            success:random_color(),
            error:random_color(),
            warning:random_color(),
        },
        color_theme_3:{
            bg:random_color(),
            txt:random_color(),
            a:random_color(),
            a_hover:random_color(),
            star:random_color(),
            success:random_color(),
            error:random_color(),
            warning:random_color(),
        },
        color_theme_4:{
            bg:random_color(),
            txt:random_color(),
            a:random_color(),
            a_hover:random_color(),
            star:random_color(),
            success:random_color(),
            error:random_color(),
            warning:random_color(),
        },
    })
}
