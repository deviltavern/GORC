
var moveDir = Vector3(1,0,0);

var dirArray = new Array();
var bodyArray = new Array();
var speed = 0.1;
var dynamicSpeed = 20;
var bodyGap = 0.6;

var raycaster = new THREE.Raycaster();
var snackArray = new Array();
var detectionList = new Array();

//从蛇头里面获取
function getSnackFromArray(id) {

    //console.info(snackArray);
    for (var i in snackArray){

        if (snackArray[i].id == id)
        {
            return snackArray[i];
        }
    }
    return  null;

}

//生成蛇头
function insNewSnackHead(id) {
    var snackHead = {};
    snackHead.id = id;
    snackHead.head = createSphere(Vector3(0.6,16,16));

    snackHead.dynamicTime = 0;
    snackHead.bodyIndex = 0;
    snackHead.moveDir = Vector3(1,0,0);
    snackHead.speed = 0.1;
    snackHead.len = 0;
    snackHead.bodyArray = new Array();
    snackHead.lastPos= Vector3(0,0,0);
    snackHead.dirLabel = 0;
    snackHead.bodyMsg = "";

    snackHead.addBody = function(){

       var bodyItem =  createGluttonousBody(snackHead);
       snackHead.bodyArray.push(bodyItem);
       bodyItem.id = snackHead.len;
       snackHead.len++;
    }


    snackHead.op = function () {
        borderDetection(snackHead);


        if (snackHead.id != getSnackID()){
            // for(var bodyItem in snackHead.bodyArray)
            // {
            //     snackHead.bodyArray[bodyItem].cloneOp(snackHead);
            // }
        }else {
            Move(snackHead.head,Multiply(Normal(snackHead.moveDir),snackHead.speed));

        }


        rayDetection(snackHead);

        for(var bodyItem in snackHead.bodyArray)
        {
            snackHead.bodyArray[bodyItem].subOp(snackHead);

        }
    }
    snackArray.push(snackHead);
    return snackHead;

}



function createGluttonousBody(snackHead) {

    var bodyItem = {};
    bodyItem.dirArray = new Array();
    bodyItem.body = createSphere(Vector3(0.4,16,16));

    bodyItem.dirIndex = 0;
    bodyItem.preDir = moveDir;
    bodyItem.moveDir = Vector3(0,0,0);
    bodyItem.bodyIndex = 0;
    bodyItem.dirLabel = 0;



    if (snackHead.bodyArray.length!=0){
        console.info(Normal(snackHead.moveDir));
        setPosition(bodyItem.body,Substraction(getPosition(snackHead.bodyArray[snackHead.bodyArray.length-1].body),
            Normal(snackHead.bodyArray[snackHead.bodyArray.length-1].preDir)));
        bodyItem.bodyIndex = snackHead.bodyArray.length;
    }else {

        setPosition(bodyItem.body,Vector3(getPosition(snackHead.head).x - bodyGap,
            getPosition(snackHead.head).y,getPosition(snackHead.head).z));
        bodyItem.bodyIndex = 0;
    }

    var b12headNormalx = null;
    if (snackHead.bodyArray.length!=0){

        var lastBody = snackHead.bodyArray[snackHead.bodyArray.length-1];
        console.info(lastBody.id);
        setColor(lastBody.body,Color(1,1,1));
        b12headNormalx = Normal(Substraction(getPosition(lastBody.body),getPosition(bodyItem.body)));
        for(var i =0;i<Distance(getPosition(lastBody.body),getPosition(bodyItem.body))*(1/snackHead.speed);i++){
            console.info((Multiply(b12headNormalx,snackHead.speed)));
            bodyItem.dirArray.push(Multiply(b12headNormalx,snackHead.speed));
        }

        for (var i = lastBody.dirIndex;i<lastBody.dirArray.length;i++){
            bodyItem.dirArray.push(lastBody.dirArray[i]);

        }



    }
    else
    {

        b12headNormal = Normal(Substraction(getPosition(snackHead.head),getPosition(bodyItem.body)));
        console.info("------------------------>");
        console.info(b12headNormal);
        console.info(snackHead.speed);
        console.info("------------------------>");
        for(var i =0;i<Distance(getPosition(snackHead.head),getPosition(bodyItem.body))*(1/snackHead.speed);i++){
            //console.info((Multiply(b12headNormalx,snackHead.speed)));

            var dir = Multiply(b12headNormal,snackHead.speed);
            console.info(dir);
            bodyItem.dirArray.push(dir);
        }

    }



    bodyItem.subOp = function(snackHead){
        //console.info(Multiply(snackHead.moveDir,snackHead.speed));

        if (snackHead.id!= getSnackID()){

          //  console.info(snackHead.moveDir);
        }
        bodyItem.dirArray.push(Multiply(snackHead.moveDir,snackHead.speed));
        bodyItem.preDir =bodyItem.dirArray[bodyItem.dirIndex];


        bodyItem.moveDir = Normal(bodyItem.preDir);


        Move(bodyItem.body,bodyItem.preDir);
        //console.info(bodyItem.preDir);
        bodyItem.dirIndex++;

       if (bodyItem.dirIndex>200){
//
//
           bodyItem.dirArray.splice(0, 50);
           bodyItem.dirIndex -=50 ;
//
          // console.info("身体缓存 = "+bodyItem.dirArray.length);
       }
//
      // console.info(bodyItem.dirIndex);
    }

    bodyItem.cloneOp = function (snackHead) {
        var ary = snackHead.bodyMsg.mg;
        for (var i in ary)
        {
            if (i>snackHead.bodyArray.length){

                return;
            }
            var val = ary[i];
            var lastBody = null;
            if (i >1)
            {

                lastBody = snackHead.bodyArray[i-1].body;
            }
            else {

                lastBody = snackHead.head;
            }
            var body = snackHead.bodyArray[i];
            switch (val) {

                case 1:
                    setPosition(body.body,Substraction(getPosition(lastBody),Multiply(Vector3(-1,0,0),bodyGap)));
                    break;

                case 3:
                   setPosition(body.body,Substraction(getPosition(lastBody),Multiply(Vector3(0,1,0),bodyGap)));
                    break;

                case  2:
                    setPosition(body.body,Substraction(getPosition(lastBody),Multiply(Vector3(1,0,0),bodyGap)));
                    break;
                case  4:
                    setPosition(body.body,Substraction(getPosition(lastBody),Multiply(Vector3(0,-1,0),bodyGap)));
                    break;
            }

        }

    }
   // bodyArray.push(bodyItem);
    return bodyItem;

}
//上下文
function context(div) {
     connect();
     create(div);
     setViewport(70);
     onKey();


     var dynamicTime = 0;

     op = function(){
         uploadPredictionPos();
         dynamicTime++;
         for (var si in snackArray)
         {
             snackArray[si].op();
         }

        if (dynamicTime>100){
            dynamicTime = 0;

        }

     }

     frame(frameTime);




}
//UI控制部分
function uiControl(snackHead) {

    var leftBtn = findViewByID("left");
    leftBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
        snackHead.moveDir = Vector3(-1,0,0);

       // console.info(t2.position);
    }
    var rightBtn = findViewByID("right");
    rightBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
        snackHead.moveDir = Vector3(1,0,0);
    }
    var upBtn = findViewByID("up");
    upBtn.onclick = function(ev){

        snackHead.moveDir = Vector3(0,1,0);
    }

    var backBtn = findViewByID("back");

    backBtn.onclick = function (ev) {
        snackHead.moveDir = Vector3(0,-1,0);
    }

    var beginBtn = findViewByID("begin");

    beginBtn.onclick = function (ev) {

        s1.addBody();
        console.info("添加了一个身体！");

    }
}

//获取body前一个body

//预测点更新蛇的运动方向
function updateSnackDir( snack,vector3) {

    if (snack == null)
        return;
    if (Distance(vector3,getPosition(snack.head))<0.1){
        snack.moveDir = Vector3(0,0,0);
    }else{
        var moveDir =Normal(Division(vector3,getPosition(snack.head))) ;
        snack.moveDir = vector3;
    }


}


var lastTouchObject;



function onEnter(snackHead,preObject) {
    if (lastTouchObject == preObject){

        return;
    }
   // snackHead.addBody();
    lastTouchObject = preObject;
    removeFoodFromList(preObject);
    var eatCube = {};
    eatCube.snackID = snackHead.id;
    send(100,204,eatCube);

    console.info("吃掉的ID = "+snackHead.id);

}
function onStay(preObject) {

   // console.info("保持状态！");


}

function onExit(insertList) {

    if (insertList.length == 0){

      //  console.info("离开！");
    }
}




function rayDetection(snackHead) {
    var point = new THREE.Vector2();
    point.x = worldConvertToScreen(getPosition(snackHead.head)).x;
    point.y = worldConvertToScreen(getPosition(snackHead.head)).y;
    raycaster.setFromCamera(point, opView.camera);
    var intersects = raycaster.intersectObjects(foodList);


    if(intersects.length>0){

       // console.info("发生碰撞！:"+intersects.length);


        for (var objx in intersects){

            if(intersects[objx].object.tag == "food"){

                setColor(intersects[0].object,Color(123,123,123));

                onEnter(snackHead,intersects[0].object);
                onStay(intersects[0].object);
            }


        }

    }

    onExit(intersects);

}

function borderDetection(snackBody) {

    //当head的x大于世界坐标的x
    if(getPosition(snackBody.head).x >screenConvertToWorld(Vector3(1,0,0)).x||getPosition(snackBody.head).x <screenConvertToWorld(Vector3(-1,0,0)).x){
        snackBody.moveDir.x = -snackBody.moveDir.x;

    }

    if(getPosition(snackBody.head).y >screenConvertToWorld(Vector3(0,1,0)).y||getPosition(snackBody.head).y <screenConvertToWorld(Vector3(0,-1,0)).y){
        snackBody.moveDir.y = -snackBody.moveDir.y;

    }

}