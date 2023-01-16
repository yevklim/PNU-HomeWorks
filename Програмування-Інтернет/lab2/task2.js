main_form.calculate.addEventListener("click", e => {
    let result = "";
    try {
        result = eval(main_form.calculator.value);
    } catch (e) {
        result = "Помилка!";
    }
    main_form.result.value = result;
});
main_form.calculator.addEventListener("input", e => {
    let value = main_form.calculator.value;
    main_form.calculator.value = value.replace(/[a-zA-Z;:'"!@#$%^&_\[\]\{\}\\\|\/\?\,]/g, "")
}) 