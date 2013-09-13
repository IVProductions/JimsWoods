function myAnimalsCtrl($scope, $location, myAnimalFactory, stateService ){
    console.log('works');

    $scope.myAnimalFactory = myAnimalFactory;
    $scope.myAnimals = $scope.myAnimalFactory.animals;
    $scope.stateService = stateService;
    $scope.animal = $scope.stateService.functions.getCurrentAnimal();

    $scope.getMyAnimalDetails=function(animal){
        //alert(animal.name);
        $scope.stateService.functions.setCurrentAnimal(animal);
        $location.path("myAnimalDetails");

    }

    $scope.changeView=function(view){
        $location.path(view);
    }
}