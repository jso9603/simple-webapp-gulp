//var printMyName;

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
