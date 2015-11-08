angular.module('gitGet')
    .filter('orderObjectBy', function() {
        return function(input, attribute, order) {
            if (!angular.isObject(input)) return input;
            var array = [];
            order = order || 'asc';
            for(var objectKey in input) {
                array.push(input[objectKey]);
            }
            array.sort(function(a, b){
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return order === 'asc'?a - b:b - a;
        });
        return array;
    }
});