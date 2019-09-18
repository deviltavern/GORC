
var foodList = new Array();
function insRandomCube(vec) {
    if(foodList.length<10){

        var tempCube = createCube();
        setPosition(tempCube,screenConvertToWorld(vec));
        foodList.push(tempCube);

        tempCube.tag = "food";



    }else {

        removeFoodFromList(foodList[0]);
    }




}

function removeFoodFromList(food) {

    opView.scene.remove(food);
    var index = foodList.indexOf(food);
    if (index > -1) {
        foodList.splice(index, 1);
    }


}