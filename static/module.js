(function() {
  'use strict';

  angular
    .module('pmu', [
      'ngRoute',
      'ngResource',
      'ngSanitize',
      'ngAnimate',
      'ui.router',
      'ui.bootstrap'
    ])
      .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when("", "statistics");
        $urlRouterProvider.when("/", "statistics");
        $urlRouterProvider.otherwise("statistics");

        $stateProvider
          .state('pmu', {
            abstract: true,
            url: '/',
            template: '<ui-view/>'
          })
          .state('pmu.statistics', {
            url: 'statistics',
            templateUrl: '/statistics/index',
            controller: 'StatisticsCtrl'
          })
          .state('pmu.metrics', {
            url: 'metrics',
            templateUrl: '/metrics/index',
            controller: 'MetricsCtrl'
          })
          .state('pmu.analysis', {
            url: 'analysis',
            templateUrl: '/analysis/index',
            controller: 'AnalysisCtrl'
          })
    }])
})();