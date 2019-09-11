
var x = 10;
function context(div) {

    create(div)
    setViewport(20);
    var light = new THREE.AmbientLight( 0xff0000 );

    var player =  Cube(Color(123,123,123),Vector3(0,0,0));


    var po2 = Vector3(0,0,0);
    document.onkeydown=function(event){

        console.info("presskey");
        switch (event.keyCode) {
            //left
            case 37:

                po2.x =po2.x-1;
                break;
            //up
            case 38:
                po2.y =  po2.y+1;
                break;
            //right
            case 39:
                po2.x =  po2.x+1;
                break;
            //down
            case 40:
                po2.y = po2.y-1;
                break;

            default:

                break;
        }

    console.info(JSON.stringify(po2));

    };
    addObject(player);
    addObject(light);
    op = function () {

        player.setPosition(po2);

    }

    frame();


}