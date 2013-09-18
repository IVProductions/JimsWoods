function wikiCtrl($scope, $location, woodAnimalFactory, stateService, desertAnimalFactory, seaAnimalFactory, jungleAnimalFactory, arcticAnimalFactory, fableAnimalFactory, mountainAnimalFactory, lostworldAnimalFactory) {
    $scope.stateService = stateService;
    $scope.animals = $scope.stateService.functions.getCurrentAnimalFactory();
    $scope.animal = $scope.stateService.functions.getCurrentAnimal();
    $scope.chooseWorldList=function(world){
        if (world=="woods") {
            $scope.woodAnimalFactory = woodAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.woodAnimalFactory);
        }
        else if (world=="desert") {
            $scope.desertAnimalFactory = desertAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.desertAnimalFactory);
        }
        else if (world=="sea") {
            $scope.seaAnimalFactory = seaAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.seaAnimalFactory);
        }
        else if (world=="jungle") {
            $scope.jungleAnimalFactory = jungleAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.jungleAnimalFactory);
        }
        else if (world=="arctic") {
            $scope.arcticAnimalFactory = arcticAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.arcticAnimalFactory);
        }
        else if (world=="fable") {
            $scope.fableAnimalFactory = fableAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.fableAnimalFactory);
        }
        else if (world=="mountain") {
            $scope.mountainAnimalFactory = mountainAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.mountainAnimalFactory);
        }
        else if (world=="lostworld") {
            $scope.lostWorldAnimalFactory = lostworldAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.lostWorldAnimalFactory);
        }
        $location.path("animalList");
    }
    $scope.getAnimalDetails=function(animal){
        //alert(animal.name);
        $scope.stateService.functions.setCurrentAnimal(animal);
        $location.path("animalDetails");

    }

    $scope.changeView=function(view){
        $location.path(view);
    }
}