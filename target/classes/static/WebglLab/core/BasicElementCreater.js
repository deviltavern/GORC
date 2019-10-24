
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

function createBufferGeometry() {

    var array = [];

    for(var i in geometryCache){

        array.push(geometryCache[i].x);
        array.push(geometryCache[i].y);
        array.push(geometryCache[i].z);
    }
    var vertices = new Float32Array(array);
    var verticesPosition = new THREE.BufferAttribute( vertices, 3 );
    var geometry = new THREE.BufferGeometry();//缓冲几何对象
    geometry.addAttribute('position',verticesPosition);
    var material=new THREE.MeshBasicMaterial();
    var points=new THREE.Points(geometry,material);//模型对象

    addObject(points);

    return points;
}

var bufferGeometryVerticsCache = [];
var bufferGeometryColorCache = [];

//缓存食堂
function bufferCanteen(vector3,color) {

    bufferGeometryVerticsCache.push(vector3.x);
    bufferGeometryVerticsCache.push(vector3.y);
    bufferGeometryVerticsCache.push(vector3.z);

    bufferGeometryColorCache.push(color.r);
    bufferGeometryColorCache.push(color.g);
    bufferGeometryColorCache.push(color.b);
    bufferGeometryColorCache.push(1);
}

var bufferVerticIndex = 0;
function bufferCanteen(vector3,color,len) {


    bufferVerticIndex++;
    if(bufferVerticIndex>len){

        bufferVerticIndex = 0;
    }

    bufferGeometryVerticsCache[bufferVerticIndex*3+0] = (vector3.x);
    bufferGeometryVerticsCache[bufferVerticIndex*3+1] = (vector3.y);
    bufferGeometryVerticsCache[bufferVerticIndex*3+2] = (vector3.z);

    bufferGeometryColorCache.push(color.r);
    bufferGeometryColorCache.push(color.g);
    bufferGeometryColorCache.push(color.b);
    bufferGeometryColorCache.push(1);
}
function flushBufferVertices() {

    var buffer =[];
    for (var i in bufferGeometryVerticsCache){

        buffer.push(bufferGeometryVerticsCache[i]);
    }

    bufferGeometryVerticsCache.length = 0;
    return buffer;


}
function createBufferGeoMeshFromCanteen() {
    var buffer = new THREE.BufferGeometry();
    var positionAttribute = new THREE.Float32BufferAttribute(bufferGeometryVerticsCache, 3 );
    var colorAttribute = new THREE.Float32BufferAttribute(bufferGeometryColorCache,3);
    colorAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader
    buffer.addAttribute( 'position', positionAttribute );
    buffer.addAttribute( 'color', colorAttribute );
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(buffer,material);
    //添加到场景中
    addObject(mesh);
    return mesh;
}

function createSprite(sprite) {


    var spMaster = {};


    var  materials =  new THREE.PointsMaterial( { size: 1, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
    var geometry = new THREE.BufferGeometry();
    var particles = new THREE.Points( geometry, materials );
    //添加到场景里面
    addObject(particles);
    spMaster.material =materials;
    spMaster.geometry =geometry;
    spMaster.partical = particles;
    spMaster.verticalBuffer = [];
    spMaster.index = 0;
    spMaster.timeArray = [];


    spMaster.updateVectircesPos = function(value,i){

        spMaster[i] += value;

       // spMaster.timeArray[i] += 1;

    }
    spMaster.updateParticalWithRandom = function(value){


        if (spMaster.verticalBuffer.length<3)
        {
            return;
        }
        for(var i =0;i< (((spMaster.verticalBuffer.length+1)/3)-1);i++){

            spMaster.verticalBuffer[3*i] += (Math.random() - 0.5)*value;
            spMaster.verticalBuffer[3*i+1] += (Math.random() - 0.5)*value;
            spMaster.verticalBuffer[3*i+2] += (Math.random() - 0.5)*value;
        }

    }

    spMaster.updateParticalWithFunc= function(func){


        if (spMaster.verticalBuffer.length<3)
        {
            return;
        }
        for(var i =0;i< (((spMaster.verticalBuffer.length+1)/3)-1);i++){

            spMaster.verticalBuffer[3*i] +=   func(spMaster.timeArray[i]);
            spMaster.verticalBuffer[3*i+1] +=  func(spMaster.timeArray[i]);
            spMaster.verticalBuffer[3*i+2] +=  func(spMaster.timeArray[i]);
        }

    }

    spMaster.updateVertices = function () {

        var positionAttribute = new THREE.Float32BufferAttribute(spMaster.verticalBuffer, 3 );
        geometry.addAttribute( 'position', positionAttribute );
    }
    spMaster.updateVerticesBuf = function(vector3,len){

        spMaster.verticalBuffer[spMaster.index*3+0]=(vector3.x);
        spMaster.verticalBuffer[spMaster.index*3+1]=(vector3.y);
        spMaster.verticalBuffer[spMaster.index*3+2]=(vector3.z);
        spMaster.timeArray[spMaster.index] = 0;
        spMaster.index++;
        if(spMaster.index>len)
        {
            spMaster.index = 0;
        }

        spMaster.updateVertices();


    }


    spMaster.temp = 0;
    spMaster.lf = function (value) {
        //console.info(value);
         if (value<spMaster.timeArray.length)
         {

             spMaster.temp = value*0.01;

             return value*0.01;


         }else {

             return spMaster.temp-value*0.01;
         }

    }
    return spMaster;

}
function updateBufferGeoMeshFromCanteen(mesh) {
    var positionAttribute = new THREE.Float32BufferAttribute(bufferGeometryVerticsCache, 3 );
    var colorAttribute = new THREE.Float32BufferAttribute(bufferGeometryColorCache,3);
    mesh.geometry.addAttribute( 'position', positionAttribute );
    mesh.geometry.addAttribute( 'color', colorAttribute );
}





function clearBufferGeoCache(type) {
    switch (type) {
        case 0:
            bufferGeometryVerticsCache.length = 0;
            break;

        case 1:
            bufferGeometryColorCache.length = 0;
            break;

        case 2:
            bufferGeometryVerticsCache.length = 0;
            bufferGeometryColorCache.length = 0;
            break;
    }

}


