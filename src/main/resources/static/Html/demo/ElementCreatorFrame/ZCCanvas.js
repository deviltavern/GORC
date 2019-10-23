

var opCanvas;

function setCanvas(canvas) {

    opCanvas = canvas;
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
function getMouse(ev) {


    return Vector3(ev.clientX,ev.clientY);
}
function getTouchPosition(ev1) {

    return Vector3(ev1.changedTouches[0].screenX,ev1.changedTouches[0].screenY);
}
/**
 * 画板
 * @param width
 * @param height
 * @param position
 * @returns {{}}
 */
function drawBoard(width,height,position) {

    var mainCanvas = canvas(width,height,position.x,position.y);
    setCanvas(mainCanvas.context);
    var allowDraw = false;
    var allowDrawCounter = 0;
    window.onmousedown = function (ev1) {

        pointList.length = 0;
        if(allowDrawCounter%2 == 0){

            allowDraw = true;
        }else {

            allowDraw = false;
        }
        allowDrawCounter++;
        console.info(allowDrawCounter)
    };
    var lastPoint = null;
    window.onmousemove = function (ev1) {

        if(allowDraw == true){

            if (pointList.length >=6){

                var tempLine = line(flushPointList());
                drawLine(tempLine);

                lastPoint = tempLine.data[tempLine.data.length-1];


                feedPoint(lastPoint);
            }
            feedPoint(getMouse(ev1));
            mainCanvas.ondraw(getMouse(ev1));

        }

    };

    window.ontouchstart =function (ev1) {

        pointList.length = 0;
        if(allowDrawCounter%2 == 0){

            allowDraw = true;
        }else {

            allowDraw = false;
        }
        allowDrawCounter++;
        console.info(allowDrawCounter)
    };
    window.ontouchmove = function (ev1) {

            if (pointList.length >=20){

                var tempLine = line(flushPointList());
                drawLine(tempLine);

                lastPoint = tempLine.data[tempLine.data.length-1];


                feedPoint(lastPoint);
            }
            feedPoint(getTouchPosition(ev1));
        mainCanvas.ondraw(getTouchPosition(ev1));



    };
    return mainCanvas;

}
