(function() {
  'use strict';

  angular.module('pmu')
    .controller('StatisticsCtrl', ['$scope', '$http', function($scope, $http) {
      var init = function() {
        resetChartFlags();
        $scope.format = 'MM/dd/yyyy';
        $scope.from = '01/01/2014';
        $scope.to = '05/31/2014';
        $scope.cs = [
          {c: 'act_sa', name: 'Shop Assistance'},
          {c: 'act_hostess', name: 'Hostess'},
          {c: 'act_pfp', name: 'PFP'},
          {c: 'act_avb_boost', name: 'AVB Boost'},
          {c: 'act_display', name: 'Displays'},
          {c: 'act_retailer', name: 'Retailers'}
        ];
        $scope.c = $scope.cs[0];
      };

      $scope.statistics = function() {
        $scope.charts = [];
        resetChartFlags();

        var params = {
          from: moment($scope.from).unix(),
          to: moment($scope.to).unix(),
          c: $scope.c.c
        };

        $http.post('/statistics', params)
          .success(function(res) {
            var data = res.list;



            $scope.charts = _.map();
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