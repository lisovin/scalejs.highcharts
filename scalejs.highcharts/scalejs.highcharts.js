/*global define*/
define([
    'scalejs.highcharts/highcharts',
    'knockout',
    'knockout.mapping'
], function (
    highcharts,
    ko
) {
    'use strict';

    ko.bindingHandlers.highcharts = highcharts;
});

