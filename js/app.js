var app = angular.module('movieApp', ['ngRoute']);


app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/movies.html',
    controller: 'movieController'
  })
  .when('/info/:imdbID*', {
    templateUrl: 'partials/info.html',
    controller: 'infoController'
  });
  $locationProvider.html5Mode(true);
});
// Controllers

app.controller('movieController', function($scope, $http, $route){
  $scope.view = {};
  $scope.searchMovie = function(){
    var input = $scope.view.textSearch;
    var url = 'http://www.omdbapi.com/?s=' + input;
    $http.get(url)
    .success(function(data){
      console.log(data);
      $scope.view.movies= data.Search;
    })
    .catch(function(error){
      $scope.view.error = error.status;
    })
  }
})

app.controller('infoController',
function($scope, $http, $route){
  $scope.view = {};
  var movieID = $route.current.params.imdbID;
  var url = 'http://www.omdbapi.com/?i=' + movieID +'&tomatoes=true';
  $http.get(url)
  .success(function(data){
    console.log(data);
    $scope.view.detail = data;
  })
  .catch(function(error){
    $scope.view.error = error.stauts
  })
})
