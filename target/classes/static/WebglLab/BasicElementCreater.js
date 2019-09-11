
function Cube(color,size) {
    var geometry = new THREE.CubeGeometry(size.x,size.y,size.z);

    var material = new THREE.MeshBasicMaterial({color: color.ox});

    var cube = new THREE.Mesh(geometry, material);

    return cube;
}

