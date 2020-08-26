var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./js/page-1.html"
    })
    .when("/page2", {
        templateUrl : "./js/page-2.html"
    })
});