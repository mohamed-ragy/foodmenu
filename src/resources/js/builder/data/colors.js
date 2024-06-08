window.colors = []
random_color = function() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  }
for(i=0;i<=100;i++){
    window.colors.push([random_color(),random_color(),random_color(),random_color()])
}
