var app = angular.module("alarmApp", []);

app.controller("homeCtrl", ["$scope", "$interval", "ChangeTimerService", "ChangeAlarmService", function ($scope, $interval, ChangeTimerService, ChangeAlarmService) {

    //function to display in double digits.//
    $scope.checkFormat = function (i) {

        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    //function gets the current time//
    $scope.currentHours;
    $scope.currentMins;
    $scope.findTime = function () {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();

        h = $scope.checkFormat(h);
        m = $scope.checkFormat(m);
        s = $scope.checkFormat(s);

        $scope.currentHours = h;
        $scope.currentMins = m;

        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

        setTimeout(function () {
            $scope.findTime()
        }, 500);
    };
    $scope.findTime();
    $scope.audio = new Audio('kwahmah-02__alarm1.mp3');
    $scope.audio.loop = true;

    $scope.started = false;
    $scope.inspireGroup = ["You've Got this!","Awesome levels over 9000!","Keep Going!","You can do it!"]
    $scope.inspireWords = "Need a boost?";
    
    $scope.motivate = function () {
        var newWords = Math.floor(Math.random() * Math.floor(4));
        $scope.inspireWords = $scope.inspireGroup[newWords];
    }

    //retrieves set time from the ChangeTimerService//
    $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);

    // functions to add to timer//
    $scope.timerPlusHours = function () {
        if ($scope.timerHours == 60) {
            return;
        }
        ChangeTimerService.addHours();
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    };
    $scope.timerPlusMinutes = function () {
        if ($scope.timerMinutes == 59) {
            return;
        }
        ChangeTimerService.addMinutes();
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    };
    $scope.timerPlusSeconds = function () {
        if ($scope.timerSeconds == 59) {
            return;
        }
        ChangeTimerService.addSeconds();
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
    };

    //functions to subtract from timer//
    $scope.timerMinusHours = function () {
        if ($scope.timerHours == 0) {
            return;
        }
        ChangeTimerService.subtractHours();
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
    };
    $scope.timerMinusMinutes = function () {
        if ($scope.timerMinutes == 0) {
            return;
        }
        ChangeTimerService.subtractMinutes();
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
    };
    $scope.timerMinusSeconds = function () {
        if ($scope.timerSeconds == 0) {
            return;
        }
        ChangeTimerService.subtractSeconds();
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
    };

    //functions to set and reset timer//


    //retrieves set time from the ChangeAlarmService//
    $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
    

    //functions to add to alarm//
    $scope.alarmPlusHours = function () {
        if ($scope.alarmHours == 24) {
            return;
        }
        ChangeAlarmService.addHours();
        $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    };
    $scope.alarmPlusMinutes = function () {
        if ($scope.alarmMinutes == 55) {
            return;
        }
        ChangeAlarmService.addMinutes();
        $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
        console.log($scope.alarmMinutes);

    };

    //functions to subtract from alarm//
    $scope.alarmMinusHours = function () {
        if ($scope.alarmHours == 0) {
            return;
        }
        ChangeAlarmService.subtractHours();
        $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
    };
    $scope.alarmMinusMinutes = function () {
        if ($scope.alarmMinutes == 0) {
            return;
        }
        ChangeAlarmService.subtractMinutes();
        $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
    };


    //functions to set and reset alarm and timer//
    $scope.timerStarted;
    $scope.alarmStarted;
    $scope.updateAlarm = function () {
        if (($scope.currentHours === $scope.alarmHours) && ($scope.currentMins == $scope.alarmMinutes)) {
            $scope.audio.play();
            $interval.cancel($scope.alarmStarted);
            $scope.resetAlarm();
            $scope.start = false;
        }
    };
    $scope.startAlarm = function () {
        console.log("alarm started")
        $scope.alarmStarted = $interval($scope.updateAlarm, 1000);
    };
    $scope.stopAlarm = function () {
        console.log("clicked stop alarm function");
        return $interval.cancel($scope.alarmStarted);
        $scope.audio.pause();
    };
    $scope.resetAlarm = function () {
        console.log("clicked reset")
        ChangeAlarmService.resetAlarm();
        $scope.alarmHours = $scope.checkFormat(ChangeAlarmService.hours);
        $scope.alarmMinutes = $scope.checkFormat(ChangeAlarmService.minutes);
        $interval.cancel($scope.alarmStarted);
        $scope.audio.pause();

    };

    $scope.updateTimer = function () {
        console.log("update timer started");
        if (ChangeTimerService.sound) {
            $interval.cancel($scope.timerStarted);
            $scope.audio.play();
        }
        ChangeTimerService.countdown();
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
    };
    $scope.startTimer = function () {
        console.log("timer started")
        $scope.timerStarted = $interval($scope.updateTimer, 1000);
    };
    $scope.stopTimer = function () {
        console.log("clicked stop function");
        ChangeTimerService.sound = false;
        $scope.audio.pause();
        $interval.cancel($scope.timerStarted);

    };
    $scope.resetTimer = function () {
        console.log("clicked reset")
        ChangeTimerService.resetTimer();
        $scope.timerHours = $scope.checkFormat(ChangeTimerService.hours);
        $scope.timerMinutes = $scope.checkFormat(ChangeTimerService.minutes);
        $scope.timerSeconds = $scope.checkFormat(ChangeTimerService.seconds);
        ChangeTimerService.sound = false;
        $scope.audio.stop();
    };


}]);

app.service("ChangeTimerService", function () {
    //variables to set timer//
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.sound = false;

    //these functions add time//
    this.addHours = function () {
        return this.hours += 1;
    };
    this.addMinutes = function () {
        return this.minutes += 5;
    };
    this.addSeconds = function () {
        return this.seconds += 5;
    };
    //these functions subtract time//
    this.subtractHours = function () {
        return this.hours -= 1;
    };
    this.subtractMinutes = function () {
        return this.minutes -= 5;
    };
    this.subtractSeconds = function () {
        return this.seconds -= 5;
    };
    //these functions are called during countdown when timer is set//
    this.countdown = function () {
        console.log("countdown function running");
        if (this.hours === 0 && this.minutes === 0) {
            if (this.seconds === 0) {
                return this.sound = true;
            } else {
                this.seconds -= 1;
            }
        } else if (this.hours === 0 && this.minutes !== 0) {
            if (this.seconds === 0) {
                this.minutes -= 1;
                this.seconds = 59;
            } else {
                this.seconds -= 1;
            }
        } else {
            if (this.minutes === 0) {
                if (this.seconds === 0) {
                    this.hours -= 1;
                    this.minutes = 59;
                    this.seconds = 59;
                } else {
                    seconds -= 1;
                }
            } else if (this.minutes !== 0) {
                if (this.seconds === 0) {
                    this.minutes -= 1;
                    this.seconds = 59;
                } else {
                    this.seconds -= 1;
                }
            }
        }
    };

    //these functions set, stop, and reset the timer//
    this.resetTimer = function () {
        this.hours = 00;
        this.minutes = 00;
        this.seconds = 00;
    }

});

app.service("ChangeAlarmService", function () {
    //variables to set alarm//
    this.hours = 00;
    this.minutes = 00;

    //functions to add time//

    this.addHours = function (input) {
        if (this.hours >= 24) {
            return;
        }
        if (this.hours + 1 > 24) {
            return;
        }
        return this.hours += 1;

    }
    this.addMinutes = function (input) {
        return this.minutes += 5;
    }

    //functions to subtract time//
    this.subtractHours = function (input) {
        return this.hours -= 1;
    }
    this.subtractMinutes = function (input) {
        return this.minutes -= 5;
    }

    //    function to reset alarm//
    this.resetAlarm = function () {
        this.hours = 00;
        this.minutes = 00;
        this.seconds = 00;
    }
});
