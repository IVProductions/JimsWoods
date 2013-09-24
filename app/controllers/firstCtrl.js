function firstCtrl($scope, $location, $http, stateService){
    $scope.stateService=stateService;
    $scope.checkSlot=function(slotNumber){                          //this function should check whether the slot is empty or
        $scope.stateService.functions.setCurrentSlot(slotNumber);   //has a game saved to it, before it changes to the correct partial
        $location.path("game");
    }
    $scope.changeView=function(view){
        $location.path(view);
    }
}
