var app = angular.module("alarmApp", []);

app.controller("homeCtrl", ["$scope", "ChangeTimerService", "ChangeAlarmService", function ($scope, ChangeTimerService, ChangeAlarmService) {

    //function checks the format of displayed time to ensure always displayed in double digits.//
    $scope.checkFormat = function (i) {

        if (i >= 0 && i < 10) {
            i = "0" + i;
        } else if (i < 0) {
            i = "00";
        } else if (i > 60) {
            i = 60;
        }
        return i;
    }

    //function gets the current time//
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

    //retrieves set time from the ChangeTimerService//
    $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);

    // functions to add to timer//

    $scope.timerPlusHours = function (input) {
        ChangeTimerService.addHours(input);
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    }
    $scope.timerPlusMinutes = function (input) {
        ChangeTimerService.addMinutes(input);
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    }
    $scope.timerPlusSeconds = function (input) {
        ChangeTimerService.addSeconds(input);
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
    }

    //functions to subtract from timer//
    $scope.timerMinusHours = function (input) {
        ChangeTimerService.subtractHours(input);
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    }
    $scope.timerMinusMinutes = function (input) {
        ChangeTimerService.subtractMinutes(input);
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    }
    $scope.timerMinusSeconds = function (input) {
        ChangeTimerService.subtractSeconds(input);
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
    }
    //functions to set and reset timer//


    //retrieves set time from the ChangeAlarmService//

    $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
    $scope.alarmSeconds = $scope.checkFormat(ChangeAlarmService.seconds);

    //functions to add to alarm//
    $scope.alarmPlusHours = function (input) {
        ChangeAlarmService.addHours(input);
        $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    }
    $scope.alarmPlusMinutes = function (input) {
        ChangeAlarmService.addMinutes(input);
        $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
    }
    $scope.alarmPlusSeconds = function (input) {
        console.log($scope.alarmSeconds);
        ChangeAlarmService.addSeconds(input);
        $scope.alarmSeconds = ChangeAlarmService.seconds;
        console.log($scope.alarmSeconds);
    }
    
    //functions to subtract from alarm//
    $scope.alarmMinusHours = function (input) {
        ChangeAlarmService.subtractHours(input);
        $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    }
    $scope.alarmMinusMinutes = function (input) {
        ChangeAlarmService.subtractMinutes(input);
        $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
    }
    $scope.alarmMinusSeconds = function (input) {
        ChangeAlarmService.subtractSeconds(input);
        $scope.alarmSeconds = $scope.checkFormat(ChangeAlarmService.seconds);
    }
    //functions to set and reset alarm//

}]);

app.service("ChangeTimerService", function () {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    this.addHours = function (input) {
        if (input === "one") {
            return this.hours += 1;
        } else if (input === "five") {
            return this.hours += 5;
        } else if (input === "ten") {
            return this.hours += 10;
        }
    };
    this.addMinutes = function (input) {
        if (input === "one") {
            return this.minutes += 1;
        } else if (input === "five") {
            return this.minutes += 5;
        } else if (input === "ten") {
            return this.minutes += 10;
        }
    };
    this.addSeconds = function (input) {
        if (input === "one") {
            return this.seconds += 1;
        } else if (input === "five") {
            return this.seconds += 5;
        } else if (input === "ten") {
            return this.seconds += 10;
        }
    };

    this.subtractHours = function (input) {
        if (input === "one") {
            return this.hours -= 1;
        } else if (input === "five") {
            return this.hours -= 5;
        } else if (input === "ten") {
            return this.hours -= 10;
        }
    };
    this.subtractMinutes = function (input) {
        if (input === "one") {
            return this.minutes -= 1;
        } else if (input === "five") {
            return this.minutes -= 5;
        } else if (input === "ten") {
            return this.minutes -= 10;
        }
    };
    this.subtractSeconds = function (input) {
        if (input === "one") {
            return this.seconds -= 1;
        } else if (input === "five") {
            return this.seconds -= 5;
        } else if (input === "ten") {
            return this.seconds -= 10;
        }
    };

});

app.service("ChangeAlarmService", function () {
    this.hours = 00;
    this.minutes = 00;
    this.seconds = 00;
    //functions to add time//
    this.addHours = function (input) {
        if (input === "one") {
            return this.hours += 1;
        } else if (input === "five") {
            return this.hours += 5;
        } else if (input === "ten") {
            return this.hours += 10;
        }
    };
    this.addMinutes = function (input) {
        if (input === "one") {
            return this.minutes += 1;
        } else if (input === "five") {
            return this.minutes += 5;
        } else if (input === "ten") {
            return this.minutes += 10;
        }
    };
    this.addSeconds = function (input) {
        if (input === "one") {
            return this.seconds += 1;
        } else if (input === "five") {
            return this.seconds += 5;
        } else if (input === "ten") {
            return this.seconds += 10;
        }
    };

    this.subtractHours = function (input) {
        if (input === "one") {
            return this.hours -= 1;
        } else if (input === "five") {
            return this.hours -= 5;
        } else if (input === "ten") {
            return this.hours -= 10;
        }
    };
    this.subtractMinutes = function (input) {
        if (input === "one") {
            return this.minutes -= 1;
        } else if (input === "five") {
            return this.minutes -= 5;
        } else if (input === "ten") {
            return this.minutes -= 10;
        }
    };
    this.subtractSeconds = function (input) {
        if (input === "one") {
            return this.seconds -= 1;
        } else if (input === "five") {
            return this.seconds -= 5;
        } else if (input === "ten") {
            return this.seconds -= 10;
        }
    };
});
