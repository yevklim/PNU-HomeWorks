$(document).ready(function () {
    const $img = $("img");
    $img.hide();

    const $tooltip = $("tooltip")
    $tooltip.hide();

    $(":button").click(function (e) {
        $img.show(200);
    });
    $img.click(function (e) {
        $img.hide();
    });
    $img.hover(function (e) {
        switch (e.type) {
            case "mouseenter": {
                $tooltip.show(200);
                break;
            }
            case "mouseleave": {
                $tooltip.hide();
                break;
            }
        }
    });
    $img.mousemove(function (e) {
        $tooltip.css({
            top: e.clientY + 30,
            left: e.clientX,
        })
    });
});