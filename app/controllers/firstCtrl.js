function firstCtrl($scope, $location){
    $scope.checkSlot=function(slotNumber){                 //should check local storage to find out if the slot contains a started game
        //alert(slotNumber);                               //else it should start a new game
        $location.path("ass");
    }
}