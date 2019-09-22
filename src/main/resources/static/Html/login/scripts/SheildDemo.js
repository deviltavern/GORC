

function createSheild(zIndex) {

    console.info("创建一个黑色遮罩！");

    var d1 = document.createElement("div");
    document.body.style.position = "absolute";
    var v = document.body.appendChild(d1);
    v.style.background = "black";
    v.style.zIndex = zIndex+"";
    v.style.width = window.innerWidth+"px";
    v.style.height = window.innerHeight+"px";
    v.style.opacity = "0.6";
    v.style.position = "absolute";
    v.style.left = "0px";
    v.style.top = "0px";


}