

function context(div) {

    create(div)
    setViewport(20);
    var co = Color(123,123,123);
    var size = Vector3(1,1,1);
    var player =  Cube(co,size);
    var x = 0;
    var po2 = Vector3(10,10,10);
    document.onkeydown=function(event){

        console.info("presskey");
        switch (event.key) {
            //left
            case 37:
                po2 = Vector3(po2.x+10,0,0);
                break;
            //up
            case 38:
                po2.y =  po2.y+10;
                break;
            //right
            case 39:
                po2.x =  po2.x+10;
                break;
            //down
            case 40:
                po2.y = po2.y-10;
                break;

            default:

                break;
        }

        console.info("op for press key"+JSON.stringify(po2));
    };

    op = function () {
        addObject(player);
        console.info("123");
        player.position.x = po2.x;
        player.position.y = po2.y;
        player.position.z = po2.z;

        console.info(position);
        x++;

    }
    frame();


}