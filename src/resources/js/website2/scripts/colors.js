color = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;

    } else {
        return '#'+hexColor;
    }
};
isDark = (color) => {
    color = color.replace('#', '');
    let color_red = parseInt(color.substr(0, 2), 16)
    let color_green = parseInt(color.substr(2, 2), 16)
    let color_blue = parseInt(color.substr(4, 2), 16)
    let brightness = ((color_red * 299) + (color_green * 587) + (color_blue * 114)) / 1000;
    return brightness < 155 ? true : false;
}

$(':root').css('--ce',colors.colorError);
$(':root').css('--cs',colors.colorSuccess);
$(':root').css('--cw',colors.colorWarning);
$(':root').css('--cr',colors.colorStar);
$(':root').css('--c1',colors.color1);
$(':root').css('--c2',colors.color2);
$(':root').css('--c3',colors.color3);
$(':root').css('--c4',colors.color4);
$(':root').css('--c5',colors.color5);


$(':root').css('--c1txt',colors.color3)
$(':root').css('--c2txt',colors.color5)


if(isDark(colors.color3)){
    $(':root').css('--c1txt',colors.color4)
    // $(':root').css('--c2txt',colors.color5)
}
