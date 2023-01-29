$(document).ready(function () {
    const $form = $("form");
    const $text = $(":text");
    const $msg = $("p:last");

    $form.submit(function (e) {
        if ($text.val().toLowerCase() === "correct") {
            $msg.text("Перевіряєм...").show().fadeOut(1000);
            return true;
        } else {
            $msg.text("Неправильно!").show().fadeOut(1000);
            return false;
        }
    });
});