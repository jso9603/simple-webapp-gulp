//브라우저가 DOM트리 생성한 직후
$(document).ready(function () {
  console.log("$(document).ready()");
});

//윈도우가 로딩된 후
$(window).on("load", function () {
  console.log("$(window).on('load')");
});

//웹페이지의 로딩이 끝나는 시점에 실행되는 함수
window.onload = function () {
  console.log("window.onload");
};