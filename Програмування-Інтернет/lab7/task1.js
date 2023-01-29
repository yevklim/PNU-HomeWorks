$(document).ready(function () {
    // alert("jQuery is ready");
    const $hidden_text = $("#hidden_text");
    $hidden_text.hide();

    $(":button").click(function () {
        $hidden_text.show(200);
    });
})