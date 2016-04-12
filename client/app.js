'use strict';

angular.module('expenseVisualize', [
  'ngRoute',
  'restangular',
  'ngMaterial',
  'nvd3'
])
  .constant('API', '/api')
  .constant('EXPENSE_TYPES', ['cash', 'credit'])
  .config(function ($routeProvider, $locationProvider, API, RestangularProvider) {

    RestangularProvider.setBaseUrl(API);

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
