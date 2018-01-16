var app = angular.module("alarmApp", []);

app.controller("homeCtrl", ["$scope", function ($scope) {

    $scope.checkFormat = function (i) {

        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    $scope.findTime = function () {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();

        h = $scope.checkFormat(h);
        m = $scope.checkFormat(m);
        s = $scope.checkFormat(s);

        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

        setTimeout(function () {
            $scope.findTime()
        }, 500);
    }

    $scope.findTime();

}]);
