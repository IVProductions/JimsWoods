function firstCtrl($scope, $location, $http){
    $scope.checkSlot=function(slotNumber){                   //this function should check whether the slot is empty or
        $location.path("main");                              //has a game saved to it, before it changes to the correct partial
    }
    $scope.changeView=function(view){
        $location.path(view);
    }
}
