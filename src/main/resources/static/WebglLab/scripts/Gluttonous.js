
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
    snackHead.dirArray = new Array();
    snackHead.dirIndex = 0;
    snackHead.posArray = new Array();
    snackHead.addBody = function(){

       var bodyItem =  createGluttonousBody(snackHead);
       snackHead.bodyArray.push(bodyItem);
       bodyItem.id = snackHead.len;
       snackHead.len++;
    }


    snackHead.op = function () {
        borderDetection(snackHead);
        snackHead.posArray.push(getPosition(snackHead.head));

        cicleForMoveDirRewrite(snackHead);

        snackHead.dirArray.push(Multiply(snackHead.moveDir,snackHead.speed));
        snackHead.dirIndex++;
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
    bodyItem.posArray = new Array();
    bodyItem.posIndex = 0;



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
    var lastBody = snackHead.bodyArray[snackHead.bodyArray.length-1];


    for (var i = snackHead.posArray.length - 6*(snackHead.bodyArray.length+1);i<snackHead.posArray.length;i++){

        bodyItem.posArray.push(snackHead.posArray[i]);
    }


    bodyItem.subOp = function(snackHead){
        //console.info(Multiply(snackHead.moveDir,snackHead.speed));

        if (snackHead.id!= getSnackID()){

          //  console.info(snackHead.moveDir);
        }

        bodyItem.posArray.push(getPosition(snackHead.head));
        bodyItem.dirArray.push(Multiply(snackHead.moveDir,snackHead.speed));
        bodyItem.preDir =bodyItem.dirArray[bodyItem.dirIndex];


        bodyItem.moveDir = Normal(bodyItem.preDir);


        //Move(bodyItem.body,bodyItem.preDir);
        setPosition(bodyItem.body,bodyItem.posArray[bodyItem.posIndex]);
        bodyItem.posIndex = bodyItem.posIndex+1;
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

    if (snackHead.id == getSnackID()){
        var eatCube = {};
        eatCube.snackID = snackHead.id;
        send(100,204,eatCube);
    }

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

var detectionDelay = 0;
function borderDetection(snackBody) {

    //当head的x大于世界坐标的x
    //console.info("方向切换！！！");
    detectionDelay = detectionDelay-1;

    if(detectionDelay<0)
    {
        detectionDelay = 0;
    }
    if(getPosition(snackBody.head).x >screenConvertToWorld(Vector3(1,0,0)).x||getPosition(snackBody.head).x <screenConvertToWorld(Vector3(-1,0,0)).x){


        if (detectionDelay == 0)
        {
            detectionDelay = 20;
            uiControlDir.x = -uiControlDir.x;


        }
        console.info("横向超过");

    }

    if(getPosition(snackBody.head).y >screenConvertToWorld(Vector3(0,1,0)).y||getPosition(snackBody.head).y <screenConvertToWorld(Vector3(0,-1,0)).y){

        if (detectionDelay == 0) {
            detectionDelay = 20;
            uiControlDir.y = -uiControlDir.y;

        }
        console.info("纵向超过");
    }

}