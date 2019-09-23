

function userVideo(src,parent) {

    var dom1 = document.createElement("video");
    var Ldom1 = parent.appendChild(dom1);
    Ldom1.autoplay = "autoplay";
    Ldom1.loop = "loop";
    Ldom1.muted = "muted";
    Ldom1.style.minWidth = "98%";
    Ldom1.style.minHeight = "100%";
    Ldom1.style.borderStyle = "solid";
    Ldom1.zIndex = "-10";
    Ldom1.style.position = "absolute";
    var vdeioSource = document.createElement("source");
    var vs =  Ldom1.appendChild(vdeioSource);
    vs.style.minWidth = "100%";
    vs.type="video/mp4";
    vs.style.width = "auto";
    vs.style.height = "auto";
    vs.style.minHeight = "100%";
    vs.src = src;




}