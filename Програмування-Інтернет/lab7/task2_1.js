$(document).ready(function () {
    $(":button").click(function () {
        $("p:first").text("DOM first!")
        $("p:last").text("DOM last!")
    });
})