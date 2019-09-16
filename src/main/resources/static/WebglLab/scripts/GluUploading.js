


function uploadPredictionPos() {



   var localSnack =  getSnackFromArray(getSnackID());

   if (localSnack!= null){

       var destination =getPosition(localSnack.head);
      // console.info("更新消息！");
       send(100,202,destination);

   }


}