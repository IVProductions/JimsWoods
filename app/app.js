 <!-- Declare a module -->
var JimsWoods = angular.module('JimsWoods', []);

<!--Routing-->
JimsWoods.config(function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl:"app/partials/slot.html",
        controller:"firstCtrl"
    }).when("/main",{
        templateUrl:"app/partials/mainMenu.html",
        controller:"firstCtrl"
    }).when("/wiki",{
        templateUrl:"app/partials/wiki.html",
        controller:"wikiCtrl"
    }).when("/animalList",{
        templateUrl:"app/partials/animalList.html",
        controller:"wikiCtrl"
    }).when("/animalDetails",{
        templateUrl:"app/partials/animalDetails.html",
        controller:"wikiCtrl"
    }).when("/shop",{
        templateUrl:"app/partials/shop.html",
        controller:"firstCtrl"
    }).when("/myAnimals",{
        templateUrl:"app/partials/myAnimals.html",
        controller:"myAnimalsCtrl"
    }).when("/myAnimalDetails",{
        templateUrl:"app/partials/myAnimalDetails.html",
        controller:"myAnimalsCtrl"
    }).when("/game",{
        templateUrl:"app/partials/game.html",
        controller:"gameCtrl"
    }).otherwise({
        redirectTo:"/"
    })
});

