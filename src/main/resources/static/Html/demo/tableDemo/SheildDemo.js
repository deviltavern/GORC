
function test() {

    console.info("123");
}

function create2(parent,itemID) {
    console.info("创建新的东西！");
    var content =  document.createElement("div");

    var c2 = parent.appendChild(content);
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

    return box;

}

