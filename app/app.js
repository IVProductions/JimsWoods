 <!-- Declare a module -->
var JimsWoods = angular.module('JimsWoods', []);

<!--Routing-->
JimsWoods.config(function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl:"app/partials/first.html",
        controller:"firstCtrl"
    }).when("/ass",{
            templateUrl:"app/partials/second.html",
            controller:"firstCtrl"
        }).otherwise({
        redirectTo:"/"
    })
});

