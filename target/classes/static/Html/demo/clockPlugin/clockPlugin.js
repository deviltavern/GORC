function clock0(beginDate) {


    var imgDiv = div();
    setCSS(imgDiv,"clockDiv");


    var ca =  canvas(200,200,30,30);

    ca.parent = imgDiv;
    ca.canvas.style.borderRadius = "50%";
    var context = ca.context;

    ca.startTime = beginDate;

    var s = getDateDiff(beginDate,new Date());
    setParent(ca.canvas,imgDiv);

    var timeLabel = createLabel(getDateFromSeconds(s));

    setParent(timeLabel,imgDiv);


    setCSS(timeLabel,"clockShowLabel");
    var timeRatio = s/getDaySecond(3);
    console.info(timeRatio);
    context.lineWidth = 10;
    setCSS(ca.canvas,"circleBar");
    //context.moveTo(ca.origin.x,ca.origin.y);

    context.fillStyle="#FF0000";
    var offValue = 0;

    var o2 = 0;

    ca.update = function(inputOffValue){
        offValue = inputOffValue;

        context.beginPath();
        context.fillStyle="#FF0000";
        context.arc(ca.origin.x, ca.origin.y, 100, Math.PI/2+o2, Math.PI/2 - offValue, true);

        //console.info(offValue);
        context.stroke();                // 进行绘制

    }

    var temp = 0;
    ca.doAnimation = function(){

        var s = getDateDiff(ca.startTime,new Date());

        var timeRatio = s/getDaySecond(3);
        setText(timeLabel,getDateFromSeconds(getDaySecond(3) - s));
        ca.update((1-timeRatio)*2*Math.PI);

    }
    addAnimation(ca);

    return ca;

}