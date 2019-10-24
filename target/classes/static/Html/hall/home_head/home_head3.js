
function head(parent) {



    var mainDiv = div();
    setParent(mainDiv,parent);
    setCSS(mainDiv,"mainDiv");
    function insSubLabel(parent,x_offset,content) {
        var subDiv = div();
        setParent(subDiv,parent);
        setCSS(subDiv,"subDiv");
        var subDivLabelDiv = div();
        setParent(subDivLabelDiv,subDiv);
        setCSS(subDivLabelDiv,"subDivLabelDiv");
        setText(subDivLabelDiv,content);
        subDiv.onmouseenter = function () {
            setColor(subDiv,"whitesmoke");


        };
        subDiv.onmouseleave = function () {

            setColor(subDiv,"white");

        };
        setPositionWithPercent(subDiv,Vector3(x_offset*4,0));

        return subDiv;
    }
    function insSubImg(parent,x_offset,content,divCSS,imgCSS) {
        var subDiv = div();

        setParent(subDiv,parent);
        setCSS(subDiv,"subDiv");
        var subDivImgDiv = div();
        setParent(subDivImgDiv,subDiv);
        setCSS(subDivImgDiv,divCSS);
        var img1 = img();
        setParent(img1,subDivImgDiv);
        setCSS(img1,imgCSS)

        img1.src = content;
        console.info(img1.src);
        subDiv.onmouseenter = function () {
            setColor(subDiv,"whitesmoke");
        }
        subDiv.onmouseleave = function () {

            setColor(subDiv,"white");

        }
        setPositionWithPercent(subDiv,Vector3(x_offset*4,0));
        return subDiv;
    }
    var homePage = insSubLabel(mainDiv,9,"首页");
    homePage.onmousedown = function(){

        console.info("进入首页");


    };
    insSubLabel(mainDiv,10,"任务发布");
    insSubLabel(mainDiv,11,"日志");
    insSubLabel(mainDiv,12,"积分");
    insSubLabel(mainDiv,13,"权限");
    insSubLabel(mainDiv,14,"邮箱");
    insSubImg(mainDiv,8,'../../../image/ICON.png',"subDivImgDiv","img1");
    insSubImg(mainDiv,15,'../../../image/Ls.png',"subDivImgDivForMe","img2");

    return mainDiv;
}

