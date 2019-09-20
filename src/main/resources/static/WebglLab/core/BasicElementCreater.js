
function Cube(color,size) {
    var geometry = new THREE.CubeGeometry(size.x,size.y,size.z);

    //var material = new THREE.MeshBasicMaterial({color: color.ox});
    // color:0xFFFFFF
    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var cube = new THREE.Mesh(geometry, material);
    cube.setPosition = function(vector3){

        cube.position.x = vector3.x;
        cube.position.y = vector3.y;
        cube.position.z = vector3.z;

    };
    return cube;
}

function Plane(color,size) {
    var geometry = new THREE.PlaneGeometry( size.x, size.y, size.z );
    var material = new THREE.MeshBasicMaterial( {color:color.ox} );
    var plane = new THREE.Mesh( geometry, material );
    setPosition(plane,Vector3(0,0,0));
    return plane;
}

function Sphere(color,size) {
    var geometry = new THREE.SphereGeometry( size.x, size.y, size.z );
    var material = new THREE.MeshLambertMaterial( {color: 0xFFFFFF} );
    var sphere = new THREE.Mesh( geometry, material );
    setPosition(sphere,Vector3(0,0,0));

    return sphere;
}

function createCube() {
    var cube = Cube(Color(1,1,1),Vector3(1,1,1));
    addObject(cube);
    return cube;
}

function createPlane() {
    var plane = Plane(Color(1,1,1),Vector3(1,1,1));
    addObject(plane);
    return plane;
}
function createSphere(vector3) {
    var sphere = Sphere(Color(1,1,1),vector3);
    addObject(sphere);
    return sphere;
}

var geometryCache = new Array();

function geometryCachePush(vector3) {

    geometryCache.push(vector3);
}
function createMeshWithoutMaterial() {


    var geometry = new THREE.Geometry();
    var material = null;

    for (var i in geometryCache)
    {
        console.info(geometryCache[i]);


        geometry.vertices.push(new THREE.Vector3(geometryCache[i].x,geometryCache[i].y,geometryCache[i].z));
    }
    var normal = new THREE.Vector3( 0, 0, 1 ); //三角面法向量,x,y,z定义z轴为法向量


    for (var i = 0;i<geometryCache.length - 2;i++)
    {


        geometry.faces.push( new THREE.Face3( 0, 1+i, 2+i, normal) ); //三角面添加到几何体
    }

    var msh = new THREE.Mesh(geometry,material );
    addObject(msh);
    geometryCache.length = 0;
    return msh;
}