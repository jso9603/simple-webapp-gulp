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
