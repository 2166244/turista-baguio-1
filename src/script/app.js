window.onload = function(){
    var canvas = document.getElementById("mapCanvas");
    var ctx = canvas.getContext("2d");
    var pic = document.getElementById("baguioMap");
    ctx.drawImage(pic, 0,0);
}
