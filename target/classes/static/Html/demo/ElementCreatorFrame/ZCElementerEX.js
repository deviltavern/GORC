function drawLine(parent,height,vector3,width,color) {
    var lineDiv = div();
    setParent(lineDiv,parent);
    lineDiv.style.position = "absolute";
    lineDiv.style.width = width;
    lineDiv.style.height = height;
    lineDiv.style.zIndex = 34;
    lineDiv.style.background = color;
    setPositionWithPercent(lineDiv,vector3);
    return lineDiv;
}

function textInputWithPlaceHolder(parent,placeValue,fontSize,position,scale){
    var input1 = textInput();
    setParent(input1,parent);
    input1.style.width = scale.width;
    input1.style.height = scale.height;
    input1.style.fontSize = fontSize;

    setPositionWithPercent(input1,position);
    input1.placeholder = placeValue;


    return input1;
}
function tipLabel(parent,content,fontsize,position) {
    var labelDiv = div();
    setParent(labelDiv,parent);
    setText(labelDiv,content);
    labelDiv.style.fontSize = fontsize;
    setPositionWithPercent(labelDiv,position);
}

function menuButton(parent,text,index) {


    var menuDiv_ButtonDiv = div();
    setParent(menuDiv_ButtonDiv,parent);
    setCSS(menuDiv_ButtonDiv,"menuDiv_ButtonDiv");
    var menuDiv_ButtonDiv_LabelDiv = div();

    setParent(menuDiv_ButtonDiv_LabelDiv,menuDiv_ButtonDiv);
    setCSS(menuDiv_ButtonDiv_LabelDiv,"menuDiv_ButtonDiv_LabelDiv");
    menuDiv_ButtonDiv_LabelDiv.innerText = text;
    setPositionWithPercent(menuDiv_ButtonDiv,Vector3(0,7*index));

    menuDiv_ButtonDiv.onmouseenter = function (ev1) {

        setColor(menuDiv_ButtonDiv,Color24(106,90,205));
        setFontColor(menuDiv_ButtonDiv_LabelDiv,Color24(255,255,255));

    };
    menuDiv_ButtonDiv.onmouseleave = function (ev1) {

        setColor(menuDiv_ButtonDiv,"white");
        setFontColor(menuDiv_ButtonDiv_LabelDiv,Color24(0,0,0));
    };

    return menuDiv_ButtonDiv;
}