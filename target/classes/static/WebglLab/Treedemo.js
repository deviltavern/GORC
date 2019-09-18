//
//
// function create(div) {
//
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(45,1, 0.1, 500);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(200, 200);
//     renderer.setClearColor(0xFFFFFF, 1.0);
//     div.appendChild(renderer.domElement);
//
//     var View  = {};
//     View.scene = scene;
//     View.camera = camera;
//     View. renderer = renderer;
//     return View;
// }
//
// function Color(r,g,b) {
//
//     var color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//
//     color.ox = (color.r << 16) | (color.g << 8) | color.b;
//
//     return color;
// }
// function Vector3(x,y,z) {
//
//     var vector3 = {};
//    vector3.x = x;
//    vector3.y = y;
//    vector3.z = z;
//
//     return vector3;
// }
// function createCube(color,size) {
//     var geometry = new THREE.CubeGeometry(size.x,size.y,size.z);
//
//     var material = new THREE.MeshBasicMaterial({color: color.ox});
//
//     var cube = new THREE.Mesh(geometry, material);
//
//     return cube;
// }
//
//
// var op;
// var opView;
// function frame() {
//
//
//     op();
//     opView.renderer.render(opView.scene,opView.camera);
//     requestAnimationFrame(frame);
// }
// //绘制一个立方体
// function demo1(divItem) {
//     var View =   create(divItem);
//
//     var color = Color(255,105,180);
//     var size = Vector3(1,1,1);
//     var cube = createCube(color,size);
//
//
//     View.scene.add(cube);
//
//     View.camera.position.z = 3;
//
//     op  = function(){
//         cube.rotation.x += 0.1;
//
//     }
//     opView = View;
//     frame();
//
// }
// //绘制一个螺旋线
// function demo2(divItem) {
//     var initPoint = Vector3(0,0,0);
//     var endPoint = Vector3(300,300,0);
// }
//
