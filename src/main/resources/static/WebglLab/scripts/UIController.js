

function setLabelID(ID) {
    var idLabel = document.getElementById("idLabel");
    idLabel.innerText = ID;
}


function onKey() {
    window.onkeydown = function (ev) {


        //按下了D键
        if (ev.keyCode == 68){

           // console.info("hello");

            getBodyItemList(getSnackFromArray(getSnackID()));
        }

    }

}