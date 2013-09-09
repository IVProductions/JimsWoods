function firstCtrl($scope, $location, $http){
    $scope.checkSlot=function(slotNumber){                   //this function should check whether the slot is empty or
        $location.path("main");                              //has a game saved to it, before it changes to the correct partial
    }
    $scope.changeView=function(view){
        $location.path(view);
    }
    $scope.chooseWorldList=function(world){
        //if world = wood then $http.get-> woodAnimals.json
        var animalFile = "";
        if (world=="woods") {
            animalFile="woodsAnimals.json";
        }
        else if (world="desert") {
            animalFile="desertAnimals.json";
        }
        else if (world="sea") {
            animalFile="seaAnimals.json";
        }
        else if (world="jungle") {
            animalFile="jungleAnimals.json";
        }
        else if (world="arctic") {
            animalFile="arcticAnimals.json";
        }
        else if (world="fable") {
            animalFile="fableAnimals.json";
        }
        $http.get('app/animals/'+animalFile).success(function(data) {  //get animal objects from json-file
            $scope.animals = data;
        });
        $location.path("animalList");
    }

    //setter at drop down menyens default er newest phone basert på alder
}