
var moveDir = Vector3(1,0,0);

var dirArray = new Array();
var bodyArray = new Array();
var speed = 1/50;
var bodyGap = 0.6;
var head;
var raycaster = new THREE.Raycaster();
var foodList = new Array();
var detectionList = new Array();

function createGluttonousBody(head) {

    var bodyItem = {};
    bodyItem.dirArray = new Array();
    bodyItem.body = createSphere(Vector3(0.4,16,16));

    bodyItem.dirIndex = 0;
    bodyItem.preDir = moveDir;

    var lastBody = bodyArray[bodyArray.length-1];

    if (bodyArray.length!=0){
        console.info(Normal(moveDir));
        setPosition(bodyItem.body,Substraction(getPosition(bodyArray[bodyArray.length-1].body),Normal(bodyArray[bodyArray.length-1].preDir)));

    }else {

        setPosition(bodyItem.body,Vector3(getPosition(head).x - bodyGap, getPosition(head).y,getPosition(head).z));
    }
    if (bodyArray.length!=0){
        var b12headNormalx = Normal(Substraction(getPosition(lastBody.body),getPosition(bodyItem.body)));
        for(var i =0;i<Distance(getPosition(lastBody.body),getPosition(bodyItem.body))*(1/speed);i++){

            bodyItem.dirArray.push(Multiply(b12headNormalx,speed));
        }

        for (var i = lastBody.dirIndex;i<lastBody.dirArray.length;i++){
            bodyItem.dirArray.push(lastBody.dirArray[i]);

        }



    }
    else
    {
        var b12headNormal = Normal(Substraction(getPosition(head),getPosition(bodyItem.body)));

        for(var i =0;i<Distance(getPosition(head),getPosition(bodyItem.body))*(1/speed);i++){

            bodyItem.dirArray.push(Multiply(b12headNormal,speed));
        }

    }



    bodyItem.subOp = function(){

        bodyItem.dirArray.push(Multiply(moveDir,speed));
        bodyItem.preDir =bodyItem.dirArray[bodyItem.dirIndex];

        Move(bodyItem.body,bodyItem.preDir);
        bodyItem.dirIndex++;

        if (bodyItem.dirIndex>200){


            bodyItem.dirArray.splice(0, 200);

            bodyItem.dirIndex = 0;
            console.info("清空单元");
        }

       // console.info(bodyItem.dirIndex);
    }
    bodyArray.push(bodyItem);



    return bodyItem;


}


function context(div) {

     create(div);
     setViewport(20);

     head =  createSphere(Vector3(0.6,16,16));

     var b1 = createGluttonousBody(head);
     var b2 = createGluttonousBody(head);

     uiControl();
     var dynamicTime = 0;

     var bodyIndex = 0;
     op = function(){


        console.info( );

        dynamicTime++;
      //  console.info(Distance(Vector3(0,0,0),Vector3(1,1,0)));

         //getRandomVector3()
        if (dynamicTime>100){
            dynamicTime = 0;
            insRandomCube();
        }
         Move(head,Multiply(Normal(moveDir),speed));
         rayDetection();
         for(var bodyItem in bodyArray)
         {
             bodyArray[bodyItem].subOp();

         }
         bodyIndex++;
         //console.info("循环渲染中！");
     }

     frame();




}
//UI控制部分
function uiControl() {

    var leftBtn = findViewByID("left");
    leftBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
        moveDir = Vector3(-1,0,0);

       // console.info(t2.position);
    }
    var rightBtn = findViewByID("right");
    rightBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
        moveDir = Vector3(1,0,0);
    }
    var upBtn = findViewByID("up");
    upBtn.onclick = function(ev){

        moveDir = Vector3(0,1,0);
    }

    var backBtn = findViewByID("back");

    backBtn.onclick = function (ev) {
        moveDir = Vector3(0,-1,0);
    }

    var beginBtn = findViewByID("begin");

    beginBtn.onclick = function (ev) {

        createGluttonousBody(head);
        console.info("添加了一个身体！");

    }
}

function insRandomCube() {
    if(foodList.length<10){
        var vec = getRandomVector3();

        var tempCube = createCube();
        setPosition(tempCube,screenConvertToWorld(vec));
        foodList.push(tempCube);
        tempCube.tag = "food";
    }

}

var lastTouchObject;



function onEnter(preObject) {
    if (lastTouchObject == preObject){

        return;
    }
    createGluttonousBody(head);
    lastTouchObject = preObject;
    removeFoodFromList(preObject);
    console.info("初始进入");
}
function onStay(preObject) {

   // console.info("保持状态！");


}

function onExit(insertList) {

    if (insertList.length == 0){

      //  console.info("离开！");
    }
}


function removeFoodFromList(food) {

    opView.scene.remove(food);
    var index = foodList.indexOf(food);
    if (index > -1) {
        foodList.splice(index, 1);
    }


}

function rayDetection() {
    var point = new THREE.Vector2();
    point.x = worldConvertToScreen(getPosition(head)).x;
    point.y = worldConvertToScreen(getPosition(head)).y;
    raycaster.setFromCamera(point, opView.camera);
    var intersects = raycaster.intersectObjects(foodList);


    if(intersects.length>0){

       // console.info("发生碰撞！:"+intersects.length);


        for (var objx in intersects){

            if(intersects[objx].object.tag == "food"){

                setColor(intersects[0].object,Color(123,123,123));

                onEnter(intersects[0].object);
                onStay(intersects[0].object);


            }


        }

    }

    onExit(intersects);

}