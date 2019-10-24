


function uploadPredictionPos() {



   var localSnack =  getSnackFromArray(getSnackID());

   if (localSnack!= null){

       var destination =Multiply(uiControlDir,0.1);
       destination.bodyMsg = getBodyItemList(getSnackFromArray(getSnackID()));
       //console.info(uiControlDir);
       send(100,202,destination);

   }


}


function getBodyItemDirLabel(vector3) {

    vector3 = Normal(vector3);

    //console.info(vector3);
    if (vector3.x == -1&&vector3.y == 0)
    {
        return 1;
    }

    if (vector3.x == 1&&vector3.y == 0)
    {

        return 2;
    }
    if (vector3.x == 0&&vector3.y == 1)
    {

        return 3;
    }
    if (vector3.x == 0&&vector3.y == -1)
    {

        return 4;
    }


    
}

function getBodyItemList(snackHead) {

    var indexArray = new Array();
    var reJson = {};
    for (var gl in snackHead.bodyArray)
    {
        //console.info(snackHead.bodyArray[gl].moveDir);
        indexArray.push(getBodyItemDirLabel(snackHead.bodyArray[gl].moveDir));
    }
    reJson.mg = indexArray;
    reJson.headID = snackHead.headID;
    return reJson;

}

