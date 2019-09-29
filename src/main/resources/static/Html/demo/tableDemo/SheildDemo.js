
function test() {

    console.info("123");
}
var taskData = new Array();
var cparent;
function bacgroundInit() {


    document.body.style.backgroundImage = "url('../../../image/bsd.jpg')"
    document.body.style.backgroundSize = "cover";

    var skillTrinArray = new Array();
    skillTrinArray.push("太极拳");
    skillTrinArray.push("王八拳");
    var combox = createCombox(skillTrinArray);


    op = function () {

        var hoverValue = localStorage.getItem("hover_value");

        if(hoverValue!= ""){

            var hoverObject = JSON.parse(hoverValue);
            switch (hoverObject.code) {

                case "front_train_label":
                    console.info("前端训练营！");
                    combox.move(hoverObject.pos.x,hoverObject.pos.y+16);
                    combox.show()
                    break;

            }
        }

    }

    frame();
}

var taskElementArray = new Array();


function create2(parent,itemID) {
    console.info("创建新的东西！");
    var content =  document.createElement("div");


    var c2 = parent.appendChild(content);
    taskElementArray.push(c2);
    c2.style.width="850px";
    c2.style.margin="0 auto";
    c2.style.marginTop="5px";
    c2.style.height="120px";
    c2.style.overflow="hidden";

    c2.style.backgroundColor="rgba(254,255,255,0.6)";
    c2.style.borderRadius="5px";
    c2.id = itemID;
    var img1 =c2.appendChild( document.createElement("img"));
    img1.src="../../../image/l1.jpeg";
    img1.style.width="100px";
    img1.style.height="100px";
    // img1.style.border="white solid 1px";
    img1.style.marginTop="10px";
    img1.style.marginLeft="30px";
    img1.style.cssFloat="left";

    var desc =content.appendChild( document.createElement("div"));
    desc.style.width="700px";
    desc.style.height="100px";
    // desc.style.border="white solid 1px";
    desc.style.marginTop="10px";
    desc.style.cssFloat="left";
    var desc_title =desc.appendChild( document.createElement("h5"));
    desc_title.innerHTML="炼气第一阶段的任务等待能力者来接！";
    desc_title.style.margin="0px";
    desc_title.style.marginLeft="30px";
    desc_title.style.fontSize="20px";

    var desc_p =desc.appendChild( document.createElement("p"));
    desc_p.innerHTML="基于对什么什么的要求，接受任务的能力者需要具备什么什么技能点，才阔以完成相应的要求。摘取桂冠，加油！基于对什么什么的要求,接受任务的能力者需要具备什么什么技能点，才阔以完成相应的要求。摘取桂冠加油摘取桂冠，加油！摘取桂冠加油摘取桂冠，.............";
    desc_p.style.margin="0px";
    desc_p.style.marginTop="5px";
    desc_p.style.fontSize="16px";
    desc_p.style.textIndent="2em";

    var desc_a =desc_p.appendChild( document.createElement("a"));
    desc_a.innerHTML="[详情]";
    desc_a.style.color="orange";
    desc_a.href="BlackShield.html";
    var box = {};
    box.content = c2;
    box.id = itemID;



    return c2;

}


function getDataFromServer(type){
    requestServer("/getTaskDataByType",function (ip) {

        var reJosn = {};
        reJosn.type = type;
        $.post(ip,reJosn,function (data) {
            taskData.length = 0;
            console.info(data);

            for(var i in data)
            {
                console.info(data[i]);
                taskData.push(data[i]);
                if (data[i].task_head == null)
                {

                    console.info("文本为空");
                    createLabel(bg_box,i,"这个人很懒",data[i].task_describe,"../../../image/"+data[i].task_difficute_level+".png")
                }else
                {

                    createLabel(bg_box,i,data[i].task_head,data[i].task_describe,"../../../image/"+data[i].task_difficute_level+".png")
                }

            }
        });
    });

}


function removeAll() {

    for (var i in taskElementArray){

        cparent.removeChild(taskElementArray[i]);
    }
    taskElementArray.length = 0;
}


function createLabel(parent,itemID,hdeadInfo,contentInfo,sp) {

    console.info("创建新的东西！");
    var content =  document.createElement("div");

    var c2 = parent.appendChild(content);
    cparent = parent;
    taskElementArray.push(c2);
    c2.style.width="850px";
    c2.style.margin="0 auto";
    c2.style.marginTop="5px";
    c2.style.height="120px";
    c2.style.overflow="hidden";

    c2.style.backgroundColor="rgba(254,255,255,0.6)";
    c2.style.borderRadius="5px";
    c2.id = itemID;

    var img1 =c2.appendChild( document.createElement("img"));
    img1.src=sp;
    img1.style.width="100px";
    img1.style.height="100px";
    // img1.style.border="white solid 1px";
    img1.style.marginTop="10px";
    img1.style.marginLeft="30px";
    img1.style.cssFloat="left";
    img1.style.borderRadius = "50px";




    var desc =content.appendChild( document.createElement("div"));
    desc.style.width="700px";
    desc.style.height="100px";
    // desc.style.border="white solid 1px";
    desc.style.marginTop="10px";
    desc.style.cssFloat="left";
    var desc_title =desc.appendChild( document.createElement("h5"));
    desc_title.innerHTML=hdeadInfo;
    desc_title.style.margin="0px";
    desc_title.style.marginLeft="30px";
    desc_title.style.fontSize="20px";

    var desc_p =desc.appendChild( document.createElement("p"));
    desc_p.innerHTML=contentInfo;
    desc_p.style.margin="0px";
    desc_p.style.marginTop="5px";
    desc_p.style.fontSize="16px";
    desc_p.style.textIndent="2em";

    var desc_a =desc_p.appendChild( document.createElement("button"));
    desc_a.innerHTML="[详情]";
    desc_a.style.color="orange";


    desc_a.onclick = function (ev) {

        localStorage.setItem("detail",JSON.stringify(taskData[c2.id]));
        console.info(localStorage.getItem("detail"));

        window.open('detail.html');
    }
    var box = {};
    box.content = c2;
    box.id = itemID;



    return c2;


}

function createLabelButton(spSrc,posy,content) {
    var e1 = document.createElement("button");
    var le = document.body.appendChild(e1);

    le.style.width = 200+"px";
    le.style.height = 50+"px";
    le.style.background = "#d5c59f";
    le.style.position = "absolute";
    le.style.top = 300+posy*55+"px";
    le.style.borderRadius = "10px";
    le.style.left = 0+"px";
    var text = document.createElement("h5");

    var tx =  le.appendChild(text);
    tx.style.fontFamily = "mySweet";

    tx.style.fontSize = "30px";
    tx.style.marginTop = "10px";
    tx.style.marginLeft = "20px";

    text.innerText = content;

    return le;
}

