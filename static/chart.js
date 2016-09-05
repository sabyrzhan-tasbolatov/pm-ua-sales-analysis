(function() {
  'use strict';

  angular
    .module('pmu')
    .directive('pmuChart', function() {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          settings: '='
        },
        template: '<svg ng-show="data.links.length"></svg>' +
      '<div class="alert alert-info text-center" ng-hide="data.length">' +
      '<i class=\'icon-alert-triangle\'></i> ' + 'No Data Available' +
      '</div>',
        link: function(scope, el) {
          var el = angular.element(el).children('svg')[0];

          scope.$watch('data', function(n, o) {
            if (!n) return;
            switch(scope.settings.chart) {
              case('line'):line();break;
              case('bar'):bar();break;
              case('pie'):pie();break;
              case('scatter'):scatter();break;
            }
          }, true);

//          [{'x': 1, 'y': 2}]
          function line() {
            nvd.addGraph(function() {
              var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
                .margin({right: 50, bottom: 85})
                .showXAxis(true)
                .showYAxis(true)

                draw(el, scope.data, chart);

                return chart;
            });
          }

          function pie() {
            nvd.addGraph(function() {
              var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({right: 50, bottom: 85})
                .showLabels(true)     //Display pie labels
                .labelsOutside(true)
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType('percent') //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .legendPosition('top');

                draw(el, scope.data, chart);

                return chart;
            });
          }

          function bar() {
            nvd.addGraph(function() {
              var chart = nv.models.multiBarChart()
                .reduceXTicks(false)
                .margin({right: 50, bottom: 85})
                .groupSpacing(0.5)

                draw(el, scope.data, chart);

                return chart;
            });
          }

          function scatter() {
            nvd.addGraph(function() {
              var chart = nv.models.scatterChart()
                .margin({right: 50, bottom: 85})
                .showDistX(false)
                .showDistY(false)

                draw(el, scope.data, chart);

                return chart;
            });
          }

          function draw(dom, data, chart) {
            d3.select(dom)
              .datum(data)
              .transition().duration(350)
              .call(chart);
          }
        }
      }
    })
})();