function passwordValidation(e) {
    const field = e.target;
    const value = field.value;
    const regex1 = /^[a-zA-z\d]{6,}$/;
    const regex2 = /[a-zA-z]/;
    const regex3 = /\d/;

    const valid = regex1.test(value) && regex2.test(value) && regex3.test(value);
    if (valid) {
        field.setCustomValidity("");
    } else {
        field.setCustomValidity("мінімум 6 символів, з яких мінімум по 1 букві і цифрі");
    }
}
document.getElementById("password").addEventListener("change", passwordValidation);
document.getElementById("password").addEventListener("input", passwordValidation);