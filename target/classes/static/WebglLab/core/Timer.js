
var lastTime = null;
var frameTime = null;
var frameNum  = 0;
var frameRate = 100;
var count = 0;
function FrameTimer(){

    var currTime = new Date().getTime();
    var delta =(currTime - lastTime);
    frameTime = delta/1000;
    lastTime = currTime;
    count+= delta;
    frameNum++;
    if(count>1000){

        count  = 0;
        frameRate = frameNum;
        console.info("帧率 = "+frameNum);

        frameNum  = 0;
    }



}

function getFrameTime () {
    if (frameTime>1)
    {

        frameTime = 1/1000;
    }
    return frameTime;

}
function getFrameRate() {
    return frameRate;
}
