var chart = null;
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/datasets', {
            templateUrl: 'partials/listing.html',
            controller: 'DatasetListing'
        })
        .when('/dataset/:datasetID', {
            templateUrl: 'partials/dataset.html',
            controller: 'DatasetController'
        })
        .when('/graph/:datasetID', {
            templateUrl: 'partials/graph.html',
            controller: 'GraphController'
        })
        .otherwise({
            redirectTo: '/datasets'
        });
}]);

app.controller('DatasetListing', function($scope, $http) {
    $http.get('/get_datasets')
        .success( function(data) {
            $scope.datasets = getDatasets(data);
        })
        .error( function() {
            console.log("Failed to get ERDDAP Data");
            $scope.datasets = {};
        });
            
});

app.controller('DatasetController', function($scope, $http, $routeParams, $rootScope) {
    $scope.selectedParameter = 'time';
    $http.get('/get_dataset/' + $routeParams.datasetID)
        .success(function(data) {
            $scope.parameters = getParameters(data);
        })
        .error( function() {
            console.log("Failed to get ERDDAP Data");
            $scope.parameters = {};
        });
    $scope.selectedParameter = 'time';
    $scope.radioChange = function(value) {
        $rootScope.$emit('parameterselected', value);
    };
    $rootScope.$on('parameterselected', function(evt, value) {
        $scope.selectedParameter = value;
    });
});

app.controller('GraphController', function($scope, $http, $routeParams) {
    $http.get('/get_data/' + $routeParams.datasetID)
        .success(function(data) {
            var variableData = getData(data);
            console.log(variableData);

            $scope.data = {
                x: 'time',
                xFormat: '%Y-%m-%dT%H:%M:%SZ',
                columns: [
                    ['time'].concat(variableData.time),
                    ['sci_m_disk_free'].concat(variableData.sci_m_disk_free)
                ]
            };
        })
        .error(function() {
            $scope.data = {
                x: 'x',
                columns: [
                    ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 340, 200, 500, 250, 350]
                ]
            };
        })
        .finally(function() {
            chart = c3.generate({"data" : $scope.data, "axis": {
                    "x": {
                        "type": 'timeseries',
                        "tick": {
                            "format": '%Y-%m-%dT%H:%M:%SZ'
                        }
                    }
                }
            });
        });
});


