﻿/*global define,console*/
define([
    'scalejs!core',
    'knockout',
    'highcharts'
], function (
    core,
    ko,
    highcharts
) {
    'use strict';

    // aliases
    var has = core.object.has,
        is = core.type.is,
        unwrap = ko.utils.unwrapObservable,
        isObservable = ko.isObservable,
        //compare = ko.utils.compareArrays,
        arrayMap = ko.utils.arrayMap,
        forEach = ko.utils.arrayForEach,
        merge = core.object.merge,
        arrayCopy = core.array.copy;

    function updatePoints(oldPointsLength, newPoints, chartSeries) {
        // assume there's no deletes, points can only be added to the end of series
        var newPointsLength = newPoints.length,
            points = newPoints.slice(oldPointsLength, newPoints.length);
        forEach(points, function (p) {
            chartSeries.addPoint(p, true, true);
        });
        //chartSeries.redraw();
        return newPointsLength;
    }

    function subscribeToSeries(s, chartSeries) {
        var pointsLength = unwrap(s.observableData).length;

        s.subscription = s.observableData.subscribe(function (newPoints) {
            pointsLength = updatePoints(pointsLength, newPoints, chartSeries);
        });

        return s.subscription;
    }

    function makeSerie(s) {
        return merge(s, {
            id: s.id || s.name || new Date().getTime(),
            observableData: isObservable(s.data) ? s.data : undefined,
            data: arrayCopy(unwrap(s.data))
        });
    }

    function createOptions(options, element) {
        var series = arrayMap(unwrap(options.series), makeSerie);

        return merge(options, {
            chart: {
                renderTo: element
            },
            series: series
        });
    }

    function subscribeSeries(series, chart) {
        var disposables = [];

        forEach(series, function (s) {
            var chartSeries = chart.get(s.id);

            if (s.observableData) {
                disposables.push(subscribeToSeries(s, chartSeries));
            }
        });

        return disposables;
    }

    function createChart(options, element) {
        var series,
            chart,
            subs;

        options = createOptions(options, element);
        series = options.series;
        chart = new highcharts.Chart(options);
        subs = subscribeSeries(series, chart);

        return {
            chart: chart,
            dispose: function () {
                forEach(subs, function (s) {
                    s.dispose();
                });

                chart.destroy();
            }
        };
    }
    /*jslint unparam: true*/
    function init(
        element,
        valueAccessor,
        allBindingsAccessor
    ) {
        var b = allBindingsAccessor(),
            chart = createChart(b.highcharts, element);

        if (has(b.highcharts, 'xAxis', 'categories') && isObservable(b.highcharts.xAxis.categories)) {
            b.highcharts.xAxis.categories.subscribe(function (newCategories) {
                if (has(chart, 'chart', 'xAxis', 'length') && chart.chart.xAxis.length > 0) {
                    chart.chart.xAxis[0].setCategories(newCategories);
                }
            });
        }

        if (isObservable(b.highcharts.series)) {
            b.highcharts.series.subscribe(function (newSeries) {
                chart.dispose();
                // series should be an array, if it's not then assume it's a single-series array
                if (!is(newSeries, 'array')) {
                    newSeries = [newSeries];
                }
                chart = createChart(merge(b.highcharts, { series: newSeries }), element);
            });
        }

    }
    /*jslint unparam: false*/

    return {
        init : init
    };
});

