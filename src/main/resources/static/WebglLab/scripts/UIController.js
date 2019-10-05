


function showEvent() {

    var coddinateLabel = document.getElementById("localMoveDir");

    var snack = getSnackFromArray(getSnackID());


    var moveDir = getSnackFromArray(getSnackID()).moveDir;
    var v = JSON.stringify(moveDir);
    v+= "\n";
    v+= JSON.stringify(getPosition(snack.head));
    //moveDir.position = getPosition(snack.head);
    if(moveDir!= null){

        coddinateLabel.innerText = v;
    }


}
function setLabelID(ID) {
    var idLabel = document.getElementById("idLabel");
    idLabel.innerText = ID;


}

var times = 0;
var lastDir = Vector3(0,0,0);
window.ontouchmove = function(event){

    times++;
    if(times>5){

        dir = Substraction(lastDir,Vector3(event.changedTouches[0].screenX,event.changedTouches[0].screenY,0));
        dir = Normal(dir);
        lastDir = Vector3(event.changedTouches[0].screenX,event.changedTouches[0].screenY,0);
        document.getElementById("info").innerText =  JSON.stringify(dir);
        // console.info(JSON.stringify(dir));

        uiControlDir = Vector3(-dir.x,dir.y,dir.z);
    }
}

var allowMouseMove = false;

window.onmousedown = function (ev) {
    allowMouseMove = true;

}
window.onmouseup = function (ev) {
    allowMouseMove = false;
    uiControlDir = Vector3(0,0,0);

}

window.onmousemove = function (ev) {
    if(allowMouseMove == true) {

        console.info("123");


        times++;
        if (times > 5) {

            dir = Substraction(lastDir, Vector3(ev.clientX, ev.clientY, 0));
            dir = Normal(dir);
            lastDir = Vector3(ev.clientX, ev.clientY, 0);
            document.getElementById("info").innerText = JSON.stringify(dir);
            // console.info(JSON.stringify(dir));

            uiControlDir = Vector3(-dir.x, dir.y, dir.z);
        }
    }

}
window.ontouchend = function (ev) {
    uiControlDir = Vector3(0,0,0);
   // document.getElementById("info").innerText =  JSON.stringify(dir);
}
function onKey() {
    window.onkeydown = function (ev) {


        //按下了D键
        if (ev.keyCode == 68){

           // console.info("hello");
            uiControlDir = Vector3(0,0,0);
            console.info("按下了D键")

        }

    }

}


function getPreDir() {


}

function cicleForMoveDirRewrite(snackHead) {



}

var uiControlDir = Vector3(0,0,0);
//UI控制部分
function uiControl(snackHead) {

    var leftBtn = findViewByID("left");
    leftBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
       // snackHead.moveDir = Vector3(-1,0,0);

        uiControlDir = Vector3(-1,0,0);
        console.info(uiControlDir);


        // console.info(t2.position);
    }
    var rightBtn = findViewByID("right");
    rightBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
       // snackHead.moveDir = Vector3(1,0,0);
        uiControlDir = Vector3(1,0,0);
        console.info(uiControlDir);
    }
    var upBtn = findViewByID("up");
    upBtn.onclick = function(ev){

       // snackHead.moveDir = Vector3(0,1,0);
        uiControlDir= Vector3(0,1,0);
        console.info(uiControlDir);
    }

    var backBtn = findViewByID("back");

    backBtn.onclick = function (ev) {
        //snackHead.moveDir = Vector3(0,-1,0);
        uiControlDir = Vector3(0,-1,0);
        console.info(uiControlDir);
    }

    var beginBtn = findViewByID("begin");

    beginBtn.onclick = function (ev) {

        s1.addBody();
        console.info("添加了一个身体！");

    }
}
