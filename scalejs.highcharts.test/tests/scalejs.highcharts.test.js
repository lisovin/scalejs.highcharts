/*global define,describe,expect,it*/
/*jslint sloppy: true*/
/// <reference path="../Scripts/jasmine.js"/>
define([
    'knockout',
    'scalejs!core',
    'scalejs!application'
], function (ko, core) {
    describe('highcharts extension', function () {
        it('Knockout binding is defined', function () {
            expect(ko.bindingHandlers.highcharts).toBeDefined();
        });
    });
});