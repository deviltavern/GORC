

var op;
var opView;

function setViewport(z) {
    opView.camera.position.z = z;

}
function setSize(width,height) {

}
function addObject(object) {
    opView.scene.add(object);
}
function removeObject(object) {
    opView.scene.remove(object);

}

function create(div) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,1, 0.1, 500);




    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    renderer.setClearColor(Color(255,239 ,213).ox, 1.0);
    div.appendChild(renderer.domElement);


    var View  = {};
    View.scene = scene;
    View.camera = camera;
    View. renderer = renderer;


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



