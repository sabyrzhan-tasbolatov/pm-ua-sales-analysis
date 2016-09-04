(function() {
  'use strict';

  angular.module('pmu')
    .controller('StatisticsCtrl', ['$scope', '$http', function($scope, $http) {
      var init = function() {
        resetChartFlags();
        $scope.format = 'yyyy-mm-dd';
      };

      $scope.statistics = function() {
        $scope.charts = [];
        resetChartFlags();

        var params = {
          from: $scope.from,
          to: $scope.to
        };

        $http.post('/statistics', params)
          .success(function(res) {
            $scope.charts = res.list;
          });
      };

      // datepicker
      $scope.open1 = function() {
        $scope.flags.openedDate1 = true;
      };

      $scope.open2 = function() {
        $scope.flags.openedDate2 = true;
      };

      function resetChartFlags() {
        $scope.flags = {
          showBar: false,
          showPie: false,
          showScatter: false,
          showLine: false,
          openedDate1: false,
          openedDate2: false
        }
      }

      init();
    }]);
})();