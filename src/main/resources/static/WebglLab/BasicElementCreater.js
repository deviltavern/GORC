
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

