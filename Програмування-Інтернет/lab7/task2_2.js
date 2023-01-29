$(document).ready(function () {
    $("div").hover(function (e) {
        switch (e.type) {
            case "mouseenter": {
                $(this).addClass("hover");
                break;
            }
            case "mouseleave": {
                $(this).removeClass("hover");
                break;
            }
        }
    });
})