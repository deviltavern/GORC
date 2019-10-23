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