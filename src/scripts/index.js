var config;
//var data;

//브라우저가 DOM트리 생성한 직후
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

    $.getJSON({
        url: 'config/default.json',
        success: function (data) {
            config = data;
            console.log('baseUrl: ' + config.baseurl);
        }
    });

//    아래의 $.getJSON()과 동일하게 실행
//    $.ajax({
//        url: 'http://....',
//        dataType: 'json',
//        type: 'GET',
//        contentType: 'application/json',
//        data: data,
//        success: function (data) {
//            console.log('success');
//            console.log(data);
//        },
//        error: function (xhr, status, err) {
//            if (xhr.status === 401) {
//                console.log("401");
//            } else if (xhr.status === 403) {
//                console.log("403");
//            } else {
//                console.log(xhr.status);
//            }
//        }
//    });

//    Allow-Control-Allow-Origin 확장 프로그램 설치(구글 앱스토어)
    $.getJSON({
        url: 'http://....',
        //data: data,
        success: function (data) {
            console.log(data);
            console.log(typeof (data));
            console.log("data.length: " + data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("------------------------------------------------");
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
    

    $('#img').attr('src', 'http://www.fnordware.com/superpng/pnggrad8rgb.png');

//    var img = $("<img />").attr('src', 'http://www.fnordware.com/superpng/pnggrad16rgb.png')
//            .on('load', function () {
//                if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
//                    alert('broken image!');
//                } else {
//                    $("#showImage").append(img);
//                }
//            });

});

//window가 로딩된 후
$(window).on("load", function () {
    console.log("$(window).on('load')");
});

//웹페이지의 로딩이 끝나는 시점에 실행되는 함수
window.onload = function () {
    console.log("window.onload");
};

function timer_test() {
    console.log("click image");
    setTimeout(function () {
        $("img").hide();
    }, 1000);
}

//toggle
function toggleShared() {
    $("#shared").toggle();
    //inlude html(html include html code)
    $.get("shared.html", function (data) {
        $("#shared").html(data);
    });
}
