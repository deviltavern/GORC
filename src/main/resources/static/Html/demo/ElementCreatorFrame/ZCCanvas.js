

var opCanvas;

function setCanvas(canvas) {

    opCanvas = canvas;
}

function drawLine() {

}

function drawBackgroundColor(width,height,color) {
    opCanvas.fillStyle = color

    opCanvas.fillRect(0,0,width,height);

}


function drawLine(line) {

    moveTo(line.getPoint(0));

    for (var i=0;i<line.data.length-1;i++){


        moveTo(line.getPoint(i));

        lineTo(line.getPoint(i+1));

    }
    opCanvas.stroke();
}

//------------------------------------元素-----------------------------------
var pointList = [];

function feedPoint(vecotr3) {

    pointList.push(vecotr3)
}

function flushPointList() {

    var tempList = [];
    for (var i in pointList){

        tempList.push(pointList[i]);
    }
    pointList.length = 0;
    return tempList;

}
function setLineWidth(value) {
    opCanvas.lineWidth = value;
}

function line(pointList) {
    var li = {};
    li.data = pointList;
    li.getPoint = function (i) {

        return li.data[i];
    }
    li.addPoint = function (vector3) {

        li.data.push(vector3);
    }
    return li;
}

//----------------------------------------op------------------------------------

function moveTo(vector3) {
    opCanvas.moveTo(vector3.x,vector3.y);


}
function lineTo(vector3) {
    opCanvas.lineTo(vector3.x,vector3.y);

}


//-------------------------------------坐标图纸------------------------------------


