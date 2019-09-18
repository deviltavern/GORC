
var vector3List =  new Array();
var lineList = new Array();
function addPoint(point) {


    vector3List.push(point);

    return vector3List;
}
var preLine;
function DrawLine(pointList,Color) {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: true } );
    var line = null;
    var color = new THREE.Color(Color.ox );
    //geometry.colors.push(color,color);
    var index =0;
    lineList.length = 0;
    for(var i =0;i<pointList.length -1;i++){

            geometry = new THREE.Geometry();
            var point = new THREE.Vector3( pointList[i].x, pointList[i].y,  pointList[i].z );
            geometry.vertices.push(point);
            geometry.colors.push(color);
            point = new THREE.Vector3(pointList[i+1].x, pointList[i+1].y,  pointList[i+1].z);
            geometry.vertices.push(point);
            geometry.colors.push(color);
            line = new THREE.LineSegments( geometry, material);
            preLine = line;
            lineList.push(line);
      }
    return lineList;
}


function demo(div) {
    var View = create(div);
    var th = 0;
    var r = 0;

    View.camera.position.z = 100;

    var index = 0;
    var up = false;

    for(var i =0;i<250;i++){

        th += 1;
        r += 0.1;
        var x = r*Math.cos(th);
        var y = r*Math.sin(th);
        addPoint(Vector3(x,y,0));
        DrawLine(vector3List,Color(120,120,120));
    }

    op = function(){



        View.renderer.render(opView.scene,opView.camera);

       if (up == false){
           index++;
           View.scene.add(lineList[index]);

           if(index>=240){

               up = true;
           }

       }else {

           View.scene.remove(lineList[index]);
           index--;
            if(index<=0){

                up = false;
            }
       }



    }
    frame();

    console.info("render over");
}