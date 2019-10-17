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