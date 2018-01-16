function checkFormat(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function findTime() {
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();

    checkFormat(h);
    checkFormat(m);
    checkFormat(s);

    document.getElementById("time").innerHTML = h + ":" m + ":" s;

    setTimeout(function () {
        whatTime()
    }, 500);
}

findTime()
