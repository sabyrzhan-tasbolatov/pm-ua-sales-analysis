(function() {
  'use strict';

  angular.module('pmu')
    .controller('MetricsCtrl', ['$scope', '$http', function($scope, $http) {
      var init = function() {
        resetChartFlags();
        $scope.format = 'yyyy-mm-dd';
        $scope.criteries = [
          {name: 'How much is MSRP at each POS higher than average?', value: 'avg_msrp'},
          {name: 'What are popular brand families at each POS?', value: 'brand_pop'},
          {name: 'How much are display activities profitable at each POS?', value: 'visib_prof'},
          {name: 'How much are activities with shop assistance profitable at each POS?', value: 'shop_assist_prof'},
          {name: 'How much are activities with hostess profitable at each POS?', value: 'avg_msrp'},
          {name: 'How do external macroeconomic factors impact on sales at each POS?', value: 'macro_impact'}
        ];
        $scope.criteria = $scope.criteries[0];
      };

      $scope.query = function() {
        $scope.charts = [];
        resetChartFlags();

        var params = {
          from: $scope.from,
          to: $scope.to,
          criteria: $scope.criteria.value
        };

        $http.post('/query', params)
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