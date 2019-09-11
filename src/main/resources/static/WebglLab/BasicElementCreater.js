
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