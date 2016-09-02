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
        $urlRouterProvider.when("", "metrics");
        $urlRouterProvider.when("/", "metrics");
        $urlRouterProvider.otherwise("metrics");

        $stateProvider
          .state('pmu', {
            abstract: true,
            url: '/',
            template: '<ui-view/>'
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