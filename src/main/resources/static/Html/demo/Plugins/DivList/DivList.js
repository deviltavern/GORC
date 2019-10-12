

var subFuncDivItemBeclickIndex = -1;
function insFuncBtn(parent,index,content) {

    if (parent.btnArray == null){

        parent.btnArray = [];
    }
    var subFuncDivItem = div();
    setCSS(subFuncDivItem,"subFuncDivItem");
    setParent(subFuncDivItem,parent);
    setPositionWithPercent(subFuncDivItem,Vector3(0,9.3*index));
    parent.btnArray.push(subFuncDivItem);
    subFuncDivItem.recoverColor = function(){

        setColor(subFuncDivItem,Color24(230 ,230, 250));
    }
    subFuncDivItem.itemIndex = index;
    var subFuncDivItemLabelDiv = div();

    setParent(subFuncDivItemLabelDiv,subFuncDivItem);
    setCSS(subFuncDivItemLabelDiv,"subFuncDivItemLabelDiv");
    setText(subFuncDivItemLabelDiv,content);
    var subFuncDivLine = div();
    setParent(subFuncDivLine,subFuncDivItem);
    setCSS(subFuncDivLine,"subFuncDivLine");
    subFuncDivItem.onmouseenter = function (ev1) {
        if(subFuncDivItemBeclickIndex !== subFuncDivItem.itemIndex) {

            setColor(subFuncDivItem, Color24(255, 240, 245));
        }
        console.info("change color");

    };

    subFuncDivItem.onmouseleave = function (ev1) {
        //rgb(230 ,230, 250)

        if(subFuncDivItemBeclickIndex !== subFuncDivItem.itemIndex){

            setColor(subFuncDivItem,Color24(230 ,230, 250));
        }


    };

    ;
    subFuncDivItem.onmousedown = function (ev1) {
        //rgb(230 ,230, 250)
        if(subFuncDivItem.onEvent != null){

            subFuncDivItem.onEvent();
        }


        for(var i in parent.btnArray){
            parent.btnArray[i].recoverColor();

        }
        setColor(subFuncDivItem,Color24(238,99, 99));
        subFuncDivItemBeclickIndex = subFuncDivItem.itemIndex;

    };

    return subFuncDivItem;

}