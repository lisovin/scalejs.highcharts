/*global require*/
/// <reference path="Scripts/require.js"/>
/// <reference path="Scripts/jasmine.js"/>
require({
    "paths":  {
        "highcharts":  "Scripts/highcharts.src",
        "jQuery":  "Scripts/jQuery-1.9.0",
        "knockout":  "Scripts/knockout-2.2.1",
        "knockout.mapping":  "Scripts/knockout.mapping-latest",
        "scalejs":  "Scripts/scalejs-0.1.13",
        "scalejs.highcharts":  "Scripts/scalejs.highcharts-2.3.5"
    },
    "scalejs":  {
        "extensions":  [
            "scalejs.highcharts"
        ]
    },
    "shim":  {
        "highcharts":  {
            "deps":  [
                "jQuery"
            ],
            "exports":  "Highcharts"
        },
        "jQuery":  {
            "exports":  "jQuery"
        }
    }
}, ['tests/all.tests']);
