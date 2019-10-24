
var x = 10;
function context(div) {

    create(div)
   // setViewport(20);


    var player =  Cube(Color(123,123,123),Vector3(0,0,0));
    var lightCube = createCube();

    var plane = createPlane();
    var t2 = createCube();
    setSize(plane,Vector3(10,10,10));
    setColor(plane,Color(123,123,123));
    setPosition(opView.light,Vector3(0,-1,1));


    var po2 = Vector3(0,0,0);

    addObject(player);
    //----------------------------------

    opView.camera.layer = 3;
    //用来保存鼠标坐标信息

    var mouse = new THREE.Vector2();
    //添加鼠标移动事件，检测鼠标的移动
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function onDocumentMouseMove(event) {

        //获取鼠标的x，y坐标

        mouse.x = (event.clientX / 800) * 2 - 1;
        mouse.y = -((event.clientY-100) /800) * 2 + 1;
        //console.info("move"+ mouse.x+"<>"+ mouse.y+"<>"+event.clientX+"<>"+event.clientY);
        move();
        return mouse;
    }

   //div.onmousemove = onDocumentMouseMove;
    //----------

    var raycaster = new THREE.Raycaster();


     function move(){


        raycaster.setFromCamera(mouse, opView.camera);
        var intersects = raycaster.intersectObjects(opView.scene.children);
        console.info(raycaster.position);

        var mouseVector3 = Vector3(mouse.x,mouse.y,0);

        var aimPosition =  screenConvertToWorld(mouseVector3);
        // setPosition(t2,aimPosition);
        if(selectObject!= null){

            console.info(aimPosition);
        }
        //console.info();

    }

     var leftBtn = findViewByID("left");
     leftBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
         Move(t2,Vector3(-1,0,0));

         console.info(t2.position);
     }
    var rightBtn = findViewByID("right");
    rightBtn.onclick = function (ev) {
        // setPosition(t2,Vector3(getPosition(t2).x-1,getPosition(t2).y,getPosition(t2).z));
        Move(t2,Vector3(1,0,0));
    }
    var upBtn = findViewByID("up");
    upBtn.onclick = function(ev){

        Move(t2,Vector3(0,1,0));
    }

    var backBtn = findViewByID("back");

    backBtn.onclick = function (ev) {
        Move(t2,Vector3(0,-1,0));


    }



    op = function () {

        player.setPosition(po2);
        setPosition(lightCube,getPosition(opView.light));

        //console.info(opView.camera.position);


    }

    frame();


}