'use strict';

angular.module('providerApp')

    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if(input && input.length) {
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        }
    }) 
