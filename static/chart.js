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
        template: '<svg ng-show="data.length"></svg>' +
      '<div class="alert alert-info text-center" ng-hide="data.length">' +
      '<i class=\'icon-alert-triangle\'></i> ' + 'No Data Available' +
      '</div>',
        link: function(scope, el) {

          scope.$watch('data', function(n, o) {
            if (!n) return;

            switch(scope.settings.chart) {
              case('line'):line();break;
              case('bar'):bar();break;
              case('pie'):pie();break;
              case('scatter'):scatter();break;
            }
          }, true);

          function line() {
            var dom = angular.element(el).children('svg')[0];
            if (!dom) return;
            d3.selectAll('.nvtooltip').remove();

            console.log(dom)
            console.log(scope.data)

            nv.addGraph(function() {
              var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
                .margin({right: 50, bottom: 85})
                .showXAxis(true)
                .showYAxis(true)

                draw(dom, scope.data, chart);
                nv.utils.windowResize(chart.update);

                return chart;
            });
          }

          function pie() {
            var dom = angular.element(el).children('svg')[0];
            if (!dom) return;
            d3.selectAll('.nvtooltip').remove();

            nv.addGraph(function() {
              var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({right: 50, bottom: 85})
                .showLabels(true)     //Display pie labels
                .showLegend(false)
                .labelsOutside(true)
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType('percent') //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .legendPosition('top');

                draw(dom, scope.data, chart);
                nv.utils.windowResize(chart.update);

                return chart;
            });
          }

          function bar() {
            var dom = angular.element(el).children('svg')[0];
            if (!dom) return;
            d3.selectAll('.nvtooltip').remove();

            nv.addGraph(function() {
              var chart = nv.models.multiBarChart()
                .reduceXTicks(false)
                .margin({right: 50, bottom: 85})
                .groupSpacing(0.5)

                draw(dom, scope.data, chart);
                nv.utils.windowResize(chart.update);

                return chart;
            });
          }

          function scatter() {
            var dom = angular.element(el).children('svg')[0];
            if (!dom) return;
            d3.selectAll('.nvtooltip').remove();

            nv.addGraph(function() {
              var chart = nv.models.scatterChart()
                .margin({right: 50, bottom: 85})
                .showDistX(false)
                .showDistY(false)

                draw(dom, scope.data, chart);
                nv.utils.windowResize(chart.update);

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