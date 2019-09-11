
var x = 10;
function context(div) {

    create(div)
    setViewport(20);


    var player =  Cube(Color(123,123,123),Vector3(0,0,0));
    var lightCube = createCube();

    var plane = createPlane();

    setSize(plane,Vector3(10,10,10));
    setColor(plane,Color(123,123,123));
    setPosition(opView.light,Vector3(0,-1,1));


    var po2 = Vector3(0,0,0);


    document.onkeydown=function(event){

        console.info("presskey");


        switch (event.keyCode) {
            case 65:

                console.info("adjust light source dir");
                break;

            //left
            case 37:

                po2.x =po2.x-1;
                break;
            //up
            case 38:
                po2.y =  po2.y+1;
                break;
            //right
            case 39:
                po2.x =  po2.x+1;
                break;
            //down
            case 40:
                po2.y = po2.y-1;
                break;

            default:

                break;
        }

    console.info(JSON.stringify(po2));

    };

    addObject(player);
    //----------------------------------


    //用来保存鼠标坐标信息

    var mouse = new THREE.Vector2();
    //添加鼠标移动事件，检测鼠标的移动
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function onDocumentMouseMove(event) {

        //获取鼠标的x，y坐标

        mouse.x = (event.clientX / 800) * 2 - 1;
        mouse.y = -((event.clientY-100) /800) * 2 + 1;
        //console.info("move"+ mouse.x+"<>"+ mouse.y+"<>"+event.clientX+"<>"+event.clientY);

        return mouse;
    }

    div.onmousemove = onDocumentMouseMove;
    //----------

    var raycaster = new THREE.Raycaster();


    div.onclick = function(){
        raycaster.setFromCamera(mouse, opView.camera);
        var intersects = raycaster.intersectObjects(opView.scene.children);
        console.info(raycaster.position);
        if (intersects.length>0)
        {
            intersects[ 0].object.material.color.set( 0x000000 );
            select(intersects[0].object);
            console.info(getSelectObject().position);
        }
        var mouseVector3 = Vector3(mouse.x,mouse.y,0);
        console.info(mouseVector3);
        console.info(screenConvertToWorld(mouseVector3));

    }

    op = function () {

        player.setPosition(po2);
        setPosition(lightCube,getPosition(opView.light));








    }

    frame();


}