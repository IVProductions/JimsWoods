<!-- Declare a module -->
var JimsWoods = angular.module('JimsWoods', []);

<!--Routing-->
JimsWoods.config(function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl:"app/partials/first.html",
        controller:"firstCtrl"
    }).otherwise({
        redirectTo:"/"
    })
});