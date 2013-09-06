/**
 * Created with JetBrains WebStorm.
 * User: remi
 * Date: 8/12/13
 * Time: 8:29 AM
 * To change this template use File | Settings | File Templates.
 */

<!-- Declare a module -->
var diffiaAdmin = angular.module('DiffiaAdminApp', ['ngResource', 'ui.sortable']);

<!--Routing-->
diffiaAdmin.config(function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl:"app/partials/login.html",
        controller:"loginController"
    }).when ("/landing", {
        templateUrl:"app/partials/landing.html",
        controller: "loginController"
    }).when ("/symptoms", {
        templateUrl:"app/partials/symptoms.html",
        controller: "symptomsController"
    }).when ("/symptomQuestions", {
        templateUrl:"app/partials/symptomQuestions.html",
        controller: "symptomQuestionsController"
    }).when ("/questionDetails", {
        templateUrl:"app/partials/questionDetails.html",
        controller: "symptomQuestionsController"
    }).when ("/symptomDetails", {
        templateUrl:"app/partials/symptomDetails.html",
        controller: "symptomsController"
    }).otherwise({
        redirectTo:"/"
    })
});