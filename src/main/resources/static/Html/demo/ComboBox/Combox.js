function createCombox(valueList) {
    var Combox = {};
    Combox.selectArray = new Array();
    var dParent = document.createElement("div");
    var dPl = document.body.appendChild(dParent);
    dPl.style.width = 110+"px";
    dPl.style.height = 200+"px";
    dPl.style.background = "#eccf92";
    dPl.style.borderRadius = 10+"px";
    dPl.style.position = "absolute";

    Combox.getLabel = function(name_for_select){

        for(var i in Combox.selectArray){

            if(Combox.selectArray[i].id == name_for_select)
            {

                return Combox.selectArray[i];
            }
        }
    }
    Combox.parent = dPl;
    Combox.allowDead = true;
    Combox.time = 0;
    Combox.deadFromEye = function(){

        var op;
        var start = null;

        var fps = 60
        var fpsInterval = 1000 / fps
        var last = new Date().getTime() //上次执行的时刻
        function frame() {


            var now = new Date().getTime()
            var elapsed = now - last;
            // 经过了足够的时间
            if (elapsed > fpsInterval) {
                last = now - (elapsed % fpsInterval); //校正当前时间

                if(Combox.allowDead == true){
                    Combox.time += elapsed;
                    if(Combox.time>200)
                    {
                        Combox.hide();
                        Combox.time = 0;

                    }

                }


            }
            requestAnimationFrame(frame);

        }

        frame();
    }

    Combox.parent.onmouseenter = function (ev) {

        Combox.allowDead = false;
        Combox.time = 0;

    }
    Combox.parent.onmouseleave = function (ev) {
        Combox.allowDead = true;


    }
    Combox.hide = function(){

        Combox.parent.style.display = "none";
    }

    Combox.show  = function(){
        Combox.time = 0;
        Combox.parent.style.display = "";
    }
    Combox.ins = function () {

        for(var i in valueList){

            Combox.addSelection((i),valueList[i]);
            console.info("添加子标签 = 》"+(i));

        }
    }


    Combox.pos = {
        x :0,
        y:0
    };

    Combox.move = function (x,y) {
        Combox.pos.x = x;
        Combox.pos.y = y;

        dPl.style.left = Combox.pos.x+"px";
        dPl.style.top = Combox.pos.y +"px";
    }
    Combox.addSelection = function (i,labelName) {
        var tempD = document.createElement("div");
        var tpx = dPl.appendChild(tempD);
        tpx.style.position = "relative";
        tpx.style.left = "3px";
        tpx.style.top = 5*i+"px";
        tpx.style.width = 104+"px";
        tpx.style.height = "20px";
        tpx.style.background = "rgba(0,0,0,0)";
        tpx.style.borderRadius = "5px";

        var inputItem = document.createElement("input");
        var inputl = tpx.appendChild(inputItem);
        inputl.style.position = "relative";

        inputl.style.width = "100%";
        inputl.style.height = "100%";
        inputl.style.background = "rgba(0,0,0,0)";
        inputl.style.fontSize = "7px";
        inputl.value = labelName;
        inputl.style.borderRadius = "10px";
        inputl.type = "button";
        inputl.id = labelName;

        Combox.selectArray.push(inputl);


    }

    Combox.ins();
    Combox.hide();
    Combox.deadFromEye();
    return Combox;

}