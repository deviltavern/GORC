

function distance2D(begin,end) {

        return Math.sqrt(Math.pow((begin.x - end.x),2)+ Math.pow((begin.y - end.y),2));

}

function getMouse(ev) {

    var pos = {};
    pos.x = ev.clientX;
    pos.y = ev.clientY;
    return pos;


}