

var op;
var opView;
var selectObject;
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
function getSelectObject() {
    return selectObject;
}
//创建View
function create(div) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,1, 0.1, 500);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    renderer.setClearColor(Color(255,239 ,213).ox, 1.0);
    div.appendChild(renderer.domElement);

    var light = new THREE.DirectionalLight( 0xff0000 );

    var View  = {};

    View.scene = scene;
    View.camera = camera;
    View.renderer = renderer;
    View.light = light;
    View.scene.add( View.light);
    opView= View;
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

function frame() {

    if (op!= null){

        op();
    }

    opView.renderer.render(opView.scene,opView.camera);
    requestAnimationFrame(frame);
}



