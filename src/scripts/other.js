$(document).ready(function () {
});

function toggleShared() {
    $("#shared").toggle();
    $.get("shared.html", function (data) {
        $("#shared").html(data);
    });
}