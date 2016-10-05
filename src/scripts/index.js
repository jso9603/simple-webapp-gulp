'use strict'

var config;
//var data;

// returns the value for 'startTime(Min|Max)
function startTimeStringFromNow(hours) {
    var date = new Date(Date.now() + (hours * 60 * 60 * 1000));
    if (Math.random() >= 0.5) { // yyyy-MM-ddTHH:mm:ssZ
        return date.toISOString();
    } else { // seconds from the epoch
        return parseInt(date / 1000, 10);
    }
}

// 현재 시간부터 hours까지의 data 가져오기
function readEventsFromNow(hours, consumer) {
    var startTimeMin = startTimeStringFromNow(0); // now
    console.log('startTimeMin(0): ' + startTimeMin);
    var startTimeMax = startTimeStringFromNow(hours); // now + hours
    console.log("startTimeMax(" + hours + "): " + startTimeMax);
    $.getJSON({
        url: 'https://211.253.31.215:58181/ippl-resources/resources/operators/1/services/1/events'
                + '?startTimeMin=' + startTimeMin
                + '&startTimeMax=' + startTimeMax,
        success: function (events) {
            consumer(events);
        }
    });
}

// 브라우저가 DOM트리 생성한 직후
$(document).ready(function () {
    console.log("$(document).ready()");
    document.getElementById("test").innerHTML = "Test";
    //setTimeout의 return 값(clearTimeout으로 setTimeout을 중지시킬 수 있음)
    var printMyName = setTimeout(function () {
        console.log("jisoo");
    }, 10000);
    if (false) {
        setTimeout(function () {
            clearTimeout(printMyName);
        }, 5000);
    }
    for (var i = 10; i > 0; i--) {
        (function (i) {
            setTimeout(function () {
                $("#counter").html(i);
            }, 1000 * (10 - i));
        })(i);
    }
    console.log('\'import\' in document.createElement(\'link\'): '
            + ('import' in document.createElement('link')));
    window.onkeydown = function (event) {
        console.log("keyCode: " + event.keyCode);
        switch (event.keyCode) {
            case 13:
                key = "Enter";
                break;
            case 37:
                key = "Arrow Left";
                break;
            case 38:
                key = "Arrow Up";
                break;
            case 39:
                key = "Arrow Right";
                break;
            case 40:
                key = "Arrow Down";
                break;
            default:
                key = "Unknown";
                break;
        }
        document.getElementById("keyResult").innerHTML = "입력하신 keyCode 값은 " + event.keyCode + ", Key는 " + key + "입니다.";
    };

    // default.json data 가져오기
    $.getJSON({
        url: 'config/default.json',
        success: function (data) {
            config = data;
            console.log('baseUrl: ' + config.baseurl);
        }
    });

    // Allow-Control-Allow-Origin 확장 프로그램 설치(구글 앱스토어)
    $.getJSON({
        url: 'https://211.253.31.215:58181/ippl-resources/resources/operators/1/services/1/events',
        //data: data,
        success: function (data) {
            console.log(data);
            console.log(typeof (data));
            console.log("data.length: " + data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("------------------------------------------------");
                console.log("data[" + i + "].name: " + data[i].name);
                console.log("data[" + i + "].name: " + data[i].name);
                console.log("data[" + i + "].startTime: " + data[i].startTime);
                console.log("data[" + i + "].playTime: " + data[i].playTime);
                var startTime = data[i].startTime;
                //var playTime = data[i].playTime;
                var milliseconds = Date.parse(startTime);
                var seconds = milliseconds / 1000;
                console.log("startTime as milliseconds: " + milliseconds);
                console.log("startTime as seconds: " + seconds);
                console.log('startTime as Date: ' + new Date(milliseconds));
                console.log('startTime in milliseconds from now: ' + (new Date(milliseconds) - Date.now()));
                console.log('startTime in seconds from now: ' + ((new Date(milliseconds) - Date.now()) / 1000));
            }
        }
    });

    // image라 load된 후, 서서히 안보이게 됨
    setTimeout(function () {
        $('#img').on('load', function () {
            console.log("#img.load");
            $("#img").delay(2000).fadeOut(1000);
        });
        $('#img').attr('src', 'http://www.fnordware.com/superpng/pnggrad8rgb.png');
    }, 0);

    // 1초마다 hello...를 찍어주고, 3초 후에 해제
    var helloInteval = setInterval(function () {
        console.log('hello...');
    }, 1000);
    setTimeout(function () {
        clearInterval(helloInteval);
    }, 3000);

    // readEventsFromNow()에서 가져온 정보 출력
    setInterval(function () {
        readEventsFromNow(5, function (events) {
            console.log("----------------- events(" + events.length + ") read");
            for (var i = 0; i < events.length; i++) {
                console.log("data[" + i + "].startTime: " + events[i].startTime);
                var startTime = events[i].startTime;
                var milliseconds = Date.parse(startTime);
                var startTimeInSecondsFromNow = parseInt(
                        ((new Date(milliseconds) - (Date.now()) / 1000)))
                console.log('data[' + i + '].startTime in seconds from now: '
                        + startTimeInSecondsFromNow);
            }
        });
    }, 3000);
});

// window가 로딩된 후
$(window).on("load", function () {
    console.log("$(window).on('load')");
});
// 웹페이지의 로딩이 끝나는 시점에 실행되는 함수
window.onload = function () {
    console.log("window.onload");
};
function timer_test() {
    console.log("click image");
    setTimeout(function () {
        $("img").hide();
    }, 1000);
}

// toggle
function toggleShared() {
    $("#shared").toggle();
    //inlude html(html include html code)
    $.get("shared.html", function (data) {
        $("#shared").html(data);
    });
}





// JavaScript prototype example
var Person = function (name) {
    this.name = name;
};

Person.prototype.printName = function () {
    console.log(this.name);
};

var jisooAsPerson = new Person("jisoo");
jisooAsPerson.printName();


var Developer = function (name, age) {
    Person.call(this, name);
    this.age = age;
};
Developer.prototype = Object.create(Person.prototype);
console.log("Developer.prototype.constructor: " + Developer.prototype.constructor);
Developer.prototype.constructor = Developer;

Developer.prototype.printAge = function () {
    console.log(this.age);
};
var jissoAsDeveloper = new Developer("jisoo", 21);
jissoAsDeveloper.printName();
jissoAsDeveloper.printAge();
