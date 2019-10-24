var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;
var Z_START_POS = 0;
var PARTICLE_NUM = 10000;
var PARTICLE_SIZE = DOT_SIZE;
var PARTICLE_RANGE = 110;
var PARTICLE_RANGE_HALF = PARTICLE_RANGE / 2;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BG", "BG", "BG",
    "BK", "BK", "BK", "BK", "BK", "BK", "RD", "RD", "RD", "RD", "RD", "BK", "BK", "BG", "BG", "BG",
    "BK", "BK", "BK", "BK", "BK", "RD", "RD", "RD", "RD", "RD", "RD", "RD", "RD", "RD", "BG", "BG",
    "BK", "BK", "BK", "BK", "BK", "BR", "BR", "BR", "BG", "BG", "BR", "BG", "BK", "RD", "RD", "RD",
    "BK", "BK", "BK", "BK", "BR", "BG", "BR", "BG", "BG", "BG", "BR", "BG", "BG", "RD", "RD", "RD",
    "BK", "BK", "BK", "BK", "BR", "BG", "BR", "BR", "BG", "BG", "BG", "BR", "BG", "BG", "BG", "RD",
    "BK", "BK", "BK", "BK", "BR", "BR", "BG", "BG", "BG", "BG", "BR", "BR", "BR", "BR", "RD", "BK",
    "BK", "BK", "BK", "BK", "BK", "BK", "BG", "BG", "BG", "BG", "BG", "BG", "BG", "RD", "BK", "BK",
    "BK", "BK", "RD", "RD", "RD", "RD", "RD", "BL", "RD", "RD", "RD", "BL", "RD", "BK", "BK", "BK",
    "BK", "RD", "RD", "RD", "RD", "RD", "RD", "RD", "BL", "RD", "RD", "RD", "BL", "BK", "BK", "BR",
    "BG", "BG", "RD", "RD", "RD", "RD", "RD", "RD", "BL", "BL", "BL", "BL", "BL", "BK", "BK", "BR",
    "BG", "BG", "BG", "BK", "BL", "BL", "RD", "BL", "BL", "YL", "BL", "BL", "YL", "BL", "BR", "BR",
    "BK", "BG", "BK", "BR", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BR", "BR",
    "BK", "BK", "BR", "BR", "BR", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BR", "BR",
    "BK", "BR", "BR", "BR", "BL", "BL", "BL", "BL", "BL", "BL", "BL", "BK", "BK", "BK", "BK", "BK",
    "BK", "BR", "BK", "BK", "BL", "BL", "BL", "BL", "BK", "BK", "BK", "BK", "BK", "BK", "BK", "BK"
];

function getRgbColor(colorType) {
    var colorHash = {
        "BK": "#000000", // black
        "WH": "#FFFFFF", // white
        "BG": "#FFCCCC", // beige
        "BR": "#800000", // brown
        "RD": "#FF0000", // red
        "YL": "#FFFF00", // yellow
        "GN": "#00FF00", // green
        "WT": "#00FFFF", // water
        "BL": "#0000FF", // blue
        "PR": "#800080" // purple
    };
    return colorHash[colorType];
}

function getSingleColorDepth(colorType, rgbType) {
    var result = 0;
    var rgb = getRgbColor(colorType);
    rgb = rgb.replace("#", "");
    var r = parseInt("0x" + rgb.substr(0, 2), 16);
    var g = parseInt("0x" + rgb.substr(2, 2), 16);
    var b = parseInt("0x" + rgb.substr(4, 2), 16);
    switch (rgbType) {
        case 'r':
            result = r / 255;
            break;
        case 'g':
            result = g / 255;
            break;
        case 'b':
            result = b / 255;
            break;
    }
    return result;
}

var renderer, scene, camera, mesh;
var uniforms, attributes;
var A = 5;
var B = 6;
var C = 7;
var R = 100;
var segments = 200;

init();
animate();

function init() {

    container = document.getElementById('d123');

    //
    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 2750;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    //
    scene.add(new THREE.AmbientLight(0x444444));

    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    //
    var triangles = 160000;
    var geometry = new THREE.BufferGeometry();

    var indices = new Uint32Array(triangles * 3);
    for (var i = 0; i < indices.length; i++) {

        indices[i] = i;
    }

    var positions = new Float32Array(triangles * 3 * 3);
    var normals = new Float32Array(triangles * 3 * 3);
    var colors = new Float32Array(triangles * 3 * 3);

    var color = new THREE.Color();

    var n = 800,
        n2 = n / 2; // triangles spread in the cube
    var d = 12,
        d2 = d / 2; // individual triangle size

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    for (var i = 0; i < positions.length; i += 9) {

        // positions

        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;

        var vertex = new THREE.Vector3(x, y, z);

        if (vertex.length() < 400) {

            var ax = x + Math.random() * d - d2;
            var ay = y + Math.random() * d - d2;
            var az = z + Math.random() * d - d2;

            var bx = x + Math.random() * d - d2;
            var by = y + Math.random() * d - d2;
            var bz = z + Math.random() * d - d2;

            var cx = x + Math.random() * d - d2;
            var cy = y + Math.random() * d - d2;
            var cz = z + Math.random() * d - d2;

            positions[i] = ax;
            positions[i + 1] = ay;
            positions[i + 2] = az;

            positions[i + 3] = bx;
            positions[i + 4] = by;
            positions[i + 5] = bz;

            positions[i + 6] = cx;
            positions[i + 7] = cy;
            positions[i + 8] = cz;

            // flat face normals

            pA.set(ax, ay, az);
            pB.set(bx, by, bz);
            pC.set(cx, cy, cz);

            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);

            cb.normalize();

            var nx = cb.x;
            var ny = cb.y;
            var nz = cb.z;

            normals[i] = nx;
            normals[i + 1] = ny;
            normals[i + 2] = nz;

            normals[i + 3] = nx;
            normals[i + 4] = ny;
            normals[i + 5] = nz;

            normals[i + 6] = nx;
            normals[i + 7] = ny;
            normals[i + 8] = nz;

            // colors

            var vx = (x / n) + 0.5;
            var vy = (y / n) + 0.5;
            var vz = (z / n) + 0.5;

            color.setRGB(vx, vy, vz);



            colors[i + 0] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;

            colors[i + 3] = color.r;
            colors[i + 4] = color.g;
            colors[i + 5] = color.b;

            colors[i + 6] = color.r;
            colors[i + 7] = color.g;
            colors[i + 8] = color.b;

            var x0 = (Math.floor(x / 25) + 8);
            var y0 = (Math.floor(y / 25) + 8);
            var z0 = (Math.floor(z / 25) + 8);
            //console.log( x + ", " + y + ", " + z );
            if (x0 >= (0 + X_START_POS) && y0 >= (0 + Y_START_POS) && x0 < (16 + X_START_POS) && y0 < (16 + Y_START_POS)) {
                var pos = ((15 - x0) - X_START_POS) + ((15 - y0) - Y_START_POS) * 16;
                if (dataSet[pos] != "BK") {
                    var c = dataSet[pos];
                    colors[i + 0] = getSingleColorDepth(c, "r");
                    colors[i + 1] = getSingleColorDepth(c, "g");
                    colors[i + 2] = getSingleColorDepth(c, "b");

                    colors[i + 3] = getSingleColorDepth(c, "r");
                    colors[i + 4] = getSingleColorDepth(c, "g");
                    colors[i + 5] = getSingleColorDepth(c, "b");

                    colors[i + 6] = getSingleColorDepth(c, "r");
                    colors[i + 7] = getSingleColorDepth(c, "g");
                    colors[i + 8] = getSingleColorDepth(c, "b");
                }
            }
        }
    }

    geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();

    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        ambient: 0xaaaaaa,
        specular: 0xffffff,
        shininess: 250,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);

}

function animate() {
    render();

    requestAnimationFrame(animate);
}

function render() {
    var time = Date.now() * 0.001;

    //mesh.rotation.x = time * 0.25;
    mesh.rotation.y = time * 0.5;

    renderer.render(scene, camera);
}