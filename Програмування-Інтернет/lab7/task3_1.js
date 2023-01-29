$(document).ready(function () {
    $("div").click(function (e) {
        $(this).css({
            border: "2px solid red",
            backgroundColor: "lightgreen"
        });
    });
    $("div").dblclick(function (e) {
        $(this).css({
            border: "",
            backgroundColor: ""
        });
    });
})