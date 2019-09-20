

var op;
var opView;
var selectObject;
var glContext;
function setPosition(object,vector3) {
    object.position.x = vector3.x;
    object.position.y = vector3.y;
    object.position.z = vector3.z;
}
function setRotation(object,vector3) {
    object.rotation.x = vector3.x;
    object.rotation.y = vector3.y;
    object.rotation.z = vector3.z;
}
function setSize(object,vector3) {
    object.scale.x = vector3.x;
    object.scale.y = vector3.y;
    object.scale.z = vector3.z;


}
function setColor(object,color) {
    object.material.color.set(color.ox );
}
function setMaterial(object,material) {

}

function setViewport(z) {
    opView.camera.position.z = z;

}

function addObject(object) {
    opView.scene.add(object);
}
function removeObject(object) {
    opView.scene.remove(object);

}
function select(object) {
    selectObject = object;
}

function getPosition(object) {

    return Vector3(object.position.x,object.position.y,object.position.z);
}
function Move(object,vector3) {

    setPosition(object,Vector3(getPosition(object).x+vector3.x,getPosition(object).y+vector3.y,getPosition(object).z+vector3.z))

}

function getSelectObject() {
    return selectObject;
}






//创建View
function create(div) {




    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,1, 0.1, 500);
    var renderer = new THREE.WebGLRenderer();
//width / - 2, width / 2, height / 2, height / - 2, 1, 1000
    var uiCamera = new THREE.OrthographicCamera(-4,4,4,-4,1,1000);


    renderer.setSize(800, 800);
    renderer.setClearColor(Color(123,123 ,123).ox, 1.0);
    div.appendChild(renderer.domElement);
    glContext = div.firstChild.getContext("webgl");

    console.info(glContext)
    var light = new THREE.DirectionalLight( 0xff0000 );

    var View  = {};

    View.scene = scene;
    View.camera = camera;
    View.renderer = renderer;
    View.uiCamera = uiCamera;
    View.light = light;
    View.scene.add( View.light);
    View.uiCamera.position.z = 20;
    View.scene.add(View.uiCamera);
    opView= View;

    setPosition(opView.light,Vector3(0,-1,1));
    return View;
}

function Color(r,g,b) {

    var color = {};
    color.r = r;
    color.g = g;
    color.b = b;

    color.ox = (color.r << 16) | (color.g << 8) | color.b;

    return color;
}
function Vector3(x,y,z) {

    var vector3 = {};
    vector3.x = x;
    vector3.y = y;
    vector3.z = z;

    return vector3;
}

function Cos(x){

    return Math.cos((x*2*3.1415926)/360);
}
function Sin(x) {
    return Math.sin((x*2*3.1415926)/360);
}
//Vector3的除法
function Division(vector3,single) {


    return Vector3(vector3.x/single,vector3.y/single,vector3.z/single);

}
//Vector3的乘法
function Multiply(vector3,single) {
    return Vector3(vector3.x*single,vector3.y*single,vector3.z*single);
}

//求两个向量距离
function Distance(begin,end) {

    return Math.sqrt(Math.pow((begin.x - end.x),2)+ Math.pow((begin.y - end.y),2)+ Math.pow((begin.z - end.z),2));


}

//
function Equal(v1,v2) {

    if(v1.x == v2.x&&v1.y == v2.y&&v1.z == v2.z){

        return true;
    }
    return false;
}

//归一化
function Normal(vector3) {

    var distance = Distance(vector3,Vector3(0,0,0));
    return Division(vector3,distance);

}
function Substraction(begin,end) {

    return Vector3(begin.x -end.x,begin.y - end.y,begin.z - end.z);

}


function Add(begin,end) {

    return Vector3(begin.x +end.x,begin.y + end.y,begin.z + end.z);
}
function getMaxFromVector(vector3) {
    var type = {};


}

//从ary中将value移除
function RemoveFromArray(ary,value) {
    var index = ary.indexOf(value);

    ary.splice(index, 1);
}
function getRandomVector3() {

    var randomType_x = Math.round(Math.random())%2;
    var randomType_y = Math.round(Math.random())%2;
    var rx = Math.random();
    var ry = Math.random();
    if(randomType_x == 0&&randomType_y == 0){

        rx = rx;
        ry = ry;

    }
    if(randomType_x == 0&&randomType_y == 1){

        rx = rx;
        ry = -ry;

    }
    if(randomType_x == 1&&randomType_y == 0){

        rx = -rx;
        ry = ry;

    }
    if(randomType_x == 1&&randomType_y == 1){

        rx = -rx;
        ry = -ry;

    }

    return Vector3(rx,ry,0);


}
function screenConvertToWorld(mouseInput) {

    //摄像机深度
    var depth = opView.camera.position.z;
    var clipScreenWidth = (depth/Cos(45/2))*Sin(45/2);
    var a = Vector3(mouseInput.x*clipScreenWidth,mouseInput.y*clipScreenWidth,0);
//2*PI/360*角度
    return a;

}
function worldConvertToScreen(worldVec) {

    //摄像机深度
    var depth = opView.camera.position.z;
    var clipScreenWidth = (depth/Cos(45/2))*Sin(45/2);
    var a = Vector3(worldVec.x/clipScreenWidth,worldVec.y/clipScreenWidth,0);
//2*PI/360*角度
    return a;

}
var start = null;

var fps = 60
var fpsInterval = 1000 / fps
var last = new Date().getTime() //上次执行的时刻
function frame() {



    opView.renderer.render(opView.scene,opView.camera);



    var now = new Date().getTime()
    var elapsed = now - last;
    // 经过了足够的时间
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval); //校正当前时间

        // 循环的代码
        // drawSomething()
        if (op!= null){

            op();
        }
    }
    requestAnimationFrame(frame);

}



